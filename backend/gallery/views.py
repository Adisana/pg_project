from rest_framework import viewsets
from gallery.models import Gallery
from gallery.serializers import GallerySerializer

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
