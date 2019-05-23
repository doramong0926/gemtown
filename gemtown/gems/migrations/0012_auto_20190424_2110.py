# Generated by Django 2.0.13 on 2019-04-24 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gems', '0011_auto_20190424_2048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bonusgem',
            name='bonus_type',
            field=models.CharField(blank=True, choices=[('open_event', 'Open Event'), ('promotion', 'Promotion'), ('test', 'Test')], max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='consumptiongem',
            name='consumption_type',
            field=models.CharField(blank=True, choices=[('buy_song_cover', 'Buy Song Cover'), ('register_model_photo', 'Register Model Photo'), ('register_song', 'Register Song')], max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='purchasegem',
            name='purchase_type',
            field=models.CharField(blank=True, choices=[('cash', 'Cash'), ('test', 'Test'), ('bank', 'Bank'), ('credit', 'Credit'), ('gift_card_culture', 'Gift Card(Culture)')], max_length=256, null=True),
        ),
    ]
