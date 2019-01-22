FROM  node:10.5.0-slim
WORKDIR /client
COPY . .
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000
