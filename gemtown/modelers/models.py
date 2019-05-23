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
class Modeler(TimeStampModel): 
    ''' Modeler Model '''

    MODELER_GENDER_CHOICES = {
        ('male', 'Male'),
        ('female', 'Female'),
        ('foregin_male', 'Foregin_Male'),
        ('foregin_female', 'Foregin_Female'),
        ('not_specified', 'Not specified'),
    }

    MODELER_AGE_CHOICES = {
        ('child', 'Child'),
        ('10s', '10s'),
        ('20s', '20s'),
        ('30s', '30s'),
        ('40s', '40s'),
        ('50s', '50s'),
        ('60s', '60s'),
    }

    MODELER_JOB_CHOICES = {
        ('beauty', 'Beauty'), #뷰티
        ('hair', 'Hair'), #헤어
        ('drink', 'Drink'), #음료
        ('education', 'Education'), #교육
        ('enterprise', 'Enterprise'), #기업
        ('finance', 'Finance'), #금융
        ('sport', 'Sport'), #스포츠
        ('fashion', 'Fashion'), #패션
        ('wedding', 'wedding'), #웨딩
        ('swimsuit', 'Swimsuit'), #수영복
        ('underwear', 'Underwear'), #언더웨어
    }

    MODELER_ENTERTAINMENT_CHOICES = {
        ('pictorial', 'Pictorial'), #화보
        ('magazine', 'Magazine'), #잡지
        ('broadcast', 'Broadcast'), #방송
        ('cf', 'CF'), # CF
        ('event', 'Event'), # 행사
        ('exhibition', 'Exhibition'), # 전시
        ('racing', 'Racing'), # 레이싱
        ('narrator_dance', 'Narrator(Dance)'), # 나래이터(댄스)
        ('narrator_announcement', 'Narrator(Announcement)'), # 나래이터(멘트)
    }

    MODELER_STYLE_CHOICES = {
        ('pure', 'Pure'), #순수
        ('sexy', 'Sexy'), #섹시
        ('cuteness', 'Cuteness'), #귀여움
        ('bagel', 'Bagel'), #베이글
        ('tough', 'Tough'), #터프
        ('chic', 'Chic'), #시크
        ('smart', 'Smart'), #스마트
    }
    
    MODELER_CAREER_CHOICES = {
        ('under_1year', 'Under 1 year'),
        ('2yr', '2yr'),
        ('3yr', '3yr'),
        ('4yr', '4yr'),
        ('5yr', '5yr'),
        ('over_6yr', 'Over 6 year'),
    }

    MODELER_CONFIRM_STATUS_CHOICES = {
        ('ready', 'READY'),
        ('approving', 'APPROVING'),
        ('approved', 'APPROVED'),
        ('pendding', 'PENDDING'),
        ('completed', 'COMPLETED'),
        ('rejected', 'REJECTED'),
    }

    MODELER_BLOOD_TYPE_CHOICES = {
        ('blood_type_a', 'A-TYPE'),
        ('blood_type_ab', 'AB-TYPE'),
        ('blood_type_b', 'B-TYPE'),
        ('blood_type_o', 'O-TYPE'),
        ('blood_type_etc', 'ETC'),
    }

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, related_name='modeler_creator')
    nickname = models.TextField(max_length=256)
    description = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=64, choices=MODELER_GENDER_CHOICES, blank=True, null=True)
    age_range = models.CharField(max_length=20, choices=MODELER_AGE_CHOICES, blank=True, null=True)
    career = models.CharField(max_length=20, choices=MODELER_CAREER_CHOICES, blank=True, null=True)
    job = MultiSelectField(max_length=256, choices=MODELER_JOB_CHOICES, blank=True, null=True)
    entertainment = MultiSelectField(max_length=256, choices=MODELER_ENTERTAINMENT_CHOICES, blank=True, null=True)
    style = MultiSelectField(max_length=64, choices=MODELER_STYLE_CHOICES, blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    blood_type = models.CharField(max_length=36, choices=MODELER_BLOOD_TYPE_CHOICES, blank=True, null=True)
    age = models.CharField(max_length=20, blank=True, default='0')
    bust = models.CharField(max_length=128, blank=True, default='0')
    wiast = models.CharField(max_length=128, blank=True, default='0')
    hip = models.CharField(max_length=128, blank=True, default='0')
    birth_year = models.CharField(max_length=16, blank=True, null=True)
    birth_month = models.CharField(max_length=16, blank=True, null=True)
    birth_day = models.CharField(max_length=16, blank=True, null=True)
    confirm_status = models.CharField(
        max_length=10, 
        choices=MODELER_CONFIRM_STATUS_CHOICES, 
        default='ready',
    )
    latest_ranking = models.IntegerField(default=0)

    def __str__(self):
        return '{}-{}-{}'.format(self.nickname, self.gender, self.creator)

    class Meta:
        ordering = ['-created_at']

    @property
    def like_count(self):
        return LikeOfModeler.objects.filter(modeler__id=self.id).count()

    @property
    def comment_count(self):
        return CommentOfModeler.objects.filter(modeler__id=self.id).count()

    @property    
    def cover_image(self):
        from gemtown.modelphotos import models as modelphoto_models
        try :
            found_modelphoto = modelphoto_models.ModelPhoto.objects.filter(modeler__id=self.id, photo_type="cover")
            found_modelphoto = found_modelphoto[0]
        except:
            found_modelphoto = modelphoto_models.ModelPhoto.objects.get(modeler__id=self.id, photo_type="cover")
        return found_modelphoto
    
    @property    
    def full_image(self):
        from gemtown.modelphotos import models as modelphoto_models
        try :
            found_modelphoto = modelphoto_models.ModelPhoto.objects.filter(modeler__id=self.id, photo_type="full")
            found_modelphoto = found_modelphoto[0]
        except:
            found_modelphoto = modelphoto_models.ModelPhoto.objects.get(modeler__id=self.id, photo_type="full")
        return found_modelphoto

    @property    
    def half_image(self):
        from gemtown.modelphotos import models as modelphoto_models
        try :
            found_modelphoto = modelphoto_models.ModelPhoto.objects.filter(modeler__id=self.id, photo_type="half")
            found_modelphoto = found_modelphoto[0]
        except:
            found_modelphoto = modelphoto_models.ModelPhoto.objects.get(modeler__id=self.id, photo_type="half")
        return found_modelphoto

    @property    
    def etc_image(self):
        from gemtown.modelphotos import models as modelphoto_models
        try :
            found_modelphoto = modelphoto_models.ModelPhoto.objects.filter(modeler__id=self.id, photo_type="etc")
            found_modelphoto = found_modelphoto[0]
        except:
            found_modelphoto = modelphoto_models.ModelPhoto.objects.get(modeler__id=self.id, photo_type="etc")
        return found_modelphoto

    @property
    def country(self):
        return user_models.User.objects.get(id=self.creator.id).country

@python_2_unicode_compatible
class CommentOfModeler(TimeStampModel):
    ''' CommentOfModeler Model '''
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True, related_name='comment_creator')    
    modeler = models.ForeignKey(Modeler, on_delete=models.PROTECT, null=True, related_name='comment_modeler')
    comment = models.TextField()
    def __str__(self):
        return self.comment

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class LikeOfModeler(TimeStampModel):
    ''' LikeOfModeler Model '''
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True, related_name='like_creator')
    modeler = models.ForeignKey(Modeler, on_delete=models.PROTECT, null=True, related_name='like_modeler')

    class Meta:
        ordering = ['-created_at']

