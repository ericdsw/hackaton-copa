FROM mongo

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY download-data.sh .
RUN mkdir data && ./download-data.sh

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -y nodejs 

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && apt-get update && apt-get install -y yarn

COPY package.json yarn.lock ./
RUN yarn install

COPY scripts ./scripts
COPY seed-data.sh .

RUN yarn convert

EXPOSE 27017

# ENTRYPOINT ["./seed-data.sh"]
