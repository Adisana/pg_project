from rest_framework import viewsets
from rooms.models import Room
from rooms.serializers import RoomSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer