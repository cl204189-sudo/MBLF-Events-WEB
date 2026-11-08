// ==========================================================
// MBLF EVENTS
// detalhesEvento.js
//
// Responsável por:
// - carregar evento
// - adaptar visitante / usuário logado
// - controlar inscrições
// - impedir inscrição do organizador
// - traduzir textos dinâmicos
// - formatar datas conforme idioma
// - copiar link do evento
// ==========================================================


// ==========================================================
// CONFIGURAÇÃO
// ==========================================================

const DETALHES_API_BASE_URL =
    'http://localhost:8080';


// ==========================================================
// ESTADO
// ==========================================================

let eventoAtual = null;
let inscricaoAtual = null;


// ==========================================================
// ID DO EVENTO
// ==========================================================

const parametrosUrl =
    new URLSearchParams(
        window.location.search
    );

const eventoId =
    parametrosUrl.get('id');


// ==========================================================
// I18N
// ==========================================================

function tDetalhes(
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
// LOCALE
// ==========================================================

function obterLocaleDetalhes() {

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
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
    'DOMContentLoaded',
    inicializarDetalhesEvento
);


async function inicializarDetalhesEvento() {

    if (!eventoId) {

        window.location.href =
            'explorar.html';

        return;

    }


    configurarNavbar();

    configurarCompartilhamento();

    configurarTrocaIdioma();


    await carregarEvento();

}


// ==========================================================
// TROCA DE IDIOMA
// ==========================================================

function configurarTrocaIdioma() {

    window.addEventListener(
        'mblf:idiomaAlterado',
        async function () {

            configurarNavbar();


            if (eventoAtual) {

                preencherEvento(
                    eventoAtual
                );


                await configurarInscricao();

            }

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


    const logado =
        window.Auth &&
        Auth.estaLogado();


    // ======================================================
    // LOGADO
    // ======================================================

    if (logado) {

        const usuario =
            Auth.getUsuario();


        if (areaVisitante) {

            areaVisitante.classList.add(
                'd-none'
            );

            areaVisitante.classList.remove(
                'd-flex'
            );

        }


        if (areaUsuario) {

            areaUsuario.classList.remove(
                'd-none'
            );

            areaUsuario.classList.add(
                'd-flex'
            );

        }


        if (navItemPainel) {

            navItemPainel.classList.remove(
                'd-none'
            );

        }


        if (secaoCadastro) {

            secaoCadastro.classList.add(
                'd-none'
            );

        }


        if (
            nomeUsuario &&
            usuario
        ) {

            nomeUsuario.textContent =
                usuario.nome ||
                tDetalhes(
                    'perfilUsuario'
                );

        }


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
// PERFIL
// ==========================================================

function formatarPerfil(
    perfil
) {

    switch (perfil) {

        case 'ADMIN':

            return tDetalhes(
                'perfilAdmin'
            );


        case 'FUNCIONARIO':

            return tDetalhes(
                'perfilFuncionario'
            );


        case 'USUARIO':

        default:

            return tDetalhes(
                'perfilUsuario'
            );

    }

}


// ==========================================================
// CARREGAR EVENTO
// ==========================================================

async function carregarEvento() {

    mostrarLoading();


    try {

        let evento = null;


        // ==================================================
        // LOGADO
        // ==================================================

        if (
            window.Auth &&
            Auth.estaLogado()
        ) {

            const response =
                await Auth.fetchAutenticado(
                    `/eventos/${encodeURIComponent(
                        eventoId
                    )}`
                );


            if (!response.ok) {

                throw new Error(
                    tDetalhes(
                        response.status === 404
                            ? 'detEventoNaoEncontrado'
                            : 'detErroCarregarEvento'
                    )
                );

            }


            evento =
                await response.json();

        }


        // ==================================================
        // VISITANTE
        // ==================================================

        else {

            const response =
                await fetch(
                    `${DETALHES_API_BASE_URL}/eventos/publicos`
                );


            if (!response.ok) {

                throw new Error(
                    tDetalhes(
                        'detErroEventosPublicos'
                    )
                );

            }


            const eventos =
                await response.json();


            if (
                Array.isArray(
                    eventos
                )
            ) {

                evento =
                    eventos.find(
                        item =>
                            Number(item.id) ===
                            Number(eventoId)
                    ) || null;

            }

        }


        if (!evento) {

            throw new Error(
                tDetalhes(
                    'detEventoNaoEncontrado'
                )
            );

        }


        eventoAtual =
            evento;


        preencherEvento(
            eventoAtual
        );


        mostrarConteudo();

        const btnChatEvento = document.getElementById('btnChatEvento');
        if (btnChatEvento && window.Auth && Auth.estaLogado()) {
            btnChatEvento.href = `chatEvento.html?id=${encodeURIComponent(eventoAtual.id)}`;
            btnChatEvento.style.display = '';
        }

        await configurarInscricao();


    } catch (error) {

        console.error(
            'Erro ao carregar evento:',
            error
        );


        mostrarErro(
            error.message ||
            tDetalhes(
                'detErroCarregarEvento'
            )
        );

    }

}


// ==========================================================
// PREENCHER EVENTO
// ==========================================================

function preencherEvento(
    evento
) {

    if (!evento) {
        return;
    }


    document.title =
        `${evento.titulo ||
        tDetalhes('detEvento')} - MBLF Events`;


    // ======================================================
    // HERO
    // ======================================================

    definirTexto(
        'tituloEvento',
        evento.titulo ||
        tDetalhes(
            'detEvento'
        )
    );


    definirTexto(
        'badgeTipoEvento',
        evento.tipo ||
        tDetalhes(
            'detEvento'
        )
    );


    definirTexto(
        'organizadorEvento',
        evento.organizadorNome ||
        tDetalhes(
            'detOrganizadorNaoInformado'
        )
    );


    definirTexto(
        'dataEvento',
        formatarDataResumida(
            evento.dataInicio
        )
    );


    definirTexto(
        'localEvento',
        montarLocal(
            evento
        )
    );


    configurarBadgeStatusEvento(
        evento.status
    );


    // ======================================================
    // DESCRIÇÃO
    // ======================================================

    definirTexto(
        'descricaoEvento',
        evento.descricao ||
        tDetalhes(
            'detSemDescricao'
        )
    );


    // ======================================================
    // DATAS
    // ======================================================

    definirTexto(
        'dataInicioEvento',
        formatarDataHora(
            evento.dataInicio
        )
    );


    definirTexto(
        'dataFimEvento',
        formatarDataHora(
            evento.dataFim
        )
    );


    // ======================================================
    // CARGA HORÁRIA
    // ======================================================

    definirTexto(
        'cargaHorariaEvento',

        evento.cargaHoraria !== null &&
        evento.cargaHoraria !== undefined

            ? tDetalhes(
                'detHoras',
                {
                    horas:
                        evento.cargaHoraria
                }
            )

            : tDetalhes(
                'detNaoInformada'
            )
    );


    // ======================================================
    // TIPO
    // ======================================================

    definirTexto(
        'tipoEvento',
        evento.tipo ||
        tDetalhes(
            'detNaoInformado'
        )
    );


    // ======================================================
    // LOCALIZAÇÃO
    // ======================================================

    definirTexto(
        'enderecoEvento',
        evento.endereco ||
        tDetalhes(
            'detEnderecoNaoInformado'
        )
    );


    definirTexto(
        'cidadeEvento',
        evento.cidade ||
        tDetalhes(
            'detCidadeNaoInformada'
        )
    );


    // ======================================================
    // VAGAS
    // ======================================================

    atualizarVagas(
        evento
    );

}


// ==========================================================
// STATUS DO EVENTO
// ==========================================================

function configurarBadgeStatusEvento(
    status
) {

    const badge =
        document.getElementById(
            'badgeStatusEvento'
        );


    if (!badge) {
        return;
    }


    switch (status) {

        case 'PUBLICADO':

            badge.className =
                'badge bg-success ms-2';

            badge.textContent =
                tDetalhes(
                    'detStatusPublicado'
                );

            break;


        case 'ENCERRADO':

            badge.className =
                'badge bg-secondary ms-2';

            badge.textContent =
                tDetalhes(
                    'detStatusEncerrado'
                );

            break;


        case 'CANCELADO':

            badge.className =
                'badge bg-danger ms-2';

            badge.textContent =
                tDetalhes(
                    'detStatusCancelado'
                );

            break;


        case 'REMOVIDO_ADMIN':

            badge.className =
                'badge bg-danger ms-2';

            badge.textContent =
                tDetalhes(
                    'detStatusRemovido'
                );

            break;


        case 'RASCUNHO':

        default:

            badge.className =
                'badge bg-warning text-dark ms-2';

            badge.textContent =
                tDetalhes(
                    'detStatusRascunho'
                );

            break;

    }

}


// ==========================================================
// VAGAS
// ==========================================================

function atualizarVagas(
    evento
) {

    const disponiveisEl =
        document.getElementById(
            'vagasDisponiveis'
        );


    const totalEl =
        document.getElementById(
            'vagasTotal'
        );


    const textoVagas =
        document.getElementById(
            'textoVagas'
        );


    // ======================================================
    // SEM LIMITE
    // ======================================================

    if (
        evento.vagasTotal === null ||
        evento.vagasTotal === undefined
    ) {

        if (disponiveisEl) {

            disponiveisEl.textContent =
                '—';

        }


        if (totalEl) {

            totalEl.textContent =
                tDetalhes(
                    'detSemLimite'
                );

        }


        if (textoVagas) {

            textoVagas.innerHTML = `

                <i class="bi bi-people me-1"></i>

                ${escapeHtml(
                    tDetalhes(
                        'detVagasNaoInformadas'
                    )
                )}

            `;

        }


        return;

    }


    const total =
        Number(
            evento.vagasTotal
        );


    const disponiveis =
        Number(
            evento.vagasDisponiveis ?? 0
        );


    if (disponiveisEl) {

        disponiveisEl.textContent =
            disponiveis;

    }


    if (totalEl) {

        totalEl.textContent =
            `/ ${total}`;

    }


    if (textoVagas) {

        textoVagas.innerHTML = `

            <i class="bi bi-people me-1"></i>

            ${escapeHtml(
                tDetalhes(
                    'detQuantidadeVagas',
                    {
                        disponiveis,
                        total
                    }
                )
            )}

        `;

    }

}


// ==========================================================
// CONFIGURAR INSCRIÇÃO
// ==========================================================

async function configurarInscricao() {

    const btn =
        document.getElementById(
            'btnInscricao'
        );


    if (
        !btn ||
        !eventoAtual
    ) {

        return;

    }


    btn.onclick =
        null;


    // ======================================================
    // 1. NÃO PUBLICADO
    // ======================================================

    if (
        eventoAtual.status !==
        'PUBLICADO'
    ) {

        configurarBotaoDesabilitado(
            tDetalhes(
                'detEventoNaoDisponivel'
            ),
            tDetalhes(
                'detEventoNaoPublicado'
            )
        );


        configurarBadgeInscricao(
            tDetalhes(
                'detEventoNaoDisponivel'
            ),
            'secondary'
        );


        return;

    }


    // ======================================================
    // 2. PUBLICAÇÃO EXPIRADA
    // ======================================================

    if (
        !publicacaoEstaAtiva(
            eventoAtual.publicacaoAte
        )
    ) {

        configurarBotaoDesabilitado(
            tDetalhes(
                'detPublicacaoEncerrada'
            ),
            tDetalhes(
                'detPublicacaoTerminou'
            )
        );


        configurarBadgeInscricao(
            tDetalhes(
                'detPublicacaoEncerrada'
            ),
            'secondary'
        );


        return;

    }


    // ======================================================
    // 3. INSCRIÇÕES FECHADAS
    // ======================================================

    if (
        eventoAtual.inscricoesAbertas !==
        true
    ) {

        configurarBotaoDesabilitado(
            tDetalhes(
                'detInscricoesFechadas'
            ),
            tDetalhes(
                'detInscricoesFechadasAjuda'
            )
        );


        configurarBadgeInscricao(
            tDetalhes(
                'detInscricoesFechadas'
            ),
            'secondary'
        );


        return;

    }


    // ======================================================
    // 4. ESGOTADO
    // ======================================================

    if (
        eventoAtual.vagasDisponiveis !== null &&
        eventoAtual.vagasDisponiveis !== undefined &&
        Number(
            eventoAtual.vagasDisponiveis
        ) <= 0
    ) {

        configurarBotaoDesabilitado(
            tDetalhes(
                'detEventoEsgotado'
            ),
            tDetalhes(
                'detSemVagas'
            )
        );


        configurarBadgeInscricao(
            tDetalhes(
                'detEventoEsgotado'
            ),
            'danger'
        );


        return;

    }


    // ======================================================
    // 5. VISITANTE
    // ======================================================

    if (
        !window.Auth ||
        !Auth.estaLogado()
    ) {

        configurarBadgeInscricao(
            tDetalhes(
                'detInscricoesAbertas'
            ),
            'success'
        );


        configurarBotaoAtivo(
            tDetalhes(
                'detEntrarInscrever'
            ),
            redirecionarParaLogin
        );


        definirTexto(
            'textoAjudaInscricao',
            tDetalhes(
                'detFacaLoginInscricao'
            )
        );


        return;

    }


    // ======================================================
    // 6. ORGANIZADOR
    // ======================================================

    const usuarioId =
        Number(
            Auth.getUsuarioId()
        );


    const organizadorId =
        Number(
            eventoAtual.organizadorId
        );


    if (
        usuarioId &&
        organizadorId &&
        usuarioId === organizadorId
    ) {

        configurarBadgeInscricao(
            tDetalhes(
                'detVoceOrganizador'
            ),
            'primary'
        );


        configurarBotaoDesabilitado(
            tDetalhes(
                'detVoceOrganizador'
            ),
            tDetalhes(
                'detOrganizadorNaoInscreve'
            )
        );


        return;

    }


    // ======================================================
    // 7. INSCRIÇÃO EXISTENTE
    // ======================================================

    const jaInscrito =
        await verificarInscricaoExistente();


    if (jaInscrito) {

        configurarEstadoJaInscrito();

        return;

    }


    // ======================================================
    // 8. PODE SE INSCREVER
    // ======================================================

    configurarBadgeInscricao(
        tDetalhes(
            'detInscricoesAbertas'
        ),
        'success'
    );


    configurarBotaoAtivo(
        tDetalhes(
            'detInscreverAgora'
        ),
        realizarInscricao
    );


    definirTexto(
        'textoAjudaInscricao',
        tDetalhes(
            'detAjudaInscricao'
        )
    );

}


// ==========================================================
// VERIFICAR INSCRIÇÃO
// ==========================================================

async function verificarInscricaoExistente() {

    if (
        !window.Auth ||
        !Auth.estaLogado()
    ) {

        return false;

    }


    try {

        const response =
            await Auth.fetchAutenticado(
                '/inscricoes/minhas'
            );


        if (!response.ok) {

            return false;

        }


        const inscricoes =
            await response.json();


        if (
            !Array.isArray(
                inscricoes
            )
        ) {

            return false;

        }


        inscricaoAtual =
            inscricoes.find(
                inscricao =>
                    Number(
                        inscricao.eventoId
                    ) ===
                    Number(
                        eventoAtual.id
                    )
            ) || null;


        return !!inscricaoAtual;


    } catch (error) {

        console.error(
            'Erro ao verificar inscrição existente:',
            error
        );


        return false;

    }

}


// ==========================================================
// ESTADO DE INSCRIÇÃO EXISTENTE
// ==========================================================

function configurarEstadoJaInscrito() {

    if (!inscricaoAtual) {
        return;
    }


    switch (
        String(
            inscricaoAtual.status ||
            ''
        ).toUpperCase()
    ) {

        case 'PRESENTE':

            configurarBadgeInscricao(
                tDetalhes(
                    'detPresencaConfirmada'
                ),
                'success'
            );


            configurarBotaoDesabilitado(
                tDetalhes(
                    'detPresencaConfirmada'
                ),
                tDetalhes(
                    'detPresencaRegistrada'
                )
            );

            break;


        case 'CANCELADO':

            configurarBadgeInscricao(
                tDetalhes(
                    'detInscricaoCancelada'
                ),
                'secondary'
            );


            configurarBotaoDesabilitado(
                tDetalhes(
                    'detInscricaoCancelada'
                ),
                tDetalhes(
                    'detInscricaoCanceladaExistente'
                )
            );

            break;


        case 'INSCRITO':

        default:

            configurarBadgeInscricao(
                tDetalhes(
                    'detVoceInscrito'
                ),
                'success'
            );


            configurarBotaoAtivo(
                tDetalhes(
                    'detCancelarInscricao'
                ),
                cancelarInscricao,
                'cancelar'
            );


            definirTexto(
                'textoAjudaInscricao',
                tDetalhes(
                    'detPodeCancelar'
                )
            );

            break;

    }

}


// ==========================================================
// REALIZAR INSCRIÇÃO
// ==========================================================

async function realizarInscricao() {

    if (!eventoAtual) {
        return;
    }


    if (
        !window.Auth ||
        !Auth.estaLogado()
    ) {

        redirecionarParaLogin();

        return;

    }


    const btn =
        document.getElementById(
            'btnInscricao'
        );


    if (!btn) {
        return;
    }


    ocultarFeedbackInscricao();


    const htmlOriginal =
        btn.innerHTML;


    btn.disabled =
        true;


    btn.innerHTML = `

        <span
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
        ></span>

        ${escapeHtml(
            tDetalhes(
                'detProcessandoInscricao'
            )
        )}

    `;


    try {

        const response =
            await Auth.fetchAutenticado(
                '/inscricoes',
                {
                    method:
                        'POST',

                    body:
                        JSON.stringify({
                            eventoId:
                                Number(
                                    eventoAtual.id
                                )
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
                extrairMensagemErro(
                    data,
                    tDetalhes(
                        'detErroInscricao'
                    )
                )
            );

        }


        inscricaoAtual =
            data;


        mostrarFeedbackInscricao(
            tDetalhes(
                'detInscricaoSucesso'
            ),
            'success'
        );


        configurarBadgeInscricao(
            tDetalhes(
                'detVoceInscrito'
            ),
            'success'
        );


        configurarBotaoAtivo(
            tDetalhes(
                'detCancelarInscricao'
            ),
            cancelarInscricao,
            'cancelar'
        );


        definirTexto(
            'textoAjudaInscricao',
            tDetalhes(
                'detPodeCancelar'
            )
        );


        // API reduz as vagas.
        if (
            eventoAtual.vagasDisponiveis !== null &&
            eventoAtual.vagasDisponiveis !== undefined
        ) {

            eventoAtual.vagasDisponiveis =
                Math.max(
                    0,
                    Number(
                        eventoAtual.vagasDisponiveis
                    ) - 1
                );


            atualizarVagas(
                eventoAtual
            );

        }


    } catch (error) {

        console.error(
            'Erro ao realizar inscrição:',
            error
        );


        mostrarFeedbackInscricao(
            error.message ||
            tDetalhes(
                'detErroInscricao'
            ),
            'danger'
        );


        btn.disabled =
            false;


        btn.innerHTML =
            htmlOriginal;

    }

}


// ==========================================================
// CANCELAR INSCRIÇÃO
// ==========================================================

async function cancelarInscricao() {

    if (!inscricaoAtual) {
        return;
    }


    const confirmar =
        window.confirm(
            tDetalhes(
                'detConfirmarCancelamento'
            )
        );


    if (!confirmar) {
        return;
    }


    const btn =
        document.getElementById(
            'btnInscricao'
        );


    if (!btn) {
        return;
    }


    ocultarFeedbackInscricao();


    const htmlOriginal =
        btn.innerHTML;


    btn.disabled =
        true;


    btn.innerHTML = `

        <span
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
        ></span>

        ${escapeHtml(
            tDetalhes(
                'detCancelandoInscricao'
            )
        )}

    `;


    try {

        const response =
            await Auth.fetchAutenticado(
                `/inscricoes/${Number(
                    inscricaoAtual.id
                )}/cancelar`,
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
                    tDetalhes(
                        'detErroCancelar'
                    )
                )
            );

        }


        mostrarFeedbackInscricao(
            tDetalhes(
                'detCancelamentoSucesso'
            ),
            'success'
        );


        await carregarEvento();


    } catch (error) {

        console.error(
            'Erro ao cancelar inscrição:',
            error
        );


        mostrarFeedbackInscricao(
            error.message ||
            tDetalhes(
                'detErroCancelar'
            ),
            'danger'
        );


        btn.disabled =
            false;


        btn.innerHTML =
            htmlOriginal;

    }

}


// ==========================================================
// LOGIN COM RETORNO
// ==========================================================

function redirecionarParaLogin() {

    const destino =
        `detalhesEvento.html?id=${encodeURIComponent(
            eventoAtual?.id ||
            eventoId
        )}`;


    window.location.href =
        `login.html?redirect=${encodeURIComponent(
            destino
        )}`;

}


// ==========================================================
// BOTÃO ATIVO
// ==========================================================

function configurarBotaoAtivo(
    texto,
    acao,
    tipo = 'inscrever'
) {

    const btn =
        document.getElementById(
            'btnInscricao'
        );


    if (!btn) {
        return;
    }


    btn.disabled =
        false;


    btn.classList.remove(
        'btn-secondary',
        'btn-danger'
    );


    btn.classList.add(
        'btn-primary'
    );


    const icone =
        tipo === 'cancelar'
            ? 'bi-x-circle'
            : 'bi-check-circle';


    btn.innerHTML = `

        <i class="bi ${icone} me-1"></i>

        <span id="textoBtnInscricao">

            ${escapeHtml(
                texto
            )}

        </span>

    `;


    btn.onclick =
        acao;

}


// ==========================================================
// BOTÃO DESABILITADO
// ==========================================================

function configurarBotaoDesabilitado(
    texto,
    ajuda
) {

    const btn =
        document.getElementById(
            'btnInscricao'
        );


    if (!btn) {
        return;
    }


    btn.disabled =
        true;


    btn.onclick =
        null;


    btn.classList.remove(
        'btn-primary',
        'btn-danger'
    );


    btn.classList.add(
        'btn-secondary'
    );


    btn.innerHTML = `

        <i class="bi bi-lock-fill me-1"></i>

        <span id="textoBtnInscricao">

            ${escapeHtml(
                texto
            )}

        </span>

    `;


    definirTexto(
        'textoAjudaInscricao',
        ajuda ||
        ''
    );

}


// ==========================================================
// BADGE DA INSCRIÇÃO
// ==========================================================

function configurarBadgeInscricao(
    texto,
    tipo
) {

    const badge =
        document.getElementById(
            'badgeInscricao'
        );


    if (!badge) {
        return;
    }


    badge.className =
        `badge bg-${tipo}`;


    badge.textContent =
        texto;

}


// ==========================================================
// PUBLICAÇÃO ATIVA
// ==========================================================

function publicacaoEstaAtiva(
    publicacaoAte
) {

    if (!publicacaoAte) {
        return false;
    }


    const validade =
        new Date(
            publicacaoAte
        );


    if (
        Number.isNaN(
            validade.getTime()
        )
    ) {

        return false;

    }


    return validade >
        new Date();

}


// ==========================================================
// COMPARTILHAMENTO
// ==========================================================

function configurarCompartilhamento() {

    const botao =
        document.getElementById(
            'btnCompartilhar'
        );


    if (!botao) {
        return;
    }


    botao.addEventListener(
        'click',
        copiarLink
    );

}


async function copiarLink() {

    const url =
        window.location.href;


    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                url
            );

        } else {

            copiarLinkFallback(
                url
            );

        }


        mostrarFeedbackInscricao(
            tDetalhes(
                'detCompartilhado'
            ),
            'info'
        );


    } catch (error) {

        console.error(
            'Erro ao copiar link:',
            error
        );


        mostrarFeedbackInscricao(
            tDetalhes(
                'detErroCompartilhar'
            ),
            'warning'
        );

    }

}


// ==========================================================
// FALLBACK DE CÓPIA
// ==========================================================

function copiarLinkFallback(
    texto
) {

    const input =
        document.createElement(
            'textarea'
        );


    input.value =
        texto;


    input.style.position =
        'fixed';


    input.style.opacity =
        '0';


    document.body.appendChild(
        input
    );


    input.focus();

    input.select();


    document.execCommand(
        'copy'
    );


    document.body.removeChild(
        input
    );

}


// ==========================================================
// LOADING
// ==========================================================

function mostrarLoading() {

    const loading =
        document.getElementById(
            'secaoLoading'
        );


    const erro =
        document.getElementById(
            'secaoErro'
        );


    const conteudo =
        document.getElementById(
            'conteudoEvento'
        );


    loading?.classList.remove(
        'd-none'
    );


    erro?.classList.add(
        'd-none'
    );


    conteudo?.classList.add(
        'd-none'
    );

}


// ==========================================================
// MOSTRAR CONTEÚDO
// ==========================================================

function mostrarConteudo() {

    document.getElementById(
        'secaoLoading'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'secaoErro'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'conteudoEvento'
    )?.classList.remove(
        'd-none'
    );

}


// ==========================================================
// MOSTRAR ERRO
// ==========================================================

function mostrarErro(
    mensagem
) {

    document.getElementById(
        'secaoLoading'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'conteudoEvento'
    )?.classList.add(
        'd-none'
    );


    document.getElementById(
        'secaoErro'
    )?.classList.remove(
        'd-none'
    );


    definirTexto(
        'mensagemErro',
        mensagem
    );

}


// ==========================================================
// FEEDBACK DA INSCRIÇÃO
// ==========================================================

function mostrarFeedbackInscricao(
    mensagem,
    tipo = 'danger'
) {

    const alerta =
        document.getElementById(
            'feedbackInscricao'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        `alert alert-${tipo}`;


    alerta.textContent =
        mensagem;

}


// ==========================================================
// OCULTAR FEEDBACK
// ==========================================================

function ocultarFeedbackInscricao() {

    const alerta =
        document.getElementById(
            'feedbackInscricao'
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
// LOCAL
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


    return tDetalhes(
        'detLocalNaoInformado'
    );

}


// ==========================================================
// DATA RESUMIDA
// ==========================================================

function formatarDataResumida(
    data
) {

    if (!data) {

        return tDetalhes(
            'painelDataNaoInformada'
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

        return tDetalhes(
            'painelDataNaoInformada'
        );

    }


    const locale =
        obterLocaleDetalhes();


    const dataFormatada =
        valor.toLocaleDateString(
            locale,
            {
                day:
                    '2-digit',

                month:
                    '2-digit',

                year:
                    'numeric'
            }
        );


    const horaFormatada =
        valor.toLocaleTimeString(
            locale,
            {
                hour:
                    '2-digit',

                minute:
                    '2-digit'
            }
        );


    return `${dataFormatada} ${tDetalhes(
        'explorarAs'
    )} ${horaFormatada}`;

}


// ==========================================================
// DATA + HORA
// ==========================================================

function formatarDataHora(
    data
) {

    if (!data) {

        return tDetalhes(
            'detNaoInformada'
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

        return tDetalhes(
            'detNaoInformada'
        );

    }


    return valor.toLocaleString(
        obterLocaleDetalhes(),
        {
            dateStyle:
                'long',

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
// EXTRAIR ERRO DA API
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