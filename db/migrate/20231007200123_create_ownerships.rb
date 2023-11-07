class CreateOwnerships < ActiveRecord::Migration[7.0]
  def change
    create_table :ownerships do |t|
      t.float :percentage
      t.references :owner, null: false, foreign_key: { to_table: :firms }
      t.references :subsidiary, null: false, foreign_key: { to_table: :firms }

      t.timestamps
    end
  end
end