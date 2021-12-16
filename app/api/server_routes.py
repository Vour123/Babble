from logging import log
from flask import Blueprint, session, request 
from flask_login.utils import login_required
from flask_login import login_required, current_user
from app.models import db, Channel, Server
from app.forms import CreateChannelForm, EditChannelForm
from .auth_routes import validation_errors_to_error_messages

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def get_all_servers():
    servers = Server.query.all()
    if servers:
        return {'servers': servers.to_dict() for servers in servers}

@server_routes.route('/:server_id', methods=['POST'])
@login_required
def new_server(server_id):
