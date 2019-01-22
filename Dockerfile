FROM  node:10.5.0-alpine
WORKDIR /client
COPY . .
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000
