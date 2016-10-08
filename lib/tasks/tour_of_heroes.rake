# Tasks for generating a example angular2 app
# @namespace: spartan
namespace :tour_of_heroes do
  EXAMPLE_APP_DIR = Rails.root.join('app', 'tour_of_heroes').freeze
  APP_CONFIG = Rails.root.join('config', 'application.rb').freeze
  ASSETS_CONFIG = Rails.root.join('config', 'initializers', 'assets.rb').freeze

  # @task: setup
  # @desc: Creates the Tour of Heroes table in your database, creates app/spartan and copies example files and updates the routes.rb
  desc 'Create Tour of Heroes example'
  task :setup => :environment do
    conn = ActiveRecord::Base.connection
    unless conn.table_exists? :heroes
      conn.create_table :heroes do |t|
        t.string :name, null: false
        t.timestamps
      end
      conn.add_index :heroes, :name
    end

    Rake::Task[:update_app_conf].invoke
    Rake::Task[:update_assets_conf].invoke
    Rake::Task[:copy_example_app].invoke
    Rake::Task[:add_routes].invoke
  end

  # @task: seed
  # @desc: This task adds some Spartan names to the db
  desc 'Seed Tour of Heroes data'
  task :seed => :environment do
    conn = ActiveRecord::Base.connection
    return unless conn.table_exists? :heroes
    heroes = [
        'Dienekes',
        'Leonidas',
        'Maron',
        'Alpheus',
        'Pantities',
        'Eurytus',
        'Aristodemus'
    ]
    heroes.each {|hero| Hero.where(name: hero).first_or_create}
  end

  # @task: remove
  # @desc: Deletes the db table spartan, remove the app/spartan dir and updates the routes.rb
  desc 'Remove Tour of Heroes example'
  task :remove => :environment do
    conn = ActiveRecord::Base.connection
    conn.drop_table :heroes if conn.table_exists? :heroes

    Rake::Task[:remove_app_conf].invoke
    Rake::Task[:remove_assets_conf].invoke
    Rake::Task[:remove_example_app].invoke
    Rake::Task[:remove_routes].invoke
  end

  file :update_app_conf do
    if File.exist? APP_CONFIG
      File.open(APP_CONFIG, 'r+:UTF-8') do |f|
        lines = f.readlines
        lines.insert -3, "\n" << '    Rails.application.config.eager_load_paths += Dir[Rails.root.join(\'app\', \'tour_of_heroes\', \'**\')]' << "\n\n"
        f.truncate 0
        f.seek(0, IO::SEEK_SET)
        lines.each {|line| f.syswrite line}
      end
    end
  end

  file :remove_app_conf do
    if File.exists? APP_CONFIG
      File.open(APP_CONFIG, 'r+:UTF-8') do |file|
        text = file.read
        text.gsub! /\n\s\s\s\sRails\.application\.config\.eager_load_paths\s\+\=\sDir\[Rails\.root\.join\('app',\s'tour_of_heroes',\s'\*\*'\)\]\n\n/, ''
        text.strip!
        file.truncate 0
        file.seek(0, IO::SEEK_SET)
        file.syswrite text
      end
    end
  end

  file :update_assets_conf do
    if File.exists? ASSETS_CONFIG
      File.open(ASSETS_CONFIG, 'r+:UTF-8') do |file|
        lines = file.readlines
        lines << "\n"
        lines << "Rails.application.config.assets.precompile += %w( ui_demo.js )\n"
        lines << "Rails.application.config.assets.paths << Rails.root.join('app', 'tour_of_heroes', 'assets', 'javascripts')\n"
        lines << "Rails.application.config.assets.paths << Rails.root.join('app', 'tour_of_heroes', 'angular')\n"
        file.truncate 0
        file.seek(0, :SET)
        lines.each {|line| file.syswrite line}
      end
    end
  end

  file :remove_assets_conf do
    if File.exists? ASSETS_CONFIG
      File.open(ASSETS_CONFIG, 'r+:UTF-8') do |file|
        text = file.read
        text.gsub! "Rails.application.config.assets.precompile += %w( ui_demo.js )\n", ''
        text.gsub! "Rails.application.config.assets.paths << Rails.root.join('app', 'tour_of_heroes', 'assets', 'javascripts')\n", ''
        text.gsub! "Rails.application.config.assets.paths << Rails.root.join('app', 'tour_of_heroes', 'angular')\n", ''
        text.strip!
        file.truncate 0
        file.seek(0, IO::SEEK_SET)
        file.syswrite text
      end
    end
  end

  file :copy_example_app do
    unless Dir.exist? EXAMPLE_APP_DIR
      cp_r Rails.root.join('examples','app'), EXAMPLE_APP_DIR
    end
  end

  file :remove_example_app do
    if Dir.exist? EXAMPLE_APP_DIR
      rm_r EXAMPLE_APP_DIR
    end
  end

  file :add_routes do
    write_at_line = 2
    FileList.new([Rails.root.join('config', 'routes.rb')]) do |files|
      file = files.first
      open(file, 'r+:UTF-8') do |f|
        while(write_at_line -= 1) > 0
          f.readline
        end
        pos = f.pos
        rest = f.read
        f.seek pos
        f.write '  resources :tour_of_heroes' << "\n"
        f.write '  get \'/demo\', to: \'tour_of_heroes#demo\'' << "\n\n"
        f.write rest
      end
    end
  end

  file :remove_routes do
    File.open(Rails.root.join('config', 'routes.rb'), 'r+:UTF-8') do |file|
      text = file.read
      text.gsub!(/\s\sresources\s\:tour_of_heroes\n/, '')
      text.gsub!(/\s\sget\s\'\/demo\',\sto\:\s\'tour_of_heroes\#demo\'\n\n/, '')
      text.strip!
      file.truncate 0
      file.seek(0, IO::SEEK_SET)
      file.syswrite text
    end
  end
end
