from flask import Blueprint, session, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Channel, Member, Server, User, channel, server
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
@channel_routes.route('/<int:id>', methods=['POST'])
@login_required
def post_channel(id):
    form = CreateChannelForm()
    form['csrf_token'].data= request.cookies['csrf_token']
    server = Server.query.get(+id)
    if form.validate_on_submit() and (server.owner_id == current_user.id):
        channel = Channel(
            name = form.data['name'],
            server_id = id
        )
        db.session.add(channel)
        db.session.commit()
        # web socket goes here when implenmented.
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
