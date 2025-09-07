from django.db import models

class Brew(models.Model):
    """
        Brew class for representing brewing objects. Contains the following attributes:
            - Bean Name: Name of the coffee bean
            - Method: Method of brewing coffee
            - Coffee Grams: Measured number of coffee grams used
            - Water Grams: Measured number of water grams used
            - Rating: Number used to rate the quality of the brew.
            - Tasting Notes: Additional info to describe the brew.

        All fields cannot be null and most fields provide default values
        incase non are provided.
    """

    bean_name = models.CharField(max_length=100, null=False)
    method = models.CharField(choices=[
        ('aeropress', 'Aeropress'),
        ('drip_coffee', 'Drip Coffee'),
        ('v60', 'V60'),
    ], default="aeropress")
    coffee_grams = models.FloatField(default=1.0)
    water_grams = models.FloatField(default=1.0)
    rating = models.IntegerField(choices=[
        (0, '0'),
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ], default=0)
    tasting_notes = models.TextField(null=False)

    def __str__(self):
        return f"{self.bean_name} | {self.method} | {self.rating} / 5"

