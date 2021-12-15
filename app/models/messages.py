from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    channel_id = db.Column(db.Integer, db.foreignKey('channels.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.foreignKey('user.id'), nullable=False)

    channel = db.relationship('Channel', back_populates='messages')
    owner = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'channel_id': self.channel_id,
            'owner_id': self.owner_id
        }