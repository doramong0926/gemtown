# Generated by Django 2.0.13 on 2019-04-23 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0004_auto_20190420_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='career',
            field=models.CharField(choices=[('_2yr', '2yr'), ('under_1year', 'Under 1 year'), ('over_10year', 'Over 10 year'), ('_5yr', '5yr'), ('_3yr', '3yr'), ('_4yr', '4yr'), ('_6yr_10yr', '6yr ~ 10yr')], max_length=20),
        ),
        migrations.AlterField(
            model_name='song',
            name='confirm_status',
            field=models.CharField(choices=[('approving', 'APPROVING'), ('ready', 'READY'), ('pendding', 'PENDDING'), ('rejected', 'REJECTED'), ('approved', 'APPROVED'), ('completed', 'COMPLETED')], default='ready', max_length=256),
        ),
        migrations.AlterField(
            model_name='song',
            name='genre',
            field=models.CharField(choices=[('rock_band', 'Rock/Band'), ('folk_blues', 'Folk/Blues'), ('trot', 'Trot'), ('ballad', 'Ballad'), ('jazz', 'Jazz'), ('rap_hip_hop', 'Rap/Hip-hop'), ('dance', 'Dance'), ('rnb_soul', 'R&B/Soul')], max_length=254),
        ),
        migrations.AlterField(
            model_name='song',
            name='genre_detail',
            field=models.CharField(choices=[('cm', 'CM'), ('edm', 'EDM'), ('trance', 'TRANCE'), ('rave', 'RAVE'), ('ccm', 'CCM'), ('club', 'CLUB'), ('thecno', 'THECNO'), ('carol', 'CAROL'), ('ost', 'OST')], max_length=254),
        ),
    ]
