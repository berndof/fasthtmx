import asyncio
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from core.database import ObjectNotFound, UniqueViolation, sessionmanager
from core.modules.user.schemas.user import UserIn
from core.modules.user.services.user import UserService


async def main():
    username = os.environ.get("ROOT_USERNAME") or os.environ.get("SUPERUSER_USERNAME")
    email = os.environ.get("ROOT_EMAIL") or os.environ.get("SUPERUSER_EMAIL")
    password = os.environ.get("ROOT_PASSWORD") or os.environ.get("SUPERUSER_PASSWORD")

    if not username:
        username = input("Username [superadmin]: ").strip() or "superadmin"
    if not email:
        email = input("Email [ti@scc.com.br]: ").strip() or "ti@scc.com.br"
    if not password:
        import getpass

        password = getpass.getpass("Password [lfw-lala]: ") or "lfw-lala"

    sessionmanager.init_db()
    async for session in sessionmanager.get_session():
        service = UserService(session)
        user_in = UserIn.model_validate(
            {
                "username": username,
                "email": email,
                "password": password,
                "first_name": "Super",
                "last_name": "Admin",
                "groups": ["admin"],
            }
        )
        try:
            u = await service.create(user_in)
            await service.update(u.id, {"is_verified": True})
            print(f"Superuser '{u.username}' criado com sucesso!")
        except UniqueViolation:
            print(f"Superuser '{username}' já existe no banco de dados.")
        except Exception as e:
            print(f"Erro ao criar superuser: {e}")
            sys.exit(1)
        break
    await sessionmanager.close()


if __name__ == "__main__":
    asyncio.run(main())
