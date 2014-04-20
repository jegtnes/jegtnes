require 'capistrano/node-deploy'
require 'capistrano/shared_file'
require 'capistrano-rbenv'
set :rbenv_ruby_version, '2.1.0'

set :application, 'jegtnes.co.uk'
set :user, 'ajms'
set :deploy_to, '/home/ajms/webapps/aj_blogport/ghost'

set :app_command, 'index'

set :use_sudo, false
set :scm, :git
set :repository,  'git@github.com:jegtnes/jegtnes.git'

default_run_options[:pty] = true
set :ssh_options, forward_agent: true

server 'jegtnes.co.uk', :web, :app, :db, primary: true

set :shared_files,    ['config.js']
set :shared_children, ['content/data', 'content/images']
set :shared_file_dir,     '/home/ajms/webapps/aj_blogport/ghost/shared'

set :npm_binary, '/home/ajms/.nvm/v0.10.26/bin/npm'
set :node_binary, '/home/ajms/.nvm/v0.10.26/bin/node'

set :keep_releases, 3

namespace :deploy do
  task :mkdir_shared do
    run 'mkdir #{shared_file_dir}/data'
    run 'mkdir #{shared_file_dir}/images'
    run 'mkdir #{shared_file_dir}/files'
  end

  task :generate_sitemap do
    run 'cd #{latest_release} && ./ghost_sitemap.sh #{latest_release}'
  end
end

namespace :node do
  desc 'Check required packages and install if packages are not installed'
  task :after_completion_install_packages do
    run 'cd #{current_path} && PATH=#{nvm_path}:$PATH #{npm_binary} install --loglevel warn'
  end
end

after 'deploy:create_symlink', 'deploy:mkdir_shared'
after 'node:restart', 'node:after_completion_install_packages'
after 'node:restart', 'deploy:generate_sitemap'
after 'deploy:generate_sitemap', 'deploy:cleanup'
