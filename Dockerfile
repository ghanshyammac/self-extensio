FROM ubuntu:18.04
MAINTAINER Vinesh Kamble <vinesh.kamble@raweng.com>
ARG APP_MODE=development
ENV env_APP_MODE=$APP_MODE
ARG NODE_VERSION
ENV env_NODE_VERSION=$NODE_VERSION
ENV PROJECT_NAME=defaultnextapp
RUN apt-get update && apt-get install -y wget git
RUN mkdir /opt/stuff && cd /opt/stuff && wget https://nodejs.org/dist/v"$NODE_VERSION"/node-v"$NODE_VERSION"-linux-x64.tar.gz
RUN cd /opt/stuff && tar -xvf /opt/stuff/node-v"$NODE_VERSION"-linux-x64.tar.gz && ls /opt/stuff && mv node-v"$NODE_VERSION"-linux-x64 /opt/node
RUN ln -s /opt/node/bin/node /usr/bin/  && ln -s /opt/node/bin/npm /usr/bin/
COPY ./Dockerfile /
COPY ./docker-entrypoint.sh /

RUN /opt/node/bin/npm install pm2 --global
ENTRYPOINT ["/docker-entrypoint.sh"]

