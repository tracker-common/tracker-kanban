class HomeController < ApplicationController
  def show
  	if session[:user_id] == nil
  		render :layout => 'signed_out'
  	else
  		
  		render :layout => 'signed_in'
  	end
  end
end
