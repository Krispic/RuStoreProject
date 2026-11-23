const $=id=>document.getElementById(id);
const rows=[
['vk','ВКонтакте','Общение','4.2','вконтакте|в контакте'],['ozon','OZON','Покупки','4.4','озон|ozon'],['browser','Яндекс Браузер с Алисой AI','Полезные инструменты','4.3','браузер|browser'],['tiktok','TikTok','Общение · Развлечения','4.5','tiktok|тик ?ток'],['five','Пятёрочка','Еда и напитки','3.5','пятероч'],['avito','Авито','Объявления и услуги','4.7','авито|avito'],['vk-video','VK Видео','Развлечения','4.6','(?:вк|vk) видео'],['ivi','Иви','Фильмы и сериалы','4.6','иви|ivi'],['yandex','Яндекс — с Алисой AI','Поиск','4.4','яндекс|алис'],['tinkoff','Тинькофф Мобильный банк','Управление финансами','4.6','тинькофф|т-?банк'],['gosuslugi','Госуслуги','Государственные услуги','4.5','госуслуг|гос услуг'],['sber','СберБанк Онлайн','Мобильный банк','4.5','сбер'],['vk-music','VK Музыка','Музыка, подкасты и аудиокниги','4.6','(?:вк|vk) муз'],['game','Сказания Королевства','Приключения','4.7','сказания|королевств|королевский бонус']
];
const apps=Object.fromEntries(rows.map(([id,name,cat,rating,pattern])=>[id,{id,name,cat,rating,pattern}]));
const paths={home:'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z',apps:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',games:'M7 7h10q3 0 4 5l1 5q0 4-3 2l-4-3H9l-4 3q-3 2-3-2l1-5q1-5 4-5z M6 11v4m-2-2h4m7-1h1m2 2h1',topup:'M14 2L4 14h7l-1 8 10-13h-7z',me:'M20 21H4v-3q0-5 8-5t8 5z M16 7a4 4 0 1 1-8 0 4 4 0 1 1 8 0',mic:'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0z M5 11v1a7 7 0 0 0 14 0v-1 M12 19v3m-3 0h6',search:'M17 17l5 5 M19 10a8 8 0 1 1-16 0 8 8 0 1 1 16 0'};
const icon=k=>'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+paths[k]+'"/></svg>';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=(id)=>'<img src="img/'+id+'.png" alt="">';
const navs={home:'Интересное',apps:'Приложения',games:'Игры',topup:'Пополнение',me:'Моё'};
const suggestions=['Хочу слушать музыку','Открой Госуслуги','Пополнить Steam'];
const normalize=s=>s.toLowerCase().replace(/ё/g,'е').replace(/[^а-яa-z0-9 -]/g,' ').replace(/\s+/g,' ').trim();
const appMatch=q=>Object.values(apps).filter(a=>new RegExp(a.pattern).test(normalize(q)));
function searchForm(value=''){return '<form class="search" role="search">'+icon('search')+'<input type="search" maxlength="120" aria-label="Поиск приложений" placeholder="Поиск в RuStore" value="'+esc(value)+'"><button class="blue">Найти</button></form>'}
const tile=(id)=>{const a=apps[id];return '<a class="app" href="#app/'+id+'">'+image(id)+'<div><strong>'+a.name+'</strong><small>'+a.cat+'</small><span>★ '+a.rating+'</span></div><b class="mobile-get">Открыть</b></a>'};
function section(title,ids,link='',cls=''){return '<section class="section '+cls+'"><div class="sectionhead"><h2>'+title+'</h2>'+(link?'<a class="more" href="#'+link+'">Ещё ›</a>':'')+'</div><div class="grid">'+ids.map(tile).join('')+'</div></section>'}
const banner='<a href="#app/game" class="banner"><img src="img/mobile-banner.webp" alt=""><span class="badge">Промоакция</span><div class="copy"><b>Королевский бонус</b><small>Новые задания и награды</small><div class="game-row">'+image('game')+'Сказания Королевства<em>Открыть</em></div></div></a>';
function home(){return '<section class="hero"><div><h1>Официальный магазин<br>приложений для Android</h1><p>Безопасный доступ к популярным играм и приложениям</p>'+searchForm()+'<div class="perks">'+[['shield','Гарантия безопасности'],['apps','Доступ к любимым приложениям'],['pay','Удобная оплата подписок и покупок']].map(([id,t])=>'<div class="perk">'+image(id)+t+'</div>').join('')+'</div></div><a href="#games"><img class="hero-art" src="img/hero.webp" alt="Подборки игр и приложений"></a></section><div class="mobile"><div class="msearch">'+searchForm()+'<a href="#me" aria-label="Моё" class="profile">'+icon('me')+'</a></div><h2>Специальные события и акции</h2><p class="muted">Новые рубрики</p>'+banner+section('С чего начать',['tinkoff','gosuslugi','sber'],'apps')+'</div>'+section('Популярное',rows.slice(0,9).map(r=>r[0]),'apps')+section('Социальные сети и мессенджеры',['vk','tiktok','vk-video'])}
const installed=new Set();const back='<a href="#home" class="back">‹ На главную</a>';
const sub=(title,html)=>'<article class="subpage">'+back+'<h1>'+title+'</h1>'+html+'</article>';
function render(){let raw=location.hash.slice(1),[route,...parts]=raw.split('/'),val;try{val=decodeURIComponent(parts.join('/'))}catch{val=''}route=route||'home';let html,tab=route;
if(route==='app'&&apps[val]){const a=apps[val];tab=val==='game'?'games':'apps';html=sub(a.name,'<section class="detail">'+image(val)+'<p>'+a.cat+' · ★ '+a.rating+'</p><button class="blue" data-install="'+val+'" '+(installed.has(val)?'disabled':'')+'>'+(installed.has(val)?'Добавлено в «Моё»':'Добавить в «Моё»')+'</button></section>')}
else if(route==='apps')html=sub('Приложения',searchForm()+section('Каталог',Object.keys(apps).filter(i=>i!=='game')));
else if(route==='games')html=sub('Игры',section('Приключения',['game']));
else if(route==='topup')html=sub('Пополнение','<div class="detail steam"><h2>Steam</h2><p>Пополнение игрового баланса</p><a class="blue" href="#steam">Открыть</a></div>');
else if(route==='steam'){tab='topup';html=sub('Пополнение Steam','<div class="detail steam"><h2>Steam</h2><p>Пополнение игрового баланса</p></div><p class="demo-note">Вы открыли нужный сервис. Это учебная демонстрация без оплаты.</p><a class="back" href="#topup">К сервисам пополнения</a>')}
else if(route==='search'){const q=normalize(val);const ids=Object.values(apps).filter(a=>normalize(a.name+' '+a.cat).includes(q)||appMatch(q).includes(a)).map(a=>a.id);html=sub('Поиск',searchForm(val)+(ids.length?section('Результаты',ids):'<p class="demo-note">Ничего не найдено. Попробуйте другое название или спросите помощника.</p>'))}
else if(route==='me')html=sub('Моё',installed.size?section('Мои приложения',[...installed]):'<p>Здесь появятся приложения, которые вы добавите из каталога.</p>');
else {html=home();tab='home'}
$('page').innerHTML=html;$('tabs').innerHTML=Object.entries(navs).map(([id,label])=>'<a href="#'+id+'" class="'+(tab===id?'current':'')+'">'+icon(id)+label+'</a>').join('');document.title=(navs[tab]||'Каталог')+' · RuStore';}
function go(route){closeChat();if(location.hash==='#'+route)render();else location.hash=route}
let toastTimer;function notify(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2400)}
function addBubble(msg,user=false){const p=document.createElement('div');p.className='bubble'+(user?' user':'');p.textContent=msg;$('thread').append(p);scrollChat()}
function scrollChat(){$('thread').scrollTop=$('thread').scrollHeight}
function chips(){const box=document.createElement('div');box.className='suggestions';suggestions.forEach(s=>{const b=document.createElement('button');b.className='chip';b.textContent=s;b.onclick=()=>respond(s);box.append(b)});$('thread').append(box);scrollChat()}
function result(id){const a=apps[id],box=document.createElement('div');box.className='result';box.innerHTML=image(id)+'<strong>'+a.name+'</strong><button>Открыть</button>';box.querySelector('button').onclick=()=>go('app/'+id);$('thread').append(box);scrollChat()}
function respond(raw){const q=normalize(raw);if(!q)return;stopVoice();$('message').value='';addBubble(raw,true);let dest,label;const matches=appMatch(q);
if(/steam|стим/.test(q)){dest='steam';label='Пополнение Steam'}
else if(matches.length){const a=matches[0];dest='app/'+a.id;label=a.name}
else if(/попол|киоск|электронные сервис/.test(q)){dest='topup';label='Пополнение'}
else if(/музык|песн|подкаст/.test(q)){addBubble('В VK Музыке можно слушать песни и подкасты. Открыть приложение?');result('vk-music');return}
else if(/кино|фильм|сериал/.test(q)){addBubble('Для просмотра фильмов и сериалов подойдёт Иви.');result('ivi');return}
else if(/игр|поигра/.test(q)){dest='games';label='Игры'}
else if(/каталог|приложения/.test(q)){dest='apps';label='Приложения'}
else if(/привет|помо[гщ]|умеешь/.test(q)){addBubble('Найду приложение или открою раздел магазина. Что хотите сделать?');chips();return}
else{addBubble('Уточните название приложения или выберите один из примеров.');chips();return}
addBubble('Открываю «'+label+'».');go(dest);notify('Открыто: '+label)}
function openChat(focus=false){$('chat').hidden=false;$('launcher').hidden=true;$('shade').hidden=false;if(!$('thread').children.length){addBubble('Что хотите найти? Напишите, скажите или выберите пример.');chips()}if(focus)$('message').focus();else $('close').focus({preventScroll:true});scrollChat()}
function closeChat(){if($('chat').hidden)return;stopVoice();$('chat').hidden=true;$('shade').hidden=true;$('launcher').hidden=false;$('ask').focus({preventScroll:true})}
let rec=null;function stopVoice(){if(rec){const old=rec;rec=null;old.onend=old.onresult=old.onerror=null;try{old.abort()}catch{}}$('mic').classList.remove('active');$('message').placeholder='Напишите запрос';$('mic').setAttribute('aria-label','Начать голосовой ввод')}
function voice(){openChat();if(rec){stopVoice();return}const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){addBubble('В этом браузере голосовой ввод недоступен. Введите запрос или выберите пример.');$('message').focus();return}try{rec=new SR();rec.lang='ru-RU';rec.interimResults=true;rec.onresult=e=>{const r=e.results[e.resultIndex];$('message').value=r[0].transcript;if(r.isFinal)respond(r[0].transcript)};rec.onerror=e=>{stopVoice();addBubble(e.error==='not-allowed'?'Доступ к микрофону закрыт. Введите запрос или разрешите микрофон в браузере.':'Не удалось распознать речь. Повторите запрос или напишите его.');};rec.onend=stopVoice;rec.start();$('mic').classList.add('active');$('message').placeholder='Слушаю…';$('mic').setAttribute('aria-label','Остановить запись')}catch{stopVoice();addBubble('Микрофон недоступен. Можно написать запрос.')}}
$('mic').innerHTML=$('talk').innerHTML=icon('mic');$('mic').onclick=$('talk').onclick=voice;$('ask').onclick=()=>openChat();$('close').onclick=$('shade').onclick=closeChat;
$('compose').onsubmit=e=>{e.preventDefault();respond($('message').value.trim())};
document.addEventListener('submit',e=>{if(e.target.matches('.search')){e.preventDefault();go('search/'+encodeURIComponent(e.target.querySelector('input').value.trim()))}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-install],[data-search]');if(!b)return;if(b.hasAttribute('data-search')){go('search/');setTimeout(()=>document.querySelector('.search input')?.focus(),0)}else{installed.add(b.dataset.install);render();notify('Приложение добавлено в «Моё»')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeChat()});window.addEventListener('hashchange',()=>{closeChat();render();window.scrollTo(0,0)});render();
