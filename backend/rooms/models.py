from django.db import models

# Create your models here.
from django.db import models

class Room(models.Model):
    ROOM_TYPES = (
        ('single', 'Single'),
        ('double', 'Double'),
        ('triple', 'Triple'),
        ('4_sharing', '4 Sharing'),
        ('5_sharing', '5 Sharing'),
    )

    title = models.CharField(max_length=100)
    room_type = models.CharField(max_length=15, choices=ROOM_TYPES)
    price = models.FloatField()
    capacity = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='rooms/')
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.title
