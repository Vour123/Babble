from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Channel, Server
from app.forms import CreateChannelForm, EditChannelForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channels', __name__)

# this is the route to get all channels from a specific server
@channel_routes.route('/<int:id>')
@login_required
def channels(id):
    channels = Channel.query.filter(Channel.server_id == id)
    return {'channels': [channel.to_dict() for channel in channels]}

# this is the route to create a new channel in a server, it uses the server id.
@channel_routes.route('/<int:server_id>', methods=['POST'])
@login_required
def post_channel(server_id):
    form = CreateChannelForm()
    form['csrf_token'].data= request.cookies['csrf_token']
    server = Server.query.get(+server_id)
    if form.validate_on_submit() and (server.owner_id == current_user.id):
        channel = Channel(
            name = form.data['name'],
            server_id = id
        )
        db.session.add(channel)
        db.session.commit()
        # web socket goes here when implenmented. idk how to do this yet
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# this is the route to update a channel in a specific server by using the server id.
@channel_routes.route('/<int:server_id>/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(server_id, channel_id):
    form = EditChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    server = Server.query.get(+server_id)
    if form.validate_on_submit() and (server.owner_id == current_user.id):
        channel = Channel.query.get(+channel_id)
        channel.name = form.data['name']
        db.session.commit()
        # implement web socket for updating the channel name
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#this is the server to delete a specific channel in a server
@channel_routes.route('/<int:server_id>/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(server_id, channel_id):
    server = Server.query.get(+server_id)
    if server.owner_id == current_user.id:
        channel = Channel.query.get(+channel_id)
        # websocket delete
        db.session.delete(channel)
        db.session.commit()
        return {'status:' : 'success'}
    else:
        return {'status': 'failed'}
