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
class MatrixSerializer < ActiveModel::Serializer
  attribute :id, key: :matrixId
  attribute :title, key: :matrixName
  attribute :description, key: :matrixDescription
  attribute :versionsCount
  attribute :lastVersionId
  attribute :versions

  def versions
    versions_to_show = filter_versions_based_on_simulation
    ActiveModel::SerializableResource.new(versions_to_show, each_serializer: VersionSerializer)
  end

  def lastVersionId
    object.versions.last&.id
  end

  def versionsCount
    object.versions.count
  end

  private

  def filter_versions_based_on_simulation
    only_simulated = instance_options[:onlySimulated] == 'true'
    object.versions.where(simulation: only_simulated)
  end
end
