/** As pessoas da paróquia para quem o site fala. Uma página por papel (/para/<slug>). */
import type { Role } from "./modules";

export type RolePage = {
  slug: Role;
  icon: string;
  /** Como aparece no menu: "Para o pároco". */
  menu: string;
  title: string;
  /** A frase que a pessoa diria. */
  quote: string;
  lead: string;
  /** O que muda no dia a dia dela. */
  gains: Array<[string, string]>;
  /** Módulos que mais importam para ela, por slug. */
  modules: string[];
};

export const ROLES: RolePage[] = [
  {
    slug: "paroco",
    icon: "church",
    menu: "Para o pároco",
    title: "O site é da paróquia, não de quem cuida dele hoje.",
    quote: "“Cheguei na paróquia e ninguém sabe a senha do site.”",
    lead: "Padres são transferidos, secretárias mudam, voluntários trocam de pastoral. A\u00A0estrutura fica, cada pessoa tem o seu acesso e tudo o que muda deixa rastro.",
    gains: [
      ["Visão de tudo, sem virar administrador de tecnologia", "Catequese, sacramentos, pastorais e dízimo num painel só, em palavras da paróquia."],
      ["Quem mudou o quê", "Histórico de cada alteração, com a pessoa, a data e o valor anterior."],
      ["Acesso que acompanha a função", "O coordenador vê a própria equipe; a secretaria, as inscrições; o padre, tudo."],
      ["Cuidado com os dados dos fiéis", "Dado de fé e de menor tratado como sensível, com consentimento guardado e exclusão a pedido."],
    ],
    modules: ["painel-e-equipe", "catequese", "sacramentos", "dizimo"],
  },
  {
    slug: "secretaria",
    icon: "inbox",
    menu: "Para a secretaria",
    title: "Menos telefone, menos papel, menos fila.",
    quote: "“Em fevereiro a fila da catequese dobra a esquina.”",
    lead: "As perguntas repetidas do telefone ficam respondidas no site. A\u00A0inscrição chega pelo celular dos pais, com os documentos. O\u00A0horário muda uma vez e sai certo em todo lugar.",
    gains: [
      ["Inscrição da catequese sem fila", "Os pais inscrevem pelo celular; a secretaria confere, confirma e define a turma."],
      ["Documentos que não somem", "Certidões por foto, guardadas em local privado, com conferência e pedido de refazer."],
      ["Pedidos de sacramento completos", "Cada pedido com os documentos e a situação, numa caixa só."],
      ["Mudou o horário? Uma\u00A0vez só", "Missa, confissão e adoração cadastradas uma vez, com exceções de data."],
    ],
    modules: ["catequese", "sacramentos", "missas-e-horarios", "avisos-e-agenda"],
  },
  {
    slug: "catequese",
    icon: "book",
    menu: "Para a coordenação da catequese",
    title: "Turmas, chamada e famílias num lugar só.",
    quote: "“Planilha de turma, caderno de chamada e um grupo de WhatsApp com duzentos pais.”",
    lead: "O caminho da catequese vem pronto e a paróquia ajusta: anos, idades, turmas e calendário pela Páscoa. O\u00A0catequista faz a chamada no celular e fala com cada família pelo WhatsApp.",
    gains: [
      ["Turmas numa grade da semana", "Ano, dia, horário, local, vagas e catequistas. Lotou,\u00A0lista de espera."],
      ["Chamada no celular", "Presente, falta ou falta justificada; a porcentagem de presença acompanha."],
      ["Calendário que se calcula", "1ª Confissão, 1ª Eucaristia e Crisma pela data da Páscoa de cada ano."],
      ["O que precisa de atenção", "Turma sem catequista, criança fora da idade, inscrição parada, presença baixa."],
    ],
    modules: ["catequese", "avisos-e-agenda", "painel-e-equipe"],
  },
  {
    slug: "pastorais",
    icon: "users",
    menu: "Para quem coordena uma pastoral",
    title: "Sua equipe organizada, com o seu próprio acesso.",
    quote: "“Minha equipe está numa lista de papel que só eu entendo.”",
    lead: "Cada grupo da paróquia tem a sua página no site e a sua equipe no painel. O\u00A0coordenador cuida da dele com um login só, sem depender da secretaria.",
    gains: [
      ["Ativar o grupo em um clique", "Catálogo com cerca de cem pastorais, movimentos, ministérios e equipes."],
      ["A equipe, com nome e contato", "Função, desde quando serve, observações, com o consentimento registrado."],
      ["Um login para tudo que você coordena", "Canto, MESCE e uma turma de catequese aparecem no mesmo painel."],
      ["Convite para novos voluntários", "A página do grupo diz o que faz, quando se reúne e como participar."],
    ],
    modules: ["pastorais-e-ministerios", "avisos-e-agenda", "galeria"],
  },
  {
    slug: "pascom",
    icon: "megaphone",
    menu: "Para a PASCOM",
    title: "Informação digitada uma vez, certa no site inteiro.",
    quote: "“Mudou o horário e o site ficou errado três semanas.”",
    lead: "Aviso com validade, agenda com recorrência, notícia com data para publicar e fotos leves. O\u00A0Instagram e o WhatsApp continuam; o site é onde a informação oficial mora.",
    gains: [
      ["Aviso que some na data", "Nada de festa junina na página inicial em setembro."],
      ["Agenda com recorrência de verdade", "“Toda terça, 20h”, “primeira quinta do mês”, com exceções pontuais."],
      ["Notícias com agendamento", "Rascunho, publicado, agendado; endereço próprio para compartilhar."],
      ["Página inicial montável", "A PASCOM escolhe as seções e a ordem; o tema de cor é da paróquia."],
    ],
    modules: ["avisos-e-agenda", "noticias", "galeria", "site-da-paroquia"],
  },
];

export const roleBySlug = (slug: string) => ROLES.find((r) => r.slug === slug);
