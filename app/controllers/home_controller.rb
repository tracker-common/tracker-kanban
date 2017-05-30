class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  include HTTParty
  include JSON

  def show
  	if session[:user_id] == nil
  		puts "User is not signed in"
  	else
  		puts "USER #{session[:user_id]["$oid"]}"
		@user = User.find_by(_id: session[:user_id]["$oid"])
		puts "USER TOKEN IS #{@user.api_token}"
 		if @user.api_token != " "
 			goToToken(@user.api_token)
 		else
 			render :layout => 'signed_in'
 		end  		
  	end
  end

 def save_token
 	@token = params[:token]
 	response = HTTParty.get("https://www.pivotaltracker.com/services/v5/projects/", headers: {"X-TrackerToken" => "#{params[:token]}"})
    @projects = Array.new
 	puts "RESPONSE CODE: #{response.code}"
 	if response.code == 200
 		puts "session userid: #{session[:user_id]["$oid"]}"
 		@user = User.find_by(id: session[:user_id]["$oid"])
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
 	puts "RESPONSE CODE: #{response.code}"
 	if response.code == 200
 		puts "session userid: #{session[:user_id]["$oid"]}"
 		@user = User.find_by(id: session[:user_id]["$oid"])
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

 def delete_token
 	@user = User.find_by(id: session[:user_id]["$oid"])
 	@user.api_token = " "
 	@user.save!

 	redirect_to root_path

 end

end
