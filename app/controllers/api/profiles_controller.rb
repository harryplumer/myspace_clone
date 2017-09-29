class Api::ProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :get_profile, only: [:show, :update, :destroy]

  def show
    render json: @profile
  end 

  def create
    profile = current_user.create_profile(profile_params)
    if profile.save
      render json: profile
    else
      render json: { errors: tournament.errors.join(',') }, status: 422
    end
  end

  private 
    def get_profie
      @profile = Profile.find(params[:id])
    end

    def profile_params
      params.require(:profile).permit(:name, :dob, :gender, :city, :state, :country)
    end
end
