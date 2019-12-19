#!/bin/sh
ssh ubuntu@160.16.220.69 << EOC
  cd ~/meshireach-vue
  docker-compose -f docker-compose-production.yml down
  git fetch origin deploy
  git reset --hard origin/deploy
  docker image prune -f
  docker container prune -f
  docker-compose -f docker-compose-production.yml build --no-cache
  docker-compose -f docker-compose-production.yml run web yarn build
  nohup docker-compose -f docker-compose-production.yml up -d
EOC
