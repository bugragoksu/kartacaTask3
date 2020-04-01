from django.contrib import admin
from .models import TravelPost, TravelUser
# Register your models here.


class TravelUserAdmin(admin.ModelAdmin):
    list_display = ['username']
    list_display_links = ['username']

class TravelPostAdmin(admin.ModelAdmin):
    list_display = ['title','user']
    list_display_links = ['title']

admin.site.register(TravelPost,TravelPostAdmin)
admin.site.register(TravelUser,TravelUserAdmin)
