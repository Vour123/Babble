from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    image_url = db.Column(db.String)
    hashed_password = db.Column(db.String(255), nullable=False)

    members = db.relationship('Server', secondary='members', back_populates='users', cascade='all, delete')
    messages = db.relationship('Message', back_populates='users', cascade='all, delete')
    servers = db.relationship('Server', back_populates='users', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url
        }
