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
  ['Jarras decorativas','Giantarm','Wood',172,5.0,0,22.0,'vendido'],
  ['Jarras decorativas','Elegoo','Branco',400,10.0,0,null,'orcamento'],
  ['Presépio personalizado','Elegoo','Branco',97,6.0,0,5.0,'vendido'],
  ['Presépio personalizado','Elegoo','Branco',97,6.0,0,5.0,'vendido'],
  ['Jarras pequenas','Esun','Branco frio',55,3.2,0,15.0,'vendido'],
  ['Jarras pequenas','Giantarm','Wood',195,7.4,0,null,'orcamento'],
  ['Jarras decorativas','Giantarm','Wood',55,3.2,0,15.0,'vendido'],
  ['Jarras decorativas','Esun','Branco frio',195,7.4,0,null,'orcamento'],
  ['Porta retratos','Elegoo','Madeira',5,2.0,0,6.0,'vendido'],
  ['Porta retratos','Elegoo','Rosa',55,4.26,0,null,'orcamento'],
  ['Jarra decorativa','Esun','Branco frio',20,6.1,0,3.5,'vendido'],
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
  ['Cake topper','Elegoo','Castanho',13,2.2,0,null,'orcamento'],
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
  calc: {projeto:'', materiais:[{id:'m0', filKey:'', gramas:''}], horas:'', addons:'', addOns:[{id:'a0', nome:'', valor:''}], taxaFalhas:null, margemLucro:null},
  hist: {search:'', status:'todos', sort:'data_desc'},
  fil: {search:'', material:'todos', status:'ativos', sort:'recentes'},
  shipping: {service:'normal', weight:'', cod:false, codAmount:'', receipt:false, electronic:false, own:false, vatRate:0.23},
  modal: null, // {type, data}
  sidebarOpen:false,
};
let shippingModule = null;

function uid(){ return Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4); }
function filKey(marca,cor){ return (marca||'')+'__'+(cor||''); }
function filamentSelectKey(filamento){ return filamento?.id ? `id:${filamento.id}` : filKey(filamento?.marca, filamento?.cor); }
function findFilamentByKey(key){
  if(!key) return null;
  if(String(key).startsWith('id:')) return state.filamentos.find(f=>f.id===String(key).slice(3)) || null;
  return state.filamentos.find(f=>filKey(f.marca,f.cor)===key && !f.arquivado) ||
    state.filamentos.find(f=>filKey(f.marca,f.cor)===key) || null;
}
function savedMaterialFilamentKey(material){
  const byId = material?.filamentoId ? state.filamentos.find(f=>f.id===material.filamentoId) : null;
  if(byId) return filamentSelectKey(byId);
  const match = state.filamentos.find(f=>f.marca===material?.marca && f.cor===material?.cor && !f.arquivado) ||
    state.filamentos.find(f=>f.marca===material?.marca && f.cor===material?.cor);
  return match ? filamentSelectKey(match) : filKey(material?.marca, material?.cor);
}

/* ---------------------------------------------------------------
   SUPABASE CONFIG
   Substitui estes dois valores pelos do teu projeto Supabase
   (Project Settings -> API) antes de publicares no Netlify.
--------------------------------------------------------------- */
const SUPABASE_URL = 'https://dkqzhgckekrfuyrgmaxd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xQml96WeT3jczwV_F0YTSQ_YjTqNPzB';

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
let workspaceUpdatedAt = null;

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
  syncStatus = status; // 'ok' | 'offline' | 'syncing' | 'conflict'
  const el = document.getElementById('syncBadge');
  if(el) el.outerHTML = syncBadgeHtml();
}
let syncStatus = 'syncing';
function syncBadgeHtml(){
  const map = {
    ok:{cls:'ok', label:'Sincronizado'},
    offline:{cls:'offline', label:'Sem ligação — cópia local'},
    syncing:{cls:'syncing', label:'A sincronizar…'},
    conflict:{cls:'offline', label:'Conflito — atualiza a página'}
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

function firstRpcRow(data){
  return Array.isArray(data) ? (data[0] || null) : (data || null);
}

async function getWorkspace(code){
  const {data, error} = await sb.rpc('get_workspace', {p_code: code});
  if(error) throw error;
  return firstRpcRow(data);
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
    const workspace = await getWorkspace(workspaceCode);
    if(!workspace){ throw new Error('workspace-not-found'); }
    workspaceUpdatedAt = workspace.updated_at;
    applyPayload(workspace.payload || {});
    lsSet('cache_payload', JSON.stringify(workspace.payload || {}));
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
      workspaceUpdatedAt = null;
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
  if(!workspaceCode || !sb || !workspaceUpdatedAt){ setSyncStatus('offline'); return false; }
  setSyncStatus('syncing');
  try{
    const {data, error} = await sb.rpc('save_workspace', {
      p_code: workspaceCode,
      p_payload: payload,
      p_expected_updated_at: workspaceUpdatedAt
    });
    if(error) throw error;
    const result = firstRpcRow(data);
    if(!result || result.status !== 'saved'){
      if(result?.status === 'conflict'){
        setSyncStatus('conflict');
        toast('Este espaço foi alterado noutro dispositivo. Atualiza a página antes de continuar.');
      }else{
        setSyncStatus('offline');
      }
      return false;
    }
    workspaceUpdatedAt = result.updated_at;
    setSyncStatus('ok');
    return true;
  }catch(e){
    console.error(e);
    setSyncStatus('offline');
    return false;
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

function getFilamentReferenceLote(filamento){
  if(!filamento || !Array.isArray(filamento.lotes)) return null;
  return getLoteAtivoCalculo(filamento) || filamento.lotes.find(l=>l && !l.arquivado) || filamento.lotes[0] || null;
}

function getFilamentPurchaseDate(filamento){
  return filamento?.dataCompra || getFilamentReferenceLote(filamento)?.data || '';
}

function getFilamentSupplier(filamento){
  return filamento?.fornecedor || getFilamentReferenceLote(filamento)?.fornecedor || '';
}

function getFilamentPurchasePrice(filamento){
  const spool = parseFloat(filamento?.spool)||1;
  const explicitPurchase = parseFloat(filamento?.precoCompra ?? filamento?.precoBobina);
  if(!isNaN(explicitPurchase) && explicitPurchase>0) return explicitPurchase;
  const legacyPrice = parseFloat(filamento?.preco ?? filamento?.price);
  if((filamento?.dataCompra || filamento?.fornecedor) && !isNaN(legacyPrice) && legacyPrice>0) return legacyPrice;
  const referencePrice = parseFloat(getFilamentReferenceLote(filamento)?.precoKg);
  if(!isNaN(referencePrice) && referencePrice>0) return referencePrice * spool;
  return !isNaN(legacyPrice) && legacyPrice>0 ? legacyPrice : 0;
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
    tipo:m.tipo || '',
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

function normalizeAddOns(addOns, legacyTotal=0){
  if(Array.isArray(addOns) && addOns.length>0){
    return addOns.map(addOn=>({
      id:addOn.id || uid(),
      nome:String(addOn.nome || ''),
      valor:addOn.valor ?? ''
    }));
  }
  const total = parseFloat(legacyTotal)||0;
  return [{id:uid(), nome:total>0 ? 'Outros' : '', valor:total>0 ? total : ''}];
}

function getStoredAddOns(addOns, legacyTotal=0){
  return normalizeAddOns(addOns, legacyTotal)
    .map(addOn=>({nome:String(addOn.nome || '').trim(), valor:parseFloat(addOn.valor)||0}))
    .filter(addOn=>addOn.valor>0);
}

function getAddOnsTotal(addOns, legacyTotal=0){
  if(!Array.isArray(addOns)) return parseFloat(legacyTotal)||0;
  return addOns.reduce((sum, addOn)=>sum+(parseFloat(addOn.valor)||0), 0);
}

function getPedidoAddOns(pedido){
  const snap = pedido?.costSnapshot;
  return getStoredAddOns(pedido?.addOns || snap?.addOns, snap?.addons ?? pedido?.addons);
}

function validateAddOns(addOns){
  for(const addOn of addOns || []){
    const raw = String(addOn.valor ?? '').trim();
    const valor = parseFloat(raw);
    if(raw && (isNaN(valor) || valor<0)) return 'Indica um valor válido para cada add-on';
    if(valor>0 && !String(addOn.nome || '').trim()) return 'Indica a descrição de cada add-on';
  }
  return '';
}

function buildCostSnapshot({materiais, horas, addons, addOns, taxaFalhas, margemLucro, breakdown}){
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
    addOns:getStoredAddOns(addOns, addons),
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
      tipo:m.tipo || '',
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
    tipo:(p.materiais||[])[0]?.tipo || '',
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
  if(!p?.costSnapshot) return `<div class="muted" style="font-size:11px;margin-top:4px;">Bobina: não registada</div>`;
  const mats = getPedidoSnapshotMateriais(p);
  if(mats.length===0) return `<div class="muted" style="font-size:11px;margin-top:4px;">Bobina: não registada</div>`;
  return `<div class="muted" style="font-size:11px;margin-top:4px;line-height:1.35;">${mats.map(m=>{
    const preco = m.lotePrecoKg!=null ? fmtEUR(m.lotePrecoKg) + '/kg' : 'preço n/d';
    const fil = [m.marca, m.tipo, m.cor].filter(Boolean).join(' · ');
    const detalhe = mats.length>1 && fil ? `${escapeHtml(fil)}: ` : 'Bobina: ';
    const grams = m.gramas!=null ? ` · ${fmtNum(m.gramas)}g` : '';
    const custo = m.custoFilamento!=null ? ` · ${fmtEUR(m.custoFilamento)}` : '';
    return `${detalhe}${preco}${grams}${custo}`;
  }).join('<br>')}</div>`;
}

function pedidoLoteDetailHtml(p){
  if(!p?.costSnapshot) return `<div class="hint">Bobina: não registada</div>`;
  const mats = getPedidoSnapshotMateriais(p);
  const costs = getPedidoCostValues(p);
  return `<div class="field">
    <label>Bobina usada</label>
    <div class="hint" style="line-height:1.45;">
      ${mats.map(m=>{
        const fil = [m.marca, m.tipo, m.cor].filter(Boolean).join(' · ');
        const fornecedor = m.loteFornecedor || 'n/d';
        const data = m.loteData ? fmtDate(m.loteData) : 'n/d';
        const preco = m.lotePrecoKg!=null ? fmtEUR(m.lotePrecoKg) + '/kg' : 'Preço n/d';
        const custo = m.custoFilamento!=null ? fmtEUR(m.custoFilamento) : fmtEUR(costs.custoFilamento);
        return `${fil ? escapeHtml(fil) + '<br>' : ''}Fornecedor: ${escapeHtml(fornecedor)} · Compra: ${data}<br>Preço usado: ${preco} · Custo do filamento: ${custo}`;
      }).join('<br><br>')}
    </div>
  </div>`;
}

function sameCostInputs(p, form){
  const sameNumber = (a,b)=> (parseFloat(a)||0) === (parseFloat(b)||0);
  const prev = (p.materiais||[]).map(m=>({
    filKey:savedMaterialFilamentKey(m),
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
  if(!sameNumber(p.costSnapshot?.addons ?? p.addons, getAddOnsTotal(form.addOns, form.addons))) return false;
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
  {id:'ship', label:'Envios', icon:'box'},
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
    <div class="stat"><span>bobinas em uso</span><b>${state.filamentos.filter(f=>!f.arquivado).length}</b></div>
  `;
}

/* ---------------------------------------------------------------
   RENDER: CALCULADORA
--------------------------------------------------------------- */
function filamentOptions(selectedKey){
  const sorted = [...state.filamentos]
    .filter(f=>!f.arquivado || filamentSelectKey(f)===selectedKey || filKey(f.marca,f.cor)===selectedKey)
    .sort((a,b)=> (a.marca+(a.tipo||a.material||'')+a.cor).localeCompare(b.marca+(b.tipo||b.material||'')+b.cor));
  return sorted.map(f=>{
    const k = filamentSelectKey(f);
    const pk = getPrecoKg(f);
    const tipo = f.tipo || f.material || 'Tipo n/d';
    const data = getFilamentPurchaseDate(f);
    const archived = f.arquivado ? ' · Arquivada' : '';
    return `<option value="${escapeHtml(k)}" ${k===selectedKey?'selected':''}>${escapeHtml(f.marca)} — ${escapeHtml(tipo)} — ${escapeHtml(f.cor)} · ${fmtEUR(pk)}/kg${data ? ` · ${fmtDate(data)}` : ''}${archived}</option>`;
  }).join('');
}

function renderCalc(){
  const c = state.calc;
  c.addOns = normalizeAddOns(c.addOns, c.addons);
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
          <h3>Tempo de impressão</h3>
          <div class="field">
            <label>Tempo de impressão (total)</label>
            <div class="unit-input"><input type="number" min="0" step="any" id="in_horas" placeholder="0" value="${c.horas}" oninput="state.calc.horas=this.value; updateCalcPreview();"><span>h</span></div>
          </div>
        </div>

        <div class="calc-section">
          <h3>Custos adicionais</h3>
          <div class="field">
            <label>Add-ons / extras (ímanes, parafusos, embalagem…)</label>
            <div id="addOnRows">
              ${c.addOns.map(addOn=>addOnRowHtml(addOn,'calc',c.addOns.length>1)).join('')}
            </div>
            <button type="button" class="btn btn-ghost btn-sm" onclick="calcAddAddOn()">${ICONS.plus} Adicionar add-on</button>
          </div>
          <div class="field">
            <label>Taxa de falhas</label>
            <div class="unit-input"><input type="number" min="0" step="any" id="in_taxa" placeholder="${fmtNum(taxaDefault)}" value="${c.taxaFalhas===null?'':c.taxaFalhas}" oninput="state.calc.taxaFalhas=this.value; updateCalcPreview();"><span>%</span></div>
            <div class="hint">Vazio = usa definição global (${fmtNum(taxaDefault)}%)</div>
          </div>
        </div>

        <div class="calc-section">
          <h3>Margem / preço final</h3>
          <div class="field">
            <label>Margem de lucro</label>
            <div class="unit-input"><input type="number" min="0" step="any" id="in_lucro" placeholder="${fmtNum(lucroDefault)}" value="${c.margemLucro===null?'':c.margemLucro}" oninput="state.calc.margemLucro=this.value; updateCalcPreview();"><span>%</span></div>
            <div class="hint">Vazio = usa definição global (${fmtNum(lucroDefault)}%)</div>
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
    const fil = findFilamentByKey(m.filKey);
    return {
      id:m.id, filKey:m.filKey,
      filamentoId: fil?fil.id:null,
      marca: fil?fil.marca:null, tipo:fil?(fil.tipo||fil.material||''):null, cor: fil?fil.cor:null,
      gramas: parseFloat(m.gramas)||0,
      precoKg: fil?getPrecoKg(fil):0,
      loteSnapshot: fil?getLoteSnapshot(fil):null
    };
  });
}

function materialRowHtml(m, ctx, canRemove){
  const updateFn = ctx==='calc' ? 'calcUpdateMaterial' : 'modalUpdateMaterial';
  const removeFn = ctx==='calc' ? 'calcRemoveMaterial' : 'modalRemoveMaterial';
  const fil = findFilamentByKey(m.filKey);
  const lote = fil ? getLoteAtivoCalculo(fil) : null;
  const preco = fil ? getPrecoKg(fil) : 0;
  return `<div class="material-row">
    <div class="material-row-main">
      <div style="flex:2;min-width:180px;">
        <select onchange="${updateFn}('${m.id}','filKey',this.value)">
          <option value="">— escolher filamento —</option>
          ${filamentOptions(m.filKey)}
        </select>
        ${fil ? `<div class="material-meta">Bobina${getFilamentPurchaseDate(fil) ? ` de ${fmtDate(getFilamentPurchaseDate(fil))}` : ''}${getFilamentSupplier(fil) ? ` · ${escapeHtml(getFilamentSupplier(fil))}` : ''} · ${fmtEUR(preco)}/kg</div>` : ''}
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

function addOnRowHtml(addOn, ctx, canRemove){
  const updateFn = ctx==='calc' ? 'calcUpdateAddOn' : 'modalUpdateAddOn';
  const removeFn = ctx==='calc' ? 'calcRemoveAddOn' : 'modalRemoveAddOn';
  return `<div class="addon-row">
    <div class="addon-row-main">
      <input class="addon-name" type="text" placeholder="Descrição (ex: íman)" value="${escapeHtml(addOn.nome)}" oninput="${updateFn}('${addOn.id}','nome',this.value)">
      <div class="unit-input addon-value"><input type="number" min="0" step="any" placeholder="0.00" value="${addOn.valor}" oninput="${updateFn}('${addOn.id}','valor',this.value)"><span>€</span></div>
      ${canRemove ? `<button type="button" class="icon-btn danger" title="Remover add-on" onclick="${removeFn}('${addOn.id}')">${ICONS.trash}</button>` : `<div class="addon-row-spacer"></div>`}
    </div>
  </div>`;
}

function calcAddAddOn(){ state.calc.addOns.push({id:uid(), nome:'', valor:''}); render(); }
function calcRemoveAddOn(id){
  state.calc.addOns = state.calc.addOns.filter(addOn=>addOn.id!==id);
  if(state.calc.addOns.length===0) state.calc.addOns.push({id:uid(), nome:'', valor:''});
  render();
}
function calcUpdateAddOn(id, field, value){
  const addOn = state.calc.addOns.find(item=>item.id===id);
  if(addOn) addOn[field] = value;
  updateCalcPreview();
}

function modalAddAddOn(){ state.modal.form.addOns.push({id:uid(), nome:'', valor:''}); render(); }
function modalRemoveAddOn(id){
  state.modal.form.addOns = state.modal.form.addOns.filter(addOn=>addOn.id!==id);
  if(state.modal.form.addOns.length===0) state.modal.form.addOns.push({id:uid(), nome:'', valor:''});
  render();
}
function modalUpdateAddOn(id, field, value){
  const addOn = state.modal.form.addOns.find(item=>item.id===id);
  if(addOn) addOn[field] = value;
}

function currentCalcInputs(){
  const c = state.calc;
  const materiais = resolveMateriais(c.materiais);
  const addOns = getStoredAddOns(c.addOns, c.addons);
  const addons = getAddOnsTotal(c.addOns, c.addons);
  const taxaFalhas = (c.taxaFalhas===null || c.taxaFalhas==='') ? state.config.taxaFalhas : (parseFloat(c.taxaFalhas)/100);
  const margemLucro = (c.margemLucro===null || c.margemLucro==='') ? state.config.margemLucro : (parseFloat(c.margemLucro)/100);
  return {materiais, horas:c.horas, addons, addOns, taxaFalhas, margemLucro};
}

function layerHtml(label, value, total, color){
  if(!value || value<=0) return '';
  const pct = total>0 ? Math.max((value/total)*100, 6) : 0;
  return `<div class="layer" style="height:${pct}%;background:${color};">
    <div class="lbl">${escapeHtml(label)}<br>${fmtEUR(value)}</div>
  </div>`;
}

function updateCalcPreview(){
  const {materiais,horas,addons,addOns,taxaFalhas,margemLucro} = currentCalcInputs();
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
      <div class="calc-summary-card"><span>Taxa de falhas</span><b>${fmtEUR(b.bufferFalhas)}</b></div>
      <div class="calc-summary-card"><span>Add-ons</span><b>${fmtEUR(b.addons)}</b></div>
      <div class="calc-summary-card"><span>Custo total</span><b>${fmtEUR(b.custoFinal)}</b></div>
      <div class="calc-summary-card highlight"><span>Preço sugerido</span><b>${fmtEUR(b.precoVenda)}</b></div>
      <div class="calc-summary-card"><span>Lucro estimado</span><b class="pos">${fmtEUR(b.lucroValor)}</b></div>
    </div>
    <div class="calc-final-card">
      <span>Resumo final</span>
      <strong>${fmtEUR(b.precoVenda)}</strong>
      <small>Custo total ${fmtEUR(b.custoFinal)} · lucro ${fmtEUR(b.lucroValor)} · margem ${fmtPct(margemLucro)}</small>
    </div>
    <div class="calc-material-list">
      ${validMateriais.map(m=>{
        const lote = m.loteSnapshot;
        const custo = (m.gramas*m.precoKg)/1000;
        return `<div class="calc-material-card">
          <div class="calc-material-main">
            <strong>${[m.marca,m.tipo,m.cor].filter(Boolean).map(escapeHtml).join(' · ')}</strong>
            <span>${lote?.loteFornecedor ? escapeHtml(lote.loteFornecedor) : 'Fornecedor n/d'}${lote?.loteData ? ` · ${fmtDate(lote.loteData)}` : ''}</span>
          </div>
          <div class="calc-material-values">
            <span>${fmtEUR(m.precoKg)}/kg</span>
            <span>${fmtNum(m.gramas)} g</span>
            <b>${fmtEUR(custo)}</b>
          </div>
        </div>`;
      }).join('')}
    </div>
    ${addOns.length>0 ? `<div class="addon-preview-list">
      <div class="addon-preview-title">Add-ons</div>
      ${addOns.map(addOn=>`<div class="addon-preview-row"><span>${escapeHtml(addOn.nome || 'Add-on sem descrição')}</span><b>${fmtEUR(addOn.valor)}</b></div>`).join('')}
      <div class="addon-preview-row total"><span>Total</span><b>${fmtEUR(b.addons)}</b></div>
    </div>` : ''}
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
  const addOnError = validateAddOns(c.addOns);
  if(addOnError){ toast(addOnError); return; }
  const {materiais,horas,addons,addOns,taxaFalhas,margemLucro} = currentCalcInputs();
  const validMateriais = materiais.filter(m=>m.marca && m.gramas>0);
  if(validMateriais.length===0){ toast('Escolhe pelo menos um filamento e indica as gramas'); return; }
  if(!c.projeto || !c.projeto.trim()){ toast('Dá um nome ao projeto'); return; }
  const b = calcBreakdown({materiais:validMateriais,horas,addons,taxaFalhas,margemLucro});
  const pedidoMateriais = validMateriais.map(buildPedidoMaterialSnapshot);
  const pedido = {
    id:uid(), projeto:c.projeto.trim(),
    materiais: pedidoMateriais,
    horas:parseFloat(horas)||0, addons:parseFloat(addons)||0, addOns,
    taxaFalhas, margemLucro,
    custoFilamento:b.custoFilamento, custoEletricidade:b.custoEletricidade, custoFinal:b.custoFinal,
    bufferFalhas:b.bufferFalhas, lucroValor:b.lucroValor,
    precoVenda:b.precoVenda, recebido:null, status:'orcamento', data:todayISO(), notas:''
  };
  pedido.costSnapshot = buildCostSnapshot({materiais:pedidoMateriais, horas, addons, addOns, taxaFalhas, margemLucro, breakdown:b});
  state.pedidos.unshift(pedido);
  if (window.AutoSave) window.AutoSave.schedule();
  await savePedidos();
  toast('Guardado no histórico');
  clearCalc();
}
function clearCalc(){
  state.calc = {projeto:'', materiais:[{id:uid(), filKey:'', gramas:''}], horas:'', addons:'', addOns:[{id:uid(), nome:'', valor:''}], taxaFalhas:null, margemLucro:null};
  render();
}

/* ---------------------------------------------------------------
   RENDER: ENVIOS
--------------------------------------------------------------- */
function renderShipping(){
  const s = state.shipping;
  const services = shippingModule?.CTT_TARIFF?.services || {};
  const registered = s.service==='registado';
  return `
    <div class="page-head">
      <div>
        <h1>Simulador de envios</h1>
        <p>Estimativa para pacotes postais nacionais com base no preçário CTT 2026.</p>
      </div>
    </div>
    <div class="shipping-grid">
      <div class="card">
        <h2><span class="dot"></span>Dados do envio</h2>
        <div class="field">
          <label>Peso total com embalagem</label>
          <div class="unit-input"><input type="number" min="1" max="2000" step="1" value="${escapeHtml(s.weight)}" placeholder="ex: 350" oninput="state.shipping.weight=this.value;renderShippingQuote()"><span>g</span></div>
        </div>
        <div class="field">
          <label>Tipo de envio</label>
          <select onchange="setShippingService(this.value)">
            ${Object.entries(services).map(([key,service])=>`<option value="${key}" ${s.service===key?'selected':''}>${escapeHtml(service.label)} — ${escapeHtml(service.detail)}</option>`).join('')}
          </select>
        </div>
        ${registered ? `
          <div class="form-section-title">Serviços adicionais</div>
          <div class="shipping-options">
            <label class="check-row"><input type="checkbox" ${s.cod?'checked':''} onchange="setShippingOption('cod',this.checked)"><span><b>À cobrança</b><small>Contra reembolso, até 2 500 €</small></span></label>
            ${s.cod ? `<div class="field shipping-subfield"><label>Valor a cobrar</label><div class="unit-input"><input type="number" min="0.01" max="2500" step="0.01" value="${escapeHtml(s.codAmount)}" oninput="state.shipping.codAmount=this.value;renderShippingQuote()"><span>€</span></div></div>` : ''}
            <label class="check-row"><input type="checkbox" ${s.receipt?'checked':''} ${s.own?'disabled':''} onchange="setShippingOption('receipt',this.checked)"><span><b>Aviso de receção</b><small>Comprovativo assinado em papel</small></span></label>
            <label class="check-row"><input type="checkbox" ${s.electronic?'checked':''} onchange="setShippingOption('electronic',this.checked)"><span><b>Aviso eletrónico</b><small>Alerta de entrega por SMS ou email</small></span></label>
            <label class="check-row"><input type="checkbox" ${s.own?'checked':''} onchange="setShippingOption('own',this.checked)"><span><b>Entrega ao próprio</b><small>Inclui obrigatoriamente aviso de receção</small></span></label>
          </div>
          ${(s.cod||s.electronic) ? `<div class="field vat-field"><label>Taxa de IVA dos serviços adicionais</label><select onchange="state.shipping.vatRate=parseFloat(this.value);renderShippingQuote()"><option value="0.23" ${Number(s.vatRate)===0.23?'selected':''}>Continente — 23%</option><option value="0.22" ${Number(s.vatRate)===0.22?'selected':''}>Madeira — 22%</option><option value="0.16" ${Number(s.vatRate)===0.16?'selected':''}>Açores — 16%</option></select></div>` : ''}
        ` : `<div class="shipping-note">Os serviços à cobrança e os comprovativos de entrega estão disponíveis no Correio Registado.</div>`}
      </div>
      <div class="card shipping-result-card">
        <h2><span class="dot" style="background:var(--teal);"></span>Estimativa</h2>
        <div id="shippingQuote"></div>
      </div>
    </div>
  `;
}

function setShippingService(service){
  state.shipping.service = service;
  if(service!=='registado'){
    state.shipping.cod = false;
    state.shipping.receipt = false;
    state.shipping.electronic = false;
    state.shipping.own = false;
  }
  render();
}

function setShippingOption(option, enabled){
  state.shipping[option] = enabled;
  if(option==='own' && enabled) state.shipping.receipt = true;
  render();
}

function renderShippingQuote(){
  const host = document.getElementById('shippingQuote');
  if(!host || !shippingModule) return;
  if(!state.shipping.weight){
    host.innerHTML = `<div class="shipping-empty">${ICONS.box}<p>Indica o peso para calcular o envio.</p></div>`;
    return;
  }
  const quote = shippingModule.calculateShippingQuote(state.shipping);
  if(quote.error){
    host.innerHTML = `<div class="shipping-error">${escapeHtml(quote.error)}</div>`;
    return;
  }
  host.innerHTML = `
    <div class="shipping-service"><span>${escapeHtml(quote.service)}</span><small>${fmtNum(quote.weight)} g · escalão até ${fmtNum(quote.maxWeight)} g</small></div>
    <div class="shipping-breakdown">
      ${quote.lines.map(line=>`<div><span>${escapeHtml(line.label)}${line.taxable?' (IVA incl.)':''}</span><b>${fmtEUR(line.value)}</b></div>`).join('')}
    </div>
    <div class="shipping-total"><span>Total estimado</span><strong>${fmtEUR(quote.total)}</strong></div>
    ${quote.vat>0 ? `<div class="shipping-vat">Inclui ${fmtEUR(quote.vat)} de IVA nos serviços adicionais sujeitos.</div>` : ''}
    <div class="shipping-source">Preçário base CTT ${quote.tariffYear}. Confirma dimensões e condições no <a href="${shippingModule.CTT_TARIFF.source}" target="_blank" rel="noopener">preçário oficial</a>.</div>
  `;
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
  if(!p?.costSnapshot) return 'Bobina não registada';
  const mats = getPedidoSnapshotMateriais(p).filter(m=>m.loteNome);
  if(mats.length>1){
    const nomes = [...new Set(mats.map(m=>m.loteNome).filter(Boolean))];
    return nomes.length===1 ? 'Bobina' : 'várias bobinas';
  }
  return mats[0]?.loteNome ? 'Bobina' : 'Bobina não registada';
}

function escapeAttr(s){
  return escapeHtml(s);
}

function getPedidoMateriaisTooltip(p){
  const snapMats = getPedidoSnapshotMateriais(p);
  if(p?.costSnapshot && snapMats.length>0){
    return snapMats.map(m=>{
      const fil = [m.marca, m.tipo, m.cor].filter(Boolean).join(' ') || 'Material';
      const bobina = m.loteId ? 'Bobina registada' : 'Bobina não registada';
      const preco = m.lotePrecoKg!=null ? `${fmtEUR(m.lotePrecoKg)}/kg` : 'preço n/d';
      const gramas = m.gramas!=null ? `${fmtNum(m.gramas)} g` : 'gramas n/d';
      return `${fil} — ${gramas} — ${bobina} — ${preco}`;
    }).join('\n');
  }
  const mats = p?.materiais || [];
  if(mats.length===0) return 'Detalhe não registado';
  return mats.map(m=>{
    const fil = [m.marca, m.tipo, m.cor].filter(Boolean).join(' ') || 'Material';
    const gramas = m.gramas!=null ? `${fmtNum(m.gramas)} g` : 'gramas n/d';
    const preco = m.precoKg!=null ? `${fmtEUR(m.precoKg)}/kg` : 'preço n/d';
    return `${fil} — ${gramas} — Bobina não registada — ${preco}`;
  }).join('\n');
}

function getPedidoCustosTooltip(p){
  const snap = p?.costSnapshot;
  const costs = getPedidoCostValues(p);
  const custoFilamento = snap?.custoFilamento ?? p?.custoFilamento;
  const eletricidade = snap?.custoEletricidade ?? p?.custoEletricidade;
  const falhas = snap?.bufferFalhas ?? p?.bufferFalhas;
  const addons = snap?.addons ?? p?.addons;
  const addOnDetails = getPedidoAddOns(p);
  return [
    `Filamento: ${custoFilamento!=null ? fmtEUR(custoFilamento) : 'n/d'}`,
    `Eletricidade: ${eletricidade!=null ? fmtEUR(eletricidade) : 'n/d'}`,
    `Falhas: ${falhas!=null ? fmtEUR(falhas) : 'n/d'}`,
    `Addons: ${addons!=null ? fmtEUR(addons) : 'n/d'}`,
    ...addOnDetails.map(addOn=>`  ${addOn.nome}: ${fmtEUR(addOn.valor)}`),
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
  if(s) list = list.filter(p => (p.projeto||'').toLowerCase().includes(s) || getPedidoCliente(p).toLowerCase().includes(s) || (p.materiais||[]).some(m=>(m.marca||'').toLowerCase().includes(s) || (m.tipo||'').toLowerCase().includes(s) || (m.cor||'').toLowerCase().includes(s)));
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
      <div class="stat-card stat-card-main"><div class="k">Total vendido</div><div class="v">${fmtEUR(totalVendido)}</div></div>
      <div class="stat-card stat-card-main"><div class="k">Total recebido</div><div class="v">${fmtEUR(totalRecebido)}</div></div>
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
  const headers = ['Projeto','Materiais','GramasTotal','Horas','Addons','AddonsDetalhe','CustoFilamento','CustoEletricidade','CustoFinal','PrecoVendaSugerido','Recebido','Lucro','Estado','Data'];
  const rows = state.pedidos.filter(p=>p.deleted !== true).map(p=>{
    const costs = getPedidoCostValues(p);
    return [
      p.projeto,
      (p.materiais||[]).map(m=>`${m.marca} ${m.tipo||''} ${m.cor} (${m.gramas}g)`.replace(/\s+/g,' ').trim()).join(' + '),
      (p.materiais||[]).reduce((s,m)=>s+(m.gramas||0),0),
      p.horas,p.costSnapshot?.addons ?? p.addons ?? 0,getPedidoAddOns(p).map(addOn=>`${addOn.nome}: ${addOn.valor.toFixed(2)} EUR`).join(' + '),
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
    materiais: (p.materiais||[]).map(m=>({id:uid(), filKey:savedMaterialFilamentKey(m), gramas:m.gramas})),
    horas:p.horas, addons:p.costSnapshot?.addons ?? p.addons, addOns:normalizeAddOns(p.addOns || p.costSnapshot?.addOns, p.costSnapshot?.addons ?? p.addons),
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
    filKey:savedMaterialFilamentKey(mat),
    gramas:mat.gramas
  }))).filter(mat=>mat.marca && mat.gramas>0);
  const materiaisSnapshot = materiaisAtuais.length === (p.materiais||[]).length
    ? materiaisAtuais.map(buildPedidoMaterialSnapshot)
    : (p.materiais||[]).map(mat=>({...mat}));
  const addOns = getPedidoAddOns(p);
  const addons = getAddOnsTotal(addOns, p.addons);
  const b = calcBreakdown({
    materiais:materiaisSnapshot,
    horas:p.horas,
    addons,
    taxaFalhas:p.taxaFalhas,
    margemLucro:p.margemLucro
  });
  const novo = {
    ...p, id:uid(),
    projeto: m.nome.trim(),
    materiais: materiaisSnapshot,
    addons, addOns:addOns.map(addOn=>({...addOn})),
    recebido: null, status:'orcamento', data: todayISO(),
    costSnapshot:null
  };
  delete novo.costSnapshot;
  applyPedidoBreakdown(novo, b);
  novo.costSnapshot = buildCostSnapshot({
    materiais:materiaisSnapshot,
    horas:novo.horas,
    addons:novo.addons,
    addOns:novo.addOns,
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
  const addOnError = validateAddOns(f.addOns);
  if(addOnError){ toast(addOnError); return; }
  const addOns = getStoredAddOns(f.addOns, f.addons);
  const addons = getAddOnsTotal(f.addOns, f.addons);
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
  p.addOns = addOns;
  p.addons = addons;
  if(shouldRecalculate){
    p.materiais = resolved.map(buildPedidoMaterialSnapshot);
    p.horas = parseFloat(f.horas)||0;
    const b = calcBreakdown({materiais:p.materiais,horas:p.horas,addons:p.addons,taxaFalhas:p.taxaFalhas,margemLucro:p.margemLucro});
    applyPedidoBreakdown(p, b);
    p.costSnapshot = buildCostSnapshot({
      materiais:p.materiais,
      horas:p.horas,
      addons:p.addons,
      addOns:p.addOns,
      taxaFalhas:p.taxaFalhas,
      margemLucro:p.margemLucro,
      breakdown:b
    });
  }else if(p.costSnapshot){
    p.costSnapshot.addOns = addOns.map(addOn=>({...addOn}));
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
  if(Array.isArray(filamento?.lotes) && filamento.lotes.length>0 && filamento.lotes.every(l=>l?.arquivado)) return {lote:null, label:'Arquivado', cls:'badge-orc'};
  if(Array.isArray(filamento?.lotes) && filamento.lotes.length>0) return {lote:null, label:'Sem lote', cls:'badge-orc'};
  return {lote:null, label:'Sem lote', cls:'badge-orc'};
}

function normalizeLotesFilamento(filamento, persist=false){
  if(!filamento || !Array.isArray(filamento.lotes)) return false;
  let changed = false;
  filamento.lotes.forEach(l=>{
    if(l?.arquivado && l.ativo){
      l.ativo = false;
      changed = true;
    }
  });
  const active = filamento.lotes.filter(l=>l && l.ativo && !l.arquivado);
  if(active.length>1){
    active.slice(1).forEach(l=>{ l.ativo = false; changed = true; });
  }
  if(changed && persist) touchFilamentos();
  return changed;
}

function renderFil(){
  const materials = [...new Set(state.filamentos.map(f=>(f.tipo||f.material||'').trim()).filter(Boolean))]
    .sort((a,b)=>a.localeCompare(b,'pt-PT'));
  const activeCount = state.filamentos.filter(f=>!f.arquivado).length;
  const archivedCount = state.filamentos.filter(f=>f.arquivado).length;
  return `
    <div class="page-head">
      <div>
        <h1>Bobinas de filamento</h1>
        <p>Uma linha por bobina física, com identificação e preço de compra.</p>
      </div>
      <button class="btn btn-accent" onclick="openFilModal()">${ICONS.plus} Nova bobina</button>
    </div>
    <div class="fil-toolbar">
      <div class="segmented" aria-label="Estado das bobinas">
        <button class="${state.fil.status==='ativos'?'active':''}" onclick="setFilStatus('ativos')">Em uso <span>${activeCount}</span></button>
        <button class="${state.fil.status==='arquivo'?'active':''}" onclick="setFilStatus('arquivo')">Arquivo <span>${archivedCount}</span></button>
      </div>
      <input type="text" placeholder="Pesquisar marca, material, cor…" value="${escapeHtml(state.fil.search)}" oninput="state.fil.search=this.value;renderFilTable()">
      <select onchange="state.fil.material=this.value;renderFilTable()">
        <option value="todos">Todos os materiais</option>
        ${materials.map(material=>`<option value="${escapeHtml(material)}" ${state.fil.material===material?'selected':''}>${escapeHtml(material)}</option>`).join('')}
      </select>
      <select onchange="state.fil.sort=this.value;renderFilTable()">
        <option value="recentes" ${state.fil.sort==='recentes'?'selected':''}>Compra mais recente</option>
        <option value="marca" ${state.fil.sort==='marca'?'selected':''}>Marca A-Z</option>
        <option value="cor" ${state.fil.sort==='cor'?'selected':''}>Cor A-Z</option>
        <option value="preco" ${state.fil.sort==='preco'?'selected':''}>Maior preço/kg</option>
      </select>
    </div>
    <div class="card fil-table-card" id="filTable"></div>
  `;
}

function normalizeSearchText(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-PT');
}

function filteredFilaments(){
  const query = normalizeSearchText(state.fil.search);
  const archived = state.fil.status==='arquivo';
  const list = state.filamentos.filter(f=>{
    if(!!f.arquivado !== archived) return false;
    const material = (f.tipo||f.material||'').trim();
    if(state.fil.material!=='todos' && material!==state.fil.material) return false;
    const haystack = normalizeSearchText([f.marca,material,f.cor,getFilamentSupplier(f),getFilamentPurchaseDate(f)].join(' '));
    return !query || haystack.includes(query);
  });
  if(state.fil.sort==='marca') return list.sort((a,b)=>(a.marca+a.cor).localeCompare(b.marca+b.cor,'pt-PT'));
  if(state.fil.sort==='cor') return list.sort((a,b)=>a.cor.localeCompare(b.cor,'pt-PT'));
  if(state.fil.sort==='preco') return list.sort((a,b)=>getPrecoKgFilamento(b)-getPrecoKgFilamento(a));
  return list.sort((a,b)=>String(getFilamentPurchaseDate(b)).localeCompare(String(getFilamentPurchaseDate(a))));
}

function renderFilTable(){
  const host = document.getElementById('filTable');
  if(!host) return;
  const list = filteredFilaments();
  const isArchive = state.fil.status==='arquivo';
  if(list.length===0){
    host.innerHTML = `<div class="empty-state">${ICONS.fil}<p>${isArchive ? 'O arquivo de bobinas está vazio.' : 'Nenhuma bobina corresponde aos filtros.'}</p></div>`;
    return;
  }
  host.innerHTML = `<div class="fil-list">
    <div class="fil-header">
      <span>Marca</span><span>Material</span><span>Cor</span><span>Compra</span><span>€/kg</span><span>Fornecedor</span><span>Data</span><span>Ações</span>
    </div>
    ${list.map(f=>{
      normalizeLotesFilamento(f);
      const purchasePrice = getFilamentPurchasePrice(f);
      const purchaseDate = getFilamentPurchaseDate(f);
      const supplier = getFilamentSupplier(f);
      return `<article class="fil-row">
        <div class="fil-name"><span class="fil-label">Marca</span><strong>${escapeHtml(f.marca)}</strong></div>
        <div><span class="fil-label">Material</span>${escapeHtml(f.tipo || f.material || 'Tipo n/d')}</div>
        <div><span class="fil-label">Cor</span><span class="fil-color"><span style="background:${colorSwatch(f.cor)};"></span>${escapeHtml(f.cor)}</span></div>
        <div class="mono"><span class="fil-label">Compra</span>${fmtEUR(purchasePrice)}</div>
        <div class="mono"><span class="fil-label">€/kg</span><b class="fil-price">${fmtEUR(getPrecoKgFilamento(f))}</b></div>
        <div class="muted"><span class="fil-label">Fornecedor</span>${escapeHtml(supplier || 'n/d')}</div>
        <div class="muted"><span class="fil-label">Data</span>${purchaseDate ? fmtDate(purchaseDate) : 'n/d'}</div>
        <div class="row-actions fil-actions">
          ${isArchive
            ? `<button class="btn btn-ghost btn-sm" onclick="restoreFilament('${f.id}')">Restaurar</button><button class="icon-btn danger" title="Eliminar definitivamente" onclick="confirmDeleteFil('${f.id}')">${ICONS.trash}</button>`
            : `<button class="btn btn-ghost btn-sm" title="Editar bobina" onclick="openFilModal('${f.id}')">${ICONS.edit} Editar</button><button class="btn btn-ghost btn-sm" onclick="archiveFilament('${f.id}')">Arquivar</button>`}
        </div>
      </article>`;
    }).join('')}
  </div>`;
}

function setFilStatus(status){
  state.fil.status = status;
  render();
}

async function archiveFilament(id){
  const filamento = state.filamentos.find(f=>f.id===id);
  if(!filamento) return;
  filamento.arquivado = true;
  filamento.arquivadoEm = new Date().toISOString();
  touchFilamentos();
  await saveFilamentos();
  toast('Bobina arquivada');
  render();
}

async function restoreFilament(id){
  const filamento = state.filamentos.find(f=>f.id===id);
  if(!filamento) return;
  filamento.arquivado = false;
  delete filamento.arquivadoEm;
  const lote = getFilamentReferenceLote(filamento);
  if(lote){
    filamento.lotes.forEach(item=>{ item.ativo = item.id===lote.id; });
    lote.arquivado = false;
  }
  touchFilamentos();
  await saveFilamentos();
  toast('Bobina restaurada');
  render();
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
    state.modal = {type:'fil', id, form:{
      marca:f.marca,
      tipo:f.tipo||f.material||'',
      cor:f.cor,
      preco:getFilamentPurchasePrice(f),
      spool:f.spool||1,
      dataCompra:getFilamentPurchaseDate(f),
      fornecedor:getFilamentSupplier(f),
      density:f.density||'',
      nozzle:f.nozzle||'',
      bed:f.bed||''
    }};
  }else{
    state.modal = {type:'fil', id:null, form:{marca:'',tipo:'',cor:'',preco:'',spool:1,dataCompra:todayISO(),fornecedor:'',density:'',nozzle:'',bed:''}};
  }
  render();
}
async function saveFilModal(){
  const m = state.modal, f = m.form;
  if(!f.marca.trim() || !f.tipo.trim() || !f.cor.trim()){ toast('Indica marca, material e cor'); return; }
  const spool = parseFloat(f.spool);
  const preco = parseFloat(f.preco);
  if(isNaN(spool) || spool<=0){ toast('Indica o peso da bobina'); return; }
  if(isNaN(preco) || preco<0){ toast('Indica o preço de compra'); return; }
  const precoKg = preco/spool;
  const rec = {
    marca:f.marca.trim(), tipo:f.tipo.trim(), cor:f.cor.trim(), preco, spool,
    dataCompra:f.dataCompra || '', fornecedor:(f.fornecedor||'').trim(),
    density:f.density?parseFloat(f.density):null, nozzle:f.nozzle?parseFloat(f.nozzle):null, bed:f.bed?parseFloat(f.bed):null
  };
  if(m.id){
    const idx = state.filamentos.findIndex(x=>x.id===m.id);
    const existing = state.filamentos[idx];
    state.filamentos[idx] = {...existing, ...rec};
    const lote = getFilamentReferenceLote(state.filamentos[idx]);
    if(lote){
      lote.nome = 'Bobina';
      lote.data = rec.dataCompra;
      lote.fornecedor = rec.fornecedor;
      lote.precoKg = precoKg;
      lote.ativo = !state.filamentos[idx].arquivado;
      lote.arquivado = !!state.filamentos[idx].arquivado;
    }else{
      state.filamentos[idx].lotes = [{
        id:'L001', nome:'Bobina', data:rec.dataCompra, fornecedor:rec.fornecedor,
        precoKg, ativo:!state.filamentos[idx].arquivado, arquivado:!!state.filamentos[idx].arquivado,
        criadoEm:new Date().toISOString()
      }];
    }
  }else{
    const novo = {id:uid(), ...rec, arquivado:false, lotes:[{
      id:'L001', nome:'Bobina', data:rec.dataCompra, fornecedor:rec.fornecedor,
      precoKg, ativo:true, arquivado:false, criadoEm:new Date().toISOString()
    }]};
    state.filamentos.push(novo);
  }
  touchFilamentos();
  await saveFilamentos();
  closeModal();
  toast('Bobina guardada');
}

function loteFormDefaults(){
  return {nome:'', data:todayISO(), fornecedor:'', precoKg:'', ativo:true};
}

function openLotesModal(filamentoId){
  const filamento = state.filamentos.find(f=>f.id===filamentoId);
  if(!filamento) return;
  migrateFilamentosToLotes();
  normalizeLotesFilamento(filamento, true);
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
  toast('Bobina eliminada');
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
      const badgeCls = l.arquivado ? 'badge-orc' : (isActive ? 'badge-vend' : 'badge-orc');
      return `
        <div class="lote-card">
          <div class="lote-summary">
            <div class="lote-title">
              <strong>${escapeHtml(l.nome || 'Lote sem nome')}</strong>
              <span class="badge ${badgeCls}">${estado}</span>
            </div>
            <div class="lote-meta">
              <span><b>${l.precoKg!=null ? `${fmtEUR(l.precoKg)}/kg` : 'Preço n/d'}</b></span>
              <span>Fornecedor: ${escapeHtml(l.fornecedor || 'n/d')}</span>
              <span>Data: ${l.data ? fmtDate(l.data) : 'n/d'}</span>
            </div>
            <div class="row-actions lote-actions">
              ${!isActive && !l.arquivado ? `<button class="btn btn-ghost btn-sm" onclick="setLoteAtivo('${filamento.id}','${l.id}')">Tornar ativo</button>` : ''}
              ${!l.arquivado ? `<button class="btn btn-danger btn-sm" onclick="archiveLoteFilamento('${filamento.id}','${l.id}')">Arquivar</button>` : ''}
            </div>
          </div>
          <div class="lote-edit-grid">
            <div class="field"><label>Nome</label><input type="text" value="${escapeHtml(lf.nome)}" oninput="state.modal.lotesForm['${l.id}'].nome=this.value"></div>
            <div class="field"><label>Data</label><input type="date" value="${escapeHtml(lf.data)}" oninput="state.modal.lotesForm['${l.id}'].data=this.value"></div>
            <div class="field"><label>Fornecedor</label><input type="text" value="${escapeHtml(lf.fornecedor)}" oninput="state.modal.lotesForm['${l.id}'].fornecedor=this.value"></div>
            <div class="field"><label>Preço €/kg</label><div class="unit-input"><input type="number" step="any" min="0" value="${escapeHtml(lf.precoKg)}" oninput="state.modal.lotesForm['${l.id}'].precoKg=this.value"><span>€/kg</span></div></div>
          </div>
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:0;font-size:12px;">
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
      <div class="new-lote-box">
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
    return modalWrap(`${m.id?'Editar':'Nova'} bobina`, `
      <div class="row3">
        <div class="field"><label>Marca</label><input type="text" value="${escapeHtml(f.marca)}" oninput="state.modal.form.marca=this.value" placeholder="ex: Elegoo"></div>
        <div class="field"><label>Material / acabamento</label><input type="text" value="${escapeHtml(f.tipo)}" oninput="state.modal.form.tipo=this.value" placeholder="ex: PLA Matte"></div>
        <div class="field"><label>Cor</label><input type="text" value="${escapeHtml(f.cor)}" oninput="state.modal.form.cor=this.value" placeholder="ex: Branco"></div>
      </div>
      <div class="row2">
        <div class="field"><label>Peso da bobina</label><div class="unit-input"><input type="number" step="any" min="0.01" value="${f.spool}" oninput="state.modal.form.spool=this.value"><span>kg</span></div></div>
        <div class="field"><label>Preço de compra</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.preco}" oninput="state.modal.form.preco=this.value"><span>€</span></div></div>
      </div>
      <div class="row2">
        <div class="field"><label>Fornecedor</label><input type="text" value="${escapeHtml(f.fornecedor)}" oninput="state.modal.form.fornecedor=this.value" placeholder="ex: Amazon"></div>
        <div class="field"><label>Data de compra</label><input type="date" value="${escapeHtml(f.dataCompra)}" oninput="state.modal.form.dataCompra=this.value"></div>
      </div>
      <div class="form-section-title">Parâmetros de impressão</div>
      <div class="row3">
        <div class="field"><label>Densidade</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.density}" oninput="state.modal.form.density=this.value"><span>g/cm³</span></div></div>
        <div class="field"><label>Nozzle</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.nozzle}" oninput="state.modal.form.nozzle=this.value"><span>°C</span></div></div>
        <div class="field"><label>Bed</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.bed}" oninput="state.modal.form.bed=this.value"><span>°C</span></div></div>
      </div>
    `, [
      {label:'Cancelar', cls:'btn-ghost', action:'closeModal()'},
      {label:'Guardar', cls:'btn-accent', action:'saveFilModal()'}
    ]);
  }
  if(m.type==='deleteFil'){
    return modalWrap('Eliminar bobina', `<p style="color:var(--text-dim);font-size:13.5px;">Tens a certeza que queres eliminar definitivamente <b>${escapeHtml(m.nome)}</b>? Esta ação não afeta registos já guardados no histórico.</p>`, [
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
    f.addOns = normalizeAddOns(f.addOns, f.addons);
    const pedido = state.pedidos.find(p=>p.id===m.id);
    return modalWrap('Editar registo', `
      <div class="field"><label>Projeto</label><input type="text" value="${escapeHtml(f.projeto)}" oninput="state.modal.form.projeto=this.value"></div>
      <div class="field">
        <label>Filamentos</label>
        ${f.materiais.map(m=>materialRowHtml(m,'modal',f.materiais.length>1)).join('')}
        <button type="button" class="btn btn-ghost btn-sm" onclick="modalAddMaterial()">${ICONS.plus} Adicionar filamento</button>
      </div>
      ${pedidoLoteDetailHtml(pedido)}
      <div class="row2">
        <div class="field"><label>Tempo (total)</label><div class="unit-input"><input type="number" step="any" min="0" value="${f.horas}" oninput="state.modal.form.horas=this.value"><span>h</span></div></div>
        <div class="field"><label>Data</label><input type="date" value="${f.data}" oninput="state.modal.form.data=this.value"></div>
      </div>
      <div class="field">
        <label>Add-ons</label>
        ${f.addOns.map(addOn=>addOnRowHtml(addOn,'modal',f.addOns.length>1)).join('')}
        <button type="button" class="btn btn-ghost btn-sm" onclick="modalAddAddOn()">${ICONS.plus} Adicionar add-on</button>
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
  const payload = defaultPayload();
  try{
    let code = null;
    let created = null;
    for(let attempt=0; attempt<5 && !created?.created; attempt++){
      code = genWorkspaceCode();
      const {data, error} = await sb.rpc('create_workspace', {p_code:code, p_payload:payload});
      if(error) throw error;
      created = firstRpcRow(data);
    }
    if(!created?.created) throw new Error('workspace-code-collision');
    lsSet('workspace', code);
    setLastWorkspace(code);
    lsSet('cache_payload', JSON.stringify(payload));
    workspaceCode = code;
    workspaceUpdatedAt = created.updated_at;
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
    const workspace = await getWorkspace(code);
    if(!workspace){ setupUi.loading=false; setupUi.error='Código não encontrado.'; renderSetupBody(); return; }
    lsSet('workspace', code);
    setLastWorkspace(code);
    lsSet('cache_payload', JSON.stringify(workspace.payload||{}));
    workspaceCode = code;
    workspaceUpdatedAt = workspace.updated_at;
    applyPayload(workspace.payload||{});
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
  else if(state.view==='ship') page.innerHTML = renderShipping();
  else if(state.view==='cfg') page.innerHTML = renderCfg();

  if(state.view==='calc') updateCalcPreview();
  if(state.view==='hist') renderHistTable();
  if(state.view==='fil') renderFilTable();
  if(state.view==='ship') renderShippingQuote();

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
  shippingModule = await import(new URL('core/shipping.js', appSrc).href);
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
  const ready = await loadAll();
  migrateFilamentosToLotes();
  autosave.AutoSave.init({
    save: async () => {
      if(!await pushPayload()) throw new Error('workspace-save-failed');
    },
    hasWorkspace: () => Boolean(workspaceCode),
  });
  document.getElementById('loadingScreen').style.display = 'none';
  if(!ready){
    showSetupScreen();
    return;
  }
  enterApp();
})();
