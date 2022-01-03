from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image_url='https://lh3.googleusercontent.com/fwqJKEtrapmAqNonRd_l4RKumwB_kpauXRP0x_Xu7G3_G-nqsTvUyzTv3uAtShbmEEbHDyBOTO8OPQ8sIEbgER4fOlMl-mSlO33hBbgzKKnRjNxIOVIWX_gaqNHCTQx-BpeVT_cxhY5IhiU0qY9s0gtYlt6M-KYDXxCwUHDxL8KI40YlTyZev7d9E6QwGnEkaUG4PQE8GEqDh705pcgfc0gvMz9pimdO-OgTfWt5-lzICYSpesIu-cBje6cjWq9VSVWhyGYIvq1L7vT8zZJiEhb01W0NiRzrILMjymM3kSZfojFyMQ7Lm9ZgUulVHG_D6r88kuXtV_ejLDgisWCS53V-e1-eGhZUmi9XwgPVHe0BcKNhl8cIbYOsOmIjlyQBfrzD6HBYkvEYvL17d_bmtZICYseNQYVQ-JKZgZ4yVzmXaNe9XT6oAOe1g7hoGhEKMw7ar83bIkJUbRmF8YrW-7j79u3CxPdSO2uX4Fqp5NIFTE7liU-QM7dv2SljAOov2DkZJPBb6JqlB8mTnHkstffGEfcY4IMOe7MoFJ1bVb6JwTly7Q9nPX3EANp2PmuRw3SVCIQBrOCbBDi3t9cCxpwFY3i21Ox8_UADMOAqgAHFXfJDAV8NY-uilvkQRMrfICV0zM4ITONAVa8euOnqyMfgImau3eMqkMPKC5I6y4OXgCuptx_RqWox2ej71nT6hTculi41DQzQY0OG5Q2_BCk2=s400-no?authuser=0')
    
    db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
