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
require 'rails_helper'

RSpec.describe FirmProfile, type: :model do
  describe "validations" do
    it "has a valid factory" do
      firm_profile = FactoryBot.build(:firm_profile)
      expect(firm_profile).to be_valid
    end
  
    it "is invalid without a title" do
      firm_profile = FactoryBot.build(:firm_profile, title: nil)
      expect(firm_profile).to be_invalid
    end
  
    it "is invalid without a rut" do
      firm_profile = FactoryBot.build(:firm_profile, rut: nil)
      expect(firm_profile).to be_invalid
    end
  
    it "is invalid with a wrong rut" do
      firm_profile = FactoryBot.build(:firm_profile, rut: "123456789")
      expect(firm_profile).to be_invalid
    end

    it "is invalid with a duplicated rut" do
      firm_profile = FactoryBot.create(:firm_profile)
      firm_profile2 = FactoryBot.build(:firm_profile, rut: firm_profile.rut)
      expect(firm_profile2).to be_invalid
    end

    it "is valid without a country" do
      firm_profile = FactoryBot.build(:firm_profile, country: nil)
      expect(firm_profile).to be_valid
    end

    it "is invalid with a country id that does not exist" do
      firm_profile = FactoryBot.build(:firm_profile, country_id: 9999)
      expect(firm_profile).to be_invalid
    end

    it "is valid with a country id that exists" do
      country = FactoryBot.create(:country)
      firm_profile = FactoryBot.build(:firm_profile, country_id: country.id)
      expect(firm_profile).to be_valid
    end

  end

  describe "associations" do
    it 'has many firms' do
      firm_profile = FactoryBot.build(:firm_profile)
      expect(firm_profile).to respond_to(:firms)
    end
  end
end
