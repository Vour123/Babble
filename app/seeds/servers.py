from app.models import db, Server

def seed_servers():
    test_server = Server(
        name='test', 
        image_url='https://www.racksolutions.com/news//app/uploads/AdobeStock_90603827-scaled.jpeg',
        private = False,
        owner_id = 1
        )

    db.session.add(test_server)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE')
    db.session.commit()