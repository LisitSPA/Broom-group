FROM ruby:3.0.0

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null && \
    echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client libvips-dev

WORKDIR /broom-app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v '2.4.17' && bundle install --jobs 20 --retry 5

COPY package.json yarn.lock ./
RUN yarn install

ENV PATH="/broom-app/node_modules/.bin:$PATH"

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
