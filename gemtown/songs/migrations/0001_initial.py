# Generated by Django 2.0.13 on 2019-04-20 06:10

from django.db import migrations, models
import django.db.models.deletion
import gemtown.songs.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommentOfSong',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('comment', models.TextField()),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='CoverImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('file', models.ImageField(blank=True, upload_to=gemtown.songs.models.CoverImage.upload_file_name)),
                ('title', models.TextField(max_length=254)),
                ('price', models.IntegerField(default=10)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='DownloadOfSong',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='LikeOfSong',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='PlayOfSong',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to=gemtown.songs.models.Song.upload_file_name)),
                ('cover_image_custom', models.ImageField(blank=True, upload_to='')),
                ('album_title', models.TextField(blank=True, max_length=254)),
                ('title', models.TextField(max_length=254)),
                ('composer', models.TextField(blank=True, max_length=254)),
                ('lyricist', models.TextField(blank=True, max_length=254)),
                ('vocal', models.TextField(blank=True, max_length=254)),
                ('description', models.TextField(blank=True)),
                ('genre', models.CharField(choices=[('rap_hip_hop', 'Rap/Hip-hop'), ('folk_blues', 'Folk/Blues'), ('rnb_soul', 'R&B/Soul'), ('ballad', 'Ballad'), ('jazz', 'Jazz'), ('trot', 'Trot'), ('rock_band', 'Rock/Band'), ('dance', 'Dance')], max_length=254)),
                ('genre_detail', models.CharField(choices=[('trance', 'TRANCE'), ('edm', 'EDM'), ('club', 'CLUB'), ('thecno', 'THECNO'), ('rave', 'RAVE'), ('carol', 'CAROL'), ('cm', 'CM'), ('ost', 'OST'), ('ccm', 'CCM')], max_length=254)),
                ('career', models.CharField(choices=[('under_1year', 'Under 1 year'), ('_3yr', '3yr'), ('_2yr', '2yr'), ('_5yr', '5yr'), ('_6yr_10yr', '6yr ~ 10yr'), ('over_10year', 'Over 10 year'), ('_4yr', '4yr')], max_length=20)),
                ('duration', models.IntegerField()),
                ('latest_ranking', models.IntegerField(default=0)),
                ('confirm_status', models.CharField(choices=[('approving', 'APPROVING'), ('approved', 'APPROVED'), ('rejected', 'REJECTED'), ('completed', 'COMPLETED'), ('ready', 'READY'), ('pendding', 'PENDDING')], default='ready', max_length=256)),
                ('contents_hash', models.CharField(blank=True, max_length=256)),
                ('blockchain_id', models.CharField(blank=True, max_length=256)),
                ('blockchain_txid', models.CharField(blank=True, max_length=256)),
                ('price_to_playing', models.IntegerField(default=1)),
                ('price_to_download', models.IntegerField(default=100)),
                ('cover_image', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='song_cover_image', to='songs.CoverImage')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
