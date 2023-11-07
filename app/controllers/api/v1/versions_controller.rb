class Api::V1::VersionsController < ApplicationController
  
  # get "api/v1/versions/:id"
  def show
    begin
      version = Version.includes(firms: [:investments]).find(params[:id])
      render json: version, serializer: VersionFirmsSerializer
    rescue => exception
      render json: { message: exception.message }, status: :not_found
    end
  end

  # post "api/v1/versions"
  def create
    service = VersionCreationService.new(params)
    version = service.call

    if version
      render json: version, serializer: VersionSerializer, status: :created
    else
      render json: { errors: service.errors }, status: :unprocessable_entity
    end
  end

  # delete "api/v1/versions/:id"
  def destroy
    version = Version.find_by(id: params[:id])

    if version
      version.destroy
      render json: { message: 'Version deleted successfully!' }, status: :ok
    else
      render json: { message: 'Version id not found' }, status: :not_found
    end
  end

  # put "api/v1/versions/:id"
  # patch "api/v1/versions/:id"
  def update
    version = Version.find_by(id: params[:id])

    if version
      version.update(transformed_params)
      render json: version, serializer: VersionSerializer, status: :ok
    else
      render json: { message: 'Version id not found' }, status: :not_found
    end
  end

  private

  def transformed_params
    {
      title: params[:title],
      description: params[:description],
      simulation: params[:isSimulated]
    }
  end
end
