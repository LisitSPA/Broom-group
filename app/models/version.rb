# == Schema Information
#
# Table name: versions
#
#  id             :bigint           not null, primary key
#  description    :text
#  simulation     :boolean          default(FALSE)
#  source_file    :string
#  title          :string
#  version_number :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  author_id      :bigint           not null
#  matrix_id      :bigint           not null
#
# Indexes
#
#  index_versions_on_author_id  (author_id)
#  index_versions_on_matrix_id  (matrix_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (matrix_id => matrices.id)
#
require 'digest'
class Version < ApplicationRecord
	belongs_to :author, class_name: "User"
	belongs_to :matrix

	has_many :firms, dependent: :destroy

	def firms_signature
		firm_profile_ids = firms.order(:firm_profile_id).pluck(:firm_profile_id).join()
		
		Digest::SHA256.hexdigest(firm_profile_ids)
	end
	
	def investors_signature
		investor_owner_ids = firms.order(:firm_profile_id).map do |firm|
			firm.investors.map { |investor| investor.owner.firm_profile_id }
		end.flatten.sort.join()

		Digest::SHA256.hexdigest(investor_owner_ids)
	end
end
