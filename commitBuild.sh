
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install ruby
sudo apt-get install ruby-dev

gem update --system
gem install compass

npm install node-sass
npm install node-inspector
 
npm install grunt
npm install grunt-htmlhint

npm install -d


grunt build --force 
