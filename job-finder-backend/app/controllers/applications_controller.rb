class ApplicationsController < ApplicationController
    def index    
        render json: Application.all
    end 
    
    def create
        application = Application.new(applications_params)
        if application.save 
            render json: application
        else
            render json: {error: 'Please write in required fields.'}
        end
    end
    
    def destroy 
        application = Application.find(params[:id])
        if  application
            application.destroy 
            render json:  application
        else
            render json: { error: 'Invalid  application' }
        end
    end 

    private 
    def applications_params
        params.require(:application).permit!
    end 
end
