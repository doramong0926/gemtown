# Generated by Django 2.0.13 on 2019-04-23 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelphotos', '0005_auto_20190424_0316'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelphoto',
            name='confirm_status',
            field=models.CharField(choices=[('completed', 'COMPLETED'), ('ready', 'READY'), ('rejected', 'REJECTED'), ('pendding', 'PENDDING'), ('approving', 'APPROVING'), ('approved', 'APPROVED')], default='ready', max_length=20),
        ),
    ]
