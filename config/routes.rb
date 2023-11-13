Rails.application.routes.draw do
  devise_for :users
  
  root to: 'pages#explorer'
  get 'administrar_datos', to: 'pages#matrix'
  get 'simular_escenarios', to: 'pages#simulation'

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :matrix, only: [:index]
      resources :versions, only: [:index, :show, :create, :update, :destroy]
      resources :firm_profiles, only: [:index, :create, :update, :destroy]
      resources :firms, only: [:show]
    end
  end

  namespace :admin do
    resources :users
  end
end
