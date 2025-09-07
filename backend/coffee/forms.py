from django import forms
from .models import Brew

class MarkerForm(forms.ModelForm):
    class Meta:
        model = Brew
        fields = ['bean_name', 'method', 'coffee_grams', 'water_grams', 'rating', 'tasting_notes']