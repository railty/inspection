class CreateInspections < ActiveRecord::Migration[5.0]
  def change
    create_table :inspections do |t|
      t.string :inspector
      t.datetime :inspected_at
      t.string :status
      t.string :comment
      t.point :gps
      t.json :properties
      t.references :feature
      t.timestamps
    end
  end
end
