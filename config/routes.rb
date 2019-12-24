Rails.application.routes.draw do
  root to: 'pages#building'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'building', to: 'pages#building', as: :building
  # get 'contact', to: 'pages#contact', as: :contact
end
