# Generated by Django 2.0.13 on 2019-04-24 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copyrights', '0008_auto_20190424_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelphotocopyright',
            name='confirm_status',
            field=models.CharField(choices=[('ready', 'READY'), ('rejected', 'REJECTED'), ('pendding', 'PENDDING'), ('completed', 'COMPLETED')], default='ready', max_length=254),
        ),
        migrations.AlterField(
            model_name='musiccopyright',
            name='confirm_status',
            field=models.CharField(choices=[('ready', 'READY'), ('rejected', 'REJECTED'), ('pendding', 'PENDDING'), ('completed', 'COMPLETED')], default='ready', max_length=254),
        ),
    ]
