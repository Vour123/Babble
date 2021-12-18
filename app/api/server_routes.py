from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Server
from app.forms import CreateServerForm, EditServerForm
from .auth_routes import login, validation_errors_to_error_messages

server_routes = Blueprint('servers', __name__)

# i think we want to grab all the servers that belong to a user so we can display those
@server_routes.route('/')
@login_required
def get_all_servers():
    servers = Server.query.all()
    user_servers = [userServer for userServer in servers if current_user.id in userServer.user_id()]
    if servers:
        return {'servers': [servers.to_dict() for servers in user_servers]}

# delete server route
@server_routes.route('/:server_id', methods=['DELETE'])
@login_required
def delete_specific_server(server_id):
    specific_server = Server.query.get(int(id))
    # now that we have the server, we must check if its the owner deleting it.
    if current_user.id == Server.owner_id:
        # web socket stuff?
        db.session.delete(specific_server)
        db.session.commit()
        return specific_server.to_dict()

@server_routes.route('/:server_id', methods=['POST'])
@login_required
def new_server(server_id):
    form = CreateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and not form.data['private']:
        # above checks if server is a dm or not
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

@server_routes.route('/:server_id', methods=['PUT'])
@login_required
def update_server(server_id):
    specific_server = Server.query.get(int(server_id))
    form = EditServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and current_user.id == specific_server.owner_id:
        specific_server.name = form.data['name']
        specific_server.image_url = form.data['url']
        db.session.commit()
        # web socket to edit server here
        return specific_server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401