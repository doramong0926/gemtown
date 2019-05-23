from rest_framework import serializers
from . import models
from gemtown.users import models as user_models

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

class AdvertisingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Advertising
        fields = (
            'image',
            'link',
            'advertising_type',
            'priority',
            'activate',
        )
