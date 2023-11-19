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
class FirmProfile < ApplicationRecord
	belongs_to :country, optional: true
	has_many :firms, dependent: :destroy
	validates :rut, presence: true, uniqueness: { case_sensitive: false }, rut: true
	validates :title, presence: true
	validates :country, presence: true

	scope :search, -> (query) {
		left_joins(:country)
		.where('UPPER(title) = ? OR UPPER(rut) = ?',
		"#{query.upcase}", "#{query.upcase}")
	}

	def rut=(value)
		value = Chilean::Rutify.format_rut(value)
		super(value)
	end
end
