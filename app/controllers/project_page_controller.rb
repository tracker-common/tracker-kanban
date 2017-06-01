class ProjectPageController < ApplicationController
	include HTTParty
	include JSON

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
		@token = params[:token]
	  @data = {columns:["ONE", "TWO", 'tree']}
		response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/#{@project_id}/?fields=name,stories(id,name,current_state)", headers: {"X-TrackerToken" => "#{@token}"})
	  json = JSON.parse(response.body)
		# @data = json
		# puts @data["stories"]
		# puts json.inspect
		# json["stories"].each do |value|
		# 	@data[:stories].push(value)
		# end
	 end
end
