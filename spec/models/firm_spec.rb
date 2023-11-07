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
require 'rails_helper'

RSpec.describe Firm, type: :model do
  context "factory" do
    it "has a valid factory" do
      firm = FactoryBot.build(:firm)
      expect(firm).to be_valid
    end
  end
  
  let!(:firm_profile_1) { FactoryBot.create(:firm_profile) }

  let!(:version_1) { FactoryBot.create(:version) }
  let!(:version_2) { FactoryBot.create(:version) }
  context "validations" do
    it "is invalid without a firm_profile" do
      firm = FactoryBot.build(:firm, firm_profile: nil)
      expect(firm).to be_invalid
    end

    it "is invalid without a version" do
      firm = FactoryBot.build(:firm, version: nil)
      expect(firm).to be_invalid
    end

    it "is valid with a firm_profile and a version" do
      firm = FactoryBot.build(:firm, firm_profile: firm_profile_1, version: version_1)
      expect(firm).to be_valid
    end

    it "exists only once in a version" do
      firm_1 = FactoryBot.create(:firm, firm_profile: firm_profile_1, version: version_1)
      firm_2 = FactoryBot.build(:firm, firm_profile: firm_profile_1, version: version_1)
      expect(firm_2).to be_invalid
    end

    it "is invalid with a duplicate firm_profile and version" do
      firm_1 = FactoryBot.create(:firm, firm_profile: firm_profile_1, version: version_1)
      firm_2 = FactoryBot.build(:firm, firm_profile: firm_profile_1, version: version_1)
      expect(firm_2).to be_invalid
    end

    it "is valid with a duplicate firm_profile and different version" do
      firm_1 = FactoryBot.create(:firm, firm_profile: firm_profile_1, version: version_1)
      firm_2 = FactoryBot.build(:firm, firm_profile: firm_profile_1, version: version_2)
      expect(firm_2).to be_valid
    end
  end

  let!(:firm_profile_1) { FactoryBot.create(:firm_profile) }
  let!(:firm_profile_2) { FactoryBot.create(:firm_profile) }

  let!(:matrix_1) { FactoryBot.create(:matrix) }
  let!(:version_1) { FactoryBot.create(:version, matrix: matrix_1) }
  context "associations" do
    it "has many owners" do
      firm_1 = FactoryBot.create(:firm, firm_profile: firm_profile_1, version: version_1)
      firm_2 = FactoryBot.create(:firm, firm_profile: firm_profile_2, version: version_1)
      ownership = FactoryBot.create(:ownership, owner: firm_1, subsidiary: firm_2)
      
      expect(firm_2.owners).to include(firm_1)
    end

    it "has many subsidiaries" do
      firm_1 = FactoryBot.create(:firm, firm_profile: firm_profile_1, version: version_1)
      firm_2 = FactoryBot.create(:firm, firm_profile: firm_profile_2, version: version_1)
      ownership = FactoryBot.create(:ownership, owner: firm_1, subsidiary: firm_2)
      
      expect(firm_1.subsidiaries).to include(firm_2)
    end
  end
end
