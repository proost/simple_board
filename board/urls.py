from django.urls import path,include
from board.views import (PostListView,PostView)

urlpatterns = [
    path('',PostListView.as_view()),
    path('posts/',PostListView.as_view()),
    path('posts/<int:pk>',PostView.as_view()),
    path('post/', PostView.as_view())
]
