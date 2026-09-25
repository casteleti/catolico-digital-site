# 03 — Arquitetura de informação, páginas e rotas

## 1. Navegação principal sugerida
- Produto
- Soluções
- Recursos
- Preços
- Conteúdos
- Sobre
- Entrar
- CTA principal

## 2. Rotas

```text
/
 /produto
 /funcionalidades
 /solucoes
 /solucoes/[segmento]
 /precos
 /como-funciona
 /seguranca
 /sobre
 /contato
 /demo
 /blog
 /blog/[slug]
 /guias/[slug]
 /faq
 /entrar
 /cadastro
 /obrigado/[tipo]
 /privacidade
 /cookies
 /termos
```

## 3. Home
Ordem recomendada:
1. Hero.
2. Prova/credibilidade.
3. Problema.
4. Transformação/proposta de valor.
5. Como funciona.
6. Principais funcionalidades.
7. Segmentos.
8. Benefícios.
9. Demonstração visual.
10. Segurança/confiança.
11. Depoimentos/casos quando existirem.
12. Pricing resumido.
13. FAQ.
14. CTA final.

Não inserir seções apenas para “encher” a página.

## 4. Página Produto
Deve explicar:
- o que é;
- quem usa;
- situação antes/depois;
- tarefas resolvidas;
- fluxo;
- principais recursos;
- integração;
- segurança;
- CTA.

## 5. Soluções por segmento
Cada página deve ser realmente específica.
Não trocar somente o título.

Estrutura:
- contexto;
- problemas típicos;
- solução;
- recursos mais relevantes;
- exemplos de uso;
- FAQ específico;
- CTA específico.

## 6. Pricing
Obrigatório:
- preço ou mensagem clara quando houver venda consultiva;
- periodicidade;
- impostos quando relevante;
- o que está incluso;
- limites;
- diferenças entre planos;
- trial;
- cancelamento;
- FAQ de cobrança.

## 7. Conteúdo
Taxonomia simples:
- Gestão
- Comunicação
- Evangelização digital
- Presença digital
- Tecnologia
- Boas práticas

Evitar dezenas de categorias vazias.

## 8. Estados de páginas
Toda rota deve prever:
- normal;
- loading;
- erro;
- vazio;
- não encontrado.

## 9. URLs
- minúsculas;
- kebab-case;
- sem acentos;
- estáveis;
- sem datas na URL de artigos;
- sem parâmetros em URL indexável;
- redirecionamentos 301 se slug mudar.
