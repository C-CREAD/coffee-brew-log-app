from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from .models import Brew
from .serializers import BrewSerializer


class BrewListCreateView(generics.ListCreateAPIView):
    """
    Fetches all brew data and enables (C)reating and (R)eading functionality for the API
    """

    queryset = Brew.objects.all()
    serializer_class = BrewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["method"]

    def get_queryset(self):
        queryset = Brew.objects.all()
        method = self.request.query_params.get('method', None)

        if method and method != 'all':
            queryset = queryset.filter(method=method)

        return queryset


class BrewDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Fetches all brew data and enables (R)eading, (U)pdating, and (D)eleting functionality for the API
    """
    queryset = Brew.objects.all()
    serializer_class = BrewSerializer