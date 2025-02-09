from flask import Flask, render_template
from flask_socketio import SocketIO, emit

# Initialize the Flask app and SocketIO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

# Route for the chat page
@app.route('/')
def chat(): 
    return render_template('chat.html')

# Handle a new message event
@socketio.on('send_message')
def handle_send_message(data):
    # Broadcast the message to all connected clients
    emit('receive_message', data, broadcast=True)

# Run the app
if __name__ == '__main__':
    socketio.run(app, debug=True)
