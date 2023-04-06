# Base image
FROM node:14.16.0-alpine

# Set the working directory
WORKDIR /app

# Copy both .json to working directory and Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files in directory to the working directory in Docker container
COPY . .

# Set environment variables
ENV PORT=5000
# ENV GOOGLE_CLIENT_ID=
# ENV GOOGLE_CLIENT_SECRET=
# ENV FACEBOOK_APP_ID=
# ENV FACEBOOK_APP_SECRET=
# ENV JWT_SECRET=
# ENV MONGODB_URL=mongodb://localhost:27017/TwitterClone
# ENV CLIENT_URL=http://localhost:3000
# ENV SERVER_URL=http://localhost:5000
# ENV STRIPE_PRIVATE_KEY=

# Port container will listen to
EXPOSE 5001

# Command will run when container start
CMD ["npm", "start"]