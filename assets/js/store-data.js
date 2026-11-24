/* بوتیک سنوبر — کاتالوگ پیش‌فرض پوشاک زنانه */
window.SENOBAR_DEFAULT_PRODUCTS = [
  {
    "id": 1,
    "name": "مانتو کتی لینن",
    "category": "پوشاک زنانه",
    "subcategory": "مانتو و رویه",
    "tag": "جدید",
    "price": null,
    "stock": null,
    "img": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85"
  },
  {
    "id": 2,
    "name": "شومیز سفید مینیمال",
    "category": "پوشاک زنانه",
    "subcategory": "شومیز و بلوز",
    "tag": "پرفروش",
    "price": null,
    "stock": null,
    "img": "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85"
  },
  {
    "id": 3,
    "name": "پیراهن مجلسی زنانه",
    "category": "پوشاک زنانه",
    "subcategory": "پیراهن و لباس",
    "tag": "ویژه",
    "price": null,
    "stock": null,
    "img": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85"
  },
  {
    "id": 4,
    "name": "ست لباس روزمره",
    "category": "پوشاک زنانه",
    "subcategory": "ست و لباس روزمره",
    "tag": "ترند",
    "price": null,
    "stock": null,
    "img": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"
  },
  {
    "id": 5,
    "name": "شلوار پارچه‌ای زنانه",
    "category": "پوشاک زنانه",
    "subcategory": "شلوار و دامن",
    "tag": "کالکشن",
    "price": null,
    "stock": null,
    "img": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85"
  },
  {
    "id": 6,
    "name": "مانتو و استایل بیرونی",
    "category": "پوشاک زنانه",
    "subcategory": "مانتو و رویه",
    "tag": "جدید",
    "price": null,
    "stock": null,
    "img": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85"
  }
];
window.SENOBAR_CATEGORIES = [
  {
    "name": "مانتو و رویه",
    "desc": "مانتوهای روزمره، کتی، لینن و رویه‌های خاص",
    "image": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85"
  },
  {
    "name": "شومیز و بلوز",
    "desc": "شومیزهای رسمی، کژوال و بلوزهای زنانه",
    "image": "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85"
  },
  {
    "name": "پیراهن و لباس",
    "desc": "پیراهن‌های روزمره، مهمانی و مجلسی",
    "image": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85"
  },
  {
    "name": "شلوار و دامن",
    "desc": "شلوار پارچه‌ای، جین و دامن در مدل‌های متنوع",
    "image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85"
  },
  {
    "name": "ست و لباس روزمره",
    "desc": "ست‌های راحت و استایل‌های آماده روزانه",
    "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"
  },
  {
    "name": "لباس مجلسی",
    "desc": "انتخاب‌های شیک برای مهمانی و مناسبت‌ها",
    "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85"
  },
  {
    "name": "بافت و لباس گرم",
    "desc": "پلیور، بافت و لباس‌های مناسب روزهای سرد",
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85"
  },
  {
    "name": "اکسسوری زنانه",
    "desc": "کیف، شال و جزئیات تکمیل‌کننده استایل",
    "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"
  }
];
window.senobarProducts = function(){
 try {
  if(localStorage.getItem("senobar-catalog-version")!=="3"){
   localStorage.setItem("senobar-products",JSON.stringify(window.SENOBAR_DEFAULT_PRODUCTS));
   localStorage.setItem("senobar-catalog-version","3");
  }
  const v=JSON.parse(localStorage.getItem("senobar-products"));
  return Array.isArray(v)&&v.length?v:window.SENOBAR_DEFAULT_PRODUCTS;
 } catch(e){return window.SENOBAR_DEFAULT_PRODUCTS;}
};
window.senobarContent = function(){
 const base={brand:"بوتیک سنوبر",subtitle:"استایلی برای درخشیدن تو",topline:"کالکشن تازه رسید · انتخابی شیک برای هر روز",heroEyebrow:"کالکشن جدید پوشاک زنانه",heroTitle:"استایل خودت را با سنوبر بساز",heroText:"از مانتو و شومیز تا لباس‌های مجلسی و ست‌های روزمره؛ لباس مورد علاقه‌ات را پیدا کن و استایل خاص خودت را بساز.",heroImage:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",heroFit:"cover",bannerTitle:"برای استایل تازه آماده‌ای؟",bannerText:"تازه‌ترین انتخاب‌های پوشاک زنانه را در کالکشن بوتیک سنوبر ببین.",about:"بوتیک سنوبر؛ مقصدی برای انتخاب پوشاک زنانه، از استایل روزمره و مینیمال تا لباس‌های خاص و مجلسی.",contact:"برای راهنمایی سایز، ثبت سفارش و پیگیری خرید با پشتیبانی بوتیک در ارتباط باش."};
 try{return {...base,...(JSON.parse(localStorage.getItem("senobar-site-content"))||{})}}catch(e){return base}
};
window.senobarCategories = function(){
 try { const saved=JSON.parse(localStorage.getItem("senobar-categories")); if(Array.isArray(saved)) return saved; } catch(e){}
 return window.SENOBAR_CATEGORIES;
};
