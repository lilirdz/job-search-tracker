class UsersController < ApplicationController
    def index 
        render json: User.all
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
