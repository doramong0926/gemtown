from django.contrib import admin
from . import models


@admin.register(models.Advertising)
class AdvertisingAdmin(admin.ModelAdmin):
    fields = [
        'image',
        'link',
        'advertising_type',
        'priority',
        'activate',
        'creator',
    ]

    list_display = [
        'id',
        'image',
        'link',
        'advertising_type',
        'priority',
        'activate',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'image',
        'link',
        'advertising_type',
        'priority',
        'activate',
        'creator',
        'creator',
    ]

    search_fields = [
        'image',
        'link',
        'advertising_type',
        'priority',
        'activate',
        'creator',
    ]

