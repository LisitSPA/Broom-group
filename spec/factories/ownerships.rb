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
FactoryBot.define do
  factory :ownership do
    percentage { rand }
    association :owner, factory: :firm
    association :subsidiary, factory: :firm
  end
end
