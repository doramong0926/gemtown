# Generated by Django 2.0.13 on 2019-04-24 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicians', '0008_auto_20190424_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musician',
            name='career',
            field=models.CharField(blank=True, choices=[('_5yr', '5yr'), ('_2yr', '2yr'), ('over_10year', 'Over 10 year'), ('_3yr', '3yr'), ('_6yr_10yr', '6yr ~ 10yr'), ('_4yr', '4yr'), ('under_1year', 'Under 1 year')], max_length=20),
        ),
    ]
