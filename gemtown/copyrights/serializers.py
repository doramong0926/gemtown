from rest_framework import serializers
from . import models
from gemtown.users import models as user_models
from gemtown.songs import models as song_models
from gemtown.modelphotos import models as modelphoto_models
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

class SongSerializer(serializers.ModelSerializer):    
    class Meta:
        model = song_models.Song
        fields = (
            'id',
            'title',
        )

class MusicCopyrightSerializer(serializers.ModelSerializer):    
    song = SongSerializer()
    creator = UserSerializer()
    created_at = TimestampField()
    updated_at = TimestampField()
    class Meta:
        model = models.MusicCopyright        
        fields = (
            'id',
            'song',
            'block_chain_txid',
            'block_chain_id',
            'confirm_status',
            'creator',
            'created_at',
            'updated_at',
        )

class ModelPhotoCopyrightSerializer(serializers.ModelSerializer):    
    modelphoto = modelphoto_models.ModelPhoto
    creator = UserSerializer()
    created_at = TimestampField()
    updated_at = TimestampField()
    class Meta:
        model = models.ModelPhotoCopyright        
        fields = (
            'id',
            'modelphoto',
            'block_chain_txid',
            'block_chain_id',
            'confirm_status',
            'creator',
            'created_at',
            'updated_at',
        )
