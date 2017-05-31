class ProjectPageController < ApplicationController
	include HTTParty
	include JSON

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
		@token = params[:token]

		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/stories", headers: {"X-TrackerToken" => "#{@token}"})
			@stories = Array.new
		if response.code == 200
			json = JSON.parse(response.body)
			puts "!!!!NEW JSON IS #{json}"
			json.each do |value|
				@stories.push(json)
			end
		end
	end

	def show_stories
		#render 'show_stories'
	end

end