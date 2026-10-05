/**
 * Conteúdo das páginas "Para quem" reformuladas (05/10/2026): Secretária, Coordenadores e PASCOM. O Pároco tem
 * página própria (src/app/para/paroco). Regra de honestidade: cada frase descreve o que o papel da pessoa faz no
 * sistema hoje — secretaria (horários, conteúdo, sacramentos, catequese, inscrições), coordenação (a própria
 * equipe e, se for catequista, "Minhas turmas") e comunicação (avisos, agenda, notícias, seções, imagens, galeria).
 */
import type { Persona } from "@/components/site/persona-page";

export const SECRETARIA: Persona = {
  slug: "secretaria",
  eyebrow: "Para a Secretária",
  quote: "“Em fevereiro a fila da catequese dobra a\u00A0esquina.”",
  title: "Menos telefone, menos papel, menos\u00A0fila.",
  lead: "As perguntas que mais chegam ao balcão ganham resposta no site, e as inscrições e os pedidos chegam prontos para você conferir. O\u00A0que muda, você muda uma\u00A0vez.",
  image: { name: "secretaria-cadastro-catequese", alt: "Uma mãe inscreve o filho pelo celular enquanto a secretária confere a inscrição no\u00A0notebook.", width: 1200, height: 1200 },
  routine: {
    eyebrow: "A rotina da secretaria",
    title: "O dia no balcão, sem o telefone tocando a cada cinco\u00A0minutos.",
    lead: "Atendimento, documentos, avisos, recados do padre. O\u00A0painel organiza o que chega e responde por você o que se\u00A0repete.",
    steps: [
      { when: "Ao abrir a secretaria", title: "Vê o que\u00A0chegou.", text: "Inscrições da catequese e pedidos de sacramento num lugar só, cada um com a situação e os\u00A0documentos.", icon: "inbox" },
      { when: "Quando o telefone toca", title: "Manda o\u00A0link.", text: "Horário de missa, de confissão, o que levar para o batismo: a resposta já está na página certa do\u00A0site.", icon: "bell" },
      { when: "No meio da manhã", title: "Confere os\u00A0documentos.", text: "Certidão por foto ou PDF, enviada pelo link que só a família tem. O\u00A0que veio ilegível, você pede para\u00A0refazer.", icon: "book" },
      { when: "No fim do expediente", title: "Atualiza o\u00A0mural.", text: "Aviso com data para sair do ar e evento da semana, sem precisar lembrar de tirar\u00A0depois.", icon: "clock" },
    ],
  },
  spotlight: {
    label: "Inscrições e pedidos",
    title: "Cada inscrição e cada pedido chegam completos, com os\u00A0documentos.",
    text: "A família preenche pelo celular, à noite, sem fila. A\u00A0inscrição chega com os dados, a turma escolhida e os documentos; o pedido de sacramento, com a autorização de dados. Você\u00A0confere, muda a situação e baixa o que\u00A0precisar.",
    points: ["Documentos em local privado: só a equipe autorizada abre", "Inscrição no balcão para quem não tem celular", "Lista de espera quando a turma lota"],
    link: { href: "/administracao#inscricoes-da-catequese", label: "Ver Inscrições da Catequese" },
    ask: "Recebeu a certidão que mandei por\u00A0foto?",
    screen: {
      kicker: "Inscrições · Catequese 2027",
      lines: [
        { ok: true, text: "Ana Clara · Eucaristia 1 · documentos conferidos" },
        { text: "Pedro · Crisma · certidão para refazer" },
        { text: "Lucas · Eucaristia 1 · lista de espera" },
      ],
      chips: ["48 inscritos", "3 vagas"],
    },
  },
  features: {
    eyebrow: "02 · O site em dia",
    title: "Mudou o horário? Você\u00A0muda uma vez, e o site inteiro\u00A0acompanha.",
    lead: "Cada informação é cadastrada uma vez e aparece certa em todas as páginas onde ela\u00A0está.",
    cards: [
      { icon: "clock", title: "Missas e confissões", text: "Exceções de data (“24/12 às 20h em vez de 19h”), horários por capela e o aviso de quando é preciso\u00A0agendar." },
      { icon: "bell", title: "Avisos e agenda", text: "Aviso com validade, evento que se repete de verdade e destaque na página\u00A0inicial." },
      { icon: "church", title: "Sacramentos", text: "Uma página para cada sacramento, com documentos, preparação, datas e a observação em\u00A0destaque." },
      { icon: "map", title: "Comunidades e capelas", text: "Endereço, foto, horários próprios e o botão “Como chegar” em cada\u00A0comunidade." },
    ],
  },
  band: {
    eyebrow: "03 · Sem perder nada",
    title: "O que é delicado fica protegido, e o que muda deixa\u00A0rastro.",
    lead: "A secretaria guarda dados de famílias, crianças e noivos. O\u00A0sistema cuida disso por\u00A0você.",
    cards: [
      { icon: "shield", title: "Autorização guardada", text: "Inscrição e pedido de sacramento só são guardados com autorização expressa, e o texto aceito fica\u00A0registrado." },
      { icon: "inbox", title: "Documentos privados", text: "Certidões e fotos das famílias não têm endereço público: só a equipe autorizada abre, pelo\u00A0painel." },
      { icon: "users", title: "Cada um no seu acesso", text: "O coordenador cuida da própria equipe; a secretaria não vira suporte de\u00A0ninguém." },
      { icon: "newspaper", title: "Quem mudou o quê", text: "Cada alteração fica registrada com a pessoa, a data e o valor\u00A0anterior." },
    ],
  },
  closing: {
    eyebrow: "Feito para quem atende o balcão",
    title: "Sem termos técnicos. Missa,\u00A0aviso, turma,\u00A0pastoral.",
    text: "O painel usa as palavras da paróquia e tem atalhos para o que você mais faz: mudar um horário, criar um aviso, ver as\u00A0inscrições.",
  },
  cta: "Mais tempo para atender quem chega. Menos\u00A0tempo repetindo a mesma resposta ao\u00A0telefone.",
};

export const COORDENADORES: Persona = {
  slug: "pastorais",
  eyebrow: "Para os Coordenadores",
  quote: "“Minha equipe está numa lista de papel que só eu\u00A0entendo.”",
  title: "Sua equipe organizada, com o seu próprio\u00A0acesso.",
  lead: "Pastoral, movimento, ministério ou turma de catequese: cada coordenador entra com o próprio login e cuida do que é dele, sem planilha, sem caderno e sem depender da\u00A0secretaria.",
  image: { name: "coordenadores-equipe", alt: "A coordenadora no notebook, com as pessoas da equipe ligadas ao grupo em volta\u00A0dela.", width: 1200, height: 1200 },
  routine: {
    eyebrow: "A rotina de quem coordena",
    title: "A semana do grupo, sem a lista de\u00A0papel.",
    lead: "Encontros, escalas, gente nova chegando. O\u00A0painel guarda a equipe e deixa você só com o que\u00A0importa.",
    steps: [
      { when: "Quando chega alguém novo", title: "Cadastra na\u00A0equipe.", text: "Nome, contato, função e desde quando serve, direto do\u00A0painel.", icon: "users" },
      { when: "Antes do encontro", title: "Confere quem é\u00A0quem.", text: "A equipe sempre atualizada, com o telefone, a função e a data de nascimento de cada\u00A0pessoa.", icon: "clock" },
      { when: "Na turma de catequese", title: "Faz a chamada no\u00A0celular.", text: "Em “Minhas turmas”, o catequista registra a presença e vê o WhatsApp de cada\u00A0família.", icon: "book" },
      { when: "Quando passa a coordenação", title: "A lista\u00A0fica.", text: "Quem assume recebe o acesso e encontra a equipe inteira, sem recomeçar do\u00A0zero.", icon: "shield" },
    ],
  },
  spotlight: {
    label: "Minha equipe",
    title: "A equipe inteira num lugar, e só você mexe\u00A0nela.",
    text: "Cada coordenador vê e edita a própria equipe, e ninguém de outro grupo enxerga os dados dela. Quem\u00A0coordena dois grupos, ou um grupo e uma turma de catequese, vê tudo no mesmo\u00A0login.",
    points: ["Nome, contato, função e desde quando serve", "Um login só para tudo o que você coordena", "Página pública do grupo: o que faz, quando se reúne, como participar"],
    link: { href: "/vida-paroquial#pastorais-e-ministerios", label: "Ver Pastorais e Ministérios" },
    ask: "Como faço para entrar no Ministério de\u00A0Música?",
    screen: {
      kicker: "Minhas equipes · João",
      rows: [
        { icon: "users", text: "Ministério de Música", tag: "14 pessoas" },
        { icon: "users", text: "MESCE", tag: "9 pessoas" },
        { icon: "book", text: "Turma Euc. 1\u00A0· sábado, 9h", tag: "18 crianças" },
      ],
      chips: ["Um login só", "Só o que você coordena"],
    },
  },
  features: {
    eyebrow: "02 · Para cada tipo de grupo",
    title: "Cerca de cem grupos prontos. O\u00A0seu provavelmente já está\u00A0lá.",
    lead: "A paróquia ativa os grupos que tem com um clique e informa quem coordena; o convite de acesso sai\u00A0junto.",
    cards: [
      { icon: "heart", title: "Pastorais", text: "Pastoral da Criança, Pastoral Familiar, Pastoral do Dízimo, Pastoral da Comunicação e muitas\u00A0outras." },
      { icon: "users", title: "Movimentos", text: "Encontro de Casais com Cristo, Renovação Carismática Católica, Legião de Maria, Terço dos\u00A0Homens." },
      { icon: "church", title: "Ministérios e serviços", text: "Ministério de Música, MESCE, Ministros da Palavra,\u00A0Coroinhas." },
      { icon: "shield", title: "Conselhos e equipes", text: "Conselho Pastoral Paroquial e Conselho de Assuntos Econômicos, entre\u00A0outros." },
    ],
  },
  band: {
    eyebrow: "03 · A equipe é sua",
    title: "Os dados da sua equipe ficam com a sua\u00A0equipe.",
    lead: "Telefone, e-mail e data de nascimento de voluntários merecem cuidado. Cada\u00A0um vê só o que é\u00A0seu.",
    cards: [
      { icon: "shield", title: "Acesso restrito", text: "Você vê e edita a sua equipe. As\u00A0outras equipes não aparecem para você, e a sua não aparece para\u00A0elas." },
      { icon: "inbox", title: "Convite por e-mail", text: "O acesso chega no e-mail do coordenador, sem senha\u00A0compartilhada." },
      { icon: "clock", title: "Acesso que acompanha a função", text: "Quando a coordenação passa adiante, o acesso passa junto, e a equipe continua\u00A0lá." },
      { icon: "users", title: "Conselho Pastoral", text: "A coordenação do Conselho Pastoral enxerga todas as equipes e edita só a\u00A0dela." },
    ],
  },
  closing: {
    eyebrow: "Quando você passar a coordenação",
    title: "A lista não vai embora com\u00A0você.",
    text: "Hoje, quando o coordenador muda de cidade, a lista vai junto. Aqui\u00A0a equipe fica com a paróquia: quem assume encontra todo mundo cadastrado e segue o\u00A0trabalho.",
  },
  cta: "Mais tempo com a sua equipe. Menos\u00A0tempo procurando o telefone de cada\u00A0um.",
};

export const PASCOM: Persona = {
  slug: "pascom",
  eyebrow: "Para a PASCOM",
  quote: "“Mudou o horário e o site ficou errado três\u00A0semanas.”",
  title: "Informação digitada uma vez, certa no site\u00A0inteiro.",
  lead: "Avisos com validade, agenda com recorrência, notícia com data para publicar e fotos leves. O\u00A0Instagram e o WhatsApp continuam espalhando; o site é onde a informação oficial\u00A0mora.",
  image: { name: "pascom-selo", alt: "Selo da PASCOM: cruz sobre um globo conectado e o nome PASCOM\u00A0Brasil.", width: 1200, height: 1200 },
  routine: {
    eyebrow: "A rotina da comunicação",
    title: "A semana da PASCOM, sem apagar\u00A0incêndio.",
    lead: "Divulgar, fotografar, escrever, lembrar. O\u00A0painel tira de você o trabalho de corrigir o que ficou\u00A0velho.",
    steps: [
      { when: "Na segunda-feira", title: "Monta a\u00A0semana.", text: "Eventos que se repetem entram uma vez, e a agenda da semana aparece pronta no\u00A0site.", icon: "calendar-range" },
      { when: "Antes da festa", title: "Agenda a\u00A0notícia.", text: "Escreve com calma, escolhe a data e a hora, e ela entra no ar\u00A0sozinha.", icon: "newspaper" },
      { when: "Depois da celebração", title: "Publica as\u00A0fotos.", text: "Álbum com capa e legenda; as fotos ficam leves para o celular e sem dados de\u00A0localização.", icon: "image" },
      { when: "Quando o evento acaba", title: "Não precisa tirar\u00A0nada.", text: "O aviso sai do ar na data que você definiu e fica guardado no\u00A0histórico.", icon: "bell" },
    ],
  },
  spotlight: {
    label: "Uma vez só",
    title: "Mudou o horário? Ninguém\u00A0precisa caçar o que ficou para\u00A0trás.",
    text: "Cada informação é cadastrada uma vez. Quando\u00A0quem cuida dos horários altera uma missa, a página dela, a da comunidade e a página inicial mudam juntas, e o link que a PASCOM divulgou continua\u00A0certo.",
    points: ["Endereço próprio para cada notícia, bom para compartilhar", "Rascunho, agendado, publicado, arquivado: nada some por engano", "Feed RSS para quem acompanha"],
    link: { href: "/comunicacao", label: "Ver Comunicação" },
    ask: "O horário que vocês postaram ainda\u00A0vale?",
    art: { name: "sincronizacao-escura", alt: "Uma informação da paróquia é atualizada uma vez e aparece certa em quatro páginas: missas, terço, velas e\u00A0confissões.", width: 1200, height: 900 },
  },
  features: {
    eyebrow: "02 · As ferramentas da PASCOM",
    title: "Tudo o que a comunicação publica, num painel\u00A0só.",
    lead: "O acesso de comunicação cuida de avisos, agenda, notícias, fotos e seções do\u00A0site.",
    cards: [
      { icon: "bell", title: "Avisos e agenda", text: "Aviso com data para sair do ar, evento que se repete (“toda terça, 20h”) e destaque na página\u00A0inicial." },
      { icon: "newspaper", title: "Notícias", text: "Título, resumo, autor, categoria e publicação agendada, com endereço próprio para cada\u00A0uma." },
      { icon: "image", title: "Galeria", text: "Álbuns por acontecimento, com capa, legenda e ordem; o que vai para a lixeira dá para\u00A0recuperar." },
      { icon: "megaphone", title: "Seções e campanhas", text: "Uma seção própria para a festa do padroeiro ou a campanha da reforma, montada por\u00A0blocos." },
    ],
  },
  band: {
    eyebrow: "03 · Cada um no seu papel",
    title: "A PASCOM cuida da comunicação. O\u00A0resto fica com quem cuida\u00A0dele.",
    lead: "O acesso de comunicação não mexe em dízimo, inscrições nem usuários. Assim\u00A0ninguém tem medo de apertar o botão\u00A0errado.",
    cards: [
      { icon: "megaphone", title: "Acesso de comunicação", text: "Avisos, agenda, notícias, fotos e seções. Só\u00A0o que é da\u00A0PASCOM." },
      { icon: "image", title: "Fotos tratadas sozinhas", text: "Orientação corrigida, sem localização e leves para quem abre pelo\u00A0celular." },
      { icon: "shield", title: "Nada some por engano", text: "Rascunho, arquivado e lixeira recuperável: errar não apaga o trabalho de\u00A0ninguém." },
      { icon: "users", title: "Quem mudou o quê", text: "Cada alteração fica registrada com a pessoa e a\u00A0data." },
    ],
  },
  closing: {
    eyebrow: "WhatsApp e Instagram continuam",
    title: "As redes espalham. O\u00A0site é a\u00A0fonte.",
    text: "Divulgue nas redes o link da página certa: o horário, o aviso, a inscrição. Quando\u00A0algo muda, o link continua\u00A0valendo.",
  },
  cta: "Mais tempo para comunicar. Menos\u00A0tempo corrigindo o que ficou\u00A0errado.",
};
