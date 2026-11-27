# Nara Collection — production backend setup

Backend target: PHP 8.2+ (PDO MySQL, JSON, sessions) + MySQL 8 / MariaDB 10.5+.
This folder is the production foundation; GitHub Pages itself cannot execute PHP or connect securely to MySQL.

## Before deployment
1. Buy a PHP hosting plan and attach your domain/subdomain.
2. Create a MySQL database and a database user with privileges limited to that database.
3. Upload the site files to the hosting document root. Keep `backend` outside the public document root when your host allows it; otherwise protect it with the included rules.
4. Copy `backend/config.example.php` to `backend/config.php`; fill database credentials and the HTTPS base URL. Never commit `config.php`.
5. Import `backend/database/schema.sql` using phpMyAdmin or the hosting database console.
6. Run `php backend/scripts/create-owner.php` through SSH/CLI once to create the first owner using a strong unique password. Then delete the setup script from the server.
7. Force HTTPS, enable PHP session cookies Secure/HttpOnly/SameSite, and take automated database + uploaded-image backups.
8. Configure the host's PHP upload limits and writable private upload directory before enabling product image uploads.

## Database contents
- users and roles (owner/admin/customer)
- categories and products (stock, price, discounts, featured, image URL)
- site settings and owner-defined additional costs
- orders, order line snapshots, extra-cost snapshots, payment status/reference
- audit log for privileged actions

## Important migration notes
The current GitHub Pages edition uses browser localStorage/sessionStorage. Those values are not a shared production database and cannot be imported automatically from visitors' browsers. Export any owner-managed products/orders/settings from the current browser before migration, then import after the production API and admin migration tool are enabled.

The current demo login is NOT production authentication. Do not use a demo password or rely on client-side role flags for production access. The owner must be seeded in the database; roles must be checked on every server endpoint.

## Payments
No payment provider is selected/configured yet. Keep orders as unpaid until a provider is integrated and its server-side callback is verified. Never mark an order paid based only on a browser redirect.

## Deployment checklist
- [ ] PHP version and PDO MySQL enabled
- [ ] DB created, schema imported, restricted DB user configured
- [ ] config.php created privately; secrets absent from Git
- [ ] HTTPS and domain configured
- [ ] owner created by CLI and setup script removed
- [ ] API endpoints deployed and tested (health, auth, products, orders)
- [ ] uploads stored safely and file type/size checked
- [ ] real payment gateway credentials added only to server config
- [ ] backups, logs, privacy/terms/return policies prepared
