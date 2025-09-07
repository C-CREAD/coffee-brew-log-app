from django.urls import path, include
from .views import BrewListCreateView, BrewDetailView

urlpatterns = [
    path('', BrewListCreateView.as_view(), name='brew-list'),
    path("<int:pk>/", BrewDetailView.as_view(), name="brew-detail"),
]