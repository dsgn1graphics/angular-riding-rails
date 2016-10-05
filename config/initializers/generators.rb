Rails.application.config.generators do |g|
  g.test_framework :rspec
  g.integration_tool :rspec
  g.stylesheets false
  g.javascripts false
end