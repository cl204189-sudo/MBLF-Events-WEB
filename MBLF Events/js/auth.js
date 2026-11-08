// ==========================================================
// MBLF EVENTS
// auth.js
//
// Responsável por:
// - guardar sessão
// - obter usuário
// - obter token
// - verificar login
// - verificar perfil
// - proteger páginas
// - realizar requisições autenticadas
// - logout
// ==========================================================

(function () {

    // ======================================================
    // CONFIGURAÇÃO
    // ======================================================

    const API_BASE_URL =
        'http://localhost:8080';


    // ======================================================
    // TOKEN
    // ======================================================

    function getToken() {

        return localStorage.getItem(
            'token'
        );

    }


    // ======================================================
    // USUÁRIO
    // ======================================================

    function getUsuario() {

        const usuarioSalvo =
            localStorage.getItem(
                'usuario'
            );


        if (!usuarioSalvo) {

            return null;

        }


        try {

            return JSON.parse(
                usuarioSalvo
            );

        } catch (error) {

            console.error(
                'Erro ao recuperar usuário:',
                error
            );


            limparSessao();

            return null;

        }

    }


    // ======================================================
    // USUÁRIO ESTÁ LOGADO?
    // ======================================================

    function estaLogado() {

        return (
            !!getToken() &&
            !!getUsuario()
        );

    }


    // ======================================================
    // PERFIL
    // ======================================================

    function getPerfil() {

        const usuario =
            getUsuario();


        return usuario
            ? usuario.perfil
            : null;

    }


    function ehAdmin() {

        return getPerfil() ===
            'ADMIN';

    }


    function ehFuncionario() {

        return getPerfil() ===
            'FUNCIONARIO';

    }


    function ehUsuario() {

        return getPerfil() ===
            'USUARIO';

    }


    // ======================================================
    // SALVAR SESSÃO
    // ======================================================

    function salvarSessao(
        dadosLogin
    ) {

        if (
            !dadosLogin ||
            !dadosLogin.token
        ) {

            throw new Error(
                'Resposta de login inválida.'
            );

        }


        const usuario = {

            id:
                dadosLogin.id,

            nome:
                dadosLogin.nome,

            email:
                dadosLogin.email,

            perfil:
                dadosLogin.perfil

        };


        localStorage.setItem(
            'token',
            dadosLogin.token
        );


        localStorage.setItem(
            'usuario',
            JSON.stringify(
                usuario
            )
        );

    }


    // ======================================================
    // LIMPAR SESSÃO
    // ======================================================

    function limparSessao() {

        localStorage.removeItem(
            'token'
        );


        localStorage.removeItem(
            'usuario'
        );

    }


    // ======================================================
    // LOGOUT
    // ======================================================

    function logout() {

        limparSessao();


        window.location.href =
            'login.html';

    }


    // ======================================================
    // PROTEGER PÁGINA
    //
    // Auth.protegerPagina();
    //
    // Auth.protegerPagina([
    //     'ADMIN'
    // ]);
    //
    // Auth.protegerPagina([
    //     'ADMIN',
    //     'FUNCIONARIO'
    // ]);
    // ======================================================

    function protegerPagina(
        perfisPermitidos = []
    ) {

        // Precisa estar autenticado
        if (!estaLogado()) {

            window.location.href =
                'login.html';


            return false;

        }


        // Se nenhum perfil específico foi informado,
        // qualquer usuário autenticado pode acessar.
        if (
            !Array.isArray(
                perfisPermitidos
            ) ||
            perfisPermitidos.length === 0
        ) {

            return true;

        }


        const perfilAtual =
            getPerfil();


        if (
            !perfisPermitidos.includes(
                perfilAtual
            )
        ) {

            console.warn(
                'Usuário sem permissão para acessar esta página.'
            );


            redirecionarPorPerfil();


            return false;

        }


        return true;

    }


    // ======================================================
    // REDIRECIONAMENTO POR PERFIL GLOBAL
    // ======================================================

    function redirecionarPorPerfil() {

        const perfil =
            getPerfil();


        if (!perfil) {

            window.location.href =
                'login.html';


            return;

        }


        switch (perfil) {

            case 'ADMIN':

                window.location.href =
                    'admin.html';

                break;


            case 'FUNCIONARIO':

                // O painel administrativo identifica o funcionário
                // e libera somente as seções das permissões concedidas.
                window.location.href =
                    'admin.html';

                break;


            case 'USUARIO':

            default:

                window.location.href =
                    'painel.html';

                break;

        }

    }


    // ======================================================
    // FETCH AUTENTICADO
    //
    // Exemplo:
    //
    // const response =
    //     await Auth.fetchAutenticado(
    //         '/inscricoes/minhas'
    //     );
    // ======================================================

    async function fetchAutenticado(
        endpoint,
        options = {}
    ) {

        const token =
            getToken();


        if (!token) {

            limparSessao();


            window.location.href =
                'login.html';


            throw new Error(
                'Usuário não autenticado.'
            );

        }


        // Aceita endpoint da API:
        //
        // /inscricoes/minhas
        //
        // ou URL completa.
        const url =
            endpoint.startsWith(
                'http'
            )
                ? endpoint
                : `${API_BASE_URL}${endpoint}`;


        // Preserva headers informados
        const headers =
            new Headers(
                options.headers || {}
            );


        // JWT
        headers.set(
            'Authorization',
            `Bearer ${token}`
        );


        // Adiciona JSON automaticamente
        // quando houver body comum.
        if (
            options.body &&
            !(options.body instanceof FormData) &&
            !headers.has(
                'Content-Type'
            )
        ) {

            headers.set(
                'Content-Type',
                'application/json'
            );

        }


        let response;


        try {

            response =
                await fetch(
                    url,
                    {
                        ...options,
                        headers
                    }
                );

        } catch (error) {

            console.error(
                'Erro de conexão com a API:',
                error
            );


            throw new Error(
                'Não foi possível conectar ao servidor.'
            );

        }


        // ==================================================
        // TOKEN INVÁLIDO / EXPIRADO
        // ==================================================

        if (
            response.status === 401
        ) {

            limparSessao();


            alert(
                'Sua sessão expirou. Faça login novamente.'
            );


            window.location.href =
                'login.html';


            throw new Error(
                'Sessão expirada.'
            );

        }


        // ==================================================
        // SEM PERMISSÃO
        // ==================================================

        if (
            response.status === 403
        ) {

            throw new Error(
                'Você não possui permissão para realizar esta ação.'
            );

        }


        return response;

    }


    // ======================================================
    // DADOS ÚTEIS DO USUÁRIO
    // ======================================================

    function getUsuarioId() {

        const usuario =
            getUsuario();


        return usuario
            ? usuario.id
            : null;

    }


    function getUsuarioNome() {

        const usuario =
            getUsuario();


        return usuario
            ? usuario.nome
            : null;

    }


    function getUsuarioEmail() {

        const usuario =
            getUsuario();


        return usuario
            ? usuario.email
            : null;

    }


    // ======================================================
    // VERIFICAR SE TOKEN EXISTE
    // ======================================================

    function possuiToken() {

        return !!getToken();

    }


    // ======================================================
    // OBJETO GLOBAL AUTH
    // ======================================================

    window.Auth = {

        API_BASE_URL,

        getToken,

        getUsuario,

        getUsuarioId,

        getUsuarioNome,

        getUsuarioEmail,

        getPerfil,

        possuiToken,

        estaLogado,

        ehAdmin,

        ehFuncionario,

        ehUsuario,

        salvarSessao,

        limparSessao,

        logout,

        protegerPagina,

        redirecionarPorPerfil,

        fetchAutenticado

    };

})();