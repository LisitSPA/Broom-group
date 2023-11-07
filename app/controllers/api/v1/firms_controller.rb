class Api::V1::FirmsController < ApplicationController
  # get "api/v1/firms/:id"
  def show
    firm = Firm.find_by(id: params[:id])

    if firm
      render json: firm, serializer: FirmOwnershipsSerializer
    else
      render json: { message: 'Firm id not found' }, status: :not_found
    end
  end
end
