FROM node:18-alpine3.17

# Define working directory
WORKDIR /app

# Copy other project files to container
COPY . .

# Install dependencies
RUN npm install

# Install dependencies
RUN npm run build

# Run a startup command when container starts
CMD ["npm", "start"]