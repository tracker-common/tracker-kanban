class ProjectPageController < ApplicationController
	skip_before_action :verify_authenticity_token
	include HTTParty
	include JSON

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
		@token = params[:token]
		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/?fields=name,stories(id,name,current_state,story_type,labels)", headers: {"X-TrackerToken" => "#{@token}"})
	  json = JSON.parse(response.body)
		@d = grabLabels(json)

		if checkInDatabase(json)
				data = Project.find_by(id: json["id"])
				@data_filtered = formatData(data)
		else
		    @data_filtered = filterData(json)
		end
	 end

	 def grabLabels(data)
		  label_titles = Set.new
		 	data["stories"].each do |value|
				if value["labels"][0] != nil
						label_titles.add(value["labels"][0]["name"])
				end
			end

			array = []
			label_titles.each do |value|
				array.push(value)
			end

			states = ["unstarted", "started", "finished", "delivered", "accepted", "rejected"]

			d = {name: data["name"], labels: array, id: data["id"], states: states}
			return d
	 end

	 def formatData(data)
		 data_filtered = {columns:[]}
		 data.columns.each do |value|
			 column = {name: "", stories: []}
			 column[:name] = value["name"]
			 column[:stories] = value["stories"]
			 data_filtered[:columns].push(column)
		 end
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
		 data_filtered = {columns:[]}
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


	 def createNewColumn
		 @data
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
