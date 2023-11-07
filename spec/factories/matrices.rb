# == Schema Information
#
# Table name: matrices
#
#  id          :bigint           not null, primary key
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :matrix do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
  end
end
