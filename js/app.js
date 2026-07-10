/* ---------------------------------------------------------------
   DATA / STATE
--------------------------------------------------------------- */
const ICONS = {
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><circle cx="8.5" cy="11" r="1"/><circle cx="12" cy="11" r="1"/><circle cx="15.5" cy="11" r="1"/><circle cx="8.5" cy="14.5" r="1"/><circle cx="12" cy="14.5" r="1"/><circle cx="15.5" cy="14.5" r="1"/><circle cx="8.5" cy="18" r="1"/><circle cx="12" cy="18" r="1"/><circle cx="15.5" cy="18" r="1"/></svg>',
  hist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 3.2"/></svg>',
  fil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M21 12h-3M6 12H3"/></svg>',
  cfg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.4 7.4 0 000-2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 00-1.7-1L15 3.5H9L8.6 6a7.6 7.6 0 00-1.7 1l-2.3-.9-2 3.4L4.6 11a7.4 7.4 0 000 2l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 001.7 1L9 20.5h6l.4-2.5a7.6 7.6 0 001.7-1l2.3.9 2-3.4z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"/></svg>',
  euro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 6.5a6 6 0 100 11"/><line x1="3" y1="10" x2="14" y2="10"/><line x1="3" y1="14" x2="12" y2="14"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
};

const DEFAULT_CONFIG = {
  consumoMedio: 0.19,   // kWh/h
  custoEletricidade: 0.22, // €/kWh
  taxaFalhas: 0.10,     // fraction
  margemLucro: 2.00     // fraction (multiplier over cost)
};

const SEED_FILAMENTOS = [
  {marca:'Elegoo', cor:'Branco', preco:14.24, spool:1.0, density:1.24, nozzle:220, bed:60},
  {marca:'Elegoo', cor:'Rosa', preco:17.0, spool:1.0, density:1.24, nozzle:260, bed:80},
  {marca:'Elegoo', cor:'Azul celeste', preco:17.0, spool:1.0, density:1.24, nozzle:220, bed:115},
  {marca:'Esun', cor:'Amarelo', preco:14.68, spool:1.0, density:1.24, nozzle:220, bed:100},
  {marca:'Winkle', cor:'Verde abacate', preco:14.24, spool:1.0, density:1.24, nozzle:220, bed:100},
  {marca:'Amazon', cor:'Dourado', preco:14.18, spool:1.0, density:1.24, nozzle:220, bed:100},
  {marca:'Esun', cor:'Branco frio', preco:17.5, spool:1.0, density:1.24, nozzle:220, bed:100},
  {marca:'Elegoo', cor:'Madeira', preco:18.29, spool:1.0, density:null, nozzle:null, bed:null},
  {marca:'Elegoo', cor:'Mármore', preco:18.29, spool:1.0, density:null, nozzle:null, bed:null},
  {marca:'Giantarm', cor:'Wood', preco:12.34, spool:1.0, density:null, nozzle:null, bed:null},
  {marca:'Elegoo', cor:'Amarelo', preco:17.5, spool:1.0, density:null, nozzle:null, bed:null},
  {marca:'Elegoo', cor:'Laranja', preco:18.29, spool:1.0, density:null, nozzle:null, bed:null},
  {marca:'Elegoo', cor:'Branco 2', preco:18.29, spool:2.0, density:null, nozzle:null, bed:null},
  {marca:'Elegoo PETG', cor:'Preto', preco:15.19, spool:1.0, density:null, nozzle:null, bed:null},
  {marca:'Elegoo', cor:'Castanho', preco:18.29, spool:1.0, density:null, nozzle:null, bed:null},
].map(f => ({...f, id: uid()}));

// imported from the user's original spreadsheet (Produtos sheet) - historical jobs
const SEED_PEDIDOS_RAW = [
  ['Hogwarts globo','Elegoo','Branco',300,11.5,3.2,15.0,'vendido'],
  ['Jarras Ana Luisa','Giantarm','Wood',172,5.0,0,22.0,'vendido'],
  ['Jarras Ana Luisa','Elegoo','Branco',400,10.0,0,null,'orcamento'],
  ['Presépio Sónia','Elegoo','Branco',97,6.0,0,5.0,'vendido'],
  ['Presépio Diana','Elegoo','Branco',97,6.0,0,5.0,'vendido'],
  ['Jarras Joana','Esun','Branco frio',55,3.2,0,15.0,'vendido'],
  ['Jarras Joana','Giantarm','Wood',195,7.4,0,null,'orcamento'],
  ['Jarras Ana Luisa','Giantarm','Wood',55,3.2,0,15.0,'vendido'],
  ['Jarras Ana Luisa','Esun','Branco frio',195,7.4,0,null,'orcamento'],
  ['Porta retratos','Elegoo','Madeira',5,2.0,0,6.0,'vendido'],
  ['Porta retratos','Elegoo','Rosa',55,4.26,0,null,'orcamento'],
  ['Jarra Ana Luisa','Esun','Branco frio',20,6.1,0,3.5,'vendido'],
  ['Sofá Friends','Elegoo','Branco',25,1.0,0,16.0,'vendido'],
  ['Sofá Friends','Amazon','Dourado',63,3.0,0,null,'orcamento'],
  ['Sofá Friends','Elegoo','Laranja',271,10.49,0,null,'orcamento'],
  ['Letra D','Elegoo','Rosa',118,5.2,0,12.0,'vendido'],
  ['Letra D','Elegoo','Branco',16,1.5,0,null,'orcamento'],
  ['Ovos','Elegoo','Branco',50,1.5,0,3.5,'vendido'],
  ['Sofá Friends','Elegoo','Laranja',25,1.0,0,15.0,'vendido'],
  ['Sofá Friends','Elegoo','Laranja',63,3.0,0,null,'orcamento'],
  ['Sofá Friends','Elegoo','Laranja',229,8.0,0,null,'orcamento'],
  ['Suporte Harry','Elegoo','Laranja',180,1.5,0,null,'orcamento'],
  ['Comando XBOX','Elegoo','Laranja',220,12.0,0,null,'orcamento'],
  ['CakeTop Lucas','Elegoo','Castanho',13,2.2,0,null,'orcamento'],
  ['Lembranças','Amazon','Dourado',2.56,0.3,0,null,'orcamento'],
  ['Lembranças','Elegoo','Branco',5.04,1.0,0,null,'orcamento'],
  ['Lembranças','Elegoo','Branco',0.98,0.2,0,null,'orcamento'],
  ['Caixa telmo','Elegoo','Laranja',100,6.0,0,null,'orcamento'],
  ['Telmo','Elegoo PETG','Preto',774,28.0,0,null,'orcamento'],
  ['Vuvuzela','Elegoo','Branco',6,0.9,0,null,'orcamento'],
  ['Vuvuzela','Elegoo','Rosa',28,1.0,0,null,'orcamento'],
  ['Vuvuzela','Elegoo','Amarelo',35,2.0,0,null,'orcamento'],
];

let state = {
  view:'calc',
  config: DEFAULT_CONFIG,
  filamentos: [],
  pedidos: [],
  calc: {projeto:'', materiais:[{id:'m0', filKey:'', gramas:''}], horas:'', addons:'', taxaFalhas:null, margemLucro:null},
  hist: {search:'', status:'todos', sort:'data_desc'},
  modal: null, // {type, data}
  sidebarOpen:false,
};

function uid(){ return Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4); }
function filKey(marca,cor){ return (marca||'')+'__'+(cor||''); }

/* ---------------------------------------------------------------
   SUPABASE CONFIG
   Substitui estes dois valores pelos do teu projeto Supabase
   (Project Settings -> API) antes de publicares no Netlify.
--------------------------------------------------------------- */
const SUPABASE_URL = 'https://dkqzhgckekrfuyrgmaxd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xQml96WeT3jczwV_F0YTSQ_YjTqNPzB';
const TABLE_NAME = 'realize3d_workspaces';

let sb = null;
try{
  if(window.supabase && SUPABASE_URL.startsWith('http')){
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
}catch(e){ console.error('Supabase não inicializado', e); }

/* ---------------------------------------------------------------
   STORAGE — Supabase (sincronizado entre dispositivos) com
   cópia local em localStorage como cache/reserva offline
--------------------------------------------------------------- */
const STORAGE_PREFIX = 'realize3d_';
const LAST_WORKSPACE_KEY = 'realize3d_last_workspace';
let workspaceCode = null;

function lsGet(key){
  try{ return localStorage.getItem(STORAGE_PREFIX+key); }
  catch(e){ return null; }
}
function lsSet(key, value){
  try{ localStorage.setItem(STORAGE_PREFIX+key, value); return true; }
  catch(e){ return false; }
}
function getLastWorkspace(){
  try{ return localStorage.getItem(LAST_WORKSPACE_KEY); }
  catch(e){ return null; }
}
function setLastWorkspace(code){
  try{ localStorage.setItem(LAST_WORKSPACE_KEY, code); return true; }
  catch(e){ return false; }
}
function clearLastWorkspace(){
  try{ localStorage.removeItem(LAST_WORKSPACE_KEY); }
  catch(e){}
}
function getUrlWorkspace(){
  try{
    const code = new URLSearchParams(window.location.search).get('workspace');
    return code ? code.trim().toUpperCase() : null;
  }
  catch(e){ return null; }
}
function workspaceDirectLink(code = workspaceCode){
  return `${window.location.origin}${window.location.pathname}?workspace=${code}`;
}

function setSyncStatus(status){
  syncStatus = status; // 'ok' | 'offline' | 'syncing'
  const el = document.getElementById('syncBadge');
  if(el) el.outerHTML = syncBadgeHtml();
}
let syncStatus = 'syncing';
function syncBadgeHtml(){
  const map = {
    ok:{cls:'ok', label:'Sincronizado'},
    offline:{cls:'offline', label:'Sem ligação — cópia local'},
    syncing:{cls:'syncing', label:'A sincronizar…'}
  };
  const s = map[syncStatus] || map.syncing;
  return `<div class="sync-badge" id="syncBadge"><span class="sync-dot ${s.cls}"></span><span>${s.label}</span></div>`;
}

function defaultPayload(){
  return { config:{...DEFAULT_CONFIG}, filamentos:migrateFilamentosToLotes(SEED_FILAMENTOS), pedidos:buildSeedPedidos() };
}
function applyPayload(payload){
  state.config = payload.config || {...DEFAULT_CONFIG};
  state.filamentos = payload.filamentos || SEED_FILAMENTOS;
  migrateFilamentosToLotes();
  state.pedidos = payload.pedidos || [];
  syncStoreState();
}
function currentPayload(){
  return { config: state.config, filamentos: state.filamentos, pedidos: state.pedidos };
}

// returns true if the app is ready to show; false if the setup screen should be shown instead
async function loadAll(){
  const urlWorkspace = getUrlWorkspace();
  if(urlWorkspace){
    console.log('Workspace: parâmetro URL encontrado');
    console.log('Workspace: abertura por URL iniciada');
  }
  workspaceCode = urlWorkspace || getLastWorkspace() || lsGet('workspace');
  if(!workspaceCode){
    return false;
  }
  if(!sb){
    // Supabase não configurado — usa apenas a cópia local
    const cached = lsGet('cache_payload');
    applyPayload(cached ? JSON.parse(cached) : defaultPayload());
    setSyncStatus('offline');
    if(urlWorkspace){
      console.log('Workspace: abertura por URL concluída');
    }
    lsSet('workspace', workspaceCode);
    setLastWorkspace(workspaceCode);
    return true;
  }
  try{
    const {data, error} = await sb.from(TABLE_NAME).select('payload').eq('id', workspaceCode).maybeSingle();
    if(error) throw error;
    if(!data){ throw new Error('workspace-not-found'); }
    applyPayload(data.payload || {});
    lsSet('cache_payload', JSON.stringify(data.payload || {}));
    setSyncStatus('ok');
    lsSet('workspace', workspaceCode);
    setLastWorkspace(workspaceCode);
    if(urlWorkspace){
      console.log('Workspace: abertura por URL concluída');
    }
  }catch(e){
    console.error(e);
    if(urlWorkspace){
      console.log('Workspace: abertura por URL falhou');
      workspaceCode = null;
      return false;
    }
    const cached = lsGet('cache_payload');
    applyPayload(cached ? JSON.parse(cached) : defaultPayload());
    setSyncStatus('offline');
  }
  return true;
}

async function pushPayload(){
  const payload = currentPayload();
  lsSet('cache_payload', JSON.stringify(payload));
  if(!workspaceCode || !sb){ setSyncStatus('offline'); return; }
  setSyncStatus('syncing');
  try{
    const {error} = await sb.from(TABLE_NAME).update({payload, updated_at:new Date().toISOString()}).eq('id', workspaceCode);
    if(error) throw error;
    setSyncStatus('ok');
  }catch(e){
    console.error(e);
    setSyncStatus('offline');
  }
}
async function saveConfig(){ await pushPayload(); }
async function saveFilamentos(){ await pushPayload(); }
async function savePedidos(){ await pushPayload(); }

function buildSeedPedidos(){
  return SEED_PEDIDOS_RAW.map(row=>{
    const [projeto,marca,cor,gramas,horas,addons,recebido,status] = row;
    const fil = SEED_FILAMENTOS.find(f=>f.marca===marca && f.cor===cor);
    const precoKg = fil ? (fil.preco/fil.spool) : 0;
    const materiais = [{marca,cor,gramas,precoKg}];
    const b = calcBreakdown({materiais,horas,addons,taxaFalhas:DEFAULT_CONFIG.taxaFalhas,margemLucro:DEFAULT_CONFIG.margemLucro});
    return {
      id:uid(), projeto, materiais, horas, addons:addons||0,
      taxaFalhas:DEFAULT_CONFIG.taxaFalhas, margemLucro:DEFAULT_CONFIG.margemLucro,
      custoFilamento:b.custoFilamento, custoEletricidade:b.custoEletricidade, custoFinal:b.custoFinal,
      precoVenda:b.precoVenda, recebido: recebido, status: status, data:null, notas:'Importado da folha de cálculo original'
    };
  });
}

/* ---------------------------------------------------------------
   CALCULATIONS
--------------------------------------------------------------- */
function getLegacyPrecoKgFilamento(f){
  if(!f) return 0;
  const explicit = ['precoKg','custoKg'].map(k=>parseFloat(f[k])).find(v=>!isNaN(v) && v>0);
  if(explicit) return explicit;
  const precoCompra = parseFloat(f.precoCompra);
  const precoBobina = parseFloat(f.precoBobina);
  const preco = parseFloat(f.preco ?? f['preço'] ?? f.price);
  const spool = parseFloat(f.spool || f.tamanho || f.kg || 1) || 1;
  if(!isNaN(precoCompra) && precoCompra>0) return spool>0 ? precoCompra/spool : precoCompra;
  if(!isNaN(precoBobina) && precoBobina>0) return spool>0 ? precoBobina/spool : precoBobina;
  if(!isNaN(preco) && preco>0) return spool>0 ? preco/spool : preco;
  return 0;
}

function createInitialLote(f){
  const precoKg = getLegacyPrecoKgFilamento(f);
  if(!precoKg || precoKg<=0) return null;
  console.log('Lotes: lote inicial criado');
  return {
    id:'L001',
    nome:'Lote inicial',
    data:todayISO(),
    fornecedor:'',
    precoKg,
    ativo:true,
    arquivado:false,
    criadoEm:new Date().toISOString()
  };
}

function migrateFilamentosToLotes(filamentos = state.filamentos){
  console.log('Lotes: migração iniciada');
  if(!Array.isArray(filamentos)){
    console.log('Lotes: migração concluída');
    return [];
  }
  let created = false;
  const migrated = filamentos.map(f=>{
    if(!f) return f;
    if(Array.isArray(f.lotes) && f.lotes.length>0) return f;
    const initialLote = createInitialLote(f);
    f.lotes = initialLote ? [initialLote] : [];
    if(initialLote) created = true;
    return f;
  });
  if(filamentos === state.filamentos){
    state.filamentos = migrated;
    syncStoreState();
    if(created && window.AutoSave) window.AutoSave.schedule();
  }
  console.log('Lotes: migração concluída');
  return migrated;
}

function getLoteAtivo(filamento){
  if(!filamento || !Array.isArray(filamento.lotes)) return null;
  return filamento.lotes.find(l=>l && l.ativo && !l.arquivado) ||
    filamento.lotes.find(l=>l && !l.arquivado) ||
    filamento.lotes[0] ||
    null;
}

function getLoteAtivoCalculo(filamento){
  if(!filamento || !Array.isArray(filamento.lotes)) return null;
  return filamento.lotes.find(l=>l && l.ativo && !l.arquivado) || null;
}

function getPrecoKgFilamento(filamento){
  const lote = getLoteAtivoCalculo(filamento);
  const precoKg = lote ? parseFloat(lote.precoKg) : NaN;
  if(!isNaN(precoKg) && precoKg>0){
    calcLog('Calc: usando lote ativo');
    return precoKg;
  }
  calcLog('Calc: usando preço antigo fallback');
  return getLegacyPrecoKgFilamento(filamento);
}

function calcLog(msg){
  const host = window.location.hostname;
  const isDev = !host || host === 'localhost' || host === '127.0.0.1';
  if(isDev) console.log(msg);
}

function getLoteSnapshot(filamento){
  const lote = getLoteAtivoCalculo(filamento);
  if(!filamento || !lote) return null;
  return {
    filamentoId: filamento.id || null,
    loteId: lote.id || null,
    loteNome: lote.nome || '',
    lotePrecoKg: parseFloat(lote.precoKg)||0,
    loteFornecedor: lote.fornecedor || '',
    loteData: lote.data || ''
  };
}

function buildPedidoMaterialSnapshot(m){
  const snap = m.loteSnapshot || {};
  const precoKg = parseFloat(m.precoKg)||0;
  const gramas = parseFloat(m.gramas)||0;
  return {
    marca:m.marca,
    cor:m.cor,
    gramas,
    precoKg,
    filamentoId:snap.filamentoId || m.filamentoId || null,
    loteId:snap.loteId || null,
    loteNome:snap.loteNome || '',
    lotePrecoKg:snap.lotePrecoKg ?? precoKg,
    loteFornecedor:snap.loteFornecedor || '',
    loteData:snap.loteData || '',
    custoFilamento:(gramas * precoKg)/1000,
    loteSnapshot:snap.loteId ? {...snap} : null
  };
}

function buildCostSnapshot({materiais, horas, addons, taxaFalhas, margemLucro, breakdown}){
  const mats = materiais || [];
  const first = mats[0] || {};
  // Snapshots preserve historical cost values and must not be recalculated when filament lot prices change.
  return {
    filamentoId:first.filamentoId || null,
    loteId:first.loteId || null,
    loteNome:first.loteNome || '',
    lotePrecoKg:first.lotePrecoKg ?? first.precoKg ?? null,
    loteFornecedor:first.loteFornecedor || '',
    loteData:first.loteData || '',
    gramas:mats.reduce((s,m)=>s+(parseFloat(m.gramas)||0),0),
    horas:parseFloat(horas)||0,
    addons:parseFloat(addons)||0,
    custoFilamento:breakdown.custoFilamento,
    custoEletricidade:breakdown.custoEletricidade,
    custoTotal:breakdown.custoFinal,
    custoFinal:breakdown.custoFinal,
    precoFinal:breakdown.precoVenda,
    precoVenda:breakdown.precoVenda,
    lucro:breakdown.lucroValor,
    lucroValor:breakdown.lucroValor,
    margem:margemLucro,
    taxaFalhas,
    criadoEm:new Date().toISOString(),
    materiais:mats.map(m=>({
      filamentoId:m.filamentoId || null,
      loteId:m.loteId || null,
      loteNome:m.loteNome || '',
      lotePrecoKg:m.lotePrecoKg ?? m.precoKg ?? null,
      loteFornecedor:m.loteFornecedor || '',
      loteData:m.loteData || '',
      marca:m.marca,
      cor:m.cor,
      gramas:m.gramas,
      precoKg:m.precoKg,
      custoFilamento:((parseFloat(m.gramas)||0) * (parseFloat(m.precoKg)||0))/1000
    }))
  };
}

function getPedidoCostValues(p){
  const snap = p?.costSnapshot;
  if(snap){
    return {
      custoFilamento:snap.custoFilamento ?? p.custoFilamento ?? 0,
      custoEletricidade:snap.custoEletricidade ?? p.custoEletricidade ?? 0,
      custoFinal:snap.custoFinal ?? snap.custoTotal ?? p.custoFinal ?? 0,
      precoVenda:snap.precoVenda ?? snap.precoFinal ?? p.precoVenda ?? 0,
      lucroValor:snap.lucroValor ?? snap.lucro ?? p.lucroValor ?? 0,
      margem:snap.margem ?? p.margemLucro ?? 0,
      lotePrecoKg:snap.lotePrecoKg ?? null
    };
  }
  return {
    custoFilamento:p?.custoFilamento ?? 0,
    custoEletricidade:p?.custoEletricidade ?? 0,
    custoFinal:p?.custoFinal ?? 0,
    precoVenda:p?.precoVenda ?? 0,
    lucroValor:p?.lucroValor ?? 0,
    margem:p?.margemLucro ?? 0,
    lotePrecoKg:null
  };
}

function getPedidoSnapshotMateriais(p){
  const snap = p?.costSnapshot;
  if(!snap) return [];
  if(Array.isArray(snap.materiais) && snap.materiais.length>0) return snap.materiais;
  return [{
    marca:(p.materiais||[])[0]?.marca || '',
    cor:(p.materiais||[])[0]?.cor || '',
    loteNome:snap.loteNome || '',
    lotePrecoKg:snap.lotePrecoKg,
    loteFornecedor:snap.loteFornecedor || '',
    loteData:snap.loteData || '',
    gramas:snap.gramas,
    custoFilamento:snap.custoFilamento
  }];
}

function pedidoLoteSummaryHtml(p){
  if(!p?.costSnapshot) return `<div class="muted" style="font-size:11px;margin-top:4px;">Lote: não registado</div>`;
  const mats = getPedidoSnapshotMateriais(p);
  if(mats.length===0) return `<div class="muted" style="font-size:11px;margin-top:4px;">Lote: não registado</div>`;
  return `<div class="muted" style="font-size:11px;margin-top:4px;line-height:1.35;">${mats.map(m=>{
    const nome = m.loteNome || 'Lote sem nome';
    const preco = m.lotePrecoKg!=null ? fmtEUR(m.lotePrecoKg) + '/kg' : 'preço n/d';
    const fil = [m.marca, m.cor].filter(Boolean).join(' · ');
    const detalhe = mats.length>1 && fil ? `${escapeHtml(fil)}: ` : 'Lote: ';
    const grams = m.gramas!=null ? ` · ${fmtNum(m.gramas)}g` : '';
    const custo = m.custoFilamento!=null ? ` · ${fmtEUR(m.custoFilamento)}` : '';
    return `${detalhe}${escapeHtml(nome)} · ${preco}${grams}${custo}`;
  }).join('<br>')}</div>`;
}

function pedidoLoteDetailHtml(p){
  if(!p?.costSnapshot) return `<div class="hint">Lote: não registado</div>`;
  const mats = getPedidoSnapshotMateriais(p);
  const costs = getPedidoCostValues(p);
  return `<div class="field">
    <label>Lote usado</label>
    <div class="hint" style="line-height:1.45;">
      ${mats.map(m=>{
        const fil = [m.marca, m.cor].filter(Boolean).join(' · ');
        const nome = m.loteNome || 'Lote sem nome';
        const fornecedor = m.loteFornecedor || 'n/d';
        const data = m.loteData ? fmtDate(m.loteData) : 'n/d';
        const preco = m.lotePrecoKg!=null ? fmtEUR(m.lotePrecoKg) + '/kg' : 'Preço n/d';
        const custo = m.custoFilamento!=null ? fmtEUR(m.custoFilamento) : fmtEUR(costs.custoFilamento);
        return `${fil ? escapeHtml(fil) + '<br>' : ''}Lote: ${escapeHtml(nome)}<br>Fornecedor: ${escapeHtml(fornecedor)} · Data: ${data}<br>Preço usado: ${preco} · Custo do filamento: ${custo}`;
      }).join('<br><br>')}
    </div>
  </div>`;
}

function sameCostInputs(p, form){
  const sameNumber = (a,b)=> (parseFloat(a)||0) === (parseFloat(b)||0);
  const prev = (p.materiais||[]).map(m=>({
    filKey:filKey(m.marca,m.cor),
    gramas:parseFloat(m.gramas)||0
  }));
  const next = (form.materiais||[]).map(m=>({
    filKey:m.filKey || '',
    gramas:parseFloat(m.gramas)||0
  }));
  if(prev.length !== next.length) return false;
  for(let i=0;i<prev.length;i++){
    if(prev[i].filKey !== next[i].filKey) return false;
    if(prev[i].gramas !== next[i].gramas) return false;
  }
  if(!sameNumber(p.horas, form.horas)) return false;
  if(!sameNumber(p.addons, form.addons)) return false;
  if('taxaFalhas' in form && !sameNumber(p.taxaFalhas, form.taxaFalhas)) return false;
  if('bufferFalhas' in form && !sameNumber(p.bufferFalhas, form.bufferFalhas)) return false;
  if('margemLucro' in form && !sameNumber(p.margemLucro, form.margemLucro)) return false;
  if('precoManual' in form && !sameNumber(p.precoManual, form.precoManual)) return false;
  if('precoVenda' in form && !sameNumber(p.precoVenda, form.precoVenda)) return false;
  if('custoFinal' in form && !sameNumber(p.custoFinal, form.custoFinal)) return false;
  return true;
}

function applyPedidoBreakdown(pedido, b){
  pedido.custoFilamento = b.custoFilamento;
  pedido.custoEletricidade = b.custoEletricidade;
  pedido.custoFinal = b.custoFinal;
  pedido.bufferFalhas = b.bufferFalhas;
  pedido.lucroValor = b.lucroValor;
  pedido.precoVenda = b.precoVenda;
}

function nextLoteId(lotes){
  const max = (lotes || []).reduce((n,l)=>{
    const m = String(l?.id || '').match(/^L(\d+)$/);
    return m ? Math.max(n, parseInt(m[1],10)) : n;
  }, 0);
  return 'L' + String(max + 1).padStart(3,'0');
}

function touchFilamentos(){
  syncStoreState();
  if(window.AutoSave) window.AutoSave.schedule();
}

function syncStoreState(){
  window.state = state;
  if(window.Store) window.Store.set(state);
}

function addLoteFilamento(filamentoId, lote){
  const filamento = state.filamentos.find(f=>f.id===filamentoId);
  if(!filamento) return null;
  filamento.lotes = Array.isArray(filamento.lotes) ? filamento.lotes : [];
  const rec = {
    id:lote?.id || nextLoteId(filamento.lotes),
    nome:lote?.nome || 'Novo lote',
    data:lote?.data || todayISO(),
    fornecedor:lote?.fornecedor || '',
    precoKg:parseFloat(lote?.precoKg)||0,
    ativo:lote?.ativo ?? true,
    arquivado:lote?.arquivado ?? false,
    criadoEm:lote?.criadoEm || new Date().toISOString()
  };
  if(rec.ativo) filamento.lotes.forEach(l=>{ l.ativo = false; });
  filamento.lotes.push(rec);
  touchFilamentos();
  return rec;
}

function updateLoteFilamento(filamentoId, loteId, patch){
  const filamento = state.filamentos.find(f=>f.id===filamentoId);
  if(!filamento || !Array.isArray(filamento.lotes)) return null;
  const lote = filamento.lotes.find(l=>l.id===loteId);
  if(!lote) return null;
  if(patch?.ativo){
    patch.arquivado = false;
    filamento.lotes.forEach(l=>{ if(l.id!==loteId) l.ativo = false; });
  }
  Object.assign(lote, patch || {});
  touchFilamentos();
  return lote;
}

function archiveLoteFilamento(filamentoId, loteId){
  const lote = updateLoteFilamento(filamentoId, loteId, {ativo:false, arquivado:true});
  if(lote && state.modal?.type==='lotes') openLotesModal(filamentoId);
  if(lote) toast('Lote arquivado');
  return lote;
}

function getPrecoKg(f){ return getPrecoKgFilamento(f); }

// materiais: array of {marca,cor,gramas,precoKg} - one print job can use several filaments/colors
function calcBreakdown({materiais,horas,addons,taxaFalhas,margemLucro}){
  materiais = materiais || [];
  horas = parseFloat(horas)||0;
  addons = parseFloat(addons)||0;
  taxaFalhas = parseFloat(taxaFalhas); if(isNaN(taxaFalhas)) taxaFalhas = 0;
  margemLucro = parseFloat(margemLucro); if(isNaN(margemLucro)) margemLucro = 0;
  const custoFilamento = materiais.reduce((s,m)=> s + ((parseFloat(m.gramas)||0) * (parseFloat(m.precoKg)||0))/1000, 0);
  const custoEletricidade = horas * ((state.config?.consumoMedio ?? DEFAULT_CONFIG.consumoMedio)||0) * ((state.config?.custoEletricidade ?? DEFAULT_CONFIG.custoEletricidade)||0);
  const custoFinal = addons + custoFilamento + custoEletricidade;
  const bufferFalhas = custoFinal * taxaFalhas;
  const lucroValor = custoFinal * margemLucro;
  const precoVenda = custoFinal + bufferFalhas + lucroValor;
  return {custoFilamento,custoEletricidade,addons,custoFinal,bufferFalhas,lucroValor,precoVenda,taxaFalhas,margemLucro};
}

/* ---------------------------------------------------------------
   TOAST
--------------------------------------------------------------- */
let toastTimer=null;
function toast(msg){
  const el = document.getElementById('toast');
  el.innerHTML = ICONS.check + '<span>'+escapeHtml(msg)+'</span>';
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 2200);
}
/* ---------------------------------------------------------------
   NAV
--------------------------------------------------------------- */
const NAV = [
  {id:'calc', label:'Calculadora', icon:'calc'},
  {id:'hist', label:'Histórico', icon:'hist'},
  {id:'fil', label:'Filamentos', icon:'fil'},
  {id:'cfg', label:'Definições', icon:'cfg'},
];

function toggleSidebar(open){
  state.sidebarOpen = open;
  document.getElementById('sidebar').classList.toggle('open', open);
  document.getElementById('scrim').classList.toggle('open', open);
}
function switchView(v){ state.view = v; toggleSidebar(false); render(); }

function renderSidebar(){
  const nav = document.getElementById('navList');
  nav.innerHTML = NAV.map(n=>`
    <button class="nav-btn ${state.view===n.id?'active':''}" onclick="switchView('${n.id}')">
      ${ICONS[n.icon]}<span>${n.label}</span>
    </button>`).join('');

  const pedidosAtivos = state.pedidos.filter(p=>p.deleted !== true);
  const totalPedidos = pedidosAtivos.length;
  const vendidos = pedidosAtivos.filter(p=>p.status==='vendido').length;
  document.getElementById('sidebarFoot').innerHTML = `
    ${syncBadgeHtml()}
    ${workspaceCode ? `<div class="workspace-code-chip" style="margin-bottom:10px;"><span>${escapeHtml(workspaceCode)}</span><button onclick="copyWorkspaceCode()" title="Copiar código">${ICONS.copy}</button><button onclick="copyWorkspaceLink()" title="Copiar link direto">${ICONS.copy}</button></div>` : ''}
    <div class="stat"><span>impressões registadas</span><b>${totalPedidos}</b></div>
    <div class="stat"><span>vendidas</span><b>${vendidos}</b></div>
    <div class="stat"><span>filamentos na base</span><b>${state.filamentos.length}</b></div>
  `;
}

/* ---------------------------------------------------------------
   RENDER: CALCULADORA
--------------------------------------------------------------- */
function filamentOptions(selectedKey){
  const sorted = [...state.filamentos].sort((a,b)=> (a.marca+a.cor).localeCompare(b.marca+b.cor));
  return sorted.map(f=>{
    const k = filKey(f.marca,f.cor);
    const pk = getPrecoKg(f);
    return `<option value="${escapeHtml(k)}" ${k===selectedKey?'selected':''}>${escapeHtml(f.marca)} — ${escapeHtml(f.cor)} (${fmtEUR(pk)}/kg)</option>`;
  }).join('');
}

function renderCalc(){
  const c = state.calc;
  const taxaDefault = state.config.taxaFalhas*100;
  const lucroDefault = state.config.margemLucro*100;
  return `
    <div class="page-head">
      <div>
        <h1>Calculadora de custo</h1>
        <p>Define os parâmetros da impressão e obtém o preço de venda sugerido.</p>
      </div>
    </div>
    <div class="grid-2">
      <div class="card layer-tex">
        <h2><span class="dot"></span>Dados da impressão</h2>
        <div class="calc-section">
          <h3>Materiais</h3>
          <div class="field">
            <label>Nome do projeto</label>
            <input type="text" id="in_projeto" placeholder="ex: Hogwarts globo" value="${escapeHtml(c.projeto)}" oninput="state.calc.projeto=this.value">
          </div>
          <div class="field">
            <label>Filamentos</label>
            <div id="materialRows">
              ${c.materiais.map(m=>materialRowHtml(m,'calc',c.materiais.length>1)).join('')}
            </div>
            <button type="button" class="btn btn-ghost btn-sm" onclick="calcAddMaterial()">${ICONS.plus} Adicionar filamento</button>
            <div class="hint">Impressão multi-material? Adiciona uma linha por cor/filamento usado. Não encontras um filamento? Adiciona-o na aba <a href="#" onclick="switchView('fil');return false;" style="color:var(--accent);">Filamentos</a>.</div>
          </div>
        </div>

        <div class="calc-section">
          <h3>Tempo</h3>
          <div class="field">
            <label>Tempo de impressão (total)</label>
            <div class="unit-input"><input type="number" min="0" step="any" id="in_horas" placeholder="0" value="${c.horas}" oninput="state.calc.horas=this.value; updateCalcPreview();"><span>h</span></div>
          </div>
        </div>

        <div class="calc-section">
          <h3>Custos</h3>
          <div class="field">
            <label>Add-ons / extras (ímanes, parafusos, embalagem…)</label>
            <div class="unit-input"><input type="number" min="0" step="any" id="in_addons" placeholder="0.00" value="${c.addons}" oninput="state.calc.addons=this.value; updateCalcPreview();"><span>€</span></div>
          </div>
          <div class="row2">
            <div class="field">
              <label>Taxa de falhas</label>
              <div class="unit-input"><input type="number" min="0" step="any" id="in_taxa" placeholder="${fmtNum(taxaDefault)}" value="${c.taxaFalhas===null?'':c.taxaFalhas}" oninput="state.calc.taxaFalhas=this.value; updateCalcPreview();"><span>%</span></div>
              <div class="hint">Vazio = usa definição global (${fmtNum(taxaDefault)}%)</div>
            </div>
            <div class="field">
              <label>Margem de lucro</label>
              <div class="unit-input"><input type="number" min="0" step="any" id="in_lucro" placeholder="${fmtNum(lucroDefault)}" value="${c.margemLucro===null?'':c.margemLucro}" oninput="state.calc.margemLucro=this.value; updateCalcPreview();"><span>%</span></div>
              <div class="hint">Vazio = usa definição global (${fmtNum(lucroDefault)}%)</div>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:6px;">
          <button class="btn btn-accent" style="flex:1;justify-content:center;" onclick="saveCalcToHistory()">${ICONS.plus} Guardar no histórico</button>
          <button class="btn btn-ghost" onclick="clearCalc()">Limpar</button>
        </div>
      </div>

      <div class="card">
        <h2><span class="dot" style="background:var(--teal);"></span>Composição do preço</h2>
        <div id="calcPreview"></div>
      </div>
    </div>
  `;
}

function resolveMateriais(materiais){
  return (materiais||[]).map(m=>{
    const fil = state.filamentos.find(f=>filKey(f.marca,f.cor)===m.filKey);
    return {
      id:m.id, filKey:m.filKey,
      filamentoId: fil?fil.id:null,
      marca: fil?fil.marca:null, cor: fil?fil.cor:null,
      gramas: parseFloat(m.gramas)||0,
      precoKg: fil?getPrecoKg(fil):0,
      loteSnapshot: fil?getLoteSnapshot(fil):null
    };
  });
}

function materialRowHtml(m, ctx, canRemove){
  const updateFn = ctx==='calc' ? 'calcUpdateMaterial' : 'modalUpdateMaterial';
  const removeFn = ctx==='calc' ? 'calcRemoveMaterial' : 'modalRemoveMaterial';
  const fil = state.filamentos.find(f=>filKey(f.marca,f.cor)===m.filKey);
  const lote = fil ? getLoteAtivoCalculo(fil) : null;
  const preco = fil ? getPrecoKg(fil) : 0;
  return `<div class="material-row">
    <div class="material-row-main">
      <div style="flex:2;min-width:180px;">
        <select onchange="${updateFn}('${m.id}','filKey',this.value)">
          <option value="">— escolher filamento —</option>
          ${filamentOptions(m.filKey)}
        </select>
        ${fil ? `<div class="material-meta">${escapeHtml(lote?.nome || 'Sem lote ativo')} · ${fmtEUR(preco)}/kg</div>` : ''}
      </div>
      <div style="flex:1;min-width:110px;">
        <div class="unit-input"><input type="number" min="0" step="any" placeholder="0" value="${m.gramas}" oninput="${updateFn}('${m.id}','gramas',this.value)"><span>g</span></div>
      </div>
      ${canRemove ? `<button type="button" class="icon-btn danger" onclick="${removeFn}('${m.id}')">${ICONS.trash}</button>` : `<div style="width:28px;flex-shrink:0;"></div>`}
    </div>
  </div>`;
}

function calcAddMaterial(){ state.calc.materiais.push({id:uid(), filKey:'', gramas:''}); render(); }
function calcRemoveMaterial(id){
  state.calc.materiais = state.calc.materiais.filter(m=>m.id!==id);
  if(state.calc.materiais.length===0) state.calc.materiais.push({id:uid(), filKey:'', gramas:''});
  render();
}
function calcUpdateMaterial(id, field, value){
  const m = state.calc.materiais.find(x=>x.id===id);
  if(m) m[field] = value;
  if(field==='filKey'){ render(); return; }
  updateCalcPreview();
}

function modalAddMaterial(){ state.modal.form.materiais.push({id:uid(), filKey:'', gramas:''}); render(); }
function modalRemoveMaterial(id){
  state.modal.form.materiais = state.modal.form.materiais.filter(m=>m.id!==id);
  if(state.modal.form.materiais.length===0) state.modal.form.materiais.push({id:uid(), filKey:'', gramas:''});
  render();
}
function modalUpdateMaterial(id, field, value){
  const m = state.modal.form.materiais.find(x=>x.id===id);
  if(m) m[field] = value;
}

function currentCalcInputs(){
  const c = state.calc;
  const materiais = resolveMateriais(c.materiais);
  const taxaFalhas = (c.taxaFalhas===null || c.taxaFalhas==='') ? state.config.taxaFalhas : (parseFloat(c.taxaFalhas)/100);
  const margemLucro = (c.margemLucro===null || c.margemLucro==='') ? state.config.margemLucro : (parseFloat(c.margemLucro)/100);
  return {materiais, horas:c.horas, addons:c.addons, taxaFalhas, margemLucro};
}

function layerHtml(label, value, total, color){
  if(!value || value<=0) return '';
  const pct = total>0 ? Math.max((value/total)*100, 6) : 0;
  return `<div class="layer" style="height:${pct}%;background:${color};">
    <div class="lbl">${escapeHtml(label)}<br>${fmtEUR(value)}</div>
  </div>`;
}

function updateCalcPreview(){
  const {materiais,horas,addons,taxaFalhas,margemLucro} = currentCalcInputs();
  const b = calcBreakdown({materiais,horas,addons,taxaFalhas,margemLucro});
  const total = b.precoVenda;
  const target = document.getElementById('calcPreview');
  if(!target) return;

  const validMateriais = materiais.filter(m=>m.marca && m.gramas>0);
  if(validMateriais.length===0){
    target.innerHTML = `
      <div class="stack-wrap">
        <div class="stack"><div class="stack-empty">escolhe pelo menos um<br>filamento e as gramas usadas</div></div>
        <div class="stack-total"><div class="n">${fmtEUR(0)}</div><div class="l">preço de venda sugerido</div></div>
      </div>`;
    return;
  }

  target.innerHTML = `
    <div class="calc-summary-grid">
      <div class="calc-summary-card"><span>Custo filamento</span><b>${fmtEUR(b.custoFilamento)}</b></div>
      <div class="calc-summary-card"><span>Eletricidade</span><b>${fmtEUR(b.custoEletricidade)}</b></div>
      <div class="calc-summary-card"><span>Falhas</span><b>${fmtEUR(b.bufferFalhas)}</b></div>
      <div class="calc-summary-card"><span>Custo total</span><b>${fmtEUR(b.custoFinal)}</b></div>
      <div class="calc-summary-card highlight"><span>Preço sugerido</span><b>${fmtEUR(b.precoVenda)}</b></div>
      <div class="calc-summary-card"><span>Lucro</span><b class="pos">${fmtEUR(b.lucroValor)}</b></div>
      <div class="calc-summary-card"><span>Margem</span><b>${fmtPct(margemLucro)}</b></div>
    </div>
    <div class="calc-material-list">
      ${validMateriais.map(m=>{
        const lote = m.loteSnapshot;
        return `<div class="calc-material-card">
          <div>
            <strong>${escapeHtml(m.marca)} · ${escapeHtml(m.cor)}</strong>
            <span>${lote?.loteNome || 'Sem lote ativo'} · ${fmtEUR(m.precoKg)}/kg</span>
          </div>
          <b>${fmtNum(m.gramas)}g · ${fmtEUR((m.gramas*m.precoKg)/1000)}</b>
        </div>`;
      }).join('')}
    </div>
    <div class="stack-wrap">
      <div class="stack">
        ${layerHtml('Lucro', b.lucroValor, total, 'var(--teal)')}
        ${layerHtml('Margem falhas', b.bufferFalhas, total, 'var(--coral)')}
        ${layerHtml('Add-ons', b.addons, total, 'var(--blue)')}
        ${layerHtml('Eletricidade', b.custoEletricidade, total, 'var(--violet)')}
        ${layerHtml('Filamento', b.custoFilamento, total, 'var(--accent)')}
      </div>
      <div class="stack-total">
        <div class="n">${fmtEUR(b.precoVenda)}</div>
        <div class="l">preço de venda sugerido</div>
      </div>
      <div class="legend">
        <div class="legend-row"><span class="sw" style="background:var(--accent);"></span><span class="k">Filamento</span><span class="v">${fmtEUR(b.custoFilamento)}</span></div>
        ${validMateriais.map(m=>`<div class="legend-row" style="padding-left:17px;font-size:11px;"><span class="k muted">${escapeHtml(m.marca)} ${escapeHtml(m.cor)} · ${fmtNum(m.gramas)}g</span><span class="v muted">${fmtEUR((m.gramas*m.precoKg)/1000)}</span></div>`).join('')}
        <div class="legend-row"><span class="sw" style="background:var(--violet);"></span><span class="k">Eletricidade</span><span class="v">${fmtEUR(b.custoEletricidade)}</span></div>
        <div class="legend-row"><span class="sw" style="background:var(--blue);"></span><span class="k">Add-ons</span><span class="v">${fmtEUR(b.addons)}</span></div>
        <div class="legend-row sub"><span class="k">Custo final</span><span class="v">${fmtEUR(b.custoFinal)}</span></div>
        <div class="legend-row"><span class="sw" style="background:var(--coral);"></span><span class="k">Margem de falhas (${fmtPct(taxaFalhas)})</span><span class="v">${fmtEUR(b.bufferFalhas)}</span></div>
        <div class="legend-row"><span class="sw" style="background:var(--teal);"></span><span class="k">Lucro (${fmtPct(margemLucro)})</span><span class="v">${fmtEUR(b.lucroValor)}</span></div>
      </div>
    </div>
  `;
}

async function saveCalcToHistory(){
  const c = state.calc;
  const {materiais,horas,addons,taxaFalhas,margemLucro} = currentCalcInputs();
  const validMateriais = materiais.filter(m=>m.marca && m.gramas>0);
  if(validMateriais.length===0){ toast('Escolhe pelo menos um filamento e indica as gramas'); return; }
  if(!c.projeto || !c.projeto.trim()){ toast('Dá um nome ao projeto'); return; }
  const b = calcBreakdown({materiais:validMateriais,horas,addons,taxaFalhas,margemLucro});
  const pedidoMateriais = validMateriais.map(buildPedidoMaterialSnapshot);
  const pedido = {
    id:uid(), projeto:c.projeto.trim(),
    materiais: pedidoMateriais,
    horas:parseFloat(horas)||0, addons:parseFloat(addons)||0,
    taxaFalhas, margemLucro,
    custoFilamento:b.custoFilamento, custoEletricidade:b.custoEletricidade, custoFinal:b.custoFinal,
    bufferFalhas:b.bufferFalhas, lucroValor:b.lucroValor,
    precoVenda:b.precoVenda, recebido:null, status:'orcamento', data:todayISO(), notas:''
  };
  pedido.costSnapshot = buildCostSnapshot({materiais:pedidoMateriais, horas, addons, taxaFalhas, margemLucro, breakdown:b});
  state.pedidos.unshift(pedido);
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
  toast('Guardado no histórico');
  clearCalc();
}
function clearCalc(){
  state.calc = {projeto:'', materiais:[{id:uid(), filKey:'', gramas:''}], horas:'', addons:'', taxaFalhas:null, margemLucro:null};
  render();
}

/* ---------------------------------------------------------------
   RENDER: HISTÓRICO
--------------------------------------------------------------- */
function getPedidoStatusView(p){
  if(p?.deleted === true) return {id:'lixo', label:'Lixo', cls:'badge-orc'};
  if(p?.status === 'entregue' || p?.entregue === true) return {id:'entregue', label:'Entregue', cls:'badge-vend'};
  if(p?.status === 'pago' || p?.pago === true || (p?.status === 'vendido' && p?.recebido !== null && p?.recebido !== undefined)){
    return {id:'pago', label:'Pago', cls:'badge-vend'};
  }
  if(p?.status === 'vendido') return {id:'vendido', label:'Vendido', cls:'badge-vend'};
  return {id:'orcamento', label:'Orçamento', cls:'badge-orc'};
}

function getPedidoCliente(p){
  return p?.cliente || p?.customer || p?.nomeCliente || '';
}

function getPedidoGramasTotal(p){
  return (p?.materiais||[]).reduce((s,m)=>s+(parseFloat(m.gramas)||0),0);
}

function getPedidoPrecoKgLabel(p){
  const mats = getPedidoSnapshotMateriais(p);
  const withPrice = mats.filter(m=>m.lotePrecoKg!==null && m.lotePrecoKg!==undefined);
  if(withPrice.length>1) return 'vários';
  if(withPrice.length===1) return `${fmtEUR(withPrice[0].lotePrecoKg)}/kg`;
  const costs = getPedidoCostValues(p);
  return costs.lotePrecoKg!=null ? `${fmtEUR(costs.lotePrecoKg)}/kg` : 'n/d';
}

function getPedidoLoteLabel(p){
  if(!p?.costSnapshot) return 'Lote não registado';
  const mats = getPedidoSnapshotMateriais(p).filter(m=>m.loteNome);
  if(mats.length>1){
    const nomes = [...new Set(mats.map(m=>m.loteNome).filter(Boolean))];
    return nomes.length===1 ? nomes[0] : 'vários lotes';
  }
  return mats[0]?.loteNome || 'Lote não registado';
}

function escapeAttr(s){
  return escapeHtml(s);
}

function getPedidoMateriaisTooltip(p){
  const snapMats = getPedidoSnapshotMateriais(p);
  if(p?.costSnapshot && snapMats.length>0){
    return snapMats.map(m=>{
      const fil = [m.marca, m.cor].filter(Boolean).join(' ') || 'Material';
      const lote = m.loteNome || 'Lote não registado';
      const preco = m.lotePrecoKg!=null ? `${fmtEUR(m.lotePrecoKg)}/kg` : 'preço n/d';
      const gramas = m.gramas!=null ? `${fmtNum(m.gramas)} g` : 'gramas n/d';
      return `${fil} — ${gramas} — ${lote} — ${preco}`;
    }).join('\n');
  }
  const mats = p?.materiais || [];
  if(mats.length===0) return 'Detalhe não registado';
  return mats.map(m=>{
    const fil = [m.marca, m.cor].filter(Boolean).join(' ') || 'Material';
    const gramas = m.gramas!=null ? `${fmtNum(m.gramas)} g` : 'gramas n/d';
    const preco = m.precoKg!=null ? `${fmtEUR(m.precoKg)}/kg` : 'preço n/d';
    return `${fil} — ${gramas} — Lote não registado — ${preco}`;
  }).join('\n');
}

function getPedidoCustosTooltip(p){
  const snap = p?.costSnapshot;
  const costs = getPedidoCostValues(p);
  const custoFilamento = snap?.custoFilamento ?? p?.custoFilamento;
  const eletricidade = snap?.custoEletricidade ?? p?.custoEletricidade;
  const falhas = snap?.bufferFalhas ?? p?.bufferFalhas;
  const addons = snap?.addons ?? p?.addons;
  return [
    `Filamento: ${custoFilamento!=null ? fmtEUR(custoFilamento) : 'n/d'}`,
    `Eletricidade: ${eletricidade!=null ? fmtEUR(eletricidade) : 'n/d'}`,
    `Falhas: ${falhas!=null ? fmtEUR(falhas) : 'n/d'}`,
    `Addons: ${addons!=null ? fmtEUR(addons) : 'n/d'}`,
    `Total: ${fmtEUR(costs.custoFinal)}`
  ].join('\n');
}

function fmtTempoHoras(horas){
  const n = parseFloat(horas);
  if(isNaN(n) || n<=0) return '—';
  const h = Math.floor(n);
  const m = Math.round((n-h)*60);
  if(h && m) return `${h} h ${m} min`;
  if(h) return `${h} h`;
  return `${m} min`;
}

function renderPedidoMetric(label, value, cls=''){
  return `<div style="min-width:0;">
    <div class="muted" style="font-size:11px;margin-bottom:3px;">${label}</div>
    <div class="${cls}" style="font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${value}</div>
  </div>`;
}

function pedidosFiltrados(){
  const showTrash = state.hist.status === 'lixo';
  let list = state.pedidos.filter(p=>showTrash ? p.deleted === true : p.deleted !== true);
  const s = state.hist.search.trim().toLowerCase();
  if(s) list = list.filter(p => (p.projeto||'').toLowerCase().includes(s) || getPedidoCliente(p).toLowerCase().includes(s) || (p.materiais||[]).some(m=>(m.marca||'').toLowerCase().includes(s) || (m.cor||'').toLowerCase().includes(s)));
  if(!showTrash && state.hist.status!=='todos') list = list.filter(p=>getPedidoStatusView(p).id===state.hist.status);
  const sort = state.hist.sort;
  list.sort((a,b)=>{
    if(sort==='data_desc' || sort==='data_asc'){
      const da = a.data? new Date(a.data).getTime() : -Infinity;
      const db = b.data? new Date(b.data).getTime() : -Infinity;
      return sort==='data_desc' ? db-da : da-db;
    }
    if(sort==='lucro_desc'){
      const ca = getPedidoCostValues(a);
      const cb = getPedidoCostValues(b);
      const la = a.recebido!==null ? a.recebido-ca.custoFinal : -Infinity;
      const lb = b.recebido!==null ? b.recebido-cb.custoFinal : -Infinity;
      return lb-la;
    }
    if(sort==='custo_desc') return getPedidoCostValues(b).custoFinal-getPedidoCostValues(a).custoFinal;
    return 0;
  });
  return list;
}

function renderHist(){
  const list = pedidosFiltrados();
  const all = state.pedidos.filter(p=>p.deleted !== true);
  const vendidosList = all.filter(p=>p.status==='vendido' || p.recebido!==null);
  const totalVendido = vendidosList.reduce((s,p)=>s+getPedidoCostValues(p).precoVenda,0);
  const totalRecebido = all.filter(p=>p.recebido!==null).reduce((s,p)=>s+p.recebido,0);
  const lucroEstimado = all.reduce((s,p)=>s+(getPedidoCostValues(p).precoVenda-getPedidoCostValues(p).custoFinal),0);
  const pedidosAbertos = all.filter(p=>p.status!=='vendido' && p.recebido===null).length;
  const orcamentos = all.filter(p=>p.status==='orcamento').length;
  const vendidos = vendidosList.length;

  return `
    <div class="page-head">
      <div>
        <h1>Histórico de impressões</h1>
        <p>${all.length} registo${all.length===1?'':'s'} no total · ${pedidosAbertos} em aberto</p>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="exportCSV()">${ICONS.download} Exportar CSV</button>
    </div>

    <div class="stat-cards">
      <div class="stat-card"><div class="k">Total vendido</div><div class="v">${fmtEUR(totalVendido)}</div></div>
      <div class="stat-card"><div class="k">Total recebido</div><div class="v">${fmtEUR(totalRecebido)}</div></div>
      <div class="stat-card"><div class="k">Lucro estimado</div><div class="v ${lucroEstimado>=0?'pos':'neg'}">${fmtEUR(lucroEstimado)}</div></div>
      <div class="stat-card"><div class="k">Pedidos em aberto</div><div class="v">${pedidosAbertos}</div></div>
      <div class="stat-card"><div class="k">Orçamentos</div><div class="v">${orcamentos}</div></div>
      <div class="stat-card"><div class="k">Vendidos</div><div class="v">${vendidos}</div></div>
    </div>

    <div class="toolbar">
      <input type="text" placeholder="Pesquisar projeto ou filamento…" value="${escapeHtml(state.hist.search)}" oninput="state.hist.search=this.value; renderHistTable();">
      <select onchange="state.hist.status=this.value; renderHistTable();">
        <option value="todos" ${state.hist.status==='todos'?'selected':''}>Todos os estados</option>
        <option value="orcamento" ${state.hist.status==='orcamento'?'selected':''}>Orçamento</option>
        <option value="vendido" ${state.hist.status==='vendido'?'selected':''}>Vendidos</option>
        <option value="pago" ${state.hist.status==='pago'?'selected':''}>Pagos</option>
        <option value="lixo" ${state.hist.status==='lixo'?'selected':''}>Lixo</option>
      </select>
      <select onchange="state.hist.sort=this.value; renderHistTable();">
        <option value="data_desc" ${state.hist.sort==='data_desc'?'selected':''}>Mais recentes</option>
        <option value="data_asc" ${state.hist.sort==='data_asc'?'selected':''}>Mais antigos</option>
        <option value="lucro_desc" ${state.hist.sort==='lucro_desc'?'selected':''}>Maior lucro</option>
        <option value="custo_desc" ${state.hist.sort==='custo_desc'?'selected':''}>Maior custo</option>
      </select>
      <div class="spacer"></div>
    </div>

    <div class="card" style="padding:0;overflow-x:auto;">
      <div id="histTableWrap"></div>
    </div>
  `;
}

function renderHistTable(){
  const wrap = document.getElementById('histTableWrap');
  if(!wrap) return;
  const list = pedidosFiltrados();
  const showTrash = state.hist.status === 'lixo';
  if(list.length===0){
    wrap.innerHTML = `<div class="empty-state">${ICONS.box}<p>Sem registos para mostrar.</p><p style="font-size:12px;">${showTrash?'O lixo está vazio.':'Cria uma nova impressão na Calculadora.'}</p></div>`;
    return;
  }
  wrap.innerHTML = `
    <div class="history-list">
      <div class="history-header">
        <span>Nome</span><span>Estado</span><span>Gramas</span><span>Tempo</span><span>Custo total</span><span>Preço venda</span><span>Recebido</span><span>Lucro</span><span>Ações</span>
      </div>
      ${list.map(p=>{
        const costs = getPedidoCostValues(p);
        const status = getPedidoStatusView(p);
        const cliente = getPedidoCliente(p);
        const hasRecebido = p.recebido !== null && p.recebido !== undefined;
        const lucro = hasRecebido ? (p.recebido - costs.custoFinal) : null;
        const lucroCls = lucro===null ? '' : (lucro>=0 ? 'pos' : 'neg');
        const data = p.data ? fmtDate(p.data) : 'Sem data';
        const materiaisTooltip = getPedidoMateriaisTooltip(p);
        const custosTooltip = getPedidoCustosTooltip(p);
        return `<article class="history-row">
          <div class="history-name">
            <strong>${escapeHtml(p.projeto || 'Pedido sem nome')}</strong>
            <span>${data}</span>
          </div>
          <div class="history-cell"><span class="history-label">Estado</span><span class="badge ${status.cls}">${status.label}</span></div>
          <div class="history-cell mono" title="${escapeAttr(materiaisTooltip)}"><span class="history-label">Gramas</span><b>${fmtNum(getPedidoGramasTotal(p))} g</b></div>
          <div class="history-cell mono"><span class="history-label">Tempo</span><b>${fmtTempoHoras(p.horas)}</b></div>
          <div class="history-cell mono" title="${escapeAttr(custosTooltip)}"><span class="history-label">Custo</span><b>${fmtEUR(costs.custoFinal)}</b></div>
          <div class="history-cell mono"><span class="history-label">Venda</span><b>${fmtEUR(costs.precoVenda)}</b></div>
          <div class="history-cell mono"><span class="history-label">Recebido</span><b>${hasRecebido ? fmtEUR(p.recebido) : '—'}</b></div>
          <div class="history-cell mono"><span class="history-label">Lucro</span><b class="${lucroCls}">${lucro===null ? '—' : fmtEUR(lucro)}</b></div>
          <div class="history-actions row-actions">
            ${showTrash ? `
              <button class="btn btn-ghost btn-sm" title="Restaurar" onclick="restorePedidoFromTrash('${p.id}')">${ICONS.check} Restaurar</button>
              <button class="btn btn-danger btn-sm" title="Eliminar definitivamente" onclick="confirmPermanentDeletePedido('${p.id}')">${ICONS.trash} Eliminar definitivamente</button>
            ` : `
              ${p.status==='orcamento' ? `<button class="btn btn-ghost btn-sm" title="Marcar vendido" onclick="openVendaModal('${p.id}')">${ICONS.euro} Vender</button>` : ''}
              <button class="btn btn-ghost btn-sm" title="Duplicar" onclick="openDuplicateModal('${p.id}')">${ICONS.copy} Duplicar</button>
              <button class="btn btn-ghost btn-sm" title="Editar" onclick="openEditPedidoModal('${p.id}')">${ICONS.edit} Editar</button>
              <button class="btn btn-danger btn-sm" title="Eliminar" onclick="confirmDeletePedido('${p.id}')">${ICONS.trash} Eliminar</button>
            `}
          </div>
        </article>`;
      }).join('')}
    </div>
  `;
}

function exportCSV(){
  const headers = ['Projeto','Materiais','GramasTotal','Horas','Addons','CustoFilamento','CustoEletricidade','CustoFinal','PrecoVendaSugerido','Recebido','Lucro','Estado','Data'];
  const rows = state.pedidos.filter(p=>p.deleted !== true).map(p=>{
    const costs = getPedidoCostValues(p);
    return [
      p.projeto,
      (p.materiais||[]).map(m=>`${m.marca} ${m.cor} (${m.gramas}g)`).join(' + '),
      (p.materiais||[]).reduce((s,m)=>s+(m.gramas||0),0),
      p.horas,p.addons,
      costs.custoFilamento.toFixed(4),costs.custoEletricidade.toFixed(4),costs.custoFinal.toFixed(4),costs.precoVenda.toFixed(4),
      p.recebido!==null?p.recebido:'', p.recebido!==null?(p.recebido-costs.custoFinal).toFixed(4):'', p.status, p.data||''
    ];
  });
  const csv = [headers.join(';'), ...rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(';'))].join('\n');
  const blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'historico_impressoes_3d.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('CSV exportado');
}

function openVendaModal(id){
  const p = state.pedidos.find(x=>x.id===id);
  if(!p) return;
  state.modal = {type:'venda', id, valor: getPedidoCostValues(p).precoVenda.toFixed(2)};
  render();
}
function openEditPedidoModal(id){
  const p = state.pedidos.find(x=>x.id===id);
  if(!p) return;
  state.modal = {type:'editPedido', id, form:{
    projeto:p.projeto,
    materiais: (p.materiais||[]).map(m=>({id:uid(), filKey:filKey(m.marca,m.cor), gramas:m.gramas})),
    horas:p.horas, addons:p.addons,
    recebido: p.recebido, status:p.status, data: p.data||''
  }};
  render();
}
function confirmDeletePedido(id){
  const p = state.pedidos.find(x=>x.id===id);
  if(!p) return;
  state.modal = {type:'deletePedido', id, nome:p.projeto};
  render();
}
async function movePedidoToTrash(pedidoId){
  const p = state.pedidos.find(x=>x.id===pedidoId);
  if(!p) return;
  p.deleted = true;
  p.deletedAt = new Date().toISOString();
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
}
async function doDeletePedido(id){
  await movePedidoToTrash(id);
  closeModal();
  toast('Registo movido para o lixo');
  render();
}
async function restorePedidoFromTrash(pedidoId){
  const p = state.pedidos.find(x=>x.id===pedidoId);
  if(!p) return;
  delete p.deleted;
  delete p.deletedAt;
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
  toast('Registo restaurado');
  render();
}
function confirmPermanentDeletePedido(id){
  const p = state.pedidos.find(x=>x.id===id);
  if(!p) return;
  state.modal = {type:'permanentDeletePedido', id, nome:p.projeto};
  render();
}
async function permanentlyDeletePedido(pedidoId){
  state.pedidos = state.pedidos.filter(p=>p.id!==pedidoId);
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
  closeModal();
  toast('Registo eliminado definitivamente');
  render();
}
function openDuplicateModal(id){
  const p = state.pedidos.find(x=>x.id===id);
  if(!p) return;
  state.modal = {type:'duplicatePedido', id, nome: p.projeto};
  render();
}
async function doDuplicatePedido(){
  const m = state.modal;
  const p = state.pedidos.find(x=>x.id===m.id);
  if(!p) return;
  if(!m.nome || !m.nome.trim()){ toast('Dá um nome ao novo projeto'); return; }
  const materiaisAtuais = resolveMateriais((p.materiais||[]).map(mat=>({
    id:uid(),
    filKey:filKey(mat.marca,mat.cor),
    gramas:mat.gramas
  }))).filter(mat=>mat.marca && mat.gramas>0);
  const materiaisSnapshot = materiaisAtuais.length === (p.materiais||[]).length
    ? materiaisAtuais.map(buildPedidoMaterialSnapshot)
    : (p.materiais||[]).map(mat=>({...mat}));
  const b = calcBreakdown({
    materiais:materiaisSnapshot,
    horas:p.horas,
    addons:p.addons,
    taxaFalhas:p.taxaFalhas,
    margemLucro:p.margemLucro
  });
  const novo = {
    ...p, id:uid(),
    projeto: m.nome.trim(),
    materiais: materiaisSnapshot,
    recebido: null, status:'orcamento', data: todayISO(),
    costSnapshot:null
  };
  delete novo.costSnapshot;
  applyPedidoBreakdown(novo, b);
  novo.costSnapshot = buildCostSnapshot({
    materiais:materiaisSnapshot,
    horas:novo.horas,
    addons:novo.addons,
    taxaFalhas:novo.taxaFalhas,
    margemLucro:novo.margemLucro,
    breakdown:b
  });
  state.pedidos.unshift(novo);
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
  closeModal();
  toast('Projeto duplicado');
}
async function confirmVenda(){
  const m = state.modal;
  const p = state.pedidos.find(x=>x.id===m.id);
  if(!p) return;
  const valor = parseFloat(m.valor);
  if(isNaN(valor) || valor<0){ toast('Indica um valor válido'); return; }
  p.recebido = valor;
  p.status = 'vendido';
  if(!p.data) p.data = todayISO();
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
  closeModal();
  toast('Marcado como vendido');
}
async function saveEditPedido(){
  const m = state.modal;
  const p = state.pedidos.find(x=>x.id===m.id);
  if(!p) return;
  const f = m.form;
  if(!f.projeto || !f.projeto.trim()){ toast('O projeto precisa de um nome'); return; }
  const shouldRecalculate = !sameCostInputs(p, f);
  console.log(shouldRecalculate ? 'Snapshot: recalculado' : 'Snapshot: mantido');
  let resolved = [];
  if(shouldRecalculate){
    resolved = resolveMateriais(f.materiais).filter(m=>m.marca && m.gramas>0);
    if(resolved.length===0){ toast('Escolhe pelo menos um filamento e indica as gramas'); return; }
  }
  p.projeto = f.projeto.trim();
  p.data = f.data || null;
  p.status = f.status;
  p.recebido = (f.recebido===''||f.recebido===null) ? null : parseFloat(f.recebido);
  if(p.status==='orcamento') p.recebido = null;
  if(shouldRecalculate){
    p.materiais = resolved.map(buildPedidoMaterialSnapshot);
    p.horas = parseFloat(f.horas)||0;
    p.addons = parseFloat(f.addons)||0;
    const b = calcBreakdown({materiais:p.materiais,horas:p.horas,addons:p.addons,taxaFalhas:p.taxaFalhas,margemLucro:p.margemLucro});
    applyPedidoBreakdown(p, b);
    p.costSnapshot = buildCostSnapshot({
      materiais:p.materiais,
      horas:p.horas,
      addons:p.addons,
      taxaFalhas:p.taxaFalhas,
      margemLucro:p.margemLucro,
      breakdown:b
    });
  }
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
  closeModal();
  toast('Registo atualizado');
}

/* ---------------------------------------------------------------
   RENDER: FILAMENTOS
--------------------------------------------------------------- */
function getLoteUiState(filamento){
  const lote = getLoteAtivoCalculo(filamento);
  if(lote) return {lote, label:'Ativo', cls:'badge-vend'};
  if(Array.isArray(filamento?.lotes) && filamento.lotes.length>0) return {lote:null, label:'Sem lote ativo', cls:'badge-orc'};
  return {lote:null, label:'Sem lote', cls:'badge-orc'};
}

function renderFilMetric(label, value, cls=''){
  return `<div style="min-width:0;">
    <div class="muted" style="font-size:11px;margin-bottom:3px;">${label}</div>
    <div class="${cls}" style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${value}</div>
  </div>`;
}

function renderFil(){
  const list = [...state.filamentos].sort((a,b)=>(a.marca+a.cor).localeCompare(b.marca+b.cor));
  return `
    <div class="page-head">
      <div>
        <h1>Base de filamentos</h1>
        <p>Marcas, cores e preços usados no cálculo de custo.</p>
      </div>
      <button class="btn btn-accent" onclick="openFilModal()">${ICONS.plus} Novo filamento</button>
    </div>
    <div class="card" style="padding:0;overflow-x:auto;">
      ${list.length===0 ? `<div class="empty-state">${ICONS.fil}<p>Ainda não tens filamentos registados.</p></div>` : `
      <div style="display:grid;gap:0;">
        ${list.map(f=>{
          const loteState = getLoteUiState(f);
          const lote = loteState.lote;
          return `<article style="padding:14px 16px;border-bottom:1px solid var(--border-soft);">
            <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;">
              <div style="min-width:220px;flex:1;">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                  <strong style="font-size:14px;">${escapeHtml(f.marca)}</strong>
                  <span class="badge ${loteState.cls}">${loteState.label}</span>
                </div>
                <div class="muted" style="font-size:11px;margin-top:4px;line-height:1.35;">
                  ${escapeHtml(f.tipo || f.material || 'Tipo n/d')} ·
                  <span style="display:inline-flex;align-items:center;gap:6px;">
                    <span style="width:9px;height:9px;border-radius:50%;background:${colorSwatch(f.cor)};display:inline-block;border:1px solid var(--border);"></span>
                    ${escapeHtml(f.cor)}
                  </span>
                </div>
              </div>
              <div class="row-actions" style="justify-content:flex-end;">
                <button class="btn btn-accent btn-sm" title="Gerir lotes" onclick="openLotesModal('${f.id}')">${ICONS.box} Lotes</button>
                <button class="btn btn-ghost btn-sm" title="Editar filamento" onclick="openFilModal('${f.id}')">${ICONS.edit} Editar</button>
                <button class="btn btn-danger btn-sm" title="Eliminar filamento" onclick="confirmDeleteFil('${f.id}')">${ICONS.trash} Eliminar</button>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-top:14px;">
              ${renderFilMetric('Lote ativo', escapeHtml(lote?.nome || 'Sem lote'))}
              ${renderFilMetric('Fornecedor', escapeHtml(lote?.fornecedor || 'n/d'))}
              ${renderFilMetric('Data', lote?.data ? fmtDate(lote.data) : 'n/d')}
              ${renderFilMetric('€/kg', fmtEUR(getPrecoKgFilamento(f)), 'mono')}
              ${renderFilMetric('Preço bobina', f.preco ? fmtEUR(f.preco) : 'n/d')}
              ${renderFilMetric('Tamanho', `${fmtNum(f.spool,2)} kg`)}
            </div>
          </article>`;
        }).join('')}
      </div>`}
    </div>
  `;
}

function colorSwatch(name){
  const map = {
    'branco':'#e8e8e8','branco frio':'#f2f2f2','branco 2':'#e8e8e8','preto':'#222','rosa':'#f2a0c4','azul celeste':'#8fcdf0',
    'madeira':'#b98554','wood':'#b98554','mármore':'#d9d3c8','amarelo':'#f5d833','laranja':'#f28c28','dourado':'#d4af37',
    'castanho':'#6b4226','verde abacate':'#8aa04b'
  };
  const k = (name||'').toLowerCase().trim();
  return map[k] || '#8B7CF6';
}

function openFilModal(id){
  if(id){
    const f = state.filamentos.find(x=>x.id===id);
    state.modal = {type:'fil', id, form:{marca:f.marca,tipo:f.tipo||f.material||'',cor:f.cor,preco:f.preco,spool:f.spool,density:f.density||'',nozzle:f.nozzle||'',bed:f.bed||''}};
  }else{
    state.modal = {type:'fil', id:null, form:{marca:'',tipo:'',cor:'',preco:'',spool:1,density:'',nozzle:'',bed:'',loteNome:'Lote inicial',loteData:todayISO(),loteFornecedor:'',lotePrecoKg:''}};
  }
  render();
}
async function saveFilModal(){
  const m = state.modal, f = m.form;
  if(!f.marca.trim() || !f.cor.trim()){ toast('Indica marca e cor'); return; }
  const spool = parseFloat(f.spool)||1;
  const lotePrecoKg = parseFloat(f.lotePrecoKg);
  if(!m.id && f.lotePrecoKg!=='' && (isNaN(lotePrecoKg) || lotePrecoKg<0)){ toast('Indica um preço €/kg válido'); return; }
  const rec = {
    marca:f.marca.trim(), tipo:(f.tipo||'').trim(), cor:f.cor.trim(), spool,
    density:f.density?parseFloat(f.density):null, nozzle:f.nozzle?parseFloat(f.nozzle):null, bed:f.bed?parseFloat(f.bed):null
  };
  if(m.id) rec.preco = parseFloat(f.preco)||0;
  if(m.id){
    const idx = state.filamentos.findIndex(x=>x.id===m.id);
    state.filamentos[idx] = {...state.filamentos[idx], ...rec};
  }else{
    const novo = {id:uid(), ...rec, lotes:[]};
    if(f.lotePrecoKg!==''){
      novo.lotes.push({
        id:'L001',
        nome:(f.loteNome||'Lote inicial').trim(),
        data:f.loteData || todayISO(),
        fornecedor:(f.loteFornecedor||'').trim(),
        precoKg:lotePrecoKg,
        ativo:true,
        arquivado:false,
        criadoEm:new Date().toISOString()
      });
    }
    state.filamentos.push(novo);
  }
  if (window.AutoSave) window.AutoSave.schedule();
  await saveFilamentos();
  closeModal();
  toast('Filamento guardado');
}

function loteFormDefaults(){
  return {nome:'', data:todayISO(), fornecedor:'', precoKg:'', ativo:true};
}

function openLotesModal(filamentoId){
  const filamento = state.filamentos.find(f=>f.id===filamentoId);
  if(!filamento) return;
  migrateFilamentosToLotes();
  const lotesForm = {};
  (filamento.lotes || []).forEach(l=>{
    lotesForm[l.id] = {
      nome:l.nome || '',
      data:l.data || '',
      fornecedor:l.fornecedor || '',
      precoKg:l.precoKg ?? '',
      ativo:!!l.ativo
    };
  });
  state.modal = {type:'lotes', filamentoId, form:loteFormDefaults(), lotesForm};
  render();
}

function saveLoteFilamento(){
  const m = state.modal;
  if(!m || m.type!=='lotes') return;
  const f = m.form;
  const precoKg = parseFloat(f.precoKg);
  if(!f.nome || !f.nome.trim()){ toast('Indica o nome do lote'); return; }
  if(isNaN(precoKg) || precoKg<0){ toast('Indica um preço €/kg válido'); return; }
  const lote = addLoteFilamento(m.filamentoId, {
    nome:f.nome.trim(),
    data:f.data || todayISO(),
    fornecedor:(f.fornecedor||'').trim(),
    precoKg,
    ativo:!!f.ativo,
    arquivado:false
  });
  if(!lote) return;
  toast('Lote criado');
  openLotesModal(m.filamentoId);
}

function saveExistingLoteFilamento(filamentoId, loteId){
  const m = state.modal;
  if(!m || !m.lotesForm || !m.lotesForm[loteId]) return;
  const f = m.lotesForm[loteId];
  const precoKg = parseFloat(f.precoKg);
  if(!f.nome || !f.nome.trim()){ toast('Indica o nome do lote'); return; }
  if(isNaN(precoKg) || precoKg<0){ toast('Indica um preço €/kg válido'); return; }
  const lote = updateLoteFilamento(filamentoId, loteId, {
    nome:f.nome.trim(),
    data:f.data || '',
    fornecedor:(f.fornecedor||'').trim(),
    precoKg,
    ativo:!!f.ativo
  });
  if(!lote) return;
  toast('Lote guardado');
  openLotesModal(filamentoId);
}

function setLoteAtivo(filamentoId, loteId){
  const lote = updateLoteFilamento(filamentoId, loteId, {ativo:true, arquivado:false});
  if(!lote) return;
  toast('Lote ativo atualizado');
  openLotesModal(filamentoId);
}

function confirmDeleteFil(id){
  const f = state.filamentos.find(x=>x.id===id);
  state.modal = {type:'deleteFil', id, nome:f.marca+' — '+f.cor};
  render();
}
async function doDeleteFil(id){
  state.filamentos = state.filamentos.filter(f=>f.id!==id);
  if (window.AutoSave) window.AutoSave.schedule();
  await saveFilamentos();
  closeModal();
  toast('Filamento eliminado');
}

/* ---------------------------------------------------------------
   RENDER: CONFIGURAÇÕES
--------------------------------------------------------------- */
function renderCfg(){
  const c = state.config;
  return `
    <div class="page-head">
      <div>
        <h1>Definições</h1>
        <p>Parâmetros globais usados por omissão em todos os cálculos.</p>
      </div>
    </div>
    <div class="card layer-tex" style="max-width:520px;">
      <h2><span class="dot"></span>Impressora &amp; eletricidade</h2>
      <div class="row2">
        <div class="field">
          <label>Consumo médio da impressora</label>
          <div class="unit-input"><input type="number" step="any" min="0" value="${c.consumoMedio}" oninput="(state.config?.consumoMedio ?? DEFAULT_CONFIG.consumoMedio)=parseFloat(this.value)||0; saveConfigDebounced();"><span>kWh/h</span></div>
        </div>
        <div class="field">
          <label>Custo da eletricidade</label>
          <div class="unit-input"><input type="number" step="any" min="0" value="${c.custoEletricidade}" oninput="(state.config?.custoEletricidade ?? DEFAULT_CONFIG.custoEletricidade)=parseFloat(this.value)||0; saveConfigDebounced();"><span>€/kWh</span></div>
        </div>
      </div>
    </div>
    <div class="card layer-tex" style="max-width:520px;">
      <h2><span class="dot" style="background:var(--teal);"></span>Margens por omissão</h2>
      <div class="row2">
        <div class="field">
          <label>Taxa de falhas</label>
          <div class="unit-input"><input type="number" step="any" min="0" value="${(c.taxaFalhas*100)}" oninput="state.config.taxaFalhas=(parseFloat(this.value)||0)/100; saveConfigDebounced();"><span>%</span></div>
          <div class="hint">Reserva sobre o custo para cobrir impressões falhadas.</div>
        </div>
        <div class="field">
          <label>Margem de lucro</label>
          <div class="unit-input"><input type="number" step="any" min="0" value="${(c.margemLucro*100)}" oninput="state.config.margemLucro=(parseFloat(this.value)||0)/100; saveConfigDebounced();"><span>%</span></div>
          <div class="hint">Multiplicador de lucro sobre o custo final.</div>
        </div>
      </div>
      <div class="hint" style="margin-top:4px;">Podes substituir estes valores em cada impressão, na Calculadora.</div>
    </div>
    <div class="card layer-tex" style="max-width:520px;">
      <h2><span class="dot" style="background:var(--teal);"></span>Sincronização entre dispositivos</h2>
      <p style="font-size:12.5px;color:var(--text-dim);margin-top:0;line-height:1.5;">
        Os teus dados ficam guardados na cloud, associados ao código de espaço abaixo.
        Usa o mesmo código noutro computador ou telemóvel para veres os mesmos dados.
      </p>
      ${workspaceCode ? `<div class="workspace-code-chip" style="max-width:220px;margin-bottom:12px;"><span>${escapeHtml(workspaceCode)}</span><button onclick="copyWorkspaceCode()" title="Copiar código">${ICONS.copy}</button><button onclick="copyWorkspaceLink()" title="Copiar link direto">${ICONS.copy}</button></div>` : ''}
      <div>${syncBadgeHtml()}</div>
      <button class="btn btn-ghost btn-sm" style="margin-top:12px;" onclick="confirmSwitchWorkspace()">Mudar de espaço / sair</button>
    </div>
    <div class="card layer-tex" style="max-width:520px;">
      <h2><span class="dot" style="background:var(--violet);"></span>Cópia de segurança</h2>
      <p style="font-size:12.5px;color:var(--text-dim);margin-top:0;line-height:1.5;">
        Mesmo com sincronização na cloud, vale a pena teres uma cópia de vez em quando —
        para recuperares dados se algo correr mal, ou para levares tudo para outra ferramenta.
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" onclick="exportBackup()">${ICONS.download} Exportar cópia (.json)</button>
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('backupFileInput').click()">${ICONS.copy} Importar cópia (.json)</button>
        <input type="file" id="backupFileInput" accept="application/json" style="display:none;" onchange="importBackup(this.files[0])">
      </div>
      <div class="hint" style="margin-top:10px;">Importar substitui por completo os filamentos, histórico e definições no espaço atual.</div>
    </div>
  `;
}
let cfgSaveTimer=null;
function saveConfigDebounced(){
  if (window.AutoSave) window.AutoSave.schedule();
  clearTimeout(cfgSaveTimer);
  cfgSaveTimer = setTimeout(async ()=>{ await saveConfig(); toast('Definições guardadas'); }, 500);
}

function exportBackup(){
  const backup = {
    _app:'realize3d-backup', _version:1, exportedAt:new Date().toISOString(),
    config: state.config, filamentos: state.filamentos, pedidos: state.pedidos
  };
  const blob = new Blob([JSON.stringify(backup,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'realize3d_backup_'+todayISO()+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Cópia de segurança exportada');
}
function importBackup(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = async (e)=>{
    try{
      const data = JSON.parse(e.target.result);
      if(!data || typeof data!=='object' || !('filamentos' in data) || !('pedidos' in data)){
        toast('Ficheiro inválido'); return;
      }
      state.config = data.config || {...DEFAULT_CONFIG};
      state.filamentos = data.filamentos || [];
      state.pedidos = data.pedidos || [];
      if (window.AutoSave) window.AutoSave.schedule();
      await saveConfig(); await saveFilamentos(); await savePedidos();
      toast('Dados importados com sucesso');
      render();
    }catch(err){
      console.error(err);
      toast('Não foi possível ler o ficheiro');
    }
  };
  reader.readAsText(file);
}

/* ---------------------------------------------------------------
   MODALS
--------------------------------------------------------------- */
function closeModal(){ state.modal=null; render(); }

function renderModal(){
  const m = state.modal;
  if(!m) return '';
  if(m.type==='lotes'){
    const filamento = state.filamentos.find(f=>f.id===m.filamentoId);
    if(!filamento) return '';
    migrateFilamentosToLotes();
    const lotes = filamento.lotes || [];
    const lotesHtml = lotes.length ? lotes.map(l=>{
      const lf = m.lotesForm?.[l.id] || {nome:l.nome||'',data:l.data||'',fornecedor:l.fornecedor||'',precoKg:l.precoKg ?? '',ativo:!!l.ativo};
      const isActive = !!l.ativo && !l.arquivado;
      const estado = l.arquivado ? 'Arquivado' : (isActive ? 'Ativo' : 'Inativo');
      const badgeCls = l.arquivado ? 'badge-orc' : (l.ativo ? 'badge-vend' : 'badge-orc');
      return `
        <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:10px;background:var(--surface);">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;">
            <div style="min-width:180px;flex:1;">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <strong>${escapeHtml(l.nome || 'Lote sem nome')}</strong>
                <span class="badge ${badgeCls}">${estado}</span>
              </div>
              <div class="muted" style="font-size:11px;margin-top:4px;line-height:1.35;">
                ${l.precoKg!=null ? `${fmtEUR(l.precoKg)}/kg` : 'Preço n/d'} ·
                Fornecedor: ${escapeHtml(l.fornecedor || 'n/d')} ·
                Data: ${l.data ? fmtDate(l.data) : 'n/d'}
              </div>
            </div>
            <div class="row-actions">
              ${!isActive && !l.arquivado ? `<button class="btn btn-ghost btn-sm" onclick="setLoteAtivo('${filamento.id}','${l.id}')">Tornar ativo</button>` : ''}
              ${!l.arquivado ? `<button class="btn btn-danger btn-sm" onclick="archiveLoteFilamento('${filamento.id}','${l.id}')">Arquivar</button>` : ''}
            </div>
          </div>
          <div class="row2">
            <div class="field"><label>Nome</label><input type="text" value="${escapeHtml(lf.nome)}" oninput="state.modal.lotesForm['${l.id}'].nome=this.value"></div>
            <div class="field"><label>Data</label><input type="date" value="${escapeHtml(lf.data)}" oninput="state.modal.lotesForm['${l.id}'].data=this.value"></div>
          </div>
          <div class="row2">
            <div class="field"><label>Fornecedor</label><input type="text" value="${escapeHtml(lf.fornecedor)}" oninput="state.modal.lotesForm['${l.id}'].fornecedor=this.value"></div>
            <div class="field"><label>Preço €/kg</label><div class="unit-input"><input type="number" step="any" min="0" value="${escapeHtml(lf.precoKg)}" oninput="state.modal.lotesForm['${l.id}'].precoKg=this.value"><span>€/kg</span></div></div>
          </div>
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:0;">
            <input type="checkbox" ${lf.ativo?'checked':''} onchange="state.modal.lotesForm['${l.id}'].ativo=this.checked"> Ativo
          </label>
          <div class="modal-actions" style="margin-top:10px;">
            <button class="btn btn-ghost btn-sm" onclick="saveExistingLoteFilamento('${filamento.id}','${l.id}')">${ICONS.edit} Editar lote</button>
          </div>
        </div>
      `;
    }).join('') : `<div class="empty-state" style="padding:24px 10px;">${ICONS.box}<p>Sem lotes registados.</p></div>`;
    const f = m.form;
    return modalWrap('Lotes do filamento', `
      <div style="border:1px solid var(--border-soft);border-radius:8px;padding:12px;margin-bottom:14px;background:var(--surface-2);">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <b>${escapeHtml(filamento.marca)}</b>
          <span class="badge ${getLoteUiState(filamento).cls}">${getLoteUiState(filamento).label}</span>
        </div>
        <div class="muted" style="font-size:12px;margin-top:5px;">
          ${escapeHtml(filamento.tipo || filamento.material || 'Tipo n/d')} · ${escapeHtml(filamento.cor)}
        </div>
      </div>
      ${lotesHtml}
      <div style="border-top:1px solid var(--border-soft);padding-top:14px;margin-top:14px;">
        <h3 style="font-size:14px;margin-bottom:12px;">+ Novo lote</h3>
        <div class="row2">
          <div class="field"><label>Nome</label><input type="text" value="${escapeHtml(f.nome)}" oninput="state.modal.form.nome=this.value" placeholder="ex: Lote 2"></div>
          <div class="field"><label>Data</label><input type="date" value="${escapeHtml(f.data)}" oninput="state.modal.form.data=this.value"></div>
        </div>
        <div class="row2">
          <div class="field"><label>Fornecedor</label><input type="text" value="${escapeHtml(f.fornecedor)}" oninput="state.modal.form.fornecedor=this.value" placeholder="ex: Loja / fornecedor"></div>
          <div class="field"><label>Preço €/kg</label><div class="unit-input"><input type="number" step="any" min="0" value="${escapeHtml(f.precoKg)}" oninput="state.modal.form.precoKg=this.value"><span>€/kg</span></div></div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;margin-bottom:0;">
          <input type="checkbox" ${f.ativo?'checked':''} onchange="state.modal.form.ativo=this.checked"> Ativo
        </label>
      </div>
    `, [
      {label:'Fechar', cls:'btn-ghost', action:'closeModal()'},
      {label:'+ Novo lote', cls:'btn-accent', action:'saveLoteFilamento()'}
    ]);
  }
  if(m.type==='fil'){
    const f = m.form;
    const loteInicialHtml = m.id ? '' : `
      <div style="border-top:1px solid var(--border-soft);padding-top:14px;margin-top:14px;">
        <h3 style="font-size:14px;margin-bottom:12px;">Lote inicial</h3>
        <div class="row2">
          <div class="field"><label>Nome do lote</label><input type="text" value="${escapeHtml(f.loteNome)}" oninput="state.modal.form.loteNome=this.value" placeholder="ex: Lote inicial"></div>
          <div class="field"><label>Data</label><input type="date" value="${escapeHtml(f.loteData)}" oninput="state.modal.form.loteData=this.value"></div>
        </div>
        <div class="row2">
          <div class="field"><label>Fornecedor</label><input type="text" value="${escapeHtml(f.loteFornecedor)}" oninput="state.modal.form.loteFornecedor=this.value" placeholder="ex: Loja / fornecedor"></div>
          <div class="field"><label>Preço €/kg</label><div class="unit-input"><input type="number" step="any" min="0" value="${escapeHtml(f.lotePrecoKg)}" oninput="state.modal.form.lotePrecoKg=this.value" placeholder="0"><span>€/kg</span></div></div>
        </div>
      </div>`;
    return modalWrap(`${m.id?'Editar':'Novo'} filamento`, `
      <div class="row3">
        <div class="field"><label>Marca</label><input type="text" value="${escapeHtml(f.marca)}" oninput="state.modal.form.marca=this.value" placeholder="ex: Elegoo"></div>
        <div class="field"><label>Tipo de filamento</label><input type="text" value="${escapeHtml(f.tipo)}" oninput="state.modal.form.tipo=this.value" placeholder="ex: PLA Matte"></div>
        <div class="field"><label>Cor</label><input type="text" value="${escapeHtml(f.cor)}" oninput="state.modal.form.cor=this.value" placeholder="ex: Branco"></div>
      </div>
      <div class="field"><label>Tamanho da bobina</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.spool}" oninput="state.modal.form.spool=this.value"><span>kg</span></div></div>
      <div class="row3">
        <div class="field"><label>Densidade</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.density}" oninput="state.modal.form.density=this.value"><span>g/cm³</span></div></div>
        <div class="field"><label>Nozzle</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.nozzle}" oninput="state.modal.form.nozzle=this.value"><span>°C</span></div></div>
        <div class="field"><label>Bed</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.bed}" oninput="state.modal.form.bed=this.value"><span>°C</span></div></div>
      </div>
      ${loteInicialHtml}
    `, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Guardar', cls:'btn-accent', action:'saveFilModal()'}
    ]);
  }
  if(m.type==='deleteFil'){
    return modalWrap('Eliminar filamento', `<p style="color:var(--text-dim);font-size:13.5px;">Tens a certeza que queres eliminar <b>${escapeHtml(m.nome)}</b>? Esta ação não afeta registos já guardados no histórico.</p>`, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Eliminar', cls:'btn-danger', action:`doDeleteFil('${m.id}')`}
    ]);
  }
  if(m.type==='deletePedido'){
    return modalWrap('Mover para o lixo', `<p style="color:var(--text-dim);font-size:13.5px;">Tens a certeza que queres mover o registo de <b>${escapeHtml(m.nome)}</b> para o lixo?</p>`, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Mover para o lixo', cls:'btn-danger', action:`doDeletePedido('${m.id}')`}
    ]);
  }
  if(m.type==='permanentDeletePedido'){
    return modalWrap('Eliminar definitivamente', `<p style="color:var(--text-dim);font-size:13.5px;">Tens a certeza que queres eliminar definitivamente <b>${escapeHtml(m.nome)}</b>? Esta ação não pode ser anulada.</p>`, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Eliminar definitivamente', cls:'btn-danger', action:`permanentlyDeletePedido('${m.id}')`}
    ]);
  }
  if(m.type==='duplicatePedido'){
    return modalWrap('Duplicar projeto', `
      <div class="field">
        <label>Nome do novo projeto</label>
        <input type="text" value="${escapeHtml(m.nome)}" oninput="state.modal.nome=this.value" autofocus>
        <div class="hint">Cria uma cópia com os mesmos filamentos, gramas, tempo e margens — fica como novo orçamento por vender. Útil para o mesmo modelo feito para pessoas diferentes.</div>
      </div>
    `, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Duplicar', cls:'btn-accent', action:'doDuplicatePedido()'}
    ]);
  }
  if(m.type==='switchWorkspace'){
    return modalWrap('Mudar de espaço', `<p style="color:var(--text-dim);font-size:13.5px;line-height:1.5;">Isto desliga este dispositivo do espaço atual (<b>${escapeHtml(workspaceCode||'')}</b>). Os teus dados continuam guardados na cloud — não são apagados. Vais poder criar um novo espaço ou entrar noutro com um código.</p>`, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Mudar de espaço', cls:'btn-danger', action:'doSwitchWorkspace()'}
    ]);
  }
  if(m.type==='venda'){
    return modalWrap('Marcar como vendido', `
      <div class="field">
        <label>Valor recebido</label>
        <div class="unit-input"><input type="number" step="any" min="0" value="${m.valor}" oninput="state.modal.valor=this.value" autofocus><span>€</span></div>
        <div class="hint">Preço de venda sugerido já preenchido — ajusta se vendeste por outro valor.</div>
      </div>
    `, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Confirmar venda', cls:'btn-accent', action:'confirmVenda()'}
    ]);
  }
  if(m.type==='editPedido'){
    const f = m.form;
    const pedido = state.pedidos.find(p=>p.id===m.id);
    return modalWrap('Editar registo', `
      <div class="field"><label>Projeto</label><input type="text" value="${escapeHtml(f.projeto)}" oninput="state.modal.form.projeto=this.value"></div>
      <div class="field">
        <label>Filamentos</label>
        ${f.materiais.map(m=>materialRowHtml(m,'modal',f.materiais.length>1)).join('')}
        <button type="button" class="btn btn-ghost btn-sm" onclick="modalAddMaterial()">${ICONS.plus} Adicionar filamento</button>
      </div>
      ${pedidoLoteDetailHtml(pedido)}
      <div class="field"><label>Tempo (total)</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.horas}" oninput="state.modal.form.horas=this.value"><span>h</span></div></div>
      <div class="row2">
        <div class="field"><label>Add-ons</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.addons}" oninput="state.modal.form.addons=this.value"><span>€</span></div></div>
        <div class="field"><label>Data</label><input type="date" value="${f.data}" oninput="state.modal.form.data=this.value"></div>
      </div>
      <div class="row2">
        <div class="field"><label>Estado</label>
          <select onchange="state.modal.form.status=this.value">
            <option value="orcamento" ${f.status==='orcamento'?'selected':''}>Orçamento</option>
            <option value="vendido" ${f.status==='vendido'?'selected':''}>Vendido</option>
          </select>
        </div>
        <div class="field"><label>Recebido</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.recebido===null?'':f.recebido}" oninput="state.modal.form.recebido=this.value" ${f.status==='orcamento'?'disabled':''}><span>€</span></div></div>
      </div>
    `, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Guardar', cls:'btn-accent', action:'saveEditPedido()'}
    ]);
  }
  return '';
}
function modalWrap(title, body, actions){
  return `<div class="modal-bg" onclick="if(event.target===this) closeModal()">
    <div class="modal">
      <h3>${escapeHtml(title)}</h3>
      ${body}
      <div class="modal-actions">
        ${actions.map(a=>`<button class="btn ${a.cls}" onclick="${a.action}">${escapeHtml(a.label)}</button>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------
   WORKSPACE SETUP (cloud sync via Supabase)
--------------------------------------------------------------- */
let setupUi = {mode:'choose', joinInput:'', error:'', loading:false, createdCode:null};

function renderSetupBody(){
  const el = document.getElementById('setupBody');
  if(!el) return;
  const u = setupUi;

  if(u.mode==='created'){
    el.innerHTML = `
      <h2>Espaço criado!</h2>
      <p class="sub">Guarda este código — precisas dele para acederes aos teus dados noutro computador ou telemóvel.</p>
      <div class="setup-code-display">${escapeHtml(u.createdCode)}</div>
      <button class="btn btn-accent" style="width:100%;justify-content:center;" onclick="confirmEnterAfterCreate()">Já guardei — continuar</button>
    `;
    return;
  }
  if(u.mode==='join'){
    el.innerHTML = `
      <h2>Entrar com código</h2>
      <p class="sub">Introduz o código do espaço que criaste noutro dispositivo.</p>
      <div class="field">
        <input type="text" placeholder="ex: AB3D-9F2K" value="${escapeHtml(u.joinInput)}" style="text-align:center;text-transform:uppercase;font-family:var(--font-mono);letter-spacing:2px;" oninput="setupUi.joinInput=this.value" ${u.loading?'disabled':''}>
      </div>
      <button class="btn btn-accent" style="width:100%;justify-content:center;" onclick="setupJoinWorkspace()" ${u.loading?'disabled':''}>${u.loading?'A ligar…':'Entrar'}</button>
      ${u.error?`<div class="setup-error">${escapeHtml(u.error)}</div>`:''}
      <div class="setup-back" onclick="setupUi={mode:'choose',joinInput:'',error:'',loading:false,createdCode:null};renderSetupBody();">&larr; voltar</div>
    `;
    return;
  }
  el.innerHTML = `
    <h2>Vamos configurar o teu espaço</h2>
    <p class="sub">Os teus dados (filamentos, histórico, definições) ficam guardados na cloud e sincronizados entre todos os teus dispositivos.</p>
    <div class="setup-option">
      <h3>Primeira vez a usar a app</h3>
      <p>Cria um novo espaço — vais receber um código único.</p>
      <button class="btn btn-accent" style="width:100%;justify-content:center;" onclick="setupCreateWorkspace()" ${u.loading?'disabled':''}>${u.loading?'A criar…':'Criar novo espaço'}</button>
    </div>
    <div class="setup-option">
      <h3>Já tenho um espaço</h3>
      <p>Introduz o código que criaste noutro dispositivo.</p>
      <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="setupUi.mode='join';renderSetupBody();">Já tenho um código</button>
    </div>
    ${u.error?`<div class="setup-error">${escapeHtml(u.error)}</div>`:''}
  `;
}

function genWorkspaceCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const grp = n => { let s=''; for(let i=0;i<n;i++) s+=chars[Math.floor(Math.random()*chars.length)]; return s; };
  return grp(4)+'-'+grp(4);
}

async function setupCreateWorkspace(){
  if(!sb){ setupUi.error='Supabase não está configurado neste ficheiro (faltam URL/chave). Vê as instruções que te dei.'; renderSetupBody(); return; }
  setupUi.loading = true; setupUi.error=''; renderSetupBody();
  const code = genWorkspaceCode();
  const payload = defaultPayload();
  try{
    const {error} = await sb.from(TABLE_NAME).insert({id:code, payload});
    if(error) throw error;
    lsSet('workspace', code);
    setLastWorkspace(code);
    lsSet('cache_payload', JSON.stringify(payload));
    workspaceCode = code;
    applyPayload(payload);
    setSyncStatus('ok');
    setupUi.loading=false; setupUi.mode='created'; setupUi.createdCode=code;
    renderSetupBody();
  }catch(e){
    console.error(e);
    setupUi.loading=false;
    setupUi.error = 'Não foi possível criar o espaço. Verifica a ligação à internet e a configuração do Supabase.';
    renderSetupBody();
  }
}

async function setupJoinWorkspace(){
  if(!sb){ setupUi.error='Supabase não está configurado neste ficheiro (faltam URL/chave). Vê as instruções que te dei.'; renderSetupBody(); return; }
  const code = (setupUi.joinInput||'').trim().toUpperCase();
  if(!code){ setupUi.error='Indica um código.'; renderSetupBody(); return; }
  setupUi.loading = true; setupUi.error=''; renderSetupBody();
  try{
    const {data, error} = await sb.from(TABLE_NAME).select('payload').eq('id', code).maybeSingle();
    if(error) throw error;
    if(!data){ setupUi.loading=false; setupUi.error='Código não encontrado.'; renderSetupBody(); return; }
    lsSet('workspace', code);
    setLastWorkspace(code);
    lsSet('cache_payload', JSON.stringify(data.payload||{}));
    workspaceCode = code;
    applyPayload(data.payload||{});
    setSyncStatus('ok');
    enterApp();
  }catch(e){
    console.error(e);
    setupUi.loading=false;
    setupUi.error = 'Não foi possível ligar. Verifica o código e a ligação à internet.';
    renderSetupBody();
  }
}

function confirmEnterAfterCreate(){ enterApp(); }

function enterApp(){
  migrateFilamentosToLotes();
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  render();
}
function showSetupScreen(){
  const logo = document.getElementById('brandLogoImg');
  if(logo) document.getElementById('setupLogoImg').src = logo.src;
  document.getElementById('setupScreen').style.display = 'flex';
  renderSetupBody();
}

function confirmSwitchWorkspace(){
  state.modal = {type:'switchWorkspace'};
  render();
}
function doSwitchWorkspace(){
  localStorage.removeItem(STORAGE_PREFIX+'workspace');
  clearLastWorkspace();
  location.reload();
}
function copyWorkspaceCode(){
  if(!workspaceCode) return;
  navigator.clipboard?.writeText(workspaceCode).then(()=>toast('Código copiado')).catch(()=>{});
}
function copyWorkspaceLink(){
  if(!workspaceCode) return;
  navigator.clipboard?.writeText(workspaceDirectLink()).then(()=>toast('Link copiado')).catch(()=>{});
}

/* ---------------------------------------------------------------
   MAIN RENDER
--------------------------------------------------------------- */
function render(){
  migrateFilamentosToLotes();
  renderSidebar();
  const page = document.getElementById('pageContent');
  if(state.view==='calc') page.innerHTML = renderCalc();
  else if(state.view==='hist') page.innerHTML = renderHist();
  else if(state.view==='fil') page.innerHTML = renderFil();
  else if(state.view==='cfg') page.innerHTML = renderCfg();

  if(state.view==='calc') updateCalcPreview();
  if(state.view==='hist') renderHistTable();

  let modalHost = document.getElementById('modalHost');
  if(!modalHost){
    modalHost = document.createElement('div');
    modalHost.id = 'modalHost';
    document.body.appendChild(modalHost);
  }
  modalHost.innerHTML = renderModal();
}

/* ---------------------------------------------------------------
   INIT
--------------------------------------------------------------- */
(async function init(){
  const appSrc = document.currentScript.src;
  const format = await import(new URL('core/format.js', appSrc).href);
  Object.assign(window, format);
  window.migrateFilamentosToLotes = migrateFilamentosToLotes;
  window.getLoteAtivo = getLoteAtivo;
  window.getPrecoKgFilamento = getPrecoKgFilamento;
  Object.assign(window, {
    migrateFilamentosToLotes,
    getLoteAtivo,
    getPrecoKgFilamento,
    openLotesModal,
    saveLoteFilamento,
    setLoteAtivo,
    addLoteFilamento,
    updateLoteFilamento,
    archiveLoteFilamento,
    movePedidoToTrash,
    restorePedidoFromTrash,
    permanentlyDeletePedido
  });
  const store = await import(new URL('core/store.js', appSrc).href);
  syncStoreState();
  const autosave = await import(new URL('services/autosave.js', appSrc).href);
  autosave.AutoSave.init({
    save: pushPayload,
    hasWorkspace: () => Boolean(workspaceCode),
  });

  const ready = await loadAll();
  migrateFilamentosToLotes();
  document.getElementById('loadingScreen').style.display = 'none';
  if(!ready){
    showSetupScreen();
    return;
  }
  enterApp();
})();
