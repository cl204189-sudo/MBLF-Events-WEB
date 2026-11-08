// ==========================================================
// MBLF EVENTS
// cadastro.js
// ==========================================================


// URL base da API
const API_URL = 'http://localhost:8080';


// Formulário
const formCadastro =
    document.getElementById('formCadastro');


// Área de feedback
const alertFeedback =
    document.getElementById('alertFeedback');


// ==========================================================
// TRADUÇÃO
// ==========================================================

function tCadastro(
    chave,
    fallback = ''
) {

    if (
        window.I18n &&
        typeof window.I18n.t === 'function'
    ) {

        const traducao =
            window.I18n.t(chave);

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
// MOSTRAR MENSAGEM
// ==========================================================

function mostrarFeedback(
    mensagem,
    tipo = 'danger'
) {

    if (!alertFeedback) {
        return;
    }


    alertFeedback.className =
        `alert alert-${tipo} py-2 small`;

    alertFeedback.textContent =
        mensagem;

}


// ==========================================================
// LIMPAR MENSAGEM
// ==========================================================

function ocultarFeedback() {

    if (!alertFeedback) {
        return;
    }


    alertFeedback.className =
        'alert d-none py-2 small';

    alertFeedback.textContent =
        '';

}

const DOMINIOS_EMAIL_PERMITIDOS = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'icloud.com',
    'live.com',
    'unicamp.br',
    'g.unicamp.br'
];

function emailValido(email) {

    const emailNormalizado =
        email
            .trim()
            .toLowerCase();

    const regexEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!regexEmail.test(emailNormalizado)) {
        return false;
    }

    const dominio =
        emailNormalizado.split('@')[1];

    return DOMINIOS_EMAIL_PERMITIDOS.includes(
        dominio
    );
}

// ==========================================================
// FORMULÁRIO
// ==========================================================

if (formCadastro) {

    formCadastro.addEventListener(
        'submit',

        async function (e) {

            // Impede recarregamento da página
            e.preventDefault();


            // Limpa mensagens anteriores
            ocultarFeedback();


            // ==================================================
            // DADOS DO FORMULÁRIO
            // ==================================================

            const nome =
                document
                    .getElementById('nome')
                    .value
                    .trim();


            const email =
                document
                    .getElementById('email')
                    .value
                    .trim();


            const senha =
                document
                    .getElementById('senha')
                    .value;


            const confirmarSenha =
                document
                    .getElementById('confirmarSenha')
                    .value;


            const btnSubmit =
                formCadastro.querySelector(
                    'button[type="submit"]'
                );


            // ==================================================
            // VALIDAÇÕES
            // ==================================================

            if (
                !nome ||
                !email ||
                !senha ||
                !confirmarSenha
            ) {

                mostrarFeedback(
                    tCadastro(
                        'cadastroCamposObrigatorios',
                        'Preencha todos os campos obrigatórios.'
                    )
                );

                return;
            }

            if (!nomeValido(nome)) {

                mostrarFeedback(
                    tCadastro(
                        'cadastroNomeInvalido',
                        'Informe seu nome completo, usando apenas letras.'
                    )
                );

                return;
            }

            if (!emailValido(email)) {

            mostrarFeedback(
                tCadastro(
                    'cadastroEmailInvalido',
                    'Informe um endereço de e-mail válido.'
                )
            );

            return;
            }

            function nomeValido(nome) {

            const partesNome =
                nome
                    .trim()
                    .split(/\s+/);

            return (
                partesNome.length >= 2 &&
                partesNome.every(
                    parte =>
                        /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,}$/.test(parte)
                )
            );
        }


            if (senha.length < 6) {

                mostrarFeedback(
                    tCadastro(
                        'cadastroSenhaMinimo',
                        'A senha deve possuir pelo menos 6 caracteres.'
                    )
                );

                return;
            }


            if (senha !== confirmarSenha) {

                mostrarFeedback(
                    tCadastro(
                        'cadastroSenhasDiferentes',
                        'As senhas informadas não coincidem.'
                    )
                );

                return;
            }


            // ==================================================
            // LOADING DO BOTÃO
            // ==================================================

            const textoOriginalBtn =
                btnSubmit.innerHTML;


            btnSubmit.disabled = true;


            btnSubmit.innerHTML = `
                <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                ></span>

                ${tCadastro(
                    'cadastroCriandoConta',
                    'Criando conta...'
                )}
            `;


            try {

                // ==================================================
                // REQUISIÇÃO PARA API
                // ==================================================

                const response =
                    await fetch(
                        `${API_URL}/usuarios/criar`,
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body: JSON.stringify({

                                nome: nome,

                                email: email,

                                senha: senha

                            })
                        }
                    );


                // ==================================================
                // RESPOSTA DA API
                // ==================================================

                const data =
                    await response
                        .json()
                        .catch(() => ({}));


                // ==================================================
                // SUCESSO
                // ==================================================

                if (response.ok) {

                    mostrarFeedback(
                        tCadastro(
                            'cadastroSucesso',
                            'Cadastro realizado com sucesso! Redirecionando para o login...'
                        ),
                        'success'
                    );


                    // Limpa formulário
                    formCadastro.reset();


                    // Aguarda para usuário visualizar mensagem
                    setTimeout(
                        function () {

                            window.location.href =
                                'login.html';

                        },
                        1500
                    );


                    return;
                }


                // ==================================================
                // ERRO DEVOLVIDO PELA API
                // ==================================================

                let mensagemErro =
                    tCadastro(
                        'cadastroErro',
                        'Não foi possível realizar o cadastro.'
                    );


                if (data.mensagem) {

                    mensagemErro =
                        data.mensagem;

                } else if (data.message) {

                    mensagemErro =
                        data.message;

                } else if (typeof data === 'string') {

                    mensagemErro =
                        data;

                }


                mostrarFeedback(
                    mensagemErro,
                    'danger'
                );

            } catch (error) {

                // ==================================================
                // ERRO DE CONEXÃO
                // ==================================================

                console.error(
                    'Erro ao realizar cadastro:',
                    error
                );


                mostrarFeedback(
                    tCadastro(
                        'cadastroErroConexao',
                        'Não foi possível conectar ao servidor. Verifique se a API está em execução.'
                    )
                );

            } finally {

                // ==================================================
                // RESTAURA O BOTÃO
                // ==================================================

                btnSubmit.disabled =
                    false;


                btnSubmit.innerHTML =
                    textoOriginalBtn;

            }

        }
    );

    

}