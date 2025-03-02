from supabase import Client, create_client

from app.core.config import Settings

settings = Settings()
supabase_client: Client = create_client(
    settings.SUPABASE_URL, settings.SUPABASE_KEY
)


class RetrieveFileError(Exception):
    def __init__(self, message="Erro ao recuperar o arquivo!"):
        self.message = message
        super().__init__(self.message)


def retrieve_file(path: str, bucket: str) -> bytes:
    try:
        file = supabase_client.storage.from_(bucket).download(path=path)
        return file
    except Exception:
        raise RetrieveFileError()
