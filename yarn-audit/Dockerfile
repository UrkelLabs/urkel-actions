FROM node:10-slim

LABEL "com.github.actions.name"="Yarn Audit"
LABEL "com.github.actions.description"="Runs a `yarn audit fix` and opens a pull request to suggest the fixes."
LABEL "com.github.actions.icon"="lock"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/UrkelLabs/urkel-actions"
LABEL "homepage"="https://github.com/UrkelLabs/urkel-actions"
LABEL "maintainer"="Urkel Labs Engineering <engineering@urkellabs.com>"

COPY package*.json /
COPY . .

RUN npm ci

ENTRYPOINT ["node", "/index.js"]
