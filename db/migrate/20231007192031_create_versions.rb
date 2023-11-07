class CreateVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :versions do |t|
      t.string :title
      t.text :description
      t.boolean :simulation, default: false
      t.integer :version_number
      t.string :source_file
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :matrix, null: false, foreign_key: true

      t.timestamps
    end
  end
end
