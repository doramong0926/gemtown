from django.urls import path
from . import views

app_name = "modelers"
urlpatterns = [
    path("all/", view=views.ListAllModelers.as_view(), name="all_modelers"),
    path("<str:num_of_modeler>/new/", view=views.ListNewModelers.as_view(), name="new_modelers"),
    path("<str:num_of_modeler>/popular/", view=views.ListPopularModelers.as_view(), name="popular_modelers"),    
    path("<int:modeler_id>/comment/", view=views.ModelerComment.as_view(), name="add_modeler_comment"),
    path("<int:comment_id>/uncomment/", view=views.ModelerUnComment.as_view(), name="remove_modeler_comment"),    
    path("<int:modeler_id>/like/", view=views.ModelerLike.as_view(), name="modeler_like"),
    path("<int:modeler_id>/unlike/", view=views.ModelerUnlike.as_view(), name="modeler_unlike"),    
    path("<int:user_id>/profile/", view=views.AddModelerProfile.as_view(), name="add_modeler_profile"),    
    path("<int:user_id>/register/", view=views.ModelerRegister.as_view(), name="create_modeler"),    
    path("<int:modeler_id>/unregister/", view=views.ModelerUnregister.as_view(), name="delete_modeler"),    
    path("<int:modeler_id>/", view=views.Modeler.as_view(), name="modeler_detail"),    
]