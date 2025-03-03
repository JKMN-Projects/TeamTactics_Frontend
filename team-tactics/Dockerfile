# Stage 1: Build the Angular application
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./team-tactics/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./team-tactics ./

# Build the application in production mode
RUN npm run build --configuration=production

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/team-tactics/browser /usr/share/nginx/html/

# Copy custom Nginx configuration (if you have one)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
