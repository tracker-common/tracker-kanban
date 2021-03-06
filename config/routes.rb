Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'
  post 'home/save_token'
  get 'home/save_token'
  get 'home/delete_token'

  get 'project_page/home'
  
  get 'project_page/createNewColumn'
  # post 'project_page/createNewColumn'
  put '/project_page/createNewColumn'

  put 'project_page/editColumn'

  put 'project_page/updateDatabaseWithNewCardPlacements'
  delete 'project_page/deleteOldColumn'
  put 'project_page/updateDatabaseWithNewCardPlacementsFromTrackerAPI'


  get 'project_page/RequestLiveUpdate'


  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]

  root to: "home#show"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
