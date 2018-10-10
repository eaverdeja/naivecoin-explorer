# base image
FROM node:10

# set working directory
RUN mkdir /usr/src/naivecoin-explorer
WORKDIR /usr/src/naivecoin-explorer

# add `/usr/src/naivecoin-explorer/node_modules/.bin` to $PATH
ENV PATH /usr/src/naivecoin-explorer/node_modules/.bin:$PATH

# install and cache naivecoin-explorer dependencies
COPY package.json /usr/src/naivecoin-explorer/package.json

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# start app
CMD ["npm", "start"]
