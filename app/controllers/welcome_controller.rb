require 'pp'

class WelcomeController < ApplicationController
  	include HTTParty
  	include JSON

  def index
  	  @projectToken = Project.new
  end


  def create
  end


# 
  def helloWorld
  	puts "THIS IS A TEST"

  	pp params
  	@projectToken = Project.new(project_params)

  	

  	 # response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/", headers: {"X-TrackerToken" => "#{params[:token]}"})
  	 # json = JSON.parse(response.body)
  	 # print("#{json[0]["name"]}")
  	 # @b = Array.new
  	 # json.each do |value|
  	 #  	@b.push(value)
  	 # end
  end

  def project_params
      params.require(:project).permit(:token)
  end

end
