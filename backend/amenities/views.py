from rest_framework import viewsets
from amenities.models import Amenity
from amenities.serializers import AmenitySerializer

class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
