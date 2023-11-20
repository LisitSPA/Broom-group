class Api::V1::CountryController < ApplicationController
  # get /api/v1/country --> Trae todos los registros
  # get /api/v1/country?country_id=5 --> Trae el registro consultado por un "id"
  def index
    if params[:country_id].present?
      puts :country_id
      countries = Country.where(id: params[:country_id])
    else
      countries = Country.all
    end

    render json: countries, status: :ok
  end  
end
