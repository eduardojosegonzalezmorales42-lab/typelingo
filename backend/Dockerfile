FROM node:20

WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Backend default port
EXPOSE 3000

# Start the node server
CMD ["npm", "start"]
