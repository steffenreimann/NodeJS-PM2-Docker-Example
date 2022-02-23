ARG GITHUB_USER \ 
    PORT_NUMBER \ 
    INSPECT_PORT \
    GITHUB_LINK \
    GITHUB_BRANCH \
    NODE_VERSION 


FROM node:$NODE_VERSION
RUN apk --no-cache add git


WORKDIR /app

#RUN npm install -g npm

RUN npm install pm2 -g

RUN git clone -b main https://github.com/steffenreimann/NodeJS-PM2-Docker-Example.git /app/Watcher
WORKDIR /app/Watcher/
RUN npm install

RUN git clone -b $GITHUB_BRANCH $GITHUB_LINK /app/Server
WORKDIR /app/Server/
RUN npm install


EXPOSE $PORT_NUMBER
EXPOSE $INSPECT_PORT

ENV GITHUB_LINK $GITHUB_LINK
ENV GITHUB_BRANCH $GITHUB_BRANCH



CMD ["pm2-runtime", "./Watcher/ecosystem.config.js"]
