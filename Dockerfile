FROM node

RUN mkdir -p /public_chat/src/client
COPY package.json /public_chat

COPY src/client/package.json /public_chat/src/client

WORKDIR /public_chat/src/client
RUN npm install

WORKDIR /public_chat
RUN npm install
RUN npm install -g pm2

COPY . /public_chat

EXPOSE 8000
EXPOSE 3000

CMD ["npm", "start"]
#CMD pm2 start proccess.yml --env production --no-daemon