FROM node:10-slim

LABEL "com.github.actions.name"="OctoDNS"
LABEL "com.github.actions.description"="Runs the OctoDNS operations."
LABEL "com.github.actions.icon"="lock"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/UrkelLabs/urkel-actions"
LABEL "homepage"="https://github.com/UrkelLabs/urkel-actions"
LABEL "maintainer"="Urkel Labs Engineering <engineering@urkellabs.com>"

# Install python
RUN apt update && apt install python2.7 python-pip

# Upgrade pip
RUN pip install --upgrade pip

# Install Octodns
RUN pip install octodns

COPY package*.json /
COPY . .

RUN yarn

ENTRYPOINT ["node", "/index.js"]
