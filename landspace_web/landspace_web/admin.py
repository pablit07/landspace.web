from django.contrib import admin
from . import models
from django.contrib.auth.models import Group
from social_django import models as social_django_models
import forms


class DesignerAdmin(admin.ModelAdmin):

	list_display = ('full_name', 'is_available')


	class Meta:
		form = forms.DesignerForm


class ClientAdmin(admin.ModelAdmin):

	list_display = ('full_name',)

	
	class Meta:
		form = forms.ClientForm


admin.site.register(models.Designer, DesignerAdmin)
admin.site.register(models.Client, ClientAdmin)
