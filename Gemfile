source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.4"

gem "rails", "~> 7.0.8"
gem "sprockets-rails"
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "bootsnap", require: false
gem "vite_rails"
gem "vite_ruby"
gem "ruby-vips", "~> 2.1", ">= 2.1.4"
gem "active_model_serializers"
gem "devise"
gem "devise-i18n"
gem 'chilean-rutify'

group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem "rspec-rails", "~> 5.0.0"
  gem "factory_bot_rails"
  gem "faker"
end

group :development do
  gem "web-console"
  gem "annotate"
end