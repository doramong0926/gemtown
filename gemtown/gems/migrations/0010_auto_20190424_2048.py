# Generated by Django 2.0.13 on 2019-04-24 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gems', '0009_auto_20190424_2025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchasegem',
            name='purchase_type',
            field=models.CharField(blank=True, choices=[('gift_card_culture', 'Gift Card(Culture)'), ('cash', 'Cash'), ('test', 'Test'), ('bank', 'Bank'), ('credit', 'Credit')], max_length=256, null=True),
        ),
    ]
