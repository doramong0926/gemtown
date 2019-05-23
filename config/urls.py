from django.conf import settings
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from rest_framework_jwt.views import obtain_jwt_token
from gemtown import views

urlpatterns = [
    # path("", TemplateView.as_view(template_name="pages/home.html"), name="home"),
    # path(
    #     "about/",
    #     TemplateView.as_view(template_name="pages/about.html"),
    #     name="about",
    # ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    path(
        "rest-auth/",
        include("rest_auth.urls"),
    ),
    path(
        "rest-auth/registration/",
        include('rest_auth.registration.urls'),
    ),
    # path(
    #     "api-token-auth/",
    #     obtain_jwt_token,
    # ),
    # User management
    path(
        "users/",
        include("gemtown.users.urls", namespace="users"),
    ),
    path(
        "modelers/",
        include("gemtown.modelers.urls", namespace="modelers"),
    ),
    path(
        "musicians/",
        include("gemtown.musicians.urls", namespace="musicians"),
    ),
    path(
        "songs/",
        include("gemtown.songs.urls", namespace="songs"),
    ),
    path(
        "modelphotos/",
        include("gemtown.modelphotos.urls", namespace="modelphotos"),
    ),
    path(
        "copyrights/",
        include("gemtown.copyrights.urls", namespace="copyrights"),
    ),
    path(
        "gems/",
        include("gemtown.gems.urls", namespace="gems"),
    ),
    path(
        "advertisings/",
        include("gemtown.advertisings.urls", namespace="advertisings"),
    ),
    path("accounts/", include("allauth.urls"))
    # Your stuff: custom urls includes go here
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)
urlpatterns += [
    re_path(r'^.*$', views.ReactAppView.as_view()),
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
