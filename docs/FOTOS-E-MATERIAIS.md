# Fotos e materiais: pedido de envio

Envie os originais das opções abaixo. Não é necessário enviar todo o acervo: comece com 2–3 alternativas por prioridade. A seleção deve mostrar **você fazendo o trabalho**, não apenas participando de eventos.

## Primeiro envio — prioridade alta

| Material solicitado | Onde usar | Melhor opção / enquadramento |
| --- | --- | --- |
| Retrato editorial | Home, quadro “A pessoa”; Minha história | Meio corpo, olhar natural, luz lateral suave, fundo simples ou ambiente de trabalho, sem aparência de banco de imagens. Enviar vertical 4:5 e horizontal 3:2, se houver |
| Você ensinando | Case SOEL e capítulo de liderança | Interação real com alunos, quadro ou material autoral. Horizontal 3:2 com espaço ao redor; evitar palco distante |
| Você com a equipe SOEL | Case SOEL | Pequeno grupo trabalhando, não uma grade de videoconferência ilegível. Identificar seu papel na legenda |
| San em uso ou demonstração | Case Sistema San | Você com um professor usando o produto; autorização da escola e do profissional. Nenhum rosto de aluno ou dado estudantil sem autorização adequada |
| Capturas reais do San | Área de documentação do case | Planejamento, plano por turma e relatório individual, com nomes, notas, identificadores e instituições anonimizados |
| Capturas reais da SOEL | Área de documentação do case | ERP de voluntários, processos/OKRs e site ou material didático |

## Segundo envio — evidência e contexto

| Material | Local sugerido | O que comunica |
| --- | --- | --- |
| Foto da OBECON | História, capítulo de economia | Foco atual e profundidade intelectual; preferir atividade, apresentação ou discussão de case |
| Apresentação ABRIC | Case pesquisa | Autoria e comunicação científica; legendar com evento e data verificada |
| Pôster/artigo e gráficos originais | Case pesquisa | Evidência primária; enviar PDF e gráficos com legenda, fonte e metodologia |
| Trabalho no EVER | Case Tsugrowth | Produto e execução: tela Android + portal autorizados, de preferência com exemplos anonimizados |
| Documento de regras/estados EVER | Case Tsugrowth | Rigor de especificação; apenas páginas aprovadas pela empresa |
| Foto de olimpíada internacional | História ou reconhecimento, secundária à economia | Amplitude da trajetória sem reposicionar o site como química |
| Foto espontânea estudando/construindo | História | Processo e identidade; preferível a uma sequência de certificados |
| Recorte/link de O Globo | Reconhecimento | Verificação externa. Priorizar link à matéria, não republicação integral sem direitos |
| Foto antiga escolhida por você | Primeiro capítulo da história, opcional | Origem pessoal sem dramatização nem exposição involuntária da família |

## Direção visual

- **Hero atual:** desenho de construção com F em perspectiva e blocos dos projetos; não competir com a headline usando mais um retrato.
- **Home:** três fotos em molduras de caderno de campo junto ao convite para a história. Primeiro quadro: retrato; segundo: ensinando/com a equipe; terceiro: apresentando/pensando/construindo. Não é um carrossel.
- **Cases:** uma evidência visual forte por projeto é melhor que cinco imagens decorativas. Alternar a evidência principal com contexto escrito.
- **História:** uma foto pessoal significativa e duas de ação já são suficientes. Não transformar a página em álbum cronológico.
- Manter cor natural e contraste moderado, dialogando com papel, terracota e verde-oliva. Não aplicar filtro laranja pesado nem recorte artificial com brilho.
- Evitar fotos de medalhas sem você, logos de programas como se fossem endossos, fotos genéricas de IA e interfaces geradas.
- O layout atual tem três quadros de fotos na home, um retrato opcional na história e uma imagem principal por case. Enquanto as fotos não forem enviadas, a home usa esboços explicitamente identificados, não retratos gerados ou imagens de outras pessoas.

### Foto extra que combina com a nova direção

Se você tiver uma foto real trabalhando em obra, montando algo ou construindo um espaço, envie como alternativa para o quadro “O processo”. Essa imagem pode tornar a metáfora do tijolo pessoal e concreta. Não encenar uma origem nem usar uma foto de obra de terceiros como se fosse sua.

## Requisitos para enviar

- Originais em JPEG/PNG/WebP; idealmente 2000 px ou mais no lado maior.
- Não mandar apenas screenshots de Instagram ou arquivos muito comprimidos pelo WhatsApp.
- Informar: **quem aparece, evento/local, data, fotógrafo/crédito e autorização de publicação**.
- Para menores e ambientes escolares, providenciar autorização adequada; se não houver, selecionar outra imagem, enquadrar sem identificação ou desfocar.
- Não enviar dados privados de estudantes, dashboards internos completos ou material de cliente sem autorização. Redigir os dados antes do compartilhamento.
- Para documentos de empresa, preferir uma cópia explicitamente liberada para portfólio.

## Nomes e inserção após seleção

| Nome sugerido | Campo |
| --- | --- |
| `fausto-retrato.webp` | `story.portrait.src` |
| `fausto-retrato.webp` | `storyInvite.photos[0].src` |
| `fausto-soel-aula.webp` | `storyInvite.photos[1].src` |
| `fausto-construindo.webp` | `storyInvite.photos[2].src` |
| `sistema-san-planejamento.webp` | `projects[0].media.src` |
| `soel-operacao.webp` | `projects[1].media.src` |
| `ever-produto.webp` | `projects[2].media.src` |
| `pesquisa-abric.webp` | `projects[3].media.src` |

Colocar em `public/images/`, usar `/images/nome.webp` nos dois documentos de conteúdo e traduzir as legendas. Otimizar antes de publicar: retrato/captura principal preferencialmente abaixo de 350 KB, sem sacrificar a legibilidade. Se uma captura exigir mais resolução, priorizar a leitura e verificar o peso real.

## O que falta você fornecer

1. O primeiro lote de fotos e as capturas reais aprovadas.
2. Seu retrato preferido e indicação de imagens que você **não** quer publicar.
3. Links reais dos produtos, artigo/pôster, matéria de imprensa e CV oficial.
4. Confirmação dos números e das datas listados no [guia de conteúdo](GUIA-DE-CONTEUDO.md).
5. Sua versão pessoal do começo da história e da transição de química para economia.
