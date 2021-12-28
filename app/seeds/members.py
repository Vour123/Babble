from app.models import db, Member

def seed_members():
    member_1 = Member(
        user_id = 1,
        server_id = 1
    )

    member_2 = Member(
        user_id = 1,
        server_id = 2
    )

    member_3 = Member(
        user_id = 1,
        server_id = 3
    )

    member_4 = Member(
        user_id = 1,
        server_id = 4
    )

    member_5 = Member(
        user_id = 1,
        server_id = 5
    )

    db.session.add(member_1)
    db.session.add(member_2)
    db.session.add(member_3)
    db.session.add(member_4)
    db.session.add(member_5)
    db.session.commit()

def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()