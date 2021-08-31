# Base on offical Node.js Alpine image
FROM node:14-alpine

# Set working directory
WORKDIR /usr/app

LABEL org.opencontainers.image.source https://github.com/Invotyx/xclusiveme-frontend

ARG REACT_APP_BASE_URL
ENV BACKEND_URL=${REACT_APP_BASE_URL}
ENV STRIPE_KEY=pk_test_51JUNyLGzVSqDAZBcOWD4UtRIcUSef8AJUMntVySrltOBb8H0CP355nWJkXHVqsgQs0XGEkYI6kCQy1Nq8CdbnzxF00lT3yXnGj

COPY ./package.json ./
COPY ./yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./

# Build app
RUN yarn run build

# Expose the listening port
EXPOSE 3000

RUN chown -R node:node /usr/app/.next/

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run yarn start script when container starts
CMD [ "yarn", "start" ]
