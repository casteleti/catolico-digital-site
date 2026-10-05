/**
 * As quatro áreas do site (05/10/2026): cada uma tem uma página (/celebracoes, /vida-paroquial, /comunicacao,
 * /administracao) com quatro dobras, uma por item do menu. É a fonte do menu "Módulos" e dessas páginas.
 *
 * Regra de honestidade (a mesma de modules.ts): só se descreve o que o sistema faz hoje. Terço, tríduo, reunião e
 * campanha não são módulos próprios: entram pelos módulos que já existem (agenda, adoração, site da paróquia).
 */

export type AreaKey = "celebracoes" | "vida-paroquial" | "comunicacao" | "administracao";

export type AreaScreen = {
  kicker: string;
  title?: string;
  rows?: Array<{ icon: string; text: string; tag?: string }>;
  lines?: Array<{ ok?: boolean; text: string }>;
  chips?: string[];
  /** Desenha o QR Code de exemplo (dízimo). */
  pix?: boolean;
};

export type AreaItem = {
  /** Âncora da dobra: /celebracoes#horarios-de-missas. */
  id: string;
  label: string;
  icon: string;
  /** Uma linha: aparece no menu ao passar o mouse. */
  menu: string;
  headline: string;
  text: string;
  points: string[];
  /** A pergunta que chega ao telefone da secretaria. */
  ask: string;
  screen: AreaScreen;
  /** Módulo que faz isso hoje (link "Ver o módulo"). */
  module: string;
};

export type Area = {
  key: AreaKey;
  label: string;
  /** Subtítulo da coluna no menu. */
  lead: string;
  headline: string;
  intro: string;
  items: AreaItem[];
};

export const AREAS: Area[] = [
  {
    key: "celebracoes",
    label: "Celebrações",
    lead: "Missas, orações e confissões, com o horário certo.",
    headline: "Missas, orações e confissões com o horário certo, sempre.",
    intro:
      "O que o fiel mais procura é quando e onde. Cada horário é cadastrado uma vez e aparece certo no site, inclusive nas solenidades e nos dias especiais.",
    items: [
      {
        id: "horarios-de-missas",
        label: "Horários de Missas",
        icon: "clock",
        menu: "O horário certo de cada missa, inclusive no Natal e nas solenidades.",
        headline: "Que horas é a missa? A resposta precisa ser uma só.",
        text: "Cada missa é cadastrada uma vez: dia, horário, comunidade, celebrante e observações. Quando o horário muda num dia especial, o site mostra o horário certo daquele dia, sem ninguém editar página por página.",
        points: [
          "Exceções de data: “24/12 às 20h em vez de 19h”",
          "Missa da capela com endereço e “Como chegar”",
          "Pausar uma missa por um mês sem apagar nada",
        ],
        ask: "Que horas é a missa de domingo na capela?",
        screen: {
          kicker: "Missas · domingo",
          rows: [
            { icon: "church", text: "Matriz São José", tag: "7h · 9h · 19h" },
            { icon: "map", text: "Capela São Benedito", tag: "10h" },
            { icon: "clock", text: "24/12 · Missa do Galo", tag: "20h" },
          ],
          chips: ["Horário do dia consultado", "Como chegar"],
        },
        module: "missas-e-horarios",
      },
      {
        id: "tercos-e-adoracoes",
        label: "Terços e Adorações",
        icon: "flame",
        menu: "A adoração ao Santíssimo e o terço da comunidade, com dia, hora e local.",
        headline: "A adoração e o terço da comunidade, com dia e hora certos.",
        text: "A adoração ao Santíssimo entra com a periodicidade real, como “primeira quinta do mês”. O terço semanal e os outros momentos de oração entram na agenda como eventos que se repetem, e o fiel confere tudo pelo celular.",
        points: [
          "Periodicidade real: “primeira quinta do mês”",
          "Terço semanal como evento que se repete: “toda terça, 20h”",
          "Exceções de data, como nas missas",
        ],
        ask: "Tem adoração nesta quinta?",
        screen: {
          kicker: "Oração · esta semana",
          rows: [
            { icon: "users", text: "Terça · Terço dos Homens", tag: "20h" },
            { icon: "flame", text: "Quinta · Adoração ao Santíssimo", tag: "19h30" },
          ],
          chips: ["Toda terça", "Primeira quinta do mês"],
        },
        module: "confissoes-e-adoracao",
      },
      {
        id: "novenas-e-triduos",
        label: "Novenas e Tríduos",
        icon: "calendar-range",
        menu: "Cada dia da novena ou do tríduo na agenda, e fora do ar quando terminar.",
        headline: "Cada dia da novena na agenda, e fora do ar quando terminar.",
        text: "A novena do padroeiro ou o tríduo da festa entram na agenda com as datas e os horários. O site mostra o que vem pela frente e tira da página inicial o que já passou, sem ninguém precisar lembrar.",
        points: [
          "Novena é um tipo de evento da agenda",
          "Destaque na página inicial, se a paróquia quiser",
          "Sai do ar na data certa e fica no histórico",
        ],
        ask: "Que horas começa a novena de São José?",
        screen: {
          kicker: "Novena de São José",
          title: "10 a 18 de março · 19h30",
          lines: [{ ok: true, text: "Matriz São José" }, { text: "Sai da página inicial em 19/03" }],
          chips: ["Em destaque", "Novena"],
        },
        module: "avisos-e-agenda",
      },
      {
        id: "horarios-de-confissoes",
        label: "Horários de Confissões",
        icon: "heart",
        menu: "Quem quer se confessar sabe o dia, a hora e se precisa marcar.",
        headline: "Quando tem confissão? Precisa marcar?",
        text: "Os horários de confissão ficam por dia, local e sacerdote. Quando for preciso agendar, o aviso aparece junto, e a secretaria para de responder a mesma pergunta ao telefone.",
        points: [
          "Dia, local e sacerdote em cada horário",
          "Aviso “exige agendamento” quando for o caso",
          "Exceções de data, como nas missas",
        ],
        ask: "Tem confissão hoje?",
        screen: {
          kicker: "Confissões",
          rows: [
            { icon: "heart", text: "Terça · Matriz · Pe. João", tag: "15h–17h" },
            { icon: "heart", text: "Sábado · Matriz · Pe. Paulo", tag: "9h–11h" },
          ],
          chips: ["Exige agendamento", "Sem agendamento"],
        },
        module: "confissoes-e-adoracao",
      },
    ],
  },
  {
    key: "vida-paroquial",
    label: "Vida paroquial",
    lead: "Comunidades, pastorais, catequese e sacramentos.",
    headline: "Comunidades, pastorais, catequese e sacramentos num lugar só.",
    intro:
      "A vida da paróquia acontece em muitos grupos. Cada um ganha o seu espaço no site, e cada responsável, o seu próprio acesso.",
    items: [
      {
        id: "comunidades-e-capelas",
        label: "Comunidades e Capelas",
        icon: "map",
        menu: "Uma paróquia, várias comunidades, cada uma com seus horários.",
        headline: "Uma paróquia, várias comunidades, cada uma com seus horários.",
        text: "Cada comunidade ganha nome, endereço, foto, horários próprios e o botão “Como chegar”. Missas e eventos pertencem à comunidade e aparecem na página dela e na da paróquia.",
        points: [
          "Endereço, foto e “Como chegar” em cada capela",
          "Missas e eventos na página da comunidade e na da paróquia",
          "Da paróquia só com a matriz à que tem dezenas de capelas",
        ],
        ask: "Onde fica a capela São Benedito?",
        screen: {
          kicker: "Comunidades",
          rows: [
            { icon: "church", text: "Matriz São José", tag: "Centro" },
            { icon: "map", text: "Capela São Benedito", tag: "Vila Nova" },
            { icon: "map", text: "Capela N. Sra. Aparecida", tag: "Jardim" },
          ],
          chips: ["Como chegar", "Horários próprios"],
        },
        module: "comunidades-e-capelas",
      },
      {
        id: "pastorais-e-ministerios",
        label: "Gestão de Pastorais e Ministérios",
        icon: "users",
        menu: "Cem grupos, um só lugar. Cada coordenador cuida da sua equipe.",
        headline: "Cada pastoral com a sua equipe, e cada coordenador com o próprio acesso.",
        text: "A paróquia ativa os grupos que tem num catálogo de cerca de cem pastorais, movimentos e ministérios. Informa o coordenador e o e-mail, e o convite de acesso sai junto. Cada coordenador vê e edita só a própria equipe.",
        points: [
          "Equipe com nome, contato, função e desde quando serve",
          "Página pública: o que faz, quando se reúne, como participar",
          "Um login só, mesmo para quem coordena dois grupos",
        ],
        ask: "Como faço para entrar no Ministério de Música?",
        screen: {
          kicker: "Minhas equipes · João",
          rows: [
            { icon: "users", text: "Ministério de Música", tag: "14 pessoas" },
            { icon: "users", text: "MESCE", tag: "9 pessoas" },
            { icon: "book", text: "Turma Euc. 1 · sábado, 9h", tag: "18 crianças" },
          ],
          chips: ["Um login só", "Só o que você coordena"],
        },
        module: "pastorais-e-ministerios",
      },
      {
        id: "catequese",
        label: "Catequese",
        icon: "book",
        menu: "A catequese da sua paróquia, sem fila em fevereiro.",
        headline: "Como, quando e onde inscrever meu filho na catequese?",
        text: "Os pais inscrevem pelo celular, uma pergunta por tela. Pela idade, o sistema sugere o ano e mostra os horários com vaga. As turmas ficam numa grade da semana, e o catequista faz a chamada no celular.",
        points: [
          "Rematrícula reconhecida pelo celular do responsável",
          "Lista de espera quando a turma lota",
          "Calendário calculado pela Páscoa: 1ª Eucaristia, Crisma",
        ],
        ask: "Tem vaga na catequese para minha filha de 9 anos?",
        screen: {
          kicker: "Inscrição recebida",
          title: "Ana Clara · nº 2027-0041",
          chips: ["Eucaristia 1", "Sábado, 9h", "restam 3 vagas"],
          lines: [
            { ok: true, text: "Certidão de batismo enviada pela família" },
            { text: "Aguardando confirmação da secretaria" },
          ],
        },
        module: "catequese",
      },
      {
        id: "sacramentos",
        label: "Sacramentos",
        icon: "church",
        menu: "Cada pedido de sacramento chega completo, com os documentos.",
        headline: "Queremos nos casar. Quero batizar meu filho. Por onde começar?",
        text: "Cada sacramento ganha uma página com quem pode pedir, documentos, preparação, datas e contato. O pedido chega pelo site, com a autorização de dados, ou pelo botão do WhatsApp, como a paróquia preferir.",
        points: [
          "Observação em destaque: “procure com seis meses de antecedência”",
          "Documentos por foto ou PDF, guardados em local privado",
          "Caixa da secretaria com a situação de cada pedido",
        ],
        ask: "O que preciso levar para o batismo do meu filho?",
        screen: {
          kicker: "Pedido de Batismo",
          title: "Família Oliveira · recebido hoje",
          lines: [
            { ok: true, text: "Certidão de nascimento" },
            { ok: true, text: "Comprovante de residência" },
            { text: "Certidão de crisma dos padrinhos" },
          ],
          chips: ["Em atendimento", "2 de 3 documentos"],
        },
        module: "sacramentos",
      },
    ],
  },
  {
    key: "comunicacao",
    label: "Comunicação",
    lead: "Agenda, reuniões, notícias e campanhas.",
    headline: "A paróquia informada, sem depender do grupo de WhatsApp.",
    intro:
      "Agenda, reuniões, notícias e campanhas com data para entrar e para sair do ar. O WhatsApp e o Instagram continuam espalhando; o site é onde a informação oficial mora.",
    items: [
      {
        id: "agenda-semanal",
        label: "Agenda Semanal",
        icon: "bell",
        menu: "O aviso some sozinho na data certa. A agenda nunca fica velha.",
        headline: "O que acontece na paróquia nesta semana?",
        text: "A secretaria cadastra cada evento uma vez, do jeito que ele se repete, e o site monta a programação sozinho. O aviso da quermesse sai da página inicial no dia seguinte à festa, sem ninguém precisar lembrar.",
        points: [
          "Eventos que se repetem: “toda terça, 20h”, “primeira quinta do mês”",
          "Avisos com data para sair do ar",
          "Novena, retiro, formação, festa do padroeiro",
        ],
        ask: "O que tem na paróquia esta semana?",
        screen: {
          kicker: "Esta semana · Paróquia São José",
          rows: [
            { icon: "clock", text: "Terça · Grupo de oração", tag: "20h" },
            { icon: "flame", text: "Quinta · Adoração ao Santíssimo", tag: "19h30" },
            { icon: "bell", text: "Domingo · Quermesse", tag: "16h" },
          ],
          chips: ["Aviso sai do ar na segunda", "Toda terça, 20h"],
        },
        module: "avisos-e-agenda",
      },
      {
        id: "reunioes",
        label: "Reuniões",
        icon: "users",
        menu: "As reuniões das pastorais e dos conselhos na agenda, com dia, hora e local.",
        headline: "A reunião é hoje? Onde vai ser?",
        text: "Reunião é um tipo de evento da agenda. A reunião da pastoral ou do conselho entra uma vez, com a recorrência real, e quem participa confere no celular quando e onde vai ser, inclusive quando muda de lugar numa semana.",
        points: [
          "Recorrência real: “toda segunda, 20h”",
          "Exceção pontual sem refazer o cadastro",
          "Na agenda da paróquia e da comunidade",
        ],
        ask: "A reunião do Conselho é hoje?",
        screen: {
          kicker: "Reuniões · outubro",
          rows: [
            { icon: "users", text: "Segunda · Conselho Pastoral", tag: "20h" },
            { icon: "users", text: "Quarta · Pastoral da Criança", tag: "19h" },
          ],
          chips: ["Toda segunda", "Salão paroquial"],
        },
        module: "avisos-e-agenda",
      },
      {
        id: "noticias",
        label: "Notícias da Comunidade",
        icon: "newspaper",
        menu: "A notícia da paróquia, escrita pela paróquia, com data para publicar.",
        headline: "A notícia da paróquia, escrita pela paróquia, com data para publicar.",
        text: "A PASCOM escreve com título, resumo, autor e categoria, e agenda a publicação. Cada notícia ganha endereço próprio, bom para o Google e para compartilhar, em vez de sumir no grupo do WhatsApp em dois dias.",
        points: [
          "Rascunho, agendado, publicado, arquivado: nada some por engano",
          "Endereço próprio para cada notícia",
          "Feed RSS para quem acompanha",
        ],
        ask: "Saiu a programação da festa do padroeiro?",
        screen: {
          kicker: "Notícias · PASCOM",
          title: "Programação da festa do padroeiro",
          lines: [{ ok: true, text: "Agendada para sábado, 8h" }, { text: "Categoria: Festa do Padroeiro" }],
          chips: ["Agendada", "Endereço próprio"],
        },
        module: "noticias",
      },
      {
        id: "campanhas",
        label: "Campanhas",
        icon: "megaphone",
        menu: "Uma seção própria no site para a campanha da reforma ou a festa do padroeiro.",
        headline: "A campanha da paróquia com uma seção própria no site.",
        text: "Para a campanha da reforma ou a festa do padroeiro, a paróquia monta uma seção por blocos: texto, cards, lista, vídeo e documentos. Escolhe em que lugar da página inicial ela aparece e tira quando a campanha acabar.",
        points: [
          "Blocos de texto, cards, lista, vídeo e documentos",
          "A paróquia escolhe a ordem da página inicial",
          "Sem depender de quem entende de site",
        ],
        ask: "Como ajudo na reforma da igreja?",
        screen: {
          kicker: "Campanha da Reforma",
          rows: [
            { icon: "newspaper", text: "Por que reformar o telhado", tag: "Texto" },
            { icon: "image", text: "Mensagem do pároco", tag: "Vídeo" },
            { icon: "inbox", text: "Orçamento aprovado", tag: "Documento" },
          ],
          chips: ["Na página inicial", "Seção personalizada"],
        },
        module: "site-da-paroquia",
      },
    ],
  },
  {
    key: "administracao",
    label: "Administração",
    lead: "Dízimo, coordenadores, inscrições e o site.",
    headline: "O dízimo, a equipe, as inscrições e o site nas mãos da paróquia.",
    intro:
      "Ferramentas para quem cuida da paróquia por trás do balcão, sem precisar entender de tecnologia. Cada pessoa com o seu acesso, e tudo registrado.",
    items: [
      {
        id: "dizimo",
        label: "Dízimo",
        icon: "hand-heart",
        menu: "Quem quer partilhar acha a chave certa em segundos.",
        headline: "Como posso contribuir com o dízimo da minha paróquia?",
        text: "A paróquia informa a chave PIX, o QR Code, o nome de quem recebe e o banco. O fiel copia a chave ou lê o QR Code no fim da missa, e o dinheiro vai direto para a conta da paróquia.",
        points: ["QR Code e “copia e cola”", "Sem intermediário e sem taxa", "Só a administração altera a chave, com registro"],
        ask: "Qual é a chave PIX da paróquia?",
        screen: {
          kicker: "Dízimo e contribuições",
          title: "Paróquia São José",
          lines: [{ text: "Chave PIX: dizimo@paroquiaexemplo.org.br" }],
          chips: ["Copiar chave", "Banco · Agência · Conta"],
          pix: true,
        },
        module: "dizimo",
      },
      {
        id: "cadastro-de-coordenadores",
        label: "Cadastro de Coordenadores",
        icon: "shield",
        menu: "Cada coordenador convidado por e-mail, vendo só a própria equipe ou turma.",
        headline: "Cada coordenador com o seu acesso, e tudo registrado.",
        text: "O coordenador recebe o convite por e-mail e entra com o próprio login. Vê e edita só a própria equipe ou turma. Quando sai, o acesso é revogado na hora, e o histórico mostra quem mudou o quê.",
        points: [
          "Papéis prontos: administração, secretaria, comunicação, pároco e coordenação",
          "Convite por e-mail; acesso revogado na hora",
          "Histórico de alterações com o valor anterior",
        ],
        ask: "O padre novo chegou. Como ele entra no site?",
        screen: {
          kicker: "Equipe da paróquia",
          rows: [
            { icon: "inbox", text: "Maria", tag: "Secretaria" },
            { icon: "users", text: "João · Ministério de Música", tag: "Coordenação" },
            { icon: "megaphone", text: "Ana", tag: "Comunicação" },
          ],
          chips: ["Convite enviado", "Só a própria equipe"],
        },
        module: "painel-e-equipe",
      },
      {
        id: "inscricoes-da-catequese",
        label: "Inscrições da Catequese",
        icon: "book",
        menu: "Os pais inscrevem pelo celular; a secretaria confere e confirma.",
        headline: "As inscrições chegam prontas para a secretaria conferir.",
        text: "A inscrição feita pelos pais chega com os dados, a turma escolhida e os documentos por foto, pelo link que só a família tem. A secretaria confere, pede para refazer o que veio ilegível ou anexa o papel entregue no balcão.",
        points: [
          "Documentos por foto, pelo link da família",
          "Inscrição no balcão para quem não tem celular",
          "Visão geral: inscritos, vagas e o que precisa de atenção",
        ],
        ask: "Recebeu a certidão que mandei por foto?",
        screen: {
          kicker: "Inscrições · Catequese 2027",
          lines: [
            { ok: true, text: "Ana Clara · Eucaristia 1 · documentos conferidos" },
            { text: "Pedro · Crisma · certidão para refazer" },
            { text: "Lucas · Eucaristia 1 · lista de espera" },
          ],
          chips: ["48 inscritos", "3 vagas"],
        },
        module: "catequese",
      },
      {
        id: "atualizacao-do-site",
        label: "Atualização Fácil do Site",
        icon: "globe",
        menu: "A secretaria muda uma vez e o site mostra certo em todo lugar.",
        headline: "A secretaria muda uma vez, e o site mostra certo em todo lugar.",
        text: "Cada informação da paróquia é cadastrada uma vez. Quando o horário muda, muda na página da missa, na da comunidade e na página inicial ao mesmo tempo. O painel fala a língua da paróquia: missa, aviso, turma, pastoral.",
        points: [
          "Seis temas de cor, brasão e fotos da paróquia",
          "Página inicial montável: quais seções e em que ordem",
          "Rápido no celular e achado no Google",
        ],
        ask: "Mudou o horário da missa. Quem atualiza o site?",
        screen: {
          kicker: "Painel · Missas",
          title: "Domingo: 19h → 19h30",
          lines: [
            { ok: true, text: "Atualizado na página inicial" },
            { ok: true, text: "Atualizado na página da Matriz" },
          ],
          chips: ["Salvo uma vez", "Certo em todo lugar"],
        },
        module: "site-da-paroquia",
      },
    ],
  },
];

export const areaByKey = (key: AreaKey) => AREAS.find((a) => a.key === key)!;
export const areaHref = (key: AreaKey, id?: string) => (id ? `/${key}#${id}` : `/${key}`);
