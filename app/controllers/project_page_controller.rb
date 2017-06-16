require 'date'

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
				@time_stamp = data.liveRequestDate
		else
				@data_filtered = filterData(json, @token)
		end
	 end

	 def getTimeStamp(project_id, token)
		 response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{project_id}/activity?limit=1", headers: {"X-TrackerToken" => "#{token}"})
		 json = JSON.parse(response.body)
		 time_stamp = ""
		 stop = false
		 story = json.last
		 time_stamp = story["occurred_at"]
		 return time_stamp
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

	 def formatData(data)
			 data_filtered = {project_id: data["id"], columns:[]}
			 data.columns.each do |value|
				 column = {name: "", stories: []}
				 column[:name] = value["name"]
				 column[:stories] = value["stories"]
				 data_filtered[:columns].push(column)
			 end
		 return data_filtered
	 end


	 def filterData(data, token)
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
		 sendToDatabase(data_filtered, data, token)
		 return data_filtered
   end

	 def sendToDatabase(data, name, token)
		 @project = Project.new
		 @project.name = name["name"]
		 @project.id = name["id"]
		 @project.columns = data[:columns]
		 time_stamp = getTimeStamp(name["id"], token)
		 @project.liveRequestDate = time_stamp
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
						 	 position_value: params[:position_value],
						 	 max_value: params[:max_value]}
		  data_filtered = makeForDatabase(data, column)
			updateDatabase(data_filtered, data)
	 end

	 def deleteOldColumn
		 project = Project.find_by(id: params[:project_id].to_i)
		  puts "COLUMNS BEFORE DELETIONS: #{project.columns}"
	 	 card_set = project.findAndDeleteColumn(params[:name_of_col])
		 if card_set.count != 0
			 project.insertCardSet(card_set)
		 end
		project.save
	 end


	 def makeForDatabase(data, custom_column)
		 translation_states = {unstarted: "READY", rejected: "READY", started:"IN-PROGRESS", delivered: "DELIVERED", finished: "FINISHED", accepted: "DONE"}
		 data_filtered = {project_id: data["id"], columns:[]}
		 c_column = {name: custom_column[:column_name], stories: []}
		 temp_stories = []
		 data.columns.each do |value|
			 v = custom_column[:state_value]
			 name = translation_states[v.to_sym]
			 if name == value["name"]
				 value["stories"].each do |story|
					 if story[:current_state] == custom_column[:state_value]
						 if story[:labels].count != 0
							  story[:labels].each do |label|
									if label["name"] == custom_column[:label_value]
										c_column[:stories].push(story)
										temp_stories.push(story)
										break
									end #if label["name"] == custom_column[:label_value]
								end  #story[:labels].each do |label|
						 end #if story[:labels].count != 0
					 end #if story[:current_state] == custom_column[:state_value]
				 end #value["stories"].each do |story|
				 temp_stories.each do |story|
					 value["stories"].delete(story)
				 end
			 end # if name == value["name"]
		 end #data.columns.each do |value|
		 data.columns.insert(custom_column[:position_value].to_i, c_column)
		 return data
 	 end

	 def checkInDatabase(data)
		 project = Project.where(id: data["id"])
		 if project.count >= 1
			 return true
		 else
			 return false
		 end
	 end

	 def updateDatabaseWithNewCardPlacements
		 project = Project.find_by(id: params[:project_id].to_i)
		 moved_card = project.findAndDeleteStoryID(params[:old_column], params[:story_id])
		 moved_card["current_state"] = params[:new_state]
		 puts " THE MOVED CARD IS : #{moved_card}"
		 project.insertCard(params[:new_column], moved_card)
		 project.save
		 updateTrackerAPI(params[:project_id].to_i, params[:story_id].to_i, params[:new_state], params[:token])
	 end

	 def updateTrackerAPI(project_id, story_id, new_state, token)
		 puts "INFORMATION: #{project_id}, #{story_id}, #{new_state}"
		 response = HTTParty.put("https://www.pivotaltracker.com/services/v5/projects/#{project_id}/stories/#{story_id}", headers: {"X-TrackerToken" => "#{token}"}, body: {"current_state":"#{new_state}"})
		 puts response.body
	 end

   def RequestLiveUpdate
		 puts "Requesting Live Update!!! "

		 user = User.find_by(uid: session[:user_id])
		 token = user.api_token
		 project_id = params[:project_id]

		 project = Project.find_by(id: params[:project_id].to_i)

		 puts "THE TIME STAMP IS: #{time_stamp}"
		 response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{project_id}/activity?occurred_after=#{time_stamp}", headers: {"X-TrackerToken" => "#{token}"})
		 json = JSON.parse(response.body)
		 @list_of_changes = []

		 bleh = DateTime.parse(time_stamp)
		 puts "TRYING SOMETHING!!! :#{time_stamp.class}"

		#  puts "THE JSON IS: #{json.to_json}"

		 json.each do |story|
			 story["changes"].each do |value|
				  if value["kind"] == "story" && value["change_type"] == "update" && value["new_values"]["current_state"] != nil
						changes = {story_id: "", original_state: "", new_state: ""}
						changes[:original_state] = value["original_values"]["current_state"]
						changes[:new_state] = value["new_values"]["current_state"]
						changes[:story_id] = value["id"]
						@list_of_changes.push(changes)
					end
			 end
		 end

		 puts @list_of_changes

		respond_to do |format|
			format.json { render :json => @list_of_changes}
		end
	 end

	 def updateDatabaseWithNewCardPlacementsFromTrackerAPI
		 project = Project.find_by(id: params[:project_id].to_i)
		 moved_card = project.findAndDeleteStoryID(params[:old_column], params[:story_id])
		 moved_card["current_state"] = params[:new_state]
		 project.insertCard(params[:new_column], moved_card)
		 project.save
	 end



end
