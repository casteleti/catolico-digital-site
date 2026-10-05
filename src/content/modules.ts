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
  /** Um dos quatro módulos de maior peso (Catequese, Sacramentos, Pastorais, Dízimo). */
  featured?: boolean;
};

export const MODULE_GROUPS: Array<{ key: ModuleGroupKey; label: string; lead: string }> = [
  { key: "celebracoes", label: "Celebrações", lead: "O que o fiel mais procura: quando e\u00A0onde." },
  { key: "vida-paroquial", label: "Vida paroquial", lead: "Catequese, sacramentos, pastorais e\u00A0comunidades." },
  { key: "comunicacao", label: "Comunicação", lead: "Avisos, agenda, notícias e fotos, sempre\u00A0atuais." },
  { key: "administracao", label: "Administração", lead: "O painel, a equipe, o dízimo e o\u00A0site." },
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
    promise: "O horário certo em todo lugar, inclusive no\u00A0Natal.",
    headline: "Que horas é a missa? A\u00A0resposta precisa ser uma\u00A0só.",
    lead: "Na rotina ou nas solenidades e celebrações especiais, mantenha os horários atualizados no site da paróquia. Um\u00A0lugar certo para os fiéis consultarem e se organizarem para\u00A0participar.",
    pain: "O horário da missa está num post do Instagram de três semanas atrás, numa arte do Facebook e num áudio no grupo da comunidade. Na\u00A0véspera de Natal, ninguém sabe qual\u00A0vale.",
    does: [
      "Cada missa cadastrada uma vez: dia, horário, comunidade, celebrante,\u00A0observações.",
      "Exceções de data (“24/12 às 20h em vez de 19h”, “não haverá missa em 2/11”): o site mostra o horário certo do dia\u00A0consultado.",
      "Missa de uma capela pertence à capela: endereço e “Como chegar” vêm\u00A0junto.",
      "Desativar uma missa por um mês não apaga nada: reativa quando\u00A0voltar.",
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
    promise: "Quem quer se confessar sabe o dia, a hora e se precisa\u00A0marcar.",
    headline: "Quando tem confissão? Precisa\u00A0marcar? Como\u00A0me\u00A0preparar?",
    lead: "Horários, orientações sobre agendamento e preparação para o sacramento em um só lugar. Acolha\u00A0também as dúvidas de quem deseja se\u00A0confessar.",
    pain: "“Tem confissão hoje?” chega por Direct, por WhatsApp e por comentário no post, e a secretaria responde a mesma pergunta o dia\u00A0inteiro.",
    does: [
      "Horários de confissão por dia, local e sacerdote, com a observação “exige agendamento” quando for o\u00A0caso.",
      "Adoração ao Santíssimo com periodicidade real (“primeira quinta do\u00A0mês”).",
      "Mesma lógica de exceções das\u00A0missas.",
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
    promise: "A inscrição da catequese pelo celular, sem perder nenhum\u00A0documento.",
    headline: "Como, quando e onde inscrever meu filho na\u00A0catequese?",
    lead: "Prazos, locais, documentos necessários e orientações para inscrição em um só lugar. As\u00A0famílias sabem o que fazer, e a secretaria recebe menos dúvidas\u00A0repetidas.",
    pain: "Foto da certidão no WhatsApp da secretaria, áudio pedindo vaga, a lista da turma num grupo com duzentos pais e o documento que, em março, já não está mais disponível para\u00A0baixar.",
    does: [
      "Inscrição pelo celular dos pais, uma pergunta por tela: pela idade o sistema sugere o ano e mostra os horários com\u00A0vagas.",
      "Rematrícula reconhecida pelo celular do responsável; irmãos não duplicam\u00A0cadastro.",
      "Documentos por foto, pelo link que só a família tem; a secretaria confere, pede para refazer ou anexa o papel do\u00A0balcão.",
      "Turmas numa grade da semana: ano, dia, horário, local, vagas e catequistas. Lotou,\u00A0vai para a lista de\u00A0espera.",
      "“Minhas turmas”: o catequista faz a chamada no celular e vê o WhatsApp de cada\u00A0família.",
      "Calendário calculado pela Páscoa: 1ª Confissão, 1ª Eucaristia,\u00A0Crisma.",
      "Caminho editável: anos, idades com data de corte, objetivos; vem pronto com o padrão\u00A0brasileiro.",
      "Visão geral para a coordenação: inscritos, vagas, presença baixa, o que precisa de\u00A0atenção.",
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
    promise: "Cada pedido de sacramento chega completo, com os\u00A0documentos.",
    headline: "Queremos nos casar. Quero\u00A0batizar meu filho. Por\u00A0onde\u00A0começar?",
    lead: "Documentos, prazos e orientações para o matrimônio e o batismo em um só lugar. Casais,\u00A0pais e padrinhos encontram os próximos passos, mesmo fora do horário da\u00A0secretaria.",
    pain: "Sexta, 17h50: o casal liga para saber o que precisa para casar em maio. A\u00A0secretaria já fechou. Na\u00A0segunda, ligam de\u00A0novo.",
    does: [
      "Uma página para cada sacramento: quem pode pedir, documentos, preparação, datas, dúvidas e\u00A0contato.",
      "Observação em destaque (“procure a paróquia com seis meses de\u00A0antecedência”).",
      "Pedido pelo site com autorização de dados, ou pelo botão do WhatsApp: a paróquia\u00A0escolhe.",
      "Documentos enviados pelo formulário (foto ou PDF, 1 a 10 arquivos), guardados em local\u00A0privado.",
      "Caixa da secretaria: cada pedido com situação, documentos para baixar e registro de quem\u00A0abriu.",
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
    promise: "Cem grupos, um só lugar. Cada\u00A0coordenador cuida da sua\u00A0equipe.",
    headline: "Como organizar minha pastoral e manter a equipe\u00A0informada?",
    lead: "Reúna as informações da pastoral em um só lugar e facilite a rotina de quem coordena. Menos\u00A0informações espalhadas, mais clareza para organizar a equipe e dar continuidade ao\u00A0trabalho.",
    pain: "O João coordena o Ministério de Música e a MESCE: três grupos de WhatsApp, a escala num áudio e os contatos de todo mundo só no celular dele. Quando\u00A0ele mudar de cidade, tudo isso vai\u00A0junto.",
    does: [
      "Catálogo de cerca de 100 grupos em quatro abas: pastorais, movimentos, ministérios e serviços, conselhos e\u00A0equipes.",
      "Ativar em um clique: escolhe o grupo, informa o coordenador e o e-mail; o convite de acesso sai\u00A0junto.",
      "Equipe de cada grupo: nome, contato, função, desde quando\u00A0serve.",
      "Um login só: o coordenador vê e edita apenas a própria equipe (e as turmas de catequese, se for\u00A0catequista).",
      "Página pública de cada grupo: o que faz, quando se reúne, como\u00A0participar.",
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
    promise: "Uma paróquia, várias comunidades, cada uma com seus\u00A0horários.",
    pain: "A matriz posta no Instagram; as cinco capelas dependem do recado no grupo. O\u00A0fiel da capela São Benedito não acha a missa dele em lugar\u00A0nenhum.",
    does: [
      "Cada comunidade com nome, endereço, foto, horários próprios e “Como\u00A0chegar”.",
      "Missas e eventos pertencem à comunidade: aparecem na página dela e na da\u00A0paróquia.",
      "Uma paróquia pequena usa só a matriz; uma grande organiza dezenas de capelas no mesmo\u00A0sistema.",
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
    promise: "O aviso some sozinho na data certa. A\u00A0agenda nunca fica\u00A0velha.",
    headline: "O que acontece na paróquia nesta\u00A0semana?",
    lead: "Reúna os avisos e a programação em um só lugar. Defina\u00A0até quando cada aviso deve aparecer e mantenha a comunidade informada sobre as próximas celebrações, encontros e\u00A0eventos.",
    pain: "A festa junina acabou em junho e continua na página inicial em setembro, porque ninguém lembrou de\u00A0tirar.",
    does: [
      "Avisos com validade: somem do site na data e ficam no\u00A0histórico.",
      "Eventos com recorrência de verdade (“toda terça, 20h”, “primeira quinta do mês”) e exceções\u00A0pontuais.",
      "Tipos da vida da paróquia: novena, retiro, formação, festa do padroeiro,\u00A0quermesse.",
      "Aviso em destaque na página inicial, quando a paróquia\u00A0quiser.",
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
    promise: "A notícia da paróquia, escrita pela paróquia, com data para\u00A0publicar.",
    pain: "A PASCOM escreve bem, mas o texto fica preso no WhatsApp e some em dois\u00A0dias.",
    does: [
      "Texto com título, resumo, autor, categoria e publicação\u00A0agendada.",
      "Rascunho, publicado, agendado, arquivado: nada some por\u00A0engano.",
      "Feed RSS e endereço próprio para cada notícia, bom para o Google e para\u00A0compartilhar.",
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
    promise: "As fotos da festa, leves e organizadas em\u00A0álbuns.",
    pain: "Duzentas fotos da Primeira Eucaristia num grupo de WhatsApp, pesadas, sem ordem e sem\u00A0data.",
    does: [
      "Álbuns por acontecimento, com capa, legenda e\u00A0ordem.",
      "Fotos tratadas sozinhas: orientação corrigida, sem dados de localização, convertidas e leves para o\u00A0celular.",
      "Enviar para a lixeira não apaga: dá para\u00A0recuperar.",
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
    promise: "Quem quer partilhar acha a chave certa em\u00A0segundos.",
    headline: "Como posso contribuir com o dízimo da minha\u00A0paróquia?",
    lead: "Disponibilize a chave Pix e as orientações para a contribuição no site. Quem\u00A0deseja partilhar encontra as informações com facilidade, e a pastoral do dízimo ganha mais um canal de contato com os\u00A0fiéis.",
    pain: "Domingo, fim da missa. Metade\u00A0da igreja não carrega dinheiro. Alguém\u00A0procura a chave PIX num print antigo do grupo, digita errado,\u00A0desiste.",
    does: [
      "Página do dízimo com o texto da paróquia sobre partilha e\u00A0corresponsabilidade.",
      "Um quadro de PIX simples: chave, QR Code, nome de quem recebe, banco e a descrição que a paróquia quiser. Sem\u00A0intermediário, sem taxa, sem processar\u00A0pagamento.",
      "Dados bancários e contato da pastoral do\u00A0dízimo.",
      "Só a administração altera a chave, e toda mudança fica registrada com quem e\u00A0quando.",
      "O mesmo quadro vai aparecer em toda contribuição da paróquia: taxa da catequese, intenções de missa, inscrições de sacramentos (em\u00A0preparação).",
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
    promise: "Cada pessoa com o seu acesso, e tudo\u00A0registrado.",
    pain: "Quem cuidava do site mudou de pastoral e levou a senha. O\u00A0padre novo chega e não consegue\u00A0entrar.",
    does: [
      "Papéis prontos: administração, secretaria, comunicação, pároco e\u00A0coordenação.",
      "Convite por e-mail; acesso revogado na hora quando a pessoa\u00A0sai.",
      "Histórico de alterações: quem mudou o quê, quando, e o valor\u00A0anterior.",
      "Acesso de coordenador restrito à própria equipe ou\u00A0turma.",
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
    promise: "Bonito, rápido no celular e achado no\u00A0Google.",
    pain: "O site de 2014 não abre direito no celular, e é pelo celular que todo mundo chega, vindo de um link do\u00A0WhatsApp.",
    does: [
      "Seis temas de cor (Cardeal, Oliveira, Manto, Celeste, Mármore, Trigal), brasão e fotos da\u00A0paróquia.",
      "Página inicial montável: a paróquia escolhe quais seções aparecem e em que\u00A0ordem.",
      "Seções personalizadas por blocos (texto, cards, lista, vídeo, documentos) para a festa do padroeiro ou a campanha da\u00A0reforma.",
      "Busca no site, endereços amigáveis, dados para o Google e acessibilidade para o público\u00A0idoso.",
    ],
    roles: ["pascom", "paroco", "fieis"],
  },
];

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug);
export const modulesOf = (group: ModuleGroupKey) => MODULES.filter((m) => m.group === group);
