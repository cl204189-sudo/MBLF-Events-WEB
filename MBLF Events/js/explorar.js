// ==========================================================
// MBLF EVENTS
// explorar.js
//
// Responsável por:
// - carregar eventos públicos
// - permitir acesso sem login
// - adaptar navbar para visitante/logado
// - pesquisar eventos
// - atualizar quantidade de resultados
// - limpar pesquisa
// - montar cards dos eventos
// - atualizar textos dinâmicos conforme o idioma
// ==========================================================



// ==========================================================
// CONFIGURAÇÃO
// ==========================================================

const EXPLORAR_API_BASE_URL =
    'http://localhost:8080';



// ==========================================================
// ESTADO DA PÁGINA
// ==========================================================

let listaEventos = [];



// ==========================================================
// INTERNACIONALIZAÇÃO
// ==========================================================

function t(
    chave,
    variaveis = {}
) {

    let texto = chave;


    if (
        window.I18n &&
        typeof I18n.t === 'function'
    ) {

        texto =
            I18n.t(chave) ||
            chave;

    }


    Object.entries(
        variaveis
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
// IDIOMA / LOCALE
// ==========================================================

function obterLocaleAtual() {

    let idioma = 'pt';


    if (
        window.I18n &&
        typeof I18n.getIdiomaAtual === 'function'
    ) {

        idioma =
            I18n.getIdiomaAtual();

    } else if (
        window.I18n &&
        typeof I18n.getIdioma === 'function'
    ) {

        idioma =
            I18n.getIdioma();

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
    inicializarExplorar
);



async function inicializarExplorar() {

    configurarNavbar();

    configurarBusca();

    configurarMudancaIdioma();

    await carregarEventosPublicos();

}



// ==========================================================
// ALTERAÇÃO DE IDIOMA
// ==========================================================

function configurarMudancaIdioma() {

    window.addEventListener(
        'mblf:idiomaAlterado',
        () => {

            configurarNavbar();

            filtrarEventos();

        }
    );

}



// ==========================================================
// NAVBAR
// ==========================================================

function configurarNavbar() {

    const areaVisitante =
        document.getElementById(
            'areaVisitante'
        );


    const areaUsuario =
        document.getElementById(
            'areaUsuario'
        );


    const navItemPainel =
        document.getElementById(
            'navItemPainel'
        );


    const secaoCadastro =
        document.getElementById(
            'secaoCadastro'
        );


    const nomeUsuario =
        document.getElementById(
            'nav-nome-usuario'
        );


    const perfilUsuario =
        document.getElementById(
            'nav-perfil-usuario'
        );


    // ======================================================
    // VERIFICA SESSÃO
    // ======================================================

    const usuarioLogado =
        window.Auth &&
        Auth.estaLogado();


    // ======================================================
    // USUÁRIO AUTENTICADO
    // ======================================================

    if (usuarioLogado) {

        const usuario =
            Auth.getUsuario();


        // Esconde opções de visitante
        if (areaVisitante) {

            areaVisitante.classList.add(
                'd-none'
            );

            areaVisitante.classList.remove(
                'd-flex'
            );

        }


        // Mostra opções do usuário
        if (areaUsuario) {

            areaUsuario.classList.remove(
                'd-none'
            );

            areaUsuario.classList.add(
                'd-flex'
            );

        }


        // Mostra link para painel
        if (navItemPainel) {

            navItemPainel.classList.remove(
                'd-none'
            );

        }


        // Esconde CTA de cadastro
        if (secaoCadastro) {

            secaoCadastro.classList.add(
                'd-none'
            );

        }


        // Nome
        if (
            nomeUsuario &&
            usuario
        ) {

            nomeUsuario.textContent =
                usuario.nome ||
                t('perfilUsuario');

        }


        // Perfil
        if (
            perfilUsuario &&
            usuario
        ) {

            perfilUsuario.textContent =
                formatarPerfil(
                    usuario.perfil
                );

        }


        return;

    }


    // ======================================================
    // VISITANTE
    // ======================================================

    if (areaVisitante) {

        areaVisitante.classList.remove(
            'd-none'
        );

        areaVisitante.classList.add(
            'd-flex'
        );

    }


    if (areaUsuario) {

        areaUsuario.classList.add(
            'd-none'
        );

        areaUsuario.classList.remove(
            'd-flex'
        );

    }


    if (navItemPainel) {

        navItemPainel.classList.add(
            'd-none'
        );

    }


    if (secaoCadastro) {

        secaoCadastro.classList.remove(
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
                'perfilAdmin'
            );


        case 'FUNCIONARIO':

            return t(
                'perfilFuncionario'
            );


        case 'USUARIO':

        default:

            return t(
                'perfilUsuario'
            );

    }

}



// ==========================================================
// CONFIGURAR BUSCA
// ==========================================================

function configurarBusca() {

    const inputBusca =
        document.getElementById(
            'inputBusca'
        );


    const btnLimpar =
        document.getElementById(
            'btnLimparBusca'
        );


    // Pesquisa enquanto digita
    if (inputBusca) {

        inputBusca.addEventListener(
            'input',
            filtrarEventos
        );

    }


    // Limpar pesquisa
    if (btnLimpar) {

        btnLimpar.addEventListener(
            'click',
            limparBusca
        );

    }

}



// ==========================================================
// CARREGAR EVENTOS PÚBLICOS
// ==========================================================

async function carregarEventosPublicos() {

    const container =
        document.getElementById(
            'containerEventos'
        );


    if (!container) {
        return;
    }


    // Loading
    container.innerHTML = `

        <div class="col-12 text-center py-5">

            <div
                class="spinner-border text-primary"
                role="status"
            ></div>

            <p class="text-muted-theme mt-3 mb-0">

                ${escapeHtml(
                    t(
                        'explorarBuscandoPublicos'
                    )
                )}

            </p>

        </div>

    `;


    atualizarTextoQuantidade(
        null
    );


    try {

        // ==================================================
        // ROTA PÚBLICA
        //
        // Não usamos Auth.fetchAutenticado() aqui,
        // pois visitantes também podem explorar eventos.
        // ==================================================

        const response =
            await fetch(
                `${EXPLORAR_API_BASE_URL}/eventos/publicos`
            );


        if (!response.ok) {

            throw new Error(
                t(
                    'explorarErroCarregar'
                )
            );

        }


        const dados =
            await response.json();


        listaEventos =
            Array.isArray(dados)
                ? dados
                : [];


        // Organiza os eventos por data
        listaEventos =
            ordenarEventosPorData(
                listaEventos
            );


        renderizarEventos(
            listaEventos
        );


    } catch (error) {

        console.error(
            'Erro ao buscar eventos públicos:',
            error
        );


        listaEventos = [];


        atualizarTextoQuantidade(
            0
        );


        container.innerHTML = `

            <div class="col-12">

                <div
                    class="alert alert-danger text-center"
                >

                    <i
                        class="bi bi-exclamation-triangle me-2"
                    ></i>

                    ${escapeHtml(
                        t(
                            'explorarErroCarregar'
                        )
                    )}

                    <div class="small mt-2">

                        ${escapeHtml(
                            t(
                                'explorarVerifiqueApi'
                            )
                        )}

                    </div>

                </div>

            </div>

        `;

    }

}



// ==========================================================
// ORDENAR EVENTOS
// ==========================================================

function ordenarEventosPorData(
    eventos
) {

    return [...eventos].sort(
        (eventoA, eventoB) => {

            const dataA =
                eventoA.dataInicio
                    ? new Date(
                        eventoA.dataInicio
                    ).getTime()
                    : Number.MAX_SAFE_INTEGER;


            const dataB =
                eventoB.dataInicio
                    ? new Date(
                        eventoB.dataInicio
                    ).getTime()
                    : Number.MAX_SAFE_INTEGER;


            // Datas inválidas vão para o final
            const valorA =
                Number.isNaN(dataA)
                    ? Number.MAX_SAFE_INTEGER
                    : dataA;


            const valorB =
                Number.isNaN(dataB)
                    ? Number.MAX_SAFE_INTEGER
                    : dataB;


            return valorA - valorB;

        }
    );

}



// ==========================================================
// RENDERIZAR EVENTOS
// ==========================================================

function renderizarEventos(
    eventos
) {

    const container =
        document.getElementById(
            'containerEventos'
        );


    if (!container) {
        return;
    }


    atualizarTextoQuantidade(
        eventos.length
    );


    // ======================================================
    // NENHUM RESULTADO
    // ======================================================

    if (
        eventos.length === 0
    ) {

        const buscaAtiva =
            obterTermoBusca() !== '';


        const titulo =
            buscaAtiva
                ? t(
                    'explorarNenhumEncontrado'
                )
                : t(
                    'explorarNenhumDisponivel'
                );


        const descricao =
            buscaAtiva
                ? t(
                    'explorarTenteOutroTermo'
                )
                : t(
                    'explorarSemEventosPublicos'
                );


        container.innerHTML = `

            <div
                class="col-12 text-center text-muted-theme py-5"
            >

                <i
                    class="bi ${
                        buscaAtiva
                            ? 'bi-search'
                            : 'bi-calendar-x'
                    }"
                    style="font-size: 3rem;"
                ></i>


                <h5 class="fw-bold text-main-theme mt-3">

                    ${escapeHtml(
                        titulo
                    )}

                </h5>


                <p>

                    ${escapeHtml(
                        descricao
                    )}

                </p>


                ${
                    buscaAtiva
                        ? `
                            <button
                                type="button"
                                class="btn btn-outline-primary btn-sm"
                                onclick="limparBusca()"
                            >

                                <i class="bi bi-x-lg me-1"></i>

                                ${escapeHtml(
                                    t(
                                        'explorarLimparBusca'
                                    )
                                )}

                            </button>
                        `
                        : ''
                }

            </div>

        `;


        return;

    }


    // ======================================================
    // CARDS
    // ======================================================

    container.innerHTML =
        eventos
            .map(
                criarCardEvento
            )
            .join('');

}



// ==========================================================
// CARD DO EVENTO
// ==========================================================

function criarCardEvento(
    evento
) {

    const dataInicio =
        formatarData(
            evento.dataInicio
        );


    const horario =
        formatarHorario(
            evento.dataInicio
        );


    const local =
        montarLocal(
            evento
        );


    const vagas =
        obterTextoVagas(
            evento
        );


    const tipo =
        evento.tipo ||
        t(
            'explorarEventoGenerico'
        );


    const descricao =
        resumirTexto(
            evento.descricao,
            120
        );


    const inscricoesAbertas =
        evento.inscricoesAbertas === true;


    const semVagas =
        evento.vagasTotal !== null &&
        evento.vagasTotal !== undefined &&
        Number(
            evento.vagasDisponiveis
        ) <= 0;


    // ======================================================
    // BADGE DAS INSCRIÇÕES
    // ======================================================

    let badgeInscricao;


    if (semVagas) {

        badgeInscricao = `

            <span class="badge bg-danger">

                ${escapeHtml(
                    t(
                        'explorarEsgotado'
                    )
                )}

            </span>

        `;

    } else if (inscricoesAbertas) {

        badgeInscricao = `

            <span class="badge bg-success">

                ${escapeHtml(
                    t(
                        'explorarInscricoesAbertas'
                    )
                )}

            </span>

        `;

    } else {

        badgeInscricao = `

            <span class="badge bg-secondary">

                ${escapeHtml(
                    t(
                        'explorarInscricoesFechadas'
                    )
                )}

            </span>

        `;

    }


    return `

        <div class="col-12 col-md-6 col-lg-4">

            <article
                class="card card-custom h-100 shadow-sm border-0"
            >

                <div
                    class="card-body d-flex flex-column p-4"
                >

                    <!-- Badges -->
                    <div
                        class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3"
                    >

                        <span class="badge bg-primary">

                            ${escapeHtml(tipo)}

                        </span>


                        ${badgeInscricao}

                    </div>


                    <!-- Título -->
                    <h5
                        class="card-title text-main-theme fw-bold mb-2"
                    >

                        ${escapeHtml(
                            evento.titulo ||
                            t(
                                'explorarEventoGenerico'
                            )
                        )}

                    </h5>


                    <!-- Descrição -->
                    <p
                        class="card-text text-muted-theme small flex-grow-1"
                    >

                        ${escapeHtml(
                            descricao
                        )}

                    </p>


                    <!-- Informações -->
                    <div
                        class="small text-muted-theme mb-3"
                    >

                        <!-- Data -->
                        <div class="mb-1">

                            <i class="bi bi-calendar3 me-1"></i>

                            ${escapeHtml(
                                dataInicio
                            )}

                            ${
                                horario !== '-'
                                    ? `
                                        ${escapeHtml(
                                            t(
                                                'explorarAs'
                                            )
                                        )}
                                        ${escapeHtml(
                                            horario
                                        )}
                                    `
                                    : ''
                            }

                        </div>


                        <!-- Local -->
                        <div class="mb-1">

                            <i class="bi bi-geo-alt me-1"></i>

                            ${escapeHtml(local)}

                        </div>


                        <!-- Vagas -->
                        <div>

                            <i class="bi bi-people me-1"></i>

                            ${escapeHtml(vagas)}

                        </div>

                    </div>


                    <!-- Detalhes -->
                    <a
                        href="detalhesEvento.html?id=${encodeURIComponent(
                            evento.id
                        )}"
                        class="btn btn-outline-primary w-100 fw-semibold"
                    >

                        <i class="bi bi-eye me-1"></i>

                        ${escapeHtml(
                            t(
                                'btnVerDetalhes'
                            )
                        )}

                    </a>

                </div>

            </article>

        </div>

    `;

}



// ==========================================================
// FILTRAR EVENTOS
// ==========================================================

function filtrarEventos() {

    const termo =
        obterTermoBusca();


    atualizarBotaoLimpar(
        termo !== ''
    );


    // Sem busca
    if (!termo) {

        renderizarEventos(
            listaEventos
        );


        return;

    }


    const filtrados =
        listaEventos.filter(
            evento => {

                const titulo =
                    normalizarTexto(
                        evento.titulo
                    );


                const descricao =
                    normalizarTexto(
                        evento.descricao
                    );


                const tipo =
                    normalizarTexto(
                        evento.tipo
                    );


                const cidade =
                    normalizarTexto(
                        evento.cidade
                    );


                const endereco =
                    normalizarTexto(
                        evento.endereco
                    );


                return (
                    titulo.includes(termo) ||
                    descricao.includes(termo) ||
                    tipo.includes(termo) ||
                    cidade.includes(termo) ||
                    endereco.includes(termo)
                );

            }
        );


    renderizarEventos(
        filtrados
    );

}



// ==========================================================
// PEGAR TERMO DE BUSCA
// ==========================================================

function obterTermoBusca() {

    const input =
        document.getElementById(
            'inputBusca'
        );


    if (!input) {
        return '';
    }


    return normalizarTexto(
        input.value
    );

}



// ==========================================================
// LIMPAR BUSCA
// ==========================================================

function limparBusca() {

    const input =
        document.getElementById(
            'inputBusca'
        );


    if (input) {

        input.value = '';

        input.focus();

    }


    atualizarBotaoLimpar(
        false
    );


    renderizarEventos(
        listaEventos
    );

}



// ==========================================================
// BOTÃO LIMPAR
// ==========================================================

function atualizarBotaoLimpar(
    mostrar
) {

    const botao =
        document.getElementById(
            'btnLimparBusca'
        );


    if (!botao) {
        return;
    }


    if (mostrar) {

        botao.classList.remove(
            'd-none'
        );

    } else {

        botao.classList.add(
            'd-none'
        );

    }

}



// ==========================================================
// QUANTIDADE DE EVENTOS
// ==========================================================

function atualizarTextoQuantidade(
    quantidade
) {

    const elemento =
        document.getElementById(
            'textoQuantidadeEventos'
        );


    if (!elemento) {
        return;
    }


    if (
        quantidade === null ||
        quantidade === undefined
    ) {

        elemento.textContent =
            t(
                'explorarBuscandoEventos'
            );


        return;

    }


    const termo =
        obterTermoBusca();


    // Sem filtro
    if (!termo) {

        if (quantidade === 0) {

            elemento.textContent =
                t(
                    'explorarQuantidadeZero'
                );

        } else if (quantidade === 1) {

            elemento.textContent =
                t(
                    'explorarQuantidadeUm'
                );

        } else {

            elemento.textContent =
                t(
                    'explorarQuantidadeVarios',
                    {
                        quantidade:
                            quantidade
                    }
                );

        }


        return;

    }


    // Com pesquisa
    if (quantidade === 0) {

        elemento.textContent =
            t(
                'explorarBuscaZero'
            );

    } else if (quantidade === 1) {

        elemento.textContent =
            t(
                'explorarBuscaUm'
            );

    } else {

        elemento.textContent =
            t(
                'explorarBuscaVarios',
                {
                    quantidade:
                        quantidade
                }
            );

    }

}



// ==========================================================
// MONTAR LOCAL
// ==========================================================

function montarLocal(
    evento
) {

    const endereco =
        String(
            evento.endereco ?? ''
        ).trim();


    const cidade =
        String(
            evento.cidade ?? ''
        ).trim();


    if (
        endereco &&
        cidade
    ) {

        return `${endereco} - ${cidade}`;

    }


    if (cidade) {

        return cidade;

    }


    if (endereco) {

        return endereco;

    }


    return t(
        'explorarLocalNaoInformado'
    );

}



// ==========================================================
// TEXTO DE VAGAS
// ==========================================================

function obterTextoVagas(
    evento
) {

    // Evento sem limite definido
    if (
        evento.vagasTotal === null ||
        evento.vagasTotal === undefined
    ) {

        return t(
            'explorarVagasNaoInformadas'
        );

    }


    const total =
        Number(
            evento.vagasTotal
        );


    const disponiveis =
        Number(
            evento.vagasDisponiveis ?? 0
        );


    return t(
        'explorarVagasDisponiveis',
        {
            disponiveis:
                Math.max(
                    disponiveis,
                    0
                ),

            total:
                total
        }
    );

}



// ==========================================================
// FORMATAR DATA
// ==========================================================

function formatarData(
    data
) {

    if (!data) {

        return t(
            'explorarDataNaoInformada'
        );

    }


    const valor =
        new Date(data);


    if (
        Number.isNaN(
            valor.getTime()
        )
    ) {

        return t(
            'explorarDataNaoInformada'
        );

    }


    return valor.toLocaleDateString(
        obterLocaleAtual(),
        {
            day:
                '2-digit',

            month:
                '2-digit',

            year:
                'numeric'
        }
    );

}



// ==========================================================
// FORMATAR HORÁRIO
// ==========================================================

function formatarHorario(
    data
) {

    if (!data) {

        return '-';

    }


    const valor =
        new Date(data);


    if (
        Number.isNaN(
            valor.getTime()
        )
    ) {

        return '-';

    }


    return valor.toLocaleTimeString(
        obterLocaleAtual(),
        {
            hour:
                '2-digit',

            minute:
                '2-digit'
        }
    );

}



// ==========================================================
// RESUMIR TEXTO
// ==========================================================

function resumirTexto(
    texto,
    limite = 120
) {

    const valor =
        String(
            texto ?? ''
        ).trim();


    if (!valor) {

        return t(
            'explorarSemDescricao'
        );

    }


    if (
        valor.length <= limite
    ) {

        return valor;

    }


    return (
        valor.substring(
            0,
            limite
        ) + '...'
    );

}



// ==========================================================
// NORMALIZAR TEXTO
//
// Além de transformar em minúsculas,
// remove acentos.
// ==========================================================

function normalizarTexto(
    valor
) {

    return String(
        valor ?? ''
    )
        .normalize('NFD')
        .replace(
            /[\u0300-\u036f]/g,
            ''
        )
        .trim()
        .toLowerCase();

}



// ==========================================================
// ESCAPE HTML
//
// Impede que textos vindos da API sejam
// interpretados como HTML.
// ==========================================================

function escapeHtml(
    valor
) {

    const div =
        document.createElement(
            'div'
        );


    div.textContent =
        String(
            valor ?? ''
        );


    return div.innerHTML;

}