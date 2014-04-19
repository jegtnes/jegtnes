require 'capistrano/shared_file'
require 'capistrano-rbenv'
set :rbenv_ruby_version, '2.1.0'

set :application, 'jegtnes.co.uk'
set :user, 'ajms'
set :deploy_to, '/home/ajms/webapps/aj_ghost/ghost'

set :use_sudo, false
set :scm, :git
set :repository,  'git@github.com:jegtnes/jegtnes.git'

default_run_options[:pty] = true
set :ssh_options, forward_agent: true

server 'jegtnes.co.uk', :web, :app, :db, primary: true

set :shared_files,    ['config.js']
set :shared_children, ['content/data', 'content/images']

set :keep_releases, 5

namespace :deploy do
  task :mkdir_shared do
    run 'cd #{shared_path} && mkdir -p data images files'
  end
end

after 'deploy:create_symlink', 'deploy:mkdir_shared'
after 'deploy:generate_sitemap', 'deploy:cleanup'
