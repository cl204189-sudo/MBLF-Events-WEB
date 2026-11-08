// ==========================================================
// MBLF EVENTS
// paginasPublicas.js
//
// Usado em:
// - sobre.html
// - recursos.html
// - contato.html
// ==========================================================


document.addEventListener(
    'DOMContentLoaded',
    configurarPaginaPublica
);


// ==========================================================
// CONFIGURAR PÁGINA
// ==========================================================

function configurarPaginaPublica() {

    configurarNavbarPublica();

}


// ==========================================================
// NAVBAR
// ==========================================================

function configurarNavbarPublica() {

    const areaVisitante =
        document.getElementById(
            'areaVisitante'
        );


    const areaLogada =
        document.getElementById(
            'areaLogada'
        );


    const nomeUsuario =
        document.getElementById(
            'nomeUsuarioPublico'
        );


    const perfilUsuario =
        document.getElementById(
            'perfilUsuarioPublico'
        );


    // ======================================================
    // AUTH NÃO CARREGADO
    // ======================================================

    if (
        !window.Auth
    ) {

        areaVisitante
            ?.classList.remove(
                'd-none'
            );


        areaLogada
            ?.classList.add(
                'd-none'
            );


        return;

    }


    // ======================================================
    // NÃO LOGADO
    // ======================================================

    if (
        !Auth.estaLogado()
    ) {

        areaVisitante
            ?.classList.remove(
                'd-none'
            );


        areaLogada
            ?.classList.add(
                'd-none'
            );


        return;

    }


    // ======================================================
    // LOGADO
    // ======================================================

    const usuario =
        Auth.getUsuario();


    areaVisitante
        ?.classList.add(
            'd-none'
        );


    areaLogada
        ?.classList.remove(
            'd-none'
        );


    if (nomeUsuario) {

        nomeUsuario.textContent =
            obterPrimeiroNome(
                usuario?.nome
            ) ||
            'Minha Conta';

    }


    if (perfilUsuario) {

        perfilUsuario.textContent =
            formatarPerfilPublico(
                usuario?.perfil
            );

    }

}


// ==========================================================
// PRIMEIRO NOME
// ==========================================================

function obterPrimeiroNome(
    nome
) {

    if (!nome) {

        return '';

    }


    return String(nome)
        .trim()
        .split(/\s+/)[0];

}


// ==========================================================
// PERFIL
// ==========================================================

function formatarPerfilPublico(
    perfil
) {

    switch (
        String(
            perfil || ''
        ).toUpperCase()
    ) {

        case 'ADMIN':

            return 'Administrador';


        case 'FUNCIONARIO':

            return 'Funcionário';


        case 'USUARIO':

        default:

            return 'Usuário';

    }

}


// ==========================================================
// IR PARA PAINEL
// ==========================================================

function irParaPainel() {

    if (
        !window.Auth ||
        !Auth.estaLogado()
    ) {

        window.location.href =
            'login.html';


        return;

    }


    Auth.redirecionarPorPerfil();

}


// ==========================================================
// LOGOUT
// ==========================================================

function sairPaginaPublica() {

    if (
        window.Auth
    ) {

        Auth.logout();

        return;

    }


    localStorage.clear();


    window.location.href =
        'index.html';

}


// ==========================================================
// EXPORTAR
// ==========================================================

window.irParaPainel =
    irParaPainel;


window.sairPaginaPublica =
    sairPaginaPublica;