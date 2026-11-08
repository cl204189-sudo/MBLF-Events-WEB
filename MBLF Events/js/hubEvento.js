// ==========================================================
// CONFIGURAÇÕES
// ==========================================================

const API_URL =
'http://localhost:8080';

// ==========================================================
// ESTADO DO HUB
// ==========================================================

let eventoAtual = null;

let colaboradoresCache = [];

let inscricoesCache = [];

let moderacoesCache = [];

let presencasCache = [];

let agendaCache = [];

let tarefasCache = [];

let mensagensCache = [];

let certificadosCache = [];

let colaboradorAtual = null;

let usuarioEhOrganizador = false;

// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
'DOMContentLoaded',
async () => {

    if (!Auth.estaLogado()) {

        window.location.href =
            'login.html';

        return;
    }

    carregarUsuarioNavbar();


    const eventoId =
        obterEventoIdDaURL();


    if (!eventoId) {

        mostrarErroPagina(
            'Evento não informado.'
        );

        return;
    }


    configurarFormularios();


    try {

        await carregarEvento(
            eventoId
        );

        configurarLimitesAgenda();

        await carregarColaboradores();

        atualizarIdentificacaoUsuario();

        configurarInterfacePorPermissao();

        configurarStatusCertificados();

        await Promise.allSettled([

            carregarInscricoes(),

            carregarPresencas(),

            carregarAgenda(),

            carregarTarefas(),

            carregarMensagens(),

            carregarCertificados()

        ]);


        atualizarResumos();


    } catch (error) {

        console.error(
            'Erro ao inicializar Hub:',
            error
        );


        mostrarErroPagina(
            error.message ||
            'Não foi possível carregar o Hub.'
        );

    }

}

);

// ==========================================================
// OBTER ID DO EVENTO PELA URL
// ==========================================================

function obterEventoIdDaURL() {

const params =
    new URLSearchParams(
        window.location.search
    );


const eventoId =
    params.get(
        'id'
    );


if (!eventoId) {
    return null;
}


const id =
    Number(
        eventoId
    );


if (
    Number.isNaN(id) ||
    id <= 0
) {

    return null;

}


return id;

}

// ==========================================================
// CARREGAR EVENTO
// ==========================================================

async function carregarEvento(
eventoId
) {

const response =
    await Auth.fetchAutenticado(
        `/eventos/${eventoId}`
    );


if (!response.ok) {

    const erro =
        await lerErroHub(
            response
        );


    throw new Error(
        extrairErroHub(
            erro,
            'Evento não encontrado.'
        )
    );

}


eventoAtual =
    await response.json();


preencherDadosEvento();

}

// ==========================================================
// PREENCHER DADOS DO EVENTO
// ==========================================================

function preencherDadosEvento() {

if (!eventoAtual) {
    return;
}

const titulo =
    document.getElementById(
        'hubTituloEvento'
    );


const descricao =
    document.getElementById(
        'hubDescricaoEvento'
    );


const status =
    document.getElementById(
        'hubStatusEvento'
    );


const organizador =
    document.getElementById(
        'hubOrganizadorEvento'
    );

const linkDetalhes =
    document.getElementById(
        'linkDetalhesEvento'
    );


if (titulo) {

    titulo.textContent =
        eventoAtual.titulo ||
        'Evento';

}


if (descricao) {

    descricao.textContent =
        eventoAtual.descricao ||
        'Sem descrição.';

}


if (status) {

    status.textContent =
        eventoAtual.status ||
        'SEM STATUS';

}


if (organizador) {

    organizador.textContent =
        eventoAtual.organizadorNome ||
        'Organizador';

}

if (linkDetalhes) {

linkDetalhes.href =
    `detalhesEvento.html?id=${eventoAtual.id}`;

}

// ======================================================
// VERIFICA SE O USUÁRIO É O ORGANIZADOR
// ======================================================

const usuarioId =
    Number(
        Auth.getUsuarioId()
    );


const organizadorId =
    Number(
        eventoAtual.organizadorId
    );


usuarioEhOrganizador =
    usuarioId ===
    organizadorId;

}

// ==========================================================
// FORMATAR PARA DATETIME-LOCAL
// ==========================================================

function formatarParaDatetimeLocal(
data
) {

const pad =
    numero =>
        String(numero)
            .padStart(
                2,
                '0'
            );


return (
    data.getFullYear() +
    '-' +
    pad(
        data.getMonth() + 1
    ) +
    '-' +
    pad(
        data.getDate()
    ) +
    'T' +
    pad(
        data.getHours()
    ) +
    ':' +
    pad(
        data.getMinutes()
    )
);

}

// ==========================================================
// CONFIGURAR LIMITES DE DATA DA AGENDA
// ==========================================================

function configurarLimitesAgenda() {

const inputInicio =
    document.getElementById(
        'inputAgendaInicio'
    );


const inputFim =
    document.getElementById(
        'inputAgendaFim'
    );


if (
    !inputInicio ||
    !inputFim
) {

    return;

}


// ======================================================
// DATA/HORA ATUAL
// ======================================================

const agora =
new Date();


let dataMinima =
    agora;


// Se o evento ainda não começou,
// a agenda só poderá começar a partir
// da data de início do evento.
if (eventoAtual?.dataInicio) {

    const inicioEvento =
        new Date(
            eventoAtual.dataInicio
        );


    if (
        !Number.isNaN(
            inicioEvento.getTime()
        ) &&
        inicioEvento > agora
    ) {

        dataMinima =
            inicioEvento;

    }

}

const dataMinimaFormatada =
formatarParaDatetimeLocal(
dataMinima
);

inputInicio.min =
dataMinimaFormatada;

inputFim.min =
dataMinimaFormatada;

// ======================================================
// LIMITE PELO TÉRMINO DO EVENTO
// ======================================================

if (
    eventoAtual?.dataFim
) {

    const fimEvento =
        new Date(
            eventoAtual.dataFim
        );


    if (
        !Number.isNaN(
            fimEvento.getTime()
        )
    ) {

        const fimEventoFormatado =
            formatarParaDatetimeLocal(
                fimEvento
            );


        inputInicio.max =
            fimEventoFormatado;


        inputFim.max =
            fimEventoFormatado;

    }

}


// ======================================================
// FIM NÃO PODE SER ANTES DO INÍCIO
// ======================================================

inputInicio.addEventListener(
    'change',
    () => {

        if (
            !inputInicio.value
        ) {

            return;

        }


        inputFim.min =
            inputInicio.value;


        if (
            inputFim.value &&
            inputFim.value <
            inputInicio.value
        ) {

            inputFim.value =
                '';

        }

    }
);

}

// ==========================================================
// CARREGAR COLABORADORES
// ==========================================================

async function carregarColaboradores() {

if (!eventoAtual) {
    return;
}


const response =
    await Auth.fetchAutenticado(
        `/colaboradores/evento/${eventoAtual.id}`
    );


if (!response.ok) {

    const erro =
        await lerErroHub(
            response
        );


    throw new Error(
        extrairErroHub(
            erro,
            'Não foi possível carregar os colaboradores.'
        )
    );

}


const colaboradores =
    await response.json();


colaboradoresCache =
    Array.isArray(
        colaboradores
    )
        ? colaboradores
        : [];


// ======================================================
// PROCURA O USUÁRIO ATUAL ENTRE OS COLABORADORES
// ======================================================

const usuarioId =
    Number(
        Auth.getUsuarioId()
    );


colaboradorAtual =
    colaboradoresCache.find(
        colaborador =>

            Number(
                colaborador.usuarioId
            ) ===
            usuarioId &&

            colaborador.status ===
            'ACEITO'
    ) || null;


renderizarColaboradores();


preencherResponsaveisTarefa();

}

// ==========================================================
// CONFIGURAR INTERFACE POR PERMISSÃO
// ==========================================================

function configurarInterfacePorPermissao() {

const thAcoes = document.getElementById('thAcoesParticipante');
if (thAcoes) {
    thAcoes.classList.toggle('d-none', !usuarioEhOrganizador && !colaboradorAtual?.podeSilenciar && !colaboradorAtual?.podeExpulsar);
}

const btnRelatorio = document.getElementById('btnRelatorioHub');
if (btnRelatorio && eventoAtual) {
    btnRelatorio.href = `relatorioEvento.html?eventoId=${eventoAtual.id}`;
    const podeRelatorio = usuarioEhOrganizador || Boolean(colaboradorAtual?.podeVerRelatorios);
    btnRelatorio.classList.toggle('d-none', !podeRelatorio);
}

// ======================================================
// ORGANIZADOR
// ======================================================

if (usuarioEhOrganizador) {

    return;

}


// ======================================================
// PRECISA SER COLABORADOR ACEITO
// ======================================================

if (!colaboradorAtual) {

    mostrarErroPagina(
        'Você não possui acesso a este Hub.'
    );

    return;

}


const tabColaboradores =
    document.getElementById(
        'tab-colaboradores'
    );


const tabInscritos =
    document.getElementById(
        'tab-inscritos'
    );


const tabPresencas =
    document.getElementById(
        'tab-presencas'
    );


const tabAgenda =
    document.getElementById(
        'tab-agenda'
    );


const tabTarefas =
    document.getElementById(
        'tab-tarefas'
    );


const tabChat =
    document.getElementById(
        'tab-chat'
    );

const tabCertificados =
    document.getElementById(
        'tab-certificados'
    );


// ======================================================
// GERENCIAR COLABORADORES
// ======================================================

// COLABORADOR NÃO GERENCIA OUTROS COLABORADORES

     tabColaboradores
        ?.classList.add(
            'd-none'
        );


// ======================================================
// VISUALIZAR INSCRITOS
// ======================================================

if (
    !Boolean(colaboradorAtual.podeVerInscritos)
    && !Boolean(colaboradorAtual.podeSilenciar)
    && !Boolean(colaboradorAtual.podeExpulsar)
) {
    tabInscritos?.classList.add('d-none');
}


// ======================================================
// REGISTRAR PRESENÇAS
// ======================================================

if (
    !Boolean(
        colaboradorAtual
            .podeRegistrarPresencas
    )
) {

    tabPresencas
        ?.classList.add(
            'd-none'
        );

}


// ======================================================
// AGENDA
// ======================================================

if (
    !Boolean(
        colaboradorAtual
            .podeCalendario
    )
) {

    tabAgenda
        ?.classList.add(
            'd-none'
        );

}


// ======================================================
// TAREFAS
// ======================================================

if (
    !Boolean(
        colaboradorAtual
            .podeTarefas
    )
) {

    tabTarefas
        ?.classList.add(
            'd-none'
        );

}


// ======================================================
// CHAT
// ======================================================

if (
    !Boolean(
        colaboradorAtual
            .podeChat
    )
) {

    tabChat
        ?.classList.add(
            'd-none'
        );

}

// ======================================================
// CERTIFICADOS
// ======================================================

if (
!Boolean(
colaboradorAtual
.podeLiberarCertificados
)
) {

tabCertificados
    ?.classList.add(
        'd-none'
    );

}

}



// ==========================================================
// RENDERIZAR COLABORADORES
// ==========================================================

function renderizarColaboradores() {

const container =
    document.getElementById(
        'containerColaboradores'
    );


if (!container) {
    return;
}


if (
    colaboradoresCache.length === 0
) {

    container.innerHTML = `

        <div
            class="text-center py-5 text-muted-theme"
        >

            <i
                class="bi bi-people"
                style="font-size: 3rem;"
            ></i>

            <h5 class="mt-3">
                Nenhum colaborador
            </h5>

            <p class="mb-0">

                Convide pessoas para ajudar
                na organização deste evento.

            </p>

        </div>

    `;


    return;

}


container.innerHTML =
    colaboradoresCache
        .map(
            criarCardColaborador
        )
        .join('');

}

// ==========================================================
// CARD COLABORADOR
// ==========================================================

// ==========================================================
// CARD COLABORADOR
// ==========================================================

function criarCardColaborador(
colaborador
) {

const statusInfo =
    obterStatusColaborador(
        colaborador.status
    );

const podeEditar =
    colaborador.status ===
    'ACEITO';

return `

    <div
        class="border rounded p-3 mb-3"
    >

        <div
            class="d-flex flex-column flex-md-row justify-content-between gap-3"
        >

            <div>

                <div
                    class="d-flex flex-wrap align-items-center gap-2 mb-1"
                >

                    <strong
                        class="text-main-theme"
                    >

                        ${escapeHtmlHub(
                            colaborador.usuarioNome ||
                            'Usuário'
                        )}

                    </strong>

                    <span
                        class="badge ${statusInfo.classe}"
                    >

                        ${statusInfo.texto}

                    </span>

                </div>

                <div
                    class="small text-muted-theme"
                >

                    ${
                        escapeHtmlHub(
                            colaborador.funcao ||
                            'Colaborador'
                        )
                    }

                </div>

            </div>

            ${
                podeEditar
                    ? `
                        <button
                            type="button"
                            class="btn btn-outline-primary btn-sm align-self-md-center"
                            onclick="abrirPermissoesColaborador(
                                ${Number(colaborador.usuarioId)}
                            )"
                        >

                            <i class="bi bi-sliders me-1"></i>

                            Permissões

                        </button>
                    `
                    : ''
            }

        </div>

    </div>

`;

}

// ==========================================================
// STATUS COLABORADOR
// ==========================================================

function obterStatusColaborador(
status
) {

switch (status) {

    case 'ACEITO':

        return {
            texto:
                'Ativo',

            classe:
                'bg-success'
        };


    case 'RECUSADO':

        return {
            texto:
                'Recusado',

            classe:
                'bg-danger'
        };


    case 'EXPULSO':

        return {
            texto:
                'Expulso',

            classe:
                'bg-secondary'
        };


    case 'PENDENTE':

    default:

        return {
            texto:
                'Convite Pendente',

            classe:
                'bg-warning text-dark'
        };

}

}

// ==========================================================
// CONFIGURAR FORMULÁRIOS E BOTÕES
// ==========================================================

function configurarFormularios() {

// ======================================================
// CONVITE
// ======================================================

const formConvite =
    document.getElementById(
        'formConvidarColaborador'
    );


if (formConvite) {

    formConvite.addEventListener(
        'submit',
        enviarConvite
    );

}


// ======================================================
// PERMISSÕES
// ======================================================

const formPermissoes =
    document.getElementById(
        'formPermissoesColaborador'
    );


if (formPermissoes) {

    formPermissoes.addEventListener(
        'submit',
        salvarPermissoes
    );

}


// ======================================================
// PRESENÇA
// ======================================================

const formPresenca =
    document.getElementById(
        'formRegistrarPresenca'
    );


if (formPresenca) {

    formPresenca.addEventListener(
        'submit',
        registrarPresenca
    );

}


// ======================================================
// LEITOR DE QR CODE PELA CÂMERA
// ======================================================
let leitorQR = null;
let qrEmProcessamento = false;
const btnAbrirLeitorQR = document.getElementById('btnAbrirLeitorQR');
const btnFecharLeitorQR = document.getElementById('btnFecharLeitorQR');
const areaLeitorQR = document.getElementById('areaLeitorQR');

async function fecharLeitorQR() {
    if (leitorQR) {
        try {
            if (leitorQR.isScanning) await leitorQR.stop();
            await leitorQR.clear();
        } catch (error) {
            console.warn('Não foi possível encerrar o leitor QR normalmente:', error);
        }
        leitorQR = null;
    }
    if (areaLeitorQR) areaLeitorQR.classList.add('d-none');
    if (btnAbrirLeitorQR) btnAbrirLeitorQR.classList.remove('d-none');
    if (btnFecharLeitorQR) btnFecharLeitorQR.classList.add('d-none');
}

async function abrirLeitorQR() {
    if (!window.Html5Qrcode) {
        mostrarAlertaHub('alertPresenca', 'A biblioteca de leitura QR não carregou. Verifique a conexão e recarregue a página.', 'danger');
        return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        mostrarAlertaHub('alertPresenca', 'O navegador não liberou acesso à câmera. Abra o sistema em localhost ou HTTPS e permita o uso da câmera.', 'danger');
        return;
    }
    if (leitorQR) await fecharLeitorQR();
    areaLeitorQR.classList.remove('d-none');
    btnAbrirLeitorQR.classList.add('d-none');
    btnFecharLeitorQR.classList.remove('d-none');
    qrEmProcessamento = false;
    leitorQR = new Html5Qrcode('leitorQRCode');
    try {
        await leitorQR.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
            async (textoLido) => {
                if (qrEmProcessamento) return;
                qrEmProcessamento = true;
                const inputToken = document.getElementById('inputTokenPresenca');
                inputToken.value = (textoLido || '').trim();
                await fecharLeitorQR();
                if (!inputToken.value) {
                    qrEmProcessamento = false;
                    mostrarAlertaHub('alertPresenca', 'O QR Code não contém um token válido.', 'warning');
                    return;
                }
                mostrarAlertaHub('alertPresenca', 'QR Code lido! Confirmando a presença…', 'success');
                formPresenca.requestSubmit();
                qrEmProcessamento = false;
            },
            () => { /* Erros por frame são normais enquanto o QR é localizado. */ }
        );
    } catch (error) {
        console.error('Erro ao iniciar a câmera:', error);
        await fecharLeitorQR();
        mostrarAlertaHub('alertPresenca', 'Não foi possível abrir a câmera. Confira a permissão do navegador e se outra aplicação está usando a câmera.', 'danger');
    }
}

if (btnAbrirLeitorQR) btnAbrirLeitorQR.addEventListener('click', abrirLeitorQR);
if (btnFecharLeitorQR) btnFecharLeitorQR.addEventListener('click', fecharLeitorQR);
window.addEventListener('beforeunload', () => {
    if (leitorQR && leitorQR.isScanning) leitorQR.stop().catch(() => {});
});

const btnAtualizarPresencas =
    document.getElementById(
        'btnAtualizarPresencas'
    );


if (btnAtualizarPresencas) {

    btnAtualizarPresencas
        .addEventListener(
            'click',
            carregarPresencas
        );

}


// ======================================================
// AGENDA
// ======================================================

const formAgenda =
    document.getElementById(
        'formAgenda'
    );


if (formAgenda) {

    formAgenda.addEventListener(
        'submit',
        criarItemAgenda
    );

}


const btnAtualizarAgenda =
    document.getElementById(
        'btnAtualizarAgenda'
    );


if (btnAtualizarAgenda) {

    btnAtualizarAgenda
        .addEventListener(
            'click',
            carregarAgenda
        );

}


// ======================================================
// TAREFAS
// ======================================================

const formTarefa =
    document.getElementById(
        'formTarefa'
    );


if (formTarefa) {

    formTarefa.addEventListener(
        'submit',
        criarTarefa
    );

}


const btnAtualizarTarefas =
    document.getElementById(
        'btnAtualizarTarefas'
    );


if (btnAtualizarTarefas) {

    btnAtualizarTarefas
        .addEventListener(
            'click',
            carregarTarefas
        );

}


// ======================================================
// CHAT
// ======================================================

const formChat =
    document.getElementById(
        'formChat'
    );


if (formChat) {

    formChat.addEventListener(
        'submit',
        enviarMensagemChat
    );

}


const btnAtualizarChat =
    document.getElementById(
        'btnAtualizarChat'
    );


if (btnAtualizarChat) {

    btnAtualizarChat
        .addEventListener(
            'click',
            carregarMensagens
        );

}

// ======================================================
// CERTIFICADOS
// ======================================================

const btnLiberarCertificados =
document.getElementById(
'btnLiberarCertificados'
);

if (btnLiberarCertificados) {

btnLiberarCertificados
    .addEventListener(
        'click',
        liberarCertificadosEvento
    );

}

}
// ==========================================================
// ENVIAR CONVITE
// ==========================================================

// ==========================================================
// ENVIAR CONVITE
// ==========================================================

async function enviarConvite(event) {

event.preventDefault();

// ======================================================
// SOMENTE ORGANIZADOR
// ======================================================

if (!usuarioEhOrganizador) {

    mostrarAlertaHub(
        'alertConvite',
        'Somente o organizador pode convidar colaboradores.',
        'danger'
    );

    return;
}

// ======================================================
// DADOS DO CONVITE
// ======================================================

const email =
    document.getElementById(
        'inputEmailColaborador'
    ).value.trim();

const funcao =
    document.getElementById(
        'inputFuncaoColaborador'
    ).value.trim();

if (!email) {

    mostrarAlertaHub(
        'alertConvite',
        'Informe o e-mail do usuário.',
        'warning'
    );

    return;
}

// ======================================================
// BOTÃO
// ======================================================

const btn =
    document.getElementById(
        'btnEnviarConvite'
    );

const htmlOriginal =
    btn.innerHTML;

btn.disabled = true;

btn.innerHTML = `
    <span
        class="spinner-border spinner-border-sm me-2"
    ></span>

    Enviando...
`;

esconderAlertaHub(
    'alertConvite'
);

try {

    // ==================================================
    // NOVA ROTA DA API — CONVITE POR E-MAIL
    // ==================================================

    const response =
        await Auth.fetchAutenticado(

            `/colaboradores/evento/${eventoAtual.id}/convidar-email`,

            {
                method: 'POST',

                body:
                    JSON.stringify({
                        email: email,
                        funcao:
                            funcao || null
                    })
            }
        );

    const data =
        await response
            .json()
            .catch(
                () => ({})
            );

    if (!response.ok) {

        throw new Error(
            extrairErroHub(
                data,
                'Não foi possível enviar o convite.'
            )
        );
    }

    mostrarAlertaHub(
        'alertConvite',
        'Convite enviado com sucesso!',
        'success'
    );

    await carregarColaboradores();

    setTimeout(
        () => {

            const modalEl =
                document.getElementById(
                    'modalConvidarColaborador'
                );

            const modal =
                bootstrap.Modal
                    .getInstance(
                        modalEl
                    );

            modal?.hide();

            document.getElementById(
                'formConvidarColaborador'
            )?.reset();

        },
        700
    );

} catch (error) {

    console.error(
        'Erro ao convidar colaborador:',
        error
    );

    mostrarAlertaHub(
        'alertConvite',
        error.message ||
            'Não foi possível enviar o convite.',
        'danger'
    );

} finally {

    btn.disabled = false;

    btn.innerHTML =
        htmlOriginal;
}

}

// ==========================================================
// ABRIR PERMISSÕES DO COLABORADOR
// ==========================================================

function abrirPermissoesColaborador(
usuarioId
) {

const colaborador =
    colaboradoresCache.find(

        item =>

            Number(
                item.usuarioId
            ) ===
            Number(
                usuarioId
            )

    );


if (!colaborador) {

    alert(
        'Colaborador não encontrado.'
    );

    return;

}


// ======================================================
// NOME
// ======================================================

definirTextoHub(
    'nomeColaboradorPermissoes',

    colaborador.usuarioNome ||
    'Colaborador'
);


// ======================================================
// ID
// ======================================================

document.getElementById(
    'permissaoUsuarioId'
).value =
    colaborador.usuarioId;


// ======================================================
// PERMISSÕES
// ======================================================

document.getElementById(
    'permPodeChat'
).checked =
    !!colaborador.podeChat;


document.getElementById(
    'permPodeCalendario'
).checked =
    !!colaborador.podeCalendario;


document.getElementById(
    'permPodeTarefas'
).checked =
    !!colaborador.podeTarefas;


document.getElementById(
    'permPodeVerInscritos'
).checked =
    !!colaborador.podeVerInscritos;


document.getElementById(
    'permPodeRegistrarPresencas'
).checked =
    !!colaborador
        .podeRegistrarPresencas;


document.getElementById(
    'permPodeVerRelatorios'
).checked =
    !!colaborador.podeVerRelatorios;


document.getElementById(
    'permPodeSilenciar'
).checked =
    !!colaborador.podeSilenciar;


document.getElementById(
    'permPodeExpulsar'
).checked =
    !!colaborador.podeExpulsar;


document.getElementById(
    'permPodeLiberarCertificados'
).checked =
    !!colaborador
        .podeLiberarCertificados;


esconderAlertaHub(
    'alertPermissoes'
);


// ======================================================
// ABRIR MODAL
// ======================================================

const modal =
    bootstrap.Modal
        .getOrCreateInstance(

            document.getElementById(
                'modalPermissoesColaborador'
            )

        );


modal.show();

}

// ==========================================================
// SALVAR PERMISSÕES
// ==========================================================

async function salvarPermissoes(
event
) {

event.preventDefault();


if (!usuarioEhOrganizador) {

    mostrarAlertaHub(
        'alertPermissoes',
        'Somente o organizador pode alterar permissões.',
        'danger'
    );

    return;

}


const usuarioId =
    Number(

        document.getElementById(
            'permissaoUsuarioId'
        ).value

    );


if (!usuarioId) {

    mostrarAlertaHub(
        'alertPermissoes',
        'Colaborador inválido.',
        'danger'
    );

    return;

}


// ======================================================
// MONTAR OBJETO
// ======================================================

const permissoes = {

    podeChat:
        document.getElementById(
            'permPodeChat'
        ).checked,


    podeCalendario:
        document.getElementById(
            'permPodeCalendario'
        ).checked,


    podeTarefas:
        document.getElementById(
            'permPodeTarefas'
        ).checked,


    podeVerInscritos:
        document.getElementById(
            'permPodeVerInscritos'
        ).checked,


    podeRegistrarPresencas:
        document.getElementById(
            'permPodeRegistrarPresencas'
        ).checked,


    podeVerRelatorios:
        document.getElementById(
            'permPodeVerRelatorios'
        ).checked,


    podeSilenciar:
        document.getElementById(
            'permPodeSilenciar'
        ).checked,


    podeExpulsar:
        document.getElementById(
            'permPodeExpulsar'
        ).checked,


    podeLiberarCertificados:
        document.getElementById(
            'permPodeLiberarCertificados'
        ).checked

};


const btn =
    document.getElementById(
        'btnSalvarPermissoes'
    );


const htmlOriginal =
    btn.innerHTML;


btn.disabled =
    true;


btn.innerHTML = `

    <span
        class="spinner-border spinner-border-sm me-2"
    ></span>

    Salvando...

`;


esconderAlertaHub(
    'alertPermissoes'
);


try {

    const response =
        await Auth.fetchAutenticado(

            `/colaboradores/evento/${eventoAtual.id}/usuario/${usuarioId}/permissoes`,

            {

                method:
                    'PUT',

                body:
                    JSON.stringify(
                        permissoes
                    )

            }

        );


    const data =
        await response
            .json()
            .catch(
                () => ({})
            );


    if (!response.ok) {

        throw new Error(

            extrairErroHub(

                data,

                'Não foi possível salvar as permissões.'

            )

        );

    }


    mostrarAlertaHub(
        'alertPermissoes',
        'Permissões atualizadas com sucesso!',
        'success'
    );


    // Atualiza a lista
    await carregarColaboradores();


} catch (error) {

    console.error(
        'Erro ao salvar permissões:',
        error
    );


    mostrarAlertaHub(
        'alertPermissoes',
        error.message ||
        'Não foi possível salvar as permissões.',
        'danger'
    );


} finally {

    btn.disabled =
        false;


    btn.innerHTML =
        htmlOriginal;

}

}

// ==========================================================
// VERIFICAR SE O EVENTO JÁ TERMINOU
// ==========================================================

function eventoJaTerminou() {

if (
    !eventoAtual ||
    !eventoAtual.dataFim
) {

    return false;

}


const dataFim =
    new Date(
        eventoAtual.dataFim
    );


if (
    Number.isNaN(
        dataFim.getTime()
    )
) {

    return false;

}


return new Date() >= dataFim;

}

// ==========================================================
// CONFIGURAR STATUS DOS CERTIFICADOS
// ==========================================================

function configurarStatusCertificados() {

const statusContainer =
    document.getElementById(
        'statusCertificados'
    );


const btnLiberar =
    document.getElementById(
        'btnLiberarCertificados'
    );


if (
    !statusContainer ||
    !btnLiberar
) {

    return;

}


// ======================================================
// EVENTO AINDA NÃO TERMINOU
// ======================================================

if (!eventoJaTerminou()) {

    btnLiberar.disabled =
        true;


    statusContainer.innerHTML = `

        <div
            class="d-flex align-items-center gap-3"
        >

            <i
                class="bi bi-lock-fill text-warning"
                style="font-size: 1.8rem;"
            ></i>


            <div>

                <strong
                    class="text-main-theme d-block"
                >

                    Certificados ainda não disponíveis

                </strong>


                <span
                    class="small text-muted-theme"
                >

                    Os certificados poderão ser liberados
                    após o término do evento.

                </span>

            </div>

        </div>

    `;


    return;

}


// ======================================================
// EVENTO TERMINOU
// ======================================================

btnLiberar.disabled =
    false;


statusContainer.innerHTML = `

    <div
        class="d-flex align-items-center gap-3"
    >

        <i
            class="bi bi-check-circle-fill text-success"
            style="font-size: 1.8rem;"
        ></i>


        <div>

            <strong
                class="text-main-theme d-block"
            >

                Evento encerrado

            </strong>


            <span
                class="small text-muted-theme"
            >

                Os certificados dos participantes
                presentes já podem ser liberados.

            </span>

        </div>

    </div>

`;

}

// ==========================================================
// CARREGAR CERTIFICADOS
// ==========================================================

async function carregarCertificados() {

const container =
    document.getElementById(
        'containerCertificados'
    );


if (!container) {
    return;
}


// ======================================================
// VERIFICAR PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual
            ?.podeLiberarCertificados
    )
) {

    return;

}


container.innerHTML = `

    <div
        class="text-center py-5"
    >

        <div
            class="spinner-border spinner-border-sm text-primary"
        ></div>


        <span
            class="text-muted-theme ms-2"
        >

            Carregando certificados...

        </span>

    </div>

`;


try {

    const response =
        await Auth.fetchAutenticado(

            `/certificados/evento/${eventoAtual.id}`

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível carregar os certificados.'

            )

        );

    }


    const dados =
        await response.json();


    certificadosCache =
        Array.isArray(
            dados
        )
            ? dados
            : [];


    renderizarCertificados();


} catch (error) {

    console.error(
        'Erro ao carregar certificados:',
        error
    );


    container.innerHTML = `

        <div
            class="alert alert-danger"
        >

            <i
                class="bi bi-exclamation-triangle me-2"
            ></i>

            ${
                escapeHtmlHub(
                    error.message ||
                    'Não foi possível carregar os certificados.'
                )
            }

        </div>

    `;

}

}

// ==========================================================
// RENDERIZAR CERTIFICADOS
// ==========================================================

function renderizarCertificados() {

const container =
    document.getElementById(
        'containerCertificados'
    );


if (!container) {
    return;
}


if (
    certificadosCache.length === 0
) {

    container.innerHTML = `

        <div
            class="text-center py-5"
        >

            <i
                class="bi bi-award text-muted-theme"
                style="font-size: 3rem;"
            ></i>


            <h5
                class="text-main-theme mt-3 mb-1"
            >

                Nenhum certificado gerado

            </h5>


            <p
                class="text-muted-theme mb-0"
            >

                Quando os certificados forem gerados,
                eles aparecerão aqui.

            </p>

        </div>

    `;


    return;

}


container.innerHTML =
    certificadosCache
        .map(
            certificado =>
                criarCardCertificado(
                    certificado
                )
        )
        .join('');

}

// ==========================================================
// CARD DO CERTIFICADO
// ==========================================================

function criarCardCertificado(
certificado
) {

const liberado =
    certificado.status ===
    'LIBERADO';


return `

    <div
        class="border rounded p-3 mb-3"
    >

        <div
            class="d-flex flex-column flex-md-row
                   justify-content-between
                   align-items-md-center
                   gap-3"
        >

            <div>

                <div
                    class="d-flex flex-wrap
                           align-items-center gap-2 mb-1"
                >

                    <strong
                        class="text-main-theme"
                    >

                        ${
                            escapeHtmlHub(
                                certificado.nomeParticipante ||
                                'Participante'
                            )
                        }

                    </strong>


                    ${
                        liberado
                            ? `
                                <span
                                    class="badge bg-success"
                                >
                                    <i
                                        class="bi bi-check-circle-fill me-1"
                                    ></i>

                                    Liberado
                                </span>
                            `
                            : `
                                <span
                                    class="badge bg-warning text-dark"
                                >
                                    <i
                                        class="bi bi-hourglass-split me-1"
                                    ></i>

                                    Pendente
                                </span>
                            `
                    }

                </div>


                <div
                    class="small text-muted-theme"
                >

                    Inscrição:
                    ${Number(
                        certificado.inscricaoId
                    )}

                </div>


                ${
                    certificado.cargaHoraria
                        ? `
                            <div
                                class="small text-muted-theme"
                            >

                                Carga horária:
                                ${
                                    Number(
                                        certificado.cargaHoraria
                                    )
                                }h

                            </div>
                        `
                        : ''
                }


                ${
                    liberado &&
                    certificado.dataLiberacao
                        ? `
                            <div
                                class="small text-muted-theme mt-1"
                            >

                                <i
                                    class="bi bi-calendar-check me-1"
                                ></i>

                                Liberado em
                                ${
                                    formatarDataHoraHub(
                                        certificado.dataLiberacao
                                    )
                                }

                            </div>
                        `
                        : ''
                }

            </div>


            <div>

                ${
                    liberado
                        ? `
                            <span
                                class="text-success small fw-semibold"
                            >

                                <i
                                    class="bi bi-patch-check-fill me-1"
                                ></i>

                                Certificado disponível

                            </span>
                        `
                        : `
                            <span
                                class="text-warning small fw-semibold"
                            >

                                <i
                                    class="bi bi-clock-history me-1"
                                ></i>

                                Aguardando liberação

                            </span>
                        `
                }

            </div>

        </div>

    </div>

`;

}

// ==========================================================
// LIBERAR CERTIFICADOS DO EVENTO
// ==========================================================

async function liberarCertificadosEvento() {

// ======================================================
// PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual
            ?.podeLiberarCertificados
    )
) {

    mostrarAlertaHub(
        'alertCertificados',
        'Você não possui permissão para liberar certificados.',
        'danger'
    );

    return;
}


// ======================================================
// EVENTO PRECISA TER TERMINADO
// ======================================================

if (!eventoJaTerminou()) {

    mostrarAlertaHub(
        'alertCertificados',
        'Os certificados só podem ser liberados após o término do evento.',
        'warning'
    );

    return;
}


// ======================================================
// GARANTIR QUE AS INSCRIÇÕES ESTÃO CARREGADAS
// ======================================================

if (
    !Array.isArray(
        inscricoesCache
    ) ||
    inscricoesCache.length === 0
) {

    await carregarInscricoes();

}


// ======================================================
// PEGAR SOMENTE PARTICIPANTES PRESENTES
// ======================================================

const presentes =
    inscricoesCache.filter(

        inscricao =>
            inscricao.status ===
            'PRESENTE'

    );


if (
    presentes.length === 0
) {

    mostrarAlertaHub(
        'alertCertificados',
        'Nenhum participante com presença confirmada foi encontrado.',
        'warning'
    );

    return;
}


// ======================================================
// CONFIRMAÇÃO
// ======================================================

const confirmar =
    window.confirm(

        `Deseja gerar e liberar os certificados de ${presentes.length} participante(s) presente(s)?`

    );


if (!confirmar) {
    return;
}


const btn =
    document.getElementById(
        'btnLiberarCertificados'
    );


const htmlOriginal =
    btn.innerHTML;


btn.disabled =
    true;


btn.innerHTML = `

    <span
        class="spinner-border spinner-border-sm me-2"
    ></span>

    Liberando...

`;


esconderAlertaHub(
    'alertCertificados'
);


let gerados =
    0;


let liberados =
    0;


let ignorados =
    0;


let erros =
    0;


try {

    // ==================================================
    // GARANTIR LISTA ATUAL DE CERTIFICADOS
    // ==================================================

    await carregarCertificados();


    // ==================================================
    // PROCESSAR CADA PARTICIPANTE PRESENTE
    // ==================================================

    for (
        const inscricao
        of presentes
    ) {

        try {

            // ==================================================
            // VER SE JÁ EXISTE CERTIFICADO PARA A INSCRIÇÃO
            // ==================================================

            let certificado =
                certificadosCache.find(

                    item =>
                        Number(
                            item.inscricaoId
                        ) ===
                        Number(
                            inscricao.id
                        )

                );


            // ==================================================
            // SE NÃO EXISTE, GERAR
            // ==================================================

            if (!certificado) {

                const responseGerar =
                    await Auth.fetchAutenticado(

                        `/certificados/gerar/${inscricao.id}`,

                        {
                            method:
                                'POST'
                        }

                    );


                const dataGerado =
                    await responseGerar
                        .json()
                        .catch(
                            () => ({})
                        );


                if (
                    !responseGerar.ok
                ) {

                    throw new Error(

                        extrairErroHub(

                            dataGerado,

                            `Não foi possível gerar o certificado de ${inscricao.usuarioNome || 'participante'}.`

                        )

                    );

                }


                certificado =
                    dataGerado;


                certificadosCache.push(
                    certificado
                );


                gerados++;

            }


            // ==================================================
            // SE JÁ ESTÁ LIBERADO, NÃO FAZ NADA
            // ==================================================

            if (
                certificado.status ===
                'LIBERADO'
            ) {

                ignorados++;

                continue;

            }


            // ==================================================
            // LIBERAR CERTIFICADO
            // ==================================================

            const responseLiberar =
                await Auth.fetchAutenticado(

                    `/certificados/${certificado.id}/liberar`,

                    {
                        method:
                            'PUT'
                    }

                );


            const dataLiberado =
                await responseLiberar
                    .json()
                    .catch(
                        () => ({})
                    );


            if (
                !responseLiberar.ok
            ) {

                throw new Error(

                    extrairErroHub(

                        dataLiberado,

                        `Não foi possível liberar o certificado de ${inscricao.usuarioNome || 'participante'}.`

                    )

                );

            }


            liberados++;

        } catch (error) {

            erros++;


            console.error(

                `Erro ao processar certificado da inscrição ${inscricao.id}:`,

                error

            );

        }

    }


    // ==================================================
    // RECARREGAR LISTAGEM
    // ==================================================

    await carregarCertificados();


    // ==================================================
    // RESULTADO
    // ==================================================

    if (
        erros === 0
    ) {

        mostrarAlertaHub(
            'alertCertificados',
            `Certificados processados com sucesso! ${liberados} liberado(s), ${ignorados} já estava(m) liberado(s).`,
            'success'
        );

    } else {

        mostrarAlertaHub(
            'alertCertificados',
            `Processamento concluído com algumas falhas. ${liberados} certificado(s) liberado(s) e ${erros} erro(s).`,
            'warning'
        );

    }


} catch (error) {

    console.error(
        'Erro ao liberar certificados:',
        error
    );


    mostrarAlertaHub(
        'alertCertificados',
        error.message ||
        'Não foi possível liberar os certificados.',
        'danger'
    );


} finally {

    btn.innerHTML =
        htmlOriginal;


    configurarStatusCertificados();

}

}

// ==========================================================
// CARREGAR INSCRITOS
// ==========================================================

async function carregarInscricoes() {

const tbody =
    document.getElementById(
        'tabelaInscritos'
    );


if (!tbody) {
    return;
}


// ======================================================
// COLABORADOR SEM PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(colaboradorAtual?.podeVerInscritos) &&
    !Boolean(colaboradorAtual?.podeSilenciar) &&
    !Boolean(colaboradorAtual?.podeExpulsar)
) {

    return;

}


tbody.innerHTML = `

    <tr>

        <td
            colspan="3"
            class="text-center py-5"
        >

            <div
                class="spinner-border spinner-border-sm text-primary"
            ></div>

            <span
                class="text-muted-theme ms-2"
            >

                Carregando inscritos...

            </span>

        </td>

    </tr>

`;


try {

    const response =
        await Auth.fetchAutenticado(

            `/inscricoes/evento/${eventoAtual.id}`

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível carregar os inscritos.'

            )

        );

    }


    const dados =
        await response.json();


    inscricoesCache =
        Array.isArray(
            dados
        )
            ? dados
            : [];

    moderacoesCache = [];
    if (usuarioEhOrganizador || colaboradorAtual?.podeSilenciar || colaboradorAtual?.podeExpulsar) {
        try {
            const respostaModeracoes = await Auth.fetchAutenticado(`/moderacoes/evento/${eventoAtual.id}`);
            if (respostaModeracoes.ok) {
                const historico = await respostaModeracoes.json();
                moderacoesCache = Array.isArray(historico) ? historico.sort((a, b) => Number(b.id) - Number(a.id)) : [];
            }
        } catch (erroModeracoes) {
            console.warn('Não foi possível carregar o estado de moderação.', erroModeracoes);
        }
    }

    atualizarResumoHub(
        'resumoInscritos',

        inscricoesCache.filter(

            inscricao =>
                inscricao.status !==
                'CANCELADO'

        ).length
    );


    renderizarInscritos();


} catch (error) {

    console.error(
        'Erro ao carregar inscritos:',
        error
    );


    tbody.innerHTML = `

        <tr>

            <td
                colspan="3"
                class="text-center text-danger py-4"
            >

                <i
                    class="bi bi-exclamation-triangle me-1"
                ></i>

                ${
                    escapeHtmlHub(
                        error.message ||
                        'Não foi possível carregar os inscritos.'
                    )
                }

            </td>

        </tr>

    `;

}

}

// ==========================================================
// RENDERIZAR INSCRITOS
// ==========================================================

function renderizarInscritos() {

const tbody =
    document.getElementById(
        'tabelaInscritos'
    );


if (!tbody) {
    return;
}


if (
    inscricoesCache.length === 0
) {

    tbody.innerHTML = `

        <tr>

            <td
                colspan="4"
                class="text-center text-muted-theme py-5"
            >

                <i
                    class="bi bi-person-x d-block mb-2"
                    style="font-size: 2rem;"
                ></i>

                Nenhum participante inscrito.

            </td>

        </tr>

    `;


    return;

}


tbody.innerHTML =
    inscricoesCache
        .map(

            inscricao => {

                const status =
                    obterStatusInscricaoHub(
                        inscricao.status
                    );
                const alvoId = Number(inscricao.usuarioId);
                const ultimaModeracao = moderacoesCache.find(item => Number(item.alvoId) === alvoId);
                const silenciado = ultimaModeracao?.acao === 'SILENCIAR';
                const ativo = inscricao.status === 'INSCRITO' || inscricao.status === 'PRESENTE';
                const podeSilenciar = usuarioEhOrganizador || Boolean(colaboradorAtual?.podeSilenciar);
                const podeExpulsar = usuarioEhOrganizador || Boolean(colaboradorAtual?.podeExpulsar);
                const classeColunaAcoes = !podeSilenciar && !podeExpulsar ? 'd-none' : '';
                const botoes = ativo ? `${podeSilenciar ? `<button type="button" class="btn btn-sm ${silenciado ? 'btn-outline-success' : 'btn-outline-warning'} me-1" onclick="alternarSilenciamentoParticipante(${alvoId}, ${silenciado})" title="${silenciado ? 'Permitir enviar mensagens' : 'Silenciar no chat'}"><i class="bi ${silenciado ? 'bi-volume-up' : 'bi-volume-mute'}"></i> ${silenciado ? 'Reativar chat' : 'Silenciar'}</button>` : ''}${podeExpulsar ? `<button type="button" class="btn btn-sm btn-outline-danger" onclick="expulsarParticipante(${alvoId}, '${escapeHtmlHub(inscricao.usuarioNome || 'Participante').replace(/'/g, '&#39;')}')"><i class="bi bi-person-x"></i> Expulsar</button>` : ''}` : '—';

                return `

                    <tr>

                        <!-- PARTICIPANTE -->
                        <td>

                            <strong
                                class="text-main-theme"
                            >

                                ${
                                    escapeHtmlHub(
                                        inscricao.usuarioNome ||
                                        'Participante'
                                    )
                                }

                            </strong>

                        </td>


                        <!-- DATA -->
                        <td
                            class="text-main-theme"
                        >

                            ${
                                formatarDataHoraHub(
                                    inscricao.dataInscricao
                                )
                            }

                        </td>


                        <!-- STATUS -->
                        <td>

                            <span
                                class="badge ${status.classe}"
                            >

                                ${status.texto}

                            </span>

                        </td>

                        <td class="text-nowrap ${classeColunaAcoes}">${botoes}</td>

                    </tr>

                `;

            }

        )
        .join('');

}

// ==========================================================
// MODERAÇÃO DOS PARTICIPANTES
// ==========================================================

async function alternarSilenciamentoParticipante(usuarioId, estaSilenciado) {
    const acao = estaSilenciado ? 'dessilenciar' : 'silenciar';
    const texto = estaSilenciado ? 'Permitir que esta pessoa volte a enviar mensagens?' : 'Silenciar esta pessoa no chat global do evento?';
    if (!window.confirm(texto)) return;
    try {
        const response = await Auth.fetchAutenticado(`/moderacoes/evento/${eventoAtual.id}/${acao}`, { method: 'POST', body: JSON.stringify({ alvoId: usuarioId, motivo: null }) });
        const dados = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(extrairErroHub(dados, 'Não foi possível alterar o silenciamento.'));
        const historico = await Auth.fetchAutenticado(`/moderacoes/evento/${eventoAtual.id}`);
        if (historico.ok) { const lista = await historico.json(); moderacoesCache = Array.isArray(lista) ? lista.sort((a, b) => Number(b.id) - Number(a.id)) : moderacoesCache; }
        renderizarInscritos();
        mostrarAlertaHub('alertInscritos', estaSilenciado ? 'Participante liberado para enviar mensagens.' : 'Participante silenciado no chat global.', 'success');
    } catch (erro) {
        mostrarAlertaHub('alertInscritos', erro.message || 'Erro ao alterar silenciamento.', 'danger');
    }
}

async function expulsarParticipante(usuarioId, nome) {
    if (!window.confirm(`Tem certeza de que deseja expulsar ${nome} deste evento? A conta da pessoa não será excluída.`)) return;
    const motivo = window.prompt('Motivo da expulsão (opcional):') || '';
    try {
        const response = await Auth.fetchAutenticado(`/moderacoes/evento/${eventoAtual.id}/expulsar`, { method: 'POST', body: JSON.stringify({ alvoId: usuarioId, motivo }) });
        const dados = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(extrairErroHub(dados, 'Não foi possível expulsar o participante.'));
        mostrarAlertaHub('alertInscritos', 'Participante removido deste evento.', 'success');
        await carregarInscricoes();
    } catch (erro) {
        mostrarAlertaHub('alertInscritos', erro.message || 'Erro ao expulsar participante.', 'danger');
    }
}

// ==========================================================
// STATUS DAS INSCRIÇÕES
// ==========================================================

function obterStatusInscricaoHub(
status
) {

switch (status) {

    case 'PRESENTE':

        return {

            texto:
                'Presente',

            classe:
                'bg-success'

        };


    case 'CANCELADO':

        return {

            texto:
                'Cancelado',

            classe:
                'bg-danger'

        };


    case 'CONFIRMADO':

        return {

            texto:
                'Confirmado',

            classe:
                'bg-primary'

        };


    case 'INSCRITO':

    default:

        return {

            texto:
                'Inscrito',

            classe:
                'bg-warning text-dark'

        };

}

}

// ==========================================================
// CARREGAR PRESENÇAS
// ==========================================================

async function carregarPresencas() {

const container =
    document.getElementById(
        'containerPresencas'
    );


if (!container) {
    return;
}


// ======================================================
// COLABORADOR SEM PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual
            ?.podeRegistrarPresencas
    )
) {

    return;

}


container.innerHTML = `

    <div
        class="text-center py-5"
    >

        <div
            class="spinner-border spinner-border-sm text-primary"
        ></div>


        <span
            class="text-muted-theme ms-2"
        >

            Carregando presenças...

        </span>

    </div>

`;


try {

    const response =
        await Auth.fetchAutenticado(

            `/presencas/evento/${eventoAtual.id}`

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível carregar as presenças.'

            )

        );

    }


    const dados =
        await response.json();


    presencasCache =
        Array.isArray(
            dados
        )
            ? dados
            : [];


    atualizarResumoHub(
        'resumoPresencas',
        presencasCache.length
    );


    renderizarPresencas();


} catch (error) {

    console.error(
        'Erro ao carregar presenças:',
        error
    );


    container.innerHTML = `

        <div
            class="alert alert-danger"
        >

            <i
                class="bi bi-exclamation-triangle me-2"
            ></i>

            ${
                escapeHtmlHub(
                    error.message ||
                    'Não foi possível carregar as presenças.'
                )
            }

        </div>

    `;

}

}

// ==========================================================
// RENDERIZAR PRESENÇAS
// ==========================================================

function renderizarPresencas() {

const container =
    document.getElementById(
        'containerPresencas'
    );


if (!container) {
    return;
}


if (
    presencasCache.length === 0
) {

    container.innerHTML = `

        <div
            class="text-center py-5"
        >

            <i
                class="bi bi-qr-code-scan text-muted-theme"
                style="font-size: 3rem;"
            ></i>


            <h5
                class="text-main-theme mt-3 mb-1"
            >

                Nenhuma presença registrada

            </h5>


            <p
                class="text-muted-theme mb-0"
            >

                Os participantes confirmados
                aparecerão aqui.

            </p>

        </div>

    `;


    return;

}


container.innerHTML =
    presencasCache
        .map(

            presenca => {

                return `

                    <div
                        class="border rounded p-3 mb-3"
                    >

                        <div
                            class="d-flex justify-content-between align-items-center gap-3"
                        >

                            <div>

                                <strong
                                    class="text-main-theme d-block"
                                >

                                    ${
                                        escapeHtmlHub(
                                            presenca.usuarioNome ||
                                            'Participante'
                                        )
                                    }

                                </strong>


                                <small
                                    class="text-muted-theme"
                                >

                                    <i
                                        class="bi bi-clock me-1"
                                    ></i>

                                    ${
                                        formatarDataHoraHub(
                                            presenca.dataLeitura
                                        )
                                    }

                                </small>

                            </div>


                            <span
                                class="badge bg-success"
                            >

                                <i
                                    class="bi bi-check-circle-fill me-1"
                                ></i>

                                Presente

                            </span>

                        </div>

                    </div>

                `;

            }

        )
        .join('');

}

// ==========================================================
// REGISTRAR PRESENÇA
// ==========================================================

async function registrarPresenca(
event
) {

event.preventDefault();


// ======================================================
// VALIDAR PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual
            ?.podeRegistrarPresencas
    )
) {

    mostrarAlertaHub(
        'alertPresenca',
        'Você não possui permissão para registrar presenças.',
        'danger'
    );

    return;

}


const input =
    document.getElementById(
        'inputTokenPresenca'
    );


const token =
    input.value.trim();


if (!token) {

    mostrarAlertaHub(
        'alertPresenca',
        'Informe o token do QR Code.',
        'warning'
    );

    return;

}


const btn =
    document.getElementById(
        'btnRegistrarPresenca'
    );


const htmlOriginal =
    btn.innerHTML;


btn.disabled =
    true;


btn.innerHTML = `

    <span
        class="spinner-border spinner-border-sm me-2"
    ></span>

    Confirmando...

`;


esconderAlertaHub(
    'alertPresenca'
);


try {

    const response =
        await Auth.fetchAutenticado(

            '/presencas/registrar',

            {

                method:
                    'POST',

                body:
                    JSON.stringify({

                        token:
                            token

                    })

            }

        );


    const data =
        await response
            .json()
            .catch(
                () => ({})
            );


    if (!response.ok) {

        throw new Error(

            extrairErroHub(

                data,

                'Não foi possível registrar a presença.'

            )

        );

    }


    mostrarAlertaHub(
        'alertPresenca',
        'Presença registrada com sucesso!',
        'success'
    );


    input.value =
        '';


    // ==================================================
    // RECARREGAR PRESENÇAS
    // ==================================================

    await carregarPresencas();


    // ==================================================
    // RECARREGAR INSCRITOS
    //
    // O status da inscrição passa a PRESENTE.
    // ==================================================

    await carregarInscricoes();


} catch (error) {

    console.error(
        'Erro ao registrar presença:',
        error
    );


    mostrarAlertaHub(
        'alertPresenca',
        error.message ||
        'Não foi possível registrar a presença.',
        'danger'
    );


} finally {

    btn.disabled =
        false;


    btn.innerHTML =
        htmlOriginal;

}

}

// ==========================================================
// CARREGAR AGENDA
// ==========================================================

async function carregarAgenda() {

const container =
    document.getElementById(
        'containerAgenda'
    );


if (!container) {
    return;
}


// ======================================================
// COLABORADOR SEM PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual?.podeCalendario
    )
) {

    return;

}


container.innerHTML = `

    <div
        class="text-center py-5"
    >

        <div
            class="spinner-border spinner-border-sm text-primary"
        ></div>


        <span
            class="text-muted-theme ms-2"
        >

            Carregando agenda...

        </span>

    </div>

`;


try {

    const response =
        await Auth.fetchAutenticado(

            `/agenda/evento/${eventoAtual.id}`

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível carregar a agenda.'

            )

        );

    }


    const dados =
        await response.json();


    agendaCache =
        Array.isArray(
            dados
        )
            ? dados
            : [];


    renderizarAgenda();


} catch (error) {

    console.error(
        'Erro ao carregar agenda:',
        error
    );


    container.innerHTML = `

        <div
            class="alert alert-danger"
        >

            <i
                class="bi bi-exclamation-triangle me-2"
            ></i>

            ${
                escapeHtmlHub(
                    error.message ||
                    'Não foi possível carregar a agenda.'
                )
            }

        </div>

    `;

}

}

// ==========================================================
// RENDERIZAR AGENDA
// ==========================================================

function renderizarAgenda() {

const container =
    document.getElementById(
        'containerAgenda'
    );


if (!container) {
    return;
}


if (
    agendaCache.length === 0
) {

    container.innerHTML = `

        <div
            class="text-center py-5"
        >

            <i
                class="bi bi-calendar-x text-muted-theme"
                style="font-size: 3rem;"
            ></i>


            <h5
                class="text-main-theme mt-3 mb-1"
            >

                Agenda vazia

            </h5>


            <p
                class="text-muted-theme mb-0"
            >

                Nenhum compromisso foi adicionado.

            </p>

        </div>

    `;


    return;

}


container.innerHTML =
    agendaCache
        .map(
            item =>
                criarCardAgenda(
                    item
                )
        )
        .join('');

}

// ==========================================================
// CARD DA AGENDA
// ==========================================================

function criarCardAgenda(
item
) {

const tipo =
    formatarTipoAgenda(
        item.tipo
    );


return `

    <div
        class="border rounded p-3 mb-3"
    >

        <div
            class="d-flex justify-content-between align-items-start gap-3"
        >

            <div
                class="flex-grow-1"
            >

                <div
                    class="d-flex flex-wrap gap-2 align-items-center mb-2"
                >

                    <span
                        class="badge bg-primary"
                    >

                        ${tipo}

                    </span>


                    ${
                        item.criadoPorNome
                            ? `
                                <small
                                    class="text-muted-theme"
                                >

                                    por ${
                                        escapeHtmlHub(
                                            item.criadoPorNome
                                        )
                                    }

                                </small>
                            `
                            : ''
                    }

                </div>


                <h6
                    class="fw-bold text-main-theme mb-1"
                >

                    ${
                        escapeHtmlHub(
                            item.titulo ||
                            'Compromisso'
                        )
                    }

                </h6>


                ${
                    item.descricao
                        ? `
                            <p
                                class="small text-muted-theme mb-2"
                            >

                                ${
                                    escapeHtmlHub(
                                        item.descricao
                                    )
                                }

                            </p>
                        `
                        : ''
                }


                <div
                    class="small text-muted-theme"
                >

                    <i
                        class="bi bi-clock me-1"
                    ></i>


                    ${
                        formatarDataHoraHub(
                            item.dataInicio
                        )
                    }


                    ${
                        item.dataFim
                            ? `
                                até
                                ${
                                    formatarDataHoraHub(
                                        item.dataFim
                                    )
                                }
                            `
                            : ''
                    }

                </div>

            </div>


            <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                onclick="excluirItemAgenda(
                    ${Number(item.id)}
                )"
                title="Excluir item"
            >

                <i
                    class="bi bi-trash"
                ></i>

            </button>

        </div>

    </div>

`;

}

// ==========================================================
// FORMATAR TIPO DA AGENDA
// ==========================================================

function formatarTipoAgenda(
tipo
) {

switch (tipo) {

    case 'REUNIAO':

        return 'Reunião';


    case 'ATIVIDADE':

        return 'Atividade';


    case 'LEMBRETE':

        return 'Lembrete';


    case 'PRAZO':

        return 'Prazo';


    case 'OUTRO':

    default:

        return 'Outro';

}

}

// ==========================================================
// CRIAR ITEM DA AGENDA
// ==========================================================

async function criarItemAgenda(
event
) {

event.preventDefault();


// ======================================================
// PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual?.podeCalendario
    )
) {

    mostrarAlertaHub(
        'alertAgenda',
        'Você não possui permissão para alterar a agenda.',
        'danger'
    );

    return;

}


const titulo =
    document.getElementById(
        'inputAgendaTitulo'
    ).value.trim();


const descricao =
    document.getElementById(
        'inputAgendaDescricao'
    ).value.trim();


const tipo =
    document.getElementById(
        'selectAgendaTipo'
    ).value;


const dataInicio =
    document.getElementById(
        'inputAgendaInicio'
    ).value;


const dataFim =
    document.getElementById(
        'inputAgendaFim'
    ).value;


// ======================================================
// VALIDAÇÕES
// ======================================================

if (!titulo) {

    mostrarAlertaHub(
        'alertAgenda',
        'Informe o título do compromisso.',
        'warning'
    );

    return;

}


if (!dataInicio) {

    mostrarAlertaHub(
        'alertAgenda',
        'Informe a data e o horário de início.',
        'warning'
    );

    return;

}

const inicioSelecionado =
new Date(
    dataInicio
);


    const inicioEvento =
        eventoAtual?.dataInicio
            ? new Date(
                eventoAtual.dataInicio
            )
            : null;


    const fimEvento =
        eventoAtual?.dataFim
            ? new Date(
                eventoAtual.dataFim
            )
            : null;


    if (
        inicioEvento &&
        !Number.isNaN(
            inicioEvento.getTime()
        ) &&
        inicioSelecionado <
        inicioEvento
    ) {

        mostrarAlertaHub(
            'alertAgenda',
            'O compromisso não pode começar antes do início do evento.',
            'warning'
        );

        return;
    }


    if (
        fimEvento &&
        !Number.isNaN(
            fimEvento.getTime()
        ) &&
        inicioSelecionado >
        fimEvento
    ) {

        mostrarAlertaHub(
            'alertAgenda',
            'O compromisso não pode começar após o término do evento.',
            'warning'
        );

        return;
    }


if (
    dataFim &&
    new Date(dataFim) <
    new Date(dataInicio)
) {

    mostrarAlertaHub(
        'alertAgenda',
        'A data final não pode ser anterior à data inicial.',
        'warning'
    );

    return;

}

    if (
    dataFim &&
    fimEvento &&
    !Number.isNaN(
        fimEvento.getTime()
    ) &&
    new Date(dataFim) >
    fimEvento
) {

    mostrarAlertaHub(
        'alertAgenda',
        'O compromisso não pode terminar após o término do evento.',
        'warning'
    );

    return;
}


const btn =
    document.getElementById(
        'btnSalvarAgenda'
    );


const htmlOriginal =
    btn.innerHTML;


btn.disabled =
    true;


btn.innerHTML = `

    <span
        class="spinner-border spinner-border-sm me-2"
    ></span>

    Salvando...

`;


esconderAlertaHub(
    'alertAgenda'
);


try {

    const response =
        await Auth.fetchAutenticado(

            `/agenda/evento/${eventoAtual.id}`,

            {

                method:
                    'POST',


                body:
                    JSON.stringify({

                        titulo:
                            titulo,


                        descricao:
                            descricao ||
                            null,


                        dataInicio:
                            dataInicio,


                        dataFim:
                            dataFim ||
                            null,


                        tipo:
                            tipo

                    })

            }

        );


    const data =
        await response
            .json()
            .catch(
                () => ({})
            );


    if (!response.ok) {

        throw new Error(

            extrairErroHub(

                data,

                'Não foi possível adicionar o item à agenda.'

            )

        );

    }


    mostrarAlertaHub(
        'alertAgenda',
        'Item adicionado à agenda com sucesso!',
        'success'
    );


    document.getElementById(
        'formAgenda'
    )?.reset();


    await carregarAgenda();


} catch (error) {

    console.error(
        'Erro ao criar item da agenda:',
        error
    );


    mostrarAlertaHub(
        'alertAgenda',
        error.message ||
        'Não foi possível adicionar o item à agenda.',
        'danger'
    );


} finally {

    btn.disabled =
        false;


    btn.innerHTML =
        htmlOriginal;

}

}

// ==========================================================
// EXCLUIR ITEM DA AGENDA
// ==========================================================

async function excluirItemAgenda(
agendaId
) {

const confirmar =
    window.confirm(
        'Deseja excluir este item da agenda?'
    );


if (!confirmar) {
    return;
}


try {

    const response =
        await Auth.fetchAutenticado(

            `/agenda/${agendaId}`,

            {

                method:
                    'DELETE'

            }

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível excluir o item.'

            )

        );

    }


    await carregarAgenda();


} catch (error) {

    console.error(
        'Erro ao excluir item da agenda:',
        error
    );


    mostrarAlertaHub(
        'alertAgenda',
        error.message ||
        'Não foi possível excluir o item.',
        'danger'
    );

}

}

// ==========================================================

// CARREGAR TAREFAS
// ==========================================================

async function carregarTarefas() {

const container =
    document.getElementById(
        'containerTarefas'
    );


if (!container) {
    return;
}


// ======================================================
// COLABORADOR SEM PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual?.podeTarefas
    )
) {

    return;

}


container.innerHTML = `

    <div
        class="text-center py-5"
    >

        <div
            class="spinner-border spinner-border-sm text-primary"
        ></div>


        <span
            class="text-muted-theme ms-2"
        >

            Carregando tarefas...

        </span>

    </div>

`;


try {

    const response =
        await Auth.fetchAutenticado(

            `/tarefas/evento/${eventoAtual.id}`

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível carregar as tarefas.'

            )

        );

    }


    const dados =
        await response.json();


    tarefasCache =
        Array.isArray(
            dados
        )
            ? dados
            : [];


    preencherResponsaveisTarefa();


    renderizarTarefas();


} catch (error) {

    console.error(
        'Erro ao carregar tarefas:',
        error
    );


    container.innerHTML = `

        <div
            class="alert alert-danger"
        >

            <i
                class="bi bi-exclamation-triangle me-2"
            ></i>

            ${
                escapeHtmlHub(
                    error.message ||
                    'Não foi possível carregar as tarefas.'
                )
            }

        </div>

    `;

}

}

// ==========================================================
// PREENCHER RESPONSÁVEIS
// ==========================================================

function preencherResponsaveisTarefa() {

const select =
    document.getElementById(
        'selectTarefaResponsavel'
    );


if (
    !select ||
    !eventoAtual
) {

    return;

}


const pessoas =
    [];


// ======================================================
// ORGANIZADOR
// ======================================================

if (
    eventoAtual.organizadorId
) {

    pessoas.push({

        id:
            Number(
                eventoAtual.organizadorId
            ),


        nome:
            eventoAtual.organizadorNome ||
            'Organizador',


        funcao:
            'Organizador'

    });

}


// ======================================================
// COLABORADORES ATIVOS
// ======================================================

colaboradoresCache
    .filter(
        colaborador =>
            colaborador.status ===
            'ACEITO'
    )
    .forEach(
        colaborador => {

            const jaExiste =
                pessoas.some(
                    pessoa =>
                        Number(
                            pessoa.id
                        ) ===
                        Number(
                            colaborador.usuarioId
                        )
                );


            if (!jaExiste) {

                pessoas.push({

                    id:
                        Number(
                            colaborador.usuarioId
                        ),


                    nome:
                        colaborador.usuarioNome ||
                        'Colaborador',


                    funcao:
                        colaborador.funcao ||
                        'Colaborador'

                });

            }

        }
    );


// ======================================================
// OPTIONS
// ======================================================

select.innerHTML = `

    <option value="">

        Sem responsável definido

    </option>


    ${
        pessoas
            .map(

                pessoa => `

                    <option
                        value="${pessoa.id}"
                    >

                        ${
                            escapeHtmlHub(
                                pessoa.nome
                            )
                        }

                        — 

                        ${
                            escapeHtmlHub(
                                pessoa.funcao
                            )
                        }

                    </option>

                `

            )
            .join('')
    }

`;

}

// ==========================================================
// RENDERIZAR TAREFAS
// ==========================================================

function renderizarTarefas() {

const container =
    document.getElementById(
        'containerTarefas'
    );


if (!container) {
    return;
}


if (
    tarefasCache.length === 0
) {

    container.innerHTML = `

        <div
            class="text-center py-5"
        >

            <i
                class="bi bi-clipboard-check text-muted-theme"
                style="font-size: 3rem;"
            ></i>


            <h5
                class="text-main-theme mt-3 mb-1"
            >

                Nenhuma tarefa

            </h5>


            <p
                class="text-muted-theme mb-0"
            >

                A equipe ainda não possui tarefas cadastradas.

            </p>

        </div>

    `;


    return;

}


container.innerHTML =
    tarefasCache
        .map(
            tarefa =>
                criarCardTarefa(
                    tarefa
                )
        )
        .join('');

}

// ==========================================================
// CARD DA TAREFA
// ==========================================================

function criarCardTarefa(
tarefa
) {

const prioridade =
    obterPrioridadeTarefa(
        tarefa.prioridade
    );


const status =
    obterStatusTarefa(
        tarefa.status
    );


return `

    <div
        class="border rounded p-3 mb-3"
    >

        <div
            class="d-flex flex-column flex-md-row justify-content-between gap-3"
        >

            <div
                class="flex-grow-1"
            >

                <div
                    class="d-flex flex-wrap gap-2 mb-2"
                >

                    <span
                        class="badge ${prioridade.classe}"
                    >

                        ${prioridade.texto}

                    </span>


                    <span
                        class="badge ${status.classe}"
                    >

                        ${status.texto}

                    </span>

                </div>


                <h6
                    class="fw-bold text-main-theme mb-1"
                >

                    ${
                        escapeHtmlHub(
                            tarefa.titulo ||
                            'Tarefa'
                        )
                    }

                </h6>


                ${
                    tarefa.descricao
                        ? `
                            <p
                                class="small text-muted-theme mb-2"
                            >

                                ${
                                    escapeHtmlHub(
                                        tarefa.descricao
                                    )
                                }

                            </p>
                        `
                        : ''
                }


                <div
                    class="small text-muted-theme"
                >

                    <div
                        class="mb-1"
                    >

                        <i
                            class="bi bi-person me-1"
                        ></i>

                        Responsável:

                        ${
                            escapeHtmlHub(
                                tarefa.responsavelNome ||
                                'Não definido'
                            )
                        }

                    </div>


                    ${
                        tarefa.prazo
                            ? `
                                <div>

                                    <i
                                        class="bi bi-clock me-1"
                                    ></i>

                                    Prazo:

                                    ${
                                        formatarDataHoraHub(
                                            tarefa.prazo
                                        )
                                    }

                                </div>
                            `
                            : ''
                    }

                </div>

            </div>


            <div
                class="d-flex flex-md-column flex-wrap gap-2"
            >

                <!-- STATUS -->
                <select
                    class="form-select form-select-sm"
                    onchange="alterarStatusTarefa(
                        ${Number(tarefa.id)},
                        this.value
                    )"
                >

                    <option
                        value="PENDENTE"
                        ${
                            tarefa.status ===
                            'PENDENTE'
                                ? 'selected'
                                : ''
                        }
                    >

                        Pendente

                    </option>


                    <option
                        value="EM_ANDAMENTO"
                        ${
                            tarefa.status ===
                            'EM_ANDAMENTO'
                                ? 'selected'
                                : ''
                        }
                    >

                        Em andamento

                    </option>


                    <option
                        value="CONCLUIDA"
                        ${
                            tarefa.status ===
                            'CONCLUIDA'
                                ? 'selected'
                                : ''
                        }
                    >

                        Concluída

                    </option>


                    <option
                        value="CANCELADA"
                        ${
                            tarefa.status ===
                            'CANCELADA'
                                ? 'selected'
                                : ''
                        }
                    >

                        Cancelada

                    </option>

                </select>


                <!-- EXCLUIR -->
                <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    onclick="excluirTarefa(
                        ${Number(tarefa.id)}
                    )"
                >

                    <i
                        class="bi bi-trash me-1"
                    ></i>

                    Excluir

                </button>

            </div>

        </div>

    </div>

`;

}

// ==========================================================
// PRIORIDADE
// ==========================================================

function obterPrioridadeTarefa(
prioridade
) {

switch (prioridade) {

    case 'URGENTE':

        return {

            texto:
                'Urgente',

            classe:
                'bg-danger'

        };


    case 'ALTA':

        return {

            texto:
                'Alta',

            classe:
                'bg-warning text-dark'

        };


    case 'BAIXA':

        return {

            texto:
                'Baixa',

            classe:
                'bg-secondary'

        };


    case 'MEDIA':

    default:

        return {

            texto:
                'Média',

            classe:
                'bg-primary'

        };

}

}

// ==========================================================
// STATUS
// ==========================================================

function obterStatusTarefa(
status
) {

switch (status) {

    case 'EM_ANDAMENTO':

        return {

            texto:
                'Em andamento',

            classe:
                'bg-info text-dark'

        };


    case 'CONCLUIDA':

        return {

            texto:
                'Concluída',

            classe:
                'bg-success'

        };


    case 'CANCELADA':

        return {

            texto:
                'Cancelada',

            classe:
                'bg-secondary'

        };


    case 'PENDENTE':

    default:

        return {

            texto:
                'Pendente',

            classe:
                'bg-warning text-dark'

        };

}

}

// ==========================================================
// CRIAR TAREFA
// ==========================================================

async function criarTarefa(
event
) {

event.preventDefault();


// ======================================================
// PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual?.podeTarefas
    )
) {

    mostrarAlertaHub(
        'alertTarefas',
        'Você não possui permissão para gerenciar tarefas.',
        'danger'
    );

    return;

}


const titulo =
    document.getElementById(
        'inputTarefaTitulo'
    ).value.trim();


const descricao =
    document.getElementById(
        'inputTarefaDescricao'
    ).value.trim();


const prioridade =
    document.getElementById(
        'selectTarefaPrioridade'
    ).value;


const responsavel =
    document.getElementById(
        'selectTarefaResponsavel'
    ).value;


const prazo =
    document.getElementById(
        'inputTarefaPrazo'
    ).value;


if (!titulo) {

    mostrarAlertaHub(
        'alertTarefas',
        'Informe o título da tarefa.',
        'warning'
    );

    return;

}


const btn =
    document.getElementById(
        'btnSalvarTarefa'
    );


const htmlOriginal =
    btn.innerHTML;


btn.disabled =
    true;


btn.innerHTML = `

    <span
        class="spinner-border spinner-border-sm me-2"
    ></span>

    Criando...

`;


esconderAlertaHub(
    'alertTarefas'
);


try {

    const response =
        await Auth.fetchAutenticado(

            `/tarefas/evento/${eventoAtual.id}`,

            {

                method:
                    'POST',


                body:
                    JSON.stringify({

                        responsavelId:
                            responsavel
                                ? Number(
                                    responsavel
                                )
                                : null,


                        titulo:
                            titulo,


                        descricao:
                            descricao ||
                            null,


                        prioridade:
                            prioridade,


                        prazo:
                            prazo ||
                            null

                    })

            }

        );


    const data =
        await response
            .json()
            .catch(
                () => ({})
            );


    if (!response.ok) {

        throw new Error(

            extrairErroHub(

                data,

                'Não foi possível criar a tarefa.'

            )

        );

    }


    mostrarAlertaHub(
        'alertTarefas',
        'Tarefa criada com sucesso!',
        'success'
    );


    document.getElementById(
        'formTarefa'
    )?.reset();


    const selectPrioridade =
        document.getElementById(
            'selectTarefaPrioridade'
        );


    if (selectPrioridade) {

        selectPrioridade.value =
            'MEDIA';

    }


    await carregarTarefas();


} catch (error) {

    console.error(
        'Erro ao criar tarefa:',
        error
    );


    mostrarAlertaHub(
        'alertTarefas',
        error.message ||
        'Não foi possível criar a tarefa.',
        'danger'
    );


} finally {

    btn.disabled =
        false;


    btn.innerHTML =
        htmlOriginal;

}

}

// ==========================================================
// ALTERAR STATUS
// ==========================================================

async function alterarStatusTarefa(
tarefaId,
status
) {

try {

    const response =
        await Auth.fetchAutenticado(

            `/tarefas/${tarefaId}/status?status=${encodeURIComponent(
                status
            )}`,

            {

                method:
                    'PUT'

            }

        );


    const data =
        await response
            .json()
            .catch(
                () => ({})
            );


    if (!response.ok) {

        throw new Error(

            extrairErroHub(

                data,

                'Não foi possível atualizar a tarefa.'

            )

        );

    }


    await carregarTarefas();


} catch (error) {

    console.error(
        'Erro ao alterar status da tarefa:',
        error
    );


    mostrarAlertaHub(
        'alertTarefas',
        error.message ||
        'Não foi possível atualizar a tarefa.',
        'danger'
    );


    await carregarTarefas();

}

}

// ==========================================================
// EXCLUIR TAREFA
// ==========================================================

async function excluirTarefa(
tarefaId
) {

const confirmar =
    window.confirm(
        'Deseja excluir esta tarefa?'
    );


if (!confirmar) {
    return;
}


try {

    const response =
        await Auth.fetchAutenticado(

            `/tarefas/${tarefaId}`,

            {

                method:
                    'DELETE'

            }

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível excluir a tarefa.'

            )

        );

    }


    await carregarTarefas();


} catch (error) {

    console.error(
        'Erro ao excluir tarefa:',
        error
    );


    mostrarAlertaHub(
        'alertTarefas',
        error.message ||
        'Não foi possível excluir a tarefa.',
        'danger'
    );

}

}

// ==========================================================

// CARREGAR MENSAGENS
// ==========================================================

async function carregarMensagens() {

const container =
    document.getElementById(
        'containerMensagens'
    );


if (!container) {
    return;
}


// ======================================================
// COLABORADOR SEM PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual?.podeChat
    )
) {

    return;

}


try {

    const response =
        await Auth.fetchAutenticado(

            `/mensagens/evento/${eventoAtual.id}`

        );


    if (!response.ok) {

        const erro =
            await lerErroHub(
                response
            );


        throw new Error(

            extrairErroHub(

                erro,

                'Não foi possível carregar o chat.'

            )

        );

    }


    const dados =
        await response.json();


    mensagensCache =
        Array.isArray(
            dados
        )
            ? dados
            : [];


    renderizarMensagens();


} catch (error) {

    console.error(
        'Erro ao carregar mensagens:',
        error
    );


    container.innerHTML = `

        <div
            class="alert alert-danger"
        >

            <i
                class="bi bi-exclamation-triangle me-2"
            ></i>

            ${
                escapeHtmlHub(
                    error.message ||
                    'Não foi possível carregar o chat.'
                )
            }

        </div>

    `;

}

}

// ==========================================================
// RENDERIZAR MENSAGENS
// ==========================================================

function renderizarMensagens() {

const container =
    document.getElementById(
        'containerMensagens'
    );


if (!container) {
    return;
}


if (
    mensagensCache.length === 0
) {

    container.innerHTML = `

        <div
            class="text-center py-5"
        >

            <i
                class="bi bi-chat-square-text text-muted-theme"
                style="font-size: 3rem;"
            ></i>


            <h5
                class="text-main-theme mt-3 mb-1"
            >

                Nenhuma mensagem

            </h5>


            <p
                class="text-muted-theme mb-0"
            >

                Inicie a conversa com a equipe.

            </p>

        </div>

    `;


    return;

}


const usuarioId =
    Number(
        Auth.getUsuarioId()
    );


container.innerHTML =
    mensagensCache
        .map(

            mensagem => {

                const propria =
                    Number(
                        mensagem.usuarioId
                    ) ===
                    usuarioId;


                return `

                    <div
                        class="d-flex ${
                            propria
                                ? 'justify-content-end'
                                : 'justify-content-start'
                        } mb-3"
                    >

                        <div
                            class="rounded-3 p-3 border ${
                                propria
                                    ? 'bg-primary-subtle'
                                    : 'bg-card-theme'
                            }"
                            style="max-width: 78%;"
                        >

                            <div
                                class="d-flex align-items-center gap-2 mb-1"
                            >

                                <strong
                                    class="small text-main-theme"
                                >

                                    ${
                                        propria
                                            ? 'Você'
                                            : escapeHtmlHub(
                                                mensagem.usuarioNome ||
                                                'Usuário'
                                            )
                                    }

                                </strong>


                                <small
                                    class="text-muted-theme"
                                >

                                    ${
                                        formatarDataHoraHub(
                                            mensagem.dataEnvio
                                        )
                                    }

                                </small>

                            </div>


                            <div
                                class="text-main-theme"
                            >

                                ${
                                    escapeHtmlHub(
                                        mensagem.mensagem ||
                                        ''
                                    )
                                }

                            </div>

                        </div>

                    </div>

                `;

            }

        )
        .join('');


// ======================================================
// ROLAR PARA A ÚLTIMA MENSAGEM
// ======================================================

container.scrollTop =
    container.scrollHeight;

}

// ==========================================================
// ENVIAR MENSAGEM
// ==========================================================

async function enviarMensagemChat(
event
) {

event.preventDefault();


// ======================================================
// PERMISSÃO
// ======================================================

if (
    !usuarioEhOrganizador &&
    !Boolean(
        colaboradorAtual?.podeChat
    )
) {

    mostrarAlertaHub(
        'alertChat',
        'Você não possui permissão para acessar o chat.',
        'danger'
    );

    return;

}


const input =
    document.getElementById(
        'inputMensagemChat'
    );


const mensagem =
    input.value.trim();


if (!mensagem) {

    mostrarAlertaHub(
        'alertChat',
        'Digite uma mensagem.',
        'warning'
    );

    return;

}


const btn =
    document.getElementById(
        'btnEnviarMensagem'
    );


const htmlOriginal =
    btn.innerHTML;


btn.disabled =
    true;


btn.innerHTML = `

    <span
        class="spinner-border spinner-border-sm"
    ></span>

`;


esconderAlertaHub(
    'alertChat'
);


try {

    const response =
        await Auth.fetchAutenticado(

            `/mensagens/evento/${eventoAtual.id}`,

            {

                method:
                    'POST',


                body:
                    JSON.stringify({

                        mensagem:
                            mensagem

                    })

            }

        );


    const data =
        await response
            .json()
            .catch(
                () => ({})
            );


    if (!response.ok) {

        throw new Error(

            extrairErroHub(

                data,

                'Não foi possível enviar a mensagem.'

            )

        );

    }


    input.value =
        '';


    await carregarMensagens();


    input.focus();


} catch (error) {

    console.error(
        'Erro ao enviar mensagem:',
        error
    );


    mostrarAlertaHub(
        'alertChat',
        error.message ||
        'Não foi possível enviar a mensagem.',
        'danger'
    );


} finally {

    btn.disabled =
        false;


    btn.innerHTML =
        htmlOriginal;

}

}

// ==========================================================
// CARREGAR USUÁRIO NA NAVBAR
// ==========================================================

function carregarUsuarioNavbar() {

const usuario =
    Auth.getUsuario();


if (!usuario) {
    return;
}


definirTextoHub(
    'nav-nome-usuario',
    usuario.nome ||
    'Usuário'
);


definirTextoHub(
    'nav-perfil-usuario',
    formatarPerfilHub(
        usuario.perfil
    )
);

}

// ==========================================================
// FORMATAR PERFIL
// ==========================================================

function formatarPerfilHub(
perfil
) {

switch (perfil) {

    case 'ADMIN':

        return 'Administrador';


    case 'FUNCIONARIO':

        return 'Funcionário';


    case 'USUARIO':

    default:

        return 'Usuário';

}

}

// ==========================================================
// ATUALIZAR IDENTIFICAÇÃO NO HUB
// ==========================================================

function atualizarIdentificacaoUsuario() {

if (usuarioEhOrganizador) {

    definirTextoHub(
        'badgeFuncaoUsuario',
        'Organizador'
    );


    definirTextoHub(
        'hubFuncaoUsuario',
        'Organizador'
    );


    return;

}


if (colaboradorAtual) {

    const funcao =
        colaboradorAtual.funcao ||
        'Colaborador';


    definirTextoHub(
        'badgeFuncaoUsuario',
        funcao
    );


    definirTextoHub(
        'hubFuncaoUsuario',
        funcao
    );

}

}

// ==========================================================
// ATUALIZAR RESUMOS
// ==========================================================

function atualizarResumos() {

// ======================================================
// COLABORADORES ATIVOS
// ======================================================

atualizarResumoHub(

    'resumoColaboradores',

    colaboradoresCache.filter(

        colaborador =>
            colaborador.status ===
            'ACEITO'

    ).length

);


// ======================================================
// INSCRITOS
// ======================================================

atualizarResumoHub(

    'resumoInscritos',

    inscricoesCache.filter(

        inscricao =>
            inscricao.status !==
            'CANCELADO'

    ).length

);


// ======================================================
// PRESENÇAS
// ======================================================

atualizarResumoHub(

    'resumoPresencas',

    presencasCache.length

);


atualizarIdentificacaoUsuario();


mostrarConteudoHub();

}

// ==========================================================
// ATUALIZAR UM RESUMO
// ==========================================================

function atualizarResumoHub(
id,
valor
) {

const elemento =
    document.getElementById(
        id
    );


if (!elemento) {
    return;
}


elemento.textContent =
    Number(valor) || 0;

}

// ==========================================================
// DEFINIR TEXTO
// ==========================================================

function definirTextoHub(
id,
texto
) {

const elemento =
    document.getElementById(
        id
    );


if (!elemento) {
    return;
}


elemento.textContent =
    texto ?? '';

}

// ==========================================================
// MOSTRAR ALERTA
// ==========================================================

function mostrarAlertaHub(
id,
mensagem,
tipo = 'danger'
) {

const alerta =
    document.getElementById(
        id
    );


if (!alerta) {
    return;
}


alerta.className =
    `alert alert-${tipo}`;


alerta.textContent =
    mensagem;


alerta.classList.remove(
    'd-none'
);

}

// ==========================================================
// ESCONDER ALERTA
// ==========================================================

function esconderAlertaHub(
id
) {

const alerta =
    document.getElementById(
        id
    );


if (!alerta) {
    return;
}


alerta.classList.add(
    'd-none'
);


alerta.textContent =
    '';

}

// ==========================================================
// LER ERRO DA API
// ==========================================================

async function lerErroHub(
response
) {

try {

    const contentType =
        response.headers.get(
            'content-type'
        );


    if (
        contentType &&
        contentType.includes(
            'application/json'
        )
    ) {

        return await response.json();

    }


    const texto =
        await response.text();


    if (texto) {

        return {
            mensagem:
                texto
        };

    }


    return {};


} catch (error) {

    console.warn(
        'Não foi possível ler a resposta de erro:',
        error
    );


    return {};

}

}

// ==========================================================
// EXTRAIR MENSAGEM DO ERRO
// ==========================================================

function extrairErroHub(
erro,
mensagemPadrao
) {

if (!erro) {

    return mensagemPadrao;

}


if (
    typeof erro ===
    'string'
) {

    return erro;

}


return (
    erro.mensagem ||
    erro.message ||
    erro.erro ||
    erro.error ||
    mensagemPadrao
);

}

// ==========================================================
// FORMATAR DATA E HORA
// ==========================================================

function formatarDataHoraHub(
valor
) {

if (!valor) {

    return '-';

}


const data =
    new Date(
        valor
    );


if (
    Number.isNaN(
        data.getTime()
    )
) {

    return '-';

}


return data.toLocaleString(
    'pt-BR',
    {

        day:
            '2-digit',

        month:
            '2-digit',

        year:
            'numeric',

        hour:
            '2-digit',

        minute:
            '2-digit'

    }
);

}

// ==========================================================
// ESCAPAR HTML
//
// Impede que textos vindos da API sejam interpretados
// como código HTML.
// ==========================================================

function escapeHtmlHub(
valor
) {

if (
    valor === null ||
    valor === undefined
) {

    return '';

}


return String(
    valor
)

    .replaceAll(
        '&',
        '&amp;'
    )

    .replaceAll(
        '<',
        '&lt;'
    )

    .replaceAll(
        '>',
        '&gt;'
    )

    .replaceAll(
        '"',
        '&quot;'
    )

    .replaceAll(
        "'",
        '&#039;'
    );

}

// ==========================================================
// MOSTRAR CONTEÚDO DO HUB
// ==========================================================

function mostrarConteudoHub() {

const loading =
    document.getElementById(
        'loadingHub'
    );


const erro =
    document.getElementById(
        'erroHub'
    );


const conteudo =
    document.getElementById(
        'conteudoHub'
    );


loading
    ?.classList.add(
        'd-none'
    );


erro
    ?.classList.add(
        'd-none'
    );


conteudo
    ?.classList.remove(
        'd-none'
    );

}

// ==========================================================
// MOSTRAR ERRO DA PÁGINA
// ==========================================================

function mostrarErroPagina(
mensagem
) {

const loading =
    document.getElementById(
        'loadingHub'
    );


const erro =
    document.getElementById(
        'erroHub'
    );


const conteudo =
    document.getElementById(
        'conteudoHub'
    );


const texto =
    document.getElementById(
        'mensagemErroHub'
    );


loading
    ?.classList.add(
        'd-none'
    );


conteudo
    ?.classList.add(
        'd-none'
    );


erro
    ?.classList.remove(
        'd-none'
    );


if (texto) {

    texto.textContent =
        mensagem ||
        'Não foi possível acessar o Hub.';

}

}

// ==========================================================
// EXPORTAÇÕES GLOBAIS
// ==========================================================

window.abrirPermissoesColaborador =
abrirPermissoesColaborador;

window.excluirItemAgenda =
excluirItemAgenda;

window.alterarStatusTarefa =
alterarStatusTarefa;

window.excluirTarefa =
excluirTarefa;