from django.urls import path
from . import views

app_name = "advertisings"
urlpatterns = [
    path("all/", view=views.ListAllAdvertisings.as_view(), name="all_list_of_advertisings"),
]
