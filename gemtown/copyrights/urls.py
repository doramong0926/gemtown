from django.urls import path
from . import views

app_name = "copyrights"
urlpatterns = [        
    path("music/", view=views.ListAllMusicCopyrights.as_view(), name="all_music_copyrights"),    
    path("music/<int:user_id>/all/", view=views.ListUserMusicCopyrights.as_view(), name="user_music_copyrights"),    
    path("music/<int:music_id>/", view=views.MusicCopyright.as_view(), name="music_copyright"),
    path("modelphoto/", view=views.ListAllModelPhotoCopyrights.as_view(), name="all_model_photo_copyrights"),    
    path("modelphoto/<int:user_id>/all/", view=views.ListUserModelPhotoCopyrights.as_view(), name="user_model_photo_copyrights"),    
    path("modelphoto/<int:modelphoto_id>/", view=views.ModelPhotoCopyright.as_view(), name="model_photo_copyright"),
]