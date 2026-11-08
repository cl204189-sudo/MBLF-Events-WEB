// ==========================================================
// MBLF EVENTS
// minhaConta.js
// ==========================================================


// ==========================================================
// PROTEGER PÁGINA
// ==========================================================

Auth.protegerPagina();


// ==========================================================
// ELEMENTOS
// ==========================================================

const formDadosConta =
    document.getElementById(
        'formDadosConta'
    );

const formSenhaConta =
    document.getElementById(
        'formSenhaConta'
    );

const inputContaNome =
    document.getElementById(
        'inputContaNome'
    );

const inputContaEmail =
    document.getElementById(
        'inputContaEmail'
    );

const inputSenhaAtual =
    document.getElementById(
        'inputSenhaAtual'
    );

const inputNovaSenha =
    document.getElementById(
        'inputNovaSenha'
    );

const inputConfirmarNovaSenha =
    document.getElementById(
        'inputConfirmarNovaSenha'
    );

const btnSalvarConta =
    document.getElementById(
        'btnSalvarConta'
    );

const btnAlterarSenha =
    document.getElementById(
        'btnAlterarSenha'
    );

const alertConta =
    document.getElementById(
        'alertConta'
    );


// ==========================================================
// USUÁRIO ATUAL
// ==========================================================

let usuarioAtual = null;


// ==========================================================
// TRADUÇÃO
// ==========================================================

function t(
    chave,
    fallback
) {

    if (
        window.I18n &&
        typeof window.I18n.t === 'function'
    ) {

        const traducao =
            window.I18n.t(
                chave
            );

        if (
            traducao &&
            traducao !== chave
        ) {

            return traducao;

        }

    }

    return fallback;

}


// ==========================================================
// ALERTA
// ==========================================================

function mostrarAlerta(
    mensagem,
    tipo = 'success'
) {

    alertConta.className =
        `alert alert-${tipo}`;

    alertConta.textContent =
        mensagem;

    alertConta.classList.remove(
        'd-none'
    );


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}


function esconderAlerta() {

    alertConta.classList.add(
        'd-none'
    );

    alertConta.textContent =
        '';

}


// ==========================================================
// LER ERRO DA API
// ==========================================================

async function obterMensagemErro(
    response,
    fallback
) {

    try {

        const tipoConteudo =
            response.headers.get(
                'content-type'
            ) || '';


        if (
            tipoConteudo.includes(
                'application/json'
            )
        ) {

            const dados =
                await response.json();

            return (
                dados.message ||
                dados.mensagem ||
                dados.error ||
                fallback
            );

        }


        const texto =
            await response.text();

        if (
            texto &&
            texto.trim()
        ) {

            return texto;

        }

    } catch (error) {

        console.error(
            'Erro ao ler resposta da API:',
            error
        );

    }


    return fallback;

}


// ==========================================================
// VALIDAR NOME
// ==========================================================

function nomeValido(
    nome
) {

    const partesNome =
        nome
            .trim()
            .split(/\s+/);


    return (
        partesNome.length >= 2 &&
        partesNome.every(
            parte =>
                /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,}$/.test(
                    parte
                )
        )
    );

}


// ==========================================================
// SALVAR DADOS ATUALIZADOS NA SESSÃO
// ==========================================================

function atualizarUsuarioLocal(
    usuario
) {

    const usuarioSalvo =
        Auth.getUsuario() || {};


    const atualizado = {

        ...usuarioSalvo,

        id:
            usuario.id ??
            usuarioSalvo.id,

        nome:
            usuario.nome ??
            usuarioSalvo.nome,

        email:
            usuario.email ??
            usuarioSalvo.email,

        perfil:
            usuario.perfil ??
            usuarioSalvo.perfil

    };


    localStorage.setItem(
        'usuario',
        JSON.stringify(
            atualizado
        )
    );

}


// ==========================================================
// CARREGAR PERFIL
// GET /usuarios/me
// ==========================================================

async function carregarMinhaConta() {

    esconderAlerta();


    inputContaNome.disabled =
        true;

    inputContaEmail.disabled =
        true;

    btnSalvarConta.disabled =
        true;


    try {

        const response =
            await Auth.fetchAutenticado(
                '/usuarios/me'
            );


        if (!response.ok) {

            const mensagem =
                await obterMensagemErro(
                    response,
                    t(
                        'contaErroCarregar',
                        'Não foi possível carregar os dados da sua conta.'
                    )
                );

            throw new Error(
                mensagem
            );

        }


        usuarioAtual =
            await response.json();


        inputContaNome.value =
            usuarioAtual.nome || '';

        inputContaEmail.value =
            usuarioAtual.email || '';


        atualizarUsuarioLocal(
            usuarioAtual
        );


    } catch (error) {

        console.error(
            'Erro ao carregar conta:',
            error
        );


        mostrarAlerta(
            error.message ||
            t(
                'contaErroCarregar',
                'Não foi possível carregar os dados da sua conta.'
            ),
            'danger'
        );

    } finally {

        inputContaNome.disabled =
            false;

        inputContaEmail.disabled =
            false;

        btnSalvarConta.disabled =
            false;

    }

}


// ==========================================================
// ATUALIZAR DADOS PESSOAIS
// PUT /usuarios/me
// ==========================================================

async function salvarDadosConta(
    event
) {

    event.preventDefault();

    esconderAlerta();


    const nome =
        inputContaNome.value.trim();

    const email =
        inputContaEmail.value
            .trim()
            .toLowerCase();


    // ======================================================
    // VALIDAÇÕES
    // ======================================================

    if (
        !nome ||
        !email
    ) {

        mostrarAlerta(
            t(
                'contaCamposObrigatorios',
                'Preencha o nome e o e-mail.'
            ),
            'warning'
        );

        return;

    }


    if (
        !nomeValido(
            nome
        )
    ) {

        mostrarAlerta(
            t(
                'contaNomeInvalido',
                'Informe seu nome completo.'
            ),
            'warning'
        );

        return;

    }


    if (
        !inputContaEmail.checkValidity()
    ) {

        mostrarAlerta(
            t(
                'contaEmailInvalido',
                'Informe um e-mail válido.'
            ),
            'warning'
        );

        return;

    }


    // ======================================================
    // BOTÃO
    // ======================================================

    const htmlOriginal =
        btnSalvarConta.innerHTML;


    btnSalvarConta.disabled =
        true;

    btnSalvarConta.innerHTML =
        `
            <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
            ></span>

            ${t(
                'contaSalvando',
                'Salvando...'
            )}
        `;


    try {

        const response =
            await Auth.fetchAutenticado(
                '/usuarios/me',
                {
                    method: 'PUT',

                    body:
                        JSON.stringify({
                            nome: nome,
                            email: email
                        })
                }
            );


        if (!response.ok) {

            const mensagem =
                await obterMensagemErro(
                    response,
                    t(
                        'contaErroSalvar',
                        'Não foi possível salvar as alterações.'
                    )
                );

            throw new Error(
                mensagem
            );

        }


        const usuarioAtualizado =
            await response.json();


        usuarioAtual =
            usuarioAtualizado;


        inputContaNome.value =
            usuarioAtualizado.nome || nome;

        inputContaEmail.value =
            usuarioAtualizado.email || email;


        atualizarUsuarioLocal(
            usuarioAtualizado
        );


        mostrarAlerta(
            t(
                'contaDadosAtualizados',
                'Dados atualizados com sucesso!'
            ),
            'success'
        );


    } catch (error) {

        console.error(
            'Erro ao atualizar conta:',
            error
        );


        mostrarAlerta(
            error.message ||
            t(
                'contaErroSalvar',
                'Não foi possível salvar as alterações.'
            ),
            'danger'
        );

    } finally {

        btnSalvarConta.disabled =
            false;

        btnSalvarConta.innerHTML =
            htmlOriginal;


        if (
            window.I18n &&
            typeof window.I18n.aplicarTraducoes ===
                'function'
        ) {

            window.I18n.aplicarTraducoes();

        }

    }

}


// ==========================================================
// ALTERAR SENHA
// PUT /usuarios/me/senha
// ==========================================================

async function alterarSenha(
    event
) {

    event.preventDefault();

    esconderAlerta();


    const senhaAtual =
        inputSenhaAtual.value;

    const novaSenha =
        inputNovaSenha.value;

    const confirmarNovaSenha =
        inputConfirmarNovaSenha.value;


    // ======================================================
    // VALIDAÇÕES
    // ======================================================

    if (
        !senhaAtual ||
        !novaSenha ||
        !confirmarNovaSenha
    ) {

        mostrarAlerta(
            t(
                'contaPreenchaSenhas',
                'Preencha todos os campos de senha.'
            ),
            'warning'
        );

        return;

    }


    if (
        novaSenha.length < 6
    ) {

        mostrarAlerta(
            t(
                'contaSenhaMinimo',
                'A nova senha deve possuir pelo menos 6 caracteres.'
            ),
            'warning'
        );

        return;

    }


    if (
        novaSenha !==
        confirmarNovaSenha
    ) {

        mostrarAlerta(
            t(
                'contaSenhasDiferentes',
                'A confirmação da nova senha não corresponde.'
            ),
            'warning'
        );

        return;

    }


    if (
        senhaAtual ===
        novaSenha
    ) {

        mostrarAlerta(
            t(
                'contaSenhaIgualAtual',
                'A nova senha deve ser diferente da senha atual.'
            ),
            'warning'
        );

        return;

    }


    // ======================================================
    // BOTÃO
    // ======================================================

    const htmlOriginal =
        btnAlterarSenha.innerHTML;


    btnAlterarSenha.disabled =
        true;

    btnAlterarSenha.innerHTML =
        `
            <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
            ></span>

            ${t(
                'contaAlterandoSenha',
                'Alterando...'
            )}
        `;


    try {

        const response =
            await Auth.fetchAutenticado(
                '/usuarios/me/senha',
                {
                    method: 'PUT',

                    body:
                        JSON.stringify({
                            senhaAtual: senhaAtual,
                            novaSenha: novaSenha
                        })
                }
            );


        if (!response.ok) {

            const mensagem =
                await obterMensagemErro(
                    response,
                    t(
                        'contaErroAlterarSenha',
                        'Não foi possível alterar a senha.'
                    )
                );

            throw new Error(
                mensagem
            );

        }


        formSenhaConta.reset();


        mostrarAlerta(
            t(
                'contaSenhaAlterada',
                'Senha alterada com sucesso!'
            ),
            'success'
        );


    } catch (error) {

        console.error(
            'Erro ao alterar senha:',
            error
        );


        mostrarAlerta(
            error.message ||
            t(
                'contaErroAlterarSenha',
                'Não foi possível alterar a senha.'
            ),
            'danger'
        );

    } finally {

        btnAlterarSenha.disabled =
            false;

        btnAlterarSenha.innerHTML =
            htmlOriginal;


        if (
            window.I18n &&
            typeof window.I18n.aplicarTraducoes ===
                'function'
        ) {

            window.I18n.aplicarTraducoes();

        }

    }

}


// ==========================================================
// EVENTOS
// ==========================================================

formDadosConta.addEventListener(
    'submit',
    salvarDadosConta
);


formSenhaConta.addEventListener(
    'submit',
    alterarSenha
);


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarMinhaConta();

    }
);