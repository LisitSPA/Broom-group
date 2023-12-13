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
class Ownership < ApplicationRecord
	validates :owner, :subsidiary, presence: true
	# validates :owner_id, uniqueness: { scope: :subsidiary_id }
	validates :percentage, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
	validate :firms_share_same_version, if: :owner_and_subsidiary_exist?
	validate :cannot_be_owned_by_itself, if: :owner_and_subsidiary_exist?
	# validate :prevent_cycles_in_graph, if: :owner_and_subsidiary_exist?

	belongs_to :owner, class_name: 'Firm'
	belongs_to :subsidiary, class_name: 'Firm'

	private

	def owner_and_subsidiary_exist?
		owner.present? && subsidiary.present?
	end

	def firms_share_same_version
		if owner.version != subsidiary.version
			errors.add(:base, "Firms must have the same version")
		end
	end

	def cannot_be_owned_by_itself
		if owner == subsidiary
			errors.add(:base, "A firm cannot be owned by itself")
		end
	end

	# def prevent_cycles_in_graph
	# 	visited = Set.new
	# 	stack = [owner]
	# 	while stack.any?
	# 		node = stack.pop
	# 		visited.add(node)
	# 		node.owners.each do |owner|
	# 			if owner == subsidiary
	# 				errors.add(:base, "Creating this would create a cycle in the ownership graph")
	# 				return
	# 			elsif !visited.include?(owner)
	# 				stack.push(owner)
	# 			end
	# 		end
	# 	end
	# end
end
