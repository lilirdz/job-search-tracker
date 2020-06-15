class ApplicationsController < ApplicationController
    def index    
        render json: Application.all
    end 
    
    def create
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

        application = Application.new(title: title, company: company, link: link, applied: applied,poc: poc, interview_date: interview_date, interviewer: interviewer, rejected: rejected, received_offer: received_offer, accepted_offer:accepted_offer,user_id: params[:user_id])

        if application.save 
            render json: application
        else
            render json: {error: 'Please write in required fields.'}
        end
    end
    
    def destroy 
        application = Application.find_by_id(params[:id])

        if  application
            application.destroy 
            render json:  application
        else
            render json: { error: 'Invalid  application' }
        end
    end 

    def applications_params
        params.require(:application).permit!
    end 
end
