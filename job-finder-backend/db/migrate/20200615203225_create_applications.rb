class CreateApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :applications do |t|
      t.string :title
      t.string :company
      t.string :link
      t.boolean :applied
      t.string :poc
      t.string :interview_date
      t.string :interviewer
      t.boolean :rejected
      t.boolean :received_offer
      t.boolean :accepted_offer
      t.integer :user_id

      t.timestamps
    end
  end
end
