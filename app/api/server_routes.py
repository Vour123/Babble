from flask import Blueprint, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Server, Member, server
from app.forms import CreateServerForm, EditServerForm
from .auth_routes import login, validation_errors_to_error_messages
from app.socket import handle_add_a_channel, handle_delete_a_server, handle_edit_a_server, handle_add_a_new_server

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def get_all_servers():
    servers = Server.query.all()
    user_servers = [server for server in servers if current_user.id in server.user_id()]
    return {'servers': [server.to_dict() for server in user_servers]}

# delete server route
@server_routes.route('/<int:server_id>/', methods=['DELETE'])
@login_required
def delete_specific_server(server_id):
    specific_server = Server.query.get(server_id)
    if current_user.id == specific_server.owner_id:
        handle_delete_a_server(specific_server.to_dict())
        db.session.delete(specific_server)
        db.session.commit()
        return specific_server.to_dict()

@server_routes.route('/', methods=['POST'])
@login_required
def new_server():
    form = CreateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and not form.data['private']:
        image = form.data['image_url']

    if form.data['name']:
        server = Server(
            name = form.data['name'],
            image_url = image,
            private = form.data['private'],
            owner_id = current_user.id
        )
        db.session.add(server)
        db.session.commit()

        member = Member(
                user_id = current_user.id,
                server_id = server.to_dict()['id']
        )
        db.session.add(member)
        db.session.commit()

        handle_add_a_new_server(server.to_dict())
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:server_id>/', methods=['PUT'])
@login_required
def update_server(server_id):
    specific_server = Server.query.get(server_id)
    form = EditServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and current_user.id == specific_server.owner_id:
        specific_server.name = form.data['name']
        specific_server.image_url = form.data['image_url'] if form.data['image_url'] else "https://cdn.discordapp.com/attachments/897232495580414045/927094319511400498/placeholder.png"
        db.session.commit()
        handle_edit_a_server(specific_server.to_dict())
        return specific_server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401