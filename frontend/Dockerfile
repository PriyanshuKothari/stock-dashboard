# Frontend Dockerfile
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Build frontend
RUN npm run build

# Install serve to serve build folder
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Run serve
CMD ["serve", "-s", "build", "-l", "3000"]
