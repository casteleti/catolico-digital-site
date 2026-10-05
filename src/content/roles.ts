/** As pessoas da paróquia para quem o site fala. Uma página por papel (/para/<slug>). */
import type { Role } from "./modules";

export type RolePage = {
  slug: Role;
  icon: string;
  /** Como aparece no menu: "Para o Pároco". */
  menu: string;
  title: string;
  /** A frase que a pessoa diria. */
  quote: string;
  lead: string;
  /** O que muda no dia a dia dela. */
  gains: Array<[string, string]>;
  /** Módulos que mais importam para ela, por slug. */
  modules: string[];
  /** Ilustração do topo (public/ilustracoes/<name>-600|1200.webp). */
  image: { name: string; alt: string; width: number; height: number };
};

export const ROLES: RolePage[] = [
  {
    slug: "paroco",
    image: { name: "paroco-gestao-colaborativa", alt: "O pároco no notebook com duas pessoas da equipe, cada uma com o seu acesso ao\u00A0painel.", width: 1200, height: 1200 },
    icon: "church",
    menu: "Para o Pároco",
    title: "O site é da paróquia, não de quem cuida dele\u00A0hoje.",
    quote: "“Cheguei na paróquia e ninguém sabe a senha do\u00A0site.”",
    lead: "Padres são transferidos, secretárias mudam, voluntários trocam de pastoral. A\u00A0estrutura fica, cada pessoa tem o seu acesso e tudo o que muda deixa\u00A0rastro.",
    gains: [
      ["Visão de tudo, sem virar administrador de tecnologia", "Catequese, sacramentos, pastorais e dízimo num painel só, em palavras da\u00A0paróquia."],
      ["Quem mudou o quê", "Histórico de cada alteração, com a pessoa, a data e o valor\u00A0anterior."],
      ["Acesso que acompanha a função", "O coordenador vê a própria equipe; a secretaria, as inscrições; o padre,\u00A0tudo."],
      ["Cuidado com os dados dos fiéis", "Dado de fé e de menor tratado como sensível, com consentimento guardado e exclusão a\u00A0pedido."],
    ],
    modules: ["painel-e-equipe", "catequese", "sacramentos", "dizimo"],
  },
  {
    slug: "secretaria",
    image: { name: "secretaria-cadastro-catequese", alt: "Uma mãe inscreve o filho pelo celular enquanto a secretária confere a inscrição no\u00A0notebook.", width: 1200, height: 1200 },
    icon: "inbox",
    menu: "Para a Secretária",
    title: "Menos telefone, menos papel, menos\u00A0fila.",
    quote: "“Em fevereiro a fila da catequese dobra a\u00A0esquina.”",
    lead: "As perguntas repetidas do telefone ficam respondidas no site. A\u00A0inscrição chega pelo celular dos pais, com os documentos. O\u00A0horário muda uma vez e sai certo em todo\u00A0lugar.",
    gains: [
      ["Inscrição da catequese sem fila", "Os pais inscrevem pelo celular; a secretaria confere, confirma e define a\u00A0turma."],
      ["Documentos que não somem", "Certidões por foto, guardadas em local privado, com conferência e pedido de\u00A0refazer."],
      ["Pedidos de sacramento completos", "Cada pedido com os documentos e a situação, numa caixa\u00A0só."],
      ["Mudou o horário? Uma\u00A0vez só", "Missa, confissão e adoração cadastradas uma vez, com exceções de\u00A0data."],
    ],
    modules: ["catequese", "sacramentos", "missas-e-horarios", "avisos-e-agenda"],
  },
  {
    slug: "catequese",
    image: { name: "secretaria-cadastro-catequese", alt: "Uma mãe inscreve o filho na catequese pelo celular enquanto a secretaria confere a\u00A0inscrição.", width: 1200, height: 1200 },
    icon: "book",
    menu: "Para a Coordenação da Catequese",
    title: "Turmas, chamada e famílias num lugar\u00A0só.",
    quote: "“Planilha de turma, caderno de chamada e um grupo de WhatsApp com duzentos\u00A0pais.”",
    lead: "O caminho da catequese vem pronto e a paróquia ajusta: anos, idades, turmas e calendário pela Páscoa. O\u00A0catequista faz a chamada no celular e fala com cada família pelo\u00A0WhatsApp.",
    gains: [
      ["Turmas numa grade da semana", "Ano, dia, horário, local, vagas e catequistas. Lotou,\u00A0lista de\u00A0espera."],
      ["Chamada no celular", "Presente, falta ou falta justificada; a porcentagem de presença\u00A0acompanha."],
      ["Calendário que se calcula", "1ª Confissão, 1ª Eucaristia e Crisma pela data da Páscoa de cada\u00A0ano."],
      ["O que precisa de atenção", "Turma sem catequista, criança fora da idade, inscrição parada, presença\u00A0baixa."],
    ],
    modules: ["catequese", "avisos-e-agenda", "painel-e-equipe"],
  },
  {
    slug: "pastorais",
    image: { name: "coordenadores-equipe", alt: "A coordenadora no notebook, com as pessoas da equipe ligadas ao grupo em volta\u00A0dela.", width: 1200, height: 1200 },
    icon: "users",
    menu: "Para os Coordenadores",
    title: "Sua equipe organizada, com o seu próprio\u00A0acesso.",
    quote: "“Minha equipe está numa lista de papel que só eu\u00A0entendo.”",
    lead: "Cada grupo da paróquia tem a sua página no site e a sua equipe no painel. O\u00A0coordenador cuida da dele com um login só, sem depender da\u00A0secretaria.",
    gains: [
      ["Ativar o grupo em um clique", "Catálogo com cerca de cem pastorais, movimentos, ministérios e\u00A0equipes."],
      ["A equipe, com nome e contato", "Função, desde quando serve, observações, com o consentimento\u00A0registrado."],
      ["Um login para tudo que você coordena", "Canto, MESCE e uma turma de catequese aparecem no mesmo\u00A0painel."],
      ["Convite para novos voluntários", "A página do grupo diz o que faz, quando se reúne e como\u00A0participar."],
    ],
    modules: ["pastorais-e-ministerios", "avisos-e-agenda", "galeria"],
  },
  {
    slug: "pascom",
    image: { name: "pascom-selo", alt: "Selo da PASCOM: cruz sobre um globo conectado e o nome PASCOM\u00A0Brasil.", width: 1200, height: 1200 },
    icon: "megaphone",
    menu: "Para a PASCOM",
    title: "Informação digitada uma vez, certa no site\u00A0inteiro.",
    quote: "“Mudou o horário e o site ficou errado três\u00A0semanas.”",
    lead: "Aviso com validade, agenda com recorrência, notícia com data para publicar e fotos leves. O\u00A0Instagram e o WhatsApp continuam; o site é onde a informação oficial\u00A0mora.",
    gains: [
      ["Aviso que some na data", "Nada de festa junina na página inicial em\u00A0setembro."],
      ["Agenda com recorrência de verdade", "“Toda terça, 20h”, “primeira quinta do mês”, com exceções\u00A0pontuais."],
      ["Notícias com agendamento", "Rascunho, publicado, agendado; endereço próprio para\u00A0compartilhar."],
      ["Página inicial montável", "A PASCOM escolhe as seções e a ordem; o tema de cor é da\u00A0paróquia."],
    ],
    modules: ["avisos-e-agenda", "noticias", "galeria", "site-da-paroquia"],
  },
];

export const roleBySlug = (slug: string) => ROLES.find((r) => r.slug === slug);
