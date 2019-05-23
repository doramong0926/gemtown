from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from gemtown.users import models as user_models

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


@python_2_unicode_compatible
class Advertising(TimeStampModel):
    '''  Advertising Model '''

    ADVERTISING_TYPE = {
        ('top_model', 'TOP MODEL'),
        ('top_music', 'TOP MUSIC'),
        ('top_story', 'TOP SLIDE'),
        ('top_video', 'TOP VIDEO'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    image = models.ImageField(blank=True)
    link = models.URLField(max_length=200, null=True)
    advertising_type = models.CharField(
        max_length=32,
        choices=ADVERTISING_TYPE,
        null=True,
    )
    priority = models.CharField(max_length=50, null=True)
    activate = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
