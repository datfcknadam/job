FROM node:10
WORKDIR /front/admin
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8081
CMD ["npm", "run:serve"]