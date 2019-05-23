from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path("all/", view=views.UserList.as_view(), name="all_user"),
    path("<int:user_id>/password/", view=views.ChangePassword.as_view(), name="change password"),
    path("<int:user_id>/follow/", view=views.FollowUser.as_view(), name="follow user"),
    path("<int:user_id>/unfollow/", view=views.UnfollowUser.as_view(), name="unfollow user"),
    path("<int:user_id>/", view=views.UserFeed.as_view(), name="user_detail_infomation"),
    path("login/facebook/", view=views.FacebookLogin.as_view(), name="fb_login"),
]