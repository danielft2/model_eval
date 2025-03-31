## Desenvolvimento

1. Entre no diretório do front-end:

```bash
cd app/backend
```

2. Instale o poetry=1.8.5

```bash
pip instal poetry=1.8.5
```

3. Ative o ambiente virtual do python:

```bash
poetry shell
```

4. Instale as dependências:

```bash
poetry install
```

5. Configure as variáveis de ambiente conforme descrito em [docs/backend/env-configuration.md](env-configuration.md).

6. Rode as migrations do banco de dados.

```bash
alembic upgrade head
```

7. Rode as seeds do banco de dados.

```bash
task seed
```

8. Inicie o servidor de desenvolvimento com:

```bash
task run
```
