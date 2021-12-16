from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired 
from flask_wtf import FlaskForm

class EditServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired()])