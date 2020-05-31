FROM node:carbon
WORKDIR /app
COPY . /app
RUN npm install
RUN mkdir /ssl
COPY privkey.pem /ssl
COPY fullchain.pem /ssl
EXPOSE 3000
ENV MONGODB_URL mongodb://localhost:27017
CMD ["node", "bin/www"]
