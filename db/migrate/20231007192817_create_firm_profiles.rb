class CreateFirmProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :firm_profiles do |t|
      t.string :title
      t.text :description
      t.string :rut
      t.string :sap_code
      t.references :country, foreign_key: true

      t.timestamps
    end
  end
end
