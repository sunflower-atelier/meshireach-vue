#!/bin/sh
ssh ubuntu@160.16.220.69 << EOC
  cd ~/meshireach-vue
  docker-compose down
  git fetch origin deploy
  git reset --hard origin/deploy
  docker-compose -f docker-compose-production.yml build
  docker-compose -f docker-compose-production.yml run web yarn install
  docker-compose -f docker-compose-production.yml run web yarn build
  nohup docker-compose -f docker-compose-production.yml up -d
EOC
