# Católico Digital — Plano Mestre do Site de Lançamento, Captação e Vendas

## Finalidade deste pacote
Este diretório foi preparado para orientar o desenvolvimento do **site público do Católico Digital** por um agente de desenvolvimento como o Codex.

O site deverá cumprir simultaneamente quatro funções:

1. **Institucional:** explicar o que é o Católico Digital, para quem existe, quem está por trás e por que é confiável.
2. **Aquisição:** gerar tráfego orgânico, mídia paga, indicações, compartilhamentos e descoberta por mecanismos de busca e IA.
3. **Conversão:** transformar visitantes em leads qualificados, demonstrações, testes, cadastros ou compras.
4. **Mensuração:** registrar toda a jornada relevante sem depender apenas de pixels de terceiros.

Este pacote **não descreve o SaaS interno completo**. Ele descreve o site público, a camada de aquisição/conversão, as integrações necessárias e os pontos de contato com o produto.

## Princípios obrigatórios
- Mobile-first.
- Server-first: renderizar no servidor sempre que possível.
- JavaScript apenas onde gera valor real.
- Nenhuma dependência sem justificativa.
- Nenhum dado pessoal coletado sem finalidade definida.
- Dados religiosos devem ser tratados como potencialmente sensíveis.
- Não armazenar dados de cartão.
- Consentimento para cookies não essenciais.
- Eventos de conversão críticos enviados também do servidor quando possível.
- SEO técnico desde o primeiro commit.
- Conteúdo estruturado para busca tradicional e respostas geradas por IA.
- Acessibilidade como requisito, não acabamento.
- Performance tratada como requisito funcional.
- Arquitetura preparada para evoluir sem transformar o MVP em plataforma excessivamente complexa.

## Stack recomendada
- Next.js com App Router
- TypeScript estrito
- React
- Tailwind CSS
- shadcn/ui como base de componentes, com identidade visual própria
- PostgreSQL
- Prisma ORM
- Zod
- React Hook Form apenas em formulários interativos
- Redis opcional, somente quando existir necessidade comprovada
- Docker
- Deploy em VPS/Coolify ou plataforma compatível
- Cloudflare na borda
- S3-compatible object storage para mídia, se necessário
- Serviço de e-mail transacional
- Gateway de pagamento com checkout hospedado
- GTM + GA4 + Google Ads + Meta Pixel/CAPI, todos controlados por consentimento
- Search Console + Bing Webmaster Tools
- Sentry ou equivalente para erros
- Uptime monitoring externo

## Organização dos documentos
- `01` — escopo e requisitos
- `02` — arquitetura e stack
- `03` — arquitetura de informação e rotas
- `04` — banco de dados
- `05` — copy e conversão
- `06` — UI/UX e responsividade
- `07` — SEO
- `08` — AEO/GEO e busca por IA
- `09` — tracking e atribuição
- `10` — leads, CRM e automação
- `11` — pagamentos e transações
- `12` — LGPD, privacidade e cookies
- `13` — segurança
- `14` — performance, acessibilidade e qualidade
- `15` — infraestrutura, deploy e observabilidade
- `16` — testes e QA
- `17` — roadmap de execução
- `18` — variáveis de ambiente e segredos
- `19` — protocolo de trabalho do Codex
- `20` — padrões de conteúdo e dados estruturados

## Regra para o Codex
Antes de implementar qualquer feature, o Codex deve:
1. identificar o requisito;
2. localizar o documento correspondente;
3. registrar qualquer decisão que altere a arquitetura;
4. implementar a menor solução que atenda ao requisito;
5. adicionar teste;
6. validar segurança, privacidade, responsividade e tracking;
7. não criar funcionalidades não solicitadas.

## Critério de pronto
Uma página só é considerada pronta quando:
- visual final aprovado;
- responsiva;
- navegável por teclado;
- sem erro no console;
- sem erro de hidratação;
- metadata correta;
- canonical correta;
- JSON-LD válido quando aplicável;
- tracking validado;
- consentimento respeitado;
- Core Web Vitals dentro das metas em cenário realista;
- formulário protegido contra abuso;
- estados loading/error/success implementados;
- testes mínimos passando.
