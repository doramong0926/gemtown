from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from gemtown.users import models as user_models
from gemtown.musicians import models as musician_models

import os

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

@python_2_unicode_compatible
class CoverImage(TimeStampModel):
    def upload_file_name(instance, filename):
        ext = filename.split('.')[-1]
        filename = '%s_%s.%s' % (instance.title, 'music_cover', ext)
        return os.path.join('MusicCoverImage', filename)

    ''' CoverImage Model '''
    file = models.ImageField(upload_to=upload_file_name, blank=True)
    title = models.TextField(max_length=254)
    price = models.IntegerField(default=10)
    buyer = models.ManyToManyField(user_models.User, symmetrical=False, blank=True, related_name="song_buyer")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return '{}'.format(self.title)

@python_2_unicode_compatible
class Song(TimeStampModel): 
    ''' Song Model '''

    def upload_file_name(instance, filename):
        ext = filename.split('.')[-1]
        filename = '%s_%s_%s.%s' % (instance.creator.username, instance.title, 'music', ext)
        return os.path.join('Music', filename)

    SONG_GENRE_CHOICES = {
        ('ballad', 'Ballad'),
        ('dance', 'Dance'),
        ('rap_hip_hop', 'Rap/Hip-hop'),
        ('rnb_soul', 'R&B/Soul'),
        ('rock_band', 'Rock/Band'),
        ('jazz', 'Jazz'),
        ('trot', 'Trot'),
        ('folk_blues', 'Folk/Blues'),
    }

    SONG_GENRE_DETAIL_CHOICES = {
        ('ost', 'OST'),
        ('edm', 'EDM'),
        ('rave', 'RAVE'),
        ('thecno', 'THECNO'),
        ('trance', 'TRANCE'),
        ('club', 'CLUB'),
        ('carol', 'CAROL'),
        ('ccm', 'CCM'),
        ('cm', 'CM'),
    }

    SONG_CONFIRM_STATUS_CHOICES = {
        ('ready', 'READY'),
        ('approving', 'APPROVING'),
        ('approved', 'APPROVED'),
        ('pendding', 'PENDDING'),
        ('completed', 'COMPLETED'),
        ('rejected', 'REJECTED'),
    }

    SONG_CAREER_CHOICES = {
        ('under_1year', 'Under 1 year'),
        ('_2yr', '2yr'),
        ('_3yr', '3yr'),
        ('_4yr', '4yr'),
        ('_5yr', '5yr'),
        ('_6yr_10yr', '6yr ~ 10yr'),
        ('over_10year', 'Over 10 year'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    musician = models.ForeignKey(musician_models.Musician, on_delete=models.PROTECT)
    file = models.FileField(upload_to=upload_file_name)
    cover_image_custom = models.ImageField(blank=True)
    cover_image = models.ForeignKey(CoverImage, on_delete=models.PROTECT, null=True, related_name='song_cover_image')
    album_title = models.TextField(max_length=254, blank=True)
    title = models.TextField(max_length=254)
    composer = models.TextField(max_length=254, blank=True)
    lyricist = models.TextField(max_length=254, blank=True)
    vocal = models.TextField(max_length=254, blank=True)
    description = models.TextField(blank=True)
    genre = models.CharField(max_length=254, choices=SONG_GENRE_CHOICES)
    genre_detail = models.CharField(max_length=254, choices=SONG_GENRE_DETAIL_CHOICES)
    career = models.CharField(max_length=20, choices=SONG_CAREER_CHOICES)
    duration = models.IntegerField()
    latest_ranking = models.IntegerField(default=0)
    confirm_status = models.CharField(
        max_length=256, 
        choices=SONG_CONFIRM_STATUS_CHOICES, 
        default='ready'
    )
    contents_hash =  models.CharField(max_length=256, blank=True)
    blockchain_id =  models.CharField(max_length=256, blank=True)
    blockchain_txid =  models.CharField(max_length=256, blank=True)
    price_to_playing = models.IntegerField(default=1)
    price_to_download = models.IntegerField(default=100)

    def __str__(self):
        return '{}-{}-{}-{}'.format(self.file, self.title, self.musician, self.creator)

    class Meta:
        ordering = ['-created_at']

    @property
    def like_count(self):
        return LikeOfSong.objects.filter(song__id=self.id).count()

    @property
    def comment_count(self):
        return CommentOfSong.objects.filter(song__id=self.id).count()

    @property
    def play_count(self):
        return PlayOfSong.objects.filter(song__id=self.id).count()

    @property
    def download_count(self):
        return DownloadOfSong.objects.filter(song__id=self.id).count()


@python_2_unicode_compatible
class CommentOfSong(TimeStampModel):
    ''' CommentOfSong Model '''
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)    
    comment = models.TextField()
    song = models.ForeignKey(Song, on_delete=models.PROTECT, null=True, related_name='comment')

    def __str__(self):
        return self.comment

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class LikeOfSong(TimeStampModel):
    ''' LikeOfSong Model '''
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    song = models.ForeignKey(Song, on_delete=models.PROTECT, null=True, related_name='like')

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class PlayOfSong(TimeStampModel):
    ''' PlayOfSong Model '''
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    song = models.ForeignKey(Song, on_delete=models.PROTECT, null=True, related_name='play')

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class DownloadOfSong(TimeStampModel):
    ''' DownloadOfSong Model '''
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    song = models.ForeignKey(Song, on_delete=models.PROTECT, null=True, related_name='download')

    class Meta:
        ordering = ['-created_at']

