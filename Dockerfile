# Use the official Playwright image (includes browsers and dependencies)
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker cache for dependencies
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables (optional, can be overridden at runtime)
ENV CI=true

# Default command to run tests (can be overridden)
CMD ["npm", "run", "test:regression"]
