from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from . import models

from gemtown.users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    fieldsets = auth_admin.UserAdmin.fieldsets +  (("User", 
        {
            "fields": (
                'profile_photo',
                "user_class",                
                "gender",
                "country", 
                "mobile_number", 
                "mobile_country",
                "followers",
                "followings",
            )
        }
    ),)

    list_display = [
        "id",
        "username", 
        "gem_amount",
        "musician",
        "email",
        "user_class",
        "is_superuser", 
        "is_staff", 
        "gender",
        "country", 
        "mobile_number", 
    ]
    
    search_fields = [
        "username", 
        "email",
        "user_class",
        "is_superuser", 
        "is_staff", 
        "gender",
        "country",        
        "mobile_number", 
    ]


