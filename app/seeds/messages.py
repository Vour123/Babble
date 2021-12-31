from app.models import db, Message

def seed_messages():
    message_1 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )
    message_2 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )
    message_3 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )
    message_4 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )
    message_5 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )
    message_6 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )
    message_7 = Message(
        content = 'This is just a message',
        channel_id = '1',
        owner_id = '1'
    )

    db.session.add(message_1)
    db.session.add(message_2)
    db.session.add(message_3)
    db.session.add(message_4)
    db.session.add(message_5)
    db.session.add(message_6)
    db.session.add(message_7)
    db.session.commit()
    
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE')
    db.session.commit()