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
class Firm < ApplicationRecord
	validates :firm_profile, :version, presence: true
	validates :firm_profile_id, uniqueness: { scope: :version_id }

	belongs_to :firm_profile
	belongs_to :version

	has_many :investments, class_name: 'Ownership', foreign_key: :owner_id, dependent: :destroy
	has_many :subsidiaries, through: :investments, source: :subsidiary

	has_many :investors, class_name: 'Ownership', foreign_key: :subsidiary_id, dependent: :destroy
	has_many :owners, through: :investors, source: :owner

	def owners_structure(level=1, structure={}, owners={})
		if level == 1
			owners = self.investors
		else
			owners = owners.map(&:owner).map(&:investors).flatten
		end

		structure[level] = owners

		if owners.present?
			owners_structure(level+1, structure, owners)
		else
			structure.delete(level) if structure[level-1].present?
			structure
		end
	end

	def name
		self.firm_profile.title
	end

	def is_final
		self.investors.count == 0
	end

	def owners_map
		return OwnersMapService.new(self).call
	end
end
