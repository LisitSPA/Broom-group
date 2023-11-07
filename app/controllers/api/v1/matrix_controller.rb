class Api::V1::MatrixController < ApplicationController
  # get /api/v1/matrix
  def index
    matrix = Matrix.last

    if matrix
      render json: matrix, serializer: MatrixSerializer, onlySimulated: params[:onlySimulated], status: :ok
    else
      render json: { error: 'No matrix found' }, status: 404
    end
  end
end
