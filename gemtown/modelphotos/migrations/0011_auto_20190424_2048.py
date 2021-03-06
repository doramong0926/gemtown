# Generated by Django 2.0.13 on 2019-04-24 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelphotos', '0010_auto_20190424_2048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelphoto',
            name='confirm_status',
            field=models.CharField(choices=[('ready', 'READY'), ('rejected', 'REJECTED'), ('pendding', 'PENDDING'), ('completed', 'COMPLETED'), ('approved', 'APPROVED'), ('approving', 'APPROVING')], default='ready', max_length=20),
        ),
        migrations.AlterField(
            model_name='modelphoto',
            name='photo_type',
            field=models.CharField(blank=True, choices=[('cover', 'COVER'), ('etc', 'ETC'), ('half', 'HALF'), ('full', 'FULL')], max_length=256),
        ),
    ]
