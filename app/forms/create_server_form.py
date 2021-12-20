from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, URL


class CreateServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired(), URL(require_tld=True, message="Please enter a valid url for the server photo")])
    private = BooleanField('private')