class ProjectPageController < ApplicationController
	skip_before_action :verify_authenticity_token
	include HTTParty
	include JSON



	def home
		user = User.find_by(uid: session[:user_id])
		@token = user.api_token
		@project_id = params[:id]
		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/?fields=name,stories(id,name,current_state,story_type,labels),labels", headers: {"X-TrackerToken" => "#{@token}"})
		json = JSON.parse(response.body)
		@project_name = json["name"]
		@d = grabLabels(json)
		if checkInDatabase(json)
				data = Project.find_by(id: json["id"])
				@data_filtered = formatData(data)
		else
				@data_filtered = filterData(json)
		end
	 end

	 def show
		 puts "This was called from SHOW!!!!"
	 end

	 def setUp(token, project_id)

	 end

	 def grabLabels(data)
		  label_titles = Set.new
			data["labels"].each do |value|
				label_titles.add(value["name"])
			end

			array = []
			label_titles.each do |value|
				array.push(value)
			end
			return array
	 end

	 def formatData(data, custom_column=nil)
		 translation_states = {unstarted: "READY", rejected: "READY", started:"IN-PROGRESS", delivered: "DELIVERED", finished: "FINISHED", accepted: "DONE"}
		 if custom_column == nil
			 data_filtered = {project_id: data["id"], columns:[]}
			 data.columns.each do |value|
				 column = {name: "", stories: []}
				 column[:name] = value["name"]
				 column[:stories] = value["stories"]
				 data_filtered[:columns].push(column)
			 end
		 else
			 data_filtered = {project_id: data["id"], columns:[]}
			 c_column = {name: custom_column[:column_name], stories: []}
			 data.columns.each do |value|
				 v = custom_column[:state_value]
				 name = translation_states[v.to_sym]
				 if value["name"] == name
					 column = {name: "", stories: []}
					 column[:name] = value["name"]
					 value["stories"].each do |story|
						 puts "Looking at story: #{story["name"]}"
						 	if story[:current_state] == custom_column[:state_value]

								if story[:labels].count != 0
									story[:labels].each do |label|
										if label[:name] == custom_column[:label_value]
											c_column[:stories].push(story)
											puts "BEFORE: #{value["stories"]}"
											value["stories"].delete(story)
											puts "AFTER: #{value["stories"]}"
											break
										else
											if(!c_column[:stories].include?(story))
												column[:stories].push(story)
											end
										end
									end #do label
								else
									if(!c_column[:stories].include?(story))
										puts "PLACING INSIDE column: #{story}"
										column[:stories].push(story)
									end
								end
							end
					 end #column[:stories]
					 data_filtered[:columns].push(column)
					 if c_column[:stories].any?
					 	c_column[:stories] = c_column[:stories].uniq
						data_filtered[:columns].insert(0, c_column)
					 end
				 else
					 column = {name: "", stories: []}
					 column[:name] = value["name"]
					 column[:stories] = value["stories"]
					 data_filtered[:columns].push(column)
				 end
			 end #data.columns
			 data_filtered[:columns].insert(custom_column[:position_value].to_i, data_filtered[:columns].delete_at(0))
		 end #else

		 return data_filtered

	 end


	 def filterData(data)
		unstarted_stories = {name: "READY", stories:[]}
		inProgress = {name: "IN-PROGRESS", stories:[]}
		finished = {name: "FINISHED", stories:[]}
		delivered = {name: "DELIVERED", stories:[]}
		accepted = {name: "DONE", stories:[]}

		data["stories"].each do |value|
			case value["story_type"]
				when 'bug', 'feature', 'chore'
					case value["current_state"]
					when 'unstarted', 'rejected'
						unstarted_stories[:stories].push(value)
					when 'started'
						inProgress[:stories].push(value)
					when 'delivered'
						delivered[:stories].push(value)
					when 'finished'
						finished[:stories].push(value)
					when 'accepted'
						accepted[:stories].push(value)
					end
			end
		end
		 data_filtered = {project_id: data["id"], columns:[]}
		 data_filtered[:columns].push(unstarted_stories)
		 data_filtered[:columns].push(inProgress)
		 data_filtered[:columns].push(finished)
		 data_filtered[:columns].push(delivered)
		 data_filtered[:columns].push(accepted)
		 sendToDatabase(data_filtered, data)
		 return data_filtered
   end

	 def sendToDatabase(data, name)
		 @project = Project.new
		 @project.name = name["name"]
		 @project.id = name["id"]
		 @project.columns = data[:columns]
		 @project.save
	 end

	 def updateDatabase(data, name)
		 project = Project.find_by(id: name["id"])
		 project.columns = data[:columns]
		 project.save
	 end

	 def update
		 puts "insdie update"
	 end


	 def createNewColumn
		 data = Project.find_by(id: params[:project_id].to_i)
		 column = {column_name: params[:column_name],
			 				 label_value: params[:label_value],
			 				 state_value: params[:state_value],
						 	 position_value: params[:position_value]}
		  data_filtered = formatData(data, column)
			updateDatabase(data_filtered, data)
	 end



	 def checkInDatabase(data)
		 project = Project.where(id: data["id"])
		 if project.count >= 1
			 return true
		 else
			 return false
		 end
	 end




end
