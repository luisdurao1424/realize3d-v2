export function fmtEUR(n){
  if(n===null||n===undefined||isNaN(n)) return '—';
  return n.toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
}

export function fmtNum(n,d=1){
  if(n===null||n===undefined||isNaN(n)) return '—';
  return n.toLocaleString('pt-PT',{minimumFractionDigits:0,maximumFractionDigits:d});
}

export function fmtPct(n){
  return (n*100).toLocaleString('pt-PT',{maximumFractionDigits:1}) + '%';
}

export function fmtDate(d){
  if(!d) return '—';
  const dt = new Date(d);
  if(isNaN(dt)) return '—';
  return dt.toLocaleDateString('pt-PT',{day:'2-digit',month:'2-digit',year:'numeric'});
}

export function todayISO(){
  return new Date().toISOString().slice(0,10);
}

export function escapeHtml(s){
  return (s===null||s===undefined)?'':String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
