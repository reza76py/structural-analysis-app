from django.urls import path
from .views import NodeListCreateAPIView, ElementListCreateAPIView, SaveProjectAPIView, ClearDatabaseAPIView, MemberLengthAPIView, SupportAPIView, NodeDetailView

urlpatterns = [
    path('nodes/', NodeListCreateAPIView.as_view(), name='nodes-list'),  # ✅ Handles GET and POST
    path('nodes/<int:pk>/', NodeDetailView.as_view(), name='node-detail'),  # ✅ Handles DELETE
    path('elements/', ElementListCreateAPIView.as_view(), name='elements-list'),
    path('elements/<int:pk>/', ElementListCreateAPIView.as_view(), name='elements-detail'),
    path('save_project/', SaveProjectAPIView.as_view(), name='save_project'),
    path('clear_database/', ClearDatabaseAPIView.as_view(), name='clear_database'),
    path('member_lengths/', MemberLengthAPIView.as_view(), name='member_lengths'),
    path('supports/', SupportAPIView.as_view(), name='supports-list'),
]
