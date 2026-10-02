/**
 * Os módulos da plataforma, como o site os apresenta. Uma fonte só para o menu, a tabela da página inicial e a
 * página de cada módulo (/modulos/<slug>).
 *
 * Regra de honestidade: só entra como "pronto" o que existe no sistema hoje (01/10/2026). O que está em
 * construção aparece como "em preparação" e nunca é descrito como se funcionasse.
 */

export type ModuleStatus = "pronto" | "em-preparacao";

export type ModuleGroupKey = "celebracoes" | "vida-paroquial" | "comunicacao" | "administracao";

export type Role = "paroco" | "secretaria" | "catequese" | "pastorais" | "pascom" | "fieis";

export type ParishModule = {
  slug: string;
  name: string;
  /** Nome curto para o menu e a tabela. */
  short: string;
  group: ModuleGroupKey;
  icon: string;
  status: ModuleStatus;
  /** Uma frase, na voz da paróquia: o que o módulo resolve (cards, tabela, menu e descrição para o Google). */
  promise: string;
  /** Título do topo da página do módulo, na voz de quem procura a paróquia. Sem ele, usa `promise`. */
  headline?: string;
  /** Texto do topo da página do módulo. Sem ele, usa a cena da dor. */
  lead?: string;
  /** A dor, contada em uma cena curta. */
  pain: string;
  /** O que o módulo faz, de verdade, hoje. */
  does: string[];
  roles: Role[];
  /** Módulo com página-história própria (as quatro grandes). */
  featured?: boolean;
};

export const MODULE_GROUPS: Array<{ key: ModuleGroupKey; label: string; lead: string }> = [
  { key: "celebracoes", label: "Celebrações", lead: "O que o fiel mais procura: quando e onde." },
  { key: "vida-paroquial", label: "Vida paroquial", lead: "Catequese, sacramentos, pastorais e comunidades." },
  { key: "comunicacao", label: "Comunicação", lead: "Avisos, agenda, notícias e fotos, sempre atuais." },
  { key: "administracao", label: "Administração", lead: "O painel, a equipe, o dízimo e o site." },
];

export const ROLE_LABELS: Record<Role, string> = {
  paroco: "Pároco",
  secretaria: "Secretaria",
  catequese: "Catequese",
  pastorais: "Pastorais",
  pascom: "PASCOM",
  fieis: "Fiéis",
};

export const MODULES: ParishModule[] = [
  {
    slug: "missas-e-horarios",
    name: "Missas e horários",
    short: "Missas e horários",
    group: "celebracoes",
    icon: "clock",
    status: "pronto",
    promise: "O horário certo em todo lugar, inclusive no Natal.",
    headline: "Que horas é a missa? A resposta precisa ser uma só.",
    lead: "Na rotina ou nas solenidades e celebrações especiais, mantenha os horários atualizados no site da paróquia. Um lugar certo para os fiéis consultarem e se organizarem para participar.",
    pain: "O Instagram diz 18h30, o site diz 19h e o cartaz da porta diz outra coisa. Na véspera de Natal, ninguém sabe se a Missa do Galo é às 20h ou às 22h.",
    does: [
      "Cada missa cadastrada uma vez: dia, horário, comunidade, celebrante, observações.",
      "Exceções de data (“24/12 às 20h em vez de 19h”, “não haverá missa em 2/11”): o site mostra o horário certo do dia consultado.",
      "Missa de uma capela pertence à capela: endereço e “Como chegar” vêm junto.",
      "Desativar uma missa por um mês não apaga nada: reativa quando voltar.",
    ],
    roles: ["secretaria", "pascom", "fieis"],
  },
  {
    slug: "confissoes-e-adoracao",
    name: "Confissões e adoração",
    short: "Confissões e adoração",
    group: "celebracoes",
    icon: "heart",
    status: "pronto",
    promise: "Quem quer se confessar sabe o dia, a hora e se precisa marcar.",
    headline: "Quando tem confissão? Precisa marcar? Como me preparar?",
    lead: "Horários, orientações sobre agendamento e preparação para o sacramento em um só lugar. Acolha também as dúvidas de quem deseja se confessar.",
    pain: "“Tem confissão hoje?” é uma das perguntas mais repetidas ao telefone da secretaria.",
    does: [
      "Horários de confissão por dia, local e sacerdote, com a observação “exige agendamento” quando for o caso.",
      "Adoração ao Santíssimo com periodicidade real (“primeira quinta do mês”).",
      "Mesma lógica de exceções das missas.",
    ],
    roles: ["secretaria", "fieis"],
  },
  {
    slug: "catequese",
    name: "Catequese",
    short: "Catequese",
    group: "vida-paroquial",
    icon: "book",
    status: "pronto",
    featured: true,
    promise: "A catequese da sua paróquia, sem fila em fevereiro.",
    headline: "Como, quando e onde inscrever meu filho na catequese?",
    lead: "Prazos, locais, documentos necessários e orientações para inscrição em um só lugar. As famílias sabem o que fazer, e a secretaria recebe menos dúvidas repetidas.",
    pain: "Quarenta mães na fila da secretaria, ficha de papel, certidão que some, planilha de turma que só a coordenadora entende e um grupo de WhatsApp com duzentos pais.",
    does: [
      "Inscrição pelo celular dos pais, uma pergunta por tela: pela idade o sistema sugere o ano e mostra os horários com vagas.",
      "Rematrícula reconhecida pelo celular do responsável; irmãos não duplicam cadastro.",
      "Documentos por foto, pelo link que só a família tem; a secretaria confere, pede para refazer ou anexa o papel do balcão.",
      "Turmas numa grade da semana: ano, dia, horário, local, vagas e catequistas. Lotou, vai para a lista de espera.",
      "“Minhas turmas”: o catequista faz a chamada no celular e vê o WhatsApp de cada família.",
      "Calendário calculado pela Páscoa: 1ª Confissão, 1ª Eucaristia, Crisma.",
      "Caminho editável: anos, idades com data de corte, objetivos; vem pronto com o padrão brasileiro.",
      "Visão geral para a coordenação: inscritos, vagas, presença baixa, o que precisa de atenção.",
    ],
    roles: ["catequese", "secretaria", "paroco"],
  },
  {
    slug: "sacramentos",
    name: "Sacramentos",
    short: "Sacramentos",
    group: "vida-paroquial",
    icon: "church",
    status: "pronto",
    featured: true,
    promise: "Cada pedido de sacramento chega completo, com os documentos.",
    headline: "Queremos nos casar. Quero batizar meu filho. Por onde começar?",
    lead: "Documentos, prazos e orientações para o matrimônio e o batismo em um só lugar. Casais, pais e padrinhos encontram os próximos passos, mesmo fora do horário da secretaria.",
    pain: "Sexta, 17h50: o casal liga para saber o que precisa para casar em maio. A secretaria já fechou. Na segunda, ligam de novo.",
    does: [
      "Uma página para cada sacramento: quem pode pedir, documentos, preparação, datas, dúvidas e contato.",
      "Observação em destaque (“procure a paróquia com seis meses de antecedência”).",
      "Pedido pelo site com autorização de dados, ou pelo botão do WhatsApp: a paróquia escolhe.",
      "Documentos enviados pelo formulário (foto ou PDF, 1 a 10 arquivos), guardados em local privado.",
      "Caixa da secretaria: cada pedido com situação, documentos para baixar e registro de quem abriu.",
    ],
    roles: ["secretaria", "paroco", "fieis"],
  },
  {
    slug: "pastorais-e-ministerios",
    name: "Pastorais e Ministérios",
    short: "Pastorais e Ministérios",
    group: "vida-paroquial",
    icon: "users",
    status: "pronto",
    featured: true,
    promise: "Cem grupos, um só lugar. Cada coordenador cuida da sua equipe.",
    headline: "Como organizar minha pastoral e manter a equipe informada?",
    lead: "Reúna as informações da pastoral em um só lugar e facilite a rotina de quem coordena. Menos informações espalhadas, mais clareza para organizar a equipe e dar continuidade ao trabalho.",
    pain: "O João coordena o Ministério de Música e a MESCE: duas planilhas, três grupos de WhatsApp e uma lista de papel que só ele entende. Quando ele mudar de cidade, a lista vai junto.",
    does: [
      "Catálogo de cerca de 100 grupos em quatro abas: pastorais, movimentos, ministérios e serviços, conselhos e equipes.",
      "Ativar em um clique: escolhe o grupo, informa o coordenador e o e-mail; o convite de acesso sai junto.",
      "Equipe de cada grupo: nome, contato, função, desde quando serve.",
      "Um login só: o coordenador vê e edita apenas a própria equipe (e as turmas de catequese, se for catequista).",
      "Página pública de cada grupo: o que faz, quando se reúne, como participar.",
    ],
    roles: ["pastorais", "paroco", "secretaria"],
  },
  {
    slug: "comunidades-e-capelas",
    name: "Comunidades e capelas",
    short: "Comunidades e capelas",
    group: "vida-paroquial",
    icon: "map",
    status: "pronto",
    promise: "Uma paróquia, várias comunidades, cada uma com seus horários.",
    pain: "A matriz tem site; as cinco capelas vivem de cartaz. O fiel da capela São Benedito não acha a missa dele em lugar nenhum.",
    does: [
      "Cada comunidade com nome, endereço, foto, horários próprios e “Como chegar”.",
      "Missas e eventos pertencem à comunidade: aparecem na página dela e na da paróquia.",
      "Uma paróquia pequena usa só a matriz; uma grande organiza dezenas de capelas no mesmo sistema.",
    ],
    roles: ["secretaria", "pascom", "fieis"],
  },
  {
    slug: "avisos-e-agenda",
    name: "Avisos e agenda",
    short: "Avisos e agenda",
    group: "comunicacao",
    icon: "bell",
    status: "pronto",
    promise: "O aviso some sozinho na data certa. A agenda nunca fica velha.",
    headline: "O que acontece na paróquia nesta semana?",
    lead: "Reúna os avisos e a programação em um só lugar. Defina até quando cada aviso deve aparecer e mantenha a comunidade informada sobre as próximas celebrações, encontros e eventos.",
    pain: "A festa junina acabou em junho e continua na página inicial em setembro, porque ninguém lembrou de tirar.",
    does: [
      "Avisos com validade: somem do site na data e ficam no histórico.",
      "Eventos com recorrência de verdade (“toda terça, 20h”, “primeira quinta do mês”) e exceções pontuais.",
      "Tipos da vida da paróquia: novena, retiro, formação, festa do padroeiro, quermesse.",
      "Aviso em destaque na página inicial, quando a paróquia quiser.",
    ],
    roles: ["pascom", "secretaria", "fieis"],
  },
  {
    slug: "noticias",
    name: "Notícias",
    short: "Notícias",
    group: "comunicacao",
    icon: "newspaper",
    status: "pronto",
    promise: "A notícia da paróquia, escrita pela paróquia, com data para publicar.",
    pain: "A PASCOM escreve bem, mas o texto fica preso no WhatsApp e some em dois dias.",
    does: [
      "Texto com título, resumo, autor, categoria e publicação agendada.",
      "Rascunho, publicado, agendado, arquivado: nada some por engano.",
      "Feed RSS e endereço próprio para cada notícia, bom para o Google e para compartilhar.",
    ],
    roles: ["pascom", "fieis"],
  },
  {
    slug: "galeria",
    name: "Galeria",
    short: "Galeria",
    group: "comunicacao",
    icon: "image",
    status: "pronto",
    promise: "As fotos da festa, leves e organizadas em álbuns.",
    pain: "Duzentas fotos da Primeira Eucaristia num grupo de WhatsApp, pesadas, sem ordem e sem data.",
    does: [
      "Álbuns por acontecimento, com capa, legenda e ordem.",
      "Fotos tratadas sozinhas: orientação corrigida, sem dados de localização, convertidas e leves para o celular.",
      "Enviar para a lixeira não apaga: dá para recuperar.",
    ],
    roles: ["pascom", "fieis"],
  },
  {
    slug: "dizimo",
    name: "Dízimo",
    short: "Dízimo",
    group: "administracao",
    icon: "hand-heart",
    status: "pronto",
    featured: true,
    promise: "Quem quer partilhar acha a chave certa em segundos.",
    headline: "Como posso contribuir com o dízimo da minha paróquia?",
    lead: "Disponibilize a chave Pix e as orientações para a contribuição no site. Quem deseja partilhar encontra as informações com facilidade, e a pastoral do dízimo ganha mais um canal de contato com os fiéis.",
    pain: "Domingo, fim da missa. Metade da igreja não carrega dinheiro. Alguém procura a chave PIX numa foto antiga do boletim, digita errado, desiste.",
    does: [
      "Página do dízimo com o texto da paróquia sobre partilha e corresponsabilidade.",
      "Um quadro de PIX simples: chave, QR Code, nome de quem recebe, banco e a descrição que a paróquia quiser. Sem intermediário, sem taxa, sem processar pagamento.",
      "Dados bancários e contato da pastoral do dízimo.",
      "Só a administração altera a chave, e toda mudança fica registrada com quem e quando.",
      "O mesmo quadro vai aparecer em toda contribuição da paróquia: taxa da catequese, intenções de missa, inscrições de sacramentos (em preparação).",
    ],
    roles: ["paroco", "secretaria", "fieis"],
  },
  {
    slug: "painel-e-equipe",
    name: "Painel e equipe",
    short: "Painel e equipe",
    group: "administracao",
    icon: "shield",
    status: "pronto",
    promise: "Cada pessoa com o seu acesso, e tudo registrado.",
    pain: "Quem cuidava do site mudou de pastoral e levou a senha. O padre novo chega e não consegue entrar.",
    does: [
      "Papéis prontos: administração, secretaria, comunicação, pároco e coordenação.",
      "Convite por e-mail; acesso revogado na hora quando a pessoa sai.",
      "Histórico de alterações: quem mudou o quê, quando, e o valor anterior.",
      "Acesso de coordenador restrito à própria equipe ou turma.",
    ],
    roles: ["paroco", "secretaria"],
  },
  {
    slug: "site-da-paroquia",
    name: "O site da paróquia",
    short: "Site da paróquia",
    group: "administracao",
    icon: "globe",
    status: "pronto",
    promise: "Bonito, rápido no celular e achado no Google.",
    pain: "O site de 2014 não abre direito no celular, e é pelo celular que todo mundo chega, vindo de um link do WhatsApp.",
    does: [
      "Seis temas de cor (Cardeal, Oliveira, Manto, Celeste, Mármore, Trigal), brasão e fotos da paróquia.",
      "Página inicial montável: a paróquia escolhe quais seções aparecem e em que ordem.",
      "Seções personalizadas por blocos (texto, cards, lista, vídeo, documentos) para a festa do padroeiro ou a campanha da reforma.",
      "Busca no site, endereços amigáveis, dados para o Google e acessibilidade para o público idoso.",
    ],
    roles: ["pascom", "paroco", "fieis"],
  },
];

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug);
export const modulesOf = (group: ModuleGroupKey) => MODULES.filter((m) => m.group === group);
