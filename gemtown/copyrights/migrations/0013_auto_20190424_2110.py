# Generated by Django 2.0.13 on 2019-04-24 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copyrights', '0012_auto_20190424_2110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelphotocopyright',
            name='confirm_status',
            field=models.CharField(choices=[('pendding', 'PENDDING'), ('ready', 'READY'), ('completed', 'COMPLETED'), ('rejected', 'REJECTED')], default='ready', max_length=254),
        ),
        migrations.AlterField(
            model_name='musiccopyright',
            name='confirm_status',
            field=models.CharField(choices=[('pendding', 'PENDDING'), ('ready', 'READY'), ('completed', 'COMPLETED'), ('rejected', 'REJECTED')], default='ready', max_length=254),
        ),
    ]
