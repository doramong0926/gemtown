from django.urls import path
from . import views

app_name = "songs"
urlpatterns = [        
    path("all/", view=views.ListAllSongs.as_view(), name="all_songs"),
    path("verify/", view=views.VerifySong.as_view(), name="verify_song"),       
    path("<int:user_id>/cover_images/", view=views.CoverImage.as_view(), name="all list of cover_image"),    
    path("<str:num_of_song>/new/", view=views.ListNewSongs.as_view(), name="new_registed_songs"),
    path("<str:num_of_song>/popular/", view=views.ListPopularSongs.as_view(), name="popular_songs"),
    path("<int:user_id>/mypost/", view=views.ListMyPostSongs.as_view(), name="mypost_songs"),
    path("<str:song_id>/play/", view=views.Play.as_view(), name="increase_play_count"),
    path("<str:song_id>/comment/", view=views.Comment.as_view(), name="comment"),    
    path("<str:comment_id>/uncomment/", view=views.Uncomment.as_view(), name="uncomment"),    
    path("<str:song_id>/like/", view=views.Like.as_view(), name="like"),
    path("<str:song_id>/unlike/", view=views.Unlike.as_view(), name="unlike"),
    path("<str:song_id>/download/", view=views.Download.as_view(), name="download_song"),    
    path("<str:user_id>/register/", view=views.Register.as_view(), name="create_song"),    
    path("<str:song_id>/unregister/", view=views.Unregister.as_view(), name="delete_song"),    
    path("<str:song_id>/", view=views.Song.as_view(), name="song_detail"),     
]
