// ==========================================================
// ESTADO
// ==========================================================

let usuariosAdmin = [];

let eventosAdmin = [];

let planosAdmin = [];

let pagamentosAdmin = [];

let historicoAdmin = [];
let perfilPainelAdmin = 'ADMIN';
let permissoesFuncionario = null;

function funcionarioPode(permissao) {
    return perfilPainelAdmin === 'ADMIN'
        || Boolean(permissoesFuncionario?.[permissao]);
}


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
    'DOMContentLoaded',
    async () => {

        if (
            typeof Auth ===
            'undefined'
        ) {

            alert(
                'auth.js não foi carregado.'
            );

            return;
        }


        if (!Auth.estaLogado()) {

            window.location.href =
                'login.html';

            return;

        }


        configurarNavegacao();

        configurarBotoes();

        configurarTema();


        try {

            await validarAdministrador();


            const tarefasPermitidas = [];

            if (funcionarioPode('visualizarUsuarios')) tarefasPermitidas.push(carregarUsuarios());
            if (funcionarioPode('visualizarEventos')) tarefasPermitidas.push(carregarEventos());
            if (funcionarioPode('gerenciarPlanos')) tarefasPermitidas.push(carregarPlanos());
            if (funcionarioPode('visualizarPagamentos')) tarefasPermitidas.push(carregarPagamentos());
            if (perfilPainelAdmin === 'ADMIN') tarefasPermitidas.push(carregarHistorico());

            await Promise.allSettled(tarefasPermitidas);


            atualizarResumos();

        } catch (error) {

            console.error(
                'Erro ao carregar painel administrativo:',
                error
            );


            mostrarAlertaAdmin(
                error.message ||
                'Não foi possível acessar a área administrativa.',
                'danger'
            );

        }

    }
);


// ==========================================================
// VALIDAR ADMIN
// ==========================================================

async function validarAdministrador() {

    const usuarioId =
        Number(
            Auth.getUsuarioId()
        );


    if (!usuarioId) {

        throw new Error(
            'Usuário inválido.'
        );

    }


    const response =
        await Auth.fetchAutenticado(
            `/usuarios/${usuarioId}`
        );


    const usuario =
        await response
            .json()
            .catch(
                () => ({})
            );


    if (!response.ok) {

        throw new Error(
            extrairErroAdmin(
                usuario,
                'Não foi possível identificar o usuário.'
            )
        );

    }


    perfilPainelAdmin = String(usuario.perfil || '').toUpperCase();

    if (!['ADMIN', 'FUNCIONARIO'].includes(perfilPainelAdmin)) {
        window.location.href = 'painel.html';
        throw new Error('Acesso permitido somente para administradores e funcionários.');
    }

    permissoesFuncionario = null;

    if (perfilPainelAdmin === 'FUNCIONARIO') {
        const respostaPermissoes = await Auth.fetchAutenticado(
            `/admin/usuarios/${usuarioId}/permissoes`
        );
        const dadosPermissoes = await respostaPermissoes.json().catch(() => ({}));

        if (!respostaPermissoes.ok) {
            throw new Error(extrairErroAdmin(
                dadosPermissoes,
                'Não foi possível carregar as permissões do funcionário.'
            ));
        }

        permissoesFuncionario = dadosPermissoes;
    }

    configurarAcessoPorPerfil();

    const badgePerfil = document.querySelector('.navbar-brand .badge');
    if (badgePerfil) {
        badgePerfil.textContent = perfilPainelAdmin === 'ADMIN' ? 'ADMIN' : 'FUNCIONÁRIO';
        badgePerfil.classList.toggle('bg-danger', perfilPainelAdmin === 'ADMIN');
        badgePerfil.classList.toggle('bg-info', perfilPainelAdmin === 'FUNCIONARIO');
    }

    const nome =
        document.getElementById(
            'nomeAdminNavbar'
        );


    if (nome) {

        nome.textContent =
            usuario.nome ||
            'Administrador';

    }

}


// ==========================================================
// ACESSO ÀS SEÇÕES E AÇÕES DO PAINEL
// ==========================================================

function configurarAcessoPorPerfil() {
    const permissoesSecao = {
        'visao-geral': null,
        usuarios: 'visualizarUsuarios',
        eventos: 'visualizarEventos',
        planos: 'gerenciarPlanos',
        pagamentos: 'visualizarPagamentos',
        historico: null
    };

    document.querySelectorAll('[data-admin-section]').forEach(botao => {
        const secao = botao.dataset.adminSection;
        const permissao = permissoesSecao[secao];
        const permitido = perfilPainelAdmin === 'ADMIN'
            || secao === 'visao-geral'
            || (secao !== 'historico' && Boolean(permissao && permissoesFuncionario?.[permissao]));
        botao.classList.toggle('d-none', !permitido);
    });

    document.querySelectorAll('.admin-section').forEach(secao => {
        const nome = secao.id.replace('section-', '');
        const permissao = permissoesSecao[nome];
        const permitido = perfilPainelAdmin === 'ADMIN'
            || nome === 'visao-geral'
            || (nome !== 'historico' && Boolean(permissao && permissoesFuncionario?.[permissao]));
        secao.classList.toggle('d-none', !permitido);
    });

    document.querySelectorAll('[data-admin-only]').forEach(elemento => {
        elemento.classList.toggle('d-none', perfilPainelAdmin !== 'ADMIN');
    });

    if (perfilPainelAdmin === 'FUNCIONARIO') {
        const primeiraSecao = ['visao-geral', 'usuarios', 'eventos', 'pagamentos', 'planos']
            .find(secao => {
                const botao = document.querySelector(`[data-admin-section="${secao}"]`);
                return botao && !botao.classList.contains('d-none');
            });
        if (primeiraSecao) abrirSecaoAdmin(primeiraSecao);
    }
}


// ==========================================================
// NAVEGAÇÃO
// ==========================================================

function configurarNavegacao() {

    const botoes =
        document.querySelectorAll(
            '[data-admin-section]'
        );


    botoes.forEach(

        botao => {

            botao.addEventListener(
                'click',
                () => {

                    abrirSecaoAdmin(
                        botao.dataset
                            .adminSection
                    );

                }
            );

        }

    );

}


function abrirSecaoAdmin(
    secao
) {

    document
        .querySelectorAll(
            '.admin-section'
        )
        .forEach(
            elemento =>
                elemento.classList
                    .remove(
                        'active'
                    )
        );


    document
        .querySelectorAll(
            '[data-admin-section]'
        )
        .forEach(
            elemento =>
                elemento.classList
                    .remove(
                        'active'
                    )
        );


    document
        .getElementById(
            `section-${secao}`
        )
        ?.classList.add(
            'active'
        );


    document
        .querySelector(
            `[data-admin-section="${secao}"]`
        )
        ?.classList.add(
            'active'
        );

}


// ==========================================================
// BOTÕES
// ==========================================================

function configurarBotoes() {

    document
        .getElementById(
            'btnAtualizarUsuarios'
        )
        ?.addEventListener(
            'click',
            carregarUsuarios
        );


    document
        .getElementById(
            'btnAtualizarEventos'
        )
        ?.addEventListener(
            'click',
            carregarEventos
        );


    document
        .getElementById(
            'btnAtualizarPagamentos'
        )
        ?.addEventListener(
            'click',
            carregarPagamentos
        );


    document
        .getElementById(
            'btnAtualizarHistorico'
        )
        ?.addEventListener(
            'click',
            carregarHistorico
        );


    document
        .getElementById(
            'filtroUsuarios'
        )
        ?.addEventListener(
            'input',
            renderizarUsuarios
        );


    document
        .getElementById(
            'filtroEventos'
        )
        ?.addEventListener(
            'input',
            renderizarEventos
        );


    document
        .getElementById(
            'formFuncionario'
        )
        ?.addEventListener(
            'submit',
            salvarFuncionario
        );


    document
        .getElementById(
            'formRemoverEvento'
        )
        ?.addEventListener(
            'submit',
            removerEventoAdmin
        );


    document
        .getElementById(
            'btnNovoPlano'
        )
        ?.addEventListener(
            'click',
            abrirNovoPlano
        );


    document
        .getElementById(
            'formPlano'
        )
        ?.addEventListener(
            'submit',
            salvarPlano
        );


    document
        .getElementById(
            'btnSairAdmin'
        )
        ?.addEventListener(
            'click',
            sairAdmin
        );

}


// ==========================================================
// USUÁRIOS
// ==========================================================

async function carregarUsuarios() {

    const tbody =
        document.getElementById(
            'tabelaUsuarios'
        );


    if (tbody) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center py-5"
                >

                    <div
                        class="spinner-border spinner-border-sm text-primary me-2"
                    ></div>

                    Carregando usuários...

                </td>

            </tr>

        `;

    }


    try {

        const response =
            await Auth.fetchAutenticado(
                '/usuarios/todos'
            );


        const dados =
            await response
                .json()
                .catch(
                    () => []
                );


        if (!response.ok) {

            throw new Error(
                extrairErroAdmin(
                    dados,
                    'Não foi possível carregar os usuários.'
                )
            );

        }


        usuariosAdmin =
            Array.isArray(dados)
                ? dados
                : [];


        renderizarUsuarios();

        atualizarResumos();


    } catch (error) {

        console.error(
            'Erro ao carregar usuários:',
            error
        );


        if (tbody) {

            tbody.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        class="text-center text-danger py-5"
                    >

                        ${
                            escapeHtmlAdmin(
                                error.message
                            )
                        }

                    </td>

                </tr>

            `;

        }

    }

}


function renderizarUsuarios() {

    const tbody =
        document.getElementById(
            'tabelaUsuarios'
        );


    if (!tbody) {
        return;
    }


    const filtro =
        document.getElementById(
            'filtroUsuarios'
        )
        ?.value
        .trim()
        .toLowerCase() ||
        '';


    const usuarios =
        usuariosAdmin.filter(

            usuario => {

                const texto = `

                    ${usuario.nome || ''}

                    ${usuario.email || ''}

                    ${usuario.perfil || ''}

                `.toLowerCase();


                return texto.includes(
                    filtro
                );

            }

        );


    if (
        usuarios.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center py-5 text-muted-theme"
                >

                    Nenhum usuário encontrado.

                </td>

            </tr>

        `;

        return;

    }


    const usuarioAtualId =
        Number(
            Auth.getUsuarioId()
        );


    tbody.innerHTML =
        usuarios
            .map(

                usuario => {

                    const ativo =
                        usuario.ativo !==
                        false;


                    const ehProprioAdmin =
                        Number(
                            usuario.id
                        ) ===
                        usuarioAtualId;


                    return `

                        <tr>

                            <td>
                                ${Number(usuario.id)}
                            </td>


                            <td>

                                <strong>
                                    ${
                                        escapeHtmlAdmin(
                                            usuario.nome ||
                                            'Usuário'
                                        )
                                    }
                                </strong>

                                <div
                                    class="small text-muted-theme"
                                >
                                    ${
                                        escapeHtmlAdmin(
                                            usuario.email ||
                                            ''
                                        )
                                    }
                                </div>

                            </td>


                            <td>

                                <span
                                    class="badge ${
                                        obterClassePerfil(
                                            usuario.perfil
                                        )
                                    }"
                                >

                                    ${
                                        escapeHtmlAdmin(
                                            usuario.perfil ||
                                            '-'
                                        )
                                    }

                                </span>

                            </td>


                            <td>

                                ${
                                    ativo
                                        ? `
                                            <span class="badge bg-success">
                                                Ativo
                                            </span>
                                        `
                                        : `
                                            <span class="badge bg-danger">
                                                Bloqueado
                                            </span>
                                        `
                                }

                            </td>


                            <td>

                                ${
                                    formatarDataAdmin(
                                        usuario.dataCadastro
                                    )
                                }

                            </td>


                            <td
                                class="text-end"
                            >

                                <div
                                    class="d-flex
                                           justify-content-end
                                           flex-wrap
                                           gap-1"
                                >

                                    ${
                                        perfilPainelAdmin === 'ADMIN' && !ehProprioAdmin
                                            ? `
                                                <button
                                                    class="btn
                                                           btn-outline-primary
                                                           btn-sm"
                                                    onclick="abrirFuncionario(
                                                        ${Number(usuario.id)}
                                                    )"
                                                    title="Tornar funcionário"
                                                >

                                                    <i
                                                        class="bi bi-person-gear"
                                                    ></i>

                                                </button>
                                            `
                                            : ''
                                    }


                                    ${
                                        funcionarioPode('bloquearUsuarios') && !ehProprioAdmin
                                            ? ativo
                                                ? `
                                                    <button
                                                        class="btn
                                                               btn-outline-danger
                                                               btn-sm"
                                                        onclick="alterarBloqueioUsuario(
                                                            ${Number(usuario.id)},
                                                            true
                                                        )"
                                                    >

                                                        <i
                                                            class="bi bi-lock"
                                                        ></i>

                                                    </button>
                                                `
                                                : `
                                                    <button
                                                        class="btn
                                                               btn-outline-success
                                                               btn-sm"
                                                        onclick="alterarBloqueioUsuario(
                                                            ${Number(usuario.id)},
                                                            false
                                                        )"
                                                    >

                                                        <i
                                                            class="bi bi-unlock"
                                                        ></i>

                                                    </button>
                                                `
                                            : `
                                                <span
                                                    class="small
                                                           text-muted-theme"
                                                >
                                                    Sua conta
                                                </span>
                                            `
                                    }

                                </div>

                            </td>

                        </tr>

                    `;

                }

            )
            .join('');

}


// ==========================================================
// BLOQUEAR / DESBLOQUEAR
// ==========================================================

async function alterarBloqueioUsuario(
    usuarioId,
    bloquear
) {

    const usuario =
        usuariosAdmin.find(

            item =>
                Number(item.id) ===
                Number(usuarioId)

        );


    const acao =
        bloquear
            ? 'bloquear'
            : 'desbloquear';


    if (
        !confirm(
            `Deseja ${acao} ${usuario?.nome || 'este usuário'}?`
        )
    ) {

        return;

    }


    try {

        const endpoint =
            bloquear

                ? `/admin/usuarios/${usuarioId}/bloquear`

                : `/admin/usuarios/${usuarioId}/desbloquear`;


        const response =
            await Auth.fetchAutenticado(

                endpoint,

                {
                    method:
                        'PUT'
                }

            );


        if (!response.ok) {

            const erro =
                await lerErroAdmin(
                    response
                );


            throw new Error(
                extrairErroAdmin(
                    erro,
                    `Não foi possível ${acao} o usuário.`
                )
            );

        }


        mostrarAlertaAdmin(
            bloquear
                ? 'Usuário bloqueado com sucesso.'
                : 'Usuário desbloqueado com sucesso.',
            'success'
        );


        const recargas = [carregarUsuarios()];
        if (perfilPainelAdmin === 'ADMIN') recargas.push(carregarHistorico());
        await Promise.allSettled(recargas);


    } catch (error) {

        console.error(
            error
        );


        mostrarAlertaAdmin(
            error.message,
            'danger'
        );

    }

}


// ==========================================================
// FUNCIONÁRIO
// ==========================================================

async function abrirFuncionario(
    usuarioId
) {

    if (perfilPainelAdmin !== 'ADMIN') {
        mostrarAlertaAdmin('Somente o administrador pode alterar permissões.', 'danger');
        return;
    }

    const usuario =
        usuariosAdmin.find(

            item =>
                Number(item.id) ===
                Number(usuarioId)

        );


    if (!usuario) {

        mostrarAlertaAdmin(
            'Usuário não encontrado.',
            'danger'
        );

        return;

    }


    document.getElementById(
        'funcionarioUsuarioId'
    ).value =
        usuario.id;


    document.getElementById(
        'funcionarioUsuarioNome'
    ).textContent =
        usuario.nome ||
        'Usuário';


    const camposPermissoes = {
        funcVisualizarUsuarios: 'visualizarUsuarios',
        funcBloquearUsuarios: 'bloquearUsuarios',
        funcVisualizarEventos: 'visualizarEventos',
        funcModerarEventos: 'moderarEventos',
        funcVisualizarPagamentos: 'visualizarPagamentos',
        funcGerenciarPlanos: 'gerenciarPlanos'
    };

    Object.keys(camposPermissoes).forEach(id => {
        document.getElementById(id).checked = false;
    });

    // Ao editar um funcionário já configurado, carregar as permissões salvas.
    if (String(usuario.perfil || '').toUpperCase() === 'FUNCIONARIO') {
        try {
            const response = await Auth.fetchAutenticado(
                `/admin/usuarios/${usuario.id}/permissoes`
            );
            const dados = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(extrairErroAdmin(
                    dados,
                    'Não foi possível carregar as permissões atuais.'
                ));
            }

            Object.entries(camposPermissoes).forEach(([id, propriedade]) => {
                document.getElementById(id).checked = Boolean(dados[propriedade]);
            });
        } catch (error) {
            mostrarAlertaAdmin(error.message, 'danger');
            return;
        }
    }

    bootstrap.Modal
        .getOrCreateInstance(

            document.getElementById(
                'modalFuncionario'
            )

        )
        .show();

}


async function salvarFuncionario(
    event
) {

    event.preventDefault();

    if (perfilPainelAdmin !== 'ADMIN') {
        mostrarAlertaAdmin('Somente o administrador pode alterar permissões.', 'danger');
        return;
    }


    const usuarioId =
        Number(
            document.getElementById(
                'funcionarioUsuarioId'
            ).value
        );


    const permissoes = {

        visualizarUsuarios:
            document.getElementById(
                'funcVisualizarUsuarios'
            ).checked,

        bloquearUsuarios:
            document.getElementById(
                'funcBloquearUsuarios'
            ).checked,

        visualizarEventos:
            document.getElementById(
                'funcVisualizarEventos'
            ).checked,

        moderarEventos:
            document.getElementById(
                'funcModerarEventos'
            ).checked,

        visualizarPagamentos:
            document.getElementById(
                'funcVisualizarPagamentos'
            ).checked,

        gerenciarPlanos:
            document.getElementById(
                'funcGerenciarPlanos'
            ).checked

    };


    const btn =
        document.getElementById(
            'btnSalvarFuncionario'
        );


    const original =
        btn.innerHTML;


    btn.disabled =
        true;


    btn.innerHTML =
        'Salvando...';


    try {

        const response =
            await Auth.fetchAutenticado(

                `/admin/usuarios/${usuarioId}/funcionario`,

                {

                    method:
                        'PUT',

                    body:
                        JSON.stringify(
                            permissoes
                        )

                }

            );


        if (!response.ok) {

            const erro =
                await lerErroAdmin(
                    response
                );


            throw new Error(
                extrairErroAdmin(
                    erro,
                    'Não foi possível tornar o usuário funcionário.'
                )
            );

        }


        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalFuncionario'
                )
            )
            ?.hide();


        mostrarAlertaAdmin(
            'Usuário promovido a funcionário.',
            'success'
        );


        const recargas = [carregarUsuarios()];
        if (perfilPainelAdmin === 'ADMIN') recargas.push(carregarHistorico());
        await Promise.allSettled(recargas);


    } catch (error) {

        mostrarAlertaAdmin(
            error.message,
            'danger'
        );


    } finally {

        btn.disabled =
            false;


        btn.innerHTML =
            original;

    }

}


// ==========================================================
// EVENTOS
// ==========================================================

async function carregarEventos() {

    try {

        const response =
            await Auth.fetchAutenticado(
                '/eventos/todos'
            );


        const dados =
            await response
                .json()
                .catch(
                    () => []
                );


        if (!response.ok) {

            throw new Error(
                extrairErroAdmin(
                    dados,
                    'Não foi possível carregar os eventos.'
                )
            );

        }


        eventosAdmin =
            Array.isArray(dados)
                ? dados
                : [];


        renderizarEventos();

        atualizarResumos();


    } catch (error) {

        console.error(
            error
        );


        mostrarAlertaAdmin(
            error.message,
            'danger'
        );

    }

}


function renderizarEventos() {

    const tbody =
        document.getElementById(
            'tabelaEventos'
        );


    if (!tbody) {
        return;
    }


    const filtro =
        document.getElementById(
            'filtroEventos'
        )
        ?.value
        .trim()
        .toLowerCase() ||
        '';


    const eventos =
        eventosAdmin.filter(

            evento =>

                `${evento.titulo || ''}
                 ${evento.organizadorNome || ''}`
                    .toLowerCase()
                    .includes(
                        filtro
                    )

        );


    if (
        eventos.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center py-5 text-muted-theme"
                >
                    Nenhum evento encontrado.
                </td>

            </tr>

        `;

        return;

    }


    tbody.innerHTML =
        eventos
            .map(

                evento => `

                    <tr>

                        <td>
                            ${Number(evento.id)}
                        </td>


                        <td>

                            <strong>
                                ${
                                    escapeHtmlAdmin(
                                        evento.titulo ||
                                        'Evento'
                                    )
                                }
                            </strong>

                            <div
                                class="small
                                       text-muted-theme"
                            >

                                ${
                                    escapeHtmlAdmin(
                                        evento.cidade ||
                                        ''
                                    )
                                }

                            </div>

                        </td>


                        <td>

                            ${
                                escapeHtmlAdmin(
                                    evento.organizadorNome ||
                                    '-'
                                )
                            }

                        </td>


                        <td>

                            ${
                                formatarDataAdmin(
                                    evento.dataInicio
                                )
                            }

                        </td>


                        <td>

                            <span
                                class="badge ${
                                    obterClasseEvento(
                                        evento.status
                                    )
                                }"
                            >

                                ${
                                    escapeHtmlAdmin(
                                        evento.status ||
                                        '-'
                                    )
                                }

                            </span>

                        </td>


                        <td
                            class="text-end"
                        >

                            <div
                                class="d-flex
                                       justify-content-end
                                       gap-1"
                            >

                                <a
                                    href="detalhesEvento.html?id=${Number(evento.id)}"
                                    class="btn
                                           btn-outline-primary
                                           btn-sm"
                                >

                                    <i
                                        class="bi bi-eye"
                                    ></i>

                                </a>


                                ${
                                    evento.status !== 'REMOVIDO_ADMIN'
                                        && funcionarioPode('moderarEventos')

                                        ? `

                                            <button
                                                class="btn
                                                       btn-outline-danger
                                                       btn-sm"
                                                onclick="abrirRemocaoEvento(
                                                    ${Number(evento.id)}
                                                )"
                                            >

                                                <i
                                                    class="bi bi-trash"
                                                ></i>

                                            </button>

                                        `

                                        : ''
                                }

                            </div>

                        </td>

                    </tr>

                `

            )
            .join('');

}


// ==========================================================
// REMOVER EVENTO
// ==========================================================

function abrirRemocaoEvento(
    eventoId
) {

    const evento =
        eventosAdmin.find(

            item =>
                Number(item.id) ===
                Number(eventoId)

        );


    if (!evento) {
        return;
    }


    document.getElementById(
        'removerEventoId'
    ).value =
        evento.id;


    document.getElementById(
        'removerEventoTitulo'
    ).value =
        evento.titulo ||
        'Evento';


    document.getElementById(
        'motivoRemocaoEvento'
    ).value =
        '';


    bootstrap.Modal
        .getOrCreateInstance(

            document.getElementById(
                'modalRemoverEvento'
            )

        )
        .show();

}


async function removerEventoAdmin(
    event
) {

    event.preventDefault();


    const eventoId =
        Number(
            document.getElementById(
                'removerEventoId'
            ).value
        );


    const motivo =
        document.getElementById(
            'motivoRemocaoEvento'
        )
        .value
        .trim();


    if (!motivo) {

        mostrarAlertaAdmin(
            'Informe o motivo da remoção.',
            'warning'
        );

        return;

    }


    try {

        const response =
            await Auth.fetchAutenticado(

                `/admin/eventos/${eventoId}/remover?motivo=${encodeURIComponent(motivo)}`,

                {
                    method:
                        'PUT'
                }

            );


        if (!response.ok) {

            const erro =
                await lerErroAdmin(
                    response
                );


            throw new Error(
                extrairErroAdmin(
                    erro,
                    'Não foi possível remover o evento.'
                )
            );

        }


        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalRemoverEvento'
                )
            )
            ?.hide();


        mostrarAlertaAdmin(
            'Evento removido administrativamente.',
            'success'
        );


        const recargas = [carregarEventos()];
        if (perfilPainelAdmin === 'ADMIN') recargas.push(carregarHistorico());
        await Promise.allSettled(recargas);


    } catch (error) {

        mostrarAlertaAdmin(
            error.message,
            'danger'
        );

    }

}


// ==========================================================
// PLANOS
// ==========================================================

async function carregarPlanos() {

    try {

        const response =
            await Auth.fetchAutenticado(
                '/planos/todos'
            );


        const dados =
            await response
                .json()
                .catch(
                    () => []
                );


        if (!response.ok) {

            throw new Error(
                extrairErroAdmin(
                    dados,
                    'Não foi possível carregar os planos.'
                )
            );

        }


        planosAdmin =
            Array.isArray(dados)
                ? dados
                : [];


        renderizarPlanos();

        atualizarResumos();


    } catch (error) {

        console.error(
            error
        );

    }

}


function renderizarPlanos() {

    const container =
        document.getElementById(
            'containerPlanos'
        );


    if (!container) {
        return;
    }


    if (
        planosAdmin.length === 0
    ) {

        container.innerHTML = `

            <div class="col-12">

                <div
                    class="card-custom
                           empty-state"
                >

                    <i
                        class="bi bi-box-seam"
                    ></i>

                    <h5 class="mt-3">
                        Nenhum plano
                    </h5>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        planosAdmin
            .map(

                plano => `

                    <div
                        class="col-md-6
                               col-xl-4"
                    >

                        <div
                            class="card-custom
                                   p-4 h-100"
                        >

                            <div
                                class="d-flex
                                       justify-content-between
                                       mb-3"
                            >

                                <div>

                                    <span
                                        class="badge
                                               bg-primary
                                               mb-2"
                                    >

                                        ${
                                            escapeHtmlAdmin(
                                                plano.tipo
                                            )
                                        }

                                    </span>


                                    <h5
                                        class="fw-bold mb-0"
                                    >

                                        ${
                                            escapeHtmlAdmin(
                                                plano.nome ||
                                                'Plano'
                                            )
                                        }

                                    </h5>

                                </div>


                                ${
                                    plano.ativo
                                        ? `
                                            <span
                                                class="badge
                                                       bg-success
                                                       align-self-start"
                                            >
                                                Ativo
                                            </span>
                                        `
                                        : `
                                            <span
                                                class="badge
                                                       bg-secondary
                                                       align-self-start"
                                            >
                                                Inativo
                                            </span>
                                        `
                                }

                            </div>


                            <div
                                class="text-muted-theme
                                       mb-1"
                            >

                                <i
                                    class="bi bi-calendar3 me-1"
                                ></i>

                                ${
                                    Number(
                                        plano.duracaoDias
                                    )
                                }
                                dias

                            </div>


                            <h4
                                class="fw-bold mt-3"
                            >

                                ${
                                    formatarMoeda(
                                        plano.valor
                                    )
                                }

                            </h4>


                            <div
                                class="d-flex gap-2
                                       mt-4"
                            >

                                <button
                                    class="btn
                                           btn-outline-primary
                                           btn-sm"
                                    onclick="editarPlano(
                                        ${Number(plano.id)}
                                    )"
                                >

                                    <i
                                        class="bi bi-pencil"
                                    ></i>

                                    Editar

                                </button>


                                ${
                                    plano.ativo
                                        ? `
                                            <button
                                                class="btn
                                                       btn-outline-danger
                                                       btn-sm"
                                                onclick="desativarPlano(
                                                    ${Number(plano.id)}
                                                )"
                                            >

                                                Desativar

                                            </button>
                                        `
                                        : ''
                                }

                            </div>

                        </div>

                    </div>

                `

            )
            .join('');

}


// ==========================================================
// NOVO / EDITAR PLANO
// ==========================================================

function abrirNovoPlano() {

    document.getElementById(
        'formPlano'
    ).reset();


    document.getElementById(
        'planoId'
    ).value =
        '';


    document.getElementById(
        'planoAtivo'
    ).checked =
        true;


    document.getElementById(
        'tituloModalPlano'
    ).textContent =
        'Novo Plano';


    bootstrap.Modal
        .getOrCreateInstance(

            document.getElementById(
                'modalPlano'
            )

        )
        .show();

}


function editarPlano(
    planoId
) {

    const plano =
        planosAdmin.find(

            item =>
                Number(item.id) ===
                Number(planoId)

        );


    if (!plano) {
        return;
    }


    document.getElementById(
        'planoId'
    ).value =
        plano.id;


    document.getElementById(
        'planoNome'
    ).value =
        plano.nome ||
        '';


    document.getElementById(
        'planoTipo'
    ).value =
        plano.tipo ||
        'HUB';


    document.getElementById(
        'planoDuracao'
    ).value =
        plano.duracaoDias ||
        1;


    document.getElementById(
        'planoValor'
    ).value =
        plano.valor ??
        0;


    document.getElementById(
        'planoAtivo'
    ).checked =
        plano.ativo !==
        false;


    document.getElementById(
        'tituloModalPlano'
    ).textContent =
        'Editar Plano';


    bootstrap.Modal
        .getOrCreateInstance(

            document.getElementById(
                'modalPlano'
            )

        )
        .show();

}


async function salvarPlano(
    event
) {

    event.preventDefault();


    const id =
        document.getElementById(
            'planoId'
        ).value;


    const plano = {

        nome:
            document.getElementById(
                'planoNome'
            ).value.trim(),

        tipo:
            document.getElementById(
                'planoTipo'
            ).value,

        duracaoDias:
            Number(
                document.getElementById(
                    'planoDuracao'
                ).value
            ),

        valor:
            Number(
                document.getElementById(
                    'planoValor'
                ).value
            ),

        ativo:
            document.getElementById(
                'planoAtivo'
            ).checked

    };


    try {

        const response =
            await Auth.fetchAutenticado(

                id
                    ? `/planos/${id}`
                    : '/planos/criar',

                {

                    method:
                        id
                            ? 'PUT'
                            : 'POST',

                    body:
                        JSON.stringify(
                            plano
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
                extrairErroAdmin(
                    data,
                    'Não foi possível salvar o plano.'
                )
            );

        }


        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalPlano'
                )
            )
            ?.hide();


        mostrarAlertaAdmin(
            'Plano salvo com sucesso.',
            'success'
        );


        await carregarPlanos();


    } catch (error) {

        mostrarAlertaAdmin(
            error.message,
            'danger'
        );

    }

}


async function desativarPlano(
    planoId
) {

    if (
        !confirm(
            'Deseja desativar este plano?'
        )
    ) {

        return;

    }


    try {

        const response =
            await Auth.fetchAutenticado(

                `/planos/${planoId}/desativar`,

                {
                    method:
                        'PUT'
                }

            );


        if (!response.ok) {

            const erro =
                await lerErroAdmin(
                    response
                );


            throw new Error(
                extrairErroAdmin(
                    erro,
                    'Não foi possível desativar o plano.'
                )
            );

        }


        mostrarAlertaAdmin(
            'Plano desativado.',
            'success'
        );


        await carregarPlanos();


    } catch (error) {

        mostrarAlertaAdmin(
            error.message,
            'danger'
        );

    }

}


// ==========================================================
// PAGAMENTOS
// ==========================================================

async function carregarPagamentos() {

    const tbody =
        document.getElementById(
            'tabelaPagamentos'
        );


    try {

        const response =
            await Auth.fetchAutenticado(
                '/pagamentos/todos'
            );


        const dados =
            await response
                .json()
                .catch(
                    () => []
                );


        if (!response.ok) {

            throw new Error(
                extrairErroAdmin(
                    dados,
                    'Não foi possível carregar pagamentos.'
                )
            );

        }


        pagamentosAdmin =
            Array.isArray(dados)
                ? dados
                : [];


        if (!tbody) {
            return;
        }


        if (
            pagamentosAdmin.length ===
            0
        ) {

            tbody.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="text-center py-5 text-muted-theme"
                    >
                        Nenhum pagamento encontrado.
                    </td>

                </tr>

            `;

            atualizarResumos();

            return;

        }


        tbody.innerHTML =
            pagamentosAdmin
                .map(

                    pagamento => `

                        <tr>

                            <td>
                                ${Number(pagamento.id)}
                            </td>


                            <td>

                                ${
                                    escapeHtmlAdmin(
                                        pagamento.usuarioNome ||
                                        '-'
                                    )
                                }

                            </td>


                            <td>

                                ${
                                    escapeHtmlAdmin(
                                        pagamento.eventoTitulo ||
                                        '-'
                                    )
                                }

                            </td>


                            <td>

                                ${
                                    escapeHtmlAdmin(
                                        pagamento.planoNome ||
                                        '-'
                                    )
                                }

                                <div
                                    class="small
                                           text-muted-theme"
                                >

                                    ${
                                        escapeHtmlAdmin(
                                            pagamento.tipoPlano ||
                                            ''
                                        )
                                    }

                                </div>

                            </td>


                            <td
                                class="fw-semibold"
                            >

                                ${
                                    formatarMoeda(
                                        pagamento.valorPago
                                    )
                                }

                            </td>


                            <td>

                                <span
                                    class="badge ${
                                        obterClassePagamento(
                                            pagamento.status
                                        )
                                    }"
                                >

                                    ${
                                        escapeHtmlAdmin(
                                            pagamento.status ||
                                            '-'
                                        )
                                    }

                                </span>

                            </td>


                            <td>

                                ${
                                    formatarDataHoraAdmin(
                                        pagamento.dataCriacao
                                    )
                                }

                            </td>

                        </tr>

                    `

                )
                .join('');


        atualizarResumos();


    } catch (error) {

        console.error(
            error
        );


        if (tbody) {

            tbody.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="text-center
                               text-danger py-5"
                    >

                        ${
                            escapeHtmlAdmin(
                                error.message
                            )
                        }

                    </td>

                </tr>

            `;

        }

    }

}


// ==========================================================
// HISTÓRICO ADMINISTRATIVO
// ==========================================================

async function carregarHistorico() {

    const container =
        document.getElementById(
            'containerHistorico'
        );


    try {

        const response =
            await Auth.fetchAutenticado(
                '/historico-admin'
            );


        const dados =
            await response
                .json()
                .catch(
                    () => []
                );


        if (!response.ok) {

            throw new Error(
                extrairErroAdmin(
                    dados,
                    'Não foi possível carregar o histórico.'
                )
            );

        }


        historicoAdmin =
            Array.isArray(dados)
                ? dados
                : [];


        if (!container) {
            return;
        }


        if (
            historicoAdmin.length ===
            0
        ) {

            container.innerHTML = `

                <div
                    class="empty-state"
                >

                    <i
                        class="bi bi-clock-history"
                    ></i>

                    <h5 class="mt-3">
                        Nenhuma ação registrada
                    </h5>

                </div>

            `;

            return;

        }


        const ordenado =
            [...historicoAdmin]
                .sort(
                    (a, b) =>
                        new Date(
                            b.dataAcao
                        ) -
                        new Date(
                            a.dataAcao
                        )
                );


        container.innerHTML =
            ordenado
                .map(

                    item => `

                        <div
                            class="border-bottom
                                   pb-3 mb-3"
                        >

                            <div
                                class="d-flex
                                       justify-content-between
                                       gap-3"
                            >

                                <div>

                                    <div
                                        class="d-flex
                                               flex-wrap
                                               gap-2
                                               align-items-center"
                                    >

                                        <strong>

                                            ${
                                                escapeHtmlAdmin(
                                                    item.usuarioNome ||
                                                    'Administrador'
                                                )
                                            }

                                        </strong>


                                        <span
                                            class="badge
                                                   bg-primary"
                                        >

                                            ${
                                                escapeHtmlAdmin(
                                                    formatarAcaoAdmin(
                                                        item.acao
                                                    )
                                                )
                                            }

                                        </span>

                                    </div>


                                    <div
                                        class="text-muted-theme
                                               mt-1"
                                    >

                                        ${
                                            escapeHtmlAdmin(
                                                item.descricao ||
                                                ''
                                            )
                                        }

                                    </div>


                                    <small
                                        class="text-muted-theme"
                                    >

                                        ${
                                            escapeHtmlAdmin(
                                                item.entidade ||
                                                ''
                                            )
                                        }

                                        ${
                                            item.entidadeId
                                                ? `#${Number(item.entidadeId)}`
                                                : ''
                                        }

                                    </small>

                                </div>


                                <small
                                    class="text-muted-theme
                                           text-nowrap"
                                >

                                    ${
                                        formatarDataHoraAdmin(
                                            item.dataAcao
                                        )
                                    }

                                </small>

                            </div>

                        </div>

                    `

                )
                .join('');


    } catch (error) {

        console.error(
            error
        );


        if (container) {

            container.innerHTML = `

                <div
                    class="alert alert-danger"
                >

                    ${
                        escapeHtmlAdmin(
                            error.message
                        )
                    }

                </div>

            `;

        }

    }

}


// ==========================================================
// RESUMOS
// ==========================================================

function atualizarResumos() {

    definirTextoAdmin(
        'resumoUsuarios',
        usuariosAdmin.length
    );


    definirTextoAdmin(
        'resumoEventos',
        eventosAdmin.length
    );


    definirTextoAdmin(

        'resumoPlanos',

        planosAdmin.filter(
            plano =>
                plano.ativo !==
                false
        ).length

    );


    definirTextoAdmin(
        'resumoPagamentos',
        pagamentosAdmin.length
    );

}


// ==========================================================
// TEMA
// ==========================================================

function configurarTema() {

    const salvo =
        localStorage.getItem(
            'mblf-theme'
        );


    if (
        salvo ===
        'light'
    ) {

        document.documentElement
            .setAttribute(
                'data-theme',
                'light'
            );

    }


    atualizarIconeTema();


    document
        .getElementById(
            'btnTemaAdmin'
        )
        ?.addEventListener(
            'click',
            () => {

                const atual =
                    document
                        .documentElement
                        .getAttribute(
                            'data-theme'
                        ) ||
                    'dark';


                const novo =
                    atual ===
                    'dark'
                        ? 'light'
                        : 'dark';


                document
                    .documentElement
                    .setAttribute(
                        'data-theme',
                        novo
                    );


                localStorage.setItem(
                    'mblf-theme',
                    novo
                );


                atualizarIconeTema();

            }
        );

}


function atualizarIconeTema() {

    const icone =
        document.getElementById(
            'iconeTemaAdmin'
        );


    if (!icone) {
        return;
    }


    const escuro =
        document
            .documentElement
            .getAttribute(
                'data-theme'
            ) ===
        'dark';


    icone.className =
        escuro
            ? 'bi bi-sun'
            : 'bi bi-moon-stars';

}


// ==========================================================
// SAIR
// ==========================================================

function sairAdmin() {

    if (
        typeof Auth.logout ===
        'function'
    ) {

        Auth.logout();

    } else {

        localStorage.clear();

    }


    window.location.href =
        'login.html';

}


// ==========================================================
// AUXILIARES VISUAIS
// ==========================================================

function obterClassePerfil(
    perfil
) {

    switch (
        String(
            perfil
        ).toUpperCase()
    ) {

        case 'ADMIN':
            return 'bg-danger';


        case 'FUNCIONARIO':
            return 'bg-info text-dark';


        case 'PROFESSOR':
            return 'bg-primary';


        case 'ALUNO':
            return 'bg-success';


        default:
            return 'bg-secondary';

    }

}


function obterClasseEvento(
    status
) {

    switch (status) {

        case 'PUBLICADO':
            return 'bg-success';


        case 'RASCUNHO':
            return 'bg-secondary';


        case 'ENCERRADO':
            return 'bg-primary';


        case 'CANCELADO':

        case 'REMOVIDO_ADMIN':
            return 'bg-danger';


        default:
            return 'bg-secondary';

    }

}


function obterClassePagamento(
    status
) {

    switch (
        String(status)
            .toUpperCase()
    ) {

        case 'APROVADO':

        case 'PAGO':
            return 'bg-success';


        case 'PENDENTE':
            return 'bg-warning text-dark';


        case 'RECUSADO':

        case 'CANCELADO':
            return 'bg-danger';


        default:
            return 'bg-secondary';

    }

}


// ==========================================================
// FORMATAÇÃO
// ==========================================================

function formatarMoeda(
    valor
) {

    const numero =
        Number(valor);


    if (
        Number.isNaN(numero)
    ) {

        return 'R$ 0,00';

    }


    return numero
        .toLocaleString(
            'pt-BR',
            {
                style:
                    'currency',

                currency:
                    'BRL'
            }
        );

}


function formatarDataAdmin(
    data
) {

    if (!data) {
        return '-';
    }


    const objeto =
        new Date(data);


    if (
        Number.isNaN(
            objeto.getTime()
        )
    ) {

        return '-';

    }


    return objeto
        .toLocaleDateString(
            'pt-BR'
        );

}


function formatarDataHoraAdmin(
    data
) {

    if (!data) {
        return '-';
    }


    const objeto =
        new Date(data);


    if (
        Number.isNaN(
            objeto.getTime()
        )
    ) {

        return '-';

    }


    return objeto
        .toLocaleString(
            'pt-BR'
        );

}


function formatarAcaoAdmin(
    acao
) {

    if (!acao) {
        return 'AÇÃO';
    }


    return String(acao)
        .replaceAll(
            '_',
            ' '
        );

}


// ==========================================================
// ALERTAS
// ==========================================================

function mostrarAlertaAdmin(
    mensagem,
    tipo = 'info'
) {

    const alerta =
        document.getElementById(
            'alertAdmin'
        );


    if (!alerta) {
        return;
    }


    alerta.className =
        `alert alert-${tipo}`;


    alerta.textContent =
        mensagem;


    alerta.classList
        .remove(
            'd-none'
        );


    window.scrollTo({
        top:
            0,

        behavior:
            'smooth'
    });


    setTimeout(
        () => {

            alerta.classList
                .add(
                    'd-none'
                );

        },
        5000
    );

}


// ==========================================================
// ERROS
// ==========================================================

async function lerErroAdmin(
    response
) {

    try {

        return await response.json();

    } catch {

        try {

            return {
                message:
                    await response.text()
            };

        } catch {

            return {};

        }

    }

}


function extrairErroAdmin(
    erro,
    padrao
) {

    if (!erro) {
        return padrao;
    }


    if (
        typeof erro ===
        'string'
    ) {

        return erro;

    }


    return (
        erro.message ||
        erro.mensagem ||
        erro.error ||
        erro.erro ||
        padrao
    );

}


// ==========================================================
// SEGURANÇA HTML
// ==========================================================

function escapeHtmlAdmin(
    valor
) {

    return String(
        valor ??
        ''
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


function definirTextoAdmin(
    id,
    valor
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            valor;

    }

}


// ==========================================================
// EXPORTAÇÕES PARA ONCLICK
// ==========================================================

window.alterarBloqueioUsuario =
    alterarBloqueioUsuario;


window.abrirFuncionario =
    abrirFuncionario;


window.abrirRemocaoEvento =
    abrirRemocaoEvento;


window.editarPlano =
    editarPlano;


window.desativarPlano =
    desativarPlano;