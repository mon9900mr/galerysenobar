/* NARA COLLECTION — لباس راحتی و خانگی زنانه */
window.SENOBAR_DEFAULT_PRODUCTS=[
 {
 "id": 1,
 "name": "ست تیشرت و شلوار راحتی",
 "category": "پوشاک زنانه",
 "subcategory": "ست تیشرت و شلوار راحتی",
 "tag": "پرفروش",
 "price": null,
 "stock": null,
 "img": "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85"
 },
 {
 "id": 2,
 "name": "ست بلوز و شلوار خانگی",
 "category": "پوشاک زنانه",
 "subcategory": "ست بلوز و شلوار خانگی",
 "tag": "جدید",
 "price": null,
 "stock": null,
 "img": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"
 },
 {
 "id": 3,
 "name": "تیشرت لانگ زنانه",
 "category": "پوشاک زنانه",
 "subcategory": "تیشرت و تاپ",
 "tag": "محبوب",
 "price": null,
 "stock": null,
 "img": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85"
 },
 {
 "id": 4,
 "name": "شلوار راحتی نخی",
 "category": "پوشاک زنانه",
 "subcategory": "شلوار راحتی",
 "tag": "راحت و سبک",
 "price": null,
 "stock": null,
 "img": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85"
 },
 {
 "id": 5,
 "name": "ست لباس خواب نخی",
 "category": "پوشاک زنانه",
 "subcategory": "لباس خواب و خانگی",
 "tag": "لطیف و خنک",
 "price": null,
 "stock": null,
 "img": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85"
 },
 {
 "id": 6,
 "name": "هودی دورس زنانه",
 "category": "پوشاک زنانه",
 "subcategory": "هودی و دورس",
 "tag": "مناسب روزهای خنک",
 "price": null,
 "stock": null,
 "img": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"
 },
 {
 "id": 7,
 "name": "روبدوشامبر نخی",
 "category": "پوشاک زنانه",
 "subcategory": "روبدوشامبر و لباس نخی",
 "tag": "جدید",
 "price": null,
 "stock": null,
 "img": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85"
 }
];
window.SENOBAR_CATEGORIES=[
 {
 "name": "ست تیشرت و شلوار راحتی",
 "desc": "ست‌های نرم و راحت برای خانه و استفاده روزانه",
 "image": "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85"
 },
 {
 "name": "ست بلوز و شلوار خانگی",
 "desc": "ست‌های خانگی سبک و کاربردی",
 "image": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"
 },
 {
 "name": "تیشرت و تاپ",
 "desc": "تیشرت‌های آزاد، لانگ و تاپ‌های راحت",
 "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85"
 },
 {
 "name": "شلوار راحتی",
 "desc": "شلوارهای نخی، اسلش و آزاد",
 "image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85"
 },
 {
 "name": "لباس خواب و خانگی",
 "desc": "لباس خواب و لباس‌های نرم برای استراحت",
 "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85"
 },
 {
 "name": "هودی و دورس",
 "desc": "لباس‌های گرم و راحت برای روزهای خنک",
 "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"
 },
 {
 "name": "روبدوشامبر و لباس نخی",
 "desc": "روبدوشامبر و لباس‌های سبک و لطیف",
 "image": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85"
 }
];
window.senobarProducts=function(){try{if(localStorage.getItem("senobar-catalog-version")!=="4"){localStorage.setItem("senobar-products",JSON.stringify(window.SENOBAR_DEFAULT_PRODUCTS));localStorage.setItem("senobar-catalog-version","4")}const v=JSON.parse(localStorage.getItem("senobar-products"));return Array.isArray(v)&&v.length?v:window.SENOBAR_DEFAULT_PRODUCTS}catch(e){return window.SENOBAR_DEFAULT_PRODUCTS}};
window.senobarContent=function(){const base={brand:"NARA COLLECTION | نارا کالکشن",subtitle:"راحتی، سادگی، حال خوب",topline:"کالکشن تازه لباس‌های راحتی و خانگی رسید",heroEyebrow:"NARA COLLECTION · HOMEWEAR",heroTitle:"راحتیِ هر روز، با استایل نارا",heroText:"از ست‌های راحتی و تیشرت‌های آزاد تا لباس خواب و لباس‌های نخی؛ برای لحظه‌های آرام و روزهای خودت انتخاب کن.",heroImage:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85",heroFit:"cover",bannerTitle:"وقتشه راحت‌تر انتخاب کنی",bannerText:"مدل‌های راحتی و خانگی نارا کالکشن را ببین و ست دلخواهت را پیدا کن.",about:"نارا کالکشن، انتخاب لباس‌های راحتی و خانگی زنانه؛ ساده، نرم و مناسب استفاده روزمره.",contact:"برای راهنمایی سایز، جنس پارچه و ثبت سفارش با پشتیبانی فروشگاه در ارتباط باش."};try{const saved=JSON.parse(localStorage.getItem("senobar-site-content"))||{};if((saved.heroText||"").includes("اسباب‌بازی")||(saved.heroText||"").includes("مجلسی")||(saved.heroText||"").includes("مانتو")){localStorage.removeItem("senobar-site-content");return base}return {...base,...saved}}catch(e){return base}};
window.senobarCategories=function(){try{const saved=JSON.parse(localStorage.getItem("senobar-categories"));if(localStorage.getItem("senobar-category-version")==="4"&&Array.isArray(saved)&&saved.length&&saved.some(c=>window.SENOBAR_CATEGORIES.some(d=>d.name===c.name)))return saved}catch(e){}localStorage.setItem("senobar-category-version","4");localStorage.setItem("senobar-categories",JSON.stringify(window.SENOBAR_CATEGORIES));return window.SENOBAR_CATEGORIES};

// Apply the current NARA catalog migration before any storefront page reads local storage.
window.senobarProducts();
window.senobarCategories();
