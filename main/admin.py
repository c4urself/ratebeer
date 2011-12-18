from django.contrib import admin
from ratebeer.main.models import Beer, Rating


admin.site.register(Beer)
admin.site.register(Rating)