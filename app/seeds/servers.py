from app.models import db, Server

def seed_servers():
    test_server = Server(
        name='test', 
        image_url='https://www.racksolutions.com/news//app/uploads/AdobeStock_90603827-scaled.jpeg',
        private = False,
        owner_id = 1
        )

    test_server2 = Server(
        name='test', 
        image_url='https://www.racksolutions.com/news//app/uploads/AdobeStock_90603827-scaled.jpeg',
        private = False,
        owner_id = 1
        )
    test_server3 = Server(
        name='test', 
        image_url='https://www.racksolutions.com/news//app/uploads/AdobeStock_90603827-scaled.jpeg',
        private = False,
        owner_id = 1
        )
    test_server4 = Server(
        name='test', 
        image_url='https://www.racksolutions.com/news//app/uploads/AdobeStock_90603827-scaled.jpeg',
        private = True,
        owner_id = 1
        )
    test_server5 = Server(
        name='test', 
        image_url='https://www.racksolutions.com/news//app/uploads/AdobeStock_90603827-scaled.jpeg',
        private = True,
        owner_id = 1
        )

    db.session.add(test_server)
    db.session.add(test_server2)
    db.session.add(test_server3)
    db.session.add(test_server4)
    db.session.add(test_server5)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE')
    db.session.commit()