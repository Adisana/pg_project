from rest_framework import serializers
from django.contrib.auth.models import User
# pyrefly: ignore [missing-import]
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('phone', 'role')

class UserSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'role', 'first_name', 'last_name')

    def get_phone(self, obj):
        # Prevent crash if obj has no profile
        if hasattr(obj, 'profile') and obj.profile:
            return obj.profile.phone
        return ''

    def get_role(self, obj):
        # Prevent crash if obj has no profile, default to resident 'user'
        if hasattr(obj, 'profile') and obj.profile:
            return obj.profile.role
        return 'user'

class RegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES, write_only=True, default='user')
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'phone', 'role')

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken. Please choose another.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists. Please choose another or login.")
        return value

    def create(self, validated_data):
        phone = validated_data.pop('phone', '')
        role = validated_data.pop('role', 'user')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password
        )
        
        # Signal creates the profile automatically, we just update fields
        profile, created = UserProfile.objects.get_or_create(user=user)
        profile.phone = phone
        profile.role = role
        profile.save()
        
        return user
