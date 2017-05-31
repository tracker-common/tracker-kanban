class ProjectPageController < ApplicationController
	include HTTParty
	include JSON

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
			@stories = Array.new
		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/?fields=name,stories(id,name,current_state)", headers: {"X-TrackerToken" => "#{@token}"})
		if response.code == 200
			json = JSON.parse(response.body)
			puts "!!!!NEW JSON IS #{json}"
			json.each do |value|
				@stories.push(json)
			end
		end
	end
end