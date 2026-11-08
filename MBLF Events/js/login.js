// ==========================================================
// MBLF EVENTS
// login.js
// ==========================================================


const formLogin =
    document.getElementById(
        'formLogin'
    );


const alertFeedback =
    document.getElementById(
        'alertFeedback'
    );


// ==========================================================
// TRADUÇÃO
// ==========================================================

function tLogin(
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
// FEEDBACK
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


function ocultarFeedback() {

    if (!alertFeedback) {
        return;
    }


    alertFeedback.className =
        'alert d-none py-2 small';


    alertFeedback.textContent =
        '';

}


// ==========================================================
// SE JÁ ESTIVER LOGADO
// ==========================================================

if (Auth.estaLogado()) {

    Auth.redirecionarPorPerfil();

}


// ==========================================================
// LOGIN
// ==========================================================

if (formLogin) {

    formLogin.addEventListener(

        'submit',

        async function (e) {

            e.preventDefault();


            ocultarFeedback();


            // ==================================================
            // DADOS DO FORMULÁRIO
            // ==================================================

            const email =
                document
                    .getElementById(
                        'email'
                    )
                    .value
                    .trim();


            const senha =
                document
                    .getElementById(
                        'senha'
                    )
                    .value;


            const btnSubmit =
                formLogin.querySelector(
                    'button[type="submit"]'
                );


            // ==================================================
            // VALIDAÇÃO
            // ==================================================

            if (
                !email ||
                !senha
            ) {

                mostrarFeedback(
                    tLogin(
                        'loginCamposObrigatorios',
                        'Informe seu e-mail e sua senha.'
                    )
                );


                return;

            }


            // ==================================================
            // LOADING
            // ==================================================

            const textoOriginalBtn =
                btnSubmit.innerHTML;


            btnSubmit.disabled =
                true;


            btnSubmit.innerHTML = `

                <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                ></span>

                ${tLogin(
                    'loginAutenticando',
                    'Autenticando...'
                )}

            `;


            try {

                // ==============================================
                // REQUISIÇÃO PARA A API
                // ==============================================

                const response =
                    await fetch(

                        `${Auth.API_BASE_URL}/auth/login`,

                        {

                            method:
                                'POST',


                            headers: {

                                'Content-Type':
                                    'application/json'

                            },


                            body:
                                JSON.stringify({

                                    email:
                                        email,

                                    senha:
                                        senha

                                })

                        }

                    );


                const data =
                    await response
                        .json()
                        .catch(
                            () => ({})
                        );


                // ==============================================
                // LOGIN REALIZADO COM SUCESSO
                // ==============================================

                if (
                    response.ok &&
                    data.token
                ) {

                    // Salva:
                    // token
                    // id
                    // nome
                    // email
                    // perfil

                    Auth.salvarSessao(
                        data
                    );


                    const mensagemBoasVindas =
                        tLogin(
                            'loginBemVindo',
                            'Bem-vindo(a), {nome}! Redirecionando...'
                        ).replace(
                            '{nome}',
                            data.nome || ''
                        );

                    mostrarFeedback(
                        mensagemBoasVindas,
                        'success'
                    );

                    // ==========================================
                    // REDIRECIONAMENTO POR PERFIL
                    // ==========================================

                    setTimeout(

                        function () {

                            Auth.redirecionarPorPerfil();

                        },

                        1000

                    );


                    return;

                }


                // ==============================================
                // LOGIN INVÁLIDO
                // ==============================================

                const mensagem =
                    tLogin(
                        'loginInvalido',
                        'E-mail ou senha incorretos.'
                    );


                mostrarFeedback(
                    mensagem
                );


            } catch (error) {

                // ==============================================
                // ERRO DE CONEXÃO
                // ==============================================

                console.error(
                    'Erro no login:',
                    error
                );


                mostrarFeedback(
                    tLogin(
                        'loginErroConexao',
                        'Não foi possível conectar ao servidor. Verifique se a API está em execução.'
                    ),
                    'warning'
                );

            } finally {

                // ==============================================
                // RESTAURAR BOTÃO
                // ==============================================

                btnSubmit.disabled =
                    false;


                btnSubmit.innerHTML =
                    textoOriginalBtn;

            }

        }

    );

}