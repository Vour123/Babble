from .db import db
from sqlalchemy.sql import func

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(25), nullable=False)
    server_id = db.Column(db.Integer, db.Foreignkey('servers.id'), nullable=False)

    servers = db.relationship('Server', back_populates='channels')
    messages = db.relationship('Message', back_populates='channels', cascade='all, delete')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'messages': {},
            'server_id': self.server_id
        }