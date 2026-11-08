// ==========================================================
// MBLF EVENTS
// publicarEvento.js
//
// Responsável por:
// - proteger a página
// - carregar evento
// - confirmar se o usuário é organizador
// - carregar planos ativos de PUBLICACAO
// - simular pagamento
// - ativar período de publicação
// - abrir inscrições
// - atualizar status da tela
//
// auth.js deve ser carregado antes deste arquivo.
// ==========================================================


// ==========================================================
// ESTADO
// ==========================================================

let eventoAtual = null;
let planosPublicacao = [];


// ==========================================================
// TRADUÇÃO DA PÁGINA
// ==========================================================

function tPublicacao(
    chave,
    fallback,
    parametros = {}
) {

    let texto =
        window.I18n &&
        typeof window.I18n.t === 'function'
            ? window.I18n.t(chave)
            : null;


    if (
        !texto ||
        texto === chave
    ) {

        texto =
            fallback;

    }


    Object.entries(
        parametros
    ).forEach(
        ([nome, valor]) => {

            texto =
                texto.replaceAll(
                    `{${nome}}`,
                    String(valor)
                );

        }
    );


    return texto;

}


// ==========================================================
// PEGAR ID DO EVENTO
// ==========================================================

const parametrosUrl =
    new URLSearchParams(
        window.location.search
    );

const eventoId =
    parametrosUrl.get('id');


// ==========================================================
// PROTEGER PÁGINA
// ==========================================================

const paginaAutorizada =
    window.Auth &&
    Auth.protegerPagina();


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

if (paginaAutorizada) {

    document.addEventListener(
        'DOMContentLoaded',
        inicializarPublicacao
    );

}


async function inicializarPublicacao() {

    if (!eventoId) {

        mostrarErroPagina(
            tPublicacao(
                'pubEventoNaoInformado',
                'Nenhum evento foi informado.'
            )
        );

        return;

    }


    carregarDadosUsuario();

    configurarEventos();


    await carregarEvento();

}


// ==========================================================
// CONFIGURAR EVENTOS
// ==========================================================

function configurarEventos() {

    const btnAbrirInscricoes =
        document.getElementById(
            'btnAbrirInscricoes'
        );


    if (btnAbrirInscricoes) {

        btnAbrirInscricoes.addEventListener(
            'click',
            abrirInscricoes
        );

    }

}


// ==========================================================
// DADOS DO USUÁRIO
// ==========================================================

function carregarDadosUsuario() {

    const usuario =
        Auth.getUsuario();


    if (!usuario) {
        return;
    }


    const nomeEl =
        document.getElementById(
            'nav-nome-usuario'
        );


    const perfilEl =
        document.getElementById(
            'nav-perfil-usuario'
        );


    if (nomeEl) {

        nomeEl.textContent =
            usuario.nome ||
            tPublicacao(
                'perfilUsuario',
                'Usuário'
            );

    }


    if (perfilEl) {

        perfilEl.textContent =
            formatarPerfil(
                usuario.perfil
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

            return tPublicacao(
                'perfilAdmin',
                'Administrador'
            );


        case 'FUNCIONARIO':

            return tPublicacao(
                'perfilFuncionario',
                'Funcionário'
            );


        case 'USUARIO':

        default:

            return tPublicacao(
                'perfilUsuario',
                'Usuário'
            );

    }

}


// ==========================================================
// CARREGAR EVENTO
// ==========================================================

async function carregarEvento() {

    mostrarLoading();


    try {

        const response =
            await Auth.fetchAutenticado(
                `/eventos/${eventoId}`
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    tPublicacao(
                        'pubErroCarregarEvento',
                        'Não foi possível carregar o evento.'
                    )
                )
            );

        }


        eventoAtual =
            await response.json();


        // ==================================================
        // CONFIRMA SE É O ORGANIZADOR
        // ==================================================

        const usuarioId =
            Number(
                Auth.getUsuarioId()
            );


        const organizadorId =
            Number(
                eventoAtual.organizadorId
            );


        if (
            !usuarioId ||
            !organizadorId ||
            usuarioId !== organizadorId
        ) {

            throw new Error(
                tPublicacao(
                    'pubSomenteOrganizador',
                    'Somente o organizador pode gerenciar a publicação deste evento.'
                )
            );

        }


        preencherEvento();


        mostrarConteudo();


        // ==================================================
        // SE JÁ ESTIVER PUBLICADO E ABERTO
        // ==================================================

        if (
            publicacaoAtiva() &&
            eventoAtual.inscricoesAbertas === true &&
            eventoAtual.status === 'PUBLICADO'
        ) {

            atualizarEstadoPublicacao();

            return;

        }


        await carregarPlanos();


        atualizarEstadoPublicacao();


    } catch (error) {

        console.error(
            'Erro ao carregar publicação:',
            error
        );


        mostrarErroPagina(
            error.message ||
            tPublicacao(
                'pubErroCarregarEvento',
                'Não foi possível carregar o evento.'
            )
        );

    }

}


// ==========================================================
// PREENCHER DADOS DO EVENTO
// ==========================================================

function preencherEvento() {

    definirTexto(
        'tituloEvento',
        eventoAtual.titulo ||
        tPublicacao(
            'pubEventoGenerico',
            'Evento'
        )
    );


    definirTexto(
        'textoPublicacaoAte',
        eventoAtual.publicacaoAte
            ? formatarDataHora(
                eventoAtual.publicacaoAte
            )
            : tPublicacao(
                'pubNaoContratada',
                'Não contratada'
            )
    );


    const linkDetalhes =
        document.getElementById(
            'linkDetalhesEvento'
        );


    if (linkDetalhes) {

        linkDetalhes.href =
            `detalhesEvento.html?id=${encodeURIComponent(
                eventoAtual.id
            )}`;

    }

}


// ==========================================================
// CARREGAR PLANOS
// ==========================================================

async function carregarPlanos() {

    const container =
        document.getElementById(
            'containerPlanos'
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="col-12 text-center py-4">

            <div
                class="spinner-border spinner-border-sm text-primary"
                role="status"
            ></div>

            <span class="text-muted-theme ms-2">

                ${escapeHtml(
                    tPublicacao(
                        'pubBuscandoPlanos',
                        'Buscando planos...'
                    )
                )}

            </span>

        </div>

    `;


    try {

        const response =
            await Auth.fetchAutenticado(
                '/planos/ativos'
            );


        if (!response.ok) {

            const erro =
                await lerRespostaErro(
                    response
                );


            throw new Error(
                extrairMensagemErro(
                    erro,
                    tPublicacao(
                        'pubErroCarregarPlanos',
                        'Não foi possível carregar os planos.'
                    )
                )
            );

        }


        const dados =
            await response.json();


        const todosPlanos =
            Array.isArray(dados)
                ? dados
                : [];


        // ==================================================
        // SOMENTE PLANOS DE PUBLICAÇÃO
        // ==================================================

        planosPublicacao =
            todosPlanos.filter(
                plano =>
                    String(
                        plano.tipo ||
                        ''
                    ).toUpperCase() ===
                    'PUBLICACAO'
            );


        renderizarPlanos();


    } catch (error) {

        console.error(
            'Erro ao carregar planos:',
            error
        );


        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    <i class="bi bi-exclamation-triangle me-2"></i>

                    ${escapeHtml(
                        error.message ||
                        tPublicacao(
                            'pubErroCarregarPlanos',
                            'Não foi possível carregar os planos.'
                        )
                    )}

                </div>

            </div>

        `;

    }

}


// ==========================================================
// RENDERIZAR PLANOS
// ==========================================================

function renderizarPlanos() {

    const container =
        document.getElementById(
            'containerPlanos'
        );


    if (!container) {
        return;
    }


    if (
        planosPublicacao.length === 0
    ) {

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning">

                    <i class="bi bi-info-circle me-2"></i>

                    ${escapeHtml(
                        tPublicacao(
                            'pubNenhumPlanoDisponivel',
                            'Nenhum plano de publicação está disponível no momento.'
                        )
                    )}

                </div>

            </div>

        `;


        return;

    }


    container.innerHTML =
        planosPublicacao
            .map(
                criarCardPlano
            )
            .join('');

}


// ==========================================================
// CARD DO PLANO
// ==========================================================

function criarCardPlano(
    plano
) {

    const valor =
        formatarMoeda(
            plano.valor
        );


    const duracao =
        Number(
            plano.duracaoDias ||
            0
        );


    return `

        <div class="col-12 col-md-6">

            <div
                class="card card-custom border-0 shadow-sm h-100 p-4"
            >

                <div
                    class="d-flex justify-content-between align-items-start gap-3 mb-3"
                >

                    <div>

                        <h5
                            class="fw-bold text-main-theme mb-1"
                        >

                            ${escapeHtml(
                                plano.nome ||
                                tPublicacao(
                                    'pubPlanoGenerico',
                                    'Plano de Publicação'
                                )
                            )}

                        </h5>


                        <p
                            class="small text-muted-theme mb-0"
                        >

                            ${
                                duracao > 0
                                    ? escapeHtml(
                                        tPublicacao(
                                            'pubDuracaoDias',
                                            '{duracao} dia{s} de publicação',
                                            {
                                                duracao,
                                                s:
                                                    duracao === 1
                                                        ? ''
                                                        : 's'
                                            }
                                        )
                                    )
                                    : escapeHtml(
                                        tPublicacao(
                                            'pubDuracaoNaoInformada',
                                            'Duração não informada'
                                        )
                                    )
                            }

                        </p>

                    </div>


                    <span class="badge bg-primary">

                        ${escapeHtml(
                            tPublicacao(
                                'pubBadgePublicacao',
                                'Publicação'
                            )
                        )}

                    </span>

                </div>


                <div class="mb-4">

                    <span
                        class="fs-3 fw-bold text-primary"
                    >

                        ${valor}

                    </span>

                </div>


                <button
                    type="button"
                    class="btn btn-outline-primary w-100 fw-semibold"
                    onclick="contratarPlano(${Number(plano.id)})"
                >

                    <i class="bi bi-credit-card me-1"></i>

                    ${escapeHtml(
                        tPublicacao(
                            'pubSelecionarPlano',
                            'Selecionar Plano'
                        )
                    )}

                </button>

            </div>

        </div>

    `;

}


// ==========================================================
// CONTRATAR PLANO
// ==========================================================

async function contratarPlano(
    planoId
) {

    if (!eventoAtual) {
        return;
    }


    const plano =
        planosPublicacao.find(
            item =>
                Number(item.id) ===
                Number(planoId)
        );


    if (!plano) {

        mostrarAlertPagamento(
            tPublicacao(
                'pubPlanoNaoEncontrado',
                'Plano não encontrado.'
            ),
            'danger'
        );

        return;

    }


    const confirmar =
        window.confirm(
            tPublicacao(
                'pubConfirmarContratarPlano',
                'Deseja contratar o plano "{plano}" por {valor}?',
                {
                    plano:
                        plano.nome,

                    valor:
                        formatarMoeda(
                            plano.valor
                        )
                }
            )
        );


    if (!confirmar) {
        return;
    }


    desabilitarBotoesPlanos(
        true
    );


    ocultarAlertPagamento();


    try {

        // ==================================================
        // POST /pagamentos/simular
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                '/pagamentos/simular',
                {
                    method:
                        'POST',

                    body:
                        JSON.stringify({
                            eventoId:
                                Number(
                                    eventoAtual.id
                                ),

                            planoId:
                                Number(
                                    plano.id
                                )
                        })
                }
            );


        const data =
            await response
                .json()
                .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                extrairMensagemErro(
                    data,
                    tPublicacao(
                        'pubErroContratarPlano',
                        'Não foi possível contratar o plano.'
                    )
                )
            );

        }


        mostrarAlertPagamento(
            tPublicacao(
                'pubPlanoContratadoSucesso',
                'Plano contratado com sucesso! A publicação do evento foi ativada.'
            ),
            'success'
        );


        // ==================================================
        // RECARREGAR EVENTO
        // ==================================================

        await recarregarEvento();


        atualizarEstadoPublicacao();


    } catch (error) {

        console.error(
            'Erro ao contratar plano:',
            error
        );


        mostrarAlertPagamento(
            error.message ||
            tPublicacao(
                'pubErroContratarPlano',
                'Não foi possível contratar o plano.'
            ),
            'danger'
        );


    } finally {

        desabilitarBotoesPlanos(
            false
        );

    }

}


// ==========================================================
// RECARREGAR EVENTO
// ==========================================================

async function recarregarEvento() {

    const response =
        await Auth.fetchAutenticado(
            `/eventos/${eventoId}`
        );


    if (!response.ok) {

        throw new Error(
            tPublicacao(
                'pubPlanoProcessadoErroAtualizar',
                'O plano foi processado, mas não foi possível atualizar os dados do evento.'
            )
        );

    }


    eventoAtual =
        await response.json();


    preencherEvento();

}


// ==========================================================
// ABRIR INSCRIÇÕES
// ==========================================================

async function abrirInscricoes() {

    if (!eventoAtual) {
        return;
    }


    if (!publicacaoAtiva()) {

        mostrarAlertInscricoes(
            tPublicacao(
                'pubPublicacaoNecessaria',
                'É necessário possuir uma publicação ativa antes de abrir as inscrições.'
            ),
            'warning'
        );

        return;

    }


    const confirmar =
        window.confirm(
            tPublicacao(
                'pubConfirmarAbrirInscricoes',
                'Deseja abrir as inscrições deste evento? Depois disso, ele poderá aparecer publicamente.'
            )
        );


    if (!confirmar) {
        return;
    }


    const btn =
        document.getElementById(
            'btnAbrirInscricoes'
        );


    const htmlOriginal =
        btn
            ? btn.innerHTML
            : '';


    if (btn) {

        btn.disabled =
            true;


        btn.innerHTML = `

            <span
                class="spinner-border spinner-border-sm me-2"
            ></span>

            ${escapeHtml(
                tPublicacao(
                    'pubAbrindoInscricoes',
                    'Abrindo inscrições...'
                )
            )}

        `;

    }


    ocultarAlertInscricoes();


    try {

        // ==================================================
        // PUT /eventos/{id}/abrir-inscricoes
        // ==================================================

        const response =
            await Auth.fetchAutenticado(
                `/eventos/${eventoAtual.id}/abrir-inscricoes`,
                {
                    method:
                        'PUT'
                }
            );


        const data =
            await response
                .json()
                .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                extrairMensagemErro(
                    data,
                    tPublicacao(
                        'pubErroAbrirInscricoes',
                        'Não foi possível abrir as inscrições.'
                    )
                )
            );

        }


        eventoAtual =
            data;


        preencherEvento();


        mostrarAlertInscricoes(
            tPublicacao(
                'pubInscricoesAbertasSucesso',
                'Inscrições abertas com sucesso! O evento agora está disponível para o público.'
            ),
            'success'
        );


        atualizarEstadoPublicacao();


    } catch (error) {

        console.error(
            'Erro ao abrir inscrições:',
            error
        );


        mostrarAlertInscricoes(
            error.message ||
            tPublicacao(
                'pubErroAbrirInscricoes',
                'Não foi possível abrir as inscrições.'
            ),
            'danger'
        );


        if (btn) {

            btn.disabled =
                false;


            btn.innerHTML =
                htmlOriginal;

        }

    }

}


// ==========================================================
// ATUALIZAR ESTADO DA TELA
// ==========================================================

function atualizarEstadoPublicacao() {

    if (!eventoAtual) {
        return;
    }


    const publicacaoValida =
        publicacaoAtiva();


    const inscricoesAbertas =
        eventoAtual.inscricoesAbertas ===
        true;


    const publicado =
        eventoAtual.status ===
        'PUBLICADO';


    atualizarBadgeEvento();

    atualizarBadgePublicacao(
        publicacaoValida
    );

    atualizarBadgeInscricoes(
        inscricoesAbertas
    );


    const btnAbrir =
        document.getElementById(
            'btnAbrirInscricoes'
        );


    const textoEtapa =
        document.getElementById(
            'textoEtapaInscricoes'
        );


    const secaoPublicado =
        document.getElementById(
            'secaoEventoPublicado'
        );


    // ======================================================
    // PUBLICADO + INSCRIÇÕES ABERTAS
    // ======================================================

    if (
        publicacaoValida &&
        inscricoesAbertas &&
        publicado
    ) {

        if (btnAbrir) {

            btnAbrir.disabled =
                true;


            btnAbrir.classList.remove(
                'btn-mblf-primary'
            );


            btnAbrir.classList.add(
                'btn-success'
            );


            btnAbrir.innerHTML = `

                <i class="bi bi-check-circle-fill me-1"></i>

                ${escapeHtml(
                    tPublicacao(
                        'pubInscricoesAbertas',
                        'Inscrições Abertas'
                    )
                )}

            `;

        }


        if (textoEtapa) {

            textoEtapa.textContent =
                tPublicacao(
                    'pubInscricoesJaAbertas',
                    'As inscrições já estão abertas e o evento está publicado.'
                );

        }


        if (secaoPublicado) {

            secaoPublicado.classList.remove(
                'd-none'
            );

        }


        return;

    }


    // ======================================================
    // PUBLICAÇÃO ATIVA + INSCRIÇÕES FECHADAS
    // ======================================================

    if (
        publicacaoValida &&
        !inscricoesAbertas
    ) {

        if (btnAbrir) {

            btnAbrir.disabled =
                false;


            btnAbrir.classList.remove(
                'btn-success'
            );


            btnAbrir.classList.add(
                'btn-mblf-primary'
            );


            btnAbrir.innerHTML = `

                <i class="bi bi-unlock-fill me-1"></i>

                ${escapeHtml(
                    tPublicacao(
                        'pubAbrirInscricoesBotao',
                        'Abrir Inscrições'
                    )
                )}

            `;

        }


        if (textoEtapa) {

            textoEtapa.textContent =
                tPublicacao(
                    'pubPublicacaoAtivaAbrir',
                    'A publicação está ativa. Agora você pode abrir as inscrições.'
                );

        }


        if (secaoPublicado) {

            secaoPublicado.classList.add(
                'd-none'
            );

        }


        return;

    }


    // ======================================================
    // SEM PUBLICAÇÃO
    // ======================================================

    if (btnAbrir) {

        btnAbrir.disabled =
            true;


        btnAbrir.classList.remove(
            'btn-success'
        );


        btnAbrir.classList.add(
            'btn-mblf-primary'
        );


        btnAbrir.innerHTML = `

            <i class="bi bi-lock-fill me-1"></i>

            ${escapeHtml(
                tPublicacao(
                    'pubAbrirInscricoesBotao',
                    'Abrir Inscrições'
                )
            )}

        `;

    }


    if (textoEtapa) {

        textoEtapa.textContent =
            tPublicacao(
                'pubPrimeiroContratePlano',
                'Primeiro contrate um plano de publicação.'
            );

    }


    if (secaoPublicado) {

        secaoPublicado.classList.add(
            'd-none'
        );

    }

}


// ==========================================================
// BADGE DO EVENTO
// ==========================================================

function atualizarBadgeEvento() {

    const badge =
        document.getElementById(
            'badgeStatusEvento'
        );


    if (!badge) {
        return;
    }


    switch (
        eventoAtual.status
    ) {

        case 'PUBLICADO':

            badge.className =
                'badge bg-success';

            badge.textContent =
                tPublicacao(
                    'pubStatusPublicado',
                    'Publicado'
                );

            break;


        case 'CANCELADO':

            badge.className =
                'badge bg-danger';

            badge.textContent =
                tPublicacao(
                    'pubStatusCancelado',
                    'Cancelado'
                );

            break;


        case 'ENCERRADO':

            badge.className =
                'badge bg-secondary';

            badge.textContent =
                tPublicacao(
                    'pubStatusEncerrado',
                    'Encerrado'
                );

            break;


        case 'REMOVIDO_ADMIN':

            badge.className =
                'badge bg-danger';

            badge.textContent =
                tPublicacao(
                    'pubStatusRemovido',
                    'Removido'
                );

            break;


        case 'RASCUNHO':

        default:

            badge.className =
                'badge bg-warning text-dark';

            badge.textContent =
                tPublicacao(
                    'pubStatusRascunho',
                    'Rascunho'
                );

            break;

    }

}


// ==========================================================
// BADGE PUBLICAÇÃO
// ==========================================================

function atualizarBadgePublicacao(
    ativa
) {

    const badge =
        document.getElementById(
            'badgePublicacao'
        );


    if (!badge) {
        return;
    }


    if (ativa) {

        badge.className =
            'badge bg-success';


        badge.textContent =
            tPublicacao(
                'pubPublicacaoAtiva',
                'Publicação Ativa'
            );

    } else {

        badge.className =
            'badge bg-secondary';


        badge.textContent =
            tPublicacao(
                'pubPublicacaoInativa',
                'Publicação Inativa'
            );

    }

}


// ==========================================================
// BADGE INSCRIÇÕES
// ==========================================================

function atualizarBadgeInscricoes(
    abertas
) {

    const badge =
        document.getElementById(
            'badgeInscricoes'
        );


    if (!badge) {
        return;
    }


    if (abertas) {

        badge.className =
            'badge bg-success';


        badge.textContent =
            tPublicacao(
                'pubInscricoesAbertas',
                'Inscrições Abertas'
            );

    } else {

        badge.className =
            'badge bg-secondary';


        badge.textContent =
            tPublicacao(
                'pubInscricoesFechadas',
                'Inscrições Fechadas'
            );

    }

}


// ==========================================================
// PUBLICAÇÃO ESTÁ ATIVA?
// ==========================================================

function publicacaoAtiva() {

    if (
        !eventoAtual ||
        !eventoAtual.publicacaoAte
    ) {

        return false;

    }


    const data =
        new Date(
            eventoAtual.publicacaoAte
        );


    if (
        Number.isNaN(
            data.getTime()
        )
    ) {

        return false;

    }


    return data >
        new Date();

}


// ==========================================================
// DESABILITAR BOTÕES DOS PLANOS
// ==========================================================

function desabilitarBotoesPlanos(
    desabilitar
) {

    const botoes =
        document.querySelectorAll(
            '#containerPlanos button'
        );


    botoes.forEach(
        botao => {

            botao.disabled =
                desabilitar;

        }
    );

}


// ==========================================================
// LOADING
// ==========================================================

function mostrarLoading() {

    const loading =
        document.getElementById(
            'loadingPagina'
        );


    const erro =
        document.getElementById(
            'erroPagina'
        );


    const conteudo =
        document.getElementById(
            'conteudoPagina'
        );


    if (loading) {

        loading.classList.remove(
            'd-none'
        );

    }


    if (erro) {

        erro.classList.add(
            'd-none'
        );

    }


    if (conteudo) {

        conteudo.classList.add(
            'd-none'
        );

    }

}


// ==========================================================
// MOSTRAR CONTEÚDO
// ==========================================================

function mostrarConteudo() {

    const loading =
        document.getElementById(
            'loadingPagina'
        );


    const erro =
        document.getElementById(
            'erroPagina'
        );


    const conteudo =
        document.getElementById(
            'conteudoPagina'
        );


    if (loading) {

        loading.classList.add(
            'd-none'
        );

    }


    if (erro) {

        erro.classList.add(
            'd-none'
        );

    }


    if (conteudo) {

        conteudo.classList.remove(
            'd-none'
        );

    }

}


// ==========================================================
// ERRO DA PÁGINA
// ==========================================================

function mostrarErroPagina(
    mensagem
) {

    const loading =
        document.getElementById(
            'loadingPagina'
        );


    const erro =
        document.getElementById(
            'erroPagina'
        );


    const conteudo =
        document.getElementById(
            'conteudoPagina'
        );


    const mensagemEl =
        document.getElementById(
            'mensagemErroPagina'
        );


    if (loading) {

        loading.classList.add(
            'd-none'
        );

    }


    if (conteudo) {

        conteudo.classList.add(
            'd-none'
        );

    }


    if (erro) {

        erro.classList.remove(
            'd-none'
        );

    }


    if (mensagemEl) {

        mensagemEl.textContent =
            mensagem;

    }

}


// ==========================================================
// ALERT PAGAMENTO
// ==========================================================

function mostrarAlertPagamento(
    mensagem,
    tipo
) {

    const alerta =
        document.getElementById(
            'alertPagamento'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        `alert alert-${tipo}`;


    alerta.textContent =
        mensagem;

}


function ocultarAlertPagamento() {

    const alerta =
        document.getElementById(
            'alertPagamento'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        'alert d-none';


    alerta.textContent =
        '';

}


// ==========================================================
// ALERT INSCRIÇÕES
// ==========================================================

function mostrarAlertInscricoes(
    mensagem,
    tipo
) {

    const alerta =
        document.getElementById(
            'alertInscricoes'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        `alert alert-${tipo} mt-4 mb-0`;


    alerta.textContent =
        mensagem;

}


function ocultarAlertInscricoes() {

    const alerta =
        document.getElementById(
            'alertInscricoes'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        'alert d-none mt-4 mb-0';


    alerta.textContent =
        '';

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

        return tPublicacao(
            'pubValorZero',
            'R$ 0,00'
        );

    }


    return numero.toLocaleString(
        'pt-BR',
        {
            style:
                'currency',

            currency:
                'BRL'
        }
    );

}


// ==========================================================
// FORMATAR DATA
// ==========================================================

function formatarDataHora(
    data
) {

    if (!data) {

        return tPublicacao(
            'pubNaoContratada',
            'Não contratada'
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

        return tPublicacao(
            'pubNaoInformada',
            'Não informada'
        );

    }


    return valor.toLocaleString(
        'pt-BR',
        {
            dateStyle:
                'short',

            timeStyle:
                'short'
        }
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
// LER ERRO DA API
// ==========================================================

async function lerRespostaErro(
    response
) {

    try {

        return await response.json();

    } catch (error) {

        try {

            return await response.text();

        } catch (erroTexto) {

            return {};

        }

    }

}


// ==========================================================
// EXTRAIR MENSAGEM
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