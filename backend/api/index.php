<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function out(int $status,array $data): never { http_response_code($status); echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES); exit; }
$configPath=dirname(__DIR__).'/config.php';
if(!is_file($configPath))out(503,['error'=>'backend_not_configured','message'=>'backend/config.php is missing']);
$c=require $configPath;
date_default_timezone_set($c['app']['timezone']??'Asia/Tehran');
session_name($c['app']['session_name']??'nara_session');
session_set_cookie_params(['lifetime'=>0,'path'=>'/','secure'=>(bool)($c['app']['secure_cookies']??true),'httponly'=>true,'samesite'=>'Lax']);
session_start();
function payload():array{$v=json_decode(file_get_contents('php://input'),true);return is_array($v)?$v:[];}
function csrfToken():string{if(empty($_SESSION['csrf']))$_SESSION['csrf']=bin2hex(random_bytes(32));return $_SESSION['csrf'];}
function needUser():array{if(empty($_SESSION['user']))out(401,['error'=>'login_required']);return $_SESSION['user'];}
function needRole(array $roles):array{$u=needUser();if(!in_array($u['role'],$roles,true))out(403,['error'=>'forbidden']);return $u;}
try{$d=$c['db'];$pdo=new PDO('mysql:host='.$d['host'].';dbname='.$d['name'].';charset='.$d['charset'],$d['user'],$d['password'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false]);}catch(Throwable $e){error_log('Nara DB connection failed: '.$e->getMessage());out(503,['error'=>'database_unavailable']);}
$a=(string)($_GET['action']??'health');$m=$_SERVER['REQUEST_METHOD']??'GET';$b=payload();
if($m!=='GET'&&!in_array($a,['login','register'],true)&&!hash_equals(csrfToken(),(string)($_SERVER['HTTP_X_CSRF_TOKEN']??'')))out(419,['error'=>'csrf_failed']);
switch($a){
case 'health':out(200,['ok'=>true,'service'=>'nara-api','csrf'=>csrfToken()]);
case 'register':
 if(!($c['app']['allow_registration']??false))out(403,['error'=>'registration_disabled']);
 $f=trim((string)($b['firstName']??''));$l=trim((string)($b['lastName']??''));$p=preg_replace('/\D+/','',(string)($b['phone']??''));$pw=(string)($b['password']??'');
 if(!$f||!$l||!preg_match('/^09\d{9}$/',$p)||strlen($pw)<10)out(422,['error'=>'invalid_registration','message'=>'نام، شماره معتبر و رمز حداقل ۱۰ کاراکتری لازم است.']);
 try{$s=$pdo->prepare("INSERT INTO users(first_name,last_name,phone,password_hash,role,address,postal_code) VALUES(?,?,?,?, 'customer',?,?)");$s->execute([$f,$l,$p,password_hash($pw,PASSWORD_DEFAULT),trim((string)($b['address']??'')),trim((string)($b['postalCode']??''))]);}catch(PDOException $e){if($e->getCode()==='23000')out(409,['error'=>'phone_exists']);throw $e;}
 session_regenerate_id(true);$_SESSION['user']=['id'=>(int)$pdo->lastInsertId(),'firstName'=>$f,'lastName'=>$l,'phone'=>$p,'role'=>'customer'];out(201,['user'=>$_SESSION['user'],'csrf'=>csrfToken()]);
case 'login':
 $p=preg_replace('/\D+/','',(string)($b['phone']??''));$s=$pdo->prepare('SELECT id,first_name,last_name,phone,password_hash,role,is_active FROM users WHERE phone=?');$s->execute([$p]);$u=$s->fetch();if(!$u||!(int)$u['is_active']||!password_verify((string)($b['password']??''),$u['password_hash']))out(401,['error'=>'invalid_credentials']);
 session_regenerate_id(true);$_SESSION['user']=['id'=>(int)$u['id'],'firstName'=>$u['first_name'],'lastName'=>$u['last_name'],'phone'=>$u['phone'],'role'=>$u['role']];out(200,['user'=>$_SESSION['user'],'csrf'=>csrfToken()]);
case 'me':out(200,['user'=>needUser(),'csrf'=>csrfToken()]);
case 'logout':$_SESSION=[];session_regenerate_id(true);out(200,['ok'=>true]);
case 'products':
 if($m==='GET')out(200,['products'=>$pdo->query('SELECT p.*,c.name category_name FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.is_active=1 ORDER BY p.is_featured DESC,p.sort_order,p.id DESC')->fetchAll()]);
 $u=needRole(['owner','admin']);$id=(int)($_GET['id']??0);
 if($m==='POST'){$s=$pdo->prepare('INSERT INTO products(category_id,name,description,price,discount_percent,stock,image_url,tag,is_featured,is_active,sort_order) VALUES(?,?,?,?,?,?,?,?,?,?,?)');$s->execute([$b['category_id']??null,trim((string)($b['name']??'')),$b['description']??null,$b['price']??null,(int)($b['discount_percent']??0),$b['stock']??null,$b['image_url']??null,$b['tag']??null,(int)!!($b['is_featured']??false),(int)!!($b['is_active']??true),(int)($b['sort_order']??0)]);out(201,['id'=>(int)$pdo->lastInsertId()]);}
 if($m==='PATCH'){$fields=['category_id','name','description','price','discount_percent','stock','image_url','tag','is_featured','is_active','sort_order'];$set=[];$v=[];foreach($fields as $k)if(array_key_exists($k,$b)){$set[]=$k.'=?';$v[]=$b[$k];}if(!$set)out(422,['error'=>'empty_update']);$v[]=$id;$pdo->prepare('UPDATE products SET '.implode(',',$set).' WHERE id=?')->execute($v);out(200,['ok'=>true]);}
 if($m==='DELETE'){$pdo->prepare('UPDATE products SET is_active=0 WHERE id=?')->execute([$id]);out(200,['ok'=>true]);}out(405,['error'=>'method_not_allowed']);
case 'categories':
 if($m==='GET')out(200,['categories'=>$pdo->query('SELECT * FROM categories WHERE is_active=1 ORDER BY sort_order,id')->fetchAll()]);
 needRole(['owner','admin']);if($m==='POST'){$s=$pdo->prepare('INSERT INTO categories(name,description,image_url,sort_order) VALUES(?,?,?,?)');$s->execute([trim((string)$b['name']),$b['description']??null,$b['image_url']??null,(int)($b['sort_order']??0)]);out(201,['id'=>(int)$pdo->lastInsertId()]);}out(405,['error'=>'method_not_allowed']);
case 'settings':
 if($m==='GET'){$r=[];foreach($pdo->query('SELECT setting_key,setting_value FROM site_settings') as $x)$r[$x['setting_key']]=json_decode($x['setting_value'],true);out(200,['settings'=>$r]);}
 needRole(['owner']);foreach(($b['settings']??[]) as $k=>$v){$s=$pdo->prepare('INSERT INTO site_settings(setting_key,setting_value) VALUES(?,?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)');$s->execute([(string)$k,json_encode($v,JSON_UNESCAPED_UNICODE)]);}out(200,['ok'=>true]);
case 'costs':
 if($m==='GET')out(200,['costs'=>$pdo->query('SELECT id,title,amount FROM additional_costs WHERE is_active=1 ORDER BY id DESC')->fetchAll()]);
 $u=needRole(['owner']);if($m==='POST'){$s=$pdo->prepare('INSERT INTO additional_costs(title,amount,created_by) VALUES(?,?,?)');$s->execute([trim((string)$b['title']),(int)$b['amount'],$u['id']]);out(201,['id'=>(int)$pdo->lastInsertId()]);}if($m==='DELETE'){$pdo->prepare('UPDATE additional_costs SET is_active=0 WHERE id=?')->execute([(int)($_GET['id']??0)]);out(200,['ok'=>true]);}out(405,['error'=>'method_not_allowed']);
case 'orders':
 if($m==='POST'){ $u=needUser();$items=$b['items']??[];if(!is_array($items)||!$items)out(422,['error'=>'empty_order']);$pdo->beginTransaction();try{$sub=0;$snap=[];foreach($items as $it){$pid=(int)($it['product_id']??0);$q=max(1,min(99,(int)($it['quantity']??1)));$s=$pdo->prepare('SELECT id,name,price,discount_percent,stock FROM products WHERE id=? AND is_active=1 FOR UPDATE');$s->execute([$pid]);$p=$s->fetch();if(!$p||$p['price']===null)throw new RuntimeException('price_not_set');if($p['stock']!==null&&(int)$p['stock']<$q)throw new RuntimeException('stock_unavailable');$price=(int)round((int)$p['price']*(100-(int)$p['discount_percent'])/100);$sub+=$price*$q;$snap[]=[$p,$q,$price];}$costs=$pdo->query('SELECT title,amount FROM additional_costs WHERE is_active=1')->fetchAll();$extra=array_sum(array_column($costs,'amount'));$num='NARA-'.date('ymd').'-'.strtoupper(bin2hex(random_bytes(3)));$s=$pdo->prepare("INSERT INTO orders(order_number,user_id,customer_name,customer_phone,address,postal_code,subtotal,extra_cost_total,total,status,payment_status) VALUES(?,?,?,?,?,?,?,?,?,'awaiting_payment','unpaid')");$s->execute([$num,$u['id'],trim((string)($b['customer_name']??($u['firstName'].' '.$u['lastName']))),$u['phone'],trim((string)($b['address']??'')),trim((string)($b['postal_code']??'')),$sub,$extra,$sub+$extra]);$oid=(int)$pdo->lastInsertId();$itS=$pdo->prepare('INSERT INTO order_items(order_id,product_id,product_name,unit_price,quantity,line_total) VALUES(?,?,?,?,?,?)');$stS=$pdo->prepare('UPDATE products SET stock=stock-? WHERE id=? AND stock IS NOT NULL');foreach($snap as [$p,$q,$price]){$itS->execute([$oid,$p['id'],$p['name'],$price,$q,$price*$q]);if($p['stock']!==null)$stS->execute([$q,$p['id']]);}$co=$pdo->prepare('INSERT INTO order_extra_costs(order_id,title,amount) VALUES(?,?,?)');foreach($costs as $x)$co->execute([$oid,$x['title'],$x['amount']]);$pdo->commit();out(201,['order_number'=>$num,'total'=>$sub+$extra,'payment_status'=>'unpaid']);}catch(Throwable $e){$pdo->rollBack();out(422,['error'=>'order_rejected','reason'=>in_array($e->getMessage(),['price_not_set','stock_unavailable'],true)?$e->getMessage():'transaction_failed']);}}
 $u=needUser();if(in_array($u['role'],['owner','admin'],true)){if($m==='GET')out(200,['orders'=>$pdo->query('SELECT * FROM orders ORDER BY created_at DESC')->fetchAll()]);if($m==='PATCH'){$st=(string)($b['status']??'');$allowed=['registered','awaiting_payment','paid','preparing','shipping','delivered','cancelled','returned','payment_failed'];if(!in_array($st,$allowed,true))out(422,['error'=>'bad_status']);$pdo->prepare('UPDATE orders SET status=? WHERE id=?')->execute([$st,(int)($_GET['id']??0)]);out(200,['ok'=>true]);}}
 if($m==='GET'){$s=$pdo->prepare('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC');$s->execute([$u['id']]);out(200,['orders'=>$s->fetchAll()]);}out(403,['error'=>'forbidden']);
case 'admin-users':needRole(['owner']);out(200,['users'=>$pdo->query('SELECT id,first_name,last_name,phone,role,is_active,created_at FROM users ORDER BY id DESC')->fetchAll()]);
default:out(404,['error'=>'unknown_action']);
}