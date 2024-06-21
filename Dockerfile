# Use the official PHP 8.2 image with Apache
FROM php:8.2-apache

# Install system dependencies and Composer
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_mysql mysqli

# Install gettext
RUN apt-get install -y zlib1g-dev libzip-dev g++ libpq-dev libicu-dev gettext

# Install all locales
RUN apt-get install -y locales-all

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files to the Apache web directory
COPY . /var/www/html/

# Set the working directory
WORKDIR /var/www/html

# Enable the Apache rewrite module (optional, but often useful)
RUN a2enmod rewrite

# Expose port 80
EXPOSE 80