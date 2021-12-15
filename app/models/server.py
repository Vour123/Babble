from .db import db

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, default=False, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    users = db.relationship('User', back_populates='servers')
    members = db.relationship('User', secondary='members', back_populates='servers')
    channels = db.relationship('Channel', back_populates='servers', cascade='all, delete')