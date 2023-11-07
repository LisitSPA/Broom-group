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
class VersionSerializer < ActiveModel::Serializer
  attribute :id, key: :versionId
  attribute :version_number, key: :versionNumber
  attribute :title
  attribute :description
  attribute :author
  attribute :source_file, key: :sourceFile
  attribute :simulation, key: :isSimulated

  def author
    object.author&.email
  end
end
