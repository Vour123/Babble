from math import log
from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from flask_migrate import current
from app.models import db, Server, server, Message, message
from app.forms import CreateMessageForm, EditMessageForm
from app.models.channel import Channel
from .auth_routes import login, validation_errors_to_error_messages

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:server_id>/<int:channel_id>')
@login_required
def load_messages_to_a_specific_server(server_id, channel_id):
    messages = Message.query.filter(Message.channel_id == channel_id).all()
    return {'messages': [messages.to_dict() for message in messages]}

@message_routes.route('/<int:server_id>/<int:channel_id>', methods=['POST'])
@login_required
def sending_a_new_message(server_idP, channel_idP):
    form = CreateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            content = form.data['content'],
            channel_id = channel_idP,
            owner_id = current_user.id
        )
        specific_server = Server.query.get(int(server_idP))
        server_informaton = server.to_dict()
        db.session.add(new_message)
        db.session.commit()
        # web socket add message 
        return new_message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route('/<int:server_id>/<int:channel_id>/<int:message_id>', methods=['PUT'])
@login_required
def edit_an_existing_message(server_id, channel_id, message_id):
    form = EditMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    existing_message = Message.query.get(int(message_id))
    if form.validate_on_submit() and (current_user.id == Message.owner_id):
        existing_message.content = form.data['content']
        specific_server = Server.query.get(int(server_id))
        server_information = server.to_dict()
        db.session.commit()
        # web socket to edit message
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route('/<int:server_id>/<int:channel_id>/<int:message_id>', methods=['DELETE'])
@login_required
def delete_an_existing_message(server_id, channel_id, message_id):
    existing_message = Message.query.get(int(message_id))
    if existing_message.owner_id == current_user.id:
        specific_server = Server.query.get(int(server_id))
        server_information = server.to_dict()
        #web socket to delete the message
        db.session.delete(existing_message)
        db.session.commit()
        return {'result': 'success'}
    else: 
        return {'result': 'failure'}