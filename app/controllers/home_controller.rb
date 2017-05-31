class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  include HTTParty
  include JSON

  def show
  	if session[:user_id] == nil
  		render :layout => 'signed_out'
  	else
		 @user = User.find_by(uid: session[:user_id])
 		 if @user.api_token == " " or @user.api_token == nil
       render :layout => 'signed_in'""
 		 else
       goToToken(@user.api_token)
 		 end  		
  	end
  end

 def save_token
 	@token = params[:token]
 	response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/", headers: {"X-TrackerToken" => "#{params[:token]}"})
    @projects = Array.new
 	if response.code == 200
 		@user = User.find_by(uid: session[:user_id])
 		@user.api_token = params[:token]
    	@user.save
 		  json = JSON.parse(response.body)
    	puts "JSON IS #{json}"    
    	json.each do |value|
      		@projects.push(value)
    	end
    else
    	@projects.clear
 	end
	render 'save_token'
 end

 def goToToken(token)
 	@token = token
 	response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/", headers: {"X-TrackerToken" => "#{token}"})
    @projects = Array.new
 	if response.code == 200
 		json = JSON.parse(response.body)
    	puts "JSON IS #{json}"    
    json.each do |value|
      	@projects.push(value)
    	end
    else
    	@projects.clear
 	end
	render 'save_token'
 end

 def delete_token
  @user = User.find_by(uid: session[:user_id])
 	@user.api_token = " "
 	@user.save!

 	redirect_to root_path

 end

end
