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
require 'rails_helper'

RSpec.describe Matrix, type: :model do
  context "with basic validations" do
    it "is valid with a name and description" do
      matrix = Matrix.new(
        title: "Test Matrix",
        description: "This is a test matrix."
      )
      expect(matrix).to be_valid
    end
  
    it "is valid with a name but no description" do
      matrix = Matrix.new(
        title: "Test Matrix"
      )
      expect(matrix).to be_valid
    end
  
    it "is invalid without a name" do
      matrix = Matrix.new(
        description: "This is a test matrix."
      )
      expect(matrix).to be_invalid
    end
  end

  describe "associations" do
    it "has many versions" do
      matrix = Matrix.new(
        title: "Test Matrix",
        description: "This is a test matrix."
      )
      admin = FactoryBot.create(:user, :admin)
      version1 = FactoryBot.create(:version, matrix: matrix, author: admin)
      version2 = FactoryBot.create(:version, matrix: matrix, author: admin)
  
      expect(matrix.versions).to include(version1)
      expect(matrix.versions).to include(version2)
    end
  end

end
