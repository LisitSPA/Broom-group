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
FactoryBot.define do
  factory :firm do
    can_own { true }
    can_be_owned { true }
    association :firm_profile
    association :version
  end
end
