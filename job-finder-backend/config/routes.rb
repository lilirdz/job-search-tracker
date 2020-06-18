Rails.application.routes.draw do
  resources :applications, except: [:show,:update]
  resources :users, except: [:destroy]

  post '/users_signin' => 'users#existing_user'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
