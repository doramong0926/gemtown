from django.contrib import admin
from . import models

@admin.register(models.PurchaseGem)
class PurchaseGemAdmin(admin.ModelAdmin):
    fields = [        
        'creator',
        'amount',      
        'purchase_type',
    ]

    list_display = [ 
        'id', 
        'amount',      
        'purchase_type',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator',
        'purchase_type',
    ]

    search_fields = [
        'creator',
        'purchase_type',
    ]

@admin.register(models.ConsumptionGem)
class ConsumptionGemAdmin(admin.ModelAdmin):
    fields = [        
        'creator',
        'amount',      
        'consumption_type',
    ]

    list_display = [ 
        'id', 
        'amount',      
        'consumption_type',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator',
        'consumption_type',
    ]

    search_fields = [
        'creator',
        'consumption_type',
    ]


@admin.register(models.BonusGem)
class BonusGemAdmin(admin.ModelAdmin):
    fields = [        
        'creator',
        'amount',      
        'bonus_type',
    ]

    list_display = [ 
        'id', 
        'amount',  
        'bonus_type',    
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator',
        'bonus_type',
    ]

    search_fields = [
        'creator',
        'bonus_type',
    ]


