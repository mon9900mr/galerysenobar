# Production go-live sequence

This is a server migration, not a GitHub Pages setting. GitHub Pages cannot run this PHP API or access MySQL.

1. Choose a hosting plan that explicitly supports PHP 8.2+, MySQL/MariaDB, HTTPS, and preferably SSH.
2. Create DB and restricted DB user in hosting panel. Import `database/schema.sql`.
3. Upload the repository files to the domain document root. Configure document root so application PHP is executable; do not expose config or SQL backups.
4. Copy `config.example.php` to `config.php`, enter database values, set the real HTTPS base URL and secure cookies.
5. Run owner setup through SSH/CLI once, then remove `scripts/create-owner.php` from the live host.
6. Test `/backend/api/?action=health`; it should return JSON and a CSRF token. Test login, products, and orders only after frontend API migration.
7. Enable HTTPS redirect, PHP error logging outside public web root, backups, and monitoring.
8. Configure a private uploads directory. Do not allow executable PHP files in uploads; validate MIME, image dimensions, extension, and maximum size.
9. Integrate and test a payment provider using server-side callback signature verification. Until then orders must remain unpaid.
10. Publish store privacy, delivery, refund/return, and terms policies before accepting real customer data.

Never place database passwords, payment secrets, API keys, or owner credentials in HTML, JavaScript, or Git.
