# Textos do site: edição e revisão

## Onde estão todos os textos

| Documento | Idioma | URL |
| --- | --- | --- |
| [content/en.json](content/en.json) | Inglês, padrão | `/` |
| [content/pt.json](content/pt.json) | Português | `/pt/` |

Esses documentos alimentam o site diretamente. Não é preciso alterar componentes para trocar títulos, parágrafos, métricas, datas, tecnologias, legendas ou os capítulos da história. Não há tradução automática: revisar as duas versões.

### Mapa dos documentos

| Chave | Conteúdo |
| --- | --- |
| `meta` | Títulos de busca e descrição |
| `nav` | Navegação e seletor de idioma |
| `construction` | Abertura SOEL → Sistema San → Tsugrowth, blocos do hero, legendas do desenho e controle de movimento |
| `storyInvite` | Convite para a história, frases da faixa contínua e três fotos editoriais da home |
| `hero` | Headline, introdução, botões e cinco marcos da trajetória |
| `stats` | Quatro destaques da home |
| `experience` | Quatro experiências principais, com três bullets cada; pesquisa em `items[1].related`, ao lado do San |
| `work` | Introduções, seleção dos três projetos principais e rótulos dos estudos de caso |
| `projects` | Quatro cases: abertura do resumo (`built`), parágrafos `executive`, papel, status, links rotulados, métricas, contribuições, mídia real, stack e evolução |
| `explorations` | Smart Court e automação familiar: cartões iniciais, sem cases nem resultados inventados |
| `olympiads` | Seis entradas e distinção entre meta e conquista |
| `recognition` | Bolsas, programas e treinamentos; O Globo temporariamente removido |
| `story` | Introdução, resumo `overview` ao lado do retrato menor, foto da escola e capítulos da história |
| `contact` | CTA, email e LinkedIn |
| `footer` | Créditos e direção acadêmica |
| `resume` | Introdução do currículo, botão de impressão e habilidades |
| `notFound` | Textos reservados para a experiência de página inexistente |

Os números de capítulo dos cases, “CASE”, o monograma vetorial “F / Fausto Santos” e símbolos de navegação são elementos fixos de interface. As URLs dos projetos (`slug`) precisam permanecer iguais nos dois idiomas. O novo F é uma arte SVG própria: um bloco com profundidade e juntas de tijolo; não é uma cópia da marca enviada como referência.

## Como editar

1. Abrir o JSON do idioma desejado.
2. Alterar somente os textos entre aspas, sem apagar vírgulas, chaves ou colchetes.
3. Usar `\n` dentro de um texto para uma quebra editorial de linha. Nunca inserir HTML.
4. Atualizar o documento do outro idioma e manter a mesma estrutura.
5. Executar `npm run build`, `npm test` e `npm run typecheck` (os testes de exportação validam o build mais recente).
6. Publicar novamente. Não existe painel administrativo ou gravação de conteúdo no navegador.

Exemplo:

```json
{
  "title": "Building AI for public education.",
  "description": "Seu novo texto em inglês."
}
```

Listas podem crescer, mas devem manter a paridade entre idiomas. Os três destaques, por relevância, são Tsugrowth/EVER, San System — Sistema San e SOEL. A pesquisa é a origem do San, não um quarto destaque. Cada projeto principal tem quatro textos `star`, associados aos rótulos de situação, tarefa, ação e resultado/próximo passo. A composição mantém cinco marcos do hero e três métricas por projeto.

Na home e em trabalho, experiências usam rolagem horizontal nativa, sem autoplay. Setas, toque, scrollbar e teclado permitem navegar. Cada cartão tem três bullets; pesquisa e San são cartões adjacentes e vinculados. Sem JavaScript, o conteúdo segue no HTML e pode ser rolado. O currículo usa grade, e a impressão expande todos os cartões.

O cabeçalho mantém os cinco links visíveis acima de 1150 px. Até essa largura, usa o menu compacto; sem JavaScript, os links continuam abertos. O breakpoint considera os rótulos nos dois idiomas, sem reduzir o tamanho do texto.

## Fotos e capturas

Salvar os arquivos em `public/images/`. Os caminhos usados nos JSONs começam com `/images/`, sem `public`.

```json
{
  "media": {
    "src": "/images/sistema-san-planejamento.webp",
    "alt": "Descrição objetiva da interface, sem dados pessoais.",
    "caption": "Legenda com contexto e data."
  }
}
```

- Cases: `projects[n].media`.
- Retrato: `story.portrait`.
- Fotos da home: `storyInvite.photos[0..2]`. São três quadros de caderno de campo: pessoa, propósito e processo. Usar imagens verticais 4:5, pois a moldura recorta nessa proporção.
- `src` vazio mantém a área pendente dos cases e não renderiza um retrato fictício.
- Usar nomes minúsculos sem espaços/acentos e formatos WebP, AVIF, JPEG ou PNG.
- Configurar o mesmo arquivo nos dois idiomas, com `alt` e `caption` traduzidos.
- A área de imagem do case admite uma imagem principal; montagens devem usar somente capturas reais e aprovadas. Não simular resultados.
- Envie as imagens originais para otimização e revisão antes da publicação. Para a home, prefira três fotos verticais (4:5): retrato em contexto, trabalho com a equipe/aula e você apresentando ou construindo um projeto. Para os cases, prefira capturas reais da interface, documentos de arquitetura ou pôsteres autorizados.
- Antes do envio, remova ou anonimize nomes, fotos, listas, IDs e qualquer dado de estudantes, professores, escolas ou clientes. Não envie chaves, tokens, credenciais, arquivos `.env` nem material confidencial da Tsugrowth. Capturas do Sistema San e Tsugrowth só entram com autorização explícita.
- Ao receber os arquivos, confirmar com você o texto alternativo objetivo, a legenda e a autorização. O site não inventará capturas nem resultados.

## Evidência, status e links para candidaturas

- Cada case começa com **Executive summary / Resumo executivo**, usando `built` como abertura e três parágrafos `executive` para explicar problema, entrega, papel e estágio. A coluna lateral mantém papel e status. O antigo campo “Evidence” foi removido por pedido editorial; isso não remove a distinção factual entre entrega e plano.
- Três projetos aparecem como trabalho selecionado. A pesquisa em IA está disponível como case complementar, não como quarto destaque.
- URL base e canônica são `https://faustosantos.dev`. O domínio `faustosantos.vercel.app`, quando usado como endereço de deploy, não deve ser usado em links editoriais; a raiz `/` é inglês e `/pt/` é português.
- Os repositórios não serão liberados. `links` agora é uma lista de `{ "label": "...", "url": "https://..." }`. Só há links quando existe um destino aprovado; lista vazia não renderiza bloco nem aviso de demonstração indisponível. Nunca publicar credenciais, dados de estudantes/escolas/clientes ou material confidencial.
- O Sistema San usa a apresentação pública autorizada em `https://www.sistemasan.com.br/a16z-academy`. A imagem local é o painel real do diretor **com dados demonstrativos**, não evidência de resultados do piloto. O link “Abrir imagem completa” preserva a leitura dos detalhes.
- A SOEL aponta para o Instagram e YouTube oficiais fornecidos por Fausto. O **Cometa Olímpico** é descrito sem inventar capa ou download. O ERP interno em Node.js/TypeScript existe e tem adoção variável por cargo; a próxima plataforma continua em preparação.
- A Tsugrowth não publica o link do Notion, conforme pedido mais recente, nem interfaces internas. A pesquisa mantém o link para o documento original fornecido.
- `media.src` vazio agora **não renderiza nada**: não existe “Project Archive” ou painel vazio. A captura real com dados demonstrativos do San é preservada.

## Construção e movimento

- A identidade atual usa papel quente, terracota, verde-oliva, traços de planta e blocos em perspectiva. O azul/navy da primeira versão foi substituído por pedido de Fausto.
- A abertura apresenta três blocos em 2,6 segundos no máximo. É uma introdução gráfica, **não um indicador de carregamento de dados** e não usa porcentagens fictícias.
- A abertura ocorre na primeira entrada da home por sessão de aba. A chave `fausto:opening-seen` no `sessionStorage` evita repetição ao navegar. Não há cookie nem rastreamento.
- Os cases têm uma abertura gráfica própria com uma pessoa levando tijolos num carrinho de mão, com chave por projeto `fausto:opening:<slug>`. Dura no máximo 2,6 segundos, não depende de downloads, não usa progresso fictício e preserva pulo por tecla/toque, âncoras diretas, movimento reduzido e HTML legível sem JavaScript.
- O botão “Pular abertura”, qualquer toque/clique ou tecla dispensa a abertura; ela não prende foco nem bloqueia scroll. O primeiro clique na sobreposição a dispensa, sem ativar links que estavam atrás dela. Links diretos com âncora e movimento reduzido pulam a abertura.
- O hero começa sua montagem depois da abertura. Seus três blocos são links reais para os cases.
- A faixa convida para a história e pausa ao passar o mouse ou focar o link. O botão “Pausar movimento” pausa as animações; “Retomar movimento” as continua.
- `prefers-reduced-motion` torna a leitura estática, sem loader nem faixa contínua, com todo o conteúdo disponível. Sem JavaScript, o HTML continua legível e a abertura permanece oculta.
- O site não usa áudio nem controle de som. As animações de construção permanecem visuais.
- A barra fina no topo acompanha a leitura. A linha da história mantém seu progresso local.
- A impressão remove abertura, faixa, decoração e controles, preservando o currículo e o texto da origem pessoal na home.
- O layout base está em [../src/app/globals.css](../src/app/globals.css) e a direção visual de construção em [../src/app/construction.css](../src/app/construction.css).
- Cada página editorial tem **uma única divisória** com duas fiadas desencontradas, furos nos tijolos e uma régua de assentamento. O currículo não tem divisória. As fiadas são decorativas (`aria-hidden`), mas o texto pessoal dentro da divisória da home é conteúdo semântico e acessível.
- Cada parede se monta uma única vez ao entrar na tela, usando o mesmo mecanismo de reveal. Sem JavaScript ou com movimento reduzido, os tijolos aparecem completos. A pausa geral também interrompe sua montagem.
- No celular, cada fiada usa oito tijolos para manter os detalhes legíveis, sem aumentar a largura da página. O currículo não recebe divisórias, e a impressão oculta todas essas decorações.
- Os cartões selecionados não usam numeração decorativa; priorizam estágio, entrega e contexto STAR.
- Na home, `construction.origin` explica a relação pessoal com construção: trabalho na adolescência, ajuda aos pais e construção do próprio quarto. O texto fica dentro da composição de alvenaria antes dos projetos; não há datas ou detalhes novos presumidos. Os dois primeiros capítulos de `story.chapters` acompanham essa narrativa.
- A abertura tem uma pessoa ilustrada em SVG carregando tijolos até a obra. É um desenho simbólico, não uma foto ou reconstrução factual de Fausto. A caminhada dura menos que a abertura e preserva o botão de pular e movimento reduzido. O botão fica separado do painel; em telas baixas, o painel compacta os espaços e permite rolagem sem sobrepor o controle.
- `hero.title` contém a mensagem de crescimento e criação de estrutura para si e para os outros. O cartão social usa a mesma headline em inglês.

## Revisão factual antes de candidaturas

O site é uma implementação funcional; a revisão factual e as autorizações não podem ser substituídas pelo desenvolvimento.

| Tema | Tratamento atual | Confirmação necessária |
| --- | --- | --- |
| SOEL: 4 mil ensinados | Correção explícita de Fausto; 15 mil era alcance e foi removido | Manter período e evidências atualizados |
| SOEL: 35 voluntários, 9 times, ~50 processos, 4 parcerias | Correções atuais prevalecem sobre números divergentes da aplicação | Atualizar somente quando confirmados |
| SOEL: tecnologia e estágio | ERP interno Node.js/TypeScript usado com frequência variável por cargo; próxima plataforma em preparação | Correção atual substitui “não existe ERP” e a versão anterior “ninguém usa”; não afirmar 120 usuários ou 20% de melhoria |
| SOEL: comunidades e programas | 4 comunidades, 241 membros, clubes, 4 mentorias; neurociência com 20 participantes e uma pós-graduanda | Não somar membros às pessoas ensinadas nem chamar 4 comunidades de 4 parcerias |
| San: 15+ professores | Identificado como piloto, não escala ou ganho de aprendizagem | Data, uso ativo, quantidade de escolas e autorização para citar a rede |
| San / SAM | Display “San System — Sistema San”; URLs preservadas | Revisar nome de marca futuramente, sem quebrar links |
| Pesquisa: cronologia | Abril de 2025, conforme correção; 20+ artigos, 8 entrevistas | Documento original ligado como evidência |
| Pesquisa: “2 de 8” | Não publicado como ranking | Significado da expressão e categoria oficial |
| Pesquisa: premiações | ABRIC é reconhecimento; FEBRACE e Prêmio Jovem Cientista são submissões | Nunca transformar submissão em vitória nem “primeiro no Brasil” sem comprovação |
| Tsugrowth: ~US$5M / ~R$30M | Estimativa de pipeline de propostas, nunca receita; valor conservador atual, não US$6M+ da aplicação | Não inferir câmbio atual, receita ou valor dos três acordos |
| Tsugrowth: fluxo comercial | Notion: 6 etapas, 4 ferramentas, 9 skills, 56 marcas, 261 ideias, 12 decks e apoio a 3 parcerias | CEO negocia/preça, gerente valida; pós-venda não foi comprovado |
| EVER: 14 mil | Escopo previsto de colaboradores, não usuários ativos nem implantação pronta | Confirmar rollout e adoção depois do piloto |
| EVER: 20 usuários | Piloto previsto, não concluído | Status real depois de novembro de 2026 |
| EVER: produto | Android para promotor/supervisor, portal por cargo, pesquisas/fotos e regras de exceção com prazo/escalonamento | Piloto até 20 pessoas previsto para 27/11/2026; arquitetura/escopo não são implantação pronta |
| Tsugrowth: mensagens | Ferramenta interna em desenvolvimento para influenciadores e agentes sociais dos cruzeiros | Comparação com ManyChat explica propósito, não paridade de funcionalidades |
| IEO 2027 | Candidatura/meta, nunca seleção concluída | Atualizar somente após resultado oficial |
| Bolsas LaunchX / TKS | LaunchX acima de 90%, conforme correção; TKS sem percentual específico | Diferenciar oferta, aceite e conclusão; fonte não individualiza todos os percentuais |
| Pensi / Prep | Evitadas datas e rankings divergentes | Período escolar, tamanho e seletividade da turma |
| OBECON / Mendeleev / IA | Prata Top 20 / Top 9 Brasil / fase nacional Top 5% | IOAI e IEO continuam metas |
| Prep | R$24 mil com dupla (~US$5 mil à época), 45 mil+ views em uma semana, 20+ indicações | Não atribuir fundraising coletivo como individual |
| Smart Court | Cofundador: pesquisa, arquitetura, fluxos e ~40 telas; software em desenvolvimento | Demo 18/12/2026 é meta, não lançamento; nenhuma receita/modelo financeiro tratado como resultado |
| Automação familiar | Busca de produtos e cálculo de preços em desenvolvimento | Sem métricas de economia/receita inventadas |
| Origem pessoal | Versão editorial conservadora | Escrever em primeira pessoa e aprovar detalhes familiares/pessoais |

A referência contém informações familiares e pessoais sensíveis e notas internas “a confirmar”. Elas não foram copiadas integralmente para a página pública. Os detalhes de construção e moradia agora publicados foram fornecidos explicitamente por Fausto para compor a história, sem adicionar nomes, endereços, idades ou datas presumidas. Nenhum dado pessoal foi salvo em memória do assistente.

Os personal statements orientam o resumo e capítulos, não são republicados na íntegra. A narrativa pública foca prática de comunicação, iniciativa para estudar, acesso a laboratório, liderança e decisões de produto. Não publica diagnósticos, conflitos de terceiros, falências familiares, documentos privados ou detalhes de segurança do local. Não foi inferida idade atual; a referência “aos dez” é uma lembrança explícita do texto enviado. A foto da escola permanece pequena (original de 225×225), com legenda objetiva, sem ampliação artificial ou pessoas identificadas.

## Currículo

A página `/resume/` ou `/pt/resume/` gera um perfil a partir dos documentos. O botão “Print this profile / Imprimir este perfil” imprime explicitamente essa página, não um CV aprovado.

O PDF recebido é uma aplicação universitária completa e privada, não um currículo para download. Não deve ser adicionado ao repositório, ao diretório público ou ao botão. Uma versão profissional `.docx` em inglês e português foi preparada fora do repositório para revisão. Depois da aprovação e do envio/exportação do PDF final, adicionar somente esse currículo autorizado e trocar o botão por um link para ele. Não há arquivo público fictício ou aplicação privada publicada.

## Idiomas e publicação

- Inglês é a URL inicial e `x-default`; português é uma escolha explícita.
- O seletor mantém a página equivalente, inclusive nos cases.
- Para mudar o domínio, alterar `siteUrl` em [../src/lib/content.ts](../src/lib/content.ts) e reconstruir. Canonical, sitemap e dados estruturados compartilham essa configuração.
- Antes do envio: verificar fatos, fotos, CV oficial, URLs reais dos projetos, domínio e comportamento no celular.
