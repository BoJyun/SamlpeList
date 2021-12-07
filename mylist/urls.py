from django.urls import path, include
from django.urls.conf import re_path
from mylist import views
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),  # 配合授權
    path('api/fetchUploadFile', views.getFile),
    path('api/fetchGetList', views.getdata),
    path('api/fetchComplete/<int:id>', views.complete),
    path('api/fetchQuit/<int:id>', views.quit),
    path('api/fetchUpdataData/<int:id>', views.update),
    path('api/fetchDownloadFile', views.downloadFile),
    path('api/fetchCompletedList', views.getCompletedList),
    path('api/fetchDownloadExcel', views.outout_excel),
]
