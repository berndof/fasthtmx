import os
import re
from pathlib import Path


CONTENT_TYPES = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
}


def truncate_filename(filename: str, max_length: int = 80) -> str:
    """
    Encurta o nome do arquivo preservando a extensão.
    Ex: 'projeto_muito_grande_mesmo.pdf' -> 'projeto_muito_gr.pdf'
    """
    if len(filename) <= max_length:
        return filename

    name, ext = os.path.splitext(filename)
    # Subtrai o tamanho da extensão do limite total
    allowed_name_len = max_length - len(ext)
    return name[:allowed_name_len] + ext


def sanitize_filename(name: str) -> str:
    """Sanitiza o nome do arquivo, removendo caracteres perigosos."""
    name = name.strip()
    name = re.sub(r"\s+", "_", name)
    name = _strip_control_and_quotes(name)
    name = re.sub(r"[^a-zA-Z0-9_\-\.]", "", name)
    name = name.strip("._ ")
    return name or "arquivo"


def sanitize_nickname(name: str) -> str:
    """Sanitiza o apelido exibível, preservando espaços mas removendo perigos."""
    name = name.strip()
    name = re.sub(r"\s+", " ", name)
    name = _strip_control_and_quotes(name)
    name = re.sub(r"[<>\\/:*?|\"]", "", name)
    name = re.sub(r"\s+", " ", name)
    return name.strip()[:255]


def _strip_control_and_quotes(name: str) -> str:
    name = name.replace("\r", "").replace("\n", "")
    return re.sub(r"[\x00-\x1f\x7f\"]", "", name)


def canonical_extension(filename: str, allowed: set[str]) -> str:
    """Retorna a extensão em lowercase se permitida, caso contrário string vazia."""
    ext = os.path.splitext(filename or "")[1].lower()
    if ext in allowed:
        return ext
    return ""


def content_type_from_extension(ext: str) -> str:
    return CONTENT_TYPES.get(ext.lower(), "application/octet-stream")


def verify_file_signature(file_path: Path, ext: str) -> bool:
    """Valida os magic bytes do arquivo contra a extensão informada."""
    try:
        with open(file_path, "rb") as f:
            header = f.read(8)
    except OSError:
        return False

    ext = ext.lower()
    if ext == ".pdf":
        return header.startswith(b"%PDF")
    if ext == ".png":
        return header.startswith(b"\x89PNG\r\n\x1a\n")
    if ext in (".jpg", ".jpeg"):
        return header.startswith(b"\xff\xd8\xff")
    if ext == ".doc":
        return header.startswith(b"\xd0\xcf\x11\xe0")
    if ext == ".docx":
        return header.startswith(b"PK\x03\x04")
    return True


def safe_content_disposition_name(name: str) -> str:
    """Torna um nome seguro para uso no header Content-Disposition."""
    safe = name.replace("\r", "").replace("\n", "").replace('"', "").strip()
    safe = re.sub(r"[\x00-\x1f\x7f]", "", safe)
    safe = safe[:180]
    return safe or "arquivo"
