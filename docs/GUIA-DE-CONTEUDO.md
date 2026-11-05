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
| `construction` | Abertura SOEL → Sistema San → OBECON, blocos do hero, legendas do desenho e controle de movimento |
| `storyInvite` | Convite para a história, frases da faixa contínua e três fotos editoriais da home |
| `hero` | Headline, introdução, botões e cinco marcos da trajetória |
| `stats` | Quatro destaques da home |
| `experience` | Introdução e cinco experiências em formato de ação + resultado, compartilhadas com trabalho e currículo |
| `work` | Introduções, seleção dos três projetos principais e rótulos dos estudos de caso |
| `projects` | Quatro cases: entrega (`built`), papel, status, evidência, links, resumo, métricas, problema, contribuição, mídia, stack e evolução |
| `olympiads` | Cinco olimpíadas e distinção entre meta e conquista |
| `recognition` | Bolsas, programas e imprensa |
| `story` | Introdução, retrato opcional e capítulos da história |
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
5. Executar `npm test`, `npm run typecheck` e `npm run build`.
6. Publicar novamente. Não existe painel administrativo ou gravação de conteúdo no navegador.

Exemplo:

```json
{
  "title": "Building AI for public education.",
  "description": "Seu novo texto em inglês."
}
```

Listas podem crescer, mas devem manter a paridade entre idiomas. O portfólio em destaque apresenta três projetos — SOEL, Sistema San e Tsugrowth/EVER — e mantém pesquisa em IA como material de apoio ao Sistema San. A composição atual foi desenhada para cinco marcos do hero e três métricas por projeto. Para mudar essas quantidades, revisar também os testes e o layout.

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

- Cada case começa com “What I built / My role / Status / Evidence / Links” (traduzido em `/pt/`), seguido pela descrição e material visual. Os cases do Sistema San e EVER estão explicitamente marcados como em desenvolvimento; piloto não significa resultado de aprendizagem comprovado.
- Três projetos aparecem como trabalho selecionado. A pesquisa em IA está disponível como case complementar, não como quarto destaque.
- URL base e canônica são `https://faustosantos.dev`. O domínio `faustosantos.vercel.app`, quando usado como endereço de deploy, não deve ser usado em links editoriais; a raiz `/` é inglês e `/pt/` é português.
- Os repositórios não serão liberados: não há campos, botões ou convites para acesso ao código. `links.demo` aceita apenas apresentações públicas aprovadas. Nunca publicar credenciais, dados de estudantes/escolas/clientes ou código/confidenciais de empregadores.
- O Sistema San usa a apresentação pública autorizada em `https://www.sistemasan.com.br/a16z-academy`. A imagem local é o painel real do diretor **com dados demonstrativos**, não evidência de resultados do piloto. O link “Abrir imagem completa” preserva a leitura dos detalhes.
- A SOEL não tem mais as capturas antigas do ERP. O case menciona o **Cometa Olímpico**, livro de astronomia criado em equipe, sem inventar capa, arquivo ou link de download. Quando houver um exemplar autorizado, ele poderá ser adicionado.

## Construção e movimento

- A identidade atual usa papel quente, terracota, verde-oliva, traços de planta e blocos em perspectiva. O azul/navy da primeira versão foi substituído por pedido de Fausto.
- A abertura apresenta três blocos em 2,6 segundos no máximo. É uma introdução gráfica, **não um indicador de carregamento de dados** e não usa porcentagens fictícias.
- A abertura ocorre na primeira entrada da home por sessão de aba. A chave `fausto:opening-seen` no `sessionStorage` evita repetição ao navegar. Não há cookie nem rastreamento.
- O botão “Pular abertura”, qualquer toque/clique ou tecla dispensa a abertura; ela não prende foco nem bloqueia scroll. O primeiro clique na sobreposição a dispensa, sem ativar links que estavam atrás dela. Links diretos com âncora e movimento reduzido pulam a abertura.
- O hero começa sua montagem depois da abertura. Os blocos do hero são links reais para os cases e a seção de olimpíadas.
- A faixa convida para a história e pausa ao passar o mouse ou focar o link. O botão “Pausar movimento” pausa as animações; “Retomar movimento” as continua.
- `prefers-reduced-motion` torna a leitura estática, sem loader nem faixa contínua, com todo o conteúdo disponível. Sem JavaScript, o HTML continua legível e a abertura permanece oculta.
- A barra fina no topo acompanha a leitura. A linha da história mantém seu progresso local.
- A impressão remove abertura, faixa, decoração e controles, preservando o currículo e o texto da origem pessoal na home.
- O layout base está em [../src/app/globals.css](../src/app/globals.css) e a direção visual de construção em [../src/app/construction.css](../src/app/construction.css).
- Cada página editorial tem **uma única divisória** com duas fiadas desencontradas, furos nos tijolos e uma régua de assentamento. O currículo não tem divisória. As fiadas são decorativas (`aria-hidden`), mas o texto pessoal dentro da divisória da home é conteúdo semântico e acessível.
- Cada parede se monta uma única vez ao entrar na tela, usando o mesmo mecanismo de reveal. Sem JavaScript ou com movimento reduzido, os tijolos aparecem completos. A pausa geral também interrompe sua montagem.
- No celular, cada fiada usa oito tijolos para manter os detalhes legíveis, sem aumentar a largura da página. O currículo não recebe divisórias, e a impressão oculta todas essas decorações.
- Números dos projetos aparecem como pequenas peças, e as introduções das experiências ganham um prumo gráfico discreto. A decoração não altera métricas nem conteúdo editorial.
- Na home, `construction.origin` explica a relação pessoal com construção: trabalho na adolescência, ajuda aos pais e construção do próprio quarto. O texto fica dentro da composição de alvenaria antes dos projetos; não há datas ou detalhes novos presumidos. Os dois primeiros capítulos de `story.chapters` acompanham essa narrativa.
- A abertura tem uma pessoa ilustrada em SVG carregando tijolos até a obra. É um desenho simbólico, não uma foto ou reconstrução factual de Fausto. A caminhada dura menos que a abertura e preserva o botão de pular e movimento reduzido. O botão fica separado do painel; em telas baixas, o painel compacta os espaços e permite rolagem sem sobrepor o controle.
- `hero.title` contém a mensagem de crescimento e criação de estrutura para si e para os outros. O cartão social usa a mesma headline em inglês.

## Revisão factual antes de candidaturas

O site é uma implementação funcional; a revisão factual e as autorizações não podem ser substituídas pelo desenvolvimento.

| Tema | Tratamento atual | Confirmação necessária |
| --- | --- | --- |
| SOEL: 15K+ ensinados | Segue a home e o overview; não virou “45K+ ensinados” | Definição de aluno, duplicidades, período e evidências; remover/reformular se for alcance |
| SOEL: 35 voluntários | Segue o overview; não usa pico de 50 como equipe atual | Contagem atual, pico e data |
| 30+ medalhas / 5 ouros | Segue o overview | Relação oficial; reconciliar com as medalhas descritas |
| San: 15+ professores | Identificado como piloto, não escala ou ganho de aprendizagem | Data, uso ativo, quantidade de escolas e autorização para citar a rede |
| San / SAM | Mantido “Sistema San” como na referência | Nome oficial do produto |
| Pesquisa: cronologia | Sem datas conflitantes publicadas | Artigo, certificado e período correto |
| Pesquisa: “2 de 8” | Não publicado como ranking | Significado da expressão e categoria oficial |
| Tsugrowth: ~R$30M | Sempre estimativa de pipeline, nunca receita | Aprovação da empresa para publicar esse valor e os artefatos |
| EVER: 20 usuários | Piloto previsto, não concluído | Status real depois de novembro de 2026 |
| IEO 2027 | Candidatura/meta, nunca seleção concluída | Atualizar somente após resultado oficial |
| Bolsas LaunchX / TKS | Ofertas de bolsas, sem afirmar frequência | Diferenciar oferta, aceite e conclusão |
| Pensi / Prep | Evitadas datas e rankings divergentes | Período escolar, tamanho e seletividade da turma |
| Imprensa | Menção sem URL inventada | Link público da matéria |
| Origem pessoal | Versão editorial conservadora | Escrever em primeira pessoa e aprovar detalhes familiares/pessoais |

A referência contém informações familiares e pessoais sensíveis e notas internas “a confirmar”. Elas não foram copiadas integralmente para a página pública. Os detalhes de construção e moradia agora publicados foram fornecidos explicitamente por Fausto para compor a história, sem adicionar nomes, endereços, idades ou datas presumidas. Nenhum dado pessoal foi salvo em memória do assistente.

## Currículo

A página `/resume/` ou `/pt/resume/` gera um perfil a partir das experiências, reconhecimentos e habilidades desses documentos. O botão abre a impressão do navegador, que permite salvar PDF. Um CV oficial de candidatura não foi fornecido nesta pasta; não há botão que finja baixar um arquivo inexistente.

## Idiomas e publicação

- Inglês é a URL inicial e `x-default`; português é uma escolha explícita.
- O seletor mantém a página equivalente, inclusive nos cases.
- Para mudar o domínio, alterar `siteUrl` em [../src/lib/content.ts](../src/lib/content.ts) e reconstruir. Canonical, sitemap e dados estruturados compartilham essa configuração.
- Antes do envio: verificar fatos, fotos, CV oficial, URLs reais dos projetos, domínio e comportamento no celular.
