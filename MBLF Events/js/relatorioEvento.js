(() => {
'use strict';
const params = new URLSearchParams(location.search);
const eventoId = Number(params.get('eventoId') || params.get('id'));
const alerta = document.getElementById('alerta');
let dados = null;
let estadoRelatorio = 'loading';

const textos = {
  pt: {invalid:'ID do evento inválido.', loadError:'Não foi possível carregar o relatório.', title:'Relatório do evento', back:'Voltar ao Hub', registered:'Inscrições registradas', active:'Inscrições ativas', cancellations:'Cancelamentos', attendance:'Presenças registradas', certificates:'Certificados liberados', moderation:'Ações de moderação', export:'Exportar PDF', loading:'Carregando relatório…'},
  en: {invalid:'Invalid event ID.', loadError:'Could not load the report.', title:'Event report', back:'Back to Hub', registered:'Registered sign-ups', active:'Active registrations', cancellations:'Cancellations', attendance:'Recorded attendance', certificates:'Certificates released', moderation:'Moderation actions', export:'Export PDF', loading:'Loading report…'},
  es: {invalid:'ID de evento no válido.', loadError:'No se pudo cargar el informe.', title:'Informe del evento', back:'Volver al Hub', registered:'Inscripciones registradas', active:'Inscripciones activas', cancellations:'Cancelaciones', attendance:'Asistencias registradas', certificates:'Certificados emitidos', moderation:'Acciones de moderación', export:'Exportar PDF', loading:'Cargando informe…'}
};
function lang() { return window.I18n?.getIdioma?.() || localStorage.getItem('mblfIdioma') || 'pt'; }
function t(key) { return (textos[lang()] || textos.pt)[key] || textos.pt[key] || key; }
function traduzirErroApi(msg, fallback) {
  if (!msg) return fallback;
  const normalizado = String(msg).toLocaleLowerCase('pt-BR');
  const equivalencias = [
    [/evento não encontrado/, {pt:'Evento não encontrado.',en:'Event not found.',es:'No se encontró el evento.'}],
    [/sem permissão para ver relatórios|não possui permissão para ver relatórios/, {pt:'Você não tem permissão para ver este relatório.',en:'You do not have permission to view this report.',es:'No tienes permiso para ver este informe.'}],
    [/não autenticado|não autorizado|token/, {pt:'Sua sessão pode ter expirado. Entre novamente.',en:'Your session may have expired. Please sign in again.',es:'Tu sesión puede haber expirado. Inicia sesión de nuevo.'}]
  ];
  for (const [regex, mensagens] of equivalencias) {
    if (regex.test(normalizado)) return mensagens[lang()] || mensagens.pt;
  }
  return fallback;
}
function api(path) {
  if (window.Auth && typeof Auth.fetchAutenticado === 'function') return Auth.fetchAutenticado(path);
  const token = localStorage.getItem('token');
  return fetch(`http://localhost:8080${path}`, {headers: token ? {Authorization:`Bearer ${token}`} : {}});
}
function mostrarErro(msg) { alerta.className='alert alert-danger'; alerta.textContent=msg; }
function render(d) {
 const campos = [
  ['registered',d.totalInscricoes],['active',d.inscricoesAtivas],
  ['cancellations',d.cancelamentos],['attendance',d.presentes],
  ['certificates',d.certificadosLiberados],['moderation',d.moderacoes]
 ];
 document.documentElement.lang = ({pt:'pt-BR',en:'en',es:'es'})[lang()] || 'pt-BR';
 document.title = `${t('title')} - MBLF Events`;
 const tituloPagina = document.querySelector('[data-i18n="relTitulo"]');
 if (tituloPagina) tituloPagina.textContent = t('title');
 const back = document.getElementById('voltar');
 if (back) back.textContent = t('back');
 const exportBtn = document.getElementById('baixarPdf');
 if (exportBtn) exportBtn.textContent = t('export');
 document.getElementById('relatorio').innerHTML =
 `<div class="col-12"><h2 class="h4">${String(d.eventoTitulo||'Evento').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}</h2></div>` +
 campos.map(([key,valor])=>`<div class="col-12 col-md-6 col-lg-4"><div class="card card-custom p-3 h-100"><div class="text-muted">${t(key)}</div><div class="display-6">${Number(valor)||0}</div></div></div>`).join('');
 if (exportBtn) exportBtn.disabled=false;
}
document.getElementById('baixarPdf').addEventListener('click',()=>{ if(dados) window.print(); });
document.getElementById('voltar').href=`hubEvento.html?id=${eventoId}`;
document.addEventListener('mblf:idiomaAlterado',()=>{ if (dados) render(dados); else if (estadoRelatorio === 'loading') { alerta.className='alert alert-info'; alerta.textContent=t('loading'); } else if (estadoRelatorio === 'error') { alerta.className='alert alert-danger'; alerta.textContent=t('loadError'); } });
if(!Number.isInteger(eventoId)||eventoId<=0){estadoRelatorio='error';mostrarErro(t('invalid'));return;}
alerta.className='alert alert-info'; alerta.textContent=t('loading');
api(`/relatorios/evento/${eventoId}`).then(async r=>{if(!r.ok){let msg=t('loadError');try{const b=await r.json();msg=b.message||b.mensagem||msg}catch(_){}throw new Error(msg)}return r.json()}).then(d=>{dados=d;estadoRelatorio='loaded';alerta.className='alert d-none';render(d)}).catch(e=>{estadoRelatorio='error';mostrarErro(traduzirErroApi(e.message,t('loadError')))});
})();