(()=>{
"use strict";
const KEY="senobar-orders-v1",ROLE=sessionStorage.getItem("senobar-demo-role")||"";
const $=id=>document.getElementById(id),esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>Number(n)>0?new Intl.NumberFormat("fa-IR").format(Number(n))+" تومان":"—";
const statuses=["ثبت‌شده","در انتظار پرداخت","پرداخت‌شده","در حال آماده‌سازی","در حال ارسال","تحویل‌شده","لغوشده","مرجوع‌شده","پرداخت ناموفق"];
const payments=["پرداخت‌نشده","پرداخت‌شده","در انتظار تأیید","مستردشده","ناموفق"];
const read=()=>{try{const x=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(x)?x:[]}catch(_){return[]}};
const write=x=>{localStorage.setItem(KEY,JSON.stringify(x));render()};
const customerOf=o=>o.customer&&typeof o.customer==="object"?o.customer:{name:String(o.customer||o.name||""),phone:o.phone||""};
const fullName=o=>{const c=customerOf(o);return [c.firstName,c.lastName].filter(Boolean).join(" ")||c.name||"—"};
const orderStatus=o=>o.status||"ثبت‌شده";
const paymentStatus=o=>o.paymentStatus||(orderStatus(o)==="پرداخت‌شده"?"پرداخت‌شده":"پرداخت‌نشده");
const canCancel=o=>!["در حال ارسال","تحویل‌شده","لغوشده","مرجوع‌شده"].includes(orderStatus(o));
const isShipped=o=>["در حال ارسال","تحویل‌شده"].includes(orderStatus(o));
function injectStyle(){if($("senobarOrderStyles"))return;const st=document.createElement("style");st.id="senobarOrderStyles";st.textContent=
".order-state{display:inline-flex;padding:5px 9px;border-radius:20px;background:#eaf2e9;color:#315d48;font-size:10px;font-weight:800;white-space:nowrap}"+
".order-state.ship{background:#e4efff;color:#24558b}.order-state.cancel{background:#fdebea;color:#a33c35}.order-state.paid{background:#e3f4e8;color:#24613b}.order-state.wait{background:#fff3d8;color:#85601a}"+
".order-actions{display:grid;gap:7px;min-width:185px}.order-actions select{min-width:175px;padding:7px;border:1px solid #cbd9cc;border-radius:8px;background:#fff;color:#24382b;font:inherit;font-size:11px}"+
".order-detail{font-size:10px;line-height:1.9;color:#718075;min-width:160px}.order-user-card{border:1px solid var(--line,#dce5dc);background:var(--paper,#fff);border-radius:14px;padding:14px;margin-top:12px;display:grid;gap:10px}"+
".order-user-top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap}.order-user-top b{font-size:13px}.order-user-meta{font-size:11px;color:var(--muted,#718075);line-height:1.9}.order-user-items{font-size:11px;line-height:1.9}"+
".order-cancel-btn{border:1px solid #d58b84;background:#fff5f4;color:#a33c35;border-radius:9px;padding:8px 12px;font:inherit;font-size:11px;font-weight:800;cursor:pointer}.order-cancel-btn:disabled{opacity:.45;cursor:not-allowed}.order-empty{padding:24px;text-align:center;color:var(--muted,#718075);font-size:12px}"+
"body.senobar-dark .order-state{background:#294637;color:#d9efdf}body.senobar-dark .order-state.ship{background:#243a55;color:#d7e8ff}body.senobar-dark .order-state.cancel{background:#4a2928;color:#ffd8d5}body.senobar-dark .order-state.wait{background:#4b3c20;color:#ffe5ad}"+
"body.senobar-dark .order-actions select{background:#17231c;color:#edf5ee;border-color:#405448}body.senobar-dark .order-user-card{background:#1b2922;border-color:#304238}body.senobar-dark .order-cancel-btn{background:#402624;color:#ffd8d5;border-color:#75413c}";
document.head.appendChild(st)}
function renderManagers(){
 const tbody=$("orderRows");if(!tbody)return;const rows=read(),table=tbody.closest("table");
 if(table){const head=table.querySelector("thead tr");if(head)head.innerHTML="<th>شماره سفارش</th><th>مشتری و تماس</th><th>اقلام و نشانی</th><th>مبلغ</th><th>وضعیت سفارش</th><th>وضعیت پرداخت</th><th>مدیریت</th>"}
 tbody.innerHTML=rows.length?rows.map((o,i)=>{const c=customerOf(o),st=orderStatus(o),pay=paymentStatus(o),items=Array.isArray(o.items)?o.items:[];return '<tr><td><b>#'+esc(o.id||i+1)+'</b><div class="order-detail">'+esc(o.createdAt?new Date(o.createdAt).toLocaleString("fa-IR"):"")+'</div></td><td><b>'+esc(fullName(o))+'</b><div class="order-detail" dir="ltr">'+esc(c.phone||"—")+'</div></td><td><div class="order-detail">'+items.map(x=>esc(x.name)+" × "+esc(x.qty)).join("<br>")+'<br><b>کدپستی:</b> '+esc(c.postalCode||"—")+'<br>'+esc(c.address||"")+'</div></td><td>'+money(o.total)+'</td><td><span class="order-state '+(st==="در حال ارسال"||st==="تحویل‌شده"?"ship":st==="لغوشده"?"cancel":st==="در انتظار پرداخت"?"wait":"")+'">'+esc(st)+'</span></td><td><span class="order-state '+(pay==="پرداخت‌شده"?"paid":pay==="پرداخت‌نشده"?"wait":"")+'">'+esc(pay)+'</span></td><td><div class="order-actions"><select data-order-status="'+esc(o.id)+'" aria-label="تغییر وضعیت سفارش">'+statuses.map(x=>'<option '+(x===st?"selected":"")+'>'+x+'</option>').join("")+'</select><select data-payment-status="'+esc(o.id)+'" aria-label="تغییر وضعیت پرداخت">'+payments.map(x=>'<option '+(x===pay?"selected":"")+'>'+x+'</option>').join("")+'</select><button type="button" class="btn danger small" data-delete-order="'+esc(o.id)+'">حذف سفارش</button></div></td></tr>'}).join(""):'<tr><td colspan="7" class="order-empty">هنوز سفارشی ثبت نشده است.</td></tr>';
 const count=$("countOrders");if(count)count.textContent=rows.length;
}
function renderUser(){
 const root=$("userOrdersList");if(!root)return;let user=null;try{user=JSON.parse(sessionStorage.getItem("senobar-demo-user")||"null")}catch(_){}
 const phone=user&&user.phone?String(user.phone):"",rows=read().filter(o=>String(customerOf(o).phone||"")===phone),badge=$("userOrderCount");
 if(badge)badge.textContent=new Intl.NumberFormat("fa-IR").format(rows.length)+" سفارش";
 root.innerHTML=rows.length?rows.slice().reverse().map(o=>{const st=orderStatus(o),pay=paymentStatus(o),blocked=!canCancel(o);return '<article class="order-user-card"><div class="order-user-top"><b>سفارش #'+esc(o.id)+'</b><span class="order-state '+(isShipped(o)?"ship":st==="لغوشده"?"cancel":st==="در انتظار پرداخت"?"wait":"")+'">'+esc(st)+'</span></div><div class="order-user-meta">تاریخ: '+esc(o.createdAt?new Date(o.createdAt).toLocaleString("fa-IR"):"—")+'<br>وضعیت پرداخت: <b>'+esc(pay)+'</b> · مبلغ: <b>'+money(o.total)+'</b></div><div class="order-user-items">'+(o.items||[]).map(x=>esc(x.name)+" × "+esc(x.qty)).join("، ")+'</div><div class="order-user-meta">نشانی تحویل: '+esc(customerOf(o).address||"—")+'</div><button type="button" class="order-cancel-btn" data-user-cancel="'+esc(o.id)+'" '+(blocked?"disabled":"")+'>'+(blocked?(isShipped(o)?"امکان لغو پس از شروع ارسال وجود ندارد":st==="لغوشده"?"این سفارش لغو شده":"امکان لغو وجود ندارد"):"لغو سفارش")+'</button></article>'}).join(""):'<div class="order-empty">هنوز سفارشی با این حساب ثبت نشده است.</div>';
}
function render(){injectStyle();if(ROLE==="owner"||ROLE==="admin")renderManagers();if(ROLE==="user")renderUser()}
document.addEventListener("change",e=>{
 const st=e.target.closest("[data-order-status]"),pay=e.target.closest("[data-payment-status]");if(!st&&!pay)return;
 const id=String(st?st.dataset.orderStatus:pay.dataset.paymentStatus),rows=read(),o=rows.find(x=>String(x.id)===id);if(!o)return;
 if(st){o.status=st.value;o.statusUpdatedAt=new Date().toISOString();if(st.value==="پرداخت‌شده")o.paymentStatus="پرداخت‌شده";if(st.value==="لغوشده")o.cancelledAt=new Date().toISOString()}
 if(pay){o.paymentStatus=pay.value;if(pay.value==="پرداخت‌شده"&&o.status==="در انتظار پرداخت")o.status="پرداخت‌شده"}
 write(rows);
});
document.addEventListener("click",e=>{
 const del=e.target.closest("[data-delete-order]");if(del){if(!confirm("این سفارش برای همیشه از فهرست محلی حذف شود؟"))return;write(read().filter(x=>String(x.id)!==String(del.dataset.deleteOrder)));return}
 const cancel=e.target.closest("[data-user-cancel]");if(cancel){const rows=read(),o=rows.find(x=>String(x.id)===String(cancel.dataset.userCancel));if(!o||!canCancel(o)){renderUser();return}if(!confirm("از لغو این سفارش مطمئنی؟"))return;o.status="لغوشده";o.cancelledAt=new Date().toISOString();o.cancelledBy="customer";write(rows)}
});
window.addEventListener("storage",e=>{if(e.key===KEY)render()});render();
})();