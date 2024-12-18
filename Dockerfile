# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the port for Vite dev server
EXPOSE 5173

# Build the React app
RUN npm run build

# Start nginx
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "dev", "--", "--host"]
