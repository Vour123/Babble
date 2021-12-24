from app.models import db, Channel

def seed_channels():
    test_channel = Channel(
        name = 'test_channel0',
        server_id = 1   
    )
    test_channel1 = Channel(
        name = 'test_channel1',
        server_id = 1   
    )
    test_channel2 = Channel(
        name = 'test_channel2',
        server_id = 1   
    )
    test_channel3 = Channel(
        name = 'test_channel3',
        server_id = 1   
    )
    test_channel4 = Channel(
        name = 'test_channel4',
        server_id = 1   
    )
    test_channel5 = Channel(
        name = 'test_channel5',
        server_id = 2   
    )
    test_channel6 = Channel(
        name = 'test_channel6',
        server_id = 3   
    )

    db.session.add(test_channel)
    db.session.add(test_channel1)
    db.session.add(test_channel2)
    db.session.add(test_channel3)
    db.session.add(test_channel4)
    db.session.add(test_channel5)
    db.session.add(test_channel6)    
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()