class HomeController < ApplicationController
  def show
  	if session[:user_id] == nil
  		puts "HELLO WORDL YOU ARE NOT SIGNED IN"
  	else
  		render :layout => 'signed_in'
  	end
  end
end
