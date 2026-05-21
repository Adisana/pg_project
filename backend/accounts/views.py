from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "message": "User registered successfully."
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # 1. Empty fields check
        if not username or not password:
            return Response(
                {"detail": "Please enter both username/email and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 2. Check if username or email exists in the database
        user_exists = User.objects.filter(username=username).exists() or User.objects.filter(email=username).exists()
        if not user_exists:
            return Response(
                {"detail": "Username or email not found in our database. Please register first."},
                status=status.HTTP_404_NOT_FOUND
            )

        # 3. Retrieve correct username if they entered email
        target_username = username
        if User.objects.filter(email=username).exists():
            target_username = User.objects.filter(email=username).first().username

        # 4. Standard Django authentication verifying standard ModelBackend
        user = authenticate(username=target_username, password=password)
        if user is None:
            return Response(
                {"detail": "Incorrect password. Please try again."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # 5. Issue Simple JWT Tokens programmatically
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user, context={'request': request}).data
        }, status=status.HTTP_200_OK)

class CurrentUserView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
