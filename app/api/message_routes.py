from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from flask_migrate import current
from app.models import db, Channel, Server, User, server
from app.forms import CreateChannelForm, EditChannelForm
from app.models.member import Member
from .auth_routes import validation_errors_to_error_messages

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:server_id>/members/<int:member_id>', methods=['POST'])
@login_required
def add_new_member_to_server(server_id, member_id):
    new_to_server_user = User.query.get(+member_id)
    existing_server = Server.query.get(+server_id)
    if new_to_server_user not in existing_server:
        new_member = Member(
            user_id = new_to_server_user,
            server_id = existing_server
        )
        db.session.add(new_member)
        db.session.commit()
        #web socket to add member to server, i think this would be edit server.
        return server.to_dict()
    return {"errors": "Cannot add user to server"}

@message_routes.route('<int:server_id>/members/<int:member_id>', methods=['DELETE'])
@login_required
def delete_existing_member_from_server(server_id):
    existing_user = User.query.get(+current_user.id)
    existing_server = User.query.get(+server_id)
    if existing_user in existing_server:
        # find the user in the members list.
        member = Member.query.filter(current_user.id == Member.user_id)
        member.filter(existing_server == Member.server_id)[0]
        db.session.delete()

