

class WelcomeController < ApplicationController
  	include HTTParty
  	include JSON

  def index
  	@b
  end

  def book_param
      params.require(:project).permit(:token, :id)
  end

  def helloWorld
  	  	response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/", headers: {"X-TrackerToken" => "5798b625220e53fc6203c7cb17ad32ab"})
  	  	json = JSON.parse(response.body)
  	  	print("#{json[0]["name"]}")
  	  	@b = Array.new
  	  	json.each do |value|
  	  		@b.push(value)
  	  	end
  end


end
