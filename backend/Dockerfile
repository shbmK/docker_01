FROM node:18.14.2

WORKDIR /app/

COPY package.json .

RUN npm i

COPY . .

CMD ["npm","start"]

