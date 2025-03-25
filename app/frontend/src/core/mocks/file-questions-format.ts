const fileTestCollumsDataFormat = [
  { field: "titulo_do_texto", headerName: "titulo_do_texto" },
  { field: "texto", headerName: "texto" },
  { field: "descritor", headerName: "descritor" },
  { field: "comando", headerName: "comando" },
  { field: "resposta_item", headerName: "resposta_item" },
  { field: "resposta", headerName: "resposta" },
  { field: "opcoes", headerName: "opcoes" },
] 

const fileTestRowDataExamples = [
  {
    titulo_do_texto: "Dezembro",
    texto:
      "Chegava dezembro e lá vinha minha mãe me consultar a respeito da minha vontade de ir ou não passar as férias na casa da vó Ana...",
    descritor: "D42 - Identificar a finalidade de textos de diferentes gêneros.",
    comando: "Qual é a finalidade desse texto?",
    resposta_item: "b",
    resposta: "Contar uma história.",
    opcoes: "['Apresentar uma crítica.', 'Contar uma história.', 'Dar uma instrução.', 'Transmitir uma informação.']",
  },
  {
    titulo_do_texto: "Rapadura é doce",
    texto: "Você já ouviu a frase: “rapadura é doce, mas não é mole não”? Essa é uma expressão popular da língua portuguesa",
    descritor: "D42 - Identificar a finalidade de textos de diferentes gêneros.",
    comando: "Qual é o objetivo desse texto?",
    resposta_item: "c",
    resposta: "Informar o leitor.",
    opcoes: "['Divertir o leitor.', 'Ensinar uma receita.', ''Informar o leitor.', 'Fazer uma crítica.']",
  },
];

export { fileTestCollumsDataFormat, fileTestRowDataExamples };
