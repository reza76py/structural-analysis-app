from django.urls import path
from .views import NodeListCreateAPIView, ElementListCreateAPIView

urlpatterns = [
    path('nodes/', NodeListCreateAPIView.as_view(), name='nodes-list'),
    path('elements/', ElementListCreateAPIView.as_view(), name='elements-list'),
]
