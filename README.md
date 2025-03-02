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

model.eval é uma plataforma desenvolvida como parte do meu Trabalho de Conclusão de Curso (TCC) na Universidade Federal do Ceará. A plataforma oferece um ambiente voltado para pesquisadores que desejam avaliar a performance de seus Grandes Modelos de Linguagem (LLMs) na geração de questões educacionais de português utilizando avaliações automáticas e humanas.

Inicialmente, a model.eval foca na avaliação da qualidade das questões educacionais geradas por modelos derivados do T5, especificamente no contexto de questões que visam avaliar alguma habilidade da Base Nacional Comum Curricular (BNCC). 

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

## Docs

- [Desenvolvimento / Front-end ⚙️](docs/frontend/developer.md)
- [Desenvolvimento / Back-end ⚙️](docs/backend/developer.md)
