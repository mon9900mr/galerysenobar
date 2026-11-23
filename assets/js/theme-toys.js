(()=>{
 const themeKey='senobar-theme';
 const body=document.body;
 const saved=localStorage.getItem(themeKey)||'light';
 body.classList.toggle('senobar-dark',saved==='dark');
 const toggle=document.createElement('button');
 toggle.type='button';
 toggle.className='senobar-theme-toggle';
 toggle.setAttribute('aria-label','تغییر حالت روشن و تاریک');
 toggle.setAttribute('title','تغییر حالت روشن و تاریک');
 function updateLabel(){toggle.textContent=body.classList.contains('senobar-dark')?'حالت روز':'حالت شب';}
 toggle.addEventListener('click',()=>{
  const dark=!body.classList.contains('senobar-dark');
  body.classList.toggle('senobar-dark',dark);
  localStorage.setItem(themeKey,dark?'dark':'light');
  updateLabel();
 });
 updateLabel();
 body.appendChild(toggle);

 const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce)return;
 if(!('IntersectionObserver' in window))return;
 const targets='.card,.panel,.product-card,.product,.cat,.tile,.stat,.stat-card,.metric,.section-card,.order-card,.info-card,.category-card,.feature-card';
 let observer;
 const reveal=(root)=>{
  const nodes=(root.matches&&root.matches(targets)?[root]:[]);
  if(root.querySelectorAll)nodes.push(...root.querySelectorAll(targets));
  nodes.forEach((el)=>{
   if(el.dataset.sbMotionReady)return;
   if(el.closest('.sidebar,.side,header,nav,footer'))return;
   el.dataset.sbMotionReady='1';
   el.classList.add('sb-reveal');
   if(observer)observer.observe(el);else el.classList.add('sb-visible');
  });
 };
 observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){
    entry.target.classList.add('sb-visible');
    observer.unobserve(entry.target);
   }
  });
 },{threshold:.08,rootMargin:'0px 0px -32px 0px'});
 reveal(body);
 let scanQueued=false;
 const scan=()=>{
  if(scanQueued)return;
  scanQueued=true;
  requestAnimationFrame(()=>{scanQueued=false;reveal(body)});
 };
 const mutations=new MutationObserver(scan);
 mutations.observe(body,{childList:true,subtree:true});
 document.addEventListener('click',event=>{
  const button=event.target.closest('button,.btn,[role="button"]');
  if(!button)return;
  if(/سبد|خرید|افزودن|اضافه/i.test(button.textContent||'')){
   button.classList.remove('sb-added');
   void button.offsetWidth;
   button.classList.add('sb-added');
   const cart=document.querySelector('[aria-label*="سبد"],[title*="سبد"],#cartCount,.cart-count');
   if(cart){cart.classList.remove('sb-cart-bump');void cart.offsetWidth;cart.classList.add('sb-cart-bump');}
  }
 });
})();