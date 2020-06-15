# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

User.destroy_all
Application.destroy_all

User.create(name: "Bob", status: "actively seeking")

20.times do 
     title = Faker::Job.title
     company = Faker::Company.name
     link = ''
     applied = false
     poc = Faker::Name.name
     interview_date = ''
     interviewer = Faker::Name.name
     rejected = false
     received_offer = false
     accepted_offer = false
     Application.create(title: title, company: company, link: link, applied: applied,poc: poc,interview_date: interview_date, interviewer: interviewer,rejected: rejected,received_offer: received_offer,accepted_offer: accepted_offer, user_id: User.first.id)
end