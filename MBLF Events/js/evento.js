// ==========================================================
// MBLF EVENTS
// evento.js
//
// Permite:
// - criar evento
// - editar evento existente
// - traduzir textos dinâmicos da página
// ==========================================================


// ==========================================================
// ESTADO DA PÁGINA
// ==========================================================

let eventoEmEdicao = null;

const parametrosUrl =
    new URLSearchParams(
        window.location.search
    );

const eventoId =
    parametrosUrl.get('id');


// ==========================================================
// TRADUÇÃO
// ==========================================================

function tEvento(
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
// PROTEGER A PÁGINA
// ==========================================================

const paginaAutorizada =
    window.Auth &&
    Auth.protegerPagina();


if (paginaAutorizada) {

    document.addEventListener(
        'DOMContentLoaded',
        inicializarPagina
    );

}


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

async function inicializarPagina() {

    carregarUsuarioNavbar();

    configurarFormulario();

    configurarValidacaoDatas();

    configurarTrocaIdioma();


    if (eventoId) {

        await carregarEvento(
            eventoId
        );

    } else {

        configurarModoCriacao();

    }

}


// ==========================================================
// TROCA DE IDIOMA
// ==========================================================

function configurarTrocaIdioma() {

    document.addEventListener(
        'mblf:idiomaAlterado',
        function () {

            carregarUsuarioNavbar();

            if (eventoEmEdicao) {

                configurarModoEdicao(
                    eventoEmEdicao
                );

            } else {

                configurarModoCriacao();

            }

        }
    );

}


// ==========================================================
// USUÁRIO NA NAVBAR
// ==========================================================

function carregarUsuarioNavbar() {

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
            tEvento(
                'perfilUsuario'
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
// PERFIL
// ==========================================================

function formatarPerfil(perfil) {

    switch (perfil) {

        case 'ADMIN':

            return tEvento(
                'perfilAdmin'
            );


        case 'FUNCIONARIO':

            return tEvento(
                'perfilFuncionario'
            );


        case 'USUARIO':

        default:

            return tEvento(
                'perfilUsuario'
            );

    }

}


// ==========================================================
// CONFIGURAR FORMULÁRIO
// ==========================================================

function configurarFormulario() {

    const form =
        document.getElementById(
            'formEvento'
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        'submit',
        salvarEvento
    );

}


// ==========================================================
// MODO DE CRIAÇÃO
// ==========================================================

function configurarModoCriacao() {

    document.title =
        `${tEvento('evTituloCriar')} - MBLF Events`;


    const tituloPagina =
        document.getElementById(
            'tituloPagina'
        );


    const subtituloPagina =
        document.getElementById(
            'subtituloPagina'
        );


    const textoBtn =
        document.getElementById(
            'textoBtnSubmit'
        );


    const statusEl =
        document.getElementById(
            'badgeStatusEvento'
        );


    const hubEl =
        document.getElementById(
            'badgeHub'
        );


    const publicacaoEl =
        document.getElementById(
            'badgePublicacao'
        );


    if (tituloPagina) {

        tituloPagina.textContent =
            tEvento(
                'evTituloCriar'
            );

    }


    if (subtituloPagina) {

        subtituloPagina.textContent =
            tEvento(
                'evSubtituloCriar'
            );

    }


    if (textoBtn) {

        textoBtn.textContent =
            tEvento(
                'evCriar'
            );

    }


    if (statusEl) {

        statusEl.className =
            'badge bg-warning text-dark';

        statusEl.textContent =
            tEvento(
                'evStatusNovo'
            );

    }


    if (hubEl) {

        hubEl.className =
            'badge bg-secondary';

        hubEl.textContent =
            tEvento(
                'evStatusInativo'
            );

    }


    if (publicacaoEl) {

        publicacaoEl.className =
            'badge bg-secondary';

        publicacaoEl.textContent =
            tEvento(
                'evStatusInativa'
            );

    }

}


// ==========================================================
// VALIDAÇÃO ENTRE DATAS
// ==========================================================

function configurarValidacaoDatas() {

    const inputInicio =
        document.getElementById(
            'inputDataInicio'
        );


    const inputFim =
        document.getElementById(
            'inputDataFim'
        );


    if (
        !inputInicio ||
        !inputFim
    ) {

        return;

    }


    const agora =
        new Date();


    const agoraFormatado =
        formatarParaDatetimeLocal(
            agora
        );


    inputInicio.min =
        agoraFormatado;


    inputFim.min =
        agoraFormatado;


    // ------------------------------------------------------
    // ALTEROU A DATA DE INÍCIO
    // ------------------------------------------------------

    inputInicio.addEventListener(
        'change',
        function () {

            ocultarFeedback();


            if (!inputInicio.value) {

                inputFim.min =
                    formatarParaDatetimeLocal(
                        new Date()
                    );

                return;

            }


            inputFim.min =
                inputInicio.value;


            if (
                inputFim.value &&
                inputFim.value <=
                inputInicio.value
            ) {

                inputFim.value =
                    '';

            }

        }
    );


    // ------------------------------------------------------
    // ALTEROU A DATA DE TÉRMINO
    // ------------------------------------------------------

    inputFim.addEventListener(
        'change',
        function () {

            ocultarFeedback();


            if (
                !inputInicio.value ||
                !inputFim.value
            ) {

                return;

            }


            if (
                inputFim.value <=
                inputInicio.value
            ) {

                mostrarFeedback(
                    tEvento(
                        'evDataFimPosterior'
                    ),
                    'warning'
                );


                inputFim.value =
                    '';

            }

        }
    );

}


// ==========================================================
// CARREGAR EVENTO PARA EDIÇÃO
// ==========================================================

async function carregarEvento(id) {

    alterarModoCarregamento(
        true
    );


    try {

        const response =
            await Auth.fetchAutenticado(
                `/eventos/${id}`
            );


        const data =
            await response
                .json()
                .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                extrairMensagemErro(
                    data,
                    tEvento(
                        'evErroCarregar'
                    )
                )
            );

        }


        // Segurança de interface:
        // somente o organizador pode editar.
        //
        // A API também deve validar essa regra.
        if (
            Number(data.organizadorId) !==
            Number(Auth.getUsuarioId())
        ) {

            mostrarFeedback(
                tEvento(
                    'evSemPermissaoEditar'
                ),
                'danger'
            );


            desabilitarFormulario();

            return;

        }


        eventoEmEdicao =
            data;


        preencherFormulario(
            data
        );


        configurarModoEdicao(
            data
        );


    } catch (error) {

        console.error(
            'Erro ao carregar evento:',
            error
        );


        mostrarFeedback(
            error.message ||
            tEvento(
                'evErroCarregar'
            ),
            'danger'
        );


    } finally {

        alterarModoCarregamento(
            false
        );

    }

}


// ==========================================================
// PREENCHER FORMULÁRIO
// ==========================================================

function preencherFormulario(evento) {

    document.getElementById(
        'inputTitulo'
    ).value =
        evento.titulo || '';


    document.getElementById(
        'inputTipo'
    ).value =
        evento.tipo || '';


    document.getElementById(
        'inputDescricao'
    ).value =
        evento.descricao || '';


    document.getElementById(
        'inputEndereco'
    ).value =
        evento.endereco || '';


    document.getElementById(
        'inputCidade'
    ).value =
        evento.cidade || '';


    document.getElementById(
        'inputVagas'
    ).value =
        evento.vagasTotal ??
        '';


    document.getElementById(
        'inputCargaHoraria'
    ).value =
        evento.cargaHoraria ??
        '';


    document.getElementById(
        'inputDataInicio'
    ).value =
        converterParaDatetimeLocal(
            evento.dataInicio
        );


    document.getElementById(
        'inputDataFim'
    ).value =
        converterParaDatetimeLocal(
            evento.dataFim
        );

}


// ==========================================================
// MODO DE EDIÇÃO
// ==========================================================

function configurarModoEdicao(evento) {

    document.title =
        `${tEvento('evTituloEditar')} - MBLF Events`;


    const tituloPagina =
        document.getElementById(
            'tituloPagina'
        );


    const subtituloPagina =
        document.getElementById(
            'subtituloPagina'
        );


    const textoBtn =
        document.getElementById(
            'textoBtnSubmit'
        );


    if (tituloPagina) {

        tituloPagina.textContent =
            tEvento(
                'evTituloEditar'
            );

    }


    if (subtituloPagina) {

        subtituloPagina.textContent =
            tEvento(
                'evSubtituloEditar',
                {
                    titulo:
                        evento.titulo || ''
                }
            );

    }


    if (textoBtn) {

        textoBtn.textContent =
            tEvento(
                'evSalvar'
            );

    }


    atualizarStatusLateral(
        evento
    );

}


// ==========================================================
// STATUS LATERAL
// ==========================================================

function atualizarStatusLateral(evento) {

    const statusEl =
        document.getElementById(
            'badgeStatusEvento'
        );


    const hubEl =
        document.getElementById(
            'badgeHub'
        );


    const publicacaoEl =
        document.getElementById(
            'badgePublicacao'
        );


    // ------------------------------------------------------
    // STATUS DO EVENTO
    // ------------------------------------------------------

    if (statusEl) {

        const status =
            obterStatusEvento(
                evento.status
            );


        statusEl.className =
            `badge ${status.classe}`;


        statusEl.textContent =
            status.texto;

    }


    const agora =
        new Date();


    // ------------------------------------------------------
    // HUB
    // ------------------------------------------------------

    const hubAtivo =
        evento.hubAte &&
        new Date(
            evento.hubAte
        ) > agora;


    if (hubEl) {

        if (hubAtivo) {

            hubEl.className =
                'badge bg-success';


            hubEl.textContent =
                tEvento(
                    'evStatusAtivo'
                );

        } else {

            hubEl.className =
                'badge bg-secondary';


            hubEl.textContent =
                tEvento(
                    'evStatusInativo'
                );

        }

    }


    // ------------------------------------------------------
    // PUBLICAÇÃO
    // ------------------------------------------------------

    const publicacaoAtiva =
        evento.publicacaoAte &&
        new Date(
            evento.publicacaoAte
        ) > agora;


    if (publicacaoEl) {

        if (publicacaoAtiva) {

            publicacaoEl.className =
                'badge bg-success';


            publicacaoEl.textContent =
                tEvento(
                    'evStatusAtiva'
                );

        } else {

            publicacaoEl.className =
                'badge bg-secondary';


            publicacaoEl.textContent =
                tEvento(
                    'evStatusInativa'
                );

        }

    }

}


// ==========================================================
// SALVAR EVENTO
// ==========================================================

async function salvarEvento(e) {

    e.preventDefault();


    ocultarFeedback();


    const dadosEvento =
        obterDadosFormulario();


    // ------------------------------------------------------
    // VALIDAÇÕES DO FRONT
    // ------------------------------------------------------

    const erro =
        validarEvento(
            dadosEvento
        );


    if (erro) {

        mostrarFeedback(
            erro,
            'danger'
        );

        return;

    }


    const btn =
        document.getElementById(
            'btnSubmit'
        );


    if (!btn) {
        return;
    }


    const textoOriginal =
        btn.innerHTML;


    btn.disabled =
        true;


    btn.innerHTML = `

        <span
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
        ></span>

        ${tEvento('evSalvando')}

    `;


    try {

        let response;


        // --------------------------------------------------
        // EDITAR
        // --------------------------------------------------

        if (eventoId) {

            response =
                await Auth.fetchAutenticado(
                    `/eventos/${eventoId}`,
                    {
                        method: 'PUT',

                        body:
                            JSON.stringify(
                                dadosEvento
                            )
                    }
                );

        }


        // --------------------------------------------------
        // CRIAR
        // --------------------------------------------------

        else {

            response =
                await Auth.fetchAutenticado(
                    '/eventos/criar',
                    {
                        method: 'POST',

                        body:
                            JSON.stringify(
                                dadosEvento
                            )
                    }
                );

        }


        const data =
            await response
                .json()
                .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                extrairMensagemErro(
                    data,
                    eventoId
                        ? tEvento(
                            'evErroAtualizar'
                        )
                        : tEvento(
                            'evErroCriar'
                        )
                )
            );

        }


        // --------------------------------------------------
        // SUCESSO
        // --------------------------------------------------

        mostrarFeedback(
            eventoId
                ? tEvento(
                    'evSucessoAtualizar'
                )
                : tEvento(
                    'evSucessoCriar'
                ),
            'success'
        );


        setTimeout(
            function () {

                window.location.href =
                    'painel.html';

            },
            1200
        );


    } catch (error) {

        console.error(
            'Erro ao salvar evento:',
            error
        );


        mostrarFeedback(
            error.message ||
            tEvento(
                'evErroSalvar'
            ),
            'danger'
        );


    } finally {

        btn.disabled =
            false;


        btn.innerHTML =
            textoOriginal;

    }

}


// ==========================================================
// DADOS DO FORMULÁRIO
// ==========================================================

function obterDadosFormulario() {

    const vagasValor =
        document.getElementById(
            'inputVagas'
        ).value;


    const cargaValor =
        document.getElementById(
            'inputCargaHoraria'
        ).value;


    return {

        titulo:
            document
                .getElementById(
                    'inputTitulo'
                )
                .value
                .trim(),


        descricao:
            valorOuNull(
                document
                    .getElementById(
                        'inputDescricao'
                    )
                    .value
            ),


        tipo:
            valorOuNull(
                document
                    .getElementById(
                        'inputTipo'
                    )
                    .value
            ),


        endereco:
            valorOuNull(
                document
                    .getElementById(
                        'inputEndereco'
                    )
                    .value
            ),


        cidade:
            valorOuNull(
                document
                    .getElementById(
                        'inputCidade'
                    )
                    .value
            ),


        dataInicio:
            document
                .getElementById(
                    'inputDataInicio'
                )
                .value,


        dataFim:
            document
                .getElementById(
                    'inputDataFim'
                )
                .value,


        cargaHoraria:
            cargaValor !== ''
                ? Number(cargaValor)
                : null,


        vagasTotal:
            vagasValor !== ''
                ? Number(vagasValor)
                : null

    };

}


// ==========================================================
// VALIDAÇÃO
// ==========================================================

function validarEvento(evento) {

    if (!evento.titulo) {

        return tEvento(
            'evValidacaoNome'
        );

    }


    if (
        !evento.dataInicio ||
        !evento.dataFim
    ) {

        return tEvento(
            'evValidacaoDatas'
        );

    }


    const inicio =
        new Date(
            evento.dataInicio
        );


    const fim =
        new Date(
            evento.dataFim
        );


    if (
        Number.isNaN(
            inicio.getTime()
        ) ||
        Number.isNaN(
            fim.getTime()
        )
    ) {

        return tEvento(
            'evValidacaoDatasValidas'
        );

    }


    // Novo evento não pode começar no passado
    if (
        !eventoEmEdicao &&
        inicio < new Date()
    ) {

        return tEvento(
            'evValidacaoDataPassado'
        );

    }


    if (fim <= inicio) {

        return tEvento(
            'evDataFimPosterior'
        );

    }


    if (
        evento.vagasTotal !== null &&
        evento.vagasTotal < 0
    ) {

        return tEvento(
            'evValidacaoVagas'
        );

    }


    if (
        evento.cargaHoraria !== null &&
        evento.cargaHoraria < 0
    ) {

        return tEvento(
            'evValidacaoCargaHoraria'
        );

    }


    return null;

}


// ==========================================================
// VALOR OU NULL
// ==========================================================

function valorOuNull(valor) {

    const valorTratado =
        String(
            valor ?? ''
        ).trim();


    return valorTratado
        ? valorTratado
        : null;

}


// ==========================================================
// FORMATAR DATE PARA DATETIME-LOCAL
// ==========================================================

function formatarParaDatetimeLocal(
    data
) {

    const ano =
        data.getFullYear();


    const mes =
        String(
            data.getMonth() + 1
        ).padStart(
            2,
            '0'
        );


    const dia =
        String(
            data.getDate()
        ).padStart(
            2,
            '0'
        );


    const hora =
        String(
            data.getHours()
        ).padStart(
            2,
            '0'
        );


    const minuto =
        String(
            data.getMinutes()
        ).padStart(
            2,
            '0'
        );


    return (
        `${ano}-${mes}-${dia}` +
        `T${hora}:${minuto}`
    );

}


// ==========================================================
// CONVERTER PARA DATETIME-LOCAL
// ==========================================================

function converterParaDatetimeLocal(
    data
) {

    if (!data) {
        return '';
    }


    return String(data)
        .slice(
            0,
            16
        );

}


// ==========================================================
// STATUS DO EVENTO
// ==========================================================

function obterStatusEvento(status) {

    switch (status) {

        case 'PUBLICADO':

            return {
                texto:
                    tEvento(
                        'evStatusPublicado'
                    ),

                classe:
                    'bg-primary'
            };


        case 'ENCERRADO':

            return {
                texto:
                    tEvento(
                        'evStatusEncerrado'
                    ),

                classe:
                    'bg-secondary'
            };


        case 'CANCELADO':

            return {
                texto:
                    tEvento(
                        'evStatusCancelado'
                    ),

                classe:
                    'bg-danger'
            };


        case 'REMOVIDO_ADMIN':

            return {
                texto:
                    tEvento(
                        'evStatusRemovido'
                    ),

                classe:
                    'bg-danger'
            };


        case 'RASCUNHO':

        default:

            return {
                texto:
                    tEvento(
                        'evStatusRascunho'
                    ),

                classe:
                    'bg-warning text-dark'
            };

    }

}


// ==========================================================
// FEEDBACK
// ==========================================================

function mostrarFeedback(
    mensagem,
    tipo = 'danger'
) {

    const alerta =
        document.getElementById(
            'alertFeedback'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        `alert alert-${tipo}`;


    alerta.textContent =
        mensagem;


    alerta.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

}


// ==========================================================
// OCULTAR FEEDBACK
// ==========================================================

function ocultarFeedback() {

    const alerta =
        document.getElementById(
            'alertFeedback'
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
// CARREGAMENTO
// ==========================================================

function alterarModoCarregamento(
    carregando
) {

    const form =
        document.getElementById(
            'formEvento'
        );


    if (!form) {
        return;
    }


    const campos =
        form.querySelectorAll(
            'input, textarea, button'
        );


    campos.forEach(
        campo => {

            campo.disabled =
                carregando;

        }
    );

}


// ==========================================================
// DESABILITAR FORMULÁRIO
// ==========================================================

function desabilitarFormulario() {

    const form =
        document.getElementById(
            'formEvento'
        );


    if (!form) {
        return;
    }


    const elementos =
        form.querySelectorAll(
            'input, textarea, button'
        );


    elementos.forEach(
        elemento => {

            elemento.disabled =
                true;

        }
    );

}


// ==========================================================
// ERRO DA API
// ==========================================================

function extrairMensagemErro(
    data,
    mensagemPadrao
) {

    if (!data) {

        return mensagemPadrao;

    }


    if (
        typeof data === 'string'
    ) {

        return data;

    }


    return (
        data.mensagem ||
        data.message ||
        data.erro ||
        mensagemPadrao
    );

}