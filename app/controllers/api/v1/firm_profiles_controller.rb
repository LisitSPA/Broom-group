class Api::V1::FirmProfilesController < ApplicationController
  # get /api/v1/firm_profiles
  def index
    if params[:search].present?
      firm_profiles = FirmProfile.search(params[:search])
    else
      firm_profiles = FirmProfile.all
    end

    render json: firm_profiles, status: :ok
  end

  # post /api/v1/firm_profiles
  def create
    new_firm_profile = FirmProfile.new(
      title: params[:title],
      description: params[:description],
      rut: params[:rut],
      sap_code: params[:sapCode],
      country_id: params[:countryId]
    )

    if new_firm_profile.save
      render json: new_firm_profile, status: :created
    else
      render json: { errors: new_firm_profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # put /api/v1/firm_profiles/:id
  # patch /api/v1/firm_profiles/:id
  def update
    firm_profile = FirmProfile.find_by(id: params[:id])

    if firm_profile
      if firm_profile.update(transformed_params)
        render json: firm_profile, status: :ok
      else
        render json: { errors: firm_profile.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: 'Firm profile not found' }, status: :not_found
    end
  end

  # delete /api/v1/firm_profiles/:id
  def destroy
    firm_profile = FirmProfile.find_by(id: params[:id])

    if firm_profile
      firm_profile.destroy
      render json: { message: 'Firm profile deleted' }, status: :ok
    else
      render json: { errors: 'Firm profile not found' }, status: :not_found
    end
  end

  private

  def transformed_params
    {
      title: params[:title],
      description: params[:description],
      rut: params[:rut],
      sap_code: params[:sapCode],
      country_id: params[:countryId]
    }.compact
  end
end
