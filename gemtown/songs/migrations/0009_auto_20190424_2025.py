# Generated by Django 2.0.13 on 2019-04-24 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0008_auto_20190424_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='career',
            field=models.CharField(choices=[('_5yr', '5yr'), ('_2yr', '2yr'), ('over_10year', 'Over 10 year'), ('_3yr', '3yr'), ('_6yr_10yr', '6yr ~ 10yr'), ('_4yr', '4yr'), ('under_1year', 'Under 1 year')], max_length=20),
        ),
        migrations.AlterField(
            model_name='song',
            name='confirm_status',
            field=models.CharField(choices=[('approving', 'APPROVING'), ('pendding', 'PENDDING'), ('rejected', 'REJECTED'), ('completed', 'COMPLETED'), ('approved', 'APPROVED'), ('ready', 'READY')], default='ready', max_length=256),
        ),
        migrations.AlterField(
            model_name='song',
            name='genre',
            field=models.CharField(choices=[('trot', 'Trot'), ('dance', 'Dance'), ('rnb_soul', 'R&B/Soul'), ('folk_blues', 'Folk/Blues'), ('rock_band', 'Rock/Band'), ('jazz', 'Jazz'), ('rap_hip_hop', 'Rap/Hip-hop'), ('ballad', 'Ballad')], max_length=254),
        ),
        migrations.AlterField(
            model_name='song',
            name='genre_detail',
            field=models.CharField(choices=[('edm', 'EDM'), ('thecno', 'THECNO'), ('rave', 'RAVE'), ('ost', 'OST'), ('carol', 'CAROL'), ('ccm', 'CCM'), ('club', 'CLUB'), ('cm', 'CM'), ('trance', 'TRANCE')], max_length=254),
        ),
    ]
