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
class Matrix < ApplicationRecord
  validates :title, presence: true
  has_many :versions, dependent: :destroy

  def last_version_number
    versions.maximum(:version_number) || 0
  end
end
