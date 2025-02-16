from django.urls import path
from .views import NodeListCreateAPIView, ElementListCreateAPIView, SaveProjectAPIView, ClearDatabaseAPIView, MemberLengthAPIView

urlpatterns = [
    path('nodes/', NodeListCreateAPIView.as_view(), name='nodes-list'),
    path('nodes/<int:pk>/', NodeListCreateAPIView.as_view(), name='nodes-detail'),
    path('elements/', ElementListCreateAPIView.as_view(), name='elements-list'),
    path('elements/<int:pk>/', ElementListCreateAPIView.as_view(), name='elements-detail'),
    path('save_project/', SaveProjectAPIView.as_view(), name='save_project'),  # ✅ Save Project
    path('clear_database/', ClearDatabaseAPIView.as_view(), name='clear_database'),  # ✅ Clear Data
    path('member_lengths/', MemberLengthAPIView.as_view(), name='member_lengths'),  # 🔥 Member Lengths
]
