from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Channel, Server
from app.forms import CreateChannelForm, EditChannelForm
from .auth_routes import validation_errors_to_error_messages

server_routes = Blueprint('servers', __name__)

# i think we want to grab all the servers that belong to a user so we can display those
@server_routes.route('/')
# @login_required
def get_all_servers():
    servers = Server.query.all()
    if servers:
        return {'servers': servers.to_dict() for servers in servers}

@server_routes.route('/:server_id', methods=['POST'])
@login_required
def new_server(server_id):
    form = CreateChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and not form.data['private']:
        # above checks if server is a dm or not
        form['csrf_token'].data = request.cookies['csrf_token']
        image = form.data['image_url']
        

    if form.data['name']:
        server = Server(
            name=form.data['name'],
            image_url = image,
            owner_id = form.data['owner_id']
        )
        db.session.add(server)
        db.session.commit()

        # not sure where to add a member, but i think this is where it will happen
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

