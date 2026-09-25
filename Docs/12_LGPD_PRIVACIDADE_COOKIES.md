# 12 — LGPD, privacidade, cookies e governança de dados

> Este documento é orientação técnica de implementação e deve ser revisado juridicamente antes do lançamento.

## 1. Ponto crítico do Católico Digital
A LGPD classifica como dado pessoal sensível informação sobre **convicção religiosa** e **filiação a organização de caráter religioso**.

Por isso, o projeto deve aplicar minimização rigorosa de dados.

Um formulário B2B pode precisar saber a organização representada; isso não significa que seja necessário perguntar a crença pessoal do usuário.

## 2. Inventário
Antes do go-live, criar tabela de tratamento:
```text
dado
origem
finalidade
base legal
sistema
operador
retenção
compartilhamento
segurança
```

## 3. Finalidade
Nenhum campo deve existir sem finalidade documentada.

## 4. Bases
Mapear individualmente:
- execução de contrato;
- procedimentos preliminares;
- obrigação legal;
- consentimento;
- legítimo interesse quando cabível e avaliado;
- hipóteses específicas de dados sensíveis.

Não usar “consentimento” como justificativa genérica para tudo.

## 5. Formulários
Exibir:
- finalidade principal;
- link para privacidade;
- checkbox separado para marketing quando aplicável.

Não pré-marcar consentimento.

## 6. Cookies
Categorias:
- necessários;
- funcionalidade;
- analytics/desempenho;
- publicidade.

Cookies não necessários devem seguir política de consentimento adotada.

## 7. Banner
Primeira camada:
- texto claro;
- aceitar;
- rejeitar não necessários;
- configurar.

Evitar dark patterns:
- rejeitar escondido;
- contraste inferior;
- consentimento forçado sem necessidade.

## 8. Preferências
Usuário deve poder reabrir configurações de cookies no footer.

## 9. Consent log
Registrar quando necessário:
- versão;
- categorias;
- data/hora;
- identificador pseudônimo;
- origem.

## 10. Política de privacidade
Deve explicar:
- controlador;
- contato;
- dados;
- finalidades;
- bases;
- compartilhamentos;
- transferências;
- retenção;
- segurança;
- direitos;
- canal do titular;
- cookies;
- atualizações.

## 11. Titulares
Criar processo para:
- confirmação;
- acesso;
- correção;
- anonimização/bloqueio/eliminação conforme aplicável;
- portabilidade quando aplicável;
- informação sobre compartilhamento;
- revogação de consentimento;
- oposição nos casos cabíveis.

## 12. Segurança
Aplicar:
- controle de acesso;
- 2FA administrativo;
- criptografia em trânsito;
- backup;
- segregação de ambientes;
- logs;
- resposta a incidentes.

## 13. Incidente
Criar playbook:
1. detectar;
2. conter;
3. preservar evidências;
4. classificar dados;
5. identificar titulares;
6. avaliar risco;
7. decidir comunicações conforme obrigação;
8. corrigir;
9. registrar.

## 14. Terceiros
Manter inventário de:
- hosting;
- CDN;
- e-mail;
- CRM;
- analytics;
- pagamento;
- atendimento;
- monitoramento.

Registrar país/região de processamento quando relevante.

## 15. Dados de menores
Se o produto eventualmente tratar dados de crianças ou adolescentes, isso exige desenho específico e revisão jurídica adicional. O site público não deve coletar esses dados sem necessidade clara.

## 16. Referências oficiais
- Lei 13.709/2018 — LGPD
- ANPD — Guia de Cookies
- ANPD — Guia de Segurança da Informação
