from rest_framework import serializers
from . import models
from gemtown.users import models as user_models
from gemtown.modelers import models as modeler_models
import time

class TimestampField(serializers.Field):
    def to_representation(self, value):
        return int(time.mktime(value.timetuple()))


class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = user_models.User
        fields = (
            'id',
            'username',
        )


class ModelerSerializer(serializers.ModelSerializer):    
    class Meta:
        model = modeler_models.Modeler
        fields = (
            'id',            
            'nickname',
        )

class ModelPhotoDetailSerializer(serializers.ModelSerializer):    
    created_at = TimestampField()
    updated_at = TimestampField()

    creator = UserSerializer()
    modeler = ModelerSerializer()

    class Meta:
        model = models.ModelPhoto
        fields = (
            'id',
            'file',
            'photo_type',
            'confirm_status',
            'modeler',   
            'contents_hash',
            'blockchain_id',
            'blockchain_txid', 
            'creator',
            'created_at',
            'updated_at',
        )


class ModelPhotoSerializer(serializers.ModelSerializer):    
    created_at = TimestampField()
    updated_at = TimestampField()
    creator = UserSerializer()
    modeler = ModelerSerializer()

    class Meta:
        model = models.ModelPhoto
        fields = (
            'id',
            'file',
            'photo_type',
            'confirm_status',
            'modeler',
            'creator',
            'created_at',
            'updated_at',
        )