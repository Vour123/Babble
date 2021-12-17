from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from flask_migrate import current
from app.models import db, Server, User, server, Message
from app.models.member import Member
from .auth_routes import validation_errors_to_error_messages

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:server_id>/<int:channel_id>')
@login_required
def load_messages_to_a_specific_server(server_id, channel_id):
    messages = Message.query.filter(Message.channel_id == channel_id)
    return {'messages': [messages.to_dict() for message in messages]}