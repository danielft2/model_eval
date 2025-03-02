## Desenvolvimento

1. Entre no diretório do front-end:

```bash
cd backend
```

2. Ativie o ambiente virtual do python:

```bash
poetry shell
```

3. Instale as dependências:

```bash
poetry install
```

4. Configure as variáveis de ambiente conforme descrito em [docs/backend/env-configuration.md](env-configuration.md).

5. Rode as migrations do banco de dados.

```bash
alembic upgrade head
```

6. Rode as seeds do banco de dados.

```bash
task seed
```

7. Inicie o servidor de desenvolvimento com:

```bash
task run
```
