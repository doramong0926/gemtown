from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from gemtown.users import models as user_models
from gemtown.songs import models as song_models
from gemtown.modelphotos import models as modelphoto_models

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


@python_2_unicode_compatible
class MusicCopyright(TimeStampModel): 
    '''  MusicCopyright Model '''

    CONFIRM_STATUS_CHOICES = {
        ('ready', 'READY'),
        ('pendding', 'PENDDING'),
        ('completed', 'COMPLETED'),
        ('rejected', 'REJECTED'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    song = models.ForeignKey(song_models.Song, on_delete=models.PROTECT)
    block_chain_id = models.CharField(max_length=256, blank=True)
    block_chain_txid = models.CharField(max_length=256, blank=True)

    confirm_status = models.CharField(
        max_length=254, 
        choices=CONFIRM_STATUS_CHOICES, 
        default='ready'
    )

    def __str__(self):
        return '{}-{}'.format(self.song, self.creator)
    
    class Meta:
        ordering = ['-created_at']


class ModelPhotoCopyright(TimeStampModel): 
    '''  ModelPhotoCopyright Model '''

    CONFIRM_STATUS_CHOICES = {
        ('ready', 'READY'),
        ('pendding', 'PENDDING'),
        ('completed', 'COMPLETED'),
        ('rejected', 'REJECTED'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    modelphoto = models.ForeignKey(modelphoto_models.ModelPhoto, on_delete=models.PROTECT)
    block_chain_id = models.CharField(max_length=256, blank=True)
    block_chain_txid = models.CharField(max_length=256, blank=True)

    confirm_status = models.CharField(
        max_length=254, 
        choices=CONFIRM_STATUS_CHOICES, 
        default='ready'
    )

    def __str__(self):
        return '{}-{}'.format(self.modelphoto, self.creator)
    
    class Meta:
        ordering = ['-created_at']

class CopyrightId(TimeStampModel): 
    '''  CopyrightId Model '''
    name = models.CharField(max_length=64, default="copyright_id")
    copyright_id = models.IntegerField(default=0)