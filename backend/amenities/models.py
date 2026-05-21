from django.db import models

# Create your models here.
from django.db import models

class Amenity(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='amenities/')