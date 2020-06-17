class CreateApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :applications do |t|
      t.string :title
      t.string :company
      t.string :link
      t.string :applied
      t.string :poc
      t.string :interview_date
      t.string :interviewer
      t.string :rejected
      t.string :received_offer
      t.string :accepted_offer
      t.integer :user_id

      t.timestamps
    end
  end
end
