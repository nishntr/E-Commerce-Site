from .views import RegisterUser, LoginUser, UserAPI
from django.urls import path
from django.urls.conf import include
from knox import views as knox_views

app_name = 'accounts'
urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/register', RegisterUser.as_view()),
    path('auth/login', LoginUser.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
