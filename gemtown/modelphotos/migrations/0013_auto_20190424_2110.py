# Generated by Django 2.0.13 on 2019-04-24 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelphotos', '0012_auto_20190424_2110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelphoto',
            name='confirm_status',
            field=models.CharField(choices=[('approving', 'APPROVING'), ('ready', 'READY'), ('rejected', 'REJECTED'), ('completed', 'COMPLETED'), ('pendding', 'PENDDING'), ('approved', 'APPROVED')], default='ready', max_length=20),
        ),
        migrations.AlterField(
            model_name='modelphoto',
            name='photo_type',
            field=models.CharField(blank=True, choices=[('cover', 'COVER'), ('full', 'FULL'), ('etc', 'ETC'), ('half', 'HALF')], max_length=256),
        ),
    ]
