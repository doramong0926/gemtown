from rest_framework import serializers
from gemtown.users import models as user_models
from gemtown.modelphotos import models as modelphoto_models
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

class ModelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = modelphoto_models.ModelPhoto
        fields = (
            'file',
            'photo_type',
        )

class CommentOfModelerSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    class Meta:
        model = models.CommentOfModeler
        fields = (
            'modeler',
            'comment',
            'creator',
            'created_at',
            'updated_at',
        )


class LikeOfModelerSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    class Meta:
        model = models.LikeOfModeler
        fields = (
            'modeler',
            'creator',
            'created_at',
            'updated_at',
        )


class ModelerDetailSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    comment_modeler = CommentOfModelerSerializer(many=True)
    like_modeler = LikeOfModelerSerializer(many=True)

    cover_image = ModelPhotoSerializer()
    full_image = ModelPhotoSerializer()
    half_image = ModelPhotoSerializer()
    etc_image = ModelPhotoSerializer(many=True)

    class Meta:
        model = models.Modeler
        fields = (
            'id',
            'country',
            'cover_image',
            'full_image',
            'half_image',
            'etc_image',
            'nickname',
            'description',
            'gender',
            'age_range',
            'career',
            'job',
            'entertainment',
            'height',
            'weight',
            'blood_type',
            'age',
            'bust',
            'wiast',
            'hip',
            'birth_year',
            'birth_month',
            'birth_day',
            'latest_ranking',
            'like_count',
            'comment_count',
            'like_modeler',
            'comment_modeler',
            'confirm_status',
            'creator',
            'created_at',
            'updated_at',
        )

class ModelerSerializer(serializers.ModelSerializer):
    cover_image = ModelPhotoSerializer()
    class Meta:
        model = models.Modeler
        fields = (
            'id',
            'country',
            'cover_image',
            'nickname',
            'latest_ranking',
            'like_count',
            'comment_count',
            'confirm_status',
        )






