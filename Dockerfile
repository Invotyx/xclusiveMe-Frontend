# Base on offical Node.js Alpine image
FROM node:14-alpine

# Set working directory
WORKDIR /usr/app

LABEL org.opencontainers.image.source https://github.com/Invotyx/xclusiveme-frontend

ARG REACT_APP_BASE_URL
ENV BACKEND_URL=${REACT_APP_BASE_URL}
ENV STRIPE_KEY=pk_test_51HtIzzBV9RJUxo9gopHOJW9XVDLKXU8D99DC6nkRn7hoOqlz6096MYeLUyoR77PJL8pnIrtHYRozUlazvej389dT00a9my74EQ

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# make /.next/cache directory
RUN mkdir /usr/app/.next/cache

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "npm", "start" ]
