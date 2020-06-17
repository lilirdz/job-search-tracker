class UsersController < ApplicationController
    def index 
        render json: User.all, include: :applications
    end

    def show
        user = User.find(params[:id])
        render json: user, include: :applications

    end

    def create 
        user = User.new(user_params)
        if user.save
            render json: user, except: [:created_at, :updated_at], include: :applications
        else
            render json: {error: 'Please write a name.'}
        end
    end

    def update  
        user = User.find(params[:id])
        user.update(user_params)
        render json: user
    end 

    private

    def user_params
        params.require(:user).permit(:name, :status)
    end
end
