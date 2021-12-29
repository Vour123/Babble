from flask_socketio import SocketIO

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins="*")

def handle_add_a_new_server(data):
    socketio.emit('add_a_new_server', data, broadcast=True)

def handle_delete_a_server(data):
    socketio.emit('delete_a_server', data, broadcast=True)

def handle_edit_a_server(data):
    socketio.emit('edit_a_server', data, broadcast=True)

def handle_add_a_channel(data):
    socketio.emit('add_a_channel', data, broadcast=True)

def handle_edit_a_channel(data):
    socketio.emit('edit_a_channel', data, broadcast=True)

def handle_delete_a_channel(data):
    socketio.emit('delete_a_channel', data, broadcast=True)

def handle_add_a_message(data, server_id):
    print(server_id)
    socketio.emit("add_a_message", {"data": data,
                  "server_id": server_id}, broadcast=True)

def handle_edit_a_message(data, server_id):
    socketio.emit("edit_a_message", {"data": data,
                  "server_id": server_id}, broadcast=True)

def handle_delete_a_message(data, server_id):
    socketio.emit("delete_a_message", {"data": data,
                  "server_id": server_id}, broadcast=True)