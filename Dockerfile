FROM node:14.16
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

EXPOSE 8080
CMD /wait && npm start