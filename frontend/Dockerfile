FROM node:20

WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expo default port
EXPOSE 8081

# Start the expo server for web
CMD ["npx", "expo", "start", "--web"]
