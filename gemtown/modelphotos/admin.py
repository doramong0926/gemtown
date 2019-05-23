from django.contrib import admin
from . import models


@admin.register(models.ModelPhoto)
class ModelPhotoAdmin(admin.ModelAdmin):
    fields = [        
        'file',
        'photo_type',
        'confirm_status',
        'modeler',
        'contents_hash',
        'blockchain_id',
        'blockchain_txid',
        'creator',
    ]

    list_display = [ 
        'id', 
        'file',
        'photo_type',
        'confirm_status',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'file',
        'photo_type',
        'confirm_status',
        'creator',
    ]

    search_fields = [
        'file',
        'photo_type',
        'confirm_status',
        'contents_hash',
        'blockchain_id',
        'blockchain_txid',
    ]

