class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.string :gender
      t.date :dob
      t.string :city
      t.string :state
      t.string :country
      t.string :name
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
