from django.contrib import admin
from . import models

@admin.register(models.Musician)
class MusicianAdmin(admin.ModelAdmin):
    fields = [
        'nickname',
        'description',
        'career',
        'creator',
    ]

    list_display = [ 
        'id', 
        'nickname',
        'career',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator', 
        'nickname',
    ]

    search_fields = [
        'nickname',
    ]

