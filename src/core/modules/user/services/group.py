from uuid import UUID

from core.database import ObjectNotFound
from core.services import AbstractModelService

from ..models.group import Group
from ..models.user import User
from ..schemas.group import GroupAddMember


class GroupService(AbstractModelService[Group]):
    model = Group

    async def add_member(self, group: Group, user: User, no_commit: bool = False):
        if user not in group.members:
            group.members.append(user)

        obj = await self.save(group, no_commit=no_commit)
        if obj:
            result = True
        else:
            result = False
        return result
