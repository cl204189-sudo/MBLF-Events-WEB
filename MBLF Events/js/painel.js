// ==========================================================
// MBLF EVENTS
// painel.js
// ==========================================================


// ==========================================================
// ESTADO GLOBAL
// ==========================================================

let inscricoesCache = [];
let eventosCache = [];
let colaboracoesCache = [];
let certificadosCache = [];
let notificacoesCache = [];


// ==========================================================
// INTERNACIONALIZAÇÃO
// ==========================================================

function t(
    chave,
    fallback = ''
) {

    if (
        window.I18n &&
        typeof I18n.t === 'function'
    ) {

        const traducao =
            I18n.t(chave);

        if (
            traducao &&
            traducao !== chave
        ) {

            return traducao;

        }

    }

    return fallback || chave;
}


// ==========================================================
// TRADUÇÃO COM VARIÁVEIS
//
// Exemplo:
// tp(
//     'painelVagasDisponiveis',
//     '{disponiveis} de {total} vagas disponíveis',
//     {
//         disponiveis: 5,
//         total: 20
//     }
// )
// ==========================================================

function tp(
    chave,
    fallback,
    parametros = {}
) {

    let texto =
        t(
            chave,
            fallback
        );


    Object.entries(
        parametros
    ).forEach(
        ([nome, valor]) => {

            texto =
                texto.replaceAll(
                    `{${nome}}`,
                    String(
                        valor ?? ''
                    )
                );

        }
    );


    return texto;
}


// ==========================================================
// IDIOMA / LOCALE ATUAL
// ==========================================================

function obterLocaleAtual() {

    const idioma =
        window.I18n &&
        typeof I18n.getIdioma === 'function'
            ? I18n.getIdioma()
            : 'pt';


    switch (idioma) {

        case 'en':

            return 'en-US';


        case 'es':

            return 'es-ES';


        case 'pt':

        default:

            return 'pt-BR';

    }

}


// ==========================================================
// QUANDO O IDIOMA FOR ALTERADO
// ==========================================================

window.addEventListener(
    'mblf:idiomaAlterado',
    async function () {

        carregarDadosUsuario();


        await Promise.allSettled([

            carregarInscricoes(),

            carregarMeusEventos(),

            carregarEventosColaborador(),

            carregarCertificados(),

            carregarNotificacoes()

        ]);

    }
);


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
    'DOMContentLoaded',
    inicializarPainel
);


async function inicializarPainel() {

    // ======================================================
    // PROTEGER PÁGINA
    // ======================================================

    if (
        !window.Auth ||
        !Auth.protegerPagina()
    ) {

        return;

    }


    // ======================================================
    // USUÁRIO
    // ======================================================

    carregarDadosUsuario();


    // ======================================================
    // CARREGAMENTOS
    // ======================================================

    await Promise.allSettled([

        carregarInscricoes(),

        carregarMeusEventos(),

        carregarEventosColaborador(),

        carregarCertificados(),

        carregarNotificacoes()

    ]);

}


// ==========================================================
// CARREGAR DADOS DO USUÁRIO
// ==========================================================

function carregarDadosUsuario() {

    const usuario =
        Auth.getUsuario();


    if (!usuario) {

        return;

    }


    // ======================================================
    // NOME NA NAVBAR
    // ======================================================

    definirTexto(
        'nav-nome-usuario',
        usuario.nome ||
        t(
            'perfilUsuario',
            'Usuário'
        )
    );


    // ======================================================
    // PERFIL NA NAVBAR
    // ======================================================

    definirTexto(
        'nav-perfil-usuario',
        formatarPerfil(
            usuario.perfil
        )
    );


    // ======================================================
    // SAUDAÇÃO
    // ======================================================

    const primeiroNome =
        obterPrimeiroNome(
            usuario.nome
        );


    definirTexto(
        'boas-vindas-titulo',
        primeiroNome
            ? tp(
                'painelOlaNome',
                'Olá, {nome}!',
                {
                    nome:
                        primeiroNome
                }
            )
            : t(
                'painelOla',
                'Olá!'
            )
    );


    // ======================================================
    // E-MAIL
    // ======================================================

    definirTexto(
        'emailUsuario',
        usuario.email ||
        ''
    );


    // ======================================================
    // CONTROLE POR PERFIL
    // ======================================================

    configurarInterfacePorPerfil(
        usuario.perfil
    );

}


// ==========================================================
// INTERFACE BASEADA NO PERFIL
// ==========================================================

function configurarInterfacePorPerfil(
    perfil
) {

    const btnCriarEvento =
        document.getElementById(
            'btnCriarEvento'
        );


    const secaoOrganizador =
        document.getElementById(
            'secaoMeusEventos'
        );


    if (btnCriarEvento) {

        btnCriarEvento.classList.remove(
            'd-none'
        );

    }


    if (secaoOrganizador) {

        secaoOrganizador.classList.remove(
            'd-none'
        );

    }

}


// ==========================================================
// FORMATAR PERFIL
// ==========================================================

function formatarPerfil(
    perfil
) {

    switch (perfil) {

        case 'ADMIN':

            return t(
                'perfilAdmin',
                'Administrador'
            );


        case 'FUNCIONARIO':

            return t(
                'perfilFuncionario',
                'Funcionário'
            );


        case 'USUARIO':

            return t(
                'perfilUsuario',
                'Usuário'
            );


        default:

            return (
                perfil ||
                t(
                    'perfilUsuario',
                    'Usuário'
                )
            );

    }

}


// ==========================================================
// PRIMEIRO NOME
// ==========================================================

function obterPrimeiroNome(
    nome
) {

    if (!nome) {

        return '';

    }


    return String(nome)
        .trim()
        .split(/\s+/)[0];

}


// ==========================================================
// VERIFICAR DATA VÁLIDA
// ==========================================================

function dataAindaValida(
    data,
    agora = new Date()
) {

    if (!data) {

        return false;

    }


    const dataConvertida =
        new Date(
            data
        );


    if (
        Number.isNaN(
            dataConvertida.getTime()
        )
    ) {

        return false;

    }


    return dataConvertida >
        agora;

}


// ==========================================================
// FORMATAR DATA
// ==========================================================

function formatarData(
    data
) {

    if (!data) {

        return t(
            'painelNaoInformada',
            'Não informada'
        );

    }


    const valor =
        new Date(
            data
        );


    if (
        Number.isNaN(
            valor.getTime()
        )
    ) {

        return t(
            'painelNaoInformada',
            'Não informada'
        );

    }


    return valor.toLocaleDateString(
        obterLocaleAtual()
    );

}


// ==========================================================
// FORMATAR DATA + HORA
// ==========================================================

function formatarDataHora(
    data
) {

    if (!data) {

        return t(
            'painelNaoInformada',
            'Não informada'
        );

    }


    const valor =
        new Date(
            data
        );


    if (
        Number.isNaN(
            valor.getTime()
        )
    ) {

        return t(
            'painelNaoInformada',
            'Não informada'
        );

    }


    return valor.toLocaleString(
        obterLocaleAtual(),
        {

            dateStyle:
                'short',

            timeStyle:
                'short'

        }
    );

}


// ==========================================================
// FORMATAR MOEDA
// ==========================================================

function formatarMoeda(
    valor
) {

    const numero =
        Number(
            valor ?? 0
        );


    if (
        Number.isNaN(
            numero
        )
    ) {

        return Number(0)
            .toLocaleString(
                obterLocaleAtual(),
                {
                    style:
                        'currency',

                    currency:
                        'BRL'
                }
            );

    }


    return numero.toLocaleString(
        obterLocaleAtual(),
        {
            style:
                'currency',

            currency:
                'BRL'
        }
    );

}


// ==========================================================
// RESUMIR TEXTO
// ==========================================================

function resumirTexto(
    texto,
    limite = 140
) {

    if (!texto) {

        return '';

    }


    const valor =
        String(
            texto
        );


    if (
        valor.length <=
        limite
    ) {

        return valor;

    }


    return (
        valor
            .substring(
                0,
                limite
            )
            .trim() +
        '...'
    );

}


// ==========================================================
// DEFINIR TEXTO
// ==========================================================

function definirTexto(
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
// ESCAPE HTML
// ==========================================================

function escapeHtml(
    valor
) {

    const elemento =
        document.createElement(
            'div'
        );


    elemento.textContent =
        String(
            valor ?? ''
        );


    return elemento.innerHTML;

}


// ==========================================================
// EXTRAIR MENSAGEM DE ERRO
// ==========================================================

function extrairMensagemErro(
    data,
    mensagemPadrao
) {

    if (!data) {

        return mensagemPadrao;

    }


    if (
        typeof data ===
        'string'
    ) {

        return (
            data.trim() ||
            mensagemPadrao
        );

    }


    return (
        data.mensagem ||
        data.message ||
        data.erro ||
        mensagemPadrao
    );

}


// ==========================================================
// LER RESPOSTA DE ERRO
// ==========================================================

async function lerRespostaErro(
    response
) {

    try {

        const clone =
            response.clone();


        return await clone.json();

    } catch (error) {

        try {

            return await response.text();

        } catch (erroTexto) {

            return {};

        }

    }

}


// ==========================================================
// STATUS DO EVENTO
// ==========================================================

function obterStatusEvento(
    status
) {

    switch (status) {

        case 'PUBLICADO':

            return {

                texto:
                    t(
                        'painelStatusPublicado',
                        'Publicado'
                    ),

                classe:
                    'bg-success'

            };


        case 'ENCERRADO':

            return {

                texto:
                    t(
                        'painelStatusEncerrado',
                        'Encerrado'
                    ),

                classe:
                    'bg-secondary'

            };


        case 'CANCELADO':

            return {

                texto:
                    t(
                        'painelStatusCancelado',
                        'Cancelado'
                    ),

                classe:
                    'bg-danger'

            };


        case 'REMOVIDO_ADMIN':

            return {

                texto:
                    t(
                        'painelStatusRemovido',
                        'Removido'
                    ),

                classe:
                    'bg-danger'

            };


        case 'RASCUNHO':

        default:

            return {

                texto:
                    t(
                        'painelStatusRascunho',
                        'Rascunho'
                    ),

                classe:
                    'bg-warning text-dark'

            };

    }

}


// ==========================================================
// STATUS DA INSCRIÇÃO
// ==========================================================

function obterStatusInscricao(
    status
) {

    switch (status) {

        case 'PRESENTE':

            return {

                texto:
                    t(
                        'painelStatusPresencaConfirmada',
                        'Presença confirmada'
                    ),

                classe:
                    'bg-success'

            };


        case 'CANCELADO':

            return {

                texto:
                    t(
                        'painelStatusInscricaoCancelada',
                        'Cancelada'
                    ),

                classe:
                    'bg-secondary'

            };


        case 'INSCRITO':

        default:

            return {

                texto:
                    t(
                        'painelStatusInscrito',
                        'Inscrito'
                    ),

                classe:
                    'bg-primary'

            };

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

function fazerLogout() {

    if (window.Auth) {

        Auth.logout();

    }

}


window.fazerLogout =
    fazerLogout;


// ==========================================================
// MINHAS INSCRIÇÕES
// ==========================================================

async function carregarInscricoes() {

    const container =
        document.getElementById(
            'lista-inscricoes-container'
        );


    if (!container) {

        return;

    }


    // ======================================================
    // LOADING
    // ======================================================

    container.innerHTML = `

        <div class="col-12 text-center py-5">

            <div
                class="spinner-border text-primary"
                role="status"
            ></div>

            <p class="text-muted-theme mt-3 mb-0">

                ${escapeHtml(
                    t(
                        'painelCarregandoInscricoes',
                        'Carregando suas inscrições...'
                    )
                )}

            </p>

        </div>

    `;


    try {

        const response =
            await Auth.fetchAutenticado(
                '/inscricoes/minhas'
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    t(
                        'painelErroInscricoes',
                        'Não foi possível carregar suas inscrições.'
                    )
                )
            );

        }


        const dados =
            await response.json();


        inscricoesCache =
            Array.isArray(dados)
                ? dados
                : [];


        atualizarResumo(
            'resumo-inscricoes',
            inscricoesCache.length
        );


        // ==================================================
        // NENHUMA INSCRIÇÃO
        // ==================================================

        if (
            inscricoesCache.length ===
            0
        ) {

            container.innerHTML = `

                <div class="col-12">

                    <div class="text-center py-5">

                        <i
                            class="bi bi-ticket-perforated text-muted"
                            style="font-size: 3rem;"
                        ></i>

                        <h5
                            class="fw-bold text-main-theme mt-3"
                        >

                            ${escapeHtml(
                                t(
                                    'painelNenhumaInscricao',
                                    'Nenhuma inscrição'
                                )
                            )}

                        </h5>

                        <p class="text-muted-theme">

                            ${escapeHtml(
                                t(
                                    'painelNenhumaInscricaoDesc',
                                    'Você ainda não está inscrito em nenhum evento.'
                                )
                            )}

                        </p>

                        <a
                            href="explorar.html"
                            class="btn btn-mblf-primary"
                        >

                            <i class="bi bi-compass me-1"></i>

                            ${escapeHtml(
                                t(
                                    'navExplorar',
                                    'Explorar Eventos'
                                )
                            )}

                        </a>

                    </div>

                </div>

            `;


            return;

        }


        container.innerHTML =
            inscricoesCache
                .map(
                    criarCardInscricao
                )
                .join('');


    } catch (error) {

        console.error(
            'Erro ao carregar inscrições:',
            error
        );


        atualizarResumo(
            'resumo-inscricoes',
            0
        );


        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    <i
                        class="bi bi-exclamation-triangle me-2"
                    ></i>

                    ${escapeHtml(
                        error.message ||
                        t(
                            'painelErroInscricoes',
                            'Não foi possível carregar suas inscrições.'
                        )
                    )}

                </div>

            </div>

        `;

    }

}


// ==========================================================
// CRIAR CARD DE INSCRIÇÃO
// ==========================================================

function criarCardInscricao(
    inscricao
) {

    const status =
        inscricao.status ||
        'INSCRITO';


    const statusInfo =
        obterStatusInscricao(
            status
        );


    const dataInscricao =
        formatarData(
            inscricao.dataInscricao
        );


    let areaAcoes = '';


    // ======================================================
    // INSCRIÇÃO ATIVA
    // ======================================================

    if (
        status === 'INSCRITO'
    ) {

        areaAcoes = `

            <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                onclick="abrirModalQRCode(${Number(inscricao.id)})"
            >

                <i class="bi bi-qr-code me-1"></i>

                ${escapeHtml(
                    t(
                        'btnVerQRCode',
                        'Ver QR Code'
                    )
                )}

            </button>


            <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                onclick="cancelarInscricao(${Number(inscricao.id)})"
            >

                <i class="bi bi-x-circle me-1"></i>

                ${escapeHtml(
                    t(
                        'cancelar',
                        'Cancelar'
                    )
                )}

            </button>

        `;

    }


    // ======================================================
    // PRESENÇA CONFIRMADA
    // ======================================================

    else if (
        status === 'PRESENTE'
    ) {

        areaAcoes = `

            <span
                class="text-success small fw-semibold"
            >

                <i
                    class="bi bi-check-circle-fill me-1"
                ></i>

                ${escapeHtml(
                    t(
                        'painelStatusPresencaConfirmada',
                        'Presença confirmada'
                    )
                )}

            </span>

        `;

    }


    // ======================================================
    // CANCELADA
    // ======================================================

    else if (
        status === 'CANCELADO'
    ) {

        areaAcoes = `

            <span class="text-muted-theme small">

                <i class="bi bi-x-circle me-1"></i>

                ${escapeHtml(
                    t(
                        'painelInscricaoCancelada',
                        'Inscrição cancelada'
                    )
                )}

            </span>

        `;

    }


    return `

        <div class="col-12 col-md-6 col-lg-4">

            <div
                class="card card-custom border-0 shadow-sm h-100 p-4 d-flex flex-column"
            >

                <div
                    class="d-flex justify-content-between align-items-start gap-2 mb-3"
                >

                    <span
                        class="badge ${statusInfo.classe}"
                    >
                        ${escapeHtml(
                            statusInfo.texto
                        )}
                    </span>


                    <small
                        class="text-muted-theme text-end"
                    >

                        <i class="bi bi-calendar3 me-1"></i>

                        ${escapeHtml(
                            dataInscricao
                        )}

                    </small>

                </div>


                <h5 class="fw-bold text-main-theme">

                    ${escapeHtml(
                        inscricao.eventoTitulo ||
                        t(
                            'painelEventoGenerico',
                            'Evento'
                        )
                    )}

                </h5>


                <p class="text-muted-theme small">

                    <i class="bi bi-ticket me-1"></i>

                    ${escapeHtml(
                        tp(
                            'painelNumeroInscricao',
                            'Inscrição #{id}',
                            {
                                id:
                                    Number(
                                        inscricao.id
                                    )
                            }
                        )
                    )}

                </p>


                <div
                    class="mt-auto pt-3 border-top d-flex flex-wrap align-items-center gap-2"
                >

                    ${areaAcoes}


                    ${
                        inscricao.eventoId
                            ? `
                                <a
                                    href="detalhesEvento.html?id=${Number(inscricao.eventoId)}"
                                    class="btn btn-link btn-sm text-decoration-none ms-auto"
                                >

                                    ${escapeHtml(
                                        t(
                                            'painelDetalhes',
                                            'Detalhes'
                                        )
                                    )}

                                </a>
                            `
                            : ''
                    }

                </div>

            </div>

        </div>

    `;

}


// ==========================================================
// CANCELAR INSCRIÇÃO
// ==========================================================

async function cancelarInscricao(
    inscricaoId
) {

    const inscricao =
        inscricoesCache.find(
            item =>
                Number(item.id) ===
                Number(inscricaoId)
        );


    if (!inscricao) {

        alert(
            t(
                'painelInscricaoNaoEncontrada',
                'Inscrição não encontrada.'
            )
        );

        return;

    }


    if (
        inscricao.status ===
        'PRESENTE'
    ) {

        alert(
            t(
                'painelNaoCancelarPresencaConfirmada',
                'Não é possível cancelar uma inscrição cuja presença já foi confirmada.'
            )
        );

        return;

    }


    if (
        inscricao.status ===
        'CANCELADO'
    ) {

        alert(
            t(
                'painelInscricaoJaCancelada',
                'Esta inscrição já está cancelada.'
            )
        );

        return;

    }


    const confirmar =
        window.confirm(
            tp(
                'painelConfirmarCancelarInscricao',
                'Deseja realmente cancelar sua inscrição em "{evento}"? Não poderá se inscrever novamente!',
                {
                    evento:
                        inscricao.eventoTitulo ||
                        t(
                            'painelEsteEvento',
                            'este evento'
                        )
                }
            )
        );


    if (!confirmar) {

        return;

    }


    try {

        const response =
            await Auth.fetchAutenticado(
                `/inscricoes/${inscricaoId}/cancelar`,
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
                extrairMensagemErro(
                    data,
                    t(
                        'painelErroCancelarInscricao',
                        'Não foi possível cancelar a inscrição.'
                    )
                )
            );

        }


        alert(
            t(
                'painelInscricaoCanceladaSucesso',
                'Inscrição cancelada com sucesso.'
            )
        );


        await carregarInscricoes();


    } catch (error) {

        console.error(
            'Erro ao cancelar inscrição:',
            error
        );


        alert(
            error.message ||
            t(
                'painelErroCancelarInscricao',
                'Não foi possível cancelar a inscrição.'
            )
        );

    }

}


// ==========================================================
// ABRIR MODAL DO QR CODE
// ==========================================================

function abrirModalQRCode(
    inscricaoId
) {

    const inscricao =
        inscricoesCache.find(
            item =>
                Number(item.id) ===
                Number(inscricaoId)
        );


    if (!inscricao) {

        alert(
            t(
                'painelInscricaoNaoEncontrada',
                'Inscrição não encontrada.'
            )
        );

        return;

    }


    if (!inscricao.tokenQr) {

        alert(
            t(
                'painelQrIndisponivel',
                'QR Code não disponível para esta inscrição.'
            )
        );

        return;

    }


    if (
        inscricao.status ===
        'CANCELADO'
    ) {

        alert(
            t(
                'painelQrInscricaoCancelada',
                'O QR Code não está disponível para uma inscrição cancelada.'
            )
        );

        return;

    }


    const container =
        document.getElementById(
            'qrCodeContainer'
        );


    const tokenText =
        document.getElementById(
            'qrCodeTokenText'
        );


    const modalElemento =
        document.getElementById(
            'modalQRCode'
        );


    if (
        !container ||
        !tokenText ||
        !modalElemento
    ) {

        console.error(
            'Os elementos do modal de QR Code não foram encontrados.'
        );

        return;

    }


    if (
        typeof QRCode ===
        'undefined'
    ) {

        console.error(
            'A biblioteca QRCode não foi carregada.'
        );


        alert(
            t(
                'painelErroGerarQr',
                'Não foi possível gerar o QR Code.'
            )
        );

        return;

    }


    container.innerHTML =
        '';


    tokenText.textContent =
        inscricao.tokenQr;


    new QRCode(
        container,
        {

            text:
                inscricao.tokenQr,

            width:
                180,

            height:
                180,

            correctLevel:
                QRCode.CorrectLevel.H

        }
    );


    const modal =
        bootstrap.Modal
            .getOrCreateInstance(
                modalElemento
            );


    modal.show();

}


// ==========================================================
// RESUMO
// ==========================================================

function atualizarResumo(
    elementoId,
    valor
) {

    const elemento =
        document.getElementById(
            elementoId
        );


    if (!elemento) {

        return;

    }


    elemento.textContent =
        valor ?? 0;

}


// ==========================================================
// EXPORTAR FUNÇÕES DAS INSCRIÇÕES
// ==========================================================

window.cancelarInscricao =
    cancelarInscricao;

window.abrirModalQRCode =
    abrirModalQRCode;

    // ==========================================================
// MEUS EVENTOS
// ==========================================================

async function carregarMeusEventos() {

    const container =
        document.getElementById(
            'lista-eventos-gerenciados-container'
        );


    if (!container) {

        return;

    }


    const usuarioId =
        Auth.getUsuarioId();


    // ======================================================
    // USUÁRIO NÃO IDENTIFICADO
    // ======================================================

    if (!usuarioId) {

        atualizarResumo(
            'resumo-eventos',
            0
        );


        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning">

                    <i
                        class="bi bi-exclamation-triangle me-2"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelUsuarioNaoIdentificado',
                            'Não foi possível identificar o usuário autenticado.'
                        )
                    )}

                </div>

            </div>

        `;


        return;

    }


    // ======================================================
    // LOADING
    // ======================================================

    container.innerHTML = `

        <div class="col-12 text-center py-5">

            <div
                class="spinner-border text-primary"
                role="status"
            ></div>


            <p
                class="text-muted-theme mt-3 mb-0"
            >

                ${escapeHtml(
                    t(
                        'painelCarregandoEventos',
                        'Carregando seus eventos...'
                    )
                )}

            </p>

        </div>

    `;


    try {

        // ==================================================
        // GET /eventos/organizador/{usuarioId}
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                `/eventos/organizador/${usuarioId}`
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    t(
                        'painelErroEventos',
                        'Não foi possível carregar seus eventos.'
                    )
                )
            );

        }


        const dados =
            await response.json();


        eventosCache =
            Array.isArray(dados)
                ? dados
                : [];


        // ==================================================
        // RESUMO
        // ==================================================

        atualizarResumo(
            'resumo-eventos',
            eventosCache.length
        );


        // ==================================================
        // NENHUM EVENTO
        // ==================================================

        if (
            eventosCache.length ===
            0
        ) {

            container.innerHTML = `

                <div class="col-12">

                    <div class="text-center py-5">

                        <i
                            class="bi bi-calendar-plus text-muted"
                            style="font-size: 3rem;"
                        ></i>


                        <h5
                            class="fw-bold text-main-theme mt-3"
                        >

                            ${escapeHtml(
                                t(
                                    'painelNenhumEvento',
                                    'Nenhum evento criado'
                                )
                            )}

                        </h5>


                        <p class="text-muted-theme">

                            ${escapeHtml(
                                t(
                                    'painelNenhumEventoDesc',
                                    'Você ainda não criou nenhum evento.'
                                )
                            )}

                        </p>


                        <a
                            href="evento.html"
                            class="btn btn-mblf-primary"
                        >

                            <i
                                class="bi bi-plus-lg me-1"
                            ></i>

                            ${escapeHtml(
                                t(
                                    'navCriarEvento',
                                    'Criar Evento'
                                )
                            )}

                        </a>

                    </div>

                </div>

            `;


            return;

        }


        // ==================================================
        // RENDERIZAR
        // ==================================================

        container.innerHTML =
            eventosCache
                .map(
                    criarCardEvento
                )
                .join('');


    } catch (error) {

        console.error(
            'Erro ao carregar eventos:',
            error
        );


        atualizarResumo(
            'resumo-eventos',
            0
        );


        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    <i
                        class="bi bi-exclamation-triangle me-2"
                    ></i>

                    ${escapeHtml(
                        error.message ||
                        t(
                            'painelErroEventos',
                            'Não foi possível carregar seus eventos.'
                        )
                    )}

                </div>

            </div>

        `;

    }

}


// ==========================================================
// CARD DE EVENTO
// ==========================================================

function criarCardEvento(
    evento
) {

    const agora =
        new Date();


    // ======================================================
    // HUB
    // ======================================================

    const hubAtivo =
        dataAindaValida(
            evento.hubAte,
            agora
        );


    // ======================================================
    // PUBLICAÇÃO
    // ======================================================

    const publicacaoAtiva =
        dataAindaValida(
            evento.publicacaoAte,
            agora
        );


    // ======================================================
    // STATUS
    // ======================================================

    const status =
        evento.status ||
        'RASCUNHO';


    const statusEvento =
        obterStatusEvento(
            status
        );


    // ======================================================
    // BADGE HUB
    // ======================================================

    const hubBadge =
        hubAtivo
            ? `

                <span
                    class="badge bg-success"
                >

                    <i
                        class="bi bi-check-circle me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelHubAtivo',
                            'Hub Ativo'
                        )
                    )}

                </span>

            `
            : `

                <span
                    class="badge bg-secondary"
                >

                    <i
                        class="bi bi-lock me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelHubInativo',
                            'Hub Inativo'
                        )
                    )}

                </span>

            `;


    // ======================================================
    // BADGE PUBLICAÇÃO
    // ======================================================

    const publicacaoBadge =
        publicacaoAtiva
            ? `

                <span
                    class="badge bg-info text-dark"
                >

                    <i
                        class="bi bi-globe me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelPublicacaoAtiva',
                            'Publicação Ativa'
                        )
                    )}

                </span>

            `
            : `

                <span
                    class="badge bg-light text-dark border"
                >

                    <i
                        class="bi bi-globe me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelPublicacaoInativa',
                            'Publicação Inativa'
                        )
                    )}

                </span>

            `;


    // ======================================================
    // BADGE INSCRIÇÕES
    // ======================================================

    const inscricoesBadge =
        evento.inscricoesAbertas
            ? `

                <span
                    class="badge bg-success"
                >

                    <i
                        class="bi bi-unlock me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelInscricoesAbertas',
                            'Inscrições Abertas'
                        )
                    )}

                </span>

            `
            : `

                <span
                    class="badge bg-secondary"
                >

                    <i
                        class="bi bi-lock me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelInscricoesFechadas',
                            'Inscrições Fechadas'
                        )
                    )}

                </span>

            `;


    // ======================================================
    // BOTÃO HUB
    // ======================================================

    const botaoHub =
        hubAtivo
            ? `

                <a
                    href="hubEvento.html?id=${Number(evento.id)}"
                    class="btn btn-mblf-primary w-100 btn-sm py-2 fw-semibold"
                >

                    <i
                        class="bi bi-speedometer2 me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'btnAcessarHub',
                            'Acessar Hub'
                        )
                    )}

                </a>

            `
            : `

                <a
                    href="ativarHub.html?id=${Number(evento.id)}"
                    class="btn btn-outline-primary w-100 btn-sm py-2 fw-semibold"
                >

                    <i
                        class="bi bi-lightning-charge-fill me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'btnAtivarHub',
                            'Ativar Hub'
                        )
                    )}

                </a>

            `;


    // ======================================================
    // BOTÃO DE PUBLICAÇÃO
    // ======================================================

    let botaoPublicacao =
        '';


    // SEM PUBLICAÇÃO ATIVA

    if (!publicacaoAtiva) {

        botaoPublicacao = `

            <a
                href="publicarEvento.html?id=${Number(evento.id)}"
                class="btn btn-warning w-100 btn-sm py-2 fw-semibold text-dark"
            >

                <i
                    class="bi bi-megaphone-fill me-1"
                ></i>

                ${escapeHtml(
                    t(
                        'btnPublicarEvento',
                        'Publicar Evento'
                    )
                )}

            </a>

        `;

    }


    // PUBLICADO, MAS INSCRIÇÕES FECHADAS

    else if (
        publicacaoAtiva &&
        evento.inscricoesAbertas !== true
    ) {

        botaoPublicacao = `

            <a
                href="publicarEvento.html?id=${Number(evento.id)}"
                class="btn btn-success w-100 btn-sm py-2 fw-semibold"
            >

                <i
                    class="bi bi-unlock-fill me-1"
                ></i>

                ${escapeHtml(
                    t(
                        'painelAbrirInscricoes',
                        'Abrir Inscrições'
                    )
                )}

            </a>

        `;

    }


    // PUBLICADO E INSCRIÇÕES ABERTAS

    else {

        botaoPublicacao = `

            <a
                href="publicarEvento.html?id=${Number(evento.id)}"
                class="btn btn-outline-success w-100 btn-sm py-2 fw-semibold"
            >

                <i
                    class="bi bi-check-circle-fill me-1"
                ></i>

                ${escapeHtml(
                    t(
                        'btnGerenciarPublicacao',
                        'Gerenciar Publicação'
                    )
                )}

            </a>

        `;

    }


    // ======================================================
    // VAGAS
    // ======================================================

    let textoVagas =
        t(
            'painelVagasNaoInformadas',
            'Vagas não informadas'
        );


    if (
        evento.vagasTotal !== null &&
        evento.vagasTotal !== undefined
    ) {

        textoVagas =
            tp(
                'painelVagasDisponiveis',
                '{disponiveis} de {total} vagas disponíveis',
                {

                    disponiveis:
                        evento.vagasDisponiveis ??
                        0,

                    total:
                        evento.vagasTotal

                }
            );

    }


    // ======================================================
    // TEXTO DA PUBLICAÇÃO
    // ======================================================

    let textoPublicacao =
        t(
            'painelPublicacaoNaoContratada',
            'Publicação não contratada'
        );


    if (
        evento.publicacaoAte
    ) {

        const dataPublicacao =
            formatarDataHora(
                evento.publicacaoAte
            );


        if (
            publicacaoAtiva
        ) {

            textoPublicacao =
                tp(
                    'painelPublicacaoAte',
                    'Publicação até {data}',
                    {

                        data:
                            dataPublicacao

                    }
                );

        } else {

            textoPublicacao =
                tp(
                    'painelPublicacaoExpirada',
                    'Publicação expirada em {data}',
                    {

                        data:
                            dataPublicacao

                    }
                );

        }

    }


    // ======================================================
    // HTML DO CARD
    // ======================================================

    return `

        <div
            class="col-12 col-md-6 col-lg-4"
        >

            <div
                class="card card-custom border-0 shadow-sm h-100 p-4 d-flex flex-column"
            >


                <!-- STATUS -->

                <div
                    class="d-flex flex-wrap gap-2 mb-3"
                >

                    <span
                        class="badge ${statusEvento.classe}"
                    >

                        ${escapeHtml(
                            statusEvento.texto
                        )}

                    </span>


                    ${hubBadge}

                    ${publicacaoBadge}

                </div>


                <!-- INSCRIÇÕES -->

                <div class="mb-3">

                    ${inscricoesBadge}

                </div>


                <!-- TÍTULO -->

                <h5
                    class="fw-bold text-main-theme"
                >

                    ${escapeHtml(
                        evento.titulo ||
                        t(
                            'painelEventoGenerico',
                            'Evento'
                        )
                    )}

                </h5>


                <!-- DESCRIÇÃO -->

                <p
                    class="text-muted-theme small flex-grow-1"
                >

                    ${escapeHtml(
                        resumirTexto(
                            evento.descricao ||
                            t(
                                'painelSemDescricao',
                                'Sem descrição.'
                            ),
                            140
                        )
                    )}

                </p>


                <!-- INFORMAÇÕES -->

                <div
                    class="small text-muted-theme mb-3"
                >


                    ${
                        evento.tipo
                            ? `

                                <div class="mb-1">

                                    <i
                                        class="bi bi-tag me-1"
                                    ></i>

                                    ${escapeHtml(
                                        evento.tipo
                                    )}

                                </div>

                            `
                            : ''
                    }


                    ${
                        evento.cidade
                            ? `

                                <div class="mb-1">

                                    <i
                                        class="bi bi-geo-alt me-1"
                                    ></i>

                                    ${escapeHtml(
                                        evento.cidade
                                    )}

                                </div>

                            `
                            : ''
                    }


                    <div class="mb-1">

                        <i
                            class="bi bi-calendar-event me-1"
                        ></i>

                        ${
                            evento.dataInicio
                                ? escapeHtml(
                                    formatarDataHora(
                                        evento.dataInicio
                                    )
                                )
                                : escapeHtml(
                                    t(
                                        'painelDataNaoInformada',
                                        'Data não informada'
                                    )
                                )
                        }

                    </div>


                    <div class="mb-1">

                        <i
                            class="bi bi-people me-1"
                        ></i>

                        ${escapeHtml(
                            textoVagas
                        )}

                    </div>


                    <div>

                        <i
                            class="bi bi-megaphone me-1"
                        ></i>

                        ${escapeHtml(
                            textoPublicacao
                        )}

                    </div>

                </div>


                <!-- AÇÕES -->

                <div class="mt-auto">

                    <div class="d-grid gap-2">

                        ${botaoPublicacao}

                        ${botaoHub}


                        <a
                            href="evento.html?id=${Number(evento.id)}"
                            class="btn btn-outline-primary btn-sm"
                        >

                            <i
                                class="bi bi-pencil me-1"
                            ></i>

                            ${escapeHtml(
                                t(
                                    'btnEditarEvento',
                                    'Ver / Editar Evento'
                                )
                            )}

                        </a>

                    </div>

                </div>

            </div>

        </div>

    `;

}


// ==========================================================
// RECARREGAR EVENTOS
// ==========================================================

async function recarregarEventos() {

    await carregarMeusEventos();

}


// ==========================================================
// EXPORTAR FUNÇÕES
// ==========================================================

window.recarregarEventos =
    recarregarEventos;

    // ==========================================================
// EVENTOS EM QUE COLABORO
// ==========================================================

async function carregarEventosColaborador() {

    const container =
        document.getElementById(
            'lista-eventos-colaborador-container'
        );


    if (!container) {

        return;

    }


    // ======================================================
    // LOADING
    // ======================================================

    container.innerHTML = `

        <div class="col-12 text-center py-5">

            <div
                class="spinner-border text-primary"
                role="status"
            ></div>

            <p
                class="text-muted-theme mt-3 mb-0"
            >

                ${escapeHtml(
                    t(
                        'painelCarregandoColaboracoes',
                        'Carregando suas colaborações...'
                    )
                )}

            </p>

        </div>

    `;


    try {

        // ==================================================
        // GET /colaboradores/meus
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                '/colaboradores/meus'
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    t(
                        'painelErroColaboracoes',
                        'Não foi possível carregar suas colaborações.'
                    )
                )
            );

        }


        const dados =
            await response.json();


// Exibir somente colaborações aceitas.
        colaboracoesCache = Array.isArray(dados)
            ? dados.filter(colaboracao =>
                colaboracao.status === 'ACEITO'
            )
            : [];


        // ==================================================
        // RESUMO
        // ==================================================

        atualizarResumo(
            'resumo-colaboracoes',
            colaboracoesCache.length
        );


        // ==================================================
        // NENHUMA COLABORAÇÃO
        // ==================================================

        if (
            colaboracoesCache.length === 0
        ) {

            container.innerHTML = `

                <div class="col-12">

                    <div
                        class="card card-custom border-0 shadow-sm p-5 text-center"
                    >

                        <i
                            class="bi bi-person-workspace text-muted"
                            style="font-size: 3rem;"
                        ></i>


                        <h5
                            class="fw-bold text-main-theme mt-3"
                        >

                            ${escapeHtml(
                                t(
                                    'painelNenhumaColaboracao',
                                    'Nenhuma colaboração ativa'
                                )
                            )}

                        </h5>


                        <p
                            class="text-muted-theme mb-0"
                        >

                            ${escapeHtml(
                                t(
                                    'painelNenhumaColaboracaoDesc',
                                    'Quando você aceitar um convite para colaborar em um evento, ele aparecerá aqui.'
                                )
                            )}

                        </p>

                    </div>

                </div>

            `;


            return;

        }


        // ==================================================
        // RENDERIZAR
        // ==================================================

        container.innerHTML =
            colaboracoesCache
                .map(
                    criarCardColaboracao
                )
                .join('');


    } catch (error) {

        console.error(
            'Erro ao carregar colaborações:',
            error
        );


        atualizarResumo(
            'resumo-colaboracoes',
            0
        );


        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    <i
                        class="bi bi-exclamation-triangle me-2"
                    ></i>

                    ${escapeHtml(
                        error.message ||
                        t(
                            'painelErroColaboracoes',
                            'Não foi possível carregar suas colaborações.'
                        )
                    )}

                </div>

            </div>

        `;

    }

}


// ==========================================================
// CARD DE COLABORAÇÃO
// ==========================================================

function criarCardColaboracao(
    colaboracao
) {

    // ======================================================
    // FUNÇÃO
    // ======================================================

    const funcao =
        colaboracao.funcao ||
        t(
            'painelColaborador',
            'Colaborador'
        );


    // ======================================================
    // PERMISSÕES
    // ======================================================

    const permissoes =
        [];


    // CHAT

    if (
        colaboracao.podeChat === true
    ) {

        permissoes.push(
            `

                <span
                    class="badge bg-primary-subtle text-primary border"
                >

                    <i
                        class="bi bi-chat-dots me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'hubChat',
                            'Chat'
                        )
                    )}

                </span>

            `
        );

    }


    // CALENDÁRIO

    if (
        colaboracao.podeCalendario === true
    ) {

        permissoes.push(
            `

                <span
                    class="badge bg-primary-subtle text-primary border"
                >

                    <i
                        class="bi bi-calendar-event me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelCalendario',
                            'Calendário'
                        )
                    )}

                </span>

            `
        );

    }


    // TAREFAS

    if (
        colaboracao.podeTarefas === true
    ) {

        permissoes.push(
            `

                <span
                    class="badge bg-primary-subtle text-primary border"
                >

                    <i
                        class="bi bi-check2-square me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'hubTarefas',
                            'Tarefas'
                        )
                    )}

                </span>

            `
        );

    }


    // INSCRITOS

    if (
        colaboracao.podeVerInscritos === true
    ) {

        permissoes.push(
            `

                <span
                    class="badge bg-success-subtle text-success border"
                >

                    <i
                        class="bi bi-people me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'hubInscritos',
                            'Inscritos'
                        )
                    )}

                </span>

            `
        );

    }


    // PRESENÇAS

    if (
        colaboracao.podeRegistrarPresencas === true
    ) {

        permissoes.push(
            `

                <span
                    class="badge bg-success-subtle text-success border"
                >

                    <i
                        class="bi bi-qr-code-scan me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'hubPresencas',
                            'Presenças'
                        )
                    )}

                </span>

            `
        );

    }


    // CERTIFICADOS

    if (
        colaboracao.podeLiberarCertificados === true
    ) {

        permissoes.push(
            `

                <span
                    class="badge bg-warning-subtle text-warning-emphasis border"
                >

                    <i
                        class="bi bi-award me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'hubCertificados',
                            'Certificados'
                        )
                    )}

                </span>

            `
        );

    }


    // ======================================================
    // HTML
    // ======================================================

    return `

        <div
            class="col-12 col-md-6 col-lg-4"
        >

            <div
                class="card card-custom border-0 shadow-sm h-100 p-4 d-flex flex-column"
            >


                <!-- STATUS -->

                <div
                    class="d-flex justify-content-between align-items-start gap-2 mb-3"
                >

                    <span
                        class="badge bg-success"
                    >

                        <i
                            class="bi bi-check-circle-fill me-1"
                        ></i>

                        ${escapeHtml(
                            t(
                                'painelColaboradorAtivo',
                                'Colaborador Ativo'
                            )
                        )}

                    </span>


                    <span
                        class="badge bg-primary"
                    >

                        ${escapeHtml(
                            funcao
                        )}

                    </span>

                </div>


                <!-- EVENTO -->

                <h5
                    class="fw-bold text-main-theme mb-2"
                >

                    ${escapeHtml(
                        colaboracao.eventoTitulo ||
                        t(
                            'painelEventoGenerico',
                            'Evento'
                        )
                    )}

                </h5>


                <p
                    class="text-muted-theme small"
                >

                    ${escapeHtml(
                        t(
                            'painelParticipaEquipe',
                            'Você faz parte da equipe de organização deste evento.'
                        )
                    )}

                </p>


                <!-- PERMISSÕES -->

                <div
                    class="mb-4"
                >

                    <small
                        class="text-muted-theme d-block mb-2"
                    >

                        ${escapeHtml(
                            t(
                                'painelPermissoes',
                                'Seus acessos'
                            )
                        )}

                    </small>


                    <div
                        class="d-flex flex-wrap gap-2"
                    >

                        ${
                            permissoes.length > 0
                                ? permissoes.join('')
                                : `

                                    <span
                                        class="small text-muted-theme"
                                    >

                                        ${escapeHtml(
                                            t(
                                                'painelNenhumaPermissao',
                                                'Nenhuma permissão adicional.'
                                            )
                                        )}

                                    </span>

                                `
                        }

                    </div>

                </div>


                <!-- AÇÕES -->

                <div
                    class="mt-auto d-grid gap-2"
                >

                    <a
                        href="hubEvento.html?id=${Number(
                            colaboracao.eventoId
                        )}"
                        class="btn btn-mblf-primary fw-semibold"
                    >

                        <i
                            class="bi bi-speedometer2 me-1"
                        ></i>

                        ${escapeHtml(
                            t(
                                'btnAcessarHub',
                                'Acessar Hub'
                            )
                        )}

                    </a>


                    <a
                        href="detalhesEvento.html?id=${Number(
                            colaboracao.eventoId
                        )}"
                        class="btn btn-outline-primary btn-sm"
                    >

                        <i
                            class="bi bi-eye me-1"
                        ></i>

                        ${escapeHtml(
                            t(
                                'painelVerEvento',
                                'Ver Evento'
                            )
                        )}

                    </a>

                </div>

            </div>

        </div>

    `;

}


// ==========================================================
// RECARREGAR COLABORAÇÕES
// ==========================================================

async function recarregarColaboracoes() {

    await carregarEventosColaborador();

}


// ==========================================================
// EXPORTAR
// ==========================================================

window.recarregarColaboracoes =
    recarregarColaboracoes;

    // ==========================================================
// MEUS CERTIFICADOS
// ==========================================================

async function carregarCertificados() {

    const tbody =
        document.getElementById(
            'tabela-certificados-body'
        );


    if (!tbody) {

        return;

    }


    // ======================================================
    // LOADING
    // ======================================================

    tbody.innerHTML = `

        <tr>

            <td
                colspan="5"
                class="text-center py-5"
            >

                <div
                    class="spinner-border spinner-border-sm text-primary"
                    role="status"
                ></div>


                <span
                    class="text-muted-theme ms-2"
                >

                    ${escapeHtml(
                        t(
                            'painelCarregandoCertificados',
                            'Carregando certificados...'
                        )
                    )}

                </span>

            </td>

        </tr>

    `;


    try {

        // ==================================================
        // GET /certificados/meus
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                '/certificados/meus'
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    t(
                        'painelErroCertificados',
                        'Não foi possível carregar os certificados.'
                    )
                )
            );

        }


        const dados =
            await response.json();


        certificadosCache =
            Array.isArray(dados)
                ? dados
                : [];


        // ==================================================
        // RESUMO
        // ==================================================

        atualizarResumo(
            'resumo-certificados',
            certificadosCache.length
        );


        // ==================================================
        // NENHUM CERTIFICADO
        // ==================================================

        if (
            certificadosCache.length === 0
        ) {

            tbody.innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        class="text-center text-muted-theme py-5"
                    >

                        <i
                            class="bi bi-award d-block mb-3"
                            style="font-size: 2.8rem;"
                        ></i>


                        <h6
                            class="fw-bold text-main-theme mb-1"
                        >

                            ${escapeHtml(
                                t(
                                    'painelNenhumCertificadoLiberado',
                                    'Nenhum certificado liberado'
                                )
                            )}

                        </h6>


                        <p class="small mb-0">

                            ${escapeHtml(
                                t(
                                    'painelNenhumCertificadoDesc',
                                    'Seus certificados aparecerão aqui quando sua presença for confirmada e o certificado for liberado.'
                                )
                            )}

                        </p>

                    </td>

                </tr>

            `;


            return;

        }


        // ==================================================
        // RENDERIZAR
        // ==================================================

        tbody.innerHTML =
            certificadosCache
                .map(
                    criarLinhaCertificado
                )
                .join('');


    } catch (error) {

        console.error(
            'Erro ao carregar certificados:',
            error
        );


        atualizarResumo(
            'resumo-certificados',
            0
        );


        tbody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-danger py-4"
                >

                    <i
                        class="bi bi-exclamation-triangle me-1"
                    ></i>

                    ${escapeHtml(
                        error.message ||
                        t(
                            'painelErroCertificados',
                            'Não foi possível carregar os certificados.'
                        )
                    )}

                </td>

            </tr>

        `;

    }

}


// ==========================================================
// CRIAR LINHA DE CERTIFICADO
// ==========================================================

function criarLinhaCertificado(
    certificado
) {

    // ======================================================
    // CARGA HORÁRIA
    // ======================================================

    const cargaHoraria =
        certificado.cargaHoraria !== null &&
        certificado.cargaHoraria !== undefined
            ? tp(
                'painelHoras',
                '{horas}h',
                {
                    horas:
                        certificado.cargaHoraria
                }
            )
            : t(
                'painelNaoInformada',
                'Não informada'
            );


    // ======================================================
    // DATA DE LIBERAÇÃO
    // ======================================================

    const dataLiberacao =
        certificado.dataLiberacao
            ? formatarData(
                certificado.dataLiberacao
            )
            : '-';


    // ======================================================
    // CÓDIGO
    // ======================================================

    const codigo =
        certificado.codigo ||
        '-';


    // ======================================================
    // HTML
    // ======================================================

    return `

        <tr>

            <!-- EVENTO -->

            <td
                class="fw-semibold text-main-theme"
            >

                ${escapeHtml(
                    certificado.tituloEvento ||
                    t(
                        'painelEventoGenerico',
                        'Evento'
                    )
                )}

            </td>


            <!-- CARGA HORÁRIA -->

            <td
                class="text-muted-theme"
            >

                ${escapeHtml(
                    cargaHoraria
                )}

            </td>


            <!-- LIBERAÇÃO -->

            <td
                class="text-muted-theme"
            >

                ${escapeHtml(
                    dataLiberacao
                )}

            </td>


            <!-- CÓDIGO -->

            <td>

                <code>

                    ${escapeHtml(
                        codigo
                    )}

                </code>

            </td>


            <!-- AÇÃO -->

            <td
                class="text-end"
            >

                <button
                    type="button"
                    class="btn btn-sm btn-outline-success fw-semibold"
                    onclick="abrirCertificado(${Number(certificado.id)})"
                >

                    <i
                        class="bi bi-eye me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'painelVisualizar',
                            'Visualizar'
                        )
                    )}

                </button>

            </td>

        </tr>

    `;

}


// ==========================================================
// ABRIR CERTIFICADO
// ==========================================================

function abrirCertificado(
    certificadoId
) {

    // ======================================================
    // LOCALIZAR NO CACHE
    // ======================================================

    const certificado =
        certificadosCache.find(
            item =>
                Number(item.id) ===
                Number(certificadoId)
        );


    if (!certificado) {

        alert(
            t(
                'painelCertificadoNaoEncontrado',
                'Certificado não encontrado.'
            )
        );

        return;

    }


    // ======================================================
    // ELEMENTOS DO MODAL
    // ======================================================

    const eventoEl =
        document.getElementById(
            'certificado-evento'
        );


    const participanteEl =
        document.getElementById(
            'certificado-participante'
        );


    const cargaEl =
        document.getElementById(
            'certificado-carga'
        );


    const dataEl =
        document.getElementById(
            'certificado-data'
        );


    const codigoEl =
        document.getElementById(
            'certificado-codigo'
        );


    const modalElemento =
        document.getElementById(
            'modalCertificado'
        );


    // ======================================================
    // VALIDAÇÃO
    // ======================================================

    if (
        !eventoEl ||
        !participanteEl ||
        !cargaEl ||
        !dataEl ||
        !codigoEl ||
        !modalElemento
    ) {

        console.error(
            'Os elementos do modal de certificado não foram encontrados.'
        );

        return;

    }


    // ======================================================
    // EVENTO
    // ======================================================

    eventoEl.textContent =
        certificado.tituloEvento ||
        t(
            'painelEventoGenerico',
            'Evento'
        );


    // ======================================================
    // PARTICIPANTE
    // ======================================================

    participanteEl.textContent =
        certificado.nomeParticipante ||
        Auth.getUsuarioNome() ||
        t(
            'painelParticipante',
            'Participante'
        );


    // ======================================================
    // CARGA HORÁRIA
    // ======================================================

    cargaEl.textContent =
        certificado.cargaHoraria !== null &&
        certificado.cargaHoraria !== undefined
            ? tp(
                'painelHorasExtenso',
                '{horas} horas',
                {
                    horas:
                        certificado.cargaHoraria
                }
            )
            : t(
                'painelNaoInformada',
                'Não informada'
            );


    // ======================================================
    // DATA DE LIBERAÇÃO
    // ======================================================

    dataEl.textContent =
        certificado.dataLiberacao
            ? formatarData(
                certificado.dataLiberacao
            )
            : '-';


    // ======================================================
    // CÓDIGO
    // ======================================================

    codigoEl.textContent =
        certificado.codigo ||
        '-';


    // ======================================================
    // ABRIR MODAL
    // ======================================================

    const modal =
        bootstrap.Modal
            .getOrCreateInstance(
                modalElemento
            );


    modal.show();

}


// ==========================================================
// EXPORTAR FUNÇÃO
// ==========================================================

window.abrirCertificado =
    abrirCertificado;

    // ==========================================================
// NOTIFICAÇÕES
// ==========================================================

async function carregarNotificacoes() {

    const container =
        document.getElementById(
            'lista-notificacoes'
        );


    if (!container) {

        return;

    }


    // ======================================================
    // LOADING
    // ======================================================

    container.innerHTML = `

        <div class="text-center py-4">

            <div
                class="spinner-border spinner-border-sm text-primary"
                role="status"
            ></div>


            <span
                class="text-muted-theme ms-2"
            >

                ${escapeHtml(
                    t(
                        'painelCarregandoNotificacoes',
                        'Carregando notificações...'
                    )
                )}

            </span>

        </div>

    `;


    try {

        // ==================================================
        // GET /notificacoes/minhas
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                '/notificacoes/minhas'
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    t(
                        'painelErroNotificacoes',
                        'Não foi possível carregar as notificações.'
                    )
                )
            );

        }


        const dados =
            await response.json();


        notificacoesCache =
            Array.isArray(dados)
                ? dados
                : [];


        // ==================================================
        // NÃO LIDAS
        // ==================================================

        const quantidadeNaoLidas =
            notificacoesCache.filter(
                notificacao =>
                    notificacao.lida === false
            ).length;


        // ==================================================
        // RESUMO
        // ==================================================

        atualizarResumo(
            'resumo-notificacoes',
            quantidadeNaoLidas
        );


        atualizarBadgeNotificacoes(
            quantidadeNaoLidas
        );


        // ==================================================
        // NENHUMA NOTIFICAÇÃO
        // ==================================================

        if (
            notificacoesCache.length ===
            0
        ) {

            container.innerHTML = `

                <div
                    class="text-center text-muted-theme py-4 px-3"
                >

                    <i
                        class="bi bi-bell-slash d-block mb-2"
                        style="font-size: 2rem;"
                    ></i>


                    <strong>

                        ${escapeHtml(
                            t(
                                'painelNenhumaNotificacaoTitulo',
                                'Nenhuma notificação'
                            )
                        )}

                    </strong>


                    <div
                        class="small mt-1"
                    >

                        ${escapeHtml(
                            t(
                                'painelNenhumaNotificacaoDesc',
                                'Quando houver novidades, elas aparecerão aqui.'
                            )
                        )}

                    </div>

                </div>

            `;


            return;

        }


        // ==================================================
        // RENDERIZAR
        // ==================================================

        container.innerHTML =
            notificacoesCache
                .map(
                    criarNotificacao
                )
                .join('');


    } catch (error) {

        console.error(
            'Erro ao carregar notificações:',
            error
        );


        atualizarResumo(
            'resumo-notificacoes',
            0
        );


        atualizarBadgeNotificacoes(
            0
        );


        container.innerHTML = `

            <div
                class="text-danger text-center py-4 px-3"
            >

                <i
                    class="bi bi-exclamation-triangle me-1"
                ></i>

                ${escapeHtml(
                    error.message ||
                    t(
                        'painelErroNotificacoes',
                        'Não foi possível carregar as notificações.'
                    )
                )}

            </div>

        `;

    }

}

// ==========================================================
// TRADUZIR CONTEÚDO DA NOTIFICAÇÃO
// Mantém nomes de pessoas e nomes dos eventos sem traduzir
// ==========================================================

function traduzirConteudoNotificacao(
    notificacao
) {

    const tipo =
        notificacao.tipo || '';

    const tituloOriginal =
        notificacao.titulo || '';

    const mensagemOriginal =
        notificacao.mensagem || '';

    let titulo =
        tituloOriginal;

    let mensagem =
        mensagemOriginal;

    let partes;


    // ======================================================
    // CONVITE PARA COLABORAR
    // ======================================================

    if (
        tipo ===
        'CONVITE_COLABORADOR'
    ) {

        titulo =
            t(
                'notifTituloConviteColaborador',
                'Novo convite para colaborar'
            );


        partes =
            mensagemOriginal.match(
                /^(.*?) convidou você para colaborar no evento (.*)$/s
            );


        if (partes) {

            mensagem =
                tp(
                    'notifMsgConviteColaborador',
                    '{nome} convidou você para colaborar no evento {evento}',
                    {
                        nome:
                            partes[1],

                        evento:
                            partes[2]
                    }
                );

        }

    }


    // ======================================================
    // CONVITE ACEITO
    // ======================================================

    else if (
        tipo ===
        'CONVITE_ACEITO'
    ) {

        titulo =
            t(
                'notifTituloConviteAceito',
                'Convite aceito'
            );


        partes =
            mensagemOriginal.match(
                /^(.*?) aceitou o convite para colaborar no evento (.*)$/s
            );


        if (partes) {

            mensagem =
                tp(
                    'notifMsgConviteAceito',
                    '{nome} aceitou o convite para colaborar no evento {evento}',
                    {
                        nome:
                            partes[1],

                        evento:
                            partes[2]
                    }
                );

        }

    }


    // ======================================================
    // CONVITE RECUSADO
    // ======================================================

    else if (
        tipo ===
        'CONVITE_RECUSADO'
    ) {

        titulo =
            t(
                'notifTituloConviteRecusado',
                'Convite recusado'
            );


        partes =
            mensagemOriginal.match(
                /^(.*?) recusou o convite para colaborar no evento (.*)$/s
            );


        if (partes) {

            mensagem =
                tp(
                    'notifMsgConviteRecusado',
                    '{nome} recusou o convite para colaborar no evento {evento}',
                    {
                        nome:
                            partes[1],

                        evento:
                            partes[2]
                    }
                );

        }

    }


    return {
        titulo,
        mensagem
    };

}

// ==========================================================
// CRIAR NOTIFICAÇÃO
// ==========================================================

function criarNotificacao(
    notificacao
) {

    const conteudoTraduzido =
        traduzirConteudoNotificacao(
            notificacao
        );

    // ======================================================
    // FUNDO
    // ======================================================

    const classeFundo =
        notificacao.lida
            ? ''
            : 'notificacao-nao-lida';


    // ======================================================
    // DATA
    // ======================================================

    const data =
        notificacao.dataCriacao
            ? formatarDataHora(
                notificacao.dataCriacao
            )
            : '';


    // ======================================================
    // AÇÕES
    // ======================================================

    let acoes =
        '';


    // ======================================================
    // CONVITE DE COLABORADOR
    // ======================================================

    if (
        notificacao.tipo ===
            'CONVITE_COLABORADOR' &&
        notificacao.lida === false &&
        notificacao.eventoId
    ) {

        acoes = `

            <div
                class="d-flex flex-wrap gap-2 mt-2"
            >

                <button
                    type="button"
                    class="btn btn-success btn-sm"
                    onclick="aceitarConvite(
                        ${Number(notificacao.eventoId)},
                        ${Number(notificacao.id)}
                    )"
                >

                    <i
                        class="bi bi-check-lg me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'conviteAceitar',
                            'Aceitar'
                        )
                    )}

                </button>


                <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    onclick="recusarConvite(
                        ${Number(notificacao.eventoId)},
                        ${Number(notificacao.id)}
                    )"
                >

                    <i
                        class="bi bi-x-lg me-1"
                    ></i>

                    ${escapeHtml(
                        t(
                            'conviteRecusar',
                            'Recusar'
                        )
                    )}

                </button>

            </div>

        `;

    }


    // ======================================================
    // OUTRA NOTIFICAÇÃO NÃO LIDA
    // ======================================================

    else if (
        notificacao.lida === false
    ) {

        acoes = `

            <button
                type="button"
                class="btn btn-link btn-sm p-0 mt-2 text-decoration-none"
                onclick="marcarNotificacaoComoLida(
                    ${Number(notificacao.id)}
                )"
            >

                <i
                    class="bi bi-check2 me-1"
                ></i>

                ${escapeHtml(
                    t(
                        'marcarComoLida',
                        'Marcar como lida'
                    )
                )}

            </button>

        `;

    }


    // ======================================================
    // HTML
    // ======================================================

    return `

        <div
            class="px-3 py-3 border-bottom ${classeFundo}"
        >

            <!-- CABEÇALHO -->

            <div
                class="d-flex justify-content-between align-items-start gap-2"
            >

                <strong
                    class="small text-main-theme"
                >

                     ${escapeHtml(
                        conteudoTraduzido.titulo ||
                        t(
                            'painelNotificacaoGenerica',
                            'Notificação'
                        )
                    )}

                </strong>


                ${
                    notificacao.lida === false
                        ? `

                            <span
                                class="badge bg-primary rounded-pill"
                            >

                                ${escapeHtml(
                                    t(
                                        'painelNotificacaoNova',
                                        'Nova'
                                    )
                                )}

                            </span>

                        `
                        : ''
                }

            </div>


            <!-- MENSAGEM -->

            <p
                class="small text-muted-theme mb-1 mt-1"
            >

                ${escapeHtml(
                    conteudoTraduzido.mensagem ||
                    ''
                )}

            </p>


            <!-- DATA -->

            ${
                data
                    ? `

                        <small
                            class="text-muted"
                        >

                            <i
                                class="bi bi-clock me-1"
                            ></i>

                            ${escapeHtml(
                                data
                            )}

                        </small>

                    `
                    : ''
            }


            <!-- AÇÕES -->

            ${acoes}

        </div>

    `;

}


// ==========================================================
// MARCAR NOTIFICAÇÃO COMO LIDA
// ==========================================================

async function marcarNotificacaoComoLida(
    notificacaoId
) {

    try {

        // ==================================================
        // PUT /notificacoes/{id}/lida
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                `/notificacoes/${notificacaoId}/lida`,
                {

                    method:
                        'PUT'

                }
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    t(
                        'painelErroAtualizarNotificacao',
                        'Não foi possível atualizar a notificação.'
                    )
                )
            );

        }


        // ==================================================
        // RECARREGAR NOTIFICAÇÕES
        // ==================================================

        await carregarNotificacoes();


    } catch (error) {

        console.error(
            'Erro ao marcar notificação como lida:',
            error
        );


        alert(
            error.message ||
            t(
                'painelErroAtualizarNotificacao',
                'Não foi possível atualizar a notificação.'
            )
        );

    }

}


// ==========================================================
// ACEITAR CONVITE
// ==========================================================

async function aceitarConvite(
    eventoId,
    notificacaoId
) {

    const confirmar =
        window.confirm(
            t(
                'painelConfirmarAceitarConvite',
                'Deseja aceitar o convite para colaborar neste evento?'
            )
        );


    if (!confirmar) {

        return;

    }


    try {

        // ==================================================
        // PUT /colaboradores/evento/{eventoId}/aceitar
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                `/colaboradores/evento/${eventoId}/aceitar`,
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
                extrairMensagemErro(
                    data,
                    t(
                        'painelErroAceitarConvite',
                        'Não foi possível aceitar o convite.'
                    )
                )
            );

        }


        // ==================================================
        // MARCAR NOTIFICAÇÃO COMO LIDA
        // ==================================================

        try {

            await marcarNotificacaoComoLida(
                notificacaoId
            );

        } catch (error) {

            console.warn(
                'Convite aceito, mas não foi possível marcar a notificação como lida.',
                error
            );

        }


        alert(
            t(
                'painelConviteAceito',
                'Convite aceito com sucesso!'
            )
        );


        // ==================================================
        // RECARREGAR
        // ==================================================

        await Promise.allSettled([

            carregarMeusEventos(),

            carregarEventosColaborador(),

            carregarNotificacoes()

        ]);


    } catch (error) {

        console.error(
            'Erro ao aceitar convite:',
            error
        );


        alert(
            error.message ||
            t(
                'painelErroAceitarConvite',
                'Não foi possível aceitar o convite.'
            )
        );

    }

}


// ==========================================================
// RECUSAR CONVITE
// ==========================================================

async function recusarConvite(
    eventoId,
    notificacaoId
) {

    const confirmar =
        window.confirm(
            t(
                'painelConfirmarRecusarConvite',
                'Deseja recusar este convite de colaboração?'
            )
        );


    if (!confirmar) {

        return;

    }


    try {

        // ==================================================
        // PUT /colaboradores/evento/{eventoId}/recusar
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                `/colaboradores/evento/${eventoId}/recusar`,
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
                extrairMensagemErro(
                    data,
                    t(
                        'painelErroRecusarConvite',
                        'Não foi possível recusar o convite.'
                    )
                )
            );

        }


        // ==================================================
        // MARCAR COMO LIDA
        // ==================================================

        try {

            await marcarNotificacaoComoLida(
                notificacaoId
            );

        } catch (error) {

            console.warn(
                'Convite recusado, mas não foi possível marcar a notificação como lida.',
                error
            );

        }


        alert(
            t(
                'painelConviteRecusado',
                'Convite recusado.'
            )
        );


        await Promise.allSettled([

            carregarEventosColaborador(),

            carregarNotificacoes()

        ]);


    } catch (error) {

        console.error(
            'Erro ao recusar convite:',
            error
        );


        alert(
            error.message ||
            t(
                'painelErroRecusarConvite',
                'Não foi possível recusar o convite.'
            )
        );

    }

}


// ==========================================================
// ATUALIZAR BADGE DE NOTIFICAÇÕES
// ==========================================================

function atualizarBadgeNotificacoes(
    quantidade
) {

    const badge =
        document.getElementById(
            'badge-notificacoes'
        );


    if (!badge) {

        return;

    }


    if (
        quantidade > 0
    ) {

        badge.textContent =
            quantidade > 99
                ? '99+'
                : quantidade;


        badge.classList.remove(
            'd-none'
        );

    } else {

        badge.textContent =
            '0';


        badge.classList.add(
            'd-none'
        );

    }

}


// ==========================================================
// ATIVAR ABA DO PAINEL
// ==========================================================

function ativarAba(
    tabId
) {

    const elemento =
        document.getElementById(
            tabId
        );


    if (!elemento) {

        return;

    }


    const tab =
        bootstrap.Tab
            .getOrCreateInstance(
                elemento
            );


    tab.show();

}


// ==========================================================
// RECARREGAR PAINEL
// ==========================================================

async function recarregarPainel() {

    await Promise.allSettled([

        carregarInscricoes(),

        carregarMeusEventos(),

        carregarEventosColaborador(),

        carregarCertificados(),

        carregarNotificacoes()

    ]);

}


// ==========================================================
// EXPORTAR FUNÇÕES USADAS PELO HTML
// ==========================================================

window.carregarNotificacoes =
    carregarNotificacoes;


window.marcarNotificacaoComoLida =
    marcarNotificacaoComoLida;


window.aceitarConvite =
    aceitarConvite;


window.recusarConvite =
    recusarConvite;


window.ativarAba =
    ativarAba;


window.recarregarPainel =
    recarregarPainel;