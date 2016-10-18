class TourOfHeroesController < ApplicationController
  layout 'application_demo'
  prepend_view_path Rails.root.join('app', 'tour_of_heroes', 'views')

  skip_before_action :verify_authenticity_token
  before_action :load_hero, only: [:show, :update, :edit, :destroy]

  def demo
    render 'demo'
  end

  def index
    @heroes = Hero.all
    render json: @heroes
  end

  def show
    @hero = Hero.find(params[:id])
    render json: @hero
  end

  def new
    render json: Hero.new
  end

  def edit
    @hero = Hero.find(params[:id])
    render json: @hero
  end

  def update
    if @hero.update_attributes(hero_params)
      render json: @hero
    else
      render json: @hero.errors, status: :unprocessable_entity
    end
  end

  def create
    @hero = Hero.new(hero_params)
    if @hero.save
      render json: @hero
    else
      render json: @hero.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @hero.delete
    render json: @hero
  end

  private

  def load_hero
    @hero = Hero.find(params[:id])
  end

  def hero_params
    params.require(:hero).permit(:name)
  end
end