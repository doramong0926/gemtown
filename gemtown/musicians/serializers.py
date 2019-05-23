from rest_framework import serializers
from gemtown.users import models as user_models
from . import models
import time

class TimestampField(serializers.Field):
    def to_representation(self, value):
        return int(time.mktime(value.timetuple()))

class UsernameSerializer(serializers.ModelSerializer):    
    class Meta:
        model = user_models.User
        fields = (
            'username',
        )

class MusicianSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.Musician
        fields = (
            'id',
            'nickname',
            'country',
        )

class MusicianDetailSerializer(serializers.ModelSerializer):    
    created_at = TimestampField()
    updated_at = TimestampField()

    class Meta:
        model = models.Musician
        fields = (
            'id',            
            'gender',
            'country',
            'cover_image',
            'nickname',
            'description',
            'career',
            'creator',
            'created_at',
            'updated_at',
        )
    

