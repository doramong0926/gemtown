from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from multiselectfield import MultiSelectField
from gemtown.users import models as user_models
import os

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

@python_2_unicode_compatible
class Musician(TimeStampModel): 
    ''' Musician Model '''

    MUSICIAN_CAREER_CHOICES = {
        ('under_1year', 'Under 1 year'),
        ('_2yr', '2yr'),
        ('_3yr', '3yr'),
        ('_4yr', '4yr'),
        ('_5yr', '5yr'),
        ('_6yr_10yr', '6yr ~ 10yr'),
        ('over_10year', 'Over 10 year'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, related_name='musician_creator')
    cover_image = models.ImageField(blank=True)
    nickname = models.TextField(max_length=254)
    description = models.TextField(blank=True)
    career = models.CharField(max_length=20, choices=MUSICIAN_CAREER_CHOICES, blank=True)

    def __str__(self):
        return '{}-{}-{}'.format(self.nickname, self.gender, self.creator)

    class Meta:
        ordering = ['-created_at']

    @property
    def country(self):
        return user_models.User.objects.get(id=self.creator.id).country

    @property
    def gender(self):
        return user_models.User.objects.get(id=self.creator.id).gender

