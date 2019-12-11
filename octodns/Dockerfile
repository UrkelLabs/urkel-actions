FROM node:10-slim

LABEL "com.github.actions.name"="OctoDNS"
LABEL "com.github.actions.description"="Runs the OctoDNS operations."
LABEL "com.github.actions.icon"="lock"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/UrkelLabs/urkel-actions"
LABEL "homepage"="https://github.com/UrkelLabs/urkel-actions"
LABEL "maintainer"="Urkel Labs Engineering <engineering@urkellabs.com>"

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && rm -rf /var/cache/apk/*

  # Upgrade pip
RUN pip install --upgrade pip

# Install Octodns
RUN pip install octodns

COPY package*.json /
COPY . .

RUN yarn

ENTRYPOINT ["node", "/index.js"]
