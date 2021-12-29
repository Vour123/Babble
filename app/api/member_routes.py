from flask import Blueprint
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Server, User, server
from app.models.member import Member
from app.socket import handle_edit_a_server

member_routes = Blueprint('members', __name__)

@member_routes.route('/<int:server_id>/members/<int:member_id>', methods=['POST'])
@login_required
def add_new_member_to_server(server_id, member_id):
    new_to_server_user = User.query.get(int(member_id))
    existing_server = Server.query.get(int(server_id))
    if new_to_server_user not in existing_server:
        new_member = Member(
            user_id = new_to_server_user,
            server_id = existing_server
        )
        db.session.add(new_member)
        db.session.commit()
        handle_edit_a_server(existing_server.to_dict())
        return existing_server.to_dict()
    return {"errors": "Cannot add user to server"}

@member_routes.route('/<int:server_id>/members', methods=['DELETE'])
@login_required
def delete_existing_member_from_server(server_id):
    existing_user = User.query.get(int(current_user.id))
    existing_server = User.query.get(int(server_id))
    if existing_user in existing_server.members:
        # find the user in the members list.
        member = Member.query.filter(current_user.id == Member.user_id)
        member.filter(existing_server == Member.server_id)[0]
        db.session.delete(member)
        db.session.commit()
        handle_edit_a_server(existing_server.to_dict())
        return {"status": "success"}
    return {"stauts": "failure"}

@member_routes.route('/<int:server_id>/members', methods=['POST'])
@login_required
def edit_members_on_existing_server(server_idP):
    user = User.query.get(int(current_user.id))
    server = Server.query.get(int(server_idP))
    if user and (user not in server.members):
        member = Member(
            user_id = current_user.id,
            server_id = server_idP
        )
        db.session.add(member)
        db.session.commit()
        return server.to_dict()
    return {"status": "unsuccessful"}

    # no need to get all members cause to_dict in servers.