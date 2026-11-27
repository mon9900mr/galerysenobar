/* NARA production API helper.
 * Add this script to production pages after confirming backend path and host.
 * Server session is authoritative; browser role values are display hints only.
 */
window.NaraAPI=(()=>{
 const base=new URL('../backend/api/',document.currentScript?.src||location.href).href;
 let csrfToken='';
 async function request(action,{method='GET',data=null,id=null}={}){
  const url=new URL('index.php',base);url.searchParams.set('action',action);if(id!==null)url.searchParams.set('id',String(id));
  const headers={'Accept':'application/json'};if(data!==null)headers['Content-Type']='application/json';if(method!=='GET'&&csrfToken)headers['X-CSRF-Token']=csrfToken;
  const response=await fetch(url,{method,headers,credentials:'same-origin',body:data===null?undefined:JSON.stringify(data)});
  let result={};try{result=await response.json()}catch{}
  if(result.csrf)csrfToken=result.csrf;
  if(!response.ok)throw new Error(result.message||result.error||('API request failed: '+response.status));
  return result;
 }
 return {
  initialize:()=>request('health'),
  me:()=>request('me'),
  register:data=>request('register',{method:'POST',data}),
  login:data=>request('login',{method:'POST',data}),
  logout:()=>request('logout',{method:'POST',data:{}}),
  products:()=>request('products'),
  saveProduct:(data,id=null)=>request('products',{method:id?'PATCH':'POST',data,id}),
  categories:()=>request('categories'),
  orders:()=>request('orders'),
  createOrder:data=>request('orders',{method:'POST',data}),
  updateOrder:(id,data)=>request('orders',{method:'PATCH',data,id}),
  settings:()=>request('settings'),
  saveSettings:data=>request('settings',{method:'PUT',data}),
  costs:()=>request('costs'),
  addCost:data=>request('costs',{method:'POST',data}),
  removeCost:id=>request('costs',{method:'DELETE',id}),
  users:()=>request('admin-users')
 };
})();
