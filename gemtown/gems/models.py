from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.db.models import Sum
from gemtown.users import models as user_models
import os


@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

@python_2_unicode_compatible
class PurchaseGem(TimeStampModel): 
    '''  PurchaseGem Model '''

    PURCHASE_CHOICES = {
        ('cash', 'Cash'),
        ('credit', 'Credit'),
        ('bank', 'Bank'),
        ('gift_card_culture', 'Gift Card(Culture)'),
        ('test', 'Test'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    amount = models.IntegerField(default=0)
    purchase_type = models.CharField(max_length=256, choices=PURCHASE_CHOICES, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

@python_2_unicode_compatible
class ConsumptionGem(TimeStampModel): 
    '''  ConsumptionGem Model '''

    CONSUMPTION_CHOICES = {
        ('register_song', 'Register Song'),
        ('register_model_photo', 'Register Model Photo'),
        ('buy_song_cover', 'Buy Song Cover'),
    }
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    amount = models.IntegerField(default=0)
    consumption_type = models.CharField(max_length=256, choices=CONSUMPTION_CHOICES, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

@python_2_unicode_compatible
class BonusGem(TimeStampModel): 
    '''  BonusGem Model '''

    BONUS_CHOICES = {
        ('open_event', 'Open Event'),
        ('promotion', 'Promotion'),
        ('test', 'Test'),
    }
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT)
    amount = models.IntegerField(default=0)
    bonus_type = models.CharField(max_length=256, choices=BONUS_CHOICES, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']