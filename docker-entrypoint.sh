#!/bin/bash
cd /opt/ && mkdir apps && mkdir logs
cd /opt/apps/

if [ "$APP_MODE" = "init" ]; then
    git clone https://$GIT_USER:$GIT_PASSWD@github.com/raweng/zero_core_nextjs.git $PROJECT_NAME
    cd $PROJECT_NAME
    rm -rf .git

elif [ "$APP_MODE" = "release" ]; then
    cd $PROJECT_NAME
    npm install
    npm run build
    NODE_ENV=production /opt/node/bin/pm2-runtime start npm --name nextapp --output /opt/logs/nextapp.log --error /opt/logs/nextapperror.log -- run start 

else
    cd $PROJECT_NAME
    npm install
    /opt/node/bin/pm2-runtime start npm --name nextapp --watch --output /opt/logs/nextapp.log --error /opt/logs/nextapperror.log -- run dev
fi
