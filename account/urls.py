from django.urls import path
from .views import login, getFile

urlpatterns = [
    path("login", login, name="login"),
    path("authentication", getFile, name="getFile"),
]
