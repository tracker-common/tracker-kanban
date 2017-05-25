Rails.application.routes.draw do
  

  resources :welcome
  get 'welcome/index'
  get 'welcome/helloWorld'
  post 'welcome/save_token'
  root 'welcome#index'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
