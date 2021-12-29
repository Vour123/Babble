from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Channel, Server
from app.forms import CreateChannelForm, EditChannelForm
from .auth_routes import validation_errors_to_error_messages
from app.socket import handle_delete_a_channel, handle_edit_a_channel, handle_add_a_channel

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:id>')
@login_required
def channels(id):
    channels = Channel.query.filter(Channel.server_id == id)
    return {'channels': [channel.to_dict() for channel in channels]}
    
@channel_routes.route('/<int:server_id>/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(server_id, channel_id):
    server = Server.query.get(int(server_id))
    if server.owner_id == current_user.id:
        channel = Channel.query.get(int(channel_id))
        handle_delete_a_channel(channel.to_dict())
        db.session.delete(channel)
        db.session.commit()
        return {'status:' : 'success'}
    else:
        return {'status': 'failed'}

# this is the route to create a new channel in a server, it uses the server id.
@channel_routes.route('/<int:server_id>', methods=['POST'])
@login_required
def post_channel(server_id):
    form = CreateChannelForm()
    form['csrf_token'].data= request.cookies['csrf_token']
    server = Server.query.get(int(server_id))
    if form.validate_on_submit() and (server.owner_id == current_user.id):
        channel = Channel(
            name = form.data['name'],
            server_id = server_id
        )
        db.session.add(channel)
        db.session.commit()
        handle_add_a_channel(channel.to_dict())
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# this is the route to update a channel in a specific server by using the server id.
@channel_routes.route('/<int:server_id>/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(server_id, channel_id):
    form = EditChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    server = Server.query.get(int(server_id))
    if form.validate_on_submit() and (server.owner_id == current_user.id):
        channel = Channel.query.get(int(channel_id))
        channel.name = form.data['name']
        db.session.commit()
        handle_edit_a_channel(channel.to_dict())
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

