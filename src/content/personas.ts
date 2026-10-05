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
  quote: "“Em fevereiro a fila da catequese dobra a esquina.”",
  title: "Menos telefone, menos papel, menos fila.",
  lead: "As perguntas que mais chegam ao balcão ganham resposta no site, e as inscrições e os pedidos chegam prontos para você conferir. O\u00A0que muda, você muda uma vez.",
  image: { name: "secretaria-cadastro-catequese", alt: "Uma mãe inscreve o filho pelo celular enquanto a secretária confere a inscrição no notebook.", width: 1200, height: 1200 },
  routine: {
    eyebrow: "A rotina da secretaria",
    title: "O dia no balcão, sem o telefone tocando a cada cinco minutos.",
    lead: "Atendimento, documentos, avisos, recados do padre. O\u00A0painel organiza o que chega e responde por você o que se repete.",
    steps: [
      { when: "Ao abrir a secretaria", title: "Vê o que chegou.", text: "Inscrições da catequese e pedidos de sacramento num lugar só, cada um com a situação e os documentos.", icon: "inbox" },
      { when: "Quando o telefone toca", title: "Manda o link.", text: "Horário de missa, de confissão, o que levar para o batismo: a resposta já está na página certa do site.", icon: "bell" },
      { when: "No meio da manhã", title: "Confere os documentos.", text: "Certidão por foto ou PDF, enviada pelo link que só a família tem. O\u00A0que veio ilegível, você pede para refazer.", icon: "book" },
      { when: "No fim do expediente", title: "Atualiza o mural.", text: "Aviso com data para sair do ar e evento da semana, sem precisar lembrar de tirar depois.", icon: "clock" },
    ],
  },
  spotlight: {
    label: "Inscrições e pedidos",
    title: "Cada inscrição e cada pedido chegam completos, com os documentos.",
    text: "A família preenche pelo celular, à noite, sem fila. A\u00A0inscrição chega com os dados, a turma escolhida e os documentos; o pedido de sacramento, com a autorização de dados. Você\u00A0confere, muda a situação e baixa o que precisar.",
    points: ["Documentos em local privado: só a equipe autorizada abre", "Inscrição no balcão para quem não tem celular", "Lista de espera quando a turma lota"],
    link: { href: "/administracao#inscricoes-da-catequese", label: "Ver Inscrições da Catequese" },
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
  },
  features: {
    eyebrow: "02 · O site em dia",
    title: "Mudou o horário? Você\u00A0muda uma vez, e o site inteiro acompanha.",
    lead: "Cada informação é cadastrada uma vez e aparece certa em todas as páginas onde ela está.",
    cards: [
      { icon: "clock", title: "Missas e confissões", text: "Exceções de data (“24/12 às 20h em vez de 19h”), horários por capela e o aviso de quando é preciso agendar." },
      { icon: "bell", title: "Avisos e agenda", text: "Aviso com validade, evento que se repete de verdade e destaque na página inicial." },
      { icon: "church", title: "Sacramentos", text: "Uma página para cada sacramento, com documentos, preparação, datas e a observação em destaque." },
      { icon: "map", title: "Comunidades e capelas", text: "Endereço, foto, horários próprios e o botão “Como chegar” em cada comunidade." },
    ],
  },
  band: {
    eyebrow: "03 · Sem perder nada",
    title: "O que é delicado fica protegido, e o que muda deixa rastro.",
    lead: "A secretaria guarda dados de famílias, crianças e noivos. O\u00A0sistema cuida disso por você.",
    cards: [
      { icon: "shield", title: "Autorização guardada", text: "Inscrição e pedido de sacramento só são guardados com autorização expressa, e o texto aceito fica registrado." },
      { icon: "inbox", title: "Documentos privados", text: "Certidões e fotos das famílias não têm endereço público: só a equipe autorizada abre, pelo painel." },
      { icon: "users", title: "Cada um no seu acesso", text: "O coordenador cuida da própria equipe; a secretaria não vira suporte de ninguém." },
      { icon: "newspaper", title: "Quem mudou o quê", text: "Cada alteração fica registrada com a pessoa, a data e o valor anterior." },
    ],
  },
  closing: {
    eyebrow: "Feito para quem atende o balcão",
    title: "Sem termos técnicos. Missa,\u00A0aviso, turma, pastoral.",
    text: "O painel usa as palavras da paróquia e tem atalhos para o que você mais faz: mudar um horário, criar um aviso, ver as inscrições.",
  },
  cta: "Mais tempo para atender quem chega. Menos\u00A0tempo repetindo a mesma resposta ao telefone.",
};

export const COORDENADORES: Persona = {
  slug: "pastorais",
  eyebrow: "Para os Coordenadores",
  quote: "“Minha equipe está numa lista de papel que só eu entendo.”",
  title: "Sua equipe organizada, com o seu próprio acesso.",
  lead: "Pastoral, movimento, ministério ou turma de catequese: cada coordenador entra com o próprio login e cuida do que é dele, sem planilha, sem caderno e sem depender da secretaria.",
  image: { name: "coordenadores-equipe", alt: "A coordenadora no notebook, com as pessoas da equipe ligadas ao grupo em volta dela.", width: 1200, height: 1200 },
  routine: {
    eyebrow: "A rotina de quem coordena",
    title: "A semana do grupo, sem a lista de papel.",
    lead: "Encontros, escalas, gente nova chegando. O\u00A0painel guarda a equipe e deixa você só com o que importa.",
    steps: [
      { when: "Quando chega alguém novo", title: "Cadastra na equipe.", text: "Nome, contato, função e desde quando serve, direto do painel.", icon: "users" },
      { when: "Antes do encontro", title: "Confere quem é quem.", text: "A equipe sempre atualizada, com o telefone, a função e a data de nascimento de cada pessoa.", icon: "clock" },
      { when: "Na turma de catequese", title: "Faz a chamada no celular.", text: "Em “Minhas turmas”, o catequista registra a presença e vê o WhatsApp de cada família.", icon: "book" },
      { when: "Quando passa a coordenação", title: "A lista fica.", text: "Quem assume recebe o acesso e encontra a equipe inteira, sem recomeçar do zero.", icon: "shield" },
    ],
  },
  spotlight: {
    label: "Minha equipe",
    title: "A equipe inteira num lugar, e só você mexe nela.",
    text: "Cada coordenador vê e edita a própria equipe, e ninguém de outro grupo enxerga os dados dela. Quem\u00A0coordena dois grupos, ou um grupo e uma turma de catequese, vê tudo no mesmo login.",
    points: ["Nome, contato, função e desde quando serve", "Um login só para tudo o que você coordena", "Página pública do grupo: o que faz, quando se reúne, como participar"],
    link: { href: "/vida-paroquial#pastorais-e-ministerios", label: "Ver Pastorais e Ministérios" },
    ask: "Como faço para entrar no Ministério de Música?",
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
    title: "Cerca de cem grupos prontos. O\u00A0seu provavelmente já está lá.",
    lead: "A paróquia ativa os grupos que tem com um clique e informa quem coordena; o convite de acesso sai junto.",
    cards: [
      { icon: "heart", title: "Pastorais", text: "Pastoral da Criança, Pastoral Familiar, Pastoral do Dízimo, Pastoral da Comunicação e muitas outras." },
      { icon: "users", title: "Movimentos", text: "Encontro de Casais com Cristo, Renovação Carismática Católica, Legião de Maria, Terço dos Homens." },
      { icon: "church", title: "Ministérios e serviços", text: "Ministério de Música, MESCE, Ministros da Palavra, Coroinhas." },
      { icon: "shield", title: "Conselhos e equipes", text: "Conselho Pastoral Paroquial e Conselho de Assuntos Econômicos, entre outros." },
    ],
  },
  band: {
    eyebrow: "03 · A equipe é sua",
    title: "Os dados da sua equipe ficam com a sua equipe.",
    lead: "Telefone, e-mail e data de nascimento de voluntários merecem cuidado. Cada\u00A0um vê só o que é seu.",
    cards: [
      { icon: "shield", title: "Acesso restrito", text: "Você vê e edita a sua equipe. As\u00A0outras equipes não aparecem para você, e a sua não aparece para elas." },
      { icon: "inbox", title: "Convite por e-mail", text: "O acesso chega no e-mail do coordenador, sem senha compartilhada." },
      { icon: "clock", title: "Acesso que acompanha a função", text: "Quando a coordenação passa adiante, o acesso passa junto, e a equipe continua lá." },
      { icon: "users", title: "Conselho Pastoral", text: "A coordenação do Conselho Pastoral enxerga todas as equipes e edita só a dela." },
    ],
  },
  closing: {
    eyebrow: "Quando você passar a coordenação",
    title: "A lista não vai embora com você.",
    text: "Hoje, quando o coordenador muda de cidade, a lista vai junto. Aqui\u00A0a equipe fica com a paróquia: quem assume encontra todo mundo cadastrado e segue o trabalho.",
  },
  cta: "Mais tempo com a sua equipe. Menos\u00A0tempo procurando o telefone de cada um.",
};

export const PASCOM: Persona = {
  slug: "pascom",
  eyebrow: "Para a PASCOM",
  quote: "“Mudou o horário e o site ficou errado três semanas.”",
  title: "Informação digitada uma vez, certa no site inteiro.",
  lead: "Avisos com validade, agenda com recorrência, notícia com data para publicar e fotos leves. O\u00A0Instagram e o WhatsApp continuam espalhando; o site é onde a informação oficial mora.",
  image: { name: "pascom-selo", alt: "Selo da PASCOM: cruz sobre um globo conectado e o nome PASCOM Brasil.", width: 1200, height: 1200 },
  routine: {
    eyebrow: "A rotina da comunicação",
    title: "A semana da PASCOM, sem apagar incêndio.",
    lead: "Divulgar, fotografar, escrever, lembrar. O\u00A0painel tira de você o trabalho de corrigir o que ficou velho.",
    steps: [
      { when: "Na segunda-feira", title: "Monta a semana.", text: "Eventos que se repetem entram uma vez, e a agenda da semana aparece pronta no site.", icon: "calendar-range" },
      { when: "Antes da festa", title: "Agenda a notícia.", text: "Escreve com calma, escolhe a data e a hora, e ela entra no ar sozinha.", icon: "newspaper" },
      { when: "Depois da celebração", title: "Publica as fotos.", text: "Álbum com capa e legenda; as fotos ficam leves para o celular e sem dados de localização.", icon: "image" },
      { when: "Quando o evento acaba", title: "Não precisa tirar nada.", text: "O aviso sai do ar na data que você definiu e fica guardado no histórico.", icon: "bell" },
    ],
  },
  spotlight: {
    label: "Uma vez só",
    title: "Mudou o horário? Ninguém\u00A0precisa caçar o que ficou para trás.",
    text: "Cada informação é cadastrada uma vez. Quando\u00A0quem cuida dos horários altera uma missa, a página dela, a da comunidade e a página inicial mudam juntas, e o link que a PASCOM divulgou continua certo.",
    points: ["Endereço próprio para cada notícia, bom para compartilhar", "Rascunho, agendado, publicado, arquivado: nada some por engano", "Feed RSS para quem acompanha"],
    link: { href: "/comunicacao", label: "Ver Comunicação" },
    ask: "O horário que vocês postaram ainda vale?",
    art: { name: "sincronizacao-escura", alt: "Uma informação da paróquia é atualizada uma vez e aparece certa em quatro páginas: missas, terço, velas e confissões.", width: 1200, height: 900 },
  },
  features: {
    eyebrow: "02 · As ferramentas da PASCOM",
    title: "Tudo o que a comunicação publica, num painel só.",
    lead: "O acesso de comunicação cuida de avisos, agenda, notícias, fotos e seções do site.",
    cards: [
      { icon: "bell", title: "Avisos e agenda", text: "Aviso com data para sair do ar, evento que se repete (“toda terça, 20h”) e destaque na página inicial." },
      { icon: "newspaper", title: "Notícias", text: "Título, resumo, autor, categoria e publicação agendada, com endereço próprio para cada uma." },
      { icon: "image", title: "Galeria", text: "Álbuns por acontecimento, com capa, legenda e ordem; o que vai para a lixeira dá para recuperar." },
      { icon: "megaphone", title: "Seções e campanhas", text: "Uma seção própria para a festa do padroeiro ou a campanha da reforma, montada por blocos." },
    ],
  },
  band: {
    eyebrow: "03 · Cada um no seu papel",
    title: "A PASCOM cuida da comunicação. O\u00A0resto fica com quem cuida dele.",
    lead: "O acesso de comunicação não mexe em dízimo, inscrições nem usuários. Assim\u00A0ninguém tem medo de apertar o botão errado.",
    cards: [
      { icon: "megaphone", title: "Acesso de comunicação", text: "Avisos, agenda, notícias, fotos e seções. Só\u00A0o que é da PASCOM." },
      { icon: "image", title: "Fotos tratadas sozinhas", text: "Orientação corrigida, sem localização e leves para quem abre pelo celular." },
      { icon: "shield", title: "Nada some por engano", text: "Rascunho, arquivado e lixeira recuperável: errar não apaga o trabalho de ninguém." },
      { icon: "users", title: "Quem mudou o quê", text: "Cada alteração fica registrada com a pessoa e a data." },
    ],
  },
  closing: {
    eyebrow: "WhatsApp e Instagram continuam",
    title: "As redes espalham. O\u00A0site é a fonte.",
    text: "Divulgue nas redes o link da página certa: o horário, o aviso, a inscrição. Quando\u00A0algo muda, o link continua valendo.",
  },
  cta: "Mais tempo para comunicar. Menos\u00A0tempo corrigindo o que ficou errado.",
};
