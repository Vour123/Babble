from app.models import db, Channel, server

def seed_channels():
    test_channel = Channel(
        name = 'Demo Channel',
        server_id = 1   
    )
    test_channel1 = Channel(
        name = 'Awesome Channel',
        server_id = 1   
    )
    test_channel2 = Channel(
        name = 'Cool Channel',
        server_id = 1   
    )
    test_channel3 = Channel(
        name = 'Freshest Channel',
        server_id = 1   
    )
    test_channel5 = Channel(
        name = '0726',
        server_id = 2   
    )
    test_channel6 = Channel(
        name = 'Best Cohort Talk',
        server_id = 2   
    )
    test_channel7= Channel(
        name= 'Golden Retrievers',
        server_id =3
    )
    test_channel8= Channel(
        name= 'Huskies',
        server_id =3
    )
    test_channel8= Channel(
        name= 'Other',
        server_id =3
    )

    db.session.add(test_channel)
    db.session.add(test_channel1)
    db.session.add(test_channel2)
    db.session.add(test_channel3)
    db.session.add(test_channel5)
    db.session.add(test_channel6)
    db.session.add(test_channel7)
    db.session.add(test_channel8)
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()