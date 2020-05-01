# Dev Jobs API

API used to manage job data retrieved from job sites built with Laravel and MongoDB.

## Install software (using Mac and brew)
### Composer
- Install with brew
```
brew install composer
```
### PHP
- Install PHP 7.4 with brew
```
brew install php@7.4
```
- Install MongoDB PHP extension
```
sudo pecl install mongodb
```
### MongoDB
- Install in MacOS via brew
```
brew tap mongodb/brew
brew install mongodb-community
```
## Setup 
- Install packages
```
composer install
```
- Copy the .env.example file to a new file named .env
- Fill in .env variables in new file
```
cp .env.example .env
```
- Generate Laravel app key
```
php artisan key:generate
```
- Run migration files to update MongoDB data
```
php artisan migrate
```
## Commands
- Run app in development
```
php artisan serve
```
