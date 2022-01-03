from app.models import db, Message

def seed_messages():
    message_1 = Message(
        content = 'This is the Demo server',
        channel_id = '1',
        owner_id = '1'
    )

    db.session.add(message_1)
    db.session.commit()
    
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE')
    db.session.commit()