/* گالری صنوبر — داده‌های پیش‌فرض فروشگاه
   این داده‌ها صرفاً نمونه‌ی طراحی هستند؛ قیمت/موجودی تا زمان ورود اطلاعات واقعی منتشر نمی‌شوند. */
window.SENOBAR_DEFAULT_PRODUCTS = [
 {id:1,name:"ماشین فلزی آبی",category:"اسباب‌بازی",subcategory:"ماشین و وسایل نقلیه",tag:"ماشین",price:null,stock:null,img:"https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=85"},
 {id:2,name:"آشپزخانه بازی کودک",category:"اسباب‌بازی",subcategory:"آشپزخانه و خانه‌بازی",tag:"خانه‌بازی",price:null,stock:null,img:"https://images.unsplash.com/photo-1599629954294-14df9ec8a8c9?auto=format&fit=crop&w=900&q=85"},
 {id:3,name:"بلوک‌های رنگی ساختنی",category:"اسباب‌بازی",subcategory:"لگو و ساختنی",tag:"ساختنی",price:null,stock:null,img:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=85"},
 {id:4,name:"خرس پولیشی قهوه‌ای",category:"اسباب‌بازی",subcategory:"عروسک و پولیشی",tag:"عروسک",price:null,stock:null,img:"https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=85"},
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
 try {
  if(localStorage.getItem("senobar-catalog-version")!=="2"){
   localStorage.setItem("senobar-products",JSON.stringify(window.SENOBAR_DEFAULT_PRODUCTS));
   localStorage.setItem("senobar-catalog-version","2");
  }
  const v=JSON.parse(localStorage.getItem("senobar-products"));
  return Array.isArray(v)&&v.length?v:window.SENOBAR_DEFAULT_PRODUCTS;
 } catch(e){return window.SENOBAR_DEFAULT_PRODUCTS;}
};
window.senobarContent = function(){
 const base={brand:"گالری صنوبر",subtitle:"دنیای بازی، خلاقیت و لبخند",topline:"با بازی، دنیای تازه‌ای بساز! · فروشگاه تخصصی اسباب‌بازی",heroEyebrow:"برای لحظه‌های شاد و خلاقانه",heroTitle:"دنیای بازی، از صنوبر شروع می‌شود",heroText:"از ماشین و لگو تا عروسک و بازی‌های فکری؛ دسته‌بندی موردعلاقه‌ات را پیدا کن و دنیای بازی را کشف کن.",heroImage:"https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=85",bannerTitle:"وقتشه بازی شروع بشه!",bannerText:"اسباب‌بازی مناسب برای خیال‌پردازی، یادگیری و لحظه‌های قشنگ.",about:"گالری صنوبر، فروشگاهی تخصصی برای دنیای رنگارنگ اسباب‌بازی‌ها؛ از بازی‌های فکری تا ساختنی‌ها و عروسک‌های دوست‌داشتنی.",contact:"اطلاعات تماس فروشگاه به‌زودی تکمیل می‌شود."};
 try{return {...base,...(JSON.parse(localStorage.getItem("senobar-site-content"))||{})}}catch(e){return base}
};

window.senobarCategories = function(){
 try { const saved=JSON.parse(localStorage.getItem("senobar-categories")); if(Array.isArray(saved)) return saved; } catch(e){}
 return window.SENOBAR_CATEGORIES;
};
