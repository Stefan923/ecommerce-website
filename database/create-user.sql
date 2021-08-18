CREATE USER 'ecommerce_service'@'localhost' IDENTIFIED BY 'ecommerceapp';

GRANT ALL PRIVILEGES ON `ecommerce_database`.* TO 'ecommerce_service'@'localhost';

ALTER USER 'ecommerce_service'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ecommerce_service';