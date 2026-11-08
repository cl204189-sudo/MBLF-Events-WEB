// ==========================================================
// MBLF EVENTS
// i18n.js
// Internacionalização + Tema
// ==========================================================

const I18N_STORAGE_KEY = 'mblfIdioma';
const THEME_STORAGE_KEY = 'mblfTema';


// ==========================================================
// TRADUÇÕES
// ==========================================================

const traducoes = {

    // ======================================================
    // PORTUGUÊS
    // ======================================================

    pt: {

        // --------------------------------------------------
        // GERAL
        // --------------------------------------------------

        appNome: 'MBLF Events',

        voltar: 'Voltar',
        cancelar: 'Cancelar',
        salvar: 'Salvar',
        editar: 'Editar',
        excluir: 'Excluir',
        fechar: 'Fechar',
        atualizar: 'Atualizar',
        visualizar: 'Visualizar',
        enviar: 'Enviar',
        carregando: 'Carregando...',
        sim: 'Sim',
        nao: 'Não',


        // --------------------------------------------------
        // NAVBAR
        // --------------------------------------------------

        navRecursos: 'Recursos',
        navSobre: 'Sobre',
        navContato: 'Contato',
        navLogar: 'Entrar',
        navCadastrar: 'Cadastrar-se',
        navPainel: 'Painel',
        navMeuPainel: 'Meu Painel',
        navExplorar: 'Explorar Eventos',
        navMinhaConta: 'Minha Conta',
        navSair: 'Sair',
        navCriarEvento: 'Criar Evento',

        perfilUsuario: 'Usuário',
        perfilFuncionario: 'Funcionário',
        perfilAdmin: 'Administrador',


        // --------------------------------------------------
        // INDEX
        // --------------------------------------------------

        heroTitulo:
            'Gerencie seus Eventos com Facilidade e Precisão',

        heroSubtitulo:
            'Uma plataforma integrada para organizar, publicar e acompanhar eventos acadêmicos e corporativos.',

        btnComecar:
            'Começar Agora',

        btnSaibaMais:
            'Saiba Mais',

        btnVerMais:
            'Ver detalhes',

        btnCriarConta:
            'Criar conta',

        btnExplorarEventos:
            'Explorar Eventos',


        // ACESSIBILIDADE

        ariaAbrirMenu:
            'Abrir menu',

        temaAlternar:
            'Alternar tema',

        idiomaSelecionar:
            'Selecionar idioma',


        // HERO

        indexBadge:
            'Sua experiência com eventos começa aqui',

        indexHeroTitulo1:
            'Encontre, participe e organize',

        indexHeroDestaque:
            'eventos',

        indexHeroTitulo2:
            'em um só lugar',

        indexHeroTexto:
            'Descubra eventos, realize inscrições e acompanhe suas participações. Se quiser organizar seu próprio evento, utilize as ferramentas do MBLF Events para trabalhar com sua equipe.',

        indexCriarMinhaConta:
            'Criar minha conta',

        recursosBadge:
            'Recursos',

        recursosTitulo:
            'Recursos da Plataforma',

        recursosSubtitulo:
            'Do planejamento ao certificado, o MBLF Events reúne ferramentas para diferentes etapas de um evento.',

        recursosCtaTitulo:
            'Pronto para explorar?',

        recursosCtaTexto:
            'Veja os eventos disponíveis ou crie sua conta.',

        recursosFooterDescricao:
            'Solução integrada para gestão de eventos.',

        recursosTituloPagina:
            'Recursos - MBLF Events',

        // --------------------------------------------------
        // RECURSOS - CARDS
        // --------------------------------------------------

        recursosGestaoTitulo:
            'Gestão de Eventos',

        recursosGestaoTexto:
            'Crie, edite e acompanhe eventos, definindo informações, datas, localização, vagas e carga horária.',

        recursosPublicacaoTitulo:
            'Publicação',

        recursosPublicacaoTexto:
            'Controle quando um evento fica disponível ao público e gerencie a abertura das inscrições.',

        recursosInscricoesTitulo:
            'Inscrições',

        recursosInscricoesTexto:
            'Participantes podem se inscrever em eventos, consultar suas inscrições e acompanhar o status.',

        recursosQrTitulo:
            'Presença por QR Code',

        recursosQrTexto:
            'Cada inscrição possui uma identificação que permite registrar e acompanhar presenças nos eventos.',

        recursosHubTitulo:
            'Hub do Evento',

        recursosHubTexto:
            'Uma central de gerenciamento para organizadores e colaboradores trabalharem juntos durante o evento.',

        recursosColaboradoresTitulo:
            'Colaboradores e Permissões',

        recursosColaboradoresTexto:
            'Convide pessoas para ajudar na organização e defina individualmente quais ferramentas elas podem acessar.',

        recursosOrganizacaoTitulo:
            'Agenda, Tarefas e Chat',

        recursosOrganizacaoTexto:
            'Organize compromissos, distribua tarefas e mantenha a equipe conectada pelo chat interno do Hub.',

        recursosCertificadosTitulo:
            'Certificados',

        recursosCertificadosTexto:
            'Após o término do evento, certificados podem ser liberados para participantes com presença confirmada.',

        recursosEcossistemaTitulo:
            'Ecossistema Integrado',

        recursosEcossistemaTexto:
            'Web, Mobile e Desktop compartilham informações através de uma API e de um banco de dados centralizado.',

        
        // RECURSOS

        indexRecursosTitulo:
            'Tudo que você precisa para seus eventos',

        indexRecursosSubtitulo:
            'Participe, organize e acompanhe tudo pela plataforma.',

        indexParticiparTitulo:
            'Participe de Eventos',

        indexParticiparTexto:
            'Explore eventos disponíveis, realize sua inscrição e acompanhe suas participações.',

        indexExplorarLink:
            'Explorar eventos',

        indexOrganizarTitulo:
            'Organize seu Evento',

        indexOrganizarTexto:
            'Crie seus próprios eventos e trabalhe com colaboradores, tarefas, calendário, chat, inscritos e outras ferramentas pelo Hub de Organização.',

        indexCertificadosTitulo:
            'Certificados',

        indexCertificadosTexto:
            'Após a confirmação de presença, acompanhe os certificados liberados diretamente pela sua conta.',

        indexAcessarConta:
            'Acessar minha conta',


        // HUB INDEX

        indexOrganizadoresLabel:
            'PARA ORGANIZADORES',

        indexHubTitulo:
            'Planeje seu evento com sua equipe',

        indexHubTexto:
            'O Hub de Organização reúne ferramentas para preparar e administrar cada evento em um único ambiente.',

        indexCalendario:
            'Calendário',

        indexHubCardTitulo:
            'Seu evento. Sua equipe. Um único Hub.',

        indexHubCardTexto:
            'Organize todas as etapas necessárias para preparar seu evento.',


        // COMO FUNCIONA

        indexComoFuncionaTitulo:
            'Como funciona?',

        indexComoFuncionaTexto:
            'Comece a utilizar o MBLF Events em poucos passos.',

        indexPasso1Titulo:
            'Crie sua conta',

        indexPasso1Texto:
            'Cadastre-se para realizar inscrições e acessar todas as funcionalidades disponíveis para usuários.',

        indexPasso2Titulo:
            'Participe ou organize',

        indexPasso2Texto:
            'Encontre eventos para participar ou crie seu próprio evento e torne-se seu organizador.',

        indexPasso3Titulo:
            'Acompanhe tudo',

        indexPasso3Texto:
            'Consulte inscrições, eventos, QR Codes, atividades e certificados pelo seu painel.',


        // CTA

        indexCtaTitulo:
            'Pronto para começar?',

        indexCtaTexto:
            'Crie sua conta para participar de eventos ou começar a planejar seu próprio evento.',

        indexVerEventos:
            'Ver eventos',


        // FOOTER INDEX

        indexFooterDescricao:
            'Plataforma para divulgação, participação e gerenciamento de eventos.',

        indexRedesSociais:
            'Redes Sociais',


        // --------------------------------------------------
        // LOGIN
        // --------------------------------------------------

        loginCamposObrigatorios:
            'Informe seu e-mail e sua senha.',

        loginAutenticando:
            'Autenticando...',

        loginBemVindo:
            'Bem-vindo(a), {nome}! Redirecionando...',

        loginInvalido:
            'E-mail ou senha incorretos.',

        loginErroConexao:
            'Não foi possível conectar ao servidor. Verifique se a API está em execução.',

        loginTituloPagina:
            'Entrar - MBLF Events',

        loginTitulo:
            'Bem-vindo de volta!',

        loginSubtitulo:
            'Entre para acompanhar suas inscrições, eventos, certificados e atividades.',

        loginEmail:
            'E-mail',

        loginEmailPlaceholder:
            'seuemail@exemplo.com',

        loginSenha:
            'Senha',

        loginSenhaPlaceholder:
            'Digite sua senha',

        loginEntrar:
            'Entrar na Plataforma',

        loginSemConta:
            'Ainda não possui uma conta?',

        loginCadastreSe:
            'Cadastre-se',

        loginExplorar:
            'Explorar eventos sem entrar',

        loginTitulo:
            'Bem-vindo de volta!',

        loginSubtitulo:
            'Entre para acompanhar suas inscrições, eventos, certificados e atividades.',

        loginEmail:
            'E-mail',

        loginSenha:
            'Senha',

        loginEntrar:
            'Entrar na Plataforma',

        loginSemConta:
            'Ainda não possui uma conta?',

        loginCadastreSe:
            'Cadastre-se',

        loginExplorar:
            'Explorar eventos sem entrar',

        loginEmailPlaceholder:
            'seuemail@exemplo.com',

        loginSenhaPlaceholder:
            'Digite sua senha',


        // --------------------------------------------------
        // CADASTRO
        // --------------------------------------------------
        cadastroCamposObrigatorios:
            'Preencha todos os campos obrigatórios.',

        cadastroNomeInvalido:
            'Informe seu nome completo, usando apenas letras.',

        cadastroEmailInvalido:
            'Informe um endereço de e-mail válido.',

        cadastroSenhaMinimo:
            'A senha deve possuir pelo menos 6 caracteres.',

        cadastroSenhasDiferentes:
            'As senhas informadas não coincidem.',

        cadastroCriandoConta:
            'Criando conta...',

        cadastroSucesso:
            'Cadastro realizado com sucesso! Redirecionando para o login...',

        cadastroErro:
            'Não foi possível realizar o cadastro.',

        cadastroErroConexao:
            'Não foi possível conectar ao servidor. Verifique se a API está em execução.',

        cadastroTituloPagina:
            'Criar Conta - MBLF Events',

        cadastroTitulo:
            'Crie sua conta',

        cadastroSubtitulo:
            'Cadastre-se para participar e organizar eventos no MBLF Events.',

        cadastroNome:
            'Nome completo',

        cadastroEmail:
            'E-mail',

        cadastroSenha:
            'Senha',

        cadastroSenhaAjuda:
            'Utilize pelo menos 6 caracteres.',

        cadastroConfirmarSenha:
            'Confirmar senha',

        cadastroBotao:
            'Criar Conta',

        cadastroJaPossuiConta:
            'Já possui uma conta?',

        cadastroEntrar:
            'Entrar',

        cadastroExplorar:
            'Explorar eventos sem criar conta',

        cadastroNomePlaceholder:
            'Digite seu nome completo',

        cadastroEmailPlaceholder:
            'seuemail@exemplo.com',

        cadastroSenhaPlaceholder:
            'Crie uma senha',

        cadastroConfirmarSenhaPlaceholder:
            'Digite novamente sua senha',


        // --------------------------------------------------
        // PAINEL
        // --------------------------------------------------

        painelTituloPagina:
            'Painel - MBLF Events',

        painelBoasVindas:
            'Bem-vindo!',

        painelConta:
            'Conta',

        painelAtualizarNotificacoes:
            'Atualizar notificações',

        painelEventosCriados:
            'Eventos Criados',

        painelNaoLidas:
            'Não Lidas',

        painelInscricoesDesc:
            'Eventos nos quais você se inscreveu como participante.',

        painelEventosOrganizo:
            'Eventos que Organizo',

        painelEventosOrganizoDesc:
            'Eventos criados por você e seus respectivos estados de Hub e publicação.',

        painelNovoEvento:
            'Novo Evento',

        painelEventosColaboro:
            'Eventos em que colaboro',

        painelColaboracoesDesc:
            'Eventos em que você faz parte da equipe de organização.',

        painelColaboracoesQuantidade:
            'colaboração(ões)',

        painelCarregandoColaboracoes:
            'Carregando suas colaborações...',

        painelCertificadosDesc:
            'Certificados liberados após sua presença ter sido confirmada.',

        painelTabelaEvento:
            'Evento',

        painelTabelaCargaHoraria:
            'Carga Horária',

        painelTabelaLiberacao:
            'Liberação',

        painelTabelaCodigo:
            'Código',

        painelTabelaAcao:
            'Ação',

        painelQrTitulo:
            'QR Code da Inscrição',

        painelQrDesc:
            'Apresente este QR Code no evento para que sua presença possa ser confirmada.',

        painelToken:
            'Token:',

        painelCertificadoTitulo:
            'Certificado',

        painelLiberadoEm:
            'Liberado em',

        painelCodigoAutenticidade:
            'Código de autenticidade',

        painelTitulo:
            'Meu Painel',

        painelSubtitulo:
            'Acompanhe suas inscrições, eventos, colaborações e certificados.',

        painelInscricoes:
            'Minhas Inscrições',

        painelEventos:
            'Meus Eventos',

        painelColaboracoes:
            'Colaborações',

        painelCertificados:
            'Meus Certificados',

        painelResumoInscricoes:
            'Inscrições',

        painelResumoEventos:
            'Eventos',

        painelResumoCertificados:
            'Certificados',

        painelNotificacoes:
            'Notificações',

        painelNenhumaNotificacao:
            'Nenhuma notificação disponível.',

        painelErroAtualizarNotificacao:
            'Não foi possível atualizar a notificação.',

        painelErroAceitarConvite:
            'Não foi possível aceitar o convite.',

        painelErroRecusarConvite:
            'Não foi possível recusar o convite.',

        marcarComoLida:
            'Marcar como lida',

        conviteAceitar:
            'Aceitar',

        conviteRecusar:
            'Recusar',

        btnCriarNovoEvento:
            'Criar Novo Evento',

        btnVerQRCode:
            'Ver QR Code',

        btnVerDetalhes:
            'Ver Detalhes',

        btnAcessarHub:
            'Acessar Hub',

        btnAtivarHub:
            'Ativar Hub',

        btnPublicarEvento:
            'Publicar Evento',

        btnGerenciarPublicacao:
            'Gerenciar Publicação',

        btnEditarEvento:
            'Ver / Editar Evento',

        nenhumCertificado:
            'Nenhum certificado disponível',

        painelNaoInformada:
            'Não informada',

        painelDataNaoInformada:
            'Data não informada',

        painelSemDescricao:
            'Sem descrição.',

        painelEventoGenerico:
            'Evento',

        painelStatusPublicado:
            'Publicado',

        painelStatusEncerrado:
            'Encerrado',

        painelStatusCancelado:
            'Cancelado',

        painelStatusRemovido:
            'Removido',

        painelStatusRascunho:
            'Rascunho',

        painelStatusPresencaConfirmada:
            'Presença confirmada',

        painelStatusInscricaoCancelada:
            'Cancelada',

        painelStatusInscrito:
            'Inscrito',

        painelCarregandoInscricoes:
            'Carregando suas inscrições...',

        painelNenhumaInscricao:
            'Nenhuma inscrição',

        painelNenhumaInscricaoDesc:
            'Você ainda não está inscrito em nenhum evento.',

        painelInscricaoCancelada:
            'Inscrição cancelada',

        painelDetalhes:
            'Detalhes',

        painelCarregandoEventos:
            'Carregando seus eventos...',

        painelNenhumEvento:
            'Nenhum evento criado',

        painelNenhumEventoDesc:
            'Você ainda não criou nenhum evento.',

        painelHubAtivo:
            'Hub Ativo',

        painelHubInativo:
            'Hub Inativo',

        painelPublicacaoAtiva:
            'Publicação Ativa',

        painelPublicacaoInativa:
            'Publicação Inativa',

        painelInscricoesAbertas:
            'Inscrições Abertas',

        painelInscricoesFechadas:
            'Inscrições Fechadas',

        painelAbrirInscricoes:
            'Abrir Inscrições',

        painelVagasNaoInformadas:
            'Vagas não informadas',

        painelVagasDisponiveis:
            '{disponiveis} de {total} vagas disponíveis',

        painelPublicacaoNaoContratada:
            'Publicação não contratada',

        painelPublicacaoAte:
            'Publicação até {data}',

        painelPublicacaoExpirada:
            'Publicação expirada em {data}',

        painelNenhumaColaboracao:
            'Nenhuma colaboração ativa',

        painelNenhumaColaboracaoDesc:
            'Quando você aceitar um convite para colaborar em um evento, ele aparecerá aqui.',

        painelColaborador:
            'Colaborador',

        painelColaboradorAtivo:
            'Colaborador Ativo',

        painelCalendario:
            'Calendário',

        painelPermissoes:
            'Seus acessos',

        painelNenhumaPermissao:
            'Nenhuma permissão adicional.',

        painelParticipaEquipe:
            'Você faz parte da equipe de organização deste evento.',

        painelVerEvento:
            'Ver Evento',

        painelCarregandoCertificados:
            'Carregando certificados...',

        painelNenhumCertificadoLiberado:
            'Nenhum certificado liberado',

        painelNenhumCertificadoDesc:
            'Seus certificados aparecerão aqui quando sua presença for confirmada e o certificado for liberado.',

        painelVisualizar:
            'Visualizar',

        painelCarregandoNotificacoes:
            'Carregando notificações...',

        painelNenhumaNotificacaoTitulo:
            'Nenhuma notificação',

        painelNenhumaNotificacaoDesc:
            'Quando houver novidades, elas aparecerão aqui.',

        painelNotificacaoGenerica:
            'Notificação',

        painelNotificacaoNova:
            'Nova',

        notifTituloConviteColaborador:
            'Novo convite para colaborar',

        notifTituloConviteAceito:
            'Convite aceito',

        notifTituloConviteRecusado:
            'Convite recusado',

        notifMsgConviteColaborador:
            '{nome} convidou você para colaborar no evento {evento}',

        notifMsgConviteAceito:
            '{nome} aceitou o convite para colaborar no evento {evento}',

        notifMsgConviteRecusado:
            '{nome} recusou o convite para colaborar no evento {evento}',

        painelConfirmarAceitarConvite:
            'Deseja aceitar o convite para colaborar neste evento?',

        painelConfirmarRecusarConvite:
            'Deseja recusar este convite de colaboração?',

        painelConviteAceito:
            'Convite aceito com sucesso!',

        painelConviteRecusado:
            'Convite recusado.',

        painelErroInscricoes:
            'Não foi possível carregar suas inscrições.',

        painelErroEventos:
            'Não foi possível carregar seus eventos.',

        painelErroColaboracoes:
            'Não foi possível carregar suas colaborações.',

        painelErroCertificados:
            'Não foi possível carregar os certificados.',

        painelErroNotificacoes:
            'Não foi possível carregar as notificações.',


        // NOVAS CHAVES PAINEL.JS

        painelOla:
            'Olá!',

        painelOlaNome:
            'Olá, {nome}!',

        painelNumeroInscricao:
            'Inscrição #{id}',

        painelInscricaoNaoEncontrada:
            'Inscrição não encontrada.',

        painelNaoCancelarPresencaConfirmada:
            'Não é possível cancelar uma inscrição cuja presença já foi confirmada.',

        painelInscricaoJaCancelada:
            'Esta inscrição já está cancelada.',

        painelConfirmarCancelarInscricao:
            'Deseja realmente cancelar sua inscrição em "{evento}"? Não poderá se inscrever novamente!',

        painelEsteEvento:
            'este evento',

        painelErroCancelarInscricao:
            'Não foi possível cancelar a inscrição.',

        painelInscricaoCanceladaSucesso:
            'Inscrição cancelada com sucesso.',

        painelQrIndisponivel:
            'QR Code não disponível para esta inscrição.',

        painelQrInscricaoCancelada:
            'O QR Code não está disponível para uma inscrição cancelada.',

        painelErroGerarQr:
            'Não foi possível gerar o QR Code.',

        painelUsuarioNaoIdentificado:
            'Não foi possível identificar o usuário autenticado.',

        painelCertificadoNaoEncontrado:
            'Certificado não encontrado.',

        painelParticipante:
            'Participante',

        painelHoras:
            '{horas}h',

        painelHorasExtenso:
            '{horas} horas',


        // ======================================================
        // MINHA CONTA
        // ======================================================

        contaTituloPagina: 'Minha Conta - MBLF Events',
        contaVoltarPainel: 'Voltar ao Painel',
        contaTitulo: 'Minha Conta',
        contaSubtitulo: 'Gerencie seus dados pessoais e sua senha.',

        contaDadosPessoais: 'Dados pessoais',
        contaDadosPessoaisDesc: 'Atualize as informações da sua conta.',
        contaSalvarAlteracoes: 'Salvar alterações',

        contaSeguranca: 'Segurança',
        contaSegurancaDesc: 'Altere sua senha de acesso.',
        contaSenhaAtual: 'Senha atual',
        contaNovaSenha: 'Nova senha',
        contaConfirmarNovaSenha: 'Confirmar nova senha',
        contaAlterarSenha: 'Alterar senha',

        contaErroCarregar: 'Não foi possível carregar os dados da sua conta.',
        contaCamposObrigatorios: 'Preencha o nome e o e-mail.',
        contaNomeInvalido: 'Informe seu nome completo.',
        contaEmailInvalido: 'Informe um e-mail válido.',
        contaSalvando: 'Salvando...',
        contaErroSalvar: 'Não foi possível salvar as alterações.',
        contaDadosAtualizados: 'Dados atualizados com sucesso!',

        contaPreenchaSenhas: 'Preencha todos os campos de senha.',
        contaSenhaMinimo: 'A nova senha deve possuir pelo menos 6 caracteres.',
        contaSenhasDiferentes: 'A confirmação da nova senha não corresponde.',
        contaSenhaIgualAtual: 'A nova senha deve ser diferente da senha atual.',
        contaAlterandoSenha: 'Alterando...',
        contaErroAlterarSenha: 'Não foi possível alterar a senha.',
        contaSenhaAlterada: 'Senha alterada com sucesso!',

        // --------------------------------------------------
            // EXPLORAR
            // --------------------------------------------------

            explorarTituloPagina:
                'Explorar Eventos - MBLF Events',

            explorarMeuPainel:
                'Meu Painel',

            explorarBadge:
                'Descubra novos eventos',

            explorarTitulo:
                'Encontre o evento ideal para você',

            explorarSubtitulo:
                'Explore eventos publicados na plataforma, veja datas, localização e vagas disponíveis.',

            explorarBuscaPlaceholder:
                'Buscar por título, descrição, tipo ou cidade...',

            explorarEventosDisponiveis:
                'Eventos Disponíveis',

            explorarBuscandoEventos:
                'Buscando eventos...',

            explorarLimparBusca:
                'Limpar busca',

            explorarBuscandoPublicos:
                'Buscando eventos públicos...',

            explorarCtaTitulo:
                'Encontrou um evento interessante?',

            explorarCtaTexto:
                'Crie sua conta para realizar inscrições, acompanhar seus eventos e acessar seus certificados.',

            explorarCriarConta:
                'Criar Conta',

            explorarJaTenhoConta:
                'Já tenho uma conta',

            explorarErroCarregar:
                'Não foi possível carregar os eventos.',

            explorarVerifiqueApi:
                'Verifique se a API está em execução.',

            explorarNenhumEncontrado:
                'Nenhum evento encontrado',

            explorarNenhumDisponivel:
                'Nenhum evento disponível',

            explorarTenteOutroTermo:
                'Tente pesquisar outro termo.',

            explorarSemEventosPublicos:
                'Ainda não existem eventos públicos disponíveis.',

            explorarEventoGenerico:
                'Evento',

            explorarEsgotado:
                'Esgotado',

            explorarInscricoesAbertas:
                'Inscrições abertas',

            explorarInscricoesFechadas:
                'Inscrições fechadas',

            explorarAs:
                'às',

            explorarQuantidadeZero:
                'Nenhum evento disponível.',

            explorarQuantidadeUm:
                '1 evento disponível.',

            explorarQuantidadeVarios:
                '{quantidade} eventos disponíveis.',

            explorarBuscaZero:
                'Nenhum resultado para sua busca.',

            explorarBuscaUm:
                '1 evento encontrado.',

            explorarBuscaVarios:
                '{quantidade} eventos encontrados.',

            explorarLocalNaoInformado:
                'Local não informado',

            explorarVagasNaoInformadas:
                'Quantidade de vagas não informada',

            explorarVagasDisponiveis:
                '{disponiveis} de {total} vagas disponíveis',

            explorarDataNaoInformada:
                'Data não informada',

            explorarSemDescricao:
                'Sem descrição disponível.',

            footerDescricao:
                'Plataforma para divulgação, participação e gerenciamento de eventos.',

            footerLinksUteis:
                'Links Úteis',

            footerCadastro:
                'Cadastro',

            footerSuporte:
                'Suporte',

            footerPrivacidade:
                'Política de Privacidade',

            footerTermos:
                'Termos de Uso',

            footerRedesSociais:
                'Redes Sociais',

            footerDireitos:
                '© 2026 MBLF Events. Todos os direitos reservados.',

        // --------------------------------------------------
        // EVENTO
        // --------------------------------------------------


                // --------------------------------------------------
        // EVENTO
        // --------------------------------------------------

        evTituloCriar:
            'Criar Evento',

        evTituloEditar:
            'Editar Evento',

        evSubtituloCriar:
            'Informe os dados do evento. Ele será criado inicialmente como rascunho.',

        evSubtituloEditar:
            'Editando: {titulo}',

        evInformacoesBasicas:
            'Informações Básicas',

        evNomeEvento:
            'Nome do Evento',

        evNomePlaceholder:
            'Ex: Semana de Tecnologia 2026',

        evTipoEvento:
            'Tipo do Evento',

        evTipoPlaceholder:
            'Ex: Palestra, Workshop, Feira, Congresso...',

        evTipoAjuda:
            'Informe uma classificação que ajude a identificar o evento.',

        evDescricao:
            'Descrição',

        evDescricaoPlaceholder:
            'Descreva o evento, seus objetivos e principais atividades...',

        evDataHora:
            'Data e Horário',

        evDataInicio:
            'Início',

        evDataFim:
            'Término',

        evLocalizacao:
            'Localização',

        evCidade:
            'Cidade',

        evCidadePlaceholder:
            'Ex: Limeira',

        evEndereco:
            'Endereço',

        evEnderecoPlaceholder:
            'Ex: Rua das Flores, 123 - Centro',

        evLocalizacaoAjuda:
            'Endereço e cidade são armazenados separadamente.',

        evParticipacao:
            'Participação',

        evVagas:
            'Vagas',

        evVagasTotal:
            'Total de Vagas',

        evVagasAjuda:
            'A quantidade de vagas disponíveis será iniciada automaticamente com este valor.',

        evCargaHoraria:
            'Carga Horária',

        evHoras:
            'horas',

        evCargaHorariaAjuda:
            'Essa informação poderá ser utilizada nos certificados do evento.',

        evComoFunciona:
            'Como funciona?',

        evPassoCriarTitulo:
            'Crie o evento',

        evPassoCriarDescricao:
            'O evento começa como rascunho e ainda não aparece para o público.',

        evPassoHubTitulo:
            'Ative o Hub',

        evPassoHubDescricao:
            'Com um plano de Hub ativo, você poderá trabalhar com colaboradores, tarefas, calendário, chat e outras ferramentas de organização.',

        evPassoPublicarTitulo:
            'Publique',

        evPassoPublicarDescricao:
            'A publicação é contratada separadamente. Depois disso, as inscrições poderão ser abertas.',

        evStatus:
            'Status',

        evEvento:
            'Evento',

        evHub:
            'Hub',

        evPublicacao:
            'Publicação',

        evCriar:
            'Criar Evento',

        evSalvar:
            'Salvar Alterações',

        evCancelar:
            'Cancelar',

        evCriarNaoPublica:
            'Criar o evento não o publica automaticamente.',

        evStatusNovo:
            'Novo',

        evStatusRascunho:
            'Rascunho',

        evStatusPublicado:
            'Publicado',

        evStatusEncerrado:
            'Encerrado',

        evStatusCancelado:
            'Cancelado',

        evStatusRemovido:
            'Removido',

        evStatusAtivo:
            'Ativo',

        evStatusInativo:
            'Inativo',

        evStatusAtiva:
            'Ativa',

        evStatusInativa:
            'Inativa',

        evDataFimPosterior:
            'A data de término deve ser posterior à data de início.',

        evErroCarregar:
            'Não foi possível carregar o evento.',

        evSemPermissaoEditar:
            'Você não possui permissão para editar este evento.',

        evSalvando:
            'Salvando...',

        evErroAtualizar:
            'Não foi possível atualizar o evento.',

        evErroCriar:
            'Não foi possível criar o evento.',

        evSucessoAtualizar:
            'Evento atualizado com sucesso!',

        evSucessoCriar:
            'Evento criado com sucesso! Ele foi salvo como rascunho.',

        evErroSalvar:
            'Não foi possível salvar o evento.',

        evValidacaoNome:
            'Informe o nome do evento.',

        evValidacaoDatas:
            'Informe a data de início e a data de término.',

        evValidacaoDatasValidas:
            'Informe datas válidas.',

        evValidacaoDataPassado:
            'A data de início do evento não pode estar no passado.',

        evValidacaoVagas:
            'A quantidade de vagas não pode ser negativa.',

        evValidacaoCargaHoraria:
            'A carga horária não pode ser negativa.',

// --------------------------------------------------
// HUB DO EVENTO
// --------------------------------------------------

hubTituloPagina: 'Hub do Evento - MBLF Events',
hubVoltarPainel: 'Voltar ao Painel',

hubTitulo: 'Hub do Evento',
hubSubtitulo: 'Central de gerenciamento e colaboração do evento.',
hubAtivo: 'Hub Ativo',
hubOrganizador: 'Organizador',
hubVerEvento: 'Ver Evento',

hubVisaoGeral: 'Visão Geral',
hubColaboradores: 'Colaboradores',
hubInscritos: 'Inscritos',
hubPresencas: 'Presenças',
hubAgenda: 'Agenda',
hubTarefas: 'Tarefas',
hubChat: 'Chat',
hubCertificados: 'Certificados',

hubInformacoes: 'Informações do Hub',
hubValidoAte: 'Hub válido até',
hubSuaFuncao: 'Sua função',

hubCarregando: 'Carregando Hub...',
hubErroAcessoTitulo: 'Não foi possível acessar o Hub',
hubErroAcessoTexto: 'Verifique suas permissões e tente novamente.',

// COLABORADORES

hubColaboradoresDescricao:
    'Gerencie as pessoas que ajudam na organização deste evento.',

hubCarregandoColaboradores:
    'Carregando colaboradores...',

hubConvidarColaborador:
    'Convidar Colaborador',

hubConviteEmail:
    'E-mail do colaborador',

hubConviteEmailPlaceholder:
    'email@exemplo.com',

hubConviteEmailAjuda:
    'O usuário precisa possuir uma conta no MBLF Events.',

hubEnviarConvite:
    'Enviar Convite',

hubFuncao:
    'Função',

hubFuncaoPlaceholder:
    'Ex: Organização, Recepção, Apoio...',

hubPermissoesColaborador:
    'Permissões do Colaborador',

hubPermVerInscritos:
    'Ver inscritos',

hubPermRegistrarPresencas:
    'Registrar presenças',

hubPermAcessarCalendario:
    'Acessar agenda',

hubPermAcessarTarefas:
    'Acessar tarefas',

hubPermAcessarChat:
    'Acessar chat',

hubPermLiberarCertificados:
    'Liberar certificados',

hubPermVerRelatorios:
    'Ver relatórios',

hubPermSilenciarParticipantes:
    'Silenciar participantes',

hubPermExpulsarParticipantes:
    'Expulsar participantes',

hubSalvarPermissoes:
    'Salvar Permissões',

// INSCRITOS

hubInscritosDescricao:
    'Acompanhe os participantes inscritos neste evento.',

hubCarregandoInscritos:
    'Carregando inscritos...',

hubParticipantesInscritos:
    'Participantes Inscritos',

hubParticipante:
    'Participante',

hubDataInscricao:
    'Data da inscrição',

hubStatus:
    'Status',

// PRESENÇAS

hubPresencasConfirmadas:
    'Presenças Confirmadas',

hubPresencasConfirmadasDescricao:
    'Acompanhe as presenças já registradas no evento.',

hubCarregandoPresencas:
    'Carregando presenças...',

hubRegistrarPresenca:
    'Registrar Presença',

hubRegistrarPresencaDescricao:
    'Informe ou leia o token do QR Code da inscrição.',

hubTokenQr:
    'Token do QR Code',

hubTokenPlaceholder:
    'Digite ou leia o token',

hubConfirmarPresenca:
    'Confirmar Presença',

// AGENDA

hubAgendaEquipe:
    'Agenda da Equipe',

hubAgendaEquipeDescricao:
    'Organize compromissos, reuniões, prazos e atividades do evento.',

hubAtualizarAgenda:
    'Atualizar Agenda',

hubCarregandoAgenda:
    'Carregando agenda...',

hubAgendaAdicionar:
    'Adicionar à Agenda',

hubAgendaNovoItem:
    'Novo Item da Agenda',

hubAgendaNovoItemDescricao:
    'Adicione um compromisso à agenda da equipe.',

hubCampoTitulo:
    'Título',

hubAgendaTituloPlaceholder:
    'Ex: Reunião com a equipe',

hubCampoDescricao:
    'Descrição',

hubAgendaDescricaoPlaceholder:
    'Adicione detalhes sobre este compromisso...',

hubCampoTipo:
    'Tipo',

hubAgendaTipoReuniao:
    'Reunião',

hubAgendaTipoAtividade:
    'Atividade',

hubAgendaTipoPrazo:
    'Prazo',

hubAgendaTipoLembrete:
    'Lembrete',

hubAgendaTipoOutro:
    'Outro',

hubCampoInicio:
    'Início',

hubCampoFim:
    'Fim',

hubAgendaFimOpcional:
    'Opcional',

// TAREFAS

hubTarefasEquipe:
    'Tarefas da Equipe',

hubTarefasEquipeDescricao:
    'Crie e acompanhe as atividades necessárias para organizar o evento.',

hubAtualizarTarefas:
    'Atualizar Tarefas',

hubCarregandoTarefas:
    'Carregando tarefas...',

hubCriarTarefa:
    'Criar Tarefa',

hubNovaTarefa:
    'Nova Tarefa',

hubNovaTarefaDescricao:
    'Crie uma nova atividade para a equipe.',

hubTarefaTituloPlaceholder:
    'Ex: Preparar credenciamento',

hubTarefaDescricaoPlaceholder:
    'Descreva o que precisa ser feito...',

hubPrioridade:
    'Prioridade',

hubPrioridadeBaixa:
    'Baixa',

hubPrioridadeMedia:
    'Média',

hubPrioridadeAlta:
    'Alta',

hubPrioridadeUrgente:
    'Urgente',

hubResponsavel:
    'Responsável',

hubSemResponsavel:
    'Sem responsável',

hubResponsavelAjuda:
    'Você pode deixar a tarefa sem responsável.',

// CHAT

hubChatEquipe:
    'Chat da Equipe',

hubChatEquipeDescricao:
    'Converse com os integrantes da organização deste evento.',

hubAtualizarMensagens:
    'Atualizar Mensagens',

hubCarregandoMensagens:
    'Carregando mensagens...',

hubChatPlaceholder:
    'Digite uma mensagem...',

// CERTIFICADOS

hubCertificadosDescricao:
    'Gerencie a liberação dos certificados deste evento.',

hubLiberarCertificados:
    'Liberar Certificados',

hubCarregandoCertificados:
    'Carregando certificados...',

hubVerificandoCertificados:
    'Verificando certificados...',

hubVerificandoCertificadosDescricao:
    'Aguarde enquanto verificamos a disponibilidade dos certificados.',

hubCertificadosIndisponiveis:
    'Certificados ainda não disponíveis',

hubCertificadosDepoisEvento:
    'Os certificados poderão ser liberados após o término do evento.',

hubNenhumCertificado:
    'Nenhum certificado gerado',

    // --------------------------------------------------
// HUB - MENSAGENS DINÂMICAS DO JAVASCRIPT
// --------------------------------------------------

hubEventoNaoInformado:
    'Nenhum evento foi informado.',

hubErroCarregar:
    'Não foi possível carregar o Hub.',

hubErroCarregarEvento:
    'Não foi possível carregar o evento.',

hubEventoGenerico:
    'Evento',

hubNaoInformado:
    'Não informado',

hubDataNaoInformada:
    'Data não informada',

hubOrganizadorNaoInformado:
    'Organizador não informado',

// COLABORADORES

hubErroCarregarColaboradores:
    'Não foi possível carregar os colaboradores.',

hubNenhumColaborador:
    'Nenhum colaborador encontrado.',

hubNenhumColaboradorDescricao:
    'Ainda não há colaboradores ativos neste evento.',

hubColaborador:
    'Colaborador',

hubConvitePendente:
    'Convite pendente',

hubConviteAceito:
    'Convite aceito',

hubConviteRecusado:
    'Convite recusado',

hubInformeEmailUsuario:
    'Informe o e-mail do colaborador.',

hubEnviandoConvite:
    'Enviando convite...',

hubErroEnviarConvite:
    'Não foi possível enviar o convite.',

hubConviteEnviado:
    'Convite enviado com sucesso!',

hubErroSalvarPermissoes:
    'Não foi possível salvar as permissões.',

hubPermissoesSalvas:
    'Permissões salvas com sucesso!',

hubSalvandoPermissoes:
    'Salvando permissões...',

// INSCRITOS

hubErroCarregarInscritos:
    'Não foi possível carregar os inscritos.',

hubNenhumInscrito:
    'Nenhum participante inscrito.',

hubStatusInscrito:
    'Inscrito',

hubStatusPresente:
    'Presente',

hubStatusCancelado:
    'Cancelado',

hubStatusNaoInformado:
    'Status não informado',

// PRESENÇAS

hubErroCarregarPresencas:
    'Não foi possível carregar as presenças.',

hubNenhumaPresenca:
    'Nenhuma presença registrada',

hubNenhumaPresencaDescricao:
    'As presenças confirmadas aparecerão aqui.',

hubPresencaConfirmada:
    'Presença confirmada',

hubSemPermissaoRegistrarPresenca:
    'Você não possui permissão para registrar presenças.',

hubInformeToken:
    'Informe o token do QR Code.',

hubRegistrandoPresenca:
    'Registrando presença...',

hubErroRegistrarPresenca:
    'Não foi possível registrar a presença.',

hubPresencaRegistradaSucesso:
    'Presença registrada com sucesso!',

// AGENDA

hubErroCarregarAgenda:
    'Não foi possível carregar a agenda.',

hubAgendaVazia:
    'Nenhum item na agenda.',

hubAgendaVaziaDescricao:
    'Os compromissos da equipe aparecerão aqui.',

hubInformeTituloAgenda:
    'Informe o título do compromisso.',

hubInformeInicioAgenda:
    'Informe a data e o horário de início.',

hubAgendaAntesEvento:
    'Não é possível adicionar um compromisso antes do início do evento.',

hubAgendaFimAntesInicio:
    'O término do compromisso não pode ser anterior ao início.',

hubSalvandoAgenda:
    'Salvando...',

hubErroCriarAgenda:
    'Não foi possível adicionar o item à agenda.',

hubAgendaCriada:
    'Item adicionado à agenda com sucesso!',

// TAREFAS

hubErroCarregarTarefas:
    'Não foi possível carregar as tarefas.',

hubNenhumaTarefa:
    'Nenhuma tarefa encontrada.',

hubNenhumaTarefaDescricao:
    'As tarefas criadas para a equipe aparecerão aqui.',

hubInformeTituloTarefa:
    'Informe o título da tarefa.',

hubCriandoTarefa:
    'Criando...',

hubErroCriarTarefa:
    'Não foi possível criar a tarefa.',

hubTarefaCriada:
    'Tarefa criada com sucesso!',

hubErroAtualizarTarefa:
    'Não foi possível atualizar a tarefa.',

hubConfirmarExcluirTarefa:
    'Deseja realmente excluir esta tarefa?',

hubErroExcluirTarefa:
    'Não foi possível excluir a tarefa.',

hubPrioridadeNaoInformada:
    'Não informada',

hubStatusTarefaPendente:
    'Pendente',

hubStatusTarefaEmAndamento:
    'Em andamento',

hubStatusTarefaConcluida:
    'Concluída',

hubStatusTarefaCancelada:
    'Cancelada',

// CHAT

hubErroCarregarMensagens:
    'Não foi possível carregar as mensagens.',

hubNenhumaMensagem:
    'Nenhuma mensagem enviada.',

hubNenhumaMensagemDescricao:
    'As mensagens da equipe aparecerão aqui.',

hubDigiteMensagem:
    'Digite uma mensagem.',

hubEnviandoMensagem:
    'Enviando...',

hubErroEnviarMensagem:
    'Não foi possível enviar a mensagem.',

// CERTIFICADOS

hubErroCarregarCertificados:
    'Não foi possível carregar os certificados.',

hubCertificado:
    'Certificado',

hubCertificadoPendente:
    'Pendente',

hubCertificadoLiberado:
    'Liberado',

hubCertificadoGerado:
    'Gerado',

hubEventoAindaNaoTerminou:
    'Os certificados só podem ser liberados após o término do evento.',

hubNenhumPresenteCertificado:
    'Não há participantes com presença confirmada para receber certificado.',

hubConfirmarLiberarCertificados:
    'Deseja liberar os certificados dos participantes com presença confirmada?',

hubLiberandoCertificados:
    'Liberando certificados...',

hubCertificadosLiberadosSucesso:
    'Certificados liberados com sucesso!',

hubErroLiberarCertificados:
    'Não foi possível liberar os certificados.',

    // --------------------------------------------------
// HUB - MENSAGENS DINÂMICAS ADICIONAIS
// --------------------------------------------------

// GERAL / ACESSO

hubEventoNaoEncontrado:
    'Evento não encontrado.',

hubSemAcesso:
    'Você não possui acesso a este Hub.',

hubUsuario:
    'Usuário',

hubVoce:
    'Você',

hubNaoDefinido:
    'Não definido',

hubExcluir:
    'Excluir',

hubPermissoes:
    'Permissões',

hubInscricao:
    'Inscrição',

hubTarefa:
    'Tarefa',

hubCargaHoraria:
    'Carga horária',

hubPrazo:
    'Prazo',

// PERFIS

hubPerfilAdmin:
    'Administrador',

hubPerfilFuncionario:
    'Funcionário',

perfilAluno:
    'Aluno',

perfilProfessor:
    'Professor',

perfilMonitor:
    'Monitor',

perfilPalestrante:
    'Palestrante',

// COLABORADORES / PERMISSÕES

hubColaboradorInvalido:
    'Colaborador inválido.',

hubColaboradorNaoEncontrado:
    'Colaborador não encontrado.',

hubNenhumColaboradorDesc:
    'Ainda não há colaboradores neste evento.',

hubSomenteOrganizadorConvida:
    'Somente o organizador pode convidar colaboradores.',

hubSomenteOrganizadorPermissoes:
    'Somente o organizador pode alterar as permissões dos colaboradores.',

hubPermissoesAtualizadas:
    'Permissões atualizadas com sucesso!',

// STATUS DE COLABORADORES

hubStatusAtivo:
    'Ativo',

hubStatusConvitePendente:
    'Convite pendente',

hubStatusRecusado:
    'Recusado',

hubStatusExpulso:
    'Expulso',

// AGENDA

hubAgendaItemSemTitulo:
    'Compromisso sem título',

hubInformeTipoAgenda:
    'Informe o tipo do compromisso.',

hubAdicionandoAgenda:
    'Adicionando...',

hubErroAdicionarAgenda:
    'Não foi possível adicionar o compromisso à agenda.',

hubAgendaAdicionadaSucesso:
    'Compromisso adicionado à agenda com sucesso!',

hubSemPermissaoAgenda:
    'Você não possui permissão para gerenciar a agenda.',

// TAREFAS

hubStatusPendente:
    'Pendente',

hubStatusEmAndamento:
    'Em andamento',

hubStatusConcluida:
    'Concluída',

hubStatusCancelada:
    'Cancelada',

hubSemResponsavelDefinido:
    'Sem responsável definido',

hubSemPermissaoTarefas:
    'Você não possui permissão para gerenciar tarefas.',

// CHAT

hubErroCarregarChat:
    'Não foi possível carregar as mensagens do chat.',

hubSemPermissaoChat:
    'Você não possui permissão para utilizar o chat.',

// CERTIFICADOS

hubEventoEncerrado:
    'Evento encerrado',

hubAguardandoLiberacao:
    'Aguardando liberação',

hubCertificadoDisponivel:
    'Certificado disponível',

hubCertificadoLiberadoEm:
    'Certificado liberado em {data}',

hubNenhumCertificadoDescricao:
    'Os certificados dos participantes aparecerão aqui quando estiverem disponíveis.',

hubCertificadosSomenteDepoisEvento:
    'Os certificados só podem ser liberados após o término do evento.',

hubCertificadosPodemSerLiberados:
    'Os certificados já podem ser liberados.',

hubSemPermissaoCertificados:
    'Você não possui permissão para liberar certificados.',

hubErroGerarCertificadoParticipante:
    'Não foi possível gerar o certificado do participante.',

hubErroLiberarCertificadoParticipante:
    'Não foi possível liberar o certificado do participante.',

hubCertificadosProcessadosSucesso:
    'Certificados processados com sucesso!',

hubCertificadosProcessadosComFalhas:
    'Os certificados foram processados, mas ocorreram algumas falhas.',

hubCopyright:
    '© 2026 MBLF Events. Todos os direitos reservados.',


        // --------------------------------------------------
        // DETALHES
        // --------------------------------------------------

                // --------------------------------------------------
        // DETALHES DO EVENTO
        // --------------------------------------------------

        detEntrarInscrever:
            'Entrar para se Inscrever',

        detFacaLoginInscricao:
            'Faça login para realizar sua inscrição.',

        detCarregandoEvento:
            'Carregando evento...',

        detErroTitulo:
            'Não foi possível carregar o evento',

        detErroPadrao:
            'O evento solicitado não foi encontrado.',

        detVoltarEventos:
            'Voltar aos Eventos',

        detInformacoesEvento:
            'Informações do Evento',

        detInicio:
            'Início',

        detTermino:
            'Término',

        detGarantirVaga:
            'Garantir Minha Vaga',

        detVagasDisponiveis:
            'Vagas disponíveis',

        detAjudaInscricao:
            'Sua inscrição ficará disponível no painel junto com o QR Code.',

        detCtaTitulo:
            'Participe dos eventos do MBLF Events',

        detCtaTexto:
            'Crie sua conta para realizar inscrições, acompanhar seus eventos e acessar seus QR Codes e certificados.',

        detEvento:
            'Evento',

        detOrganizadorNaoInformado:
            'Organizador não informado',

        detSemDescricao:
            'Sem descrição disponível.',

        detNaoInformada:
            'Não informada',

        detNaoInformado:
            'Não informado',

        detEnderecoNaoInformado:
            'Endereço não informado.',

        detCidadeNaoInformada:
            'Cidade não informada',

        detLocalNaoInformado:
            'Local não informado',

        detHoras:
            '{horas} horas',

        detSemLimite:
            'sem limite informado',

        detVagasNaoInformadas:
            'Quantidade de vagas não informada',

        detQuantidadeVagas:
            '{disponiveis} de {total} vagas',

        detStatusPublicado:
            'Publicado',

        detStatusEncerrado:
            'Encerrado',

        detStatusCancelado:
            'Cancelado',

        detStatusRemovido:
            'Removido',

        detStatusRascunho:
            'Rascunho',

        detEventoNaoDisponivel:
            'Evento não disponível para inscrição',

        detEventoNaoPublicado:
            'Este evento não está publicado.',

        detPublicacaoEncerrada:
            'Publicação encerrada',

        detPublicacaoTerminou:
            'O período de publicação deste evento terminou.',

        detInscricoesFechadas:
            'Inscrições Fechadas',

        detInscricoesFechadasAjuda:
            'As inscrições deste evento estão fechadas.',

        detEventoEsgotado:
            'Evento Esgotado',

        detSemVagas:
            'Não há mais vagas disponíveis.',

        detVoceOrganizador:
            'Você é o Organizador',

        detOrganizadorNaoInscreve:
            'O organizador não precisa se inscrever no próprio evento.',

        detPresencaConfirmada:
            'Presença Confirmada',

        detPresencaRegistrada:
            'Sua presença neste evento já foi registrada.',

        detInscricaoCancelada:
            'Inscrição Cancelada',

        detInscricaoCanceladaExistente:
            'Você já possui uma inscrição cancelada neste evento.',

        detVoceInscrito:
            'Você está inscrito',

        detCancelarInscricao:
            'Cancelar Inscrição',

        detPodeCancelar:
            'Você pode cancelar sua inscrição neste evento.',

        detInscreverAgora:
            'Inscrever-se Agora',

        detProcessandoInscricao:
            'Processando inscrição...',

        detErroInscricao:
            'Não foi possível realizar a inscrição.',

        detInscricaoSucesso:
            'Inscrição realizada com sucesso! Seu QR Code já está disponível no painel.',

        detInscricaoConfirmada:
            'Inscrição Confirmada',

        detConsulteQr:
            'Consulte seu QR Code no painel.',

        detConfirmarCancelamento:
            'Deseja realmente cancelar sua inscrição neste evento?',

        detCancelandoInscricao:
            'Cancelando inscrição...',

        detErroCancelar:
            'Não foi possível cancelar a inscrição.',

        detCancelamentoSucesso:
            'Inscrição cancelada com sucesso.',

        detErroEventosPublicos:
            'Não foi possível carregar os eventos públicos.',

        detEventoNaoEncontrado:
            'Este evento não foi encontrado ou não está disponível para o público.',

        detErroCarregarEvento:
            'Não foi possível carregar o evento.',

        detCompartilhado:
            'Link do evento copiado!',

        detErroCompartilhar:
            'Não foi possível compartilhar o evento.',

        detSobreEvento:
            'Sobre o Evento',

        detProgramacao:
            'Programação do Evento',

        detPalestrantes:
            'Palestrantes & Convidados',

        detLocalizacao:
            'Local do Evento',

        detGarantirVaga:
            'Garantir Minha Vaga',

        detInscricoesAbertas:
            'Inscrições Abertas',

        detOrganizadoPor:
            'Organizado por',

        detCompartilhar:
            'Compartilhar Evento',

        btnInscreverSe:
            'Inscrever-se Agora',

        detDataEHora:
            'Data e Horário',

        detVagasRestantes:
            'vagas restantes',


        // --------------------------------------------------
        // FOOTER
        // --------------------------------------------------

        ftDescricao:
            'Solução integrada para gestão de eventos acadêmicos e corporativos.',

        ftLinks:
            'Links',

        ftLinksUteis:
            'Links Úteis',

        ftPlataforma:
            'Plataforma',

        ftSuporte:
            'Suporte',

        ftContato:
            'Contato',

        ftPrivacidade:
            'Política de Privacidade',

        ftTermos:
            'Termos de Uso',

        ftLogin:
            'Login',

        ftCadastro:
            'Cadastro',

        footerTexto:
            '© 2026 MBLF Events. Todos os direitos reservados.',

        // --------------------------------------------------
        // SOBRE
        // --------------------------------------------------

        sobreTituloPagina:
            'Sobre - MBLF Events',

        sobreBadge:
            'Quem somos',

        sobreTitulo:
            'Sobre o MBLF Events',

        sobreSubtitulo:
            'Uma plataforma criada para facilitar a organização, participação e gestão de eventos acadêmicos e corporativos.',

        sobreMissaoTitulo:
            'Nossa Missão',

        sobreMissaoTexto:
            'Simplificar a criação, organização e participação em eventos através de uma plataforma integrada, acessível e intuitiva.',

        sobreVisaoTitulo:
            'Nossa Visão',

        sobreVisaoTexto:
            'Criar um ecossistema integrado entre Web, Mobile, Desktop e API, centralizando informações e processos de eventos.',

        sobreValoresTitulo:
            'Nossos Valores',

        sobreValoresTexto:
            'Organização, colaboração, segurança, acessibilidade, inovação e uma experiência simples para todos os usuários.',

        sobreProjetoLabel:
            'O PROJETO',

        sobreProjetoTitulo:
            'Um sistema conectado de ponta a ponta',

        sobreProjetoTexto1:
            'O MBLF Events reúne recursos para organizadores, participantes, colaboradores e administradores, mantendo as informações centralizadas por meio de uma API.',

        sobreProjetoTexto2:
            'O sistema permite acompanhar todo o ciclo de um evento: criação, publicação, inscrição, colaboração, presença e liberação de certificados.',

        sobreEquipeTitulo:
            'Conheça Nossa Equipe',

        sobreEquipeTexto:
            'O projeto é dividido em diferentes plataformas, com cada integrante responsável por uma área do ecossistema MBLF Events.',

        sobreEquipeWebTexto:
            'Responsável pela plataforma Web, pelas interfaces, experiência do usuário e integração do front-end com a API.',

        sobreEquipeApiTexto:
            'Responsável pela API REST, regras de negócio, autenticação e integração com o banco de dados central.',

        sobreEquipeMobileTexto:
            'Responsável pelo aplicativo móvel e pelas funcionalidades voltadas à experiência em dispositivos mobile.',

        sobreEquipeDesktopTexto:
            'Responsável pelo software Desktop e pelas ferramentas locais integradas ao ecossistema.',

        sobreCtaTitulo:
            'Conheça a plataforma',

        sobreCtaTexto:
            'Explore eventos ou crie sua conta para utilizar os recursos do sistema.',

        // --------------------------------------------------
        // CONTATO
        // --------------------------------------------------

        contatoTituloPagina:
            'Contato - MBLF Events',

        contatoBadge:
            'Suporte',

        contatoTitulo:
            'Fale Conosco',

        contatoSubtitulo:
            'Encontrou algum problema? Tem uma sugestão, dúvida ou comentário? Envie uma mensagem para a equipe.',

        contatoCanaisTitulo:
            'Canais de contato',

        contatoEmailTitulo:
            'E-mail',

        contatoSugestoesTitulo:
            'Sugestões',

        contatoSugestoesTexto:
            'Ideias, comentários e sugestões para melhorar a plataforma são bem-vindos.',

        contatoPrivacidadeTitulo:
            'Privacidade',

        contatoPrivacidadeTexto:
            'Utilize o formulário apenas para informações necessárias ao atendimento.',

        contatoFormTitulo:
            'Envie uma mensagem',

        contatoFormTexto:
            'Preencha os campos abaixo. A mensagem será encaminhada para a equipe do MBLF Events.',

        contatoNome:
            'Nome *',

        contatoNomePlaceholder:
            'Seu nome',

        contatoEmail:
            'Seu e-mail *',

        contatoEmailPlaceholder:
            'seuemail@email.com',

        contatoAssunto:
            'Assunto *',

        contatoAssuntoSelecione:
            'Selecione',

        contatoAssuntoDuvida:
            'Dúvida',

        contatoAssuntoProblema:
            'Relatar problema',

        contatoAssuntoSugestao:
            'Sugestão',

        contatoAssuntoComentario:
            'Comentário',

        contatoAssuntoOutro:
            'Outro',

        contatoMensagem:
            'Mensagem *',

        contatoMensagemPlaceholder:
            'Conte para nós como podemos ajudar...',

        contatoEnviar:
            'Enviar Mensagem',

        contatoCamposObrigatorios:
            'Preencha todos os campos obrigatórios.',

        contatoWeb3FormsNaoConfigurado:
            'O formulário ainda não foi configurado corretamente.',

        contatoEnviando:
            'Enviando...',

        contatoErroEnviar:
            'Não foi possível enviar a mensagem.',

        contatoSucesso:
            'Mensagem enviada com sucesso! Obrigado por entrar em contato com o MBLF Events.',

        contatoErroTenteNovamente:
            'Não foi possível enviar sua mensagem. Tente novamente mais tarde.',

                // --------------------------------------------------
        // ATIVAR HUB
        // --------------------------------------------------

        ativarHubTitulo:
            'Ativar Hub do Evento',

        ativarHubSubtitulo:
            'Contrate um plano para liberar as ferramentas de gerenciamento e colaboração.',

        ativarHubCarregando:
            'Carregando planos do Hub...',

        ativarHubErroTitulo:
            'Não foi possível carregar o Hub',

        ativarHubErroPadrao:
            'Verifique o evento e tente novamente.',

        ativarHubValidoAte:
            'Hub válido até',

        ativarHubNaoContratado:
            'Não contratado',

        ativarHubEscolherPlano:
            'Escolha um plano para o Hub',

        ativarHubPlanoDescricao:
            'O período contratado libera as ferramentas internas do evento.',

        ativarHubBuscandoPlanos:
            'Buscando planos...',

        ativarHubLiberaTitulo:
            'O que o Hub libera?',

        ativarHubColaboradoresDesc:
            'Convide pessoas para ajudar na organização.',

        ativarHubInscritosDesc:
            'Acompanhe os participantes inscritos no evento.',

        ativarHubPresencasDesc:
            'Faça check-in utilizando o QR Code dos participantes.',

        ativarHubFerramentasEquipe:
            'Ferramentas da equipe',

        ativarHubFerramentasEquipeDesc:
            'Agenda, tarefas e chat poderão ser usados conforme permissões.',

        ativarHubAtivoTitulo:
            'Hub ativo!',

        ativarHubAtivoDescricao:
            'As ferramentas internas deste evento já estão disponíveis.',

        ativarHubNenhumEvento:
            'Nenhum evento foi informado.',

        ativarHubErroCarregar:
            'Não foi possível carregar o Hub.',

        ativarHubErroCarregarEvento:
            'Não foi possível carregar o evento.',

        ativarHubSomenteOrganizador:
            'Somente o organizador pode contratar planos para este evento.',

        ativarHubErroCarregarPlanos:
            'Não foi possível carregar os planos.',

        ativarHubNenhumPlano:
            'Nenhum plano de Hub está disponível no momento.',

        ativarHubPlanoPadrao:
            'Plano Hub',

        ativarHubDia:
            '{duracao} dia de acesso ao Hub',

        ativarHubDias:
            '{duracao} dias de acesso ao Hub',

        ativarHubDuracaoNaoInformada:
            'Duração não informada',

        ativarHubSelecionarPlano:
            'Selecionar Plano',

        ativarHubPlanoNaoEncontrado:
            'Plano não encontrado.',

        ativarHubConfirmarPlano:
            'Deseja contratar o plano "{nome}" por {valor}?',

        ativarHubErroContratar:
            'Não foi possível contratar o plano.',

        ativarHubSucessoContratar:
            'Plano contratado com sucesso! O Hub foi ativado.',

        ativarHubErroAtualizarEvento:
            'O plano foi processado, mas não foi possível atualizar o evento.',

        ativarHubAtivo:
            'Hub Ativo',

        ativarHubInativo:
            'Hub Inativo',

        ativarHubExpiradoEm:
            'Expirado em {data}',

                    // --------------------------------------------------
        // PUBLICAR EVENTO
        // --------------------------------------------------

        pubTituloPagina:
            'Publicar Evento - MBLF Events',

        pubTitulo:
            'Publicar Evento',

        pubSubtitulo:
            'Contrate um plano de publicação e abra as inscrições do seu evento.',

        pubCarregandoEvento:
            'Carregando informações do evento...',

        pubErroTitulo:
            'Não foi possível carregar esta página',

        pubVoltarPainel:
            'Voltar ao Painel',

        pubEvento:
            'Evento',

        pubValidaAte:
            'Publicação válida até',

        pubEscolhaPlano:
            'Escolha um plano de publicação',

        pubEscolhaPlanoDesc:
            'O plano define por quanto tempo o evento ficará disponível publicamente.',

        pubBuscandoPlanos:
            'Buscando planos...',

        pubContratePublicacao:
            'Contrate a publicação',

        pubContratePublicacaoDesc:
            'Escolha um plano disponível para ativar o período de publicação.',

        relTitulo: 'Relatório do evento',
        relExportarPdf: 'Exportar PDF',
        hubVoltar: 'Voltar ao Hub',

        pubAbraInscricoes:
            'Abra as inscrições',

        pubAbraInscricoesDesc:
            'Com uma publicação válida, você poderá abrir as inscrições.',

        pubEventoPublico:
            'Evento público',

        pubEventoPublicoDesc:
            'Depois disso, o evento aparecerá na página Explorar Eventos.',

        pubAbrirInscricoes:
            'Abrir inscrições',

        pubDisponivelPublico:
            'Evento disponível para o público!',

        pubDisponivelPublicoDesc:
            'As inscrições estão abertas e seu evento já pode aparecer na página de eventos públicos.',

        pubCopyright:
            '© 2026 MBLF Events. Todos os direitos reservados.',

        pubEventoNaoInformado:
            'Nenhum evento foi informado.',

        pubErroCarregarEvento:
            'Não foi possível carregar o evento.',

        pubSomenteOrganizador:
            'Somente o organizador pode gerenciar a publicação deste evento.',

        pubEventoGenerico:
            'Evento',

        pubNaoContratada:
            'Não contratada',

        pubErroCarregarPlanos:
            'Não foi possível carregar os planos.',

        pubNenhumPlanoDisponivel:
            'Nenhum plano de publicação está disponível no momento.',

        pubPlanoGenerico:
            'Plano de Publicação',

        pubDuracaoDias:
            '{duracao} dia{s} de publicação',

        pubDuracaoNaoInformada:
            'Duração não informada',

        pubBadgePublicacao:
            'Publicação',

        pubSelecionarPlano:
            'Selecionar Plano',

        pubPlanoNaoEncontrado:
            'Plano não encontrado.',

        pubConfirmarContratarPlano:
            'Deseja contratar o plano "{plano}" por {valor}?',

        pubErroContratarPlano:
            'Não foi possível contratar o plano.',

        pubPlanoContratadoSucesso:
            'Plano contratado com sucesso! A publicação do evento foi ativada.',

        pubPlanoProcessadoErroAtualizar:
            'O plano foi processado, mas não foi possível atualizar os dados do evento.',

        pubPublicacaoNecessaria:
            'É necessário possuir uma publicação ativa antes de abrir as inscrições.',

        pubConfirmarAbrirInscricoes:
            'Deseja abrir as inscrições deste evento? Depois disso, ele poderá aparecer publicamente.',

        pubAbrindoInscricoes:
            'Abrindo inscrições...',

        pubErroAbrirInscricoes:
            'Não foi possível abrir as inscrições.',

        pubInscricoesAbertasSucesso:
            'Inscrições abertas com sucesso! O evento agora está disponível para o público.',

        pubInscricoesAbertas:
            'Inscrições Abertas',

        pubInscricoesJaAbertas:
            'As inscrições já estão abertas e o evento está publicado.',

        pubAbrirInscricoesBotao:
            'Abrir Inscrições',

        pubPublicacaoAtivaAbrir:
            'A publicação está ativa. Agora você pode abrir as inscrições.',

        pubPrimeiroContratePlano:
            'Primeiro contrate um plano de publicação.',

        pubStatusPublicado:
            'Publicado',

        pubStatusCancelado:
            'Cancelado',

        pubStatusEncerrado:
            'Encerrado',

        pubStatusRemovido:
            'Removido',

        pubStatusRascunho:
            'Rascunho',

        pubPublicacaoAtiva:
            'Publicação Ativa',

        pubPublicacaoInativa:
            'Publicação Inativa',

        pubInscricoesFechadas:
            'Inscrições Fechadas',

        pubValorZero:
            'R$ 0,00',

        pubNaoInformada:
            'Não informada',

        pubComoFunciona: 'Como funciona?',
        pubVerEventosPublicos: 'Ver Eventos Públicos',
        pubVerPaginaEvento: 'Ver Página do Evento',



            },


            // ======================================================
            // ENGLISH
            // ======================================================

    en: {

        // --------------------------------------------------
        // GENERAL
        // --------------------------------------------------

        appNome: 'MBLF Events',

        voltar: 'Back',
        cancelar: 'Cancel',
        salvar: 'Save',
        editar: 'Edit',
        excluir: 'Delete',
        fechar: 'Close',
        atualizar: 'Refresh',
        visualizar: 'View',
        enviar: 'Send',
        carregando: 'Loading...',
        sim: 'Yes',
        nao: 'No',


        // --------------------------------------------------
        // NAVBAR
        // --------------------------------------------------

        navRecursos: 'Features',
        navSobre: 'About',
        navContato: 'Contact',
        navLogar: 'Log In',
        navCadastrar: 'Sign Up',
        navPainel: 'Dashboard',
        navMeuPainel: 'My Dashboard',
        navExplorar: 'Explore Events',
        navMinhaConta: 'My Account',
        navSair: 'Log Out',
        navCriarEvento: 'Create Event',

        perfilUsuario: 'User',
        perfilFuncionario: 'Staff',
        perfilAdmin: 'Administrator',


        // --------------------------------------------------
        // INDEX
        // --------------------------------------------------

        heroTitulo:
            'Manage Your Events with Ease and Precision',

        heroSubtitulo:
            'An integrated platform to organize, publish, and monitor academic and corporate events.',

        btnComecar:
            'Get Started',

        btnSaibaMais:
            'Learn More',

        btnVerMais:
            'View details',

        btnCriarConta:
            'Create account',

        btnExplorarEventos:
            'Explore Events',

        ariaAbrirMenu:
            'Open menu',

        temaAlternar:
            'Switch theme',

        idiomaSelecionar:
            'Select language',

        indexBadge:
            'Your event experience starts here',

        indexHeroTitulo1:
            'Discover, join and organize',

        indexHeroDestaque:
            'events',

        indexHeroTitulo2:
            'all in one place',

        indexHeroTexto:
            'Discover events, register, and track your participation. If you want to organize your own event, use MBLF Events tools to work together with your team.',

        indexCriarMinhaConta:
            'Create my account',

        indexRecursosTitulo:
            'Everything you need for your events',

        indexRecursosSubtitulo:
            'Join, organize, and track everything through the platform.',

        indexParticiparTitulo:
            'Join Events',

        indexParticiparTexto:
            'Explore available events, register, and keep track of your participation.',

        indexExplorarLink:
            'Explore events',

        indexOrganizarTitulo:
            'Organize Your Event',

        indexOrganizarTexto:
            'Create your own events and work with collaborators, tasks, calendar, chat, attendees, and other tools through the Organization Hub.',

        indexCertificadosTitulo:
            'Certificates',

        indexCertificadosTexto:
            'After your attendance is confirmed, access released certificates directly from your account.',

        indexAcessarConta:
            'Access my account',

        indexOrganizadoresLabel:
            'FOR ORGANIZERS',

        indexHubTitulo:
            'Plan your event with your team',

        indexHubTexto:
            'The Organization Hub brings together tools to prepare and manage each event in a single environment.',

        indexCalendario:
            'Calendar',

        indexHubCardTitulo:
            'Your event. Your team. One Hub.',

        indexHubCardTexto:
            'Organize every step needed to prepare your event.',

        indexComoFuncionaTitulo:
            'How does it work?',

        indexComoFuncionaTexto:
            'Start using MBLF Events in just a few steps.',

        indexPasso1Titulo:
            'Create your account',

        indexPasso1Texto:
            'Sign up to register for events and access all features available to users.',

        indexPasso2Titulo:
            'Join or organize',

        indexPasso2Texto:
            'Find events to attend or create your own event and become its organizer.',

        indexPasso3Titulo:
            'Track everything',

        indexPasso3Texto:
            'View registrations, events, QR Codes, activities, and certificates from your dashboard.',

        indexCtaTitulo:
            'Ready to get started?',

        indexCtaTexto:
            'Create your account to join events or start planning your own event.',

        indexVerEventos:
            'View events',

        indexFooterDescricao:
            'A platform for event promotion, participation, and management.',

        indexRedesSociais:
            'Social Media',


        // --------------------------------------------------
        // LOGIN
        // --------------------------------------------------

        loginCamposObrigatorios:
            'Enter your email and password.',

        loginAutenticando:
            'Signing in...',

        loginBemVindo:
            'Welcome, {nome}! Redirecting...',

        loginInvalido:
            'Incorrect email or password.',

        loginErroConexao:
            'Unable to connect to the server. Check whether the API is running.',

        loginTituloPagina:
            'Sign In - MBLF Events',

        loginTitulo:
            'Welcome back!',

        loginSubtitulo:
            'Sign in to follow your registrations, events, certificates, and activities.',

        loginEmail:
            'Email',

        loginEmailPlaceholder:
            'youremail@example.com',

        loginSenha:
            'Password',

        loginSenhaPlaceholder:
            'Enter your password',

        loginEntrar:
            'Sign In',

        loginSemConta:
            "Don't have an account yet?",

        loginCadastreSe:
            'Create an account',

        loginExplorar:
            'Explore events without signing in',

        loginTitulo:
            'Welcome back!',

        loginSubtitulo:
            'Log in to track your registrations, events, certificates, and activities.',

        loginEmail:
            'Email',

        loginSenha:
            'Password',

        loginEntrar:
            'Log In to the Platform',

        loginSemConta:
            "Don't have an account yet?",

        loginCadastreSe:
            'Sign Up',

        loginExplorar:
            'Explore events without logging in',

        loginEmailPlaceholder:
            'youremail@example.com',

        loginSenhaPlaceholder:
            'Enter your password',


        // --------------------------------------------------
        // SIGN UP
        // --------------------------------------------------

        cadastroCamposObrigatorios:
            'Please fill in all required fields.',

        cadastroNomeInvalido:
            'Enter your full name using letters only.',

        cadastroEmailInvalido:
            'Enter a valid email address.',

        cadastroSenhaMinimo:
            'The password must contain at least 6 characters.',

        cadastroSenhasDiferentes:
            'The passwords do not match.',

        cadastroCriandoConta:
            'Creating account...',

        cadastroSucesso:
            'Account created successfully! Redirecting to sign in...',

        cadastroErro:
            'Unable to create your account.',

        cadastroErroConexao:
            'Unable to connect to the server. Check whether the API is running.',

        cadastroTitulo:
            'Create your account',

        cadastroTituloPagina:
            'Create Account - MBLF Events',

        cadastroSubtitulo:
            'Sign up to participate in and organize events on MBLF Events.',

        cadastroNome:
            'Full name',

        cadastroEmail:
            'Email',

        cadastroSenha:
            'Password',

        cadastroSenhaAjuda:
            'Use at least 6 characters.',

        cadastroConfirmarSenha:
            'Confirm password',

        cadastroBotao:
            'Create Account',

        cadastroJaPossuiConta:
            'Already have an account?',

        cadastroEntrar:
            'Log In',

        cadastroExplorar:
            'Explore events without creating an account',

        cadastroNomePlaceholder:
            'Enter your full name',

        cadastroEmailPlaceholder:
            'youremail@example.com',

        cadastroSenhaPlaceholder:
            'Create a password',

        cadastroConfirmarSenhaPlaceholder:
            'Enter your password again',


        // --------------------------------------------------
        // DASHBOARD
        // --------------------------------------------------

        painelTituloPagina:
            'Dashboard - MBLF Events',

        painelBoasVindas:
            'Welcome!',

        painelConta:
            'Account',

        painelAtualizarNotificacoes:
            'Refresh notifications',

        painelEventosCriados:
            'Created Events',

        painelNaoLidas:
            'Unread',

        painelInscricoesDesc:
            'Events you have registered for as a participant.',

        painelEventosOrganizo:
            'Events I Organize',

        painelEventosOrganizoDesc:
            'Events created by you and their Hub and publication status.',

        painelNovoEvento:
            'New Event',

        painelEventosColaboro:
            'Events I Collaborate On',

        painelColaboracoesDesc:
            'Events where you are part of the organization team.',

        painelColaboracoesQuantidade:
            'collaboration(s)',

        painelCarregandoColaboracoes:
            'Loading your collaborations...',

        painelCertificadosDesc:
            'Certificates released after your attendance has been confirmed.',

        painelTabelaEvento:
            'Event',

        painelTabelaCargaHoraria:
            'Duration',

        painelTabelaLiberacao:
            'Release',

        painelTabelaCodigo:
            'Code',

        painelTabelaAcao:
            'Action',

        painelQrTitulo:
            'Registration QR Code',

        painelQrDesc:
            'Present this QR Code at the event so your attendance can be confirmed.',

        painelToken:
            'Token:',

        painelCertificadoTitulo:
            'Certificate',

        painelLiberadoEm:
            'Released on',

        painelCodigoAutenticidade:
            'Authenticity code',

        painelTitulo:
            'My Dashboard',

        painelSubtitulo:
            'Track your registrations, events, collaborations, and certificates.',

        painelInscricoes:
            'My Registrations',

        painelEventos:
            'My Events',

        painelColaboracoes:
            'Collaborations',

        painelCertificados:
            'My Certificates',

        painelResumoInscricoes:
            'Registrations',

        painelResumoEventos:
            'Events',

        painelResumoCertificados:
            'Certificates',

        painelNotificacoes:
            'Notifications',

        painelNenhumaNotificacao:
            'No notifications available.',

        painelErroAtualizarNotificacao:
            'Could not update the notification.',

        painelErroAceitarConvite:
            'Could not accept the invitation.',

        painelErroRecusarConvite:
            'Could not decline the invitation.',

        marcarComoLida:
            'Mark as read',

        conviteAceitar:
            'Accept',

        conviteRecusar:
            'Decline',

        btnCriarNovoEvento:
            'Create New Event',

        btnVerQRCode:
            'View QR Code',

        btnVerDetalhes:
            'View Details',

        btnAcessarHub:
            'Access Hub',

        btnAtivarHub:
            'Activate Hub',

        btnPublicarEvento:
            'Publish Event',

        btnGerenciarPublicacao:
            'Manage Publication',

        btnEditarEvento:
            'View / Edit Event',

        nenhumCertificado:
            'No certificates available',

        painelNaoInformada:
            'Not provided',

        painelDataNaoInformada:
            'Date not provided',

        painelSemDescricao:
            'No description.',

        painelEventoGenerico:
            'Event',

        painelStatusPublicado:
            'Published',

        painelStatusEncerrado:
            'Finished',

        painelStatusCancelado:
            'Cancelled',

        painelStatusRemovido:
            'Removed',

        painelStatusRascunho:
            'Draft',

        painelStatusPresencaConfirmada:
            'Attendance confirmed',

        painelStatusInscricaoCancelada:
            'Cancelled',

        painelStatusInscrito:
            'Registered',

        painelCarregandoInscricoes:
            'Loading your registrations...',

        painelNenhumaInscricao:
            'No registrations',

        painelNenhumaInscricaoDesc:
            'You are not registered for any events yet.',

        painelInscricaoCancelada:
            'Registration cancelled',

        painelDetalhes:
            'Details',

        painelCarregandoEventos:
            'Loading your events...',

        painelNenhumEvento:
            'No events created',

        painelNenhumEventoDesc:
            'You have not created any events yet.',

        painelHubAtivo:
            'Hub Active',

        painelHubInativo:
            'Hub Inactive',

        painelPublicacaoAtiva:
            'Publication Active',

        painelPublicacaoInativa:
            'Publication Inactive',

        painelInscricoesAbertas:
            'Registration Open',

        painelInscricoesFechadas:
            'Registration Closed',

        painelAbrirInscricoes:
            'Open Registration',

        painelVagasNaoInformadas:
            'Capacity not provided',

        painelVagasDisponiveis:
            '{disponiveis} of {total} spots available',

        painelPublicacaoNaoContratada:
            'Publication not activated',

        painelPublicacaoAte:
            'Publication until {data}',

        painelPublicacaoExpirada:
            'Publication expired on {data}',

        painelNenhumaColaboracao:
            'No active collaborations',

        painelNenhumaColaboracaoDesc:
            'When you accept an invitation to collaborate on an event, it will appear here.',

        painelColaborador:
            'Collaborator',

        painelColaboradorAtivo:
            'Active Collaborator',

        painelCalendario:
            'Calendar',

        painelPermissoes:
            'Your access',

        painelNenhumaPermissao:
            'No additional permissions.',

        painelParticipaEquipe:
            'You are part of the organization team for this event.',

        painelVerEvento:
            'View Event',

        painelCarregandoCertificados:
            'Loading certificates...',

        painelNenhumCertificadoLiberado:
            'No certificates released',

        painelNenhumCertificadoDesc:
            'Your certificates will appear here once your attendance has been confirmed and the certificate has been released.',

        painelVisualizar:
            'View',

        painelCarregandoNotificacoes:
            'Loading notifications...',

        painelNenhumaNotificacaoTitulo:
            'No notifications',

        painelNenhumaNotificacaoDesc:
            'New notifications will appear here.',

        painelNotificacaoGenerica:
            'Notification',

        painelNotificacaoNova:
            'New',

        notifTituloConviteColaborador:
            'New collaboration invitation',

        notifTituloConviteAceito:
            'Invitation accepted',

        notifTituloConviteRecusado:
            'Invitation declined',

        notifMsgConviteColaborador:
            '{nome} invited you to collaborate on the event {evento}',

        notifMsgConviteAceito:
            '{nome} accepted the invitation to collaborate on the event {evento}',

        notifMsgConviteRecusado:
            '{nome} declined the invitation to collaborate on the event {evento}',

        painelConfirmarAceitarConvite:
            'Do you want to accept the invitation to collaborate on this event?',

        painelConfirmarRecusarConvite:
            'Do you want to decline this collaboration invitation?',

        painelConviteAceito:
            'Invitation accepted successfully!',

        painelConviteRecusado:
            'Invitation declined.',

        painelErroInscricoes:
            'Could not load your registrations.',

        painelErroEventos:
            'Could not load your events.',

        painelErroColaboracoes:
            'Could not load your collaborations.',

        painelErroCertificados:
            'Could not load the certificates.',

        painelErroNotificacoes:
            'Could not load notifications.',

        painelCertificadoNaoEncontrado:
            'Certificate not found.',

        painelParticipante:
            'Participant',

        painelHoras:
            '{horas}h',

        painelHorasExtenso:
            '{horas} hours',


        // NOVAS

        painelOla:
            'Hello!',

        painelOlaNome:
            'Hello, {nome}!',

        painelNumeroInscricao:
            'Registration #{id}',

        painelInscricaoNaoEncontrada:
            'Registration not found.',

        painelNaoCancelarPresencaConfirmada:
            'A registration with confirmed attendance cannot be cancelled.',

        painelInscricaoJaCancelada:
            'This registration has already been cancelled.',

        painelConfirmarCancelarInscricao:
            'Do you really want to cancel your registration for "{evento}"? You will not be able to register again!',

        painelEsteEvento:
            'this event',

        painelErroCancelarInscricao:
            'Could not cancel the registration.',

        painelInscricaoCanceladaSucesso:
            'Registration cancelled successfully.',

        painelQrIndisponivel:
            'QR Code is not available for this registration.',

        painelQrInscricaoCancelada:
            'The QR Code is not available for a cancelled registration.',

        painelErroGerarQr:
            'Could not generate the QR Code.',

        painelUsuarioNaoIdentificado:
            'Could not identify the authenticated user.',



        // ======================================================
        // MY ACCOUNT
        // ======================================================

        contaTituloPagina: 'My Account - MBLF Events',
        contaVoltarPainel: 'Back to Dashboard',
        contaTitulo: 'My Account',
        contaSubtitulo: 'Manage your personal information and password.',

        contaDadosPessoais: 'Personal information',
        contaDadosPessoaisDesc: 'Update your account information.',
        contaSalvarAlteracoes: 'Save changes',

        contaSeguranca: 'Security',
        contaSegurancaDesc: 'Change your access password.',
        contaSenhaAtual: 'Current password',
        contaNovaSenha: 'New password',
        contaConfirmarNovaSenha: 'Confirm new password',
        contaAlterarSenha: 'Change password',

        contaErroCarregar: 'Could not load your account information.',
        contaCamposObrigatorios: 'Enter your name and email.',
        contaNomeInvalido: 'Enter your full name.',
        contaEmailInvalido: 'Enter a valid email.',
        contaSalvando: 'Saving...',
        contaErroSalvar: 'Could not save the changes.',
        contaDadosAtualizados: 'Information updated successfully!',

        contaPreenchaSenhas: 'Fill in all password fields.',
        contaSenhaMinimo: 'The new password must contain at least 6 characters.',
        contaSenhasDiferentes: 'The new password confirmation does not match.',
        contaSenhaIgualAtual: 'The new password must be different from the current password.',
        contaAlterandoSenha: 'Changing...',
        contaErroAlterarSenha: 'Could not change the password.',
        contaSenhaAlterada: 'Password changed successfully!',

        // --------------------------------------------------
        // EXPLORE
        // --------------------------------------------------

        explorarTituloPagina:
            'Explore Events - MBLF Events',

        explorarMeuPainel:
            'My Dashboard',

        explorarBadge:
            'Discover new events',

        explorarTitulo:
            'Find the perfect event for you',

        explorarSubtitulo:
            'Explore events published on the platform and view dates, locations, and available spots.',

        explorarBuscaPlaceholder:
            'Search by title, description, type, or city...',

        explorarEventosDisponiveis:
            'Available Events',

        explorarBuscandoEventos:
            'Searching for events...',

        explorarLimparBusca:
            'Clear search',

        explorarBuscandoPublicos:
            'Searching for public events...',

        explorarCtaTitulo:
            'Found an interesting event?',

        explorarCtaTexto:
            'Create your account to register for events, track your participation, and access your certificates.',

        explorarCriarConta:
            'Create Account',

        explorarJaTenhoConta:
            'I already have an account',

        explorarErroCarregar:
            'Could not load the events.',

        explorarVerifiqueApi:
            'Check whether the API is running.',

        explorarNenhumEncontrado:
            'No events found',

        explorarNenhumDisponivel:
            'No events available',

        explorarTenteOutroTermo:
            'Try searching for another term.',

        explorarSemEventosPublicos:
            'There are no public events available yet.',

        explorarEventoGenerico:
            'Event',

        explorarEsgotado:
            'Sold Out',

        explorarInscricoesAbertas:
            'Registration open',

        explorarInscricoesFechadas:
            'Registration closed',

        explorarAs:
            'at',

        explorarQuantidadeZero:
            'No events available.',

        explorarQuantidadeUm:
            '1 event available.',

        explorarQuantidadeVarios:
            '{quantidade} events available.',

        explorarBuscaZero:
            'No results for your search.',

        explorarBuscaUm:
            '1 event found.',

        explorarBuscaVarios:
            '{quantidade} events found.',

        explorarLocalNaoInformado:
            'Location not provided',

        explorarVagasNaoInformadas:
            'Number of spots not provided',

        explorarVagasDisponiveis:
            '{disponiveis} of {total} spots available',

        explorarDataNaoInformada:
            'Date not provided',

        explorarSemDescricao:
            'No description available.',

        footerDescricao:
            'A platform for event promotion, participation, and management.',

        footerLinksUteis:
            'Useful Links',

        footerCadastro:
            'Sign Up',

        footerSuporte:
            'Support',

        footerPrivacidade:
            'Privacy Policy',

        footerTermos:
            'Terms of Use',

        footerRedesSociais:
            'Social Media',

        footerDireitos:
            '© 2026 MBLF Events. All rights reserved.',

        // --------------------------------------------------
        // EVENT
        // --------------------------------------------------
                // --------------------------------------------------
        // EVENT
        // --------------------------------------------------

        evTituloCriar:
            'Create Event',

        evTituloEditar:
            'Edit Event',

        evSubtituloCriar:
            'Enter the event information. It will initially be created as a draft.',

        evSubtituloEditar:
            'Editing: {titulo}',

        evInformacoesBasicas:
            'Basic Information',

        evNomeEvento:
            'Event Name',

        evNomePlaceholder:
            'Ex: Technology Week 2026',

        evTipoEvento:
            'Event Type',

        evTipoPlaceholder:
            'Ex: Lecture, Workshop, Fair, Conference...',

        evTipoAjuda:
            'Enter a classification that helps identify the event.',

        evDescricao:
            'Description',

        evDescricaoPlaceholder:
            'Describe the event, its objectives and main activities...',

        evDataHora:
            'Date and Time',

        evDataInicio:
            'Start',

        evDataFim:
            'End',

        evLocalizacao:
            'Location',

        evCidade:
            'City',

        evCidadePlaceholder:
            'Ex: Limeira',

        evEndereco:
            'Address',

        evEnderecoPlaceholder:
            'Ex: 123 Flower Street - Downtown',

        evLocalizacaoAjuda:
            'Address and city are stored separately.',

        evParticipacao:
            'Participation',

        evVagas:
            'Spots',

        evVagasTotal:
            'Total Spots',

        evVagasAjuda:
            'The number of available spots will automatically start with this value.',

        evCargaHoraria:
            'Duration',

        evHoras:
            'hours',

        evCargaHorariaAjuda:
            'This information may be used on the event certificates.',

        evComoFunciona:
            'How does it work?',

        evPassoCriarTitulo:
            'Create the event',

        evPassoCriarDescricao:
            'The event starts as a draft and is not yet visible to the public.',

        evPassoHubTitulo:
            'Activate the Hub',

        evPassoHubDescricao:
            'With an active Hub plan, you can work with collaborators, tasks, calendar, chat and other organization tools.',

        evPassoPublicarTitulo:
            'Publish',

        evPassoPublicarDescricao:
            'Publication is purchased separately. After that, registrations can be opened.',

        evStatus:
            'Status',

        evEvento:
            'Event',

        evHub:
            'Hub',

        evPublicacao:
            'Publication',

        evCriar:
            'Create Event',

        evSalvar:
            'Save Changes',

        evCancelar:
            'Cancel',

        evCriarNaoPublica:
            'Creating the event does not publish it automatically.',

        evStatusNovo:
            'New',

        evStatusRascunho:
            'Draft',

        evStatusPublicado:
            'Published',

        evStatusEncerrado:
            'Ended',

        evStatusCancelado:
            'Cancelled',

        evStatusRemovido:
            'Removed',

        evStatusAtivo:
            'Active',

        evStatusInativo:
            'Inactive',

        evStatusAtiva:
            'Active',

        evStatusInativa:
            'Inactive',

        evDataFimPosterior:
            'The end date must be later than the start date.',

        evErroCarregar:
            'Unable to load the event.',

        evSemPermissaoEditar:
            'You do not have permission to edit this event.',

        evSalvando:
            'Saving...',

        evErroAtualizar:
            'Unable to update the event.',

        evErroCriar:
            'Unable to create the event.',

        evSucessoAtualizar:
            'Event updated successfully!',

        evSucessoCriar:
            'Event created successfully! It was saved as a draft.',

        evErroSalvar:
            'Unable to save the event.',

        evValidacaoNome:
            'Enter the event name.',

        evValidacaoDatas:
            'Enter the start date and end date.',

        evValidacaoDatasValidas:
            'Enter valid dates.',

        evValidacaoDataPassado:
            'The event start date cannot be in the past.',

        evValidacaoVagas:
            'The number of spots cannot be negative.',

        evValidacaoCargaHoraria:
            'The duration cannot be negative.',


        // --------------------------------------------------
// EVENT HUB
// --------------------------------------------------

hubTituloPagina: 'Event Hub - MBLF Events',
hubVoltarPainel: 'Back to Dashboard',

hubTitulo: 'Event Hub',
hubSubtitulo: 'Event management and collaboration center.',
hubAtivo: 'Hub Active',
hubOrganizador: 'Organizer',
hubVerEvento: 'View Event',

hubVisaoGeral: 'Overview',
hubColaboradores: 'Collaborators',
hubInscritos: 'Attendees',
hubPresencas: 'Attendance',
hubAgenda: 'Schedule',
hubTarefas: 'Tasks',
hubChat: 'Chat',
hubCertificados: 'Certificates',

hubInformacoes: 'Hub Information',
hubValidoAte: 'Hub valid until',
hubSuaFuncao: 'Your role',

hubCarregando: 'Loading Hub...',
hubErroAcessoTitulo: 'Unable to access the Hub',
hubErroAcessoTexto: 'Check your permissions and try again.',

// COLLABORATORS

hubColaboradoresDescricao:
    'Manage the people who help organize this event.',

hubCarregandoColaboradores:
    'Loading collaborators...',

hubConvidarColaborador:
    'Invite Collaborator',

hubConviteEmail:
    'Collaborator email',

hubConviteEmailPlaceholder:
    'email@example.com',

hubConviteEmailAjuda:
    'The user must have an MBLF Events account.',

hubEnviarConvite:
    'Send Invitation',

hubFuncao:
    'Role',

hubFuncaoPlaceholder:
    'Ex: Organization, Reception, Support...',

hubPermissoesColaborador:
    'Collaborator Permissions',

hubPermVerInscritos:
    'View attendees',

hubPermRegistrarPresencas:
    'Record attendance',

hubPermAcessarCalendario:
    'Access schedule',

hubPermAcessarTarefas:
    'Access tasks',

hubPermAcessarChat:
    'Access chat',

hubPermLiberarCertificados:
    'Release certificates',

hubPermVerRelatorios:
    'View reports',

hubPermSilenciarParticipantes:
    'Mute participants',

hubPermExpulsarParticipantes:
    'Remove participants',

hubSalvarPermissoes:
    'Save Permissions',

// ATTENDEES

hubInscritosDescricao:
    'View the participants registered for this event.',

hubCarregandoInscritos:
    'Loading attendees...',

hubParticipantesInscritos:
    'Registered Attendees',

hubParticipante:
    'Participant',

hubDataInscricao:
    'Registration date',

hubStatus:
    'Status',

// ATTENDANCE

hubPresencasConfirmadas:
    'Confirmed Attendance',

hubPresencasConfirmadasDescricao:
    'View attendance already recorded for the event.',

hubCarregandoPresencas:
    'Loading attendance...',

hubRegistrarPresenca:
    'Record Attendance',

hubRegistrarPresencaDescricao:
    'Enter or scan the registration QR Code token.',

hubTokenQr:
    'QR Code Token',

hubTokenPlaceholder:
    'Enter or scan the token',

hubConfirmarPresenca:
    'Confirm Attendance',

// SCHEDULE

hubAgendaEquipe:
    'Team Schedule',

hubAgendaEquipeDescricao:
    'Organize appointments, meetings, deadlines, and event activities.',

hubAtualizarAgenda:
    'Refresh Schedule',

hubCarregandoAgenda:
    'Loading schedule...',

hubAgendaAdicionar:
    'Add to Schedule',

hubAgendaNovoItem:
    'New Schedule Item',

hubAgendaNovoItemDescricao:
    'Add an appointment to the team schedule.',

hubCampoTitulo:
    'Title',

hubAgendaTituloPlaceholder:
    'Ex: Team meeting',

hubCampoDescricao:
    'Description',

hubAgendaDescricaoPlaceholder:
    'Add details about this appointment...',

hubCampoTipo:
    'Type',

hubAgendaTipoReuniao:
    'Meeting',

hubAgendaTipoAtividade:
    'Activity',

hubAgendaTipoPrazo:
    'Deadline',

hubAgendaTipoLembrete:
    'Reminder',

hubAgendaTipoOutro:
    'Other',

hubCampoInicio:
    'Start',

hubCampoFim:
    'End',

hubAgendaFimOpcional:
    'Optional',

// TASKS

hubTarefasEquipe:
    'Team Tasks',

hubTarefasEquipeDescricao:
    'Create and track the activities needed to organize the event.',

hubAtualizarTarefas:
    'Refresh Tasks',

hubCarregandoTarefas:
    'Loading tasks...',

hubCriarTarefa:
    'Create Task',

hubNovaTarefa:
    'New Task',

hubNovaTarefaDescricao:
    'Create a new activity for the team.',

hubTarefaTituloPlaceholder:
    'Ex: Prepare registration desk',

hubTarefaDescricaoPlaceholder:
    'Describe what needs to be done...',

hubPrioridade:
    'Priority',

hubPrioridadeBaixa:
    'Low',

hubPrioridadeMedia:
    'Medium',

hubPrioridadeAlta:
    'High',

hubPrioridadeUrgente:
    'Urgent',

hubResponsavel:
    'Assignee',

hubSemResponsavel:
    'No assignee',

hubResponsavelAjuda:
    'You can leave the task without an assignee.',

// CHAT

hubChatEquipe:
    'Team Chat',

hubChatEquipeDescricao:
    'Chat with the members organizing this event.',

hubAtualizarMensagens:
    'Refresh Messages',

hubCarregandoMensagens:
    'Loading messages...',

hubChatPlaceholder:
    'Type a message...',

// CERTIFICATES

hubCertificadosDescricao:
    'Manage the release of certificates for this event.',

hubLiberarCertificados:
    'Release Certificates',

hubCarregandoCertificados:
    'Loading certificates...',

hubVerificandoCertificados:
    'Checking certificates...',

hubVerificandoCertificadosDescricao:
    'Please wait while we check certificate availability.',

hubCertificadosIndisponiveis:
    'Certificates are not available yet',

hubCertificadosDepoisEvento:
    'Certificates can be released after the event ends.',

hubNenhumCertificado:
    'No certificates generated',

    // --------------------------------------------------
// HUB - DYNAMIC JAVASCRIPT MESSAGES
// --------------------------------------------------

hubEventoNaoInformado:
    'No event was specified.',

hubErroCarregar:
    'Unable to load the Hub.',

hubErroCarregarEvento:
    'Unable to load the event.',

hubEventoGenerico:
    'Event',

hubNaoInformado:
    'Not provided',

hubDataNaoInformada:
    'Date not provided',

hubOrganizadorNaoInformado:
    'Organizer not provided',

// COLLABORATORS

hubErroCarregarColaboradores:
    'Unable to load collaborators.',

hubNenhumColaborador:
    'No collaborators found.',

hubNenhumColaboradorDescricao:
    'There are no active collaborators for this event yet.',

hubColaborador:
    'Collaborator',

hubConvitePendente:
    'Invitation pending',

hubConviteAceito:
    'Invitation accepted',

hubConviteRecusado:
    'Invitation declined',

hubInformeEmailUsuario:
    'Enter the collaborator email address.',

hubEnviandoConvite:
    'Sending invitation...',

hubErroEnviarConvite:
    'Unable to send the invitation.',

hubConviteEnviado:
    'Invitation sent successfully!',

hubErroSalvarPermissoes:
    'Unable to save permissions.',

hubPermissoesSalvas:
    'Permissions saved successfully!',

hubSalvandoPermissoes:
    'Saving permissions...',

// REGISTRATIONS

hubErroCarregarInscritos:
    'Unable to load registered participants.',

hubNenhumInscrito:
    'No registered participants.',

hubStatusInscrito:
    'Registered',

hubStatusPresente:
    'Present',

hubStatusCancelado:
    'Canceled',

hubStatusNaoInformado:
    'Status not provided',

// ATTENDANCE

hubErroCarregarPresencas:
    'Unable to load attendance records.',

hubNenhumaPresenca:
    'No attendance recorded',

hubNenhumaPresencaDescricao:
    'Confirmed attendance records will appear here.',

hubPresencaConfirmada:
    'Attendance confirmed',

hubSemPermissaoRegistrarPresenca:
    'You do not have permission to register attendance.',

hubInformeToken:
    'Enter the QR Code token.',

hubRegistrandoPresenca:
    'Registering attendance...',

hubErroRegistrarPresenca:
    'Unable to register attendance.',

hubPresencaRegistradaSucesso:
    'Attendance registered successfully!',

// SCHEDULE

hubErroCarregarAgenda:
    'Unable to load the schedule.',

hubAgendaVazia:
    'No schedule items.',

hubAgendaVaziaDescricao:
    'Team appointments will appear here.',

hubInformeTituloAgenda:
    'Enter the appointment title.',

hubInformeInicioAgenda:
    'Enter the start date and time.',

hubAgendaAntesEvento:
    'You cannot add an appointment before the event starts.',

hubAgendaFimAntesInicio:
    'The appointment end time cannot be before the start time.',

hubSalvandoAgenda:
    'Saving...',

hubErroCriarAgenda:
    'Unable to add the item to the schedule.',

hubAgendaCriada:
    'Item added to the schedule successfully!',

// TASKS

hubErroCarregarTarefas:
    'Unable to load tasks.',

hubNenhumaTarefa:
    'No tasks found.',

hubNenhumaTarefaDescricao:
    'Tasks created for the team will appear here.',

hubInformeTituloTarefa:
    'Enter the task title.',

hubCriandoTarefa:
    'Creating...',

hubErroCriarTarefa:
    'Unable to create the task.',

hubTarefaCriada:
    'Task created successfully!',

hubErroAtualizarTarefa:
    'Unable to update the task.',

hubConfirmarExcluirTarefa:
    'Are you sure you want to delete this task?',

hubErroExcluirTarefa:
    'Unable to delete the task.',

hubPrioridadeNaoInformada:
    'Not provided',

hubStatusTarefaPendente:
    'Pending',

hubStatusTarefaEmAndamento:
    'In progress',

hubStatusTarefaConcluida:
    'Completed',

hubStatusTarefaCancelada:
    'Canceled',

// CHAT

hubErroCarregarMensagens:
    'Unable to load messages.',

hubNenhumaMensagem:
    'No messages sent.',

hubNenhumaMensagemDescricao:
    'Team messages will appear here.',

hubDigiteMensagem:
    'Enter a message.',

hubEnviandoMensagem:
    'Sending...',

hubErroEnviarMensagem:
    'Unable to send the message.',

// CERTIFICATES

hubErroCarregarCertificados:
    'Unable to load certificates.',

hubCertificado:
    'Certificate',

hubCertificadoPendente:
    'Pending',

hubCertificadoLiberado:
    'Released',

hubCertificadoGerado:
    'Generated',

hubEventoAindaNaoTerminou:
    'Certificates can only be released after the event ends.',

hubNenhumPresenteCertificado:
    'There are no participants with confirmed attendance to receive a certificate.',

hubConfirmarLiberarCertificados:
    'Do you want to release certificates for participants with confirmed attendance?',

hubLiberandoCertificados:
    'Releasing certificates...',

hubCertificadosLiberadosSucesso:
    'Certificates released successfully!',

hubErroLiberarCertificados:
    'Unable to release certificates.',

    // --------------------------------------------------
// HUB - ADDITIONAL DYNAMIC MESSAGES
// --------------------------------------------------

// GENERAL / ACCESS

hubEventoNaoEncontrado:
    'Event not found.',

hubSemAcesso:
    'You do not have access to this Hub.',

hubUsuario:
    'User',

hubVoce:
    'You',

hubNaoDefinido:
    'Not defined',

hubExcluir:
    'Delete',

hubPermissoes:
    'Permissions',

hubInscricao:
    'Registration',

hubTarefa:
    'Task',

hubCargaHoraria:
    'Workload',

hubPrazo:
    'Deadline',

// PROFILES

hubPerfilAdmin:
    'Administrator',

hubPerfilFuncionario:
    'Staff',

perfilAluno:
    'Student',

perfilProfessor:
    'Teacher',

perfilMonitor:
    'Monitor',

perfilPalestrante:
    'Speaker',

// COLLABORATORS / PERMISSIONS

hubColaboradorInvalido:
    'Invalid collaborator.',

hubColaboradorNaoEncontrado:
    'Collaborator not found.',

hubNenhumColaboradorDesc:
    'There are no collaborators for this event yet.',

hubSomenteOrganizadorConvida:
    'Only the organizer can invite collaborators.',

hubSomenteOrganizadorPermissoes:
    'Only the organizer can change collaborator permissions.',

hubPermissoesAtualizadas:
    'Permissions updated successfully!',

// COLLABORATOR STATUS

hubStatusAtivo:
    'Active',

hubStatusConvitePendente:
    'Invitation pending',

hubStatusRecusado:
    'Declined',

hubStatusExpulso:
    'Removed',

// SCHEDULE

hubAgendaItemSemTitulo:
    'Untitled appointment',

hubInformeTipoAgenda:
    'Select the appointment type.',

hubAdicionandoAgenda:
    'Adding...',

hubErroAdicionarAgenda:
    'Unable to add the appointment to the schedule.',

hubAgendaAdicionadaSucesso:
    'Appointment added to the schedule successfully!',

hubSemPermissaoAgenda:
    'You do not have permission to manage the schedule.',

// TASKS

hubStatusPendente:
    'Pending',

hubStatusEmAndamento:
    'In progress',

hubStatusConcluida:
    'Completed',

hubStatusCancelada:
    'Canceled',

hubSemResponsavelDefinido:
    'No assignee defined',

hubSemPermissaoTarefas:
    'You do not have permission to manage tasks.',

// CHAT

hubErroCarregarChat:
    'Unable to load chat messages.',

hubSemPermissaoChat:
    'You do not have permission to use the chat.',

// CERTIFICATES

hubEventoEncerrado:
    'Event ended',

hubAguardandoLiberacao:
    'Awaiting release',

hubCertificadoDisponivel:
    'Certificate available',

hubCertificadoLiberadoEm:
    'Certificate released on {data}',

hubNenhumCertificadoDescricao:
    'Participant certificates will appear here when they become available.',

hubCertificadosSomenteDepoisEvento:
    'Certificates can only be released after the event ends.',

hubCertificadosPodemSerLiberados:
    'Certificates can now be released.',

hubSemPermissaoCertificados:
    'You do not have permission to release certificates.',

hubErroGerarCertificadoParticipante:
    'Unable to generate the participant certificate.',

hubErroLiberarCertificadoParticipante:
    'Unable to release the participant certificate.',

hubCertificadosProcessadosSucesso:
    'Certificates processed successfully!',

hubCertificadosProcessadosComFalhas:
    'The certificates were processed, but some errors occurred.',

hubCopyright:
    '© 2026 MBLF Events. All rights reserved.',


        // DETAILS

                // --------------------------------------------------
        // EVENT DETAILS
        // --------------------------------------------------

        detEntrarInscrever:
            'Log In to Register',

        detFacaLoginInscricao:
            'Log in to register for this event.',


        detCarregandoEvento:
            'Loading event...',

        detErroTitulo:
            'Unable to load the event',

        detErroPadrao:
            'The requested event was not found.',

        detVoltarEventos:
            'Back to Events',

        detInformacoesEvento:
            'Event Information',

        detInicio:
            'Start',

        detTermino:
            'End',

        detGarantirVaga:
            'Reserve My Spot',

        detVagasDisponiveis:
            'Available spots',

        detAjudaInscricao:
            'Your registration will be available on your dashboard along with the QR Code.',

        detCtaTitulo:
            'Join events on MBLF Events',

        detCtaTexto:
            'Create your account to register for events, track your participation, and access your QR Codes and certificates.',

        detEvento:
            'Event',

        detOrganizadorNaoInformado:
            'Organizer not provided',

        detSemDescricao:
            'No description available.',

        detNaoInformada:
            'Not provided',

        detNaoInformado:
            'Not provided',

        detEnderecoNaoInformado:
            'Address not provided.',

        detCidadeNaoInformada:
            'City not provided',

        detLocalNaoInformado:
            'Location not provided',

        detHoras:
            '{horas} hours',

        detSemLimite:
            'no limit provided',

        detVagasNaoInformadas:
            'Number of spots not provided',

        detQuantidadeVagas:
            '{disponiveis} of {total} spots',

        detStatusPublicado:
            'Published',

        detStatusEncerrado:
            'Ended',

        detStatusCancelado:
            'Cancelled',

        detStatusRemovido:
            'Removed',

        detStatusRascunho:
            'Draft',

        detEventoNaoDisponivel:
            'Event unavailable for registration',

        detEventoNaoPublicado:
            'This event is not published.',

        detPublicacaoEncerrada:
            'Publication ended',

        detPublicacaoTerminou:
            'The publication period for this event has ended.',

        detInscricoesFechadas:
            'Registration Closed',

        detInscricoesFechadasAjuda:
            'Registration for this event is closed.',

        detEventoEsgotado:
            'Event Full',

        detSemVagas:
            'There are no spots available.',

        detVoceOrganizador:
            'You are the Organizer',

        detOrganizadorNaoInscreve:
            'The organizer does not need to register for their own event.',

        detPresencaConfirmada:
            'Attendance Confirmed',

        detPresencaRegistrada:
            'Your attendance at this event has already been recorded.',

        detInscricaoCancelada:
            'Registration Cancelled',

        detInscricaoCanceladaExistente:
            'You already have a cancelled registration for this event.',

        detVoceInscrito:
            'You are registered',

        detCancelarInscricao:
            'Cancel Registration',

        detPodeCancelar:
            'You can cancel your registration for this event.',

        detInscreverAgora:
            'Register Now',

        detProcessandoInscricao:
            'Processing registration...',

        detErroInscricao:
            'Unable to complete the registration.',

        detInscricaoSucesso:
            'Registration completed successfully! Your QR Code is now available on your dashboard.',

        detInscricaoConfirmada:
            'Registration Confirmed',

        detConsulteQr:
            'View your QR Code on your dashboard.',

        detConfirmarCancelamento:
            'Are you sure you want to cancel your registration for this event?',

        detCancelandoInscricao:
            'Cancelling registration...',

        detErroCancelar:
            'Unable to cancel the registration.',

        detCancelamentoSucesso:
            'Registration cancelled successfully.',

        detErroEventosPublicos:
            'Unable to load public events.',

        detEventoNaoEncontrado:
            'This event was not found or is not available to the public.',

        detErroCarregarEvento:
            'Unable to load the event.',

        detCompartilhado:
            'Event link copied!',

        detErroCompartilhar:
            'Unable to share the event.',

        detSobreEvento: 'About the Event',
        detProgramacao: 'Event Schedule',
        detPalestrantes: 'Speakers & Guests',
        detLocalizacao: 'Event Location',
        detGarantirVaga: 'Reserve My Spot',
        detInscricoesAbertas: 'Registration Open',
        detOrganizadoPor: 'Organized by',
        detCompartilhar: 'Share Event',
        btnInscreverSe: 'Register Now',
        detDataEHora: 'Date and Time',
        detVagasRestantes: 'spots remaining',


        recursosBadge:
            'Features',

        recursosTitulo:
            'Platform Features',

        recursosSubtitulo:
            'From planning to certificates, MBLF Events brings together tools for different stages of an event.',

        recursosCtaTitulo:
            'Ready to explore?',

        recursosCtaTexto:
            'See the available events or create your account.',

        recursosFooterDescricao:
            'An integrated solution for event management.',

        recursosTituloPagina:
            'Features - MBLF Events',


        // --------------------------------------------------
        // FEATURES - CARDS
        // --------------------------------------------------

        recursosGestaoTitulo:
            'Event Management',

        recursosGestaoTexto:
            'Create, edit, and manage events by defining information, dates, location, available spots, and duration.',

        recursosPublicacaoTitulo:
            'Publication',

        recursosPublicacaoTexto:
            'Control when an event becomes available to the public and manage when registration opens.',

        recursosInscricoesTitulo:
            'Registration',

        recursosInscricoesTexto:
            'Participants can register for events, view their registrations, and track their status.',

        recursosQrTitulo:
            'QR Code Attendance',

        recursosQrTexto:
            'Each registration has an identification that allows attendance to be recorded and tracked at events.',

        recursosHubTitulo:
            'Event Hub',

        recursosHubTexto:
            'A management center where organizers and collaborators can work together during the event.',

        recursosColaboradoresTitulo:
            'Collaborators and Permissions',

        recursosColaboradoresTexto:
            'Invite people to help organize the event and individually define which tools they can access.',

        recursosOrganizacaoTitulo:
            'Schedule, Tasks and Chat',

        recursosOrganizacaoTexto:
            'Organize appointments, assign tasks, and keep the team connected through the Hub’s internal chat.',

        recursosCertificadosTitulo:
            'Certificates',

        recursosCertificadosTexto:
            'After the event ends, certificates can be released to participants whose attendance has been confirmed.',

        recursosEcossistemaTitulo:
            'Integrated Ecosystem',

        recursosEcossistemaTexto:
            'Web, Mobile, and Desktop share information through an API and a centralized database.',

        // FOOTER

        ftDescricao:
            'Integrated solution for managing academic and corporate events.',

        ftLinks: 'Links',
        ftLinksUteis: 'Useful Links',
        ftPlataforma: 'Platform',
        ftSuporte: 'Support',
        ftContato: 'Contact',
        ftPrivacidade: 'Privacy Policy',
        ftTermos: 'Terms of Use',
        ftLogin: 'Login',
        ftCadastro: 'Sign Up',

        footerTexto:
            '© 2026 MBLF Events. All rights reserved.',

        // --------------------------------------------------
        // ABOUT
        // --------------------------------------------------

        sobreTituloPagina:
            'About - MBLF Events',

        sobreBadge:
            'Who we are',

        sobreTitulo:
            'About MBLF Events',

        sobreSubtitulo:
            'A platform created to simplify the organization, participation, and management of academic and corporate events.',

        sobreMissaoTitulo:
            'Our Mission',

        sobreMissaoTexto:
            'Simplify the creation, organization, and participation in events through an integrated, accessible, and intuitive platform.',

        sobreVisaoTitulo:
            'Our Vision',

        sobreVisaoTexto:
            'Create an integrated ecosystem between Web, Mobile, Desktop, and API, centralizing event information and processes.',

        sobreValoresTitulo:
            'Our Values',

        sobreValoresTexto:
            'Organization, collaboration, security, accessibility, innovation, and a simple experience for all users.',

        sobreProjetoLabel:
            'THE PROJECT',

        sobreProjetoTitulo:
            'An end-to-end connected system',

        sobreProjetoTexto1:
            'MBLF Events brings together resources for organizers, participants, collaborators, and administrators, keeping information centralized through an API.',

        sobreProjetoTexto2:
            'The system allows users to follow the entire event lifecycle: creation, publication, registration, collaboration, attendance, and certificate release.',

        sobreEquipeTitulo:
            'Meet Our Team',

        sobreEquipeTexto:
            'The project is divided into different platforms, with each team member responsible for one area of the MBLF Events ecosystem.',

        sobreEquipeWebTexto:
            'Responsible for the Web platform, interfaces, user experience, and front-end integration with the API.',

        sobreEquipeApiTexto:
            'Responsible for the REST API, business rules, authentication, and integration with the central database.',

        sobreEquipeMobileTexto:
            'Responsible for the mobile application and features focused on the experience on mobile devices.',

        sobreEquipeDesktopTexto:
            'Responsible for the Desktop software and local tools integrated into the ecosystem.',

        sobreCtaTitulo:
            'Discover the platform',

        sobreCtaTexto:
            'Explore events or create your account to use the system features.',

        // --------------------------------------------------
        // CONTACT
        // --------------------------------------------------

        contatoTituloPagina:
            'Contact - MBLF Events',

        contatoBadge:
            'Support',

        contatoTitulo:
            'Contact Us',

        contatoSubtitulo:
            'Found a problem? Have a suggestion, question, or comment? Send a message to our team.',

        contatoCanaisTitulo:
            'Contact channels',

        contatoEmailTitulo:
            'Email',

        contatoSugestoesTitulo:
            'Suggestions',

        contatoSugestoesTexto:
            'Ideas, comments, and suggestions to improve the platform are welcome.',

        contatoPrivacidadeTitulo:
            'Privacy',

        contatoPrivacidadeTexto:
            'Use the form only to provide information necessary for support.',

        contatoFormTitulo:
            'Send us a message',

        contatoFormTexto:
            'Fill in the fields below. Your message will be sent to the MBLF Events team.',

        contatoNome:
            'Name *',

        contatoNomePlaceholder:
            'Your name',

        contatoEmail:
            'Your email *',

        contatoEmailPlaceholder:
            'youremail@email.com',

        contatoAssunto:
            'Subject *',

        contatoAssuntoSelecione:
            'Select',

        contatoAssuntoDuvida:
            'Question',

        contatoAssuntoProblema:
            'Report a problem',

        contatoAssuntoSugestao:
            'Suggestion',

        contatoAssuntoComentario:
            'Comment',

        contatoAssuntoOutro:
            'Other',

        contatoMensagem:
            'Message *',

        contatoMensagemPlaceholder:
            'Tell us how we can help...',

        contatoEnviar:
            'Send Message',

        contatoCamposObrigatorios:
            'Please fill in all required fields.',

        contatoWeb3FormsNaoConfigurado:
            'The form has not been configured correctly yet.',

        contatoEnviando:
            'Sending...',

        contatoErroEnviar:
            'Unable to send the message.',

        contatoSucesso:
            'Message sent successfully! Thank you for contacting MBLF Events.',

        contatoErroTenteNovamente:
            'Unable to send your message. Please try again later.',

                // --------------------------------------------------
        // ACTIVATE HUB
        // --------------------------------------------------

        ativarHubTitulo:
            'Activate Event Hub',

        ativarHubSubtitulo:
            'Choose a plan to unlock management and collaboration tools.',

        ativarHubCarregando:
            'Loading Hub plans...',

        ativarHubErroTitulo:
            'Unable to load the Hub',

        ativarHubErroPadrao:
            'Check the event and try again.',

        ativarHubValidoAte:
            'Hub valid until',

        ativarHubNaoContratado:
            'Not activated',

        ativarHubEscolherPlano:
            'Choose a Hub plan',

        ativarHubPlanoDescricao:
            'The selected period unlocks the event’s internal tools.',

        ativarHubBuscandoPlanos:
            'Loading plans...',

        ativarHubLiberaTitulo:
            'What does the Hub unlock?',

        ativarHubColaboradoresDesc:
            'Invite people to help organize the event.',

        ativarHubInscritosDesc:
            'Track participants registered for the event.',

        ativarHubPresencasDesc:
            'Check in participants using their QR Code.',

        ativarHubFerramentasEquipe:
            'Team tools',

        ativarHubFerramentasEquipeDesc:
            'Schedule, tasks, and chat can be used according to permissions.',

        ativarHubAtivoTitulo:
            'Hub active!',

        ativarHubAtivoDescricao:
            'The internal tools for this event are now available.',

        ativarHubNenhumEvento:
            'No event was provided.',

        ativarHubErroCarregar:
            'Unable to load the Hub.',

        ativarHubErroCarregarEvento:
            'Unable to load the event.',

        ativarHubSomenteOrganizador:
            'Only the organizer can purchase plans for this event.',

        ativarHubErroCarregarPlanos:
            'Unable to load the plans.',

        ativarHubNenhumPlano:
            'No Hub plans are currently available.',

        ativarHubPlanoPadrao:
            'Hub Plan',

        ativarHubDia:
            '{duracao} day of Hub access',

        ativarHubDias:
            '{duracao} days of Hub access',

        ativarHubDuracaoNaoInformada:
            'Duration not provided',

        ativarHubSelecionarPlano:
            'Select Plan',

        ativarHubPlanoNaoEncontrado:
            'Plan not found.',

        ativarHubConfirmarPlano:
            'Do you want to purchase the "{nome}" plan for {valor}?',

        ativarHubErroContratar:
            'Unable to purchase the plan.',

        ativarHubSucessoContratar:
            'Plan purchased successfully! The Hub has been activated.',

        ativarHubErroAtualizarEvento:
            'The plan was processed, but the event could not be updated.',

        ativarHubAtivo:
            'Hub Active',

        ativarHubInativo:
            'Hub Inactive',

        ativarHubExpiradoEm:
            'Expired on {data}',

                    // --------------------------------------------------
        // PUBLISH EVENT
        // --------------------------------------------------

        pubTituloPagina:
            'Publish Event - MBLF Events',

        pubTitulo:
            'Publish Event',

        pubSubtitulo:
            'Choose a publication plan and open registration for your event.',

        pubCarregandoEvento:
            'Loading event information...',

        pubErroTitulo:
            'Unable to load this page',

        pubVoltarPainel:
            'Back to Dashboard',

        pubEvento:
            'Event',

        pubValidaAte:
            'Publication valid until',

        pubEscolhaPlano:
            'Choose a publication plan',

        pubEscolhaPlanoDesc:
            'The plan determines how long the event will remain publicly available.',

        pubBuscandoPlanos:
            'Loading plans...',

        pubContratePublicacao:
            'Activate publication',

        pubContratePublicacaoDesc:
            'Choose an available plan to activate the publication period.',

        relTitulo: 'Event report',
        relExportarPdf: 'Export PDF',
        hubVoltar: 'Back to Hub',

        pubAbraInscricoes:
            'Open registration',

        pubAbraInscricoesDesc:
            'With an active publication, you can open registration.',

        pubEventoPublico:
            'Public event',

        pubEventoPublicoDesc:
            'After that, the event will appear on the Explore Events page.',

        pubAbrirInscricoes:
            'Open registration',

        pubDisponivelPublico:
            'Event available to the public!',

        pubDisponivelPublicoDesc:
            'Registration is open and your event can now appear on the public events page.',

        pubCopyright:
            '© 2026 MBLF Events. All rights reserved.',

        pubEventoNaoInformado:
            'No event was specified.',

        pubErroCarregarEvento:
            'Unable to load the event.',

        pubSomenteOrganizador:
            'Only the organizer can manage the publication of this event.',

        pubEventoGenerico:
            'Event',

        pubNaoContratada:
            'Not activated',

        pubErroCarregarPlanos:
            'Unable to load publication plans.',

        pubNenhumPlanoDisponivel:
            'No publication plans are currently available.',

        pubPlanoGenerico:
            'Publication Plan',

        pubDuracaoDias:
            '{duracao} day{s} of publication',

        pubDuracaoNaoInformada:
            'Duration not provided',

        pubBadgePublicacao:
            'Publication',

        pubSelecionarPlano:
            'Select Plan',

        pubPlanoNaoEncontrado:
            'Plan not found.',

        pubConfirmarContratarPlano:
            'Do you want to purchase the "{plano}" plan for {valor}?',

        pubErroContratarPlano:
            'Unable to purchase the plan.',

        pubPlanoContratadoSucesso:
            'Plan purchased successfully! Event publication has been activated.',

        pubPlanoProcessadoErroAtualizar:
            'The plan was processed, but the event information could not be updated.',

        pubPublicacaoNecessaria:
            'An active publication is required before opening registration.',

        pubConfirmarAbrirInscricoes:
            'Do you want to open registration for this event? After that, it may become publicly available.',

        pubAbrindoInscricoes:
            'Opening registration...',

        pubErroAbrirInscricoes:
            'Unable to open registration.',

        pubInscricoesAbertasSucesso:
            'Registration opened successfully! The event is now available to the public.',

        pubInscricoesAbertas:
            'Registration Open',

        pubInscricoesJaAbertas:
            'Registration is already open and the event is published.',

        pubAbrirInscricoesBotao:
            'Open Registration',

        pubPublicacaoAtivaAbrir:
            'Publication is active. You can now open registration.',

        pubPrimeiroContratePlano:
            'First, choose a publication plan.',

        pubStatusPublicado:
            'Published',

        pubStatusCancelado:
            'Cancelled',

        pubStatusEncerrado:
            'Closed',

        pubStatusRemovido:
            'Removed',

        pubStatusRascunho:
            'Draft',

        pubPublicacaoAtiva:
            'Publication Active',

        pubPublicacaoInativa:
            'Publication Inactive',

        pubInscricoesFechadas:
            'Registration Closed',

        pubValorZero:
            'R$ 0.00',

        pubNaoInformada:
            'Not provided',

        pubComoFunciona: 'How does it work?',
        pubVerEventosPublicos: 'View Public Events',
        pubVerPaginaEvento: 'View Event Page',

    },


    // ======================================================
    // ESPAÑOL
    // ======================================================

    es: {

        // GENERAL

        appNome: 'MBLF Events',

        voltar: 'Volver',
        cancelar: 'Cancelar',
        salvar: 'Guardar',
        editar: 'Editar',
        excluir: 'Eliminar',
        fechar: 'Cerrar',
        atualizar: 'Actualizar',
        visualizar: 'Ver',
        enviar: 'Enviar',
        carregando: 'Cargando...',
        sim: 'Sí',
        nao: 'No',


        // NAVBAR

        navRecursos: 'Recursos',
        navSobre: 'Acerca de',
        navContato: 'Contacto',
        navLogar: 'Iniciar sesión',
        navCadastrar: 'Registrarse',
        navPainel: 'Panel',
        navMeuPainel: 'Mi Panel',
        navExplorar: 'Explorar Eventos',
        navMinhaConta: 'Mi Cuenta',
        navSair: 'Salir',
        navCriarEvento: 'Crear Evento',

        perfilUsuario: 'Usuario',
        perfilFuncionario: 'Personal',
        perfilAdmin: 'Administrador',


        // INDEX

        heroTitulo:
            'Gestiona tus Eventos con Facilidad y Precisión',

        heroSubtitulo:
            'Una plataforma integrada para organizar, publicar y acompañar eventos académicos y corporativos.',

        btnComecar:
            'Comenzar Ahora',

        btnSaibaMais:
            'Saber Más',

        btnVerMais:
            'Ver detalles',

        btnCriarConta:
            'Crear cuenta',

        btnExplorarEventos:
            'Explorar Eventos',

        ariaAbrirMenu:
            'Abrir menú',

        temaAlternar:
            'Cambiar tema',

        idiomaSelecionar:
            'Seleccionar idioma',

        indexBadge:
            'Tu experiencia con eventos comienza aquí',

        indexHeroTitulo1:
            'Encuentra, participa y organiza',

        indexHeroDestaque:
            'eventos',

        indexHeroTitulo2:
            'en un solo lugar',

        indexHeroTexto:
            'Descubre eventos, realiza inscripciones y acompaña tus participaciones. Si deseas organizar tu propio evento, utiliza las herramientas de MBLF Events para trabajar con tu equipo.',

        indexCriarMinhaConta:
            'Crear mi cuenta',

        indexRecursosTitulo:
            'Todo lo que necesitas para tus eventos',

        indexRecursosSubtitulo:
            'Participa, organiza y acompaña todo desde la plataforma.',

        indexParticiparTitulo:
            'Participa en Eventos',

        indexParticiparTexto:
            'Explora eventos disponibles, inscríbete y acompaña tus participaciones.',

        indexExplorarLink:
            'Explorar eventos',

        indexOrganizarTitulo:
            'Organiza tu Evento',

        indexOrganizarTexto:
            'Crea tus propios eventos y trabaja con colaboradores, tareas, calendario, chat, participantes y otras herramientas mediante el Hub de Organización.',

        indexCertificadosTitulo:
            'Certificados',

        indexCertificadosTexto:
            'Después de confirmar tu asistencia, consulta los certificados liberados directamente desde tu cuenta.',

        indexAcessarConta:
            'Acceder a mi cuenta',

        indexOrganizadoresLabel:
            'PARA ORGANIZADORES',

        indexHubTitulo:
            'Planifica tu evento con tu equipo',

        indexHubTexto:
            'El Hub de Organización reúne herramientas para preparar y administrar cada evento en un único entorno.',

        indexCalendario:
            'Calendario',

        indexHubCardTitulo:
            'Tu evento. Tu equipo. Un solo Hub.',

        indexHubCardTexto:
            'Organiza todas las etapas necesarias para preparar tu evento.',

        indexComoFuncionaTitulo:
            '¿Cómo funciona?',

        indexComoFuncionaTexto:
            'Comienza a utilizar MBLF Events en pocos pasos.',

        indexPasso1Titulo:
            'Crea tu cuenta',

        indexPasso1Texto:
            'Regístrate para inscribirte en eventos y acceder a todas las funcionalidades disponibles.',

        indexPasso2Titulo:
            'Participa u organiza',

        indexPasso2Texto:
            'Encuentra eventos para participar o crea tu propio evento y conviértete en su organizador.',

        indexPasso3Titulo:
            'Acompaña todo',

        indexPasso3Texto:
            'Consulta inscripciones, eventos, códigos QR, actividades y certificados desde tu panel.',

        indexCtaTitulo:
            '¿Listo para comenzar?',

        indexCtaTexto:
            'Crea tu cuenta para participar en eventos o comenzar a planificar tu propio evento.',

        indexVerEventos:
            'Ver eventos',

        indexFooterDescricao:
            'Plataforma para divulgación, participación y gestión de eventos.',

        indexRedesSociais:
            'Redes Sociales',


        // LOGIN

        loginCamposObrigatorios:
            'Ingresa tu correo electrónico y contraseña.',

        loginAutenticando:
            'Iniciando sesión...',

        loginBemVindo:
            '¡Bienvenido(a), {nome}! Redirigiendo...',

        loginInvalido:
            'Correo electrónico o contraseña incorrectos.',

        loginErroConexao:
            'No se pudo conectar al servidor. Verifica si la API está en ejecución.',

        loginTituloPagina:
            'Iniciar sesión - MBLF Events',

        loginTitulo:
            '¡Bienvenido de nuevo!',

        loginSubtitulo:
            'Inicia sesión para acompañar tus inscripciones, eventos, certificados y actividades.',

        loginEmail:
            'Correo electrónico',

        loginEmailPlaceholder:
            'tucorreo@ejemplo.com',

        loginSenha:
            'Contraseña',

        loginSenhaPlaceholder:
            'Ingresa tu contraseña',

        loginEntrar:
            'Iniciar sesión',

        loginSemConta:
            '¿Aún no tienes una cuenta?',

        loginCadastreSe:
            'Regístrate',

        loginExplorar:
            'Explorar eventos sin iniciar sesión',

        loginTitulo:
            '¡Bienvenido de nuevo!',

        loginSubtitulo:
            'Inicia sesión para acompañar tus inscripciones, eventos, certificados y actividades.',

        loginEmail:
            'Correo electrónico',

        loginSenha:
            'Contraseña',

        loginEntrar:
            'Entrar en la Plataforma',

        loginSemConta:
            '¿Aún no tienes una cuenta?',

        loginCadastreSe:
            'Regístrate',

        loginExplorar:
            'Explorar eventos sin iniciar sesión',

        loginEmailPlaceholder:
            'tucorreo@ejemplo.com',

        loginSenhaPlaceholder:
            'Introduce tu contraseña',


        // REGISTRO

        cadastroCamposObrigatorios:
            'Completa todos los campos obligatorios.',

        cadastroNomeInvalido:
            'Ingresa tu nombre completo utilizando solo letras.',

        cadastroEmailInvalido:
            'Ingresa una dirección de correo electrónico válida.',

        cadastroSenhaMinimo:
            'La contraseña debe tener al menos 6 caracteres.',

        cadastroSenhasDiferentes:
            'Las contraseñas no coinciden.',

        cadastroCriandoConta:
            'Creando cuenta...',

        cadastroSucesso:
            '¡Cuenta creada correctamente! Redirigiendo al inicio de sesión...',

        cadastroErro:
            'No se pudo crear la cuenta.',

        cadastroErroConexao:
            'No se pudo conectar al servidor. Verifica si la API está en ejecución.',

        cadastroTitulo:
            'Crea tu cuenta',

        cadastroTituloPagina:
            'Crear Cuenta - MBLF Events',

        cadastroSubtitulo:
            'Regístrate para participar y organizar eventos en MBLF Events.',

        cadastroNome:
            'Nombre completo',

        cadastroEmail:
            'Correo electrónico',

        cadastroSenha:
            'Contraseña',

        cadastroSenhaAjuda:
            'Utiliza al menos 6 caracteres.',

        cadastroConfirmarSenha:
            'Confirmar contraseña',

        cadastroBotao:
            'Crear Cuenta',

        cadastroJaPossuiConta:
            '¿Ya tienes una cuenta?',

        cadastroEntrar:
            'Iniciar sesión',

        cadastroExplorar:
            'Explorar eventos sin crear una cuenta',

        cadastroNomePlaceholder:
            'Introduce tu nombre completo',

        cadastroEmailPlaceholder:
            'tucorreo@ejemplo.com',

        cadastroSenhaPlaceholder:
            'Crea una contraseña',

        cadastroConfirmarSenhaPlaceholder:
            'Introduce nuevamente tu contraseña',


        // --------------------------------------------------
        // PANEL
        // --------------------------------------------------

        painelTituloPagina:
            'Panel - MBLF Events',

        painelBoasVindas:
            '¡Bienvenido!',

        painelConta:
            'Cuenta',

        painelAtualizarNotificacoes:
            'Actualizar notificaciones',

        painelEventosCriados:
            'Eventos Creados',

        painelNaoLidas:
            'No Leídas',

        painelInscricoesDesc:
            'Eventos en los que te has inscrito como participante.',

        painelEventosOrganizo:
            'Eventos que Organizo',

        painelEventosOrganizoDesc:
            'Eventos creados por ti y sus estados de Hub y publicación.',

        painelNovoEvento:
            'Nuevo Evento',

        painelEventosColaboro:
            'Eventos en los que colaboro',

        painelColaboracoesDesc:
            'Eventos en los que formas parte del equipo de organización.',

        painelColaboracoesQuantidade:
            'colaboración(es)',

        painelCarregandoColaboracoes:
            'Cargando tus colaboraciones...',

        painelCertificadosDesc:
            'Certificados liberados después de confirmar tu asistencia.',

        painelTabelaEvento:
            'Evento',

        painelTabelaCargaHoraria:
            'Duración',

        painelTabelaLiberacao:
            'Liberación',

        painelTabelaCodigo:
            'Código',

        painelTabelaAcao:
            'Acción',

        painelQrTitulo:
            'Código QR de la Inscripción',

        painelQrDesc:
            'Presenta este código QR en el evento para que tu asistencia pueda ser confirmada.',

        painelToken:
            'Token:',

        painelCertificadoTitulo:
            'Certificado',

        painelLiberadoEm:
            'Liberado el',

        painelCodigoAutenticidade:
            'Código de autenticidad',

        painelTitulo:
            'Mi Panel',

        painelSubtitulo:
            'Acompaña tus inscripciones, eventos, colaboraciones y certificados.',

        painelInscricoes:
            'Mis Inscripciones',

        painelEventos:
            'Mis Eventos',

        painelColaboracoes:
            'Colaboraciones',

        painelCertificados:
            'Mis Certificados',

        painelResumoInscricoes:
            'Inscripciones',

        painelResumoEventos:
            'Eventos',

        painelResumoCertificados:
            'Certificados',

        painelNotificacoes:
            'Notificaciones',

        painelNenhumaNotificacao:
            'No hay notificaciones disponibles.',

        painelCertificadoNaoEncontrado:
            'Certificado no encontrado.',

        painelParticipante:
            'Participante',

        painelHoras:
            '{horas}h',

        painelHorasExtenso:
            '{horas} horas',

        painelErroAtualizarNotificacao:
            'No fue posible actualizar la notificación.',

        painelErroAceitarConvite:
            'No fue posible aceptar la invitación.',

        painelErroRecusarConvite:
            'No fue posible rechazar la invitación.',

        marcarComoLida:
            'Marcar como leída',

        conviteAceitar:
            'Aceptar',

        conviteRecusar:
            'Rechazar',

        btnCriarNovoEvento:
            'Crear Nuevo Evento',

        btnVerQRCode:
            'Ver código QR',

        btnVerDetalhes:
            'Ver Detalles',

        btnAcessarHub:
            'Acceder al Hub',

        btnAtivarHub:
            'Activar Hub',

        btnPublicarEvento:
            'Publicar Evento',

        btnGerenciarPublicacao:
            'Gestionar Publicación',

        btnEditarEvento:
            'Ver / Editar Evento',

        nenhumCertificado:
            'No hay certificados disponibles',

        painelNaoInformada:
            'No informada',

        painelDataNaoInformada:
            'Fecha no informada',

        painelSemDescricao:
            'Sin descripción.',

        painelEventoGenerico:
            'Evento',

        painelStatusPublicado:
            'Publicado',

        painelStatusEncerrado:
            'Finalizado',

        painelStatusCancelado:
            'Cancelado',

        painelStatusRemovido:
            'Eliminado',

        painelStatusRascunho:
            'Borrador',

        painelStatusPresencaConfirmada:
            'Asistencia confirmada',

        painelStatusInscricaoCancelada:
            'Cancelada',

        painelStatusInscrito:
            'Inscrito',

        painelCarregandoInscricoes:
            'Cargando tus inscripciones...',

        painelNenhumaInscricao:
            'Sin inscripciones',

        painelNenhumaInscricaoDesc:
            'Todavía no estás inscrito en ningún evento.',

        painelInscricaoCancelada:
            'Inscripción cancelada',

        painelDetalhes:
            'Detalles',

        painelCarregandoEventos:
            'Cargando tus eventos...',

        painelNenhumEvento:
            'Ningún evento creado',

        painelNenhumEventoDesc:
            'Todavía no has creado ningún evento.',

        painelHubAtivo:
            'Hub Activo',

        painelHubInativo:
            'Hub Inactivo',

        painelPublicacaoAtiva:
            'Publicación Activa',

        painelPublicacaoInativa:
            'Publicación Inactiva',

        painelInscricoesAbertas:
            'Inscripciones Abiertas',

        painelInscricoesFechadas:
            'Inscripciones Cerradas',

        painelAbrirInscricoes:
            'Abrir Inscripciones',

        painelVagasNaoInformadas:
            'Cupos no informados',

        painelVagasDisponiveis:
            '{disponiveis} de {total} cupos disponibles',

        painelPublicacaoNaoContratada:
            'Publicación no activada',

        painelPublicacaoAte:
            'Publicación hasta {data}',

        painelPublicacaoExpirada:
            'Publicación vencida el {data}',

        painelNenhumaColaboracao:
            'Ninguna colaboración activa',

        painelNenhumaColaboracaoDesc:
            'Cuando aceptes una invitación para colaborar en un evento, aparecerá aquí.',

        painelColaborador:
            'Colaborador',

        painelColaboradorAtivo:
            'Colaborador Activo',

        painelCalendario:
            'Calendario',

        painelPermissoes:
            'Tus accesos',

        painelNenhumaPermissao:
            'Ningún permiso adicional.',

        painelParticipaEquipe:
            'Formas parte del equipo de organización de este evento.',

        painelVerEvento:
            'Ver Evento',

        painelCarregandoCertificados:
            'Cargando certificados...',

        painelNenhumCertificadoLiberado:
            'Ningún certificado liberado',

        painelNenhumCertificadoDesc:
            'Tus certificados aparecerán aquí cuando se confirme tu asistencia y el certificado sea liberado.',

        painelVisualizar:
            'Ver',

        painelCarregandoNotificacoes:
            'Cargando notificaciones...',

        painelNenhumaNotificacaoTitulo:
            'Sin notificaciones',

        painelNenhumaNotificacaoDesc:
            'Las novedades aparecerán aquí.',

        painelNotificacaoGenerica:
            'Notificación',

        painelNotificacaoNova:
            'Nueva',

        notifTituloConviteColaborador:
            'Nueva invitación para colaborar',

        notifTituloConviteAceito:
            'Invitación aceptada',

        notifTituloConviteRecusado:
            'Invitación rechazada',

        notifMsgConviteColaborador:
            '{nome} te invitó a colaborar en el evento {evento}',

        notifMsgConviteAceito:
            '{nome} aceptó la invitación para colaborar en el evento {evento}',

        notifMsgConviteRecusado:
            '{nome} rechazó la invitación para colaborar en el evento {evento}',

        painelConfirmarAceitarConvite:
            '¿Deseas aceptar la invitación para colaborar en este evento?',

        painelConfirmarRecusarConvite:
            '¿Deseas rechazar esta invitación de colaboración?',

        painelConviteAceito:
            '¡Invitación aceptada con éxito!',

        painelConviteRecusado:
            'Invitación rechazada.',

        painelErroInscricoes:
            'No fue posible cargar tus inscripciones.',

        painelErroEventos:
            'No fue posible cargar tus eventos.',

        painelErroColaboracoes:
            'No fue posible cargar tus colaboraciones.',

        painelErroCertificados:
            'No fue posible cargar los certificados.',

        painelErroNotificacoes:
            'No fue posible cargar las notificaciones.',


        // NOVAS

        painelOla:
            '¡Hola!',

        painelOlaNome:
            '¡Hola, {nome}!',

        painelNumeroInscricao:
            'Inscripción #{id}',

        painelInscricaoNaoEncontrada:
            'Inscripción no encontrada.',

        painelNaoCancelarPresencaConfirmada:
            'No es posible cancelar una inscripción cuya asistencia ya fue confirmada.',

        painelInscricaoJaCancelada:
            'Esta inscripción ya está cancelada.',

        painelConfirmarCancelarInscricao:
            '¿Realmente deseas cancelar tu inscripción en "{evento}"? ¡No podrás inscribirte nuevamente!',

        painelEsteEvento:
            'este evento',

        painelErroCancelarInscricao:
            'No fue posible cancelar la inscripción.',

        painelInscricaoCanceladaSucesso:
            'Inscripción cancelada con éxito.',

        painelQrIndisponivel:
            'El código QR no está disponible para esta inscripción.',

        painelQrInscricaoCancelada:
            'El código QR no está disponible para una inscripción cancelada.',

        painelErroGerarQr:
            'No fue posible generar el código QR.',

        painelUsuarioNaoIdentificado:
            'No fue posible identificar al usuario autenticado.',

        // ======================================================
        // MI CUENTA
        // ======================================================

        contaTituloPagina: 'Mi Cuenta - MBLF Events',
        contaVoltarPainel: 'Volver al Panel',
        contaTitulo: 'Mi Cuenta',
        contaSubtitulo: 'Administra tus datos personales y tu contraseña.',

        contaDadosPessoais: 'Datos personales',
        contaDadosPessoaisDesc: 'Actualiza la información de tu cuenta.',
        contaSalvarAlteracoes: 'Guardar cambios',

        contaSeguranca: 'Seguridad',
        contaSegurancaDesc: 'Cambia tu contraseña de acceso.',
        contaSenhaAtual: 'Contraseña actual',
        contaNovaSenha: 'Nueva contraseña',
        contaConfirmarNovaSenha: 'Confirmar nueva contraseña',
        contaAlterarSenha: 'Cambiar contraseña',

        contaErroCarregar: 'No fue posible cargar los datos de tu cuenta.',
        contaCamposObrigatorios: 'Completa el nombre y el correo electrónico.',
        contaNomeInvalido: 'Ingresa tu nombre completo.',
        contaEmailInvalido: 'Ingresa un correo electrónico válido.',
        contaSalvando: 'Guardando...',
        contaErroSalvar: 'No fue posible guardar los cambios.',
        contaDadosAtualizados: '¡Datos actualizados correctamente!',

        contaPreenchaSenhas: 'Completa todos los campos de contraseña.',
        contaSenhaMinimo: 'La nueva contraseña debe tener al menos 6 caracteres.',
        contaSenhasDiferentes: 'La confirmación de la nueva contraseña no coincide.',
        contaSenhaIgualAtual: 'La nueva contraseña debe ser diferente de la contraseña actual.',
        contaAlterandoSenha: 'Cambiando...',
        contaErroAlterarSenha: 'No fue posible cambiar la contraseña.',
        contaSenhaAlterada: '¡Contraseña cambiada correctamente!',

        // --------------------------------------------------
        // EXPLORAR
        // --------------------------------------------------

        explorarTituloPagina:
            'Explorar Eventos - MBLF Events',

        explorarMeuPainel:
            'Mi Panel',

        explorarBadge:
            'Descubre nuevos eventos',

        explorarTitulo:
            'Encuentra el evento ideal para ti',

        explorarSubtitulo:
            'Explora eventos publicados en la plataforma y consulta fechas, ubicación y plazas disponibles.',

        explorarBuscaPlaceholder:
            'Buscar por título, descripción, tipo o ciudad...',

        explorarEventosDisponiveis:
            'Eventos Disponibles',

        explorarBuscandoEventos:
            'Buscando eventos...',

        explorarLimparBusca:
            'Limpiar búsqueda',

        explorarBuscandoPublicos:
            'Buscando eventos públicos...',

        explorarCtaTitulo:
            '¿Encontraste un evento interesante?',

        explorarCtaTexto:
            'Crea tu cuenta para inscribirte en eventos, acompañar tus participaciones y acceder a tus certificados.',

        explorarCriarConta:
            'Crear Cuenta',

        explorarJaTenhoConta:
            'Ya tengo una cuenta',

        explorarErroCarregar:
            'No fue posible cargar los eventos.',

        explorarVerifiqueApi:
            'Verifica si la API está en ejecución.',

        explorarNenhumEncontrado:
            'No se encontraron eventos',

        explorarNenhumDisponivel:
            'No hay eventos disponibles',

        explorarTenteOutroTermo:
            'Intenta buscar otro término.',

        explorarSemEventosPublicos:
            'Aún no hay eventos públicos disponibles.',

        explorarEventoGenerico:
            'Evento',

        explorarEsgotado:
            'Agotado',

        explorarInscricoesAbertas:
            'Inscripciones abiertas',

        explorarInscricoesFechadas:
            'Inscripciones cerradas',

        explorarAs:
            'a las',

        explorarQuantidadeZero:
            'No hay eventos disponibles.',

        explorarQuantidadeUm:
            '1 evento disponible.',

        explorarQuantidadeVarios:
            '{quantidade} eventos disponibles.',

        explorarBuscaZero:
            'No hay resultados para tu búsqueda.',

        explorarBuscaUm:
            '1 evento encontrado.',

        explorarBuscaVarios:
            '{quantidade} eventos encontrados.',

        explorarLocalNaoInformado:
            'Ubicación no informada',

        explorarVagasNaoInformadas:
            'Cantidad de plazas no informada',

        explorarVagasDisponiveis:
            '{disponiveis} de {total} plazas disponibles',

        explorarDataNaoInformada:
            'Fecha no informada',

        explorarSemDescricao:
            'Sin descripción disponible.',

        footerDescricao:
            'Plataforma para divulgación, participación y gestión de eventos.',

        footerLinksUteis:
            'Enlaces Útiles',

        footerCadastro:
            'Registro',

        footerSuporte:
            'Soporte',

        footerPrivacidade:
            'Política de Privacidad',

        footerTermos:
            'Términos de Uso',

        footerRedesSociais:
            'Redes Sociales',

        footerDireitos:
            '© 2026 MBLF Events. Todos los derechos reservados.',


        // EVENTO
                // --------------------------------------------------
        // EVENTO
        // --------------------------------------------------

        evTituloCriar:
            'Crear Evento',

        evTituloEditar:
            'Editar Evento',

        evSubtituloCriar:
            'Ingrese los datos del evento. Inicialmente se creará como borrador.',

        evSubtituloEditar:
            'Editando: {titulo}',

        evInformacoesBasicas:
            'Información Básica',

        evNomeEvento:
            'Nombre del Evento',

        evNomePlaceholder:
            'Ej: Semana de Tecnología 2026',

        evTipoEvento:
            'Tipo de Evento',

        evTipoPlaceholder:
            'Ej: Conferencia, Taller, Feria, Congreso...',

        evTipoAjuda:
            'Ingrese una clasificación que ayude a identificar el evento.',

        evDescricao:
            'Descripción',

        evDescricaoPlaceholder:
            'Describa el evento, sus objetivos y principales actividades...',

        evDataHora:
            'Fecha y Hora',

        evDataInicio:
            'Inicio',

        evDataFim:
            'Fin',

        evLocalizacao:
            'Ubicación',

        evCidade:
            'Ciudad',

        evCidadePlaceholder:
            'Ej: Limeira',

        evEndereco:
            'Dirección',

        evEnderecoPlaceholder:
            'Ej: Calle de las Flores, 123 - Centro',

        evLocalizacaoAjuda:
            'La dirección y la ciudad se almacenan por separado.',

        evParticipacao:
            'Participación',

        evVagas:
            'Cupos',

        evVagasTotal:
            'Total de Cupos',

        evVagasAjuda:
            'La cantidad de cupos disponibles comenzará automáticamente con este valor.',

        evCargaHoraria:
            'Carga Horaria',

        evHoras:
            'horas',

        evCargaHorariaAjuda:
            'Esta información podrá utilizarse en los certificados del evento.',

        evComoFunciona:
            '¿Cómo funciona?',

        evPassoCriarTitulo:
            'Cree el evento',

        evPassoCriarDescricao:
            'El evento comienza como borrador y todavía no aparece para el público.',

        evPassoHubTitulo:
            'Active el Hub',

        evPassoHubDescricao:
            'Con un plan de Hub activo, podrá trabajar con colaboradores, tareas, calendario, chat y otras herramientas de organización.',

        evPassoPublicarTitulo:
            'Publique',

        evPassoPublicarDescricao:
            'La publicación se contrata por separado. Después de eso, podrán abrirse las inscripciones.',

        evStatus:
            'Estado',

        evEvento:
            'Evento',

        evHub:
            'Hub',

        evPublicacao:
            'Publicación',

        evCriar:
            'Crear Evento',

        evSalvar:
            'Guardar Cambios',

        evCancelar:
            'Cancelar',

        evCriarNaoPublica:
            'Crear el evento no lo publica automáticamente.',

        evStatusNovo:
            'Nuevo',

        evStatusRascunho:
            'Borrador',

        evStatusPublicado:
            'Publicado',

        evStatusEncerrado:
            'Finalizado',

        evStatusCancelado:
            'Cancelado',

        evStatusRemovido:
            'Eliminado',

        evStatusAtivo:
            'Activo',

        evStatusInativo:
            'Inactivo',

        evStatusAtiva:
            'Activa',

        evStatusInativa:
            'Inactiva',

        evDataFimPosterior:
            'La fecha de finalización debe ser posterior a la fecha de inicio.',

        evErroCarregar:
            'No fue posible cargar el evento.',

        evSemPermissaoEditar:
            'No tiene permiso para editar este evento.',

        evSalvando:
            'Guardando...',

        evErroAtualizar:
            'No fue posible actualizar el evento.',

        evErroCriar:
            'No fue posible crear el evento.',

        evSucessoAtualizar:
            '¡Evento actualizado correctamente!',

        evSucessoCriar:
            '¡Evento creado correctamente! Se guardó como borrador.',

        evErroSalvar:
            'No fue posible guardar el evento.',

        evValidacaoNome:
            'Ingrese el nombre del evento.',

        evValidacaoDatas:
            'Ingrese la fecha de inicio y la fecha de finalización.',

        evValidacaoDatasValidas:
            'Ingrese fechas válidas.',

        evValidacaoDataPassado:
            'La fecha de inicio del evento no puede estar en el pasado.',

        evValidacaoVagas:
            'La cantidad de cupos no puede ser negativa.',

        evValidacaoCargaHoraria:
            'La carga horaria no puede ser negativa.',


        // --------------------------------------------------
// HUB DEL EVENTO
// --------------------------------------------------

hubTituloPagina: 'Hub del Evento - MBLF Events',
hubVoltarPainel: 'Volver al Panel',

hubTitulo: 'Hub del Evento',
hubSubtitulo: 'Centro de gestión y colaboración del evento.',
hubAtivo: 'Hub Activo',
hubOrganizador: 'Organizador',
hubVerEvento: 'Ver Evento',

hubVisaoGeral: 'Vista General',
hubColaboradores: 'Colaboradores',
hubInscritos: 'Inscritos',
hubPresencas: 'Asistencias',
hubAgenda: 'Agenda',
hubTarefas: 'Tareas',
hubChat: 'Chat',
hubCertificados: 'Certificados',

hubInformacoes: 'Información del Hub',
hubValidoAte: 'Hub válido hasta',
hubSuaFuncao: 'Tu función',

hubCarregando: 'Cargando Hub...',
hubErroAcessoTitulo: 'No fue posible acceder al Hub',
hubErroAcessoTexto: 'Comprueba tus permisos e inténtalo de nuevo.',

// COLABORADORES

hubColaboradoresDescricao:
    'Gestiona las personas que ayudan en la organización de este evento.',

hubCarregandoColaboradores:
    'Cargando colaboradores...',

hubConvidarColaborador:
    'Invitar Colaborador',

hubConviteEmail:
    'Correo electrónico del colaborador',

hubConviteEmailPlaceholder:
    'correo@ejemplo.com',

hubConviteEmailAjuda:
    'El usuario debe tener una cuenta en MBLF Events.',

hubEnviarConvite:
    'Enviar Invitación',

hubFuncao:
    'Función',

hubFuncaoPlaceholder:
    'Ej: Organización, Recepción, Apoyo...',

hubPermissoesColaborador:
    'Permisos del Colaborador',

hubPermVerInscritos:
    'Ver inscritos',

hubPermRegistrarPresencas:
    'Registrar asistencias',

hubPermAcessarCalendario:
    'Acceder a la agenda',

hubPermAcessarTarefas:
    'Acceder a las tareas',

hubPermAcessarChat:
    'Acceder al chat',

hubPermLiberarCertificados:
    'Liberar certificados',

hubPermVerRelatorios:
    'Ver informes',

hubPermSilenciarParticipantes:
    'Silenciar participantes',

hubPermExpulsarParticipantes:
    'Expulsar participantes',

hubSalvarPermissoes:
    'Guardar Permisos',

// INSCRITOS

hubInscritosDescricao:
    'Consulta los participantes inscritos en este evento.',

hubCarregandoInscritos:
    'Cargando inscritos...',

hubParticipantesInscritos:
    'Participantes Inscritos',

hubParticipante:
    'Participante',

hubDataInscricao:
    'Fecha de inscripción',

hubStatus:
    'Estado',

// ASISTENCIAS

hubPresencasConfirmadas:
    'Asistencias Confirmadas',

hubPresencasConfirmadasDescricao:
    'Consulta las asistencias ya registradas en el evento.',

hubCarregandoPresencas:
    'Cargando asistencias...',

hubRegistrarPresenca:
    'Registrar Asistencia',

hubRegistrarPresencaDescricao:
    'Introduce o escanea el token del código QR de la inscripción.',

hubTokenQr:
    'Token del Código QR',

hubTokenPlaceholder:
    'Introduce o escanea el token',

hubConfirmarPresenca:
    'Confirmar Asistencia',

// AGENDA

hubAgendaEquipe:
    'Agenda del Equipo',

hubAgendaEquipeDescricao:
    'Organiza compromisos, reuniones, plazos y actividades del evento.',

hubAtualizarAgenda:
    'Actualizar Agenda',

hubCarregandoAgenda:
    'Cargando agenda...',

hubAgendaAdicionar:
    'Añadir a la Agenda',

hubAgendaNovoItem:
    'Nuevo Elemento de la Agenda',

hubAgendaNovoItemDescricao:
    'Añade un compromiso a la agenda del equipo.',

hubCampoTitulo:
    'Título',

hubAgendaTituloPlaceholder:
    'Ej: Reunión con el equipo',

hubCampoDescricao:
    'Descripción',

hubAgendaDescricaoPlaceholder:
    'Añade detalles sobre este compromiso...',

hubCampoTipo:
    'Tipo',

hubAgendaTipoReuniao:
    'Reunión',

hubAgendaTipoAtividade:
    'Actividad',

hubAgendaTipoPrazo:
    'Plazo',

hubAgendaTipoLembrete:
    'Recordatorio',

hubAgendaTipoOutro:
    'Otro',

hubCampoInicio:
    'Inicio',

hubCampoFim:
    'Fin',

hubAgendaFimOpcional:
    'Opcional',

// TAREAS

hubTarefasEquipe:
    'Tareas del Equipo',

hubTarefasEquipeDescricao:
    'Crea y sigue las actividades necesarias para organizar el evento.',

hubAtualizarTarefas:
    'Actualizar Tareas',

hubCarregandoTarefas:
    'Cargando tareas...',

hubCriarTarefa:
    'Crear Tarea',

hubNovaTarefa:
    'Nueva Tarea',

hubNovaTarefaDescricao:
    'Crea una nueva actividad para el equipo.',

hubTarefaTituloPlaceholder:
    'Ej: Preparar acreditación',

hubTarefaDescricaoPlaceholder:
    'Describe lo que debe hacerse...',

hubPrioridade:
    'Prioridad',

hubPrioridadeBaixa:
    'Baja',

hubPrioridadeMedia:
    'Media',

hubPrioridadeAlta:
    'Alta',

hubPrioridadeUrgente:
    'Urgente',

hubResponsavel:
    'Responsable',

hubSemResponsavel:
    'Sin responsable',

hubResponsavelAjuda:
    'Puedes dejar la tarea sin responsable.',

// CHAT

hubChatEquipe:
    'Chat del Equipo',

hubChatEquipeDescricao:
    'Habla con los integrantes que organizan este evento.',

hubAtualizarMensagens:
    'Actualizar Mensajes',

hubCarregandoMensagens:
    'Cargando mensajes...',

hubChatPlaceholder:
    'Escribe un mensaje...',

// CERTIFICADOS

hubCertificadosDescricao:
    'Gestiona la liberación de los certificados de este evento.',

hubLiberarCertificados:
    'Liberar Certificados',

hubCarregandoCertificados:
    'Cargando certificados...',

hubVerificandoCertificados:
    'Comprobando certificados...',

hubVerificandoCertificadosDescricao:
    'Espera mientras comprobamos la disponibilidad de los certificados.',

hubCertificadosIndisponiveis:
    'Los certificados aún no están disponibles',

hubCertificadosDepoisEvento:
    'Los certificados podrán liberarse después de que finalice el evento.',

hubNenhumCertificado:
    'Ningún certificado generado',

// --------------------------------------------------
// HUB - MENSAJES DINÁMICOS DE JAVASCRIPT
// --------------------------------------------------

hubEventoNaoInformado:
    'No se indicó ningún evento.',

hubErroCarregar:
    'No fue posible cargar el Hub.',

hubErroCarregarEvento:
    'No fue posible cargar el evento.',

hubEventoGenerico:
    'Evento',

hubNaoInformado:
    'No informado',

hubDataNaoInformada:
    'Fecha no informada',

hubOrganizadorNaoInformado:
    'Organizador no informado',

// COLABORADORES

hubErroCarregarColaboradores:
    'No fue posible cargar los colaboradores.',

hubNenhumColaborador:
    'No se encontraron colaboradores.',

hubNenhumColaboradorDescricao:
    'Aún no hay colaboradores activos en este evento.',

hubColaborador:
    'Colaborador',

hubConvitePendente:
    'Invitación pendiente',

hubConviteAceito:
    'Invitación aceptada',

hubConviteRecusado:
    'Invitación rechazada',

hubInformeEmailUsuario:
    'Ingresa el correo electrónico del colaborador.',

hubEnviandoConvite:
    'Enviando invitación...',

hubErroEnviarConvite:
    'No fue posible enviar la invitación.',

hubConviteEnviado:
    '¡Invitación enviada correctamente!',

hubErroSalvarPermissoes:
    'No fue posible guardar los permisos.',

hubPermissoesSalvas:
    '¡Permisos guardados correctamente!',

hubSalvandoPermissoes:
    'Guardando permisos...',

// INSCRITOS

hubErroCarregarInscritos:
    'No fue posible cargar los inscritos.',

hubNenhumInscrito:
    'No hay participantes inscritos.',

hubStatusInscrito:
    'Inscrito',

hubStatusPresente:
    'Presente',

hubStatusCancelado:
    'Cancelado',

hubStatusNaoInformado:
    'Estado no informado',

// ASISTENCIAS

hubErroCarregarPresencas:
    'No fue posible cargar las asistencias.',

hubNenhumaPresenca:
    'No hay asistencias registradas',

hubNenhumaPresencaDescricao:
    'Las asistencias confirmadas aparecerán aquí.',

hubPresencaConfirmada:
    'Asistencia confirmada',

hubSemPermissaoRegistrarPresenca:
    'No tienes permiso para registrar asistencias.',

hubInformeToken:
    'Ingresa el token del código QR.',

hubRegistrandoPresenca:
    'Registrando asistencia...',

hubErroRegistrarPresenca:
    'No fue posible registrar la asistencia.',

hubPresencaRegistradaSucesso:
    '¡Asistencia registrada correctamente!',

// AGENDA

hubErroCarregarAgenda:
    'No fue posible cargar la agenda.',

hubAgendaVazia:
    'No hay elementos en la agenda.',

hubAgendaVaziaDescricao:
    'Los compromisos del equipo aparecerán aquí.',

hubInformeTituloAgenda:
    'Ingresa el título del compromiso.',

hubInformeInicioAgenda:
    'Ingresa la fecha y hora de inicio.',

hubAgendaAntesEvento:
    'No es posible añadir un compromiso antes del inicio del evento.',

hubAgendaFimAntesInicio:
    'La hora de finalización no puede ser anterior a la hora de inicio.',

hubSalvandoAgenda:
    'Guardando...',

hubErroCriarAgenda:
    'No fue posible añadir el elemento a la agenda.',

hubAgendaCriada:
    '¡Elemento añadido a la agenda correctamente!',

// TAREAS

hubErroCarregarTarefas:
    'No fue posible cargar las tareas.',

hubNenhumaTarefa:
    'No se encontraron tareas.',

hubNenhumaTarefaDescricao:
    'Las tareas creadas para el equipo aparecerán aquí.',

hubInformeTituloTarefa:
    'Ingresa el título de la tarea.',

hubCriandoTarefa:
    'Creando...',

hubErroCriarTarefa:
    'No fue posible crear la tarea.',

hubTarefaCriada:
    '¡Tarea creada correctamente!',

hubErroAtualizarTarefa:
    'No fue posible actualizar la tarea.',

hubConfirmarExcluirTarefa:
    '¿Realmente deseas eliminar esta tarea?',

hubErroExcluirTarefa:
    'No fue posible eliminar la tarea.',

hubPrioridadeNaoInformada:
    'No informada',

hubStatusTarefaPendente:
    'Pendiente',

hubStatusTarefaEmAndamento:
    'En progreso',

hubStatusTarefaConcluida:
    'Completada',

hubStatusTarefaCancelada:
    'Cancelada',

// CHAT

hubErroCarregarMensagens:
    'No fue posible cargar los mensajes.',

hubNenhumaMensagem:
    'No se enviaron mensajes.',

hubNenhumaMensagemDescricao:
    'Los mensajes del equipo aparecerán aquí.',

hubDigiteMensagem:
    'Escribe un mensaje.',

hubEnviandoMensagem:
    'Enviando...',

hubErroEnviarMensagem:
    'No fue posible enviar el mensaje.',

// CERTIFICADOS

hubErroCarregarCertificados:
    'No fue posible cargar los certificados.',

hubCertificado:
    'Certificado',

hubCertificadoPendente:
    'Pendiente',

hubCertificadoLiberado:
    'Liberado',

hubCertificadoGerado:
    'Generado',

hubEventoAindaNaoTerminou:
    'Los certificados solo pueden liberarse después de que finalice el evento.',

hubNenhumPresenteCertificado:
    'No hay participantes con asistencia confirmada para recibir un certificado.',

hubConfirmarLiberarCertificados:
    '¿Deseas liberar los certificados de los participantes con asistencia confirmada?',

hubLiberandoCertificados:
    'Liberando certificados...',

hubCertificadosLiberadosSucesso:
    '¡Certificados liberados correctamente!',

hubErroLiberarCertificados:
    'No fue posible liberar los certificados.',

    // --------------------------------------------------
// HUB - MENSAJES DINÁMICOS ADICIONALES
// --------------------------------------------------

// GENERAL / ACCESO

hubEventoNaoEncontrado:
    'Evento no encontrado.',

hubSemAcesso:
    'No tienes acceso a este Hub.',

hubUsuario:
    'Usuario',

hubVoce:
    'Tú',

hubNaoDefinido:
    'No definido',

hubExcluir:
    'Eliminar',

hubPermissoes:
    'Permisos',

hubInscricao:
    'Inscripción',

hubTarefa:
    'Tarea',

hubCargaHoraria:
    'Carga horaria',

hubPrazo:
    'Plazo',

// PERFILES

hubPerfilAdmin:
    'Administrador',

hubPerfilFuncionario:
    'Personal',

perfilAluno:
    'Alumno',

perfilProfessor:
    'Profesor',

perfilMonitor:
    'Monitor',

perfilPalestrante:
    'Ponente',

// COLABORADORES / PERMISOS

hubColaboradorInvalido:
    'Colaborador no válido.',

hubColaboradorNaoEncontrado:
    'Colaborador no encontrado.',

hubNenhumColaboradorDesc:
    'Aún no hay colaboradores en este evento.',

hubSomenteOrganizadorConvida:
    'Solo el organizador puede invitar colaboradores.',

hubSomenteOrganizadorPermissoes:
    'Solo el organizador puede cambiar los permisos de los colaboradores.',

hubPermissoesAtualizadas:
    '¡Permisos actualizados correctamente!',

// ESTADO DE LOS COLABORADORES

hubStatusAtivo:
    'Activo',

hubStatusConvitePendente:
    'Invitación pendiente',

hubStatusRecusado:
    'Rechazado',

hubStatusExpulso:
    'Expulsado',

// AGENDA

hubAgendaItemSemTitulo:
    'Compromiso sin título',

hubInformeTipoAgenda:
    'Selecciona el tipo de compromiso.',

hubAdicionandoAgenda:
    'Añadiendo...',

hubErroAdicionarAgenda:
    'No fue posible añadir el compromiso a la agenda.',

hubAgendaAdicionadaSucesso:
    '¡Compromiso añadido a la agenda correctamente!',

hubSemPermissaoAgenda:
    'No tienes permiso para gestionar la agenda.',

// TAREAS

hubStatusPendente:
    'Pendiente',

hubStatusEmAndamento:
    'En progreso',

hubStatusConcluida:
    'Completada',

hubStatusCancelada:
    'Cancelada',

hubSemResponsavelDefinido:
    'Sin responsable definido',

hubSemPermissaoTarefas:
    'No tienes permiso para gestionar las tareas.',

// CHAT

hubErroCarregarChat:
    'No fue posible cargar los mensajes del chat.',

hubSemPermissaoChat:
    'No tienes permiso para utilizar el chat.',

// CERTIFICADOS

hubEventoEncerrado:
    'Evento finalizado',

hubAguardandoLiberacao:
    'Esperando liberación',

hubCertificadoDisponivel:
    'Certificado disponible',

hubCertificadoLiberadoEm:
    'Certificado liberado el {data}',

hubNenhumCertificadoDescricao:
    'Los certificados de los participantes aparecerán aquí cuando estén disponibles.',

hubCertificadosSomenteDepoisEvento:
    'Los certificados solo pueden liberarse después de que finalice el evento.',

hubCertificadosPodemSerLiberados:
    'Los certificados ya pueden liberarse.',

hubSemPermissaoCertificados:
    'No tienes permiso para liberar certificados.',

hubErroGerarCertificadoParticipante:
    'No fue posible generar el certificado del participante.',

hubErroLiberarCertificadoParticipante:
    'No fue posible liberar el certificado del participante.',

hubCertificadosProcessadosSucesso:
    '¡Certificados procesados correctamente!',

hubCertificadosProcessadosComFalhas:
    'Los certificados fueron procesados, pero ocurrieron algunos errores.',

hubCopyright:
    '© 2026 MBLF Events. Todos los derechos reservados.',


        // DETALHES

                // --------------------------------------------------
        // DETALLES DEL EVENTO
        // --------------------------------------------------
        detEntrarInscrever:
            'Iniciar Sesión para Inscribirse',

        detFacaLoginInscricao:
            'Inicia sesión para inscribirte en este evento.',

        detCarregandoEvento:
            'Cargando evento...',

        detErroTitulo:
            'No fue posible cargar el evento',

        detErroPadrao:
            'No se encontró el evento solicitado.',

        detVoltarEventos:
            'Volver a los Eventos',

        detInformacoesEvento:
            'Información del Evento',

        detInicio:
            'Inicio',

        detTermino:
            'Finalización',

        detGarantirVaga:
            'Reservar Mi Plaza',

        detVagasDisponiveis:
            'Plazas disponibles',

        detAjudaInscricao:
            'Tu inscripción estará disponible en tu panel junto con el código QR.',

        detCtaTitulo:
            'Participa en los eventos de MBLF Events',

        detCtaTexto:
            'Crea tu cuenta para inscribirte en eventos, seguir tu participación y acceder a tus códigos QR y certificados.',

        detEvento:
            'Evento',

        detOrganizadorNaoInformado:
            'Organizador no informado',

        detSemDescricao:
            'No hay descripción disponible.',

        detNaoInformada:
            'No informada',

        detNaoInformado:
            'No informado',

        detEnderecoNaoInformado:
            'Dirección no informada.',

        detCidadeNaoInformada:
            'Ciudad no informada',

        detLocalNaoInformado:
            'Ubicación no informada',

        detHoras:
            '{horas} horas',

        detSemLimite:
            'sin límite informado',

        detVagasNaoInformadas:
            'Cantidad de plazas no informada',

        detQuantidadeVagas:
            '{disponiveis} de {total} plazas',

        detStatusPublicado:
            'Publicado',

        detStatusEncerrado:
            'Finalizado',

        detStatusCancelado:
            'Cancelado',

        detStatusRemovido:
            'Eliminado',

        detStatusRascunho:
            'Borrador',

        detEventoNaoDisponivel:
            'Evento no disponible para inscripción',

        detEventoNaoPublicado:
            'Este evento no está publicado.',

        detPublicacaoEncerrada:
            'Publicación finalizada',

        detPublicacaoTerminou:
            'El período de publicación de este evento ha finalizado.',

        detInscricoesFechadas:
            'Inscripciones Cerradas',

        detInscricoesFechadasAjuda:
            'Las inscripciones para este evento están cerradas.',

        detEventoEsgotado:
            'Evento Completo',

        detSemVagas:
            'No hay más plazas disponibles.',

        detVoceOrganizador:
            'Eres el Organizador',

        detOrganizadorNaoInscreve:
            'El organizador no necesita inscribirse en su propio evento.',

        detPresencaConfirmada:
            'Asistencia Confirmada',

        detPresencaRegistrada:
            'Tu asistencia a este evento ya fue registrada.',

        detInscricaoCancelada:
            'Inscripción Cancelada',

        detInscricaoCanceladaExistente:
            'Ya tienes una inscripción cancelada para este evento.',

        detVoceInscrito:
            'Estás inscrito',

        detCancelarInscricao:
            'Cancelar Inscripción',

        detPodeCancelar:
            'Puedes cancelar tu inscripción en este evento.',

        detInscreverAgora:
            'Inscribirse Ahora',

        detProcessandoInscricao:
            'Procesando inscripción...',

        detErroInscricao:
            'No fue posible realizar la inscripción.',

        detInscricaoSucesso:
            '¡Inscripción realizada correctamente! Tu código QR ya está disponible en tu panel.',

        detInscricaoConfirmada:
            'Inscripción Confirmada',

        detConsulteQr:
            'Consulta tu código QR en tu panel.',

        detConfirmarCancelamento:
            '¿Deseas realmente cancelar tu inscripción en este evento?',

        detCancelandoInscricao:
            'Cancelando inscripción...',

        detErroCancelar:
            'No fue posible cancelar la inscripción.',

        detCancelamentoSucesso:
            'Inscripción cancelada correctamente.',

        detErroEventosPublicos:
            'No fue posible cargar los eventos públicos.',

        detEventoNaoEncontrado:
            'Este evento no fue encontrado o no está disponible para el público.',

        detErroCarregarEvento:
            'No fue posible cargar el evento.',

        detCompartilhado:
            '¡Enlace del evento copiado!',

        detErroCompartilhar:
            'No fue posible compartir el evento.',

        detSobreEvento: 'Sobre el Evento',
        detProgramacao: 'Programación del Evento',
        detPalestrantes: 'Ponentes e Invitados',
        detLocalizacao: 'Lugar del Evento',
        detGarantirVaga: 'Reservar Mi Plaza',
        detInscricoesAbertas: 'Inscripciones Abiertas',
        detOrganizadoPor: 'Organizado por',
        detCompartilhar: 'Compartir Evento',
        btnInscreverSe: 'Inscribirse Ahora',
        detDataEHora: 'Fecha y Hora',
        detVagasRestantes: 'plazas restantes',


        // FOOTER

        ftDescricao:
            'Solución integrada para la gestión de eventos académicos y corporativos.',

        ftLinks: 'Enlaces',
        ftLinksUteis: 'Enlaces Útiles',
        ftPlataforma: 'Plataforma',
        ftSuporte: 'Soporte',
        ftContato: 'Contacto',
        ftPrivacidade: 'Política de Privacidad',
        ftTermos: 'Términos de Uso',
        ftLogin: 'Iniciar sesión',
        ftCadastro: 'Registro',

        footerTexto:
            '© 2026 MBLF Events. Todos los derechos reservados.',

        recursosBadge:
            'Recursos',

        recursosTitulo:
            'Recursos de la Plataforma',

        recursosSubtitulo:
            'Desde la planificación hasta los certificados, MBLF Events reúne herramientas para diferentes etapas de un evento.',

        recursosCtaTitulo:
            '¿Listo para explorar?',

        recursosCtaTexto:
            'Consulta los eventos disponibles o crea tu cuenta.',

        recursosFooterDescricao:
            'Una solución integrada para la gestión de eventos.',

        recursosTituloPagina:
            'Recursos - MBLF Events',


        // --------------------------------------------------
        // RECURSOS - TARJETAS
        // --------------------------------------------------

        recursosGestaoTitulo:
            'Gestión de Eventos',

        recursosGestaoTexto:
            'Crea, edita y gestiona eventos definiendo información, fechas, ubicación, plazas y duración.',

        recursosPublicacaoTitulo:
            'Publicación',

        recursosPublicacaoTexto:
            'Controla cuándo un evento está disponible para el público y gestiona la apertura de las inscripciones.',

        recursosInscricoesTitulo:
            'Inscripciones',

        recursosInscricoesTexto:
            'Los participantes pueden inscribirse en eventos, consultar sus inscripciones y acompañar su estado.',

        recursosQrTitulo:
            'Asistencia mediante Código QR',

        recursosQrTexto:
            'Cada inscripción posee una identificación que permite registrar y acompañar la asistencia a los eventos.',

        recursosHubTitulo:
            'Hub del Evento',

        recursosHubTexto:
            'Un centro de gestión donde organizadores y colaboradores pueden trabajar juntos durante el evento.',

        recursosColaboradoresTitulo:
            'Colaboradores y Permisos',

        recursosColaboradoresTexto:
            'Invita a personas a colaborar en la organización y define individualmente a qué herramientas pueden acceder.',

        recursosOrganizacaoTitulo:
            'Agenda, Tareas y Chat',

        recursosOrganizacaoTexto:
            'Organiza compromisos, distribuye tareas y mantén al equipo conectado mediante el chat interno del Hub.',

        recursosCertificadosTitulo:
            'Certificados',

        recursosCertificadosTexto:
            'Después de finalizar el evento, los certificados pueden liberarse para los participantes con asistencia confirmada.',

        recursosEcossistemaTitulo:
            'Ecosistema Integrado',

        recursosEcossistemaTexto:
            'Web, Mobile y Desktop comparten información mediante una API y una base de datos centralizada.',

        // --------------------------------------------------
        // SOBRE
        // --------------------------------------------------

        sobreTituloPagina:
            'Sobre - MBLF Events',

        sobreBadge:
            'Quiénes somos',

        sobreTitulo:
            'Sobre MBLF Events',

        sobreSubtitulo:
            'Una plataforma creada para facilitar la organización, participación y gestión de eventos académicos y corporativos.',

        sobreMissaoTitulo:
            'Nuestra Misión',

        sobreMissaoTexto:
            'Simplificar la creación, organización y participación en eventos mediante una plataforma integrada, accesible e intuitiva.',

        sobreVisaoTitulo:
            'Nuestra Visión',

        sobreVisaoTexto:
            'Crear un ecosistema integrado entre Web, Mobile, Desktop y API, centralizando la información y los procesos de los eventos.',

        sobreValoresTitulo:
            'Nuestros Valores',

        sobreValoresTexto:
            'Organización, colaboración, seguridad, accesibilidad, innovación y una experiencia sencilla para todos los usuarios.',

        sobreProjetoLabel:
            'EL PROYECTO',

        sobreProjetoTitulo:
            'Un sistema conectado de principio a fin',

        sobreProjetoTexto1:
            'MBLF Events reúne recursos para organizadores, participantes, colaboradores y administradores, manteniendo la información centralizada mediante una API.',

        sobreProjetoTexto2:
            'El sistema permite acompañar todo el ciclo de un evento: creación, publicación, inscripción, colaboración, asistencia y liberación de certificados.',

        sobreEquipeTitulo:
            'Conoce a Nuestro Equipo',

        sobreEquipeTexto:
            'El proyecto se divide en diferentes plataformas, y cada integrante es responsable de un área del ecosistema MBLF Events.',

        sobreEquipeWebTexto:
            'Responsable de la plataforma Web, las interfaces, la experiencia del usuario y la integración del front-end con la API.',

        sobreEquipeApiTexto:
            'Responsable de la API REST, las reglas de negocio, la autenticación y la integración con la base de datos central.',

        sobreEquipeMobileTexto:
            'Responsable de la aplicación móvil y de las funcionalidades orientadas a la experiencia en dispositivos móviles.',

        sobreEquipeDesktopTexto:
            'Responsable del software Desktop y de las herramientas locales integradas al ecosistema.',

        sobreCtaTitulo:
            'Conoce la plataforma',

        sobreCtaTexto:
            'Explora eventos o crea tu cuenta para utilizar los recursos del sistema.',

        // --------------------------------------------------
        // CONTACTO
        // --------------------------------------------------

        contatoTituloPagina:
            'Contacto - MBLF Events',

        contatoBadge:
            'Soporte',

        contatoTitulo:
            'Contáctanos',

        contatoSubtitulo:
            '¿Encontraste algún problema? ¿Tienes una sugerencia, duda o comentario? Envía un mensaje a nuestro equipo.',

        contatoCanaisTitulo:
            'Canales de contacto',

        contatoEmailTitulo:
            'Correo electrónico',

        contatoSugestoesTitulo:
            'Sugerencias',

        contatoSugestoesTexto:
            'Las ideas, comentarios y sugerencias para mejorar la plataforma son bienvenidos.',

        contatoPrivacidadeTitulo:
            'Privacidad',

        contatoPrivacidadeTexto:
            'Utiliza el formulario únicamente para proporcionar la información necesaria para la atención.',

        contatoFormTitulo:
            'Envíanos un mensaje',

        contatoFormTexto:
            'Completa los campos a continuación. El mensaje será enviado al equipo de MBLF Events.',

        contatoNome:
            'Nombre *',

        contatoNomePlaceholder:
            'Tu nombre',

        contatoEmail:
            'Tu correo electrónico *',

        contatoEmailPlaceholder:
            'tucorreo@email.com',

        contatoAssunto:
            'Asunto *',

        contatoAssuntoSelecione:
            'Selecciona',

        contatoAssuntoDuvida:
            'Duda',

        contatoAssuntoProblema:
            'Informar un problema',

        contatoAssuntoSugestao:
            'Sugerencia',

        contatoAssuntoComentario:
            'Comentario',

        contatoAssuntoOutro:
            'Otro',

        contatoMensagem:
            'Mensaje *',

        contatoMensagemPlaceholder:
            'Cuéntanos cómo podemos ayudarte...',

        contatoEnviar:
            'Enviar Mensaje',

        contatoCamposObrigatorios:
            'Completa todos los campos obligatorios.',

        contatoWeb3FormsNaoConfigurado:
            'El formulario aún no ha sido configurado correctamente.',

        contatoEnviando:
            'Enviando...',

        contatoErroEnviar:
            'No se pudo enviar el mensaje.',

        contatoSucesso:
            '¡Mensaje enviado correctamente! Gracias por contactar con MBLF Events.',

        contatoErroTenteNovamente:
            'No se pudo enviar tu mensaje. Inténtalo de nuevo más tarde.',

                // --------------------------------------------------
        // ACTIVAR HUB
        // --------------------------------------------------

        ativarHubTitulo:
            'Activar Hub del Evento',

        ativarHubSubtitulo:
            'Contrata un plan para desbloquear las herramientas de gestión y colaboración.',

        ativarHubCarregando:
            'Cargando planes del Hub...',

        ativarHubErroTitulo:
            'No fue posible cargar el Hub',

        ativarHubErroPadrao:
            'Verifica el evento e inténtalo nuevamente.',

        ativarHubValidoAte:
            'Hub válido hasta',

        ativarHubNaoContratado:
            'No contratado',

        ativarHubEscolherPlano:
            'Elige un plan para el Hub',

        ativarHubPlanoDescricao:
            'El período contratado desbloquea las herramientas internas del evento.',

        ativarHubBuscandoPlanos:
            'Buscando planes...',

        ativarHubLiberaTitulo:
            '¿Qué desbloquea el Hub?',

        ativarHubColaboradoresDesc:
            'Invita personas para ayudar en la organización.',

        ativarHubInscritosDesc:
            'Acompaña a los participantes inscritos en el evento.',

        ativarHubPresencasDesc:
            'Registra la asistencia utilizando el código QR de los participantes.',

        ativarHubFerramentasEquipe:
            'Herramientas del equipo',

        ativarHubFerramentasEquipeDesc:
            'La agenda, las tareas y el chat podrán utilizarse según los permisos.',

        ativarHubAtivoTitulo:
            '¡Hub activo!',

        ativarHubAtivoDescricao:
            'Las herramientas internas de este evento ya están disponibles.',

        ativarHubNenhumEvento:
            'No se informó ningún evento.',

        ativarHubErroCarregar:
            'No fue posible cargar el Hub.',

        ativarHubErroCarregarEvento:
            'No fue posible cargar el evento.',

        ativarHubSomenteOrganizador:
            'Solo el organizador puede contratar planes para este evento.',

        ativarHubErroCarregarPlanos:
            'No fue posible cargar los planes.',

        ativarHubNenhumPlano:
            'No hay planes de Hub disponibles en este momento.',

        ativarHubPlanoPadrao:
            'Plan Hub',

        ativarHubDia:
            '{duracao} día de acceso al Hub',

        ativarHubDias:
            '{duracao} días de acceso al Hub',

        ativarHubDuracaoNaoInformada:
            'Duración no informada',

        ativarHubSelecionarPlano:
            'Seleccionar Plan',

        ativarHubPlanoNaoEncontrado:
            'Plan no encontrado.',

        ativarHubConfirmarPlano:
            '¿Deseas contratar el plan "{nome}" por {valor}?',

        ativarHubErroContratar:
            'No fue posible contratar el plan.',

        ativarHubSucessoContratar:
            '¡Plan contratado correctamente! El Hub fue activado.',

        ativarHubErroAtualizarEvento:
            'El plan fue procesado, pero no fue posible actualizar el evento.',

        ativarHubAtivo:
            'Hub Activo',

        ativarHubInativo:
            'Hub Inactivo',

        ativarHubExpiradoEm:
            'Expirado el {data}',

                    // --------------------------------------------------
        // PUBLICAR EVENTO
        // --------------------------------------------------

        pubTituloPagina:
            'Publicar Evento - MBLF Events',

        pubTitulo:
            'Publicar Evento',

        pubSubtitulo:
            'Contrata un plan de publicación y abre las inscripciones de tu evento.',

        pubCarregandoEvento:
            'Cargando información del evento...',

        pubErroTitulo:
            'No fue posible cargar esta página',

        pubVoltarPainel:
            'Volver al Panel',

        pubEvento:
            'Evento',

        pubValidaAte:
            'Publicación válida hasta',

        pubEscolhaPlano:
            'Elige un plan de publicación',

        pubEscolhaPlanoDesc:
            'El plan define durante cuánto tiempo el evento estará disponible públicamente.',

        pubBuscandoPlanos:
            'Buscando planes...',

        pubContratePublicacao:
            'Contrata la publicación',

        pubContratePublicacaoDesc:
            'Elige un plan disponible para activar el período de publicación.',

        relTitulo: 'Informe del evento',
        relExportarPdf: 'Exportar PDF',
        hubVoltar: 'Volver al Hub',

        pubAbraInscricoes:
            'Abre las inscripciones',

        pubAbraInscricoesDesc:
            'Con una publicación activa, podrás abrir las inscripciones.',

        pubEventoPublico:
            'Evento público',

        pubEventoPublicoDesc:
            'Después de eso, el evento aparecerá en la página Explorar Eventos.',

        pubAbrirInscricoes:
            'Abrir inscripciones',

        pubDisponivelPublico:
            '¡Evento disponible para el público!',

        pubDisponivelPublicoDesc:
            'Las inscripciones están abiertas y tu evento ya puede aparecer en la página de eventos públicos.',

        pubCopyright:
            '© 2026 MBLF Events. Todos los derechos reservados.',

        pubEventoNaoInformado:
            'No se informó ningún evento.',

        pubErroCarregarEvento:
            'No fue posible cargar el evento.',

        pubSomenteOrganizador:
            'Solo el organizador puede gestionar la publicación de este evento.',

        pubEventoGenerico:
            'Evento',

        pubNaoContratada:
            'No contratada',

        pubErroCarregarPlanos:
            'No fue posible cargar los planes.',

        pubNenhumPlanoDisponivel:
            'No hay planes de publicación disponibles en este momento.',

        pubPlanoGenerico:
            'Plan de Publicación',

        pubDuracaoDias:
            '{duracao} día{s} de publicación',

        pubDuracaoNaoInformada:
            'Duración no informada',

        pubBadgePublicacao:
            'Publicación',

        pubSelecionarPlano:
            'Seleccionar Plan',

        pubPlanoNaoEncontrado:
            'Plan no encontrado.',

        pubConfirmarContratarPlano:
            '¿Deseas contratar el plan "{plano}" por {valor}?',

        pubErroContratarPlano:
            'No fue posible contratar el plan.',

        pubPlanoContratadoSucesso:
            '¡Plan contratado con éxito! La publicación del evento fue activada.',

        pubPlanoProcessadoErroAtualizar:
            'El plan fue procesado, pero no fue posible actualizar los datos del evento.',

        pubPublicacaoNecessaria:
            'Es necesario tener una publicación activa antes de abrir las inscripciones.',

        pubConfirmarAbrirInscricoes:
            '¿Deseas abrir las inscripciones de este evento? Después de eso, podrá aparecer públicamente.',

        pubAbrindoInscricoes:
            'Abriendo inscripciones...',

        pubErroAbrirInscricoes:
            'No fue posible abrir las inscripciones.',

        pubInscricoesAbertasSucesso:
            '¡Inscripciones abiertas con éxito! El evento ahora está disponible para el público.',

        pubInscricoesAbertas:
            'Inscripciones Abiertas',

        pubInscricoesJaAbertas:
            'Las inscripciones ya están abiertas y el evento está publicado.',

        pubAbrirInscricoesBotao:
            'Abrir Inscripciones',

        pubPublicacaoAtivaAbrir:
            'La publicación está activa. Ahora puedes abrir las inscripciones.',

        pubPrimeiroContratePlano:
            'Primero contrata un plan de publicación.',

        pubStatusPublicado:
            'Publicado',

        pubStatusCancelado:
            'Cancelado',

        pubStatusEncerrado:
            'Finalizado',

        pubStatusRemovido:
            'Eliminado',

        pubStatusRascunho:
            'Borrador',

        pubPublicacaoAtiva:
            'Publicación Activa',

        pubPublicacaoInativa:
            'Publicación Inactiva',

        pubInscricoesFechadas:
            'Inscripciones Cerradas',

        pubValorZero:
            'R$ 0,00',

        pubNaoInformada:
            'No informada',

        pubComoFunciona: '¿Cómo funciona?',
        pubVerEventosPublicos: 'Ver Eventos Públicos',
        pubVerPaginaEvento: 'Ver Página del Evento',

    }

};


// ==========================================================
// IDIOMA ATUAL
// ==========================================================

function obterIdiomaAtual() {

    const idiomaSalvo =
        localStorage.getItem(
            I18N_STORAGE_KEY
        );


    if (
        idiomaSalvo === 'pt' ||
        idiomaSalvo === 'en' ||
        idiomaSalvo === 'es'
    ) {

        return idiomaSalvo;

    }


    return 'pt';

}


// ==========================================================
// TRADUZIR
// ==========================================================

function traduzir(
    chave
) {

    const idioma =
        obterIdiomaAtual();


    return (
        traducoes?.[idioma]?.[chave] ??
        traducoes?.pt?.[chave] ??
        chave
    );

}


// ==========================================================
// APLICAR TRADUÇÕES
// ==========================================================

function aplicarTraducoes() {

    const idioma =
        obterIdiomaAtual();


    // TEXTO

    document
        .querySelectorAll(
            '[data-i18n]'
        )
        .forEach(
            function (elemento) {

                const chave =
                    elemento.getAttribute(
                        'data-i18n'
                    );


                const texto =
                    traducoes?.[idioma]?.[chave] ??
                    traducoes?.pt?.[chave];


                if (
                    texto !== undefined &&
                    texto !== null
                ) {

                    elemento.textContent =
                        texto;

                }

            }
        );


    // PLACEHOLDER

    document
        .querySelectorAll(
            '[data-i18n-placeholder]'
        )
        .forEach(
            function (elemento) {

                const chave =
                    elemento.getAttribute(
                        'data-i18n-placeholder'
                    );


                const texto =
                    traducoes?.[idioma]?.[chave] ??
                    traducoes?.pt?.[chave];


                if (
                    texto !== undefined &&
                    texto !== null
                ) {

                    elemento.setAttribute(
                        'placeholder',
                        texto
                    );

                }

            }
        );


    // TITLE

    document
        .querySelectorAll(
            '[data-i18n-title]'
        )
        .forEach(
            function (elemento) {

                const chave =
                    elemento.getAttribute(
                        'data-i18n-title'
                    );


                const texto =
                    traducoes?.[idioma]?.[chave] ??
                    traducoes?.pt?.[chave];


                if (
                    texto !== undefined &&
                    texto !== null
                ) {

                    elemento.setAttribute(
                        'title',
                        texto
                    );

                }

            }
        );


    // ARIA-LABEL

    document
        .querySelectorAll(
            '[data-i18n-aria-label]'
        )
        .forEach(
            function (elemento) {

                const chave =
                    elemento.getAttribute(
                        'data-i18n-aria-label'
                    );


                const texto =
                    traducoes?.[idioma]?.[chave] ??
                    traducoes?.pt?.[chave];


                if (
                    texto !== undefined &&
                    texto !== null
                ) {

                    elemento.setAttribute(
                        'aria-label',
                        texto
                    );

                }

            }
        );


    // VALUE

    document
        .querySelectorAll(
            '[data-i18n-value]'
        )
        .forEach(
            function (elemento) {

                const chave =
                    elemento.getAttribute(
                        'data-i18n-value'
                    );


                const texto =
                    traducoes?.[idioma]?.[chave] ??
                    traducoes?.pt?.[chave];


                if (
                    texto !== undefined &&
                    texto !== null
                ) {

                    elemento.value =
                        texto;

                }

            }
        );


    // IDIOMA HTML

    const idiomasHtml = {

        pt:
            'pt-BR',

        en:
            'en',

        es:
            'es'

    };


    document.documentElement.lang =
        idiomasHtml[idioma] ||
        'pt-BR';


    atualizarBandeiraIdioma(
        idioma
    );

}


// ==========================================================
// SELECIONAR IDIOMA
// ==========================================================

function selecionarIdioma(
    idioma
) {

    if (
        idioma !== 'pt' &&
        idioma !== 'en' &&
        idioma !== 'es'
    ) {

        return;

    }


    localStorage.setItem(
        I18N_STORAGE_KEY,
        idioma
    );


    aplicarTraducoes();


    // Disparar no document e permitir propagação até window.
    // Assim, páginas que escutam em document e scripts globais que escutam
    // em window recebem o mesmo evento de troca de idioma.
    document.dispatchEvent(
        new CustomEvent(
            'mblf:idiomaAlterado',
            {
                bubbles: true,
                detail: { idioma: idioma }
            }
        )
    );

}

if (
    typeof window.filtrarEventos === 'function'
) {

    window.filtrarEventos();

}


// ==========================================================
// BANDEIRA
// ==========================================================

function atualizarBandeiraIdioma(
    idioma
) {

    const bandeiraVisitante =
        document.getElementById(
            'bandeira-atual'
        );


    const bandeiraLogado =
        document.getElementById(
            'bandeira-atual-logado'
        );


    const configuracoes = {

        pt: {

            src:
                'https://flagcdn.com/24x18/br.png',

            alt:
                'Português'

        },

        en: {

            src:
                'https://flagcdn.com/24x18/us.png',

            alt:
                'English'

        },

        es: {

            src:
                'https://flagcdn.com/24x18/es.png',

            alt:
                'Español'

        }

    };


    const configuracao =
        configuracoes[idioma] ||
        configuracoes.pt;


    if (bandeiraVisitante) {

        bandeiraVisitante.src =
            configuracao.src;

        bandeiraVisitante.alt =
            configuracao.alt;

    }


    if (bandeiraLogado) {

        bandeiraLogado.src =
            configuracao.src;

        bandeiraLogado.alt =
            configuracao.alt;

    }

}

// ==========================================================
// TEMA ATUAL
// ==========================================================

function obterTemaAtual() {

    const temaSalvo =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );


    if (
        temaSalvo === 'light' ||
        temaSalvo === 'dark'
    ) {

        return temaSalvo;

    }


    return 'light';

}


// ==========================================================
// APLICAR TEMA
// ==========================================================

function aplicarTema(
    tema
) {

    const temaValido =
        tema === 'dark'
            ? 'dark'
            : 'light';


    document
        .documentElement
        .setAttribute(
            'data-theme',
            temaValido
        );


    atualizarIconeTema(
        temaValido
    );

}


// ==========================================================
// ALTERNAR TEMA
// ==========================================================

function alternarTema() {

    const temaAtual =
        obterTemaAtual();


    const novoTema =
        temaAtual === 'dark'
            ? 'light'
            : 'dark';


    localStorage.setItem(
        THEME_STORAGE_KEY,
        novoTema
    );


    aplicarTema(
        novoTema
    );

}


// ==========================================================
// ÍCONE DO TEMA
// ==========================================================

function atualizarIconeTema(
    tema
) {

    const icone =
        document.getElementById(
            'icone-tema'
        );


    if (!icone) {

        return;

    }


    if (
        tema === 'dark'
    ) {

        icone.className =
            'bi bi-sun-fill';

    } else {

        icone.className =
            'bi bi-moon-stars-fill';

    }

}


// ==========================================================
// OBJETO GLOBAL
// ==========================================================

window.I18n = {

    t:
        function (chave) {

            return traduzir(
                chave
            );

        },


    traduzir:
        function (chave) {

            return traduzir(
                chave
            );

        },


    aplicar:
        function () {

            aplicarTraducoes();

        },


    aplicarTraducoes:
        function () {

            aplicarTraducoes();

        },


    getIdioma:
        function () {

            return obterIdiomaAtual();

        },


    getIdiomaAtual:
        function () {

            return obterIdiomaAtual();

        },


    selecionarIdioma:
        function (idioma) {

            selecionarIdioma(
                idioma
            );

        },


    traducoes:
        traducoes

};


// ==========================================================
// FUNÇÕES GLOBAIS
// ==========================================================

window.selecionarIdioma =
    selecionarIdioma;


window.alternarTema =
    alternarTema;


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        aplicarTraducoes();


        const tema =
            obterTemaAtual();


        aplicarTema(
            tema
        );

    }
);

// ==========================================================
// Seletor global de idioma com bandeiras (todas as páginas)
// ==========================================================
(function integrarBandeirasIdiomaGlobal() {
    const bandeiras = {
        pt: { src: 'https://flagcdn.com/24x18/br.png', alt: 'Português', code: 'PT' },
        en: { src: 'https://flagcdn.com/24x18/us.png', alt: 'English', code: 'EN' },
        es: { src: 'https://flagcdn.com/24x18/es.png', alt: 'Español', code: 'ES' }
    };

    function atualizarBandeirasIdioma() {
        const idioma = (window.I18n && typeof window.I18n.getIdioma === 'function')
            ? window.I18n.getIdioma()
            : (localStorage.getItem('mblfIdioma') || 'pt');
        const item = bandeiras[idioma] || bandeiras.pt;

        const flag = document.getElementById('mblfLanguageFlag');
        const code = document.getElementById('mblfLanguageCode');
        if (flag) {
            flag.src = item.src;
            flag.alt = item.alt;
        }
        if (code) code.textContent = item.code;

        // Compatibilidade com os seletores que já existiam em páginas específicas.
        const ids = {
            dropdownIdioma: 'bandeira-atual',
            dropdownIdiomaRelatorio: 'idiomaAtualRelatorio',
            dropdownIdiomaHub: 'idiomaAtualHub',
            dropdownIdiomaChat: 'idiomaAtualChat'
        };
        Object.entries(ids).forEach(([buttonId, targetId]) => {
            const target = document.getElementById(targetId);
            if (target) target.textContent = item.code;
            const flagTarget = document.getElementById('flag-' + targetId);
            if (flagTarget) {
                flagTarget.src = item.src;
                flagTarget.alt = item.alt;
            }
            if (targetId === 'bandeira-atual' && target && target.tagName === 'IMG') {
                target.src = item.src;
                target.alt = item.alt;
            }
        });
    }

    document.addEventListener('DOMContentLoaded', atualizarBandeirasIdioma);
    document.addEventListener('mblf:idiomaAlterado', atualizarBandeirasIdioma);
    window.addEventListener('storage', function (event) {
        if (event.key === 'mblfIdioma') atualizarBandeirasIdioma();
    });
    // Pages may initialize I18n after this script's first execution.
    setTimeout(atualizarBandeirasIdioma, 0);
})();
