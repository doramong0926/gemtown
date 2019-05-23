from django.contrib import admin
from . import models


@admin.register(models.MusicCopyright)
class MusicCopyrightAdmin(admin.ModelAdmin):
    fields = [        
        'song',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',        
        'creator',
    ]

    list_display = [ 
        'id', 
        'song',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',        
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'song',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',        
        'creator',
    ]

    search_fields = [
        'song',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',    
    ]


@admin.register(models.ModelPhotoCopyright)
class ModelPhotoCopyrightAdmin(admin.ModelAdmin):
    fields = [        
        'modelphoto',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',        
        'creator',
    ]

    list_display = [ 
        'id', 
        'modelphoto',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',        
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'modelphoto',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',        
        'creator',
    ]

    search_fields = [
        'modelphoto',
        'block_chain_id',
        'block_chain_txid',
        'confirm_status',    
    ]


@admin.register(models.CopyrightId)
class CopyrightIdAdmin(admin.ModelAdmin):
    fields = [        
        'copyright_id',
    ]

    list_display = [ 
        'id', 
        'copyright_id',
    ]