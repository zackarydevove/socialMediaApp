# Base image
FROM node:14.16.0-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Build app
RUN npm run build

# Set environment variables
# ENV REACT_APP_API_URL=http://localhost:5000/api
# ENV REACT_APP_SERVER_URL=http://localhost:5000

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]