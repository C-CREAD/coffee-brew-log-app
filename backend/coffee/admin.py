from django.contrib import admin
from .models import Brew


class BrewAdmin(admin.ModelAdmin):
    list_display = ('bean_name', 'method', 'coffee_grams', 'water_grams', 'rating', 'tasting_notes', )
    list_filter = ('method', 'rating',)
    search_fields = ('bean_name', 'tasting_notes', )

admin.site.register(Brew, BrewAdmin)