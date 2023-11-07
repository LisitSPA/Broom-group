# == Schema Information
#
# Table name: firms
#
#  id              :bigint           not null, primary key
#  can_be_owned    :boolean          default(TRUE)
#  can_own         :boolean          default(TRUE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  firm_profile_id :bigint           not null
#  version_id      :bigint           not null
#
# Indexes
#
#  index_firms_on_firm_profile_id  (firm_profile_id)
#  index_firms_on_version_id       (version_id)
#
# Foreign Keys
#
#  fk_rails_...  (firm_profile_id => firm_profiles.id)
#  fk_rails_...  (version_id => versions.id)
#
class FirmOwnershipsSerializer < ActiveModel::Serializer
  attribute :id, key: :firmId
  attribute :firm_profile_id, key: :firmProfileId

  attribute :title do
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

  attribute :ownersMap do
    object.owners_map
  end
end
