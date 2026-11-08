// ==========================================================
// MBLF EVENTS
// ativarHub.js
//
// Responsável por:
// - proteger a página
// - carregar evento
// - validar organizador
// - carregar planos HUB
// - simular pagamento
// - atualizar validade do Hub
// - liberar acesso ao hubEvento.html
// - traduzir textos dinâmicos
//
// auth.js e i18n.js devem ser carregados antes deste arquivo.
// ==========================================================


// ==========================================================
// ESTADO
// ==========================================================

let eventoHubAtual = null;
let planosHub = [];


// ==========================================================
// ID DO EVENTO
// ==========================================================

const parametrosAtivarHub =
    new URLSearchParams(
        window.location.search
    );

const eventoIdAtivarHub =
    parametrosAtivarHub.get('id');


// ==========================================================
// TRADUÇÃO
// ==========================================================

function tAtivarHub(
    chave,
    parametros = {}
) {

    let texto =
        window.I18n &&
        typeof I18n.t === 'function'
            ? I18n.t(chave)
            : chave;


    Object.entries(
        parametros
    ).forEach(
        ([nome, valor]) => {

            texto =
                String(texto).replaceAll(
                    `{${nome}}`,
                    valor ?? ''
                );

        }
    );


    return texto;

}


// ==========================================================
// IDIOMA / LOCALE
// ==========================================================

function obterLocaleAtivarHub() {

    let idioma =
        'pt';


    if (
        window.I18n &&
        typeof I18n.getIdioma === 'function'
    ) {

        idioma =
            I18n.getIdioma() ||
            'pt';

    } else if (
        window.I18n &&
        typeof I18n.getIdiomaAtual === 'function'
    ) {

        idioma =
            I18n.getIdiomaAtual() ||
            'pt';

    }


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
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
    'DOMContentLoaded',
    inicializarAtivarHub
);


async function inicializarAtivarHub() {

    // ======================================================
    // AUTENTICAÇÃO
    // ======================================================

    if (
        !window.Auth ||
        !Auth.protegerPagina()
    ) {

        return;

    }


    // ======================================================
    // TROCA DE IDIOMA
    // ======================================================

    configurarTrocaIdiomaAtivarHub();


    // ======================================================
    // ID
    // ======================================================

    if (!eventoIdAtivarHub) {

        mostrarErroAtivarHub(
            tAtivarHub(
                'ativarHubNenhumEvento'
            )
        );

        return;

    }


    carregarUsuarioAtivarHub();


    try {

        // ==================================================
        // EVENTO
        // ==================================================

        await carregarEventoAtivarHub();


        // ==================================================
        // PLANOS
        // ==================================================

        await carregarPlanosHub();


        // ==================================================
        // ESTADO VISUAL
        // ==================================================

        atualizarEstadoHub();


        mostrarConteudoAtivarHub();


    } catch (error) {

        console.error(
            'Erro ao inicializar ativação do Hub:',
            error
        );


        mostrarErroAtivarHub(
            error.message ||
            tAtivarHub(
                'ativarHubErroCarregar'
            )
        );

    }

}


// ==========================================================
// TROCA DE IDIOMA
// ==========================================================

function configurarTrocaIdiomaAtivarHub() {

    window.addEventListener(
        'mblf:idiomaAlterado',
        function () {

            carregarUsuarioAtivarHub();

            if (eventoHubAtual) {

                preencherEventoAtivarHub();

                atualizarEstadoHub();

            }

            if (planosHub.length > 0) {

                renderizarPlanosHub();

            }

        }
    );

}


// ==========================================================
// USUÁRIO
// ==========================================================

function carregarUsuarioAtivarHub() {

    const usuario =
        Auth.getUsuario();


    if (!usuario) {
        return;
    }


    definirTextoAtivarHub(
        'nav-nome-usuario',
        usuario.nome ||
        tAtivarHub(
            'perfilUsuario'
        )
    );


    definirTextoAtivarHub(
        'nav-perfil-usuario',
        formatarPerfilAtivarHub(
            usuario.perfil
        )
    );

}


// ==========================================================
// PERFIL
// ==========================================================

function formatarPerfilAtivarHub(
    perfil
) {

    switch (perfil) {

        case 'ADMIN':

            return tAtivarHub(
                'perfilAdmin'
            );


        case 'FUNCIONARIO':

            return tAtivarHub(
                'perfilFuncionario'
            );


        case 'USUARIO':

        default:

            return tAtivarHub(
                'perfilUsuario'
            );

    }

}


// ==========================================================
// CARREGAR EVENTO
// ==========================================================

async function carregarEventoAtivarHub() {

    const response =
        await Auth.fetchAutenticado(
            `/eventos/${encodeURIComponent(
                eventoIdAtivarHub
            )}`
        );


    if (!response.ok) {

        const erro =
            await lerErroAtivarHub(
                response
            );


        throw new Error(
            extrairErroAtivarHub(
                erro,
                tAtivarHub(
                    'ativarHubErroCarregarEvento'
                )
            )
        );

    }


    eventoHubAtual =
        await response.json();


    // ======================================================
    // VALIDAR ORGANIZADOR
    // ======================================================

    const usuarioId =
        Number(
            Auth.getUsuarioId()
        );


    const organizadorId =
        Number(
            eventoHubAtual.organizadorId
        );


    if (
        !usuarioId ||
        !organizadorId ||
        usuarioId !== organizadorId
    ) {

        throw new Error(
            tAtivarHub(
                'ativarHubSomenteOrganizador'
            )
        );

    }


    preencherEventoAtivarHub();

}


// ==========================================================
// PREENCHER EVENTO
// ==========================================================

function preencherEventoAtivarHub() {

    if (!eventoHubAtual) {
        return;
    }


    definirTextoAtivarHub(
        'tituloEventoHubPlano',
        eventoHubAtual.titulo ||
        tAtivarHub(
            'evEvento'
        )
    );


    definirTextoAtivarHub(
        'textoHubAte',
        eventoHubAtual.hubAte
            ? formatarDataHoraAtivarHub(
                eventoHubAtual.hubAte
            )
            : tAtivarHub(
                'ativarHubNaoContratado'
            )
    );


    const linkHub =
        document.getElementById(
            'linkAcessarHub'
        );


    if (linkHub) {

        linkHub.href =
            `hubEvento.html?id=${encodeURIComponent(
                eventoHubAtual.id
            )}`;

    }

}


// ==========================================================
// CARREGAR PLANOS HUB
// ==========================================================

async function carregarPlanosHub() {

    const container =
        document.getElementById(
            'containerPlanosHub'
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
                ${escapeHtmlAtivarHub(
                    tAtivarHub(
                        'ativarHubBuscandoPlanos'
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
                await lerErroAtivarHub(
                    response
                );


            throw new Error(
                extrairErroAtivarHub(
                    erro,
                    tAtivarHub(
                        'ativarHubErroCarregarPlanos'
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
        // SOMENTE HUB
        // ==================================================

        planosHub =
            todosPlanos.filter(
                plano =>
                    String(
                        plano.tipo ||
                        ''
                    ).toUpperCase() ===
                    'HUB'
            );


        renderizarPlanosHub();


    } catch (error) {

        console.error(
            'Erro ao carregar planos HUB:',
            error
        );


        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    <i
                        class="bi bi-exclamation-triangle me-2"
                    ></i>

                    ${escapeHtmlAtivarHub(
                        error.message ||
                        tAtivarHub(
                            'ativarHubErroCarregarPlanos'
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

function renderizarPlanosHub() {

    const container =
        document.getElementById(
            'containerPlanosHub'
        );


    if (!container) {
        return;
    }


    if (
        planosHub.length === 0
    ) {

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning">

                    <i
                        class="bi bi-info-circle me-2"
                    ></i>

                    ${escapeHtmlAtivarHub(
                        tAtivarHub(
                            'ativarHubNenhumPlano'
                        )
                    )}

                </div>

            </div>

        `;


        return;

    }


    container.innerHTML =
        planosHub
            .map(
                criarCardPlanoHub
            )
            .join('');

}


// ==========================================================
// CARD DO PLANO HUB
// ==========================================================

function criarCardPlanoHub(
    plano
) {

    const valor =
        formatarMoedaAtivarHub(
            plano.valor
        );


    const duracao =
        Number(
            plano.duracaoDias ||
            0
        );


    let textoDuracao;


    if (duracao > 0) {

        textoDuracao =
            tAtivarHub(
                duracao === 1
                    ? 'ativarHubDia'
                    : 'ativarHubDias',
                {
                    duracao
                }
            );

    } else {

        textoDuracao =
            tAtivarHub(
                'ativarHubDuracaoNaoInformada'
            );

    }


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

                            ${escapeHtmlAtivarHub(
                                plano.nome ||
                                tAtivarHub(
                                    'ativarHubPlanoPadrao'
                                )
                            )}

                        </h5>


                        <p
                            class="small text-muted-theme mb-0"
                        >

                            ${escapeHtmlAtivarHub(
                                textoDuracao
                            )}

                        </p>

                    </div>


                    <span class="badge bg-primary">
                        Hub
                    </span>

                </div>


                <div class="mb-4">

                    <span
                        class="fs-3 fw-bold text-primary"
                    >

                        ${escapeHtmlAtivarHub(
                            valor
                        )}

                    </span>

                </div>


                <button
                    type="button"
                    class="btn btn-outline-primary w-100 fw-semibold"
                    onclick="contratarPlanoHub(${Number(plano.id)})"
                >

                    <i
                        class="bi bi-credit-card me-1"
                    ></i>

                    ${escapeHtmlAtivarHub(
                        tAtivarHub(
                            'ativarHubSelecionarPlano'
                        )
                    )}

                </button>

            </div>

        </div>

    `;

}


// ==========================================================
// CONTRATAR PLANO HUB
// ==========================================================

async function contratarPlanoHub(
    planoId
) {

    if (!eventoHubAtual) {
        return;
    }


    const plano =
        planosHub.find(
            item =>
                Number(item.id) ===
                Number(planoId)
        );


    if (!plano) {

        mostrarAlertaPagamentoHub(
            tAtivarHub(
                'ativarHubPlanoNaoEncontrado'
            ),
            'danger'
        );

        return;

    }


    const valorFormatado =
        formatarMoedaAtivarHub(
            plano.valor
        );


    const confirmar =
        window.confirm(
            tAtivarHub(
                'ativarHubConfirmarPlano',
                {
                    nome:
                        plano.nome ||
                        tAtivarHub(
                            'ativarHubPlanoPadrao'
                        ),

                    valor:
                        valorFormatado
                }
            )
        );


    if (!confirmar) {
        return;
    }


    ocultarAlertaPagamentoHub();


    desabilitarBotoesPlanosHub(
        true
    );


    try {

        // ==================================================
        // POST /pagamentos/simular
        //
        // Mesmo endpoint usado na publicação.
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
                                    eventoHubAtual.id
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
                extrairErroAtivarHub(
                    data,
                    tAtivarHub(
                        'ativarHubErroContratar'
                    )
                )
            );

        }


        mostrarAlertaPagamentoHub(
            tAtivarHub(
                'ativarHubSucessoContratar'
            ),
            'success'
        );


        // ==================================================
        // PAGAMENTO RETORNA PagamentoDTO,
        // então buscamos o evento novamente.
        // ==================================================

        await recarregarEventoHub();


        atualizarEstadoHub();


    } catch (error) {

        console.error(
            'Erro ao contratar plano HUB:',
            error
        );


        mostrarAlertaPagamentoHub(
            error.message ||
            tAtivarHub(
                'ativarHubErroContratar'
            ),
            'danger'
        );


    } finally {

        desabilitarBotoesPlanosHub(
            false
        );

    }

}


// ==========================================================
// RECARREGAR EVENTO
// ==========================================================

async function recarregarEventoHub() {

    const response =
        await Auth.fetchAutenticado(
            `/eventos/${encodeURIComponent(
                eventoIdAtivarHub
            )}`
        );


    if (!response.ok) {

        throw new Error(
            tAtivarHub(
                'ativarHubErroAtualizarEvento'
            )
        );

    }


    eventoHubAtual =
        await response.json();


    preencherEventoAtivarHub();

}


// ==========================================================
// ATUALIZAR ESTADO DO HUB
// ==========================================================

function atualizarEstadoHub() {

    if (!eventoHubAtual) {
        return;
    }


    const ativo =
        hubAtivoAgora();


    const badge =
        document.getElementById(
            'badgeStatusHubPlano'
        );


    const secaoHubAtivo =
        document.getElementById(
            'secaoHubAtivo'
        );


    // ======================================================
    // HUB ATIVO
    // ======================================================

    if (ativo) {

        if (badge) {

            badge.className =
                'badge bg-success';


            badge.innerHTML = `

                <i
                    class="bi bi-check-circle me-1"
                ></i>

                ${escapeHtmlAtivarHub(
                    tAtivarHub(
                        'ativarHubAtivo'
                    )
                )}

            `;

        }


        if (secaoHubAtivo) {

            secaoHubAtivo.classList.remove(
                'd-none'
            );

        }


        definirTextoAtivarHub(
            'textoHubAte',
            formatarDataHoraAtivarHub(
                eventoHubAtual.hubAte
            )
        );


        return;

    }


    // ======================================================
    // HUB INATIVO
    // ======================================================

    if (badge) {

        badge.className =
            'badge bg-secondary';


        badge.innerHTML = `

            <i
                class="bi bi-lock me-1"
            ></i>

            ${escapeHtmlAtivarHub(
                tAtivarHub(
                    'ativarHubInativo'
                )
            )}

        `;

    }


    if (secaoHubAtivo) {

        secaoHubAtivo.classList.add(
            'd-none'
        );

    }


    if (eventoHubAtual.hubAte) {

        definirTextoAtivarHub(
            'textoHubAte',
            tAtivarHub(
                'ativarHubExpiradoEm',
                {
                    data:
                        formatarDataHoraAtivarHub(
                            eventoHubAtual.hubAte
                        )
                }
            )
        );

    } else {

        definirTextoAtivarHub(
            'textoHubAte',
            tAtivarHub(
                'ativarHubNaoContratado'
            )
        );

    }

}


// ==========================================================
// HUB ATIVO?
// ==========================================================

function hubAtivoAgora() {

    if (
        !eventoHubAtual ||
        !eventoHubAtual.hubAte
    ) {

        return false;

    }


    const data =
        new Date(
            eventoHubAtual.hubAte
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
// DESABILITAR BOTÕES
// ==========================================================

function desabilitarBotoesPlanosHub(
    desabilitar
) {

    const botoes =
        document.querySelectorAll(
            '#containerPlanosHub button'
        );


    botoes.forEach(
        botao => {

            botao.disabled =
                desabilitar;

        }
    );

}


// ==========================================================
// ALERTA PAGAMENTO
// ==========================================================

function mostrarAlertaPagamentoHub(
    mensagem,
    tipo
) {

    const alerta =
        document.getElementById(
            'alertHubPagamento'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        `alert alert-${tipo}`;


    alerta.textContent =
        mensagem;

}


function ocultarAlertaPagamentoHub() {

    const alerta =
        document.getElementById(
            'alertHubPagamento'
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
// MOSTRAR CONTEÚDO
// ==========================================================

function mostrarConteudoAtivarHub() {

    document.getElementById(
        'loadingHubPlano'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'erroHubPlano'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'conteudoHubPlano'
    )?.classList.remove(
        'd-none'
    );

}


// ==========================================================
// ERRO
// ==========================================================

function mostrarErroAtivarHub(
    mensagem
) {

    document.getElementById(
        'loadingHubPlano'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'conteudoHubPlano'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'erroHubPlano'
    )?.classList.remove(
        'd-none'
    );


    definirTextoAtivarHub(
        'mensagemErroHubPlano',
        mensagem
    );

}


// ==========================================================
// FORMATAR MOEDA
// ==========================================================

function formatarMoedaAtivarHub(
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

        return 'R$ 0,00';

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

function formatarDataHoraAtivarHub(
    data
) {

    if (!data) {

        return '-';

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

        return '-';

    }


    return valor.toLocaleString(
        obterLocaleAtivarHub(),
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

function definirTextoAtivarHub(
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
// LER ERRO
// ==========================================================

async function lerErroAtivarHub(
    response
) {

    try {

        return await response
            .clone()
            .json();


    } catch (error) {

        try {

            return await response.text();


        } catch (erroTexto) {

            return {};

        }

    }

}


// ==========================================================
// EXTRAIR ERRO
// ==========================================================

function extrairErroAtivarHub(
    data,
    padrao
) {

    if (!data) {

        return padrao;

    }


    if (
        typeof data ===
        'string'
    ) {

        return (
            data.trim() ||
            padrao
        );

    }


    return (
        data.mensagem ||
        data.message ||
        data.erro ||
        padrao
    );

}


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHtmlAtivarHub(
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
// EXPORTAÇÃO
// ==========================================================

window.contratarPlanoHub =
    contratarPlanoHub;