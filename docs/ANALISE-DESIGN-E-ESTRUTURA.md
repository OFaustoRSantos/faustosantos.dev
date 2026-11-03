# Análise do design e da estrutura

## Revisão 2 — construção, identidade e movimento

Por pedido de Fausto, a direção deixou de ser uma reprodução estrita do navy/azul do Figma. A nova linguagem é a de um **caderno de construção**: papel quente, terracota, verde-oliva, desenho de planta, materiais que se encaixam e resultados assentados em uma base.

- Monograma **F** autoral em SVG, com profundidade e juntas. A referência enviada orientou o caráter ilustrado/volumétrico, não o desenho da marca.
- Abertura SOEL → Sistema San → OBECON em blocos, com saída automática, sem travar a navegação.
- Montagem escalonada do hero e da trajetória; reveais por seção como peças que se assentam.
- Convite para a história em faixa contínua e painel editorial com três fotos configuráveis.
- Cartões com bordas de material, encaixes e interação de elevação; capítulos com marcadores de tijolo.
- Identidade aplicada também ao header, footer, favicon, cartão social, páginas internas e currículo.
- Respeito a movimento reduzido, pausa explícita, leitura sem JavaScript e impressão.

O movimento comunica construção; não deve se passar por carregamento de dados, crescimento em tempo real ou resultado de produto. Os espaços de fotos permanecem identificados até o envio de originais.

As seções abaixo registram a análise da **primeira versão baseada no PDF**. Suas observações sobre navy/azul e preservação integral do hero são históricas, superadas nesta revisão; a revisão factual e as recomendações de evidência continuam válidas.

## O que foi possível ler

- Overview textual completo.
- PDF de 13070 × 9148 pontos com home desktop, história, trabalho, quatro cases, home mobile e especificação de movimento.
- Metadados e miniatura do `.fig`.
- **Limite:** as camadas e propriedades editáveis do `.fig` binário não foram interpretadas nativamente. A fidelidade foi orientada pela renderização do PDF, não por uma falsa leitura das camadas.
- As fontes do PDF são glifos Type3 sem nome útil: Inter local é uma aproximação tipográfica. Para correspondência tipográfica exata, fornecer nome/arquivo/licença da fonte ou acesso ao arquivo pelo Figma.

## O que já funciona na referência

1. **Posicionamento em uma frase:** educação pública + IA + economia formam um eixo reconhecível.
2. **Percurso no hero:** conta uma evolução em vez de mostrar apenas uma lista de cargos.
3. **Estética contida:** azul, navy, tipografia limpa e componentes editoriais evitam o portfólio genérico com gradientes e cartões excessivos.
4. **Cases com papel explícito:** problema → contribuição → evidência → estrutura → evolução responde às perguntas de quem avalia.
5. **Honrarias em posição secundária:** Mendeleev sustenta a trajetória sem tomar o lugar do foco atual.

## Pontos falhos e melhorias

| Prioridade | Problema | Tratamento / recomendação |
| --- | --- | --- |
| Crítica antes de candidaturas | Divergências de métricas e cronologia prejudicam confiança | Guia editorial com itens de validação; sem “2 de 8” como ranking; metas e pipeline explicitamente qualificados |
| Alta | Falta evidência visual do trabalho | Slots transparentes para material original nos cases; pedido específico de captura e foto por projeto |
| Alta | Muitos números podem parecer mais fortes do que a evidência | Definir período, denominador e fonte; distinguir alcance, alunos, equipe atual, pico e receita |
| Alta | A história contém notas internas e detalhes pessoais sensíveis | Texto público conservador, sem copiar notas de aprovação ou detalhes familiares; desenvolver a voz pessoal com Fausto |
| Alta | CTAs do PDF eram somente visuais | Navegação real, links dos cases, contato por email/LinkedIn e currículo imprimível |
| Alta | Faltava sistema bilíngue consistente | 16 páginas estáticas com idioma no HTML, URLs estáveis e seletor que mantém a página |
| Média | Numeração da home: experiência “03” antes de projetos “02” | Corrigida para sequência 01–05, sem alterar a hierarquia visual |
| Média | Dependência potencial de animações | Conteúdo visível no HTML; reveal único, movimento reduzido e impressão sem esconder texto |
| Média | Hero desktop não caberia bem no celular | Percurso vira cinco marcos verticais; menu recolhível e cartões empilhados |
| Média | Um único perfil precisa servir a VC e faculdade | Home compartilhada, cases para profundidade de execução e história para contexto humano; não criar três versões oportunistas do perfil |
| Média | “Fellowships” pode confundir bolsa ofertada com participação | Texto distingue ofertas de bolsas de frequência aos programas |
| Baixa | Fontes externas e bibliotecas de animação aumentariam dependências | Fonte local e CSS/IntersectionObserver, sem biblioteca de movimento |

## Fidelidade versus melhorias

### Preservado

- Header navy com monograma, navegação e CTAs.
- Hero com brilho azul discreto, círculos concêntricos, três linhas de headline e percurso de cinco marcos.
- Faixa de quatro métricas.
- Experiências em coluna editorial com datas.
- Quatro projetos em grade 2 × 2 no desktop.
- Olimpíadas em cinco colunas, reconhecimentos em quatro cartões e contato em painel azul.
- Estrutura dos cases, stack e próximo projeto.
- Percurso vertical no mobile e especificação de motion.

### Alterado deliberadamente

- Idiomas EN/PT visíveis, preservando a página.
- Links funcionais para todos os cases.
- Rótulos e áreas de toque mais legíveis no mobile.
- Sequência das seções corrigida.
- Currículo imprimível em vez de download falso.
- Ressalvas de resultados em texto legível, não escondidas em tooltips ou rodapés minúsculos.
- Datas conflitantes da pesquisa omitidas em vez de escolhidas arbitrariamente.
- Primeiro capítulo pessoal resumido como rascunho editorial, sem transformar exposição sensível em argumento de candidatura.
- Nenhum dashboard, foto ou gráfico fictício foi criado.

## Estrutura para os três públicos

### Fellowships

Mostrar iniciativa sustentada, clareza de tese e capacidade de mobilizar pessoas. SOEL + história + San são a leitura principal. Foto ensinando e evidência de processos são mais valiosas que uma parede de certificados.

### Venture capital / a16z Academy

Mostrar identificação do problema, proximidade do usuário, trabalho real de produto e entendimento comercial. San e EVER devem explicitar feedback de usuários e decisões tomadas. A cifra de pipeline não deve parecer receita nem tração de startup. Não insinuar investimento, admissão ou vínculo com a16z.

### Programas de faculdade

Mostrar curiosidade intelectual, coerência das escolhas, contribuição comunitária e autoria. A página de história precisa ganhar uma voz mais específica, sem repetir o currículo. Pesquisas e olimpíadas precisam de evidências verificáveis e links originais.

## Próximas melhorias depois do material real

1. Acrescentar uma captura autorizada por case e retrato em “Minha história”.
2. Adicionar links oficiais de produto, código público, imprensa e artigo onde existirem. Não usar `#` ou URLs presumidas.
3. Substituir o resumo de origem por uma narrativa aprovada em primeira pessoa.
4. Enriquecer cada case com uma decisão difícil: alternativa, trade-off, aprendizado e mudança feita com feedback.
5. Quantificar resultados somente depois de existir definição verificável. Para San, por exemplo, medir tempo de planejamento com metodologia clara, em vez de prometer ganho de aprendizagem.
6. Acrescentar um CV oficial e datado, se necessário para as candidaturas.
7. Confirmar domínio e revisar a versão publicada em celular antes de colocar o link nas applications.

Esses próximos passos dependem de fatos, arquivos e autorizações ainda não fornecidos. O site não apresenta sua ausência como um resultado concluído.
