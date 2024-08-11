# Description: Makefile for the docker-compose package
# This Makefile is used to manage Docker Compose services for development and testing.
# This Makefile is used to
# build, start, run, exec, stop, clean, and deep-clean the Docker Compose services.
# Created by: CKCarr
# Created on: 03/25/2024

# define a function to log make file executions for targets start and stop
define log_and_run
	@echo "`date +'%Y-%m-%d %H:%M:%S'` - Running command $(1)" | tee -a make.log
	@$(1) >> make.log 2>&1
endef

# Color definitions
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

# Default action if no target is specified
.DEFAULT_GOAL := up

.PHONY: up build status start create-volume inspect-volume run exec stop clean deep-clean

# Build the Docker Compose images
build:
	@echo "${GREEN}Building the Docker Compose services...${NC}"
	docker-compose build

# Start Docker Compose services
up: build
	@echo "${GREEN}Starting the Docker Compose services...${NC}"
	$(call log_and_run, docker-compose up -d)

# Display the status of Docker Compose services
status:
	@echo "${YELLOW}Checking the status of Docker Compose services...${NC}"
	docker-compose ps

# Run the Docker Compose services in interactive mode
run: build
	@echo "${GREEN}Running the Docker Compose services in interactive mode...${NC}"
	$(call log_and_run, docker-compose up)

# Execute a command in the Docker Compose service
# Example: make exec service=app cmd="ls -l"
service ?= app
cmd ?= bash

exec:
	@echo "${YELLOW}Executing command in the Docker Compose service...${NC}"
	docker-compose exec $(service) $(cmd)

# Stop Docker Compose services
stop:
	@echo "${RED}Stopping the Docker Compose services...${NC}"
	$(call log_and_run, docker-compose stop)

# Remove Docker Compose containers and images
clean:
	@echo "${RED}Cleaning up Docker Compose services...${NC}"
	$(call log_and_run, docker-compose down --rmi all)

# Remove Docker Compose containers, images, and volumes (deep clean)
deep-clean:
	@echo "${RED}Deep cleaning Docker Compose services, including volumes...${NC}"
	$(call log_and_run, docker-compose down --rmi all -v)
