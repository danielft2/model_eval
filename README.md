![hero](banner.png)

<p align="center">
	<h1 align="center"><b>model.eval</b></h1>
<p align="center">
    Run your business smarter
    <br />
    <br />
    <a href="https://github.com/danielft2/model_eval/issues">Issues</a>
  </p>
</p>

## Sobre model.eval

model.eval é uma plataforma desenvolvida como parte do meu Trabalho de Conclusão de Curso (TCC) na Universidade Federal do Ceará. A plataforma oferece um ambiente voltado para pesquisadores que desejam avaliar a performance de seus Grandes Modelos de Linguagem (LLMs) na geração de questões educacionais utilizando avaliações automáticas e humanas.

Inicialmente, a model.eval foca na avaliação da qualidade das questões educacionais geradas por modelos derivados do T5, especificamente contexto de questões atreladas a Base Nacional Comum Curricular (BNCC). 

## Funcionalidades

### Avaliação Automática  
- Configure e gerencie avaliações com métricas automáticas.  
- Envie seu conjunto de teste para avaliar o modelo.  
- Execute avaliações em modelos configurados e obtenha resultados de métricas automáticas.  

### Avaliação Humana  
- Configure avaliações baseadas em feedback humano.  
- Personalize as avaliações conforme suas necessidades.  
- Importe as questões geradas pelo modelos para que sejam avaliadas.  
- Acompanhe os resultados de forma geral, por questão ou por descritor.  
- Gere links de compartilhamento para que avaliadores acessem o formulário de avaliação.  

## Arquitetura da Plataforma

### Front-end
- React 
- TypeScript
- Nextjs 
- Shadcn
- TailwindCSS

### Back-end
- Python 
- FastAPI
- Poetry
- SQLAlchemy
- Alembic
- PostgreSQL

### Serviços
- Supabase (storage)

## Prerequisites

- Node.js v18+
- A running instance of [Saleor](https://github.com/saleor/saleor/)

## Development

1. Clone the repository:

```bash
git clone https://github.com/saleor/saleor-dashboard.git
```

2. Enter the project directory:

```bash
cd saleor-dashboard
```

3. Install the dependencies:

```bash
npm i
```

4. Configure the env vars as described in [docs/configuration.md](docs/configuration.md).

5. Start the development server with:

```bash
npm run dev
```
