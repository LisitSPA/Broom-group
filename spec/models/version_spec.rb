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
require 'rails_helper'

RSpec.describe Version, type: :model do
  it 'has a valid factory' do
    version = FactoryBot.build(:version)
  end

  context 'validations' do
    it 'cannot be created without an author' do
      version = FactoryBot.build(:version, author: nil)
      expect(version).to_not be_valid
    end

    it 'cannot be created without a matrix' do
      version = FactoryBot.build(:version, matrix: nil)
      expect(version).to_not be_valid
    end

    it 'can be created with an author and a matrix' do
      version = FactoryBot.build(:version)
      expect(version).to be_valid
    end
  end

  context 'associations' do
    it 'has many firms' do
      version = FactoryBot.build(:version)
      expect(version).to respond_to(:firms)
    end
  end
end
