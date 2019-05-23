from django.contrib.auth.models import AbstractUser
from django.db.models import Sum
from django.urls import reverse
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
from django.db import models

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


@python_2_unicode_compatible
class User(AbstractUser, TimeStampModel):
    ''' User Model '''

    GENDER_CHOICES = {
        ('male', 'Male'),
        ('female', 'Female'),
        ('foregin_male', 'Foregin_Male'),
        ('foregin_female', 'Foregin_Female'),
        ('not_specified', 'Not specified'),
    }

    USER_CLASS_CHOICES = {
        ('common', 'Common'),
        ('artist', 'Artist'),
        ('company', 'Company'),
    }

    COUNTRY_CHOICES = {
        ('kr', 'Korea'),
        ('us', 'United States of America'),
        ('hk', 'Hong Kong'),
        ('cn', 'China'),
        ('vn', 'Viet Nam'),
        ('jp', 'Japan'),
        ('id', 'Indonesia'),
        ('sg', 'Singapore'),
    }
    
    profile_photo = models.ImageField(blank=True)
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, blank=True)
    country = models.CharField(
        max_length=80, 
        choices=COUNTRY_CHOICES, 
        default='kr',
        blank=True
    )
    mobile_number = models.CharField(max_length=80, blank=True)
    mobile_country = models.CharField(
        max_length=80, 
        choices=COUNTRY_CHOICES, 
        default='kr',
        blank=True
    )
    followers = models.ManyToManyField("self", symmetrical=False, blank=True, related_name="followings_set")
    followings = models.ManyToManyField("self", symmetrical=False, blank=True, related_name="followers_set")
    user_class = models.CharField(max_length=80, choices=USER_CLASS_CHOICES, blank=True, default="nomal")

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    class Meta:
        ordering = ['-created_at']

    @property
    def musician(self):
        from gemtown.musicians import models as musician_models
        return musician_models.Musician.objects.get(creator__id=self.id)

    @property
    def modeler(self):
        from gemtown.modelers import models as modeler_models
        return modeler_models.Modeler.objects.get(creator__id=self.id)

    @property
    def gem_amount(self):
        from gemtown.gems import models as gem_models
        try:
            found_purchase_amount = gem_models.PurchaseGem.objects.filter(creator__id=self.id).aggregate(Sum('amount')).get('amount__sum')
            if found_purchase_amount == None:
                found_purchase_amount = 0
        except gem_models.PurchaseGem.DoesNotExist:
            found_purchase_amount = 0
        
        try:
            found_bonus_amount = gem_models.BonusGem.objects.filter(creator__id=self.id).aggregate(Sum('amount')).get('amount__sum')
            if found_bonus_amount == None:
                found_bonus_amount = 0
        except gem_models.BonusGem.DoesNotExist:
            found_bonus_amount = 0

        try:
            found_comsumption_amount = gem_models.ConsumptionGem.objects.filter(creator__id=self.id).aggregate(Sum('amount')).get('amount__sum')
            if found_comsumption_amount == None:
                found_comsumption_amount = 0
        except gem_models.ConsumptionGem.DoesNotExist:
            found_comsumption_amount = 0

        gem_amount = 0
        gem_amount = found_purchase_amount + found_bonus_amount - found_comsumption_amount
        if gem_amount < 0:
            gem_amount = 0
        return gem_amount

