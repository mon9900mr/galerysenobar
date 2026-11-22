# گالری صنوبر

فروشگاه فارسی و راست‌چین تخصصی اسباب‌بازی، ساخته‌شده با HTML، CSS و JavaScript.

## ساختار پروژه

```text
galerysenobar/
├── index.html
├── category.html
├── products.html
├── login.html
├── admin.html
├── admin-panel.html
├── owner.html
├── user-panel.html
├── assets/
│   ├── css/
│   │   └── theme-toys.css
│   ├── js/
│   │   ├── store-data.js
│   │   └── theme-toys.js
│   └── images/
│       └── toys/
│           ├── toy-background.svg
│           ├── toy-blocks.svg
│           ├── toy-car.svg
│           ├── toy-kite.svg
│           ├── toy-rocket.svg
│           ├── toy-teddy.svg
│           └── toy-train.svg
└── README.md
```

## صفحات

- `index.html`: صفحه اصلی فروشگاه
- `category.html`: دسته‌بندی اسباب‌بازی‌ها
- `products.html`: فهرست و فیلتر محصولات
- `login.html`: ورود نمایشی و انتخاب نقش برای پیش‌نمایش پنل‌ها
- `owner.html`: پنل مالک
- `admin-panel.html`: پنل ادمین
- `user-panel.html`: پنل مشتری
- `admin.html`: هدایت کاربر به پنل متناسب با نقش انتخاب‌شده

صفحات HTML عمداً در ریشه مخزن باقی مانده‌اند تا آدرس صفحات و تنظیمات GitHub Pages بدون تغییر کار کنند.

## فایل‌های مشترک

- `assets/css/theme-toys.css`: پوسته مشترک، حالت تاریک و استایل‌های عمومی
- `assets/js/theme-toys.js`: کنترل حالت روشن و تاریک
- `assets/js/store-data.js`: داده‌های پیش‌فرض محصولات، دسته‌بندی‌ها و محتوای فروشگاه
- `assets/images/toys/`: تصاویر SVG محلی پروژه

## اجرا

فایل `index.html` را باز کنید یا در GitHub به مسیر **Settings → Pages** بروید و منبع انتشار را روی شاخه `main` و پوشه `/ (root)` قرار دهید.

## محدودیت‌های نسخه نمایشی

- ورود فعلی فقط نقش را با `sessionStorage` شبیه‌سازی می‌کند؛ احراز هویت واقعی و کنترل دسترسی سمت سرور وجود ندارد.
- محصولات و تنظیمات در `localStorage` همان مرورگر ذخیره می‌شوند و بین دستگاه‌ها یا کاربران مشترک نیستند.
- ثبت سفارش واقعی، پرداخت آنلاین و اتصال به پایگاه داده هنوز پیاده‌سازی نشده‌اند.
- GitHub Pages فقط فایل‌های استاتیک را میزبانی می‌کند و امکان اجرای PHP یا پایگاه داده را ندارد.

برای استفاده عملی فروشگاه، باید بک‌اند امن با احراز هویت سمت سرور، کنترل مجوزها در API و پایگاه داده راه‌اندازی شود. رمزهای عبور باید به‌صورت امن هش شوند و نقش مالک تنها از سمت سرور تعیین شود.
