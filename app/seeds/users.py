from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password', image_url='https://www.allthingsdogs.com/wp-content/uploads/2019/12/Red-Husky-Feature.jpg')
    user1 = User(username='Jose Cantu', email='jose@aa.io', password='password', image_url='https://res.cloudinary.com/dfswxjqrs/image/upload/v1641214093/profilepic_xz2fxk.jpg')
    
    db.session.add(demo)
    db.session.add(user1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
