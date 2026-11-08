(() => {
  'use strict';
  const API_FALLBACK = 'http://localhost:8080';
  const params = new URLSearchParams(window.location.search);
  const eventoId = Number(params.get('id'));
  const lista = document.getElementById('listaMensagens');
  const form = document.getElementById('formMensagem');
  const input = document.getElementById('textoMensagem');
  const btnEnviar = document.getElementById('enviarMensagem');
  let timer = null;
  let carregando = false;
  const traducoes = {
    pt: { titulo:'Chat global do evento', descricao:'Conversa entre organizador, participantes inscritos e colaboradores aceitos.', atualizar:'Atualizar', mensagem:'Sua mensagem', placeholder:'Escreva uma mensagem...', enviar:'Enviar', limite:'Mensagens de até 1.000 caracteres.', carregando:'Carregando mensagens...', vazio:'Ainda não há mensagens. Comece a conversa!', semPermissao:'Você não tem permissão para acessar o chat deste evento.', erroEvento:'Não foi possível carregar os dados do evento.', erroEnviar:'Não foi possível enviar a mensagem.', erroCarregar:'Não foi possível carregar as mensagens.', chatFalhou:'O chat não pôde ser carregado.', voltar:'Voltar ao evento', voce:'Você', usuario:'Usuário', eventoInvalido:'Evento inválido. Volte aos detalhes do evento.', semLogin:'Faça login para acessar o chat.' },
    en: { titulo:'Global event chat', descricao:'Conversation between the organizer, registered attendees, and accepted collaborators.', atualizar:'Refresh', mensagem:'Your message', placeholder:'Write a message...', enviar:'Send', limite:'Messages can contain up to 1,000 characters.', carregando:'Loading messages...', vazio:'No messages yet. Start the conversation!', semPermissao:'You do not have permission to access this event chat.', erroEvento:'Could not load event details.', erroEnviar:'Could not send the message.', erroCarregar:'Could not load messages.', chatFalhou:'The chat could not be loaded.', voltar:'Back to event', voce:'You', usuario:'User', eventoInvalido:'Invalid event. Return to the event details.', semLogin:'Log in to access the chat.' },
    es: { titulo:'Chat global del evento', descricao:'Conversación entre el organizador, participantes inscritos y colaboradores aceptados.', atualizar:'Actualizar', mensagem:'Tu mensaje', placeholder:'Escribe un mensaje...', enviar:'Enviar', limite:'Mensajes de hasta 1.000 caracteres.', carregando:'Cargando mensajes...', vazio:'Todavía no hay mensajes. ¡Inicia la conversación!', semPermissao:'No tienes permiso para acceder al chat de este evento.', erroEvento:'No se pudieron cargar los datos del evento.', erroEnviar:'No se pudo enviar el mensaje.', erroCarregar:'No se pudieron cargar los mensajes.', chatFalhou:'No se pudo cargar el chat.', voltar:'Volver al evento', voce:'Tú', usuario:'Usuario', eventoInvalido:'Evento no válido. Vuelve a los detalles del evento.', semLogin:'Inicia sesión para acceder al chat.' }
  };
  function idiomaAtual() { return window.I18n?.getIdioma?.() || localStorage.getItem('mblfIdioma') || 'pt'; }
  function t(chave) { return (traducoes[idiomaAtual()] || traducoes.pt)[chave] || traducoes.pt[chave] || chave; }
  function traduzirErroApi(msg, fallback) {
    if (!msg) return fallback;
    const original = String(msg).toLocaleLowerCase('pt-BR');
    const mapas = [
      [/silenciado/, {pt:'Você está silenciado e não pode enviar mensagens neste chat.',en:'You are muted and cannot send messages in this chat.',es:'Estás silenciado y no puedes enviar mensajes en este chat.'}],
      [/permissão|exclusivo|acesso ao chat|convite.*aceito/, {pt:'Você não tem permissão para acessar o chat deste evento.',en:'You do not have permission to access this event chat.',es:'No tienes permiso para acceder al chat de este evento.'}],
      [/evento não encontrado/, {pt:'Evento não encontrado.',en:'Event not found.',es:'No se encontró el evento.'}],
      [/mensagem não pode estar vazia/, {pt:'A mensagem não pode estar vazia.',en:'The message cannot be empty.',es:'El mensaje no puede estar vacío.'}],
      [/ultrapassar 1000|1000 caracteres/, {pt:'A mensagem não pode ultrapassar 1.000 caracteres.',en:'The message cannot exceed 1,000 characters.',es:'El mensaje no puede superar los 1.000 caracteres.'}]
    ];
    for (const [regex, mensagens] of mapas) if (regex.test(original)) return mensagens[idiomaAtual()] || mensagens.pt;
    return fallback;
  }
  function aplicarIdiomaChat() {
    document.documentElement.lang = ({pt:'pt-BR',en:'en',es:'es'})[idiomaAtual()] || 'pt-BR';
    const titulo = document.getElementById('tituloEvento'); if (titulo && titulo.dataset.eventoTitulo) titulo.textContent = `${t('titulo')} — ${titulo.dataset.eventoTitulo}`; else if (titulo) titulo.textContent = t('titulo');
    const descricao = document.querySelector('main .text-muted-theme');
    if (descricao) descricao.textContent = t('descricao');
    const label = document.querySelector('label[for="textoMensagem"]'); if (label) label.textContent = t('mensagem');
    input.placeholder = t('placeholder');
    btnEnviar.lastChild && btnEnviar.lastChild.nodeType === Node.TEXT_NODE ? btnEnviar.lastChild.textContent = t('enviar') : btnEnviar.append(document.createTextNode(t('enviar')));
    const limite = document.querySelector('#formMensagem small'); if (limite) limite.textContent = t('limite');
    const atualizar = document.getElementById('atualizarChat'); if (atualizar) { atualizar.setAttribute('aria-label', t('atualizar')); const iconeAtualizar = atualizar.querySelector('i'); atualizar.textContent = ''; if (iconeAtualizar) atualizar.append(iconeAtualizar); else { const i = document.createElement('i'); i.className = 'bi bi-arrow-clockwise me-1'; atualizar.append(i); } atualizar.append(document.createTextNode(t('atualizar'))); }
    const voltar = document.getElementById('voltarEvento'); if (voltar) voltar.lastChild.textContent = t('voltar');
    const idioma = document.getElementById('idiomaAtualChat'); if (idioma) idioma.textContent = ({pt:'PT',en:'EN',es:'ES'})[idiomaAtual()] || 'PT';
    const flag = document.getElementById('flag-idiomaAtualChat');
    const flags = {pt:['https://flagcdn.com/24x18/br.png','Português'],en:['https://flagcdn.com/24x18/us.png','English'],es:['https://flagcdn.com/24x18/es.png','Español']};
    if (flag) { const f = flags[idiomaAtual()] || flags.pt; flag.src = f[0]; flag.alt = f[1]; }
    const estado = lista?.dataset.chatState;
    if (estado === 'loading') lista.innerHTML = `<div class="text-center text-muted-theme py-5">${escapar(t('carregando'))}</div>`;
    else if (estado === 'empty') lista.innerHTML = `<div class="text-center text-muted-theme py-5"><i class="bi bi-chat-square-text fs-1 d-block mb-3"></i>${escapar(t('vazio'))}</div>`;
    else if (estado === 'error') { const texto = lista.dataset.chatError || t('chatFalhou'); lista.innerHTML = `<div class="text-center text-muted-theme py-5"><i class="bi bi-exclamation-circle fs-1 d-block mb-3"></i>${escapar(texto)}</div>`; }
  }
  document.addEventListener('mblf:idiomaAlterado', aplicarIdiomaChat);
  document.addEventListener('DOMContentLoaded', aplicarIdiomaChat);

  function escapar(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
  }
  function alerta(texto, tipo='danger') {
    const el = document.getElementById('alertaChat');
    el.className = `alert alert-${tipo}`;
    el.textContent = texto;
  }
  function esconderAlerta() {
    const el = document.getElementById('alertaChat');
    el.className = 'alert d-none';
    el.textContent = '';
  }
  async function requisicao(path, options={}) {
    if (window.Auth && typeof Auth.fetchAutenticado === 'function') {
      return Auth.fetchAutenticado(path, options);
    }
    const token = localStorage.getItem('token');
    return fetch(`${API_FALLBACK}${path}`, {
      ...options,
      headers: { 'Content-Type':'application/json', ...(options.headers || {}), ...(token ? {Authorization:`Bearer ${token}`} : {}) }
    });
  }
  async function carregarEvento() {
    const r = await requisicao(`/eventos/${eventoId}`);
    if (!r.ok) throw new Error(t('erroEvento'));
    const evento = await r.json();
    const tituloEl = document.getElementById('tituloEvento'); tituloEl.dataset.eventoTitulo = evento.titulo || 'Evento'; aplicarIdiomaChat();
    document.getElementById('voltarEvento').href = `detalhesEvento.html?id=${eventoId}`;
  }
  function formatarData(data) {
    if (!data) return '';
    const d = new Date(data);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('pt-BR', { dateStyle:'short', timeStyle:'short' });
  }
  async function carregarMensagens() {
    if (carregando) return;
    carregando = true;
    try {
      const r = await requisicao(`/mensagens/evento/${eventoId}/global`);
      if (!r.ok) {
        let msg = t('semPermissao');
        try { const body = await r.json(); msg = traduzirErroApi(body.message || body.mensagem, msg); } catch (_) {}
        throw new Error(msg);
      }
      const mensagens = await r.json();
      lista.dataset.chatState = Array.isArray(mensagens) && mensagens.length === 0 ? 'empty' : 'messages'; lista.dataset.chatError = '';
      const usuario = Auth.getUsuario ? Auth.getUsuario() : null;
      const meuId = Number(usuario?.id);
      const anterior = lista.scrollTop;
      if (!Array.isArray(mensagens) || mensagens.length === 0) {
        lista.dataset.chatState = 'empty'; lista.dataset.chatError = ''; lista.innerHTML = `<div class="text-center text-muted-theme py-5"><i class="bi bi-chat-square-text fs-1 d-block mb-3"></i>${escapar(t('vazio'))}</div>`;
        return;
      }
      lista.innerHTML = mensagens.map(m => {
        const minha = Number(m.usuarioId) === meuId;
        return `<article class="chat-msg ${minha ? 'chat-minha' : 'chat-outra'}">
          <div class="chat-meta">${escapar(minha ? t('voce') : (m.usuarioNome || t('usuario')))} · ${escapar(formatarData(m.dataEnvio))}</div>
          <div>${escapar(m.mensagem)}</div>
        </article>`;
      }).join('');
      lista.scrollTop = lista.scrollHeight > anterior ? lista.scrollHeight : anterior;
      esconderAlerta();
    } catch (e) {
      const erro = traduzirErroApi(e.message, t('erroCarregar')); alerta(erro); lista.dataset.chatState = 'error'; lista.dataset.chatError = erro; lista.innerHTML = `<div class="text-center text-muted-theme py-5"><i class="bi bi-exclamation-circle fs-1 d-block mb-3"></i>${escapar(erro || t('chatFalhou'))}</div>`;
    } finally {
      carregando = false;
    }
  }
  form.addEventListener('submit', async ev => {
    ev.preventDefault();
    const mensagem = input.value.trim();
    if (!mensagem) return;
    btnEnviar.disabled = true;
    try {
      const r = await requisicao(`/mensagens/evento/${eventoId}/global`, {
        method:'POST', body:JSON.stringify({ mensagem })
      });
      if (!r.ok) {
        let msg = t('erroEnviar');
        try { const body = await r.json(); msg = traduzirErroApi(body.message || body.mensagem, msg); } catch (_) {}
        throw new Error(msg);
      }
      input.value = '';
      await carregarMensagens();
    } catch (e) {
      alerta(traduzirErroApi(e.message, t('erroEnviar')));
    } finally {
      btnEnviar.disabled = false;
      input.focus();
    }
  });
  document.getElementById('atualizarChat').addEventListener('click', carregarMensagens);
  if (!window.Auth || !Auth.estaLogado()) {
    window.location.href = 'login.html';
    return;
  }
  if (!Number.isInteger(eventoId) || eventoId <= 0) {
    alerta(t('eventoInvalido'));
    form.hidden = true;
    lista.innerHTML = '';
    return;
  }
  lista.dataset.chatState = 'loading';
  aplicarIdiomaChat();
  carregarEvento().then(carregarMensagens).catch(e => alerta(e.message || t('erroCarregar')));
  timer = window.setInterval(carregarMensagens, 5000);
  window.addEventListener('beforeunload', () => { if (timer) clearInterval(timer); });
})();