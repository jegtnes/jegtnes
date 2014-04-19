require 'capistrano/node-deploy'
require 'capistrano/shared_file'
require 'capistrano-rbenv'
set :rbenv_ruby_version, '2.1.0'

set :application, 'jegtnes.co.uk'
set :user, 'ajms'
set :deploy_to, '/home/ajms/webapps/aj_ghost/ghost'

set :app_command, 'index'

set :use_sudo, false
set :scm, :git
set :repository,  'git@github.com:jegtnes/jegtnes.git'

default_run_options[:pty] = true
set :ssh_options, forward_agent: true

server 'jegtnes.co.uk', :web, :app, :db, primary: true

set :shared_files,    ['config.js']
set :shared_children, ['content/data', 'content/images']
set :npm_binary, '/home/ajms/webapps/aj_ghost/bin/npm'

set :keep_releases, 3

namespace :deploy do
  task :mkdir_shared do
    run 'cd #{shared_path} && mkdir -p data images files'
  end

  task :generate_sitemap do
    run 'cd #{latest_release} && ./ghost_sitemap.sh #{latest_release}'
  end
end

namespace :node do
  desc 'Check required packages and install if packages are not installed'
  task :install_packages do
    run 'mkdir -p #{previous_release}/node_modules ; cp -r #{previous_release}/node_modules #{release_path}' if previous_release
    run 'cd #{release_path} && PATH=#{nvm_path}:$PATH #{npm_binary} install --loglevel warn'
  end
end

after 'deploy:create_symlink', 'deploy:mkdir_shared'
after 'node:restart', 'deploy:generate_sitemap'
after 'deploy:generate_sitemap', 'deploy:cleanup'
