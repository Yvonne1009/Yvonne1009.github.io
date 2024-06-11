from django.urls import path
from . import views
urlpatterns = [
    path('stream_page/',views.stream_page,name = 'stream_page'),
    path('video_feed/', views.video_feed,name='video_feed'),
]