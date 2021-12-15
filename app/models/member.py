from .db import db
from .user import User
from .server import Server


class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, foreignKey=('user.id'), nullable=False)
    server_id = db.Column(db.Integer, foreignKey=('server.id'), nullable=False)