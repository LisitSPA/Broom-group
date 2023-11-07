class Admin::UsersController < ApplicationController
  before_action :require_admin

  def index
    @users = User.all
  end

  def new
    @user = User.new
    render 'admin/users/new'
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_users_path, notice: 'Usuario creado correctamente.'
    else
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to admin_users_path, notice: 'Usuario actualizado correctamente.'
    else
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user != current_user
      @user.destroy 
      redirect_to admin_users_path, notice: 'Usuario eliminado correctamente.'
    else
      redirect_to admin_users_path, notice: 'No puedes eliminar tu propio usuario.'
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end

  def require_admin
    redirect_to root_path unless current_user&.admin?
  end
end