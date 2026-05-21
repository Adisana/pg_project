from rest_framework import viewsets, permissions
from bookings.models import Booking
from bookings.serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    # Keep the default queryset attribute to let DRF router automatically resolve the basename
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Strict privacy filtering at runtime: admins/superusers see all, residents only see their own
        if user.is_superuser or (hasattr(user, 'profile') and user.profile.role == 'admin'):
            return Booking.objects.all().order_by('-id')
        return Booking.objects.filter(user=user).order_by('-id')

    def perform_create(self, serializer):
        # Automatically link the booking to the logged-in authenticated user
        serializer.save(user=self.request.user)
