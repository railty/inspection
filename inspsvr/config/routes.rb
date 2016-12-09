Rails.application.routes.draw do
  resources :templates do
    collection do
      get 'load'
      post 'upload'
    end
  end

  resources :inspections do
    collection do
      get 'load'
      post 'upload'
    end
  end

  resources :features
end
