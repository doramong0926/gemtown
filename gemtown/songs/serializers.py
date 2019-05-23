from rest_framework import serializers
from . import models
from gemtown.users import models as user_models
from gemtown.musicians import models as musician_models

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

class CoverImageSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(many=True)
    class Meta:
        model = models.CoverImage
        fields = (
            'id',
            'file',
            'title',
            'price',
            'buyer',
        )

class MusicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = musician_models.Musician
        fields = (
            'id',
            'cover_image',
            'nickname',
        )

class CommentOfSongSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    class Meta:
        model = models.CommentOfSong
        fields = (
            'song',
            'comment',
            'creator',
            'created_at',
            'updated_at',
        )


class LikeOfSongSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    class Meta:
        model = models.LikeOfSong
        fields = (
            'song',
            'creator',
            'created_at',
            'updated_at',
        )


class PlayOfSongSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    class Meta:
        model = models.PlayOfSong
        fields = (
            'song',
            'creator',
            'created_at',
            'updated_at',
        )


class DownloadOfSongSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    class Meta:
        model = models.DownloadOfSong
        fields = (
            'song',
            'creator',
            'created_at',
            'updated_at',
        )


class SongDetailSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    updated_at = TimestampField()

    comment = CommentOfSongSerializer(many=True)
    like = LikeOfSongSerializer(many=True)
    creator = UserSerializer()
    musician = MusicianSerializer()
    cover_image = CoverImageSerializer()

    class Meta:
        model = models.Song
        fields = (
            'id',
            'file',
            'cover_image_custom',
            'cover_image',
            'confirm_status',
            'musician',
            "album_title",
            'title',
            'like_count',
            'comment_count',
            'play_count',
            'download_count',
            'composer',
            'lyricist',
            'vocal',
            'career',
            'genre',
            'genre_detail',
            'duration',
            'description',
            'contents_hash',
            'blockchain_id',
            'blockchain_txid',
            'price_to_playing',
            'price_to_download',
            'comment',
            'like',
            'play',
            'download',
            'creator',
            'created_at',
            'updated_at',
        )

class SongSerializer(serializers.ModelSerializer):
    musician = MusicianSerializer()
    cover_image = CoverImageSerializer()

    class Meta:
        model = models.Song
        fields = (
            'id',
            'file',
            'cover_image',
            'title',
            'musician',
            'like_count',
            'play_count',
            'download_count',
            'duration',
            'price_to_playing',
            'price_to_download',
        )




