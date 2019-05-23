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

class PurchaseGemSerializer(serializers.ModelSerializer):    
    creator = UserSerializer()
    created_at = TimestampField()
    updated_at = TimestampField()
    class Meta:
        model = models.PurchaseGem        
        fields = (
            'id',
            'amount',
            'purchase_type',
            'creator',
            'created_at',
            'updated_at',
        )

class ConsumptionGemSerializer(serializers.ModelSerializer):    
    creator = UserSerializer()
    created_at = TimestampField()
    updated_at = TimestampField()
    class Meta:
        model = models.ConsumptionGem        
        fields = (
            'id',
            'amount',
            'consumption_type',
            'creator',
            'created_at',
            'updated_at',
        )

class BonusGemSerializer(serializers.ModelSerializer):    
    creator = UserSerializer()
    created_at = TimestampField()
    updated_at = TimestampField()
    class Meta:
        model = models.BonusGem        
        fields = (
            'id',
            'amount',
            'bonus_type',
            'creator',
            'created_at',
            'updated_at',
        )

