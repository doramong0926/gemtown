from django.urls import path
from . import views

app_name = "gems"
urlpatterns = [        
    path("purchase/", view=views.ListAllPurchaseGem.as_view(), name="all_purchase_gem"),      
    path("consumption/", view=views.ListAllConsumptionGem.as_view(), name="all_consumption_gem"),    
    path("bonus/", view=views.ListAllBonusGem.as_view(), name="all_bonus_gem"),    
    path("<int:user_id>/purchase/", view=views.PurchaseGem.as_view(), name="user_purchase_gem"),    
    path("<int:user_id>/consumption/", view=views.ConsumptionGem.as_view(), name="user_consumption_gem"),    
    path("<int:user_id>/bonus/", view=views.BonusGem.as_view(), name="user_bonus_gem"),        
]