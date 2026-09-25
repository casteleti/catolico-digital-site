# 06 — UI/UX, design system e responsividade

## 1. Objetivo visual
O produto deve transmitir:
- confiança;
- simplicidade;
- cuidado;
- organização;
- contemporaneidade;
- respeito ao contexto religioso.

Evitar estética de template SaaS genérico.

## 2. Design system
Criar tokens:
```text
colors
typography
spacing
radius
shadow
border
container
breakpoints
z-index
motion
```

Nunca espalhar valores arbitrários sem token.

## 3. Tipografia
Regras:
- 1 família principal, no máximo 2.
- carregamento local ou otimizado.
- pesos estritamente necessários.
- line-height confortável.
- largura máxima de texto de leitura: ~65–75 caracteres.

## 4. Componentes
Criar:
- Button
- LinkButton
- Container
- Section
- Heading
- Text
- Badge
- Card
- FeatureCard
- Testimonial
- PricingCard
- FAQ
- FormField
- Input
- Select
- Textarea
- Alert
- Modal/Dialog
- Navbar
- MobileMenu
- Footer
- Breadcrumb
- ConsentBanner

## 5. Breakpoints
Projetar primeiro para:
- 320–374
- 375–479
- 480–767
- 768–1023
- 1024–1439
- >=1440

Os breakpoints do CSS podem ser menores em quantidade; estes tamanhos são cenários de QA.

## 6. Mobile
Obrigatório:
- CTA visível;
- touch target >= 44x44 px sempre que viável;
- menu acessível;
- nada depende de hover;
- cards não ficam comprimidos;
- tabelas viram cards, scroll controlado ou layout alternativo;
- modais cabem na viewport;
- teclado virtual não quebra formulário.

## 7. Desktop
- limitar largura de conteúdo;
- evitar linhas extremamente longas;
- grids fluidos;
- espaço em branco intencional;
- foco no percurso visual.

## 8. Imagens
- `alt` descritivo quando informativas;
- `alt=""` quando puramente decorativas;
- não colocar texto essencial dentro de imagem;
- crop coerente em mobile/desktop.

## 9. Motion
- discreto;
- funcional;
- duração curta;
- respeitar `prefers-reduced-motion`;
- evitar parallax pesado;
- evitar animações que atrasem LCP.

## 10. Acessibilidade
- HTML semântico;
- `main`, `nav`, `header`, `footer`;
- labels reais;
- mensagens de erro associadas;
- foco visível;
- ordem de tabulação natural;
- sem `div` clicável no lugar de botão;
- aria apenas quando HTML nativo não resolve;
- modal com focus trap correto;
- skip-link.

## 11. Estados
Todo componente interativo precisa:
- default;
- hover;
- focus;
- active;
- disabled;
- loading;
- error;
- success quando aplicável.

## 12. Dark mode
Não implementar no MVP salvo exigência de marca/produto.
