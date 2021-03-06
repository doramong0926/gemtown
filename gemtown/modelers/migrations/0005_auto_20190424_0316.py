# Generated by Django 2.0.13 on 2019-04-23 18:16

from django.db import migrations, models
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('modelers', '0004_auto_20190420_1737'),
    ]

    operations = [
        migrations.AddField(
            model_name='modeler',
            name='body_size_bust',
            field=models.CharField(blank=True, default='0', max_length=128),
        ),
        migrations.AddField(
            model_name='modeler',
            name='body_size_hip',
            field=models.CharField(blank=True, default='0', max_length=128),
        ),
        migrations.AddField(
            model_name='modeler',
            name='body_size_wiast',
            field=models.CharField(blank=True, default='0', max_length=128),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='age',
            field=models.CharField(blank=True, choices=[('40s', '40s'), ('30s', '30s'), ('50s', '50s'), ('20s', '20s'), ('60s', '60s'), ('child', 'Child'), ('10s', '10s')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='body_size',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='career',
            field=models.CharField(blank=True, choices=[('under_1year', 'Under 1 year'), ('3yr', '3yr'), ('2yr', '2yr'), ('4yr', '4yr'), ('over_6yr', 'Over 6 year'), ('5yr', '5yr')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='confirm_status',
            field=models.CharField(choices=[('approving', 'APPROVING'), ('ready', 'READY'), ('pendding', 'PENDDING'), ('rejected', 'REJECTED'), ('approved', 'APPROVED'), ('completed', 'COMPLETED')], default='ready', max_length=10),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='entertainment',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('pictorial', 'Pictorial'), ('magazine', 'Magazine'), ('cf', 'CF'), ('exhibition', 'Exhibition'), ('narrator_dance', 'Narrator(Dance)'), ('broadcast', 'Broadcast'), ('narrator_announcement', 'Narrator(Announcement)'), ('event', 'Event'), ('racing', 'Racing')], max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='gender',
            field=models.CharField(blank=True, choices=[('female', 'Female'), ('male', 'Male'), ('not_specified', 'Not specified'), ('foregin_male', 'Foregin_Male'), ('foregin_female', 'Foregin_Female')], max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='job',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('enterprise', 'Enterprise'), ('hair', 'Hair'), ('sport', 'Sport'), ('drink', 'Drink'), ('wedding', 'wedding'), ('swimsuit', 'Swimsuit'), ('education', 'Education'), ('fashion', 'Fashion'), ('beauty', 'Beauty'), ('underwear', 'Underwear'), ('finance', 'Finance')], max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='nickname',
            field=models.TextField(max_length=256),
        ),
        migrations.AlterField(
            model_name='modeler',
            name='style',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('smart', 'Smart'), ('bagel', 'Bagel'), ('sexy', 'Sexy'), ('cuteness', 'Cuteness'), ('pure', 'Pure'), ('tough', 'Tough'), ('chic', 'Chic')], max_length=64, null=True),
        ),
    ]
