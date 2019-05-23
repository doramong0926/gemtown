from rest_framework import serializers
from gemtown.modelphotos import models as modelphoto_models
from gemtown.modelers import models as modeler_models
from gemtown.musicians import models as musician_models
from . import models
import time

class TimestampField(serializers.Field):
    def to_representation(self, value):
        return int(time.mktime(value.timetuple()))

class UsernameSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.User
        fields = (
            'username',
        )

class MusicianSerializer(serializers.ModelSerializer):    
    class Meta:
        model = musician_models.Musician
        fields = (
            'id',
            'nickname',
            'country',
        )

class ModelPhotoSerializer(serializers.ModelSerializer):    
    class Meta:
        model = modelphoto_models.ModelPhoto
        fields = (
            'file',
            'photo_type',
        )

class ModelerSerializer(serializers.ModelSerializer):    
    cover_image = ModelPhotoSerializer()
    class Meta:
        model = modeler_models.Modeler
        fields = (
            'id',            
            'cover_image',
            'nickname',
            'country',
        )

class UserSerializer(serializers.ModelSerializer):    
    created_at = TimestampField()
    updated_at = TimestampField()
    followers = UsernameSerializer(many=True)
    followings = UsernameSerializer(many=True)
    musician = MusicianSerializer()
    modeler = ModelerSerializer()

    class Meta:
        model = models.User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'user_class',
            'gem_amount',
            'musician',
            'modeler',
            'gender',
            'profile_photo',
            'country',
            'mobile_number',
            'mobile_country',            
            'followers',
            'followings',
            'is_superuser',
            'is_staff',
            'created_at',
            'updated_at'            
        )



