from .db import db
import datetime

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

    def to_dict(self):
        if self.private and len(self.channels):
            channel = self.channels[0].to_dict()
            channelId = channel["id"]
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'private': self.private,
            'owner_id': self.owner_id,
            'members': [user.id for user in self.members],
            "member_list": [user.to_dict() for user in self.members],
            'channels': {channelId: self.channels[0].to_dict()} if len(self.channels) and self.private else{}
        }

        '''association_table = Table('association', Base.metadata,
    Column('left_id', ForeignKey('left.id'), primary_key=True),
    Column('right_id', ForeignKey('right.id'), primary_key=True)
)

class Parent(Base):
    __tablename__ = 'left'
    id = Column(Integer, primary_key=True)
    children = relationship(
        "Child",
        secondary=association_table,
        back_populates="parents")

class Child(Base):
    __tablename__ = 'right'
    id = Column(Integer, primary_key=True)
    parents = relationship(
        "Parent",
        secondary=association_table,
        back_populates="children")
'''