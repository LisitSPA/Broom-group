# == Schema Information
#
# Table name: firm_profiles
#
#  id          :bigint           not null, primary key
#  description :text
#  rut         :string
#  sap_code    :string
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  country_id  :bigint
#
# Indexes
#
#  index_firm_profiles_on_country_id  (country_id)
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#
class FirmProfileSerializer < ActiveModel::Serializer
  attribute :id, key: :firmProfileId
  attributes :title, :description, :rut
  attribute :sap_code, key: :sapCode
  attribute :country

  def country
    object.country.name
  end
end
