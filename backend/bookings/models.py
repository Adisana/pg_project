from django.db import models
from rooms.models import Room
from django.contrib.auth.models import User

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='bookings')
    user_name = models.CharField(max_length=100)
    user_phone = models.CharField(max_length=15)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(default='pending', max_length=20)

    def __str__(self):
        return f"Booking by {self.user_name} for room {self.room.title}"