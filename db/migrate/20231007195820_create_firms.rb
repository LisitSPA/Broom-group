class CreateFirms < ActiveRecord::Migration[7.0]
  def change
    create_table :firms do |t|
      t.boolean :can_own, default: true
      t.boolean :can_be_owned, default: true
      t.references :firm_profile, null: false, foreign_key: true
      t.references :version, null: false, foreign_key: true

      t.timestamps
    end
  end
end
