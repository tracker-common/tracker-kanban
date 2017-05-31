class ProjectPageController < ApplicationController
	include HTTParty
	include JSON

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
		#my token in to see if it can work
		@token = "7c6f1b93ea33fecbaaea1b4363e91d53" 
		puts "LOOK AT ME I'M SOME CODE"
		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/?fields=name,stories(id,name,current_state)", headers: {"X-TrackerToken" => "#{@token}"})
		if response.code == 200
			json = JSON.parse(response.body)
			puts "!!!!!!!!!!!!!!!!!!!!!!!!!NEW JSON IS #{json}"
		end
	end
end
