from .db import db

class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, foreignKey=('user.id'), nullable=False)
    server_id = db.Column(db.Integer, foreignKey=('server.id'), nullable=False)

    user = db.relationship('User', back_populates='members')
    server = db.relationship('Server', back_populates='members')