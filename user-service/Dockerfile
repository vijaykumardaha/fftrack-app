FROM node:16-alpine

RUN apk --no-cache add --virtual .builds-deps build-base python3

# Create app directory
WORKDIR /app/user

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081

CMD ["npm", "start"]
