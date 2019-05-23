from django.contrib import admin
from . import models

@admin.register(models.Song)
class SongAdmin(admin.ModelAdmin):
    fields = [        
        'file',
        'contents_hash',
        'blockchain_id',
        'blockchain_txid',
        'confirm_status',
        "album_title",
        'title',
        'cover_image_custom',
        'cover_image',
        'musician',
        'career',
        'genre',
        'genre_detail',
        'latest_ranking',        
        'composer',
        'lyricist',
        'vocal',
        'duration',        
        'description',
        'price_to_playing',
        'price_to_download',        
        'creator',
    ]

    list_display = [ 
        'id', 
        'file',
        'musician',
        'confirm_status',
        'like_count',
        'comment_count',
        'play_count',
        'download_count',
        'career',
        'genre',
        'genre_detail',
        "album_title",
        'title',
        'composer',
        'lyricist',
        'vocal',
        'duration',  
        'description',
        'price_to_playing',
        'price_to_download',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator', 
        'musician',
        'confirm_status',
        'duration',  
        'composer',
        'vocal',     
        'lyricist',
        "album_title",
        'title',
        'career',
        'genre',
        'genre_detail',  
    ]

    search_fields = [
        'confirm_status',
        'contents_hash',
        'blockchain_id',
        'blockchain_txid',
        'composer',
        'vocal',     
        'lyricist',
        "album_title",
        'title',
        'career',
        'genre',
        'genre_detail',  
    ]

@admin.register(models.CommentOfSong)
class CommentOfSongAdmin(admin.ModelAdmin):
    fields = [
        'song',
        'comment',        
        'creator',
    ]

    list_display = [
        'id',        
        'song',
        'comment',        
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator', 
        'song',       
    ]

    search_fields = [
        'song',
    ]

@admin.register(models.LikeOfSong)
class LikeOfSongAdmin(admin.ModelAdmin):
    fields = [
        'song',
        'creator',
    ]

    list_display = [
        'id',     
        'song',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator',    
        'song',    
    ]

    search_fields = [
        'song',
    ]


@admin.register(models.PlayOfSong)
class PlayOfSongAdmin(admin.ModelAdmin):
    fields = [
        'song',
        'creator',
    ]

    list_display = [
        'id',     
        'song',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator',    
        'song',    
    ]

    search_fields = [
        'song',
    ]


@admin.register(models.DownloadOfSong)
class DownloadOfSongAdmin(admin.ModelAdmin):
    fields = [
        'song',
        'creator',
    ]

    list_display = [
        'id',     
        'song',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator',    
        'song',    
    ]

    search_fields = [
        'song',
    ]

@admin.register(models.CoverImage)
class CoverImageAdmin(admin.ModelAdmin):
    fields = [
        'file',
        'title',
        'price',
        'buyer',
    ]

    list_display = [
        'id',     
        'file',
        'title',
        'price',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'title',
    ]

    search_fields = [
        'title',
    ]