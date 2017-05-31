class SessionsController < ApplicationController
 


  def create
  	if checkUser(request.env["omniauth.auth"])
  		 session[:user_id] = request.env["omniauth.auth"]["uid"]
    	 redirect_to root_path
  	else
    	user = User.from_omniauth(request.env["omniauth.auth"])
    	session[:user_id] = user.uid
    	redirect_to root_path
  	end
  end

    def checkUser(auth)
      puts "Checking if User exists #{auth.uid}"
      @user = User.where(uid: auth.uid)

      if @user.count >= 1
        puts "USER DOES EXISTS!!!!!"
        return true
      else
        puts "USER DOES NOT EXISTS!!!!!"
        return false
      end
    end
  

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end

