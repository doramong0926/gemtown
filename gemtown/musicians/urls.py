from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path("all/", view=views.ListAllMusicians.as_view(), name="all_musicians"),
    path("<int:user_id>/register/", view=views.MusicianRegister.as_view(), name="create_musician"),    
    path("<int:musician_id>/unregister/", view=views.MusicianUnregister.as_view(), name="delete_musician"),    
    path("<int:musician_id>/", view=views.Musician.as_view(), name="musician_detail"),  
]