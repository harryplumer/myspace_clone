class Api::PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :get_post, only: [:show, :update, :destroy]
  
  def index 
    render :json => Post.order(:created_at).to_json(:include => {:profile => {:only => :name}})
  end

  def show
    render json: @post
  end

  def create 
    post = current_user.posts.new(post_params)
    if post.save
      render json: post.to_json(:include => {:profile => {:only => :name}})
    else
      render json: { errors: tournament.errors.join(',') }, status: 422
    end
  end 

  def update 
    if @post.update(post_params)
      render json: @post.to_json(:include => {:profile => {:only => :name}})
    else
      render json: { errors: @post.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @post.destroy
  end

  private
  def get_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:body)
  end


end
