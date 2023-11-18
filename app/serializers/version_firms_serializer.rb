class VersionFirmsSerializer < ActiveModel::Serializer
  attribute :id, key: :versionId
  attribute :simulation, key: :isSimulated
  attribute :firmsSignature
  attribute :investorsSignature
  has_many :firms, serializer: FirmInvestmentsSerializer, include_nested_associations: true

  def firmsSignature
    object.firms_signature
  end

  def investorsSignature
    object.investors_signature
  end
end
