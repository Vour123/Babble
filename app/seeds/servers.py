from app.models import db, Server

def seed_servers():
    test_server = Server(
        name='Demo Server', 
        image_url='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*',
        private = False,
        owner_id = 1
        )

    test_server2 = Server(
        name='a/A 0726', 
        image_url='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png',
        private = False,
        owner_id = 1
        )
    test_server5 = Server(
        name='Puppies', 
        image_url='https://www.cesarsway.com/wp-content/uploads/2019/09/AdobeStock_195276899.jpeg',
        private = False,
        owner_id = 1
        )

    db.session.add(test_server)
    db.session.add(test_server2)
    db.session.add(test_server5)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE')
    db.session.commit()