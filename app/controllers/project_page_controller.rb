class ProjectPageController < ApplicationController

	def home
		@project_id = params[:id]["id"]
		@project_name = params[:id]["name"]
	end

end
