require 'pp'

class WelcomeController < ApplicationController
  	include HTTParty
  	include JSON

  def index
  	puts "This was seen"
  	  @user = User.new
  end


  def create
  	puts "THIS IS A TEST"
  	@projectToken = User.new(user_params)
  end

  def save_token
  	puts "I AM THE GREETEST"
  	puts params
  	@user = User.new(params)
  	@user.save
  end


  def user_path
  end


# 
  def helloWorld

  	pp params
  	@projectToken = User.new(user_params)


  	if @projectToken.save
  		outs "WAS SAVED from hello world"
  	end


  	

  	 # response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/", headers: {"X-TrackerToken" => "#{params[:token]}"})
  	 # json = JSON.parse(response.body)
  	 # print("#{json[0]["name"]}")
  	 # @b = Array.new
  	 # json.each do |value|
  	 #  	@b.push(value)
  	 # end
  end

  def user_params
      params.require(:user).permit(:username,:token)
  end

end
