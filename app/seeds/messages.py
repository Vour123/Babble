from app.models import db, Message

def seed_messages():
    message_1 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE')
    db.session.commit()