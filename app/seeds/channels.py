from app.models import db, Channel

def seed_channels():
    test_channel = Channel(
        name = 'test_channel',
        server_id = 1   
    )

    db.session.add(test_channel)
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()