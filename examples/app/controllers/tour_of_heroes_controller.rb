class TourOfHeroesController < ApplicationController
  layout 'application_demo'
  prepend_view_path Rails.root.join('app', 'tour_of_heroes', 'views')

  def demo
    render 'demo'
  end

  def index
    @heroes = Hero.all
    render :json, @heroes
  end

  def new
    render :json, Hero.new
  end

  def edit
    @hero = Hero.find(params[:id])
    render :json, @hero
  end

  def update
    if @hero.update_attributes(hero_params)
      render :json, @hero
    else
      render :json, @hero.errors, :unprocessable_entity
    end
  end

  def create
    @hero = Hero.new(hero_params)
    if @hero.save
      render :json, @hero
    else
      render :json, @hero.errors, :unprocessable_entity
    end
  end

  def destroy
    Hero.find(params[:id]).delete
    render :no_content
  end

  private

  def hero_params
    params.require(:hero).permit(:hero_id, :name)
  end
end