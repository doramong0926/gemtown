from django.urls import path
from . import views

app_name = "modelphotos"
urlpatterns = [    
    path("verify/", view=views.VerifyModelPhoto.as_view(), name="verify_model_photo"),       
    path("<int:modeler_id>/all/", view=views.ListAllModelPhotos.as_view(), name="all_modelphotos"),
    path("<int:user_id>/mypost/", view=views.ListMyPostModelPhotos.as_view(), name="mypost_modelphoto"),
    path("<int:modeler_id>/register/", view=views.Register.as_view(), name="create_modelphoto"),    
    path("<int:modelphoto_id>/unregister/", view=views.Unregister.as_view(), name="delete_modelphoto"),    
    path("<int:modelphoto_id>/", view=views.ModelPhoto.as_view(), name="modelphoto_detail"),
]