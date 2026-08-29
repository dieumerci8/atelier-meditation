const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fields=['reference','verse','title','message','outline','prayer'];
function render(){
  const v=Object.fromEntries(fields.map(k=>[k,$('#'+k).value]));
  $('#preview-text').innerHTML=`<div class="ref">${esc(v.reference)}</div><h3>${esc(v.title)}</h3><p>${nl(v.message)}</p><p><b>À retenir</b><br>${nl(v.outline)}</p><p class="prayer">${nl(v.prayer)}</p><p>#MéditationDuJour #Foi #Espérance</p>`;
}
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nl=s=>esc(s).replace(/\n/g,'<br>');
fields.forEach(k=>$('#'+k).addEventListener('input',render)); render();

$$('nav button').forEach(btn=>btn.onclick=()=>{ $$('nav button,.view').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#'+btn.dataset.view).classList.add('active');$('#page-title').textContent=btn.textContent; if(btn.dataset.view==='library') showSaved(); });
function validate(){ $('#approve').disabled=!['#check-source','#check-tone','#check-consent'].every(x=>$(x).checked); }
$$('.checklist input').forEach(x=>x.onchange=validate);
$('#approve').onclick=()=>{ const item=data('approved'); localStorage.setItem('meditation-'+Date.now(),JSON.stringify(item)); $('#draft-state').textContent='Approuvé';$('#draft-state').classList.remove('gold');$('#feedback').textContent='Brouillon approuvé et enregistré localement.'; };
const examples=[
  {reference:'Ésaïe 41:10',verse:'Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu.',title:'Ne crains rien, Dieu est avec toi',message:'La peur nous fait parfois regarder dans toutes les directions pour trouver une issue. Dieu nous invite plutôt à tourner notre regard vers lui. Sa présence ne supprime pas toujours immédiatement l’épreuve, mais elle nous donne la force de la traverser.',outline:'1. Nommer ce qui nous inquiète\n2. Nous rappeler la présence de Dieu\n3. Avancer avec courage',prayer:'Seigneur, calme mon cœur et aide-moi à marcher aujourd’hui dans la certitude de ta présence. Amen.'},
  {reference:'Matthieu 11:28',verse:'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.',title:'Déposer nos fardeaux',message:'Jésus ne demande pas aux personnes fatiguées de devenir fortes avant de venir à lui. Il les accueille telles qu’elles sont. Nous pouvons lui confier ce qui nous épuise et recevoir un repos qui commence au plus profond du cœur.',outline:'1. Reconnaître notre fatigue\n2. Venir simplement à Jésus\n3. Recevoir et partager sa paix',prayer:'Jésus, je viens à toi avec mes fardeaux. Accorde-moi ton repos et renouvelle mes forces. Amen.'},
  {reference:'Philippiens 4:6–7',verse:'Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications.',title:'Transformer l’inquiétude en prière',message:'La prière ne consiste pas à nier nos préoccupations. Elle nous permet de les remettre entre les mains de Dieu. Chaque inquiétude peut devenir une invitation à parler avec lui et à laisser sa paix garder notre cœur.',outline:'1. Identifier l’inquiétude\n2. La présenter précisément à Dieu\n3. Accueillir sa paix avec reconnaissance',prayer:'Père, je te remets mes préoccupations. Garde mes pensées et remplis mon cœur de ta paix. Amen.'}
];
let exampleIndex=0;
$('#generate').onclick=()=>{
  const button=$('#generate'); button.disabled=true; button.textContent='Préparation…';
  $('#feedback').textContent='Préparation de la méditation en cours…';
  setTimeout(()=>{const sample=examples[exampleIndex++%examples.length];fields.forEach(k=>$('#'+k).value=sample[k]);$('#draft-state').textContent='Nouveau brouillon';$('#draft-state').classList.add('gold');$$('.checklist input').forEach(x=>x.checked=false);validate();render();button.disabled=false;button.innerHTML='Préparer maintenant <b>→</b>';$('#feedback').textContent='Nouvelle méditation préparée. Relisez et adaptez-la avant validation.';},450);
};
function data(status='draft'){return {status,timezone:'Africa/Lubumbashi',schedule:['07:00','19:00'],createdAt:new Date().toISOString(),content:Object.fromEntries(fields.map(k=>[k,$('#'+k).value])),targets:{facebook:true,whatsappBusiness:false},requiresHumanApproval:true}}
$('#export').onclick=()=>{const blob=new Blob([JSON.stringify(data(),null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='meditation-n8n.json';a.click();URL.revokeObjectURL(a.href);$('#feedback').textContent='Fichier JSON exporté pour n8n.'};
function showSaved(){const rows=Object.keys(localStorage).filter(k=>k.startsWith('meditation-')).sort().reverse().map(k=>JSON.parse(localStorage[k]));$('#saved-list').innerHTML=rows.length?rows.map(x=>`<article><b>${esc(x.content.title)}</b><br><small>${new Date(x.createdAt).toLocaleString('fr-FR')} · ${esc(x.content.reference)} · Approuvé</small></article>`).join(''):'<p class="muted">Aucune méditation approuvée pour le moment.</p>'}
function clock(){const parts=new Intl.DateTimeFormat('fr-FR',{timeZone:'Africa/Lubumbashi',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()),h=+parts.find(x=>x.type==='hour').value;$('#next-run').textContent=h<7?'07:00':h<19?'19:00':'07:00';} clock();setInterval(clock,60000);

