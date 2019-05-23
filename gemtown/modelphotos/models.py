from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from gemtown.users import models as user_models
from gemtown.modelers import models as modeler_models
import os

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


@python_2_unicode_compatible
class ModelPhoto(TimeStampModel): 
    '''  ModelPhoto Model '''

    def upload_file_name(instance, filename):
        ext = filename.split('.')[-1]
        filename = '%s_%s_%s.%s' % (instance.creator.username, 'model_photo', instance.photo_type, ext)
        return os.path.join('ModelPhoto', filename)

    MODEL_PHOTO_CONFIRM_STATUS_CHOICES = {
        ('ready', 'READY'),
        ('approving', 'APPROVING'),
        ('approved', 'APPROVED'),
        ('pendding', 'PENDDING'),
        ('completed', 'COMPLETED'),
        ('rejected', 'REJECTED'),
    }

    MODEL_PHOTO_TYPE_CHOICES = {
        ('cover', 'COVER'),
        ('full', 'FULL'),
        ('half', 'HALF'),
        ('etc', 'ETC'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    modeler = models.ForeignKey(modeler_models.Modeler, on_delete=models.PROTECT, blank=True, null=True)
    photo_type = models.CharField(
        max_length=256, 
        choices=MODEL_PHOTO_TYPE_CHOICES, 
        blank=True,
    )
    file = models.ImageField(upload_to=upload_file_name)
    confirm_status = models.CharField(
        max_length=20, 
        choices=MODEL_PHOTO_CONFIRM_STATUS_CHOICES, 
        default='ready'
    )
    contents_hash =  models.CharField(max_length=256, blank=True)
    blockchain_id =  models.CharField(max_length=256, blank=True)
    blockchain_txid =  models.CharField(max_length=256, blank=True)

    def __str__(self):
        return '{}-{}-{}'.format(self.file, self.modeler, self.creator)
    
    class Meta:
        ordering = ['-created_at']