class VersionFirmsSerializer < ActiveModel::Serializer
  attribute :id, key: :versionId
  attribute :simulation, key: :isSimulated
  attribute :firmsSignature
  attribute :investorsSignature
  attribute :formatted_created_at, key: :created_at  
  has_many :firms, serializer: FirmInvestmentsSerializer, include_nested_associations: true

  def firmsSignature
    object.firms_signature
  end

  def investorsSignature
    object.investors_signature
  end

  #damos formato a la fecha
  def formatted_created_at
    object.created_at.strftime('%Y-%m-%d %H:%M:%S')
  end
end
