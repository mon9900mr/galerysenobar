/* گالری صنوبر — داده‌های پیش‌فرض فروشگاه
   این داده‌ها صرفاً نمونه‌ی طراحی هستند؛ قیمت/موجودی تا زمان ورود اطلاعات واقعی منتشر نمی‌شوند. */
window.SENOBAR_DEFAULT_PRODUCTS = [
 {id:1,name:"ماشین فلزی آبی",category:"اسباب‌بازی",subcategory:"ماشین و وسایل نقلیه",tag:"ماشین",price:null,stock:null,img:"https://i5.walmartimages.com/seo/YEYUN-Diecast-Car1-32-Shelby-GT350-Model-Car-Pull-Back-Collectible-Toy-Car-with-Sound-and-Light-Toy-Vehicle-for-Boys-Adults-Gift-Blue_886b8c41-8145-4013-80aa-6b5d937541f7.0a0bc47ef38be8294ea5a97ac5abea4f.jpeg"},
 {id:2,name:"آشپزخانه بازی کودک",category:"اسباب‌بازی",subcategory:"آشپزخانه و خانه‌بازی",tag:"خانه‌بازی",price:null,stock:null,img:"https://i5.walmartimages.com/seo/Spark-Create-Imagine-Play-Kitchen-with-18-Piece-Accessory-Play-Set-Pink_11bb370e-78dd-4f04-8835-eb6423eeb48b_1.357035291d9f18e216e5eebcb40fe322.jpeg"},
 {id:3,name:"بلوک‌های رنگی ساختنی",category:"اسباب‌بازی",subcategory:"لگو و ساختنی",tag:"ساختنی",price:null,stock:null,img:"https://miro.medium.com/v2/resize:fit:1400/1*rPuYOAsFB-y88COgvGLrBQ.jpeg"},
 {id:4,name:"خرس پولیشی قهوه‌ای",category:"اسباب‌بازی",subcategory:"عروسک و پولیشی",tag:"عروسک",price:null,stock:null,img:"https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlMTVfcGhvdG9fb2ZfYV90ZWRkeWJlYXJfdG95c2luZ2xlX3BuZ19pc29sYXRlZF9vbl9kYjdiNDYwYS0yN2NlLTQzY2EtOWIxMC0wMzhhNTlhNTc5ZTVfMS5qcGc.jpg"},
 {id:5,name:"پازل و بازی فکری",category:"اسباب‌بازی",subcategory:"فکری و آموزشی",tag:"فکری",price:null,stock:null,img:"https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=85"},
 {id:6,name:"خانه‌سازی و سازه کودک",category:"اسباب‌بازی",subcategory:"خانه‌سازی و سازه‌ها",tag:"سازه",price:null,stock:null,img:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=85"}
];
window.SENOBAR_CATEGORIES = [
 {name:"ماشین و وسایل نقلیه",emoji:"🚗",desc:"ماشین فلزی، کنترلی، کامیون و قطار"},
 {name:"آشپزخانه و خانه‌بازی",emoji:"🍳",desc:"آشپزخانه، ظروف و وسایل نقش‌آفرینی"},
 {name:"لگو و ساختنی",emoji:"🧱",desc:"بلوک، لگو و قطعات ساختنی"},
 {name:"خانه‌سازی و سازه‌ها",emoji:"🏠",desc:"خانه، قلعه و سازه‌های خلاقانه"},
 {name:"عروسک و پولیشی",emoji:"🧸",desc:"عروسک، خرس و حیوانات پولیشی"},
 {name:"فکری و آموزشی",emoji:"🧩",desc:"پازل، جورچین و بازی‌های یادگیری"},
 {name:"بازی‌های فضای باز",emoji:"⚽",desc:"توپ، حباب‌ساز و سرگرمی بیرونی"},
 {name:"اسباب‌بازی‌های دیگر",emoji:"🎲",desc:"سرگرمی‌های متنوع کودک"}
];
window.senobarProducts = function(){
 try { const v=JSON.parse(localStorage.getItem("senobar-products")); return Array.isArray(v)&&v.length?v:v=window.SENOBAR_DEFAULT_PRODUCTS; }
 catch(e){ return window.SENOBAR_DEFAULT_PRODUCTS; }
};
window.senobarContent = function(){
 const base={brand:"گالری صنوبر",subtitle:"دنیای بازی، خلاقیت و لبخند",topline:"با بازی، دنیای تازه‌ای بساز! · فروشگاه تخصصی اسباب‌بازی",heroEyebrow:"برای لحظه‌های شاد و خلاقانه",heroTitle:"دنیای بازی،<br><em>از صنوبر شروع می‌شود</em>",heroText:"از ماشین و لگو تا عروسک و بازی‌های فکری؛ دسته‌بندی موردعلاقه‌ات را پیدا کن و دنیای بازی را کشف کن.",heroImage:"https://i5.walmartimages.com/seo/YEYUN-Diecast-Car1-32-Shelby-GT350-Model-Car-Pull-Back-Collectible-Toy-Car-with-Sound-and-Light-Toy-Vehicle-for-Boys-Adults-Gift-Blue_886b8c41-8145-4013-80aa-6b5d937541f7.0a0bc47ef38be8294ea5a97ac5abea4f.jpeg",bannerTitle:"وقتشه بازی شروع بشه!",bannerText:"اسباب‌بازی مناسب برای خیال‌پردازی، یادگیری و لحظه‌های قشنگ.",about:"گالری صنوبر، فروشگاهی تخصصی برای دنیای رنگارنگ اسباب‌بازی‌ها؛ از بازی‌های فکری تا ساختنی‌ها و عروسک‌های دوست‌داشتنی.",contact:"اطلاعات تماس فروشگاه به‌زودی تکمیل می‌شود."};
 try{return {...base,...(JSON.parse(localStorage.getItem("senobar-site-content"))||{})}}catch(e){return base}
};
