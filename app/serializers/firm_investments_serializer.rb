class FirmInvestmentsSerializer < ActiveModel::Serializer
  attribute :id, key: :firmId
  attribute :firm_profile_id, key: :firmProfileId

  belongs_to :firm_profile

  attribute :name do
    object.firm_profile.title
  end

  attribute :description do
    object.firm_profile.description
  end

  attribute :rut do
    object.firm_profile.rut
  end

  attribute :country do
    object.firm_profile.country.name
  end

  attribute :sapCode do
    object.firm_profile.sap_code
  end

  attribute :investors do
    object.investors.map do |investor|
      {
        ownerFirmProfileId: investor.owner.firm_profile_id,
        percentage: investor.percentage
      }
    end
  end
end
