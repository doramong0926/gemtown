# Generated by Django 2.0.13 on 2019-04-24 11:48

from django.db import migrations, models
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('modelers', '0010_auto_20190424_2048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modeler',
            name='age_range',
            field=models.CharField(blank=True, choices=[('10s', '10s'), ('20s', '20s'), ('30s', '30s'), ('50s', '50s'), ('60s', '60s'), ('40s', '40s'), ('child', 'Child')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='blood_type',
            field=models.CharField(blank=True, choices=[('AB', 'blood_type_ab'), ('ETC', 'blood_type_etc'), ('O', 'blood_type_o'), ('B', 'blood_type_b'), ('A', 'blood_type_a')], max_length=36, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='career',
            field=models.CharField(blank=True, choices=[('under_1year', 'Under 1 year'), ('3yr', '3yr'), ('2yr', '2yr'), ('4yr', '4yr'), ('over_6yr', 'Over 6 year'), ('5yr', '5yr')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='confirm_status',
            field=models.CharField(choices=[('ready', 'READY'), ('rejected', 'REJECTED'), ('pendding', 'PENDDING'), ('completed', 'COMPLETED'), ('approved', 'APPROVED'), ('approving', 'APPROVING')], default='ready', max_length=10),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='entertainment',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('event', 'Event'), ('cf', 'CF'), ('exhibition', 'Exhibition'), ('broadcast', 'Broadcast'), ('magazine', 'Magazine'), ('pictorial', 'Pictorial'), ('narrator_announcement', 'Narrator(Announcement)'), ('narrator_dance', 'Narrator(Dance)'), ('racing', 'Racing')], max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='gender',
            field=models.CharField(blank=True, choices=[('female', 'Female'), ('not_specified', 'Not specified'), ('male', 'Male'), ('foregin_female', 'Foregin_Female'), ('foregin_male', 'Foregin_Male')], max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='job',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('wedding', 'wedding'), ('drink', 'Drink'), ('enterprise', 'Enterprise'), ('swimsuit', 'Swimsuit'), ('sport', 'Sport'), ('hair', 'Hair'), ('beauty', 'Beauty'), ('education', 'Education'), ('underwear', 'Underwear'), ('fashion', 'Fashion'), ('finance', 'Finance')], max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='style',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('tough', 'Tough'), ('smart', 'Smart'), ('sexy', 'Sexy'), ('pure', 'Pure'), ('bagel', 'Bagel'), ('cuteness', 'Cuteness'), ('chic', 'Chic')], max_length=64, null=True),
        ),
    ]
