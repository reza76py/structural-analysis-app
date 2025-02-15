from django.urls import path
from .views import NodeListCreateAPIView, ElementListCreateAPIView

urlpatterns = [
    path('nodes/', NodeListCreateAPIView.as_view(), name='nodes-list'),
    path('nodes/<int:pk>/', NodeListCreateAPIView.as_view(), name='nodes-detail'),
    path('elements/', ElementListCreateAPIView.as_view(), name='elements-list'),
    path('elements/<int:pk>/', ElementListCreateAPIView.as_view(), name='elements-detail'),
]
