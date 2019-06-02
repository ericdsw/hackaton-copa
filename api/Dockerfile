FROM node

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig.json tslint.json ./
COPY src ./src
COPY resources ./resources

RUN yarn build
RUN touch .env #hacks no crash

CMD ["yarn", "serve"]
# CMD ["sleep", "infinity"]
