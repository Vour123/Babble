from flask_socketio import SocketIO

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins="*")

def handle_add_a_new_server(data):
    socketio.emit('add_a_new_server', data, broadcast=True)

def handle_delete_a_server(data):
    socketio.emit('delete_a_server', data, broadcast=True)

def handle_edit_a_server(data):
    socketio.emit('edit_a_server', data, broadcast=True)

