from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .messages import seed_messages, undo_messages
from .members import seed_members, undo_members
from .channels import seed_channels, undo_channels

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_channels()
    seed_members()
    seed_messages()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_messages()
    undo_members()
    undo_channels()
    undo_servers()
    undo_users()
    # Add other undo functions here
