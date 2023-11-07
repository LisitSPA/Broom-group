# == Schema Information
#
# Table name: ownerships
#
#  id            :bigint           not null, primary key
#  percentage    :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  owner_id      :bigint           not null
#  subsidiary_id :bigint           not null
#
# Indexes
#
#  index_ownerships_on_owner_id       (owner_id)
#  index_ownerships_on_subsidiary_id  (subsidiary_id)
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => firms.id)
#  fk_rails_...  (subsidiary_id => firms.id)
#
require 'rails_helper'

RSpec.describe Ownership, type: :model do
  let!(:version) { FactoryBot.create(:version) }
  let!(:owner) { FactoryBot.create(:firm, version: version) }
  let!(:subsidiary) { FactoryBot.create(:firm, version: version) }
  context "validations" do
    it "has a valid factory" do
      ownership = FactoryBot.build(:ownership, owner: owner, subsidiary: subsidiary)
      expect(ownership).to be_valid
    end
  
    it "is invalid without a owner" do
      ownership = FactoryBot.build(:ownership, owner: nil)
      expect(ownership).to be_invalid
    end
  
    it "is invalid without a subsidiary" do
      ownership = FactoryBot.build(:ownership, subsidiary: nil)
      expect(ownership).to be_invalid
    end
  
    it "is invalid without a percentage" do
      ownership = FactoryBot.build(:ownership, percentage: nil)
      expect(ownership).to be_invalid
    end
  
    it "is invalid with a percentage greater than 100" do
      ownership = FactoryBot.build(:ownership, percentage: 101)
      expect(ownership).to be_invalid
    end
  
    it "is invalid with a percentage less than 0" do
      ownership = FactoryBot.build(:ownership, percentage: -1)
      expect(ownership).to be_invalid
    end

    it "is invalid if the owner and the subsidiary has different version" do
      version_1 = FactoryBot.create(:version)
      version_2 = FactoryBot.create(:version)
      firm_1 = FactoryBot.create(:firm, version: version_1)
      firm_2 = FactoryBot.create(:firm, version: version_2)
      ownership = FactoryBot.build(:ownership, owner: firm_1, subsidiary: firm_2)
      expect(ownership).to be_invalid
    end

    it "is valid if firm A owns B owns C and C owns A, creating a cycle" do
      firm_a = FactoryBot.create(:firm, version: version)
      firm_b = FactoryBot.create(:firm, version: version)
      firm_c = FactoryBot.create(:firm, version: version)
      ownership_1 = FactoryBot.create(:ownership, owner: firm_a, subsidiary: firm_b)
      ownership_2 = FactoryBot.create(:ownership, owner: firm_b, subsidiary: firm_c)
      ownership_3 = FactoryBot.build(:ownership, owner: firm_c, subsidiary: firm_a)
      expect(ownership_3).to be_valid
    end

    it "is valid if A owns B owns C and A owns C also" do
      firm_a = FactoryBot.create(:firm, version: version)
      firm_b = FactoryBot.create(:firm, version: version)
      firm_c = FactoryBot.create(:firm, version: version)
      ownership_1 = FactoryBot.create(:ownership, owner: firm_a, subsidiary: firm_b)
      ownership_2 = FactoryBot.create(:ownership, owner: firm_b, subsidiary: firm_c)
      ownership_3 = FactoryBot.build(:ownership, owner: firm_a, subsidiary: firm_c)
      expect(ownership_3).to be_valid
    end
  end

  context "associations" do
    it "belongs to a owner" do
      ownership = FactoryBot.create(:ownership, owner: owner, subsidiary: subsidiary)
      expect(ownership.owner).to eq(owner)
    end

    it "belongs to a subsidiary" do
      ownership = FactoryBot.create(:ownership, owner: owner, subsidiary: subsidiary)
      expect(ownership.subsidiary).to eq(subsidiary)
    end

    it "cannot be owned by itself" do
      ownership = FactoryBot.build(:ownership, owner: subsidiary, subsidiary: subsidiary)
      expect(ownership).to be_invalid
    end

    it "cannot owns the same firm twice" do
      ownership_1 = FactoryBot.create(:ownership, owner: owner, subsidiary: subsidiary)
      ownership_2 = FactoryBot.build(:ownership, owner: owner, subsidiary: subsidiary)
      expect(ownership_2).to be_invalid
    end
  end
end
