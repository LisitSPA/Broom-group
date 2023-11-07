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
FactoryBot.define do
  factory :firm_profile do
    title { Faker::Company.name }
    description { Faker::Lorem.paragraph }
    rut { Faker::ChileRut.full_rut }
    sap_code { Faker::Alphanumeric.alpha(number: 10) }
    association :country, factory: :country
  end
end
