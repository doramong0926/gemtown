from django.contrib import admin
from . import models

@admin.register(models.Modeler)
class ModelerAdmin(admin.ModelAdmin):
    fields = [
        'nickname',
        'description',
        'gender',
        'age_range',
        'career',
        'job',
        'entertainment',
        'style',
        'height',
        'weight',
        'blood_type',
        'age',
        'bust',
        'wiast',
        'hip',
        'birth_year',
        'birth_month',
        'birth_day',
        'confirm_status',
        'latest_ranking',
        'creator',
    ]

    list_display = [ 
        'id', 
        'nickname',
        'like_count',
        'comment_count',
        'description',
        'gender',
        'age_range',
        'career',
        'job',
        'entertainment',
        'style',
        'height',
        'weight',
        'blood_type',
        'age',
        'bust',
        'wiast',
        'hip',
        'birth_year',
        'birth_month',
        'birth_day',
        'confirm_status',
        'latest_ranking',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator', 
        'confirm_status',
        'nickname',
    ]

    search_fields = [
        'confirm_status',
        'nickname',
    ]

@admin.register(models.CommentOfModeler)
class CommentOfModelerAdmin(admin.ModelAdmin):
    fields = [
        'modeler',
        'comment',        
        'creator',
    ]

    list_display = [
        'id',        
        'modeler',
        'comment',        
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator', 
        'modeler',       
    ]

    search_fields = [
        'modeler',
    ]

@admin.register(models.LikeOfModeler)
class LikeOfModelerAdmin(admin.ModelAdmin):
    fields = [
        'modeler',
        'creator',
    ]

    list_display = [
        'id',     
        'modeler',
        'creator',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'creator',    
        'modeler',    
    ]

    search_fields = [
        'modeler',
    ]
