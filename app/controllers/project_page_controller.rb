class ProjectPageController < ApplicationController
	include HTTParty
	include JSON

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
		@token = params[:token]
	  @data_unfiltered = {}
		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/?fields=name,stories(id,name,current_state)", headers: {"X-TrackerToken" => "#{@token}"})
	  json = JSON.parse(response.body)
		@data_unfiltered = json
		@data_filtered = filterData(@data_unfiltered)
	 end


	 def filterData(data)
		 unstarted_stories = Array.new
		 inProgress = Array.new
		 delivered = Array.new
		 accepted = Array.new
		 data["stories"].each do |value|
			 case value["current_state"]
			 when 'unstarted', 'unscheduled'
				 unstarted_stories.push(value)
			 when 'started'
				 inProgress.push(value)
			 when 'delivered'
				 delivered.push(value)
			 when 'accepted'
				 accepted.push(value)
			 end
		 end
		 data_filtered = Hash.new
		 data_filtered["unstarted"] = unstarted_stories
		 data_filtered["inProgress"] = inProgress
		 data_filtered["delivered"] = delivered
		 data_filtered["accepted"] = accepted
		 return data_filtered
   end
end
