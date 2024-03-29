FROM ubuntu:22.04

# Set noninteractive to avoid tzdata hanging
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Los_Angeles

# Install essential tools and dependencies
RUN apt-get update && apt-get install -y \
    lsof \
    curl \
    wget \
    git \
    vim \
    emacs \
    locales \
    build-essential \
    gcc && \
    locale-gen en_US.UTF-8

# Set environment variables
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Clean up APT when done
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /atlas-the-joy-of-painting-api

# Copy the application code
COPY . .

# Change ownership of the application directory
# Do this before switching to the non-root user
RUN useradd -m correction_tester && \
    chown -R correction_tester:correction_tester /atlas-the-joy-of-painting-api

# Switch to non-root user
USER correction_tester

# Install Node.js project dependencies
RUN npm install

# Make the start script executable
# This should be executable already but just in case
RUN chmod +x ./start.sh

# Expose the application port
EXPOSE 3000 5432

# Start the application
ENTRYPOINT ["./start.sh"]

# temp  run to diagnose problems through output
# CMD ["/bin/bash", "-c", "./start.sh"]
