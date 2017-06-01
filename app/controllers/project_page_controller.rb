class ProjectPageController < ApplicationController
	include HTTParty
	include JSON

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
		@token = params[:token]
	  @data_unfiltered = {}


	  # @data = {columns:["READY", "IN PROGRESS", "FINISHED", "DELIVERED", "DONE"]}
		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/?fields=name,stories(id,name,current_state,story_type)", headers: {"X-TrackerToken" => "#{@token}"})
	  json = JSON.parse(response.body)
		# @data_unfiltered = json
		@data_filtered = filterData(json)
	 end


	 def filterData(data)
		 unstarted_stories = {name: "READY", stories:[]}
		 inProgress = {name: "IN-PROGRESS", stories:[]}
		 finished = {name: "FINISHED", stories:[]}
		 delivered = {name: "DELIVERED", stories:[]}
		 accepted = {name: "DONE", stories:[]}

		 puts data

		data["stories"].each do |value|
			case value["story_type"]
				when 'bug', 'feature', 'chore'
					case value["current_state"]
					when 'unstarted', 'unscheduled', 'rejected'
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
		 return data_filtered
   end
end
