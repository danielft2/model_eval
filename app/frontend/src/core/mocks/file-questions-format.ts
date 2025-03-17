const fileTestCollumsDataFormat = [
  { field: "id", headerName: "ID" },
  { field: "texto", headerName: "Texto" },
  { field: "descritor", headerName: "Descritor" },
  { field: "comando", headerName: "Comando" },
  { field: "resposta_item", headerName: "Resposta Item" },
  { field: "resposta", headerName: "Resposta" },
  { field: "opcoes", headerName: "Opções" },
] 

const fileTestRowDataExamples = [
  {
    id: "1",
    texto:
      "Chegava dezembro e lá vinha minha mãe me consultar a respeito da minha vontade de ir ou não passar as férias na casa da vó Ana...",
    descritor: "D42 - Identificar a finalidade de textos de diferentes gêneros.",
    comando: "Qual é a finalidade desse texto?",
    resposta_item: "b",
    resposta: "Contar uma história.",
    opcoes: "['Apresentar uma crítica.', 'Contar uma história.', 'Dar uma instrução.', 'Transmitir uma informação.']",
  },
  {
    id: "2",
    texto: "Você já ouviu a frase: “rapadura é doce, mas não é mole não”? Essa é uma expressão popular da língua portuguesa",
    descritor: "D42 - Identificar a finalidade de textos de diferentes gêneros.",
    comando: "Qual é o objetivo desse texto?",
    resposta_item: "c",
    resposta: "Informar o leitor.",
    opcoes: "['Divertir o leitor.', 'Ensinar uma receita.', ''Informar o leitor.', 'Fazer uma crítica.']",
  },
];

export { fileTestCollumsDataFormat, fileTestRowDataExamples };
