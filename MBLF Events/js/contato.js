// ==========================================================
// MBLF EVENTS
// contato.js
// ==========================================================


// ==========================================================
// CONFIGURAÇÃO
// ==========================================================

const EMAIL_CONTATO =
    'mblfcontato@gmail.com';


const WEB3FORMS_ACCESS_KEY =
    '0f3a01dd-90d4-485d-bb45-b2e2f180d658';


const WEB3FORMS_URL =
    'https://api.web3forms.com/submit';


// ======================================================
// TRADUÇÃO
// ======================================================

function tContato(
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
// ELEMENTOS
// ==========================================================

const formContato =
    document.getElementById(
        'formContato'
    );


const alertContato =
    document.getElementById(
        'alertContato'
    );


const btnEnviarContato =
    document.getElementById(
        'btnEnviarContato'
    );


const emailContatoTexto =
    document.getElementById(
        'emailContatoTexto'
    );


const inputNome =
    document.getElementById(
        'contatoNome'
    );


const inputEmail =
    document.getElementById(
        'contatoEmail'
    );


const inputAssunto =
    document.getElementById(
        'contatoAssunto'
    );


const inputMensagem =
    document.getElementById(
        'contatoMensagem'
    );


const contadorMensagem =
    document.getElementById(
        'contadorMensagem'
    );


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(

    'DOMContentLoaded',

    function () {

        configurarEmailContato();

        preencherUsuarioLogado();

        configurarContadorMensagem();

    }

);


// ==========================================================
// MOSTRAR E-MAIL OFICIAL
// ==========================================================

function configurarEmailContato() {

    if (!emailContatoTexto) {

        return;

    }


    emailContatoTexto.textContent =
        EMAIL_CONTATO;


    emailContatoTexto.href =
        `mailto:${EMAIL_CONTATO}`;

}


// ==========================================================
// PREENCHER USUÁRIO LOGADO
// ==========================================================

function preencherUsuarioLogado() {

    if (
        !window.Auth ||
        !Auth.estaLogado()
    ) {

        return;

    }


    const usuario =
        Auth.getUsuario();


    if (!usuario) {

        return;

    }


    if (
        inputNome &&
        usuario.nome &&
        !inputNome.value
    ) {

        inputNome.value =
            usuario.nome;

    }


    if (
        inputEmail &&
        usuario.email &&
        !inputEmail.value
    ) {

        inputEmail.value =
            usuario.email;

    }

}


// ==========================================================
// CONTADOR DA MENSAGEM
// ==========================================================

function configurarContadorMensagem() {

    if (
        !inputMensagem ||
        !contadorMensagem
    ) {

        return;

    }


    atualizarContadorMensagem();


    inputMensagem.addEventListener(

        'input',

        atualizarContadorMensagem

    );

}


function atualizarContadorMensagem() {

    if (
        !inputMensagem ||
        !contadorMensagem
    ) {

        return;

    }


    contadorMensagem.textContent =
        `${inputMensagem.value.length} / 1500`;

}


// ==========================================================
// SUBMIT
// ==========================================================

if (formContato) {

    formContato.addEventListener(

        'submit',

        enviarFormularioContato

    );

}


// ==========================================================
// ENVIAR FORMULÁRIO
// ==========================================================

async function enviarFormularioContato(
    event
) {

    event.preventDefault();


    ocultarAlertaContato();


    // ======================================================
    // VALIDAÇÃO NATIVA
    // ======================================================

    if (
        !formContato.checkValidity()
    ) {

        formContato.classList.add(
            'was-validated'
        );


        formContato.reportValidity();


        return;

    }


    // ======================================================
    // DADOS
    // ======================================================

    const nome =
        inputNome
            ?.value
            .trim() ||
        '';


    const email =
        inputEmail
            ?.value
            .trim() ||
        '';


    const assunto =
        inputAssunto
            ?.value ||
        '';


    const mensagem =
        inputMensagem
            ?.value
            .trim() ||
        '';


    // ======================================================
    // VALIDAÇÃO EXTRA
    // ======================================================

    if (
        !nome ||
        !email ||
        !assunto ||
        !mensagem
    ) {

        mostrarAlertaContato(
            tContato(
                'contatoCamposObrigatorios',
                'Preencha todos os campos obrigatórios.'
            ),
            'warning'
        );


        return;

    }


    // ======================================================
    // ACCESS KEY
    // ======================================================

    if (
        !WEB3FORMS_ACCESS_KEY ||
        WEB3FORMS_ACCESS_KEY ===
        'COLE_SUA_NOVA_ACCESS_KEY_AQUI'
    ) {

        mostrarAlertaContato(
            tContato(
                'contatoWeb3FormsNaoConfigurado',
                'O formulário ainda não foi configurado corretamente.'
            ),
            'warning'
        );


        return;

    }


    // ======================================================
    // LOADING
    // ======================================================

    const htmlOriginalBotao =
        btnEnviarContato
            ?.innerHTML;


    if (btnEnviarContato) {

        btnEnviarContato.disabled =
            true;


        btnEnviarContato.innerHTML = `
            <span
                class="spinner-border
                    spinner-border-sm
                    me-2"
                role="status"
                aria-hidden="true"
            ></span>
            ${tContato(
                'contatoEnviando',
                'Enviando...'
            )}
        `;

    }


    try {

        // ==================================================
        // PAYLOAD
        // ==================================================

        const dados = {

            access_key:
                WEB3FORMS_ACCESS_KEY,


            subject:
                `[MBLF Events] ${assunto}`,


            from_name:
                'MBLF Events - Formulário de Contato',


            name:
                nome,


            email:
                email,


            tipo_contato:
                assunto,


            message:
                mensagem,


            origem:
                'contato.html'

        };


        // ==================================================
        // REQUISIÇÃO
        // ==================================================

        const response =
            await fetch(

                WEB3FORMS_URL,

                {

                    method:
                        'POST',


                    headers: {

                        'Content-Type':
                            'application/json',

                        'Accept':
                            'application/json'

                    },


                    body:
                        JSON.stringify(
                            dados
                        )

                }

            );


        const resultado =
            await response
                .json()
                .catch(
                    () => ({})
                );


        // ==================================================
        // ERRO DO SERVIÇO
        // ==================================================

        if (
            !response.ok ||
            resultado.success !== true
        ) {

            console.error(

                'Resposta do Web3Forms:',

                resultado

            );


            throw new Error(
            resultado.message ||
            tContato(
                'contatoErroEnviar',
                'Não foi possível enviar a mensagem.'
            )
        );
        }


        // ==================================================
        // SUCESSO
        // ==================================================

        mostrarAlertaContato(
            tContato(
                'contatoSucesso',
                'Mensagem enviada com sucesso! Obrigado por entrar em contato com o MBLF Events.'
            ),
            'success'
        );


        formContato.reset();


        formContato.classList.remove(
            'was-validated'
        );


        atualizarContadorMensagem();


        // Mantém nome/e-mail se estiver logado
        preencherUsuarioLogado();


        alertContato
            ?.scrollIntoView({

                behavior:
                    'smooth',

                block:
                    'center'

            });


    } catch (error) {

        console.error(

            'Erro ao enviar mensagem:',

            error

        );


        mostrarAlertaContato(
            error.message ||
            tContato(
                'contatoErroTenteNovamente',
                'Não foi possível enviar sua mensagem. Tente novamente mais tarde.'
            ),
            'danger'
        );


    } finally {

        // ==================================================
        // RESTAURAR BOTÃO
        // ==================================================

        if (btnEnviarContato) {

            btnEnviarContato.disabled =
                false;


            btnEnviarContato.innerHTML =
                htmlOriginalBotao;

        }

    }

}


// ==========================================================
// MOSTRAR ALERTA
// ==========================================================

function mostrarAlertaContato(
    mensagem,
    tipo = 'info'
) {

    if (!alertContato) {

        return;

    }


    alertContato.className =
        `alert alert-${tipo}`;


    alertContato.textContent =
        mensagem;


    alertContato.classList.remove(
        'd-none'
    );

}


// ==========================================================
// OCULTAR ALERTA
// ==========================================================

function ocultarAlertaContato() {

    if (!alertContato) {

        return;

    }


    alertContato.className =
        'alert d-none';


    alertContato.textContent =
        '';

}