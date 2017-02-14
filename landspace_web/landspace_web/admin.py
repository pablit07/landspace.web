from django.contrib import admin
from . import models
from django.contrib.auth.models import Group, User
from social_django import models as social_django_models
from django import forms as django_forms
from django.utils.crypto import get_random_string 
from utils import get_registration_url
from . import forms


class DesignerAdmin(admin.ModelAdmin):

	list_display = ('full_name', 'is_available',)
	readonly_fields = ('user', 'registration_url')

	form = forms.DesignerAdminForm


	def registration_url(self, obj):
		url = get_registration_url(obj.user)
		return '<a href="{url}">Right Click To Copy</a>'.format(url=url)

	registration_url.allow_tags = True

	def get_fieldsets(self, request, obj=None):

		if not obj or not obj.id:
			fieldsets = ((None, {u'fields': ['email', 'region']}),)
		else:
			fieldsets = ((None, {'fields': ('user', 'region', 'is_available')}),)

		if obj and obj.user and not obj.user.first_name:
			fieldsets = fieldsets + ((None, {
				'fields': (('registration_url'),)
			}),)

		return fieldsets

	def get_form(self, request, obj, *args, **kwargs):
		if not obj or not obj.id:
			self.form.declared_fields['email'] = django_forms.CharField(initial='')

		return super(DesignerAdmin, self).get_form(request, obj, *args, **kwargs)

	def save_model(self, request, obj, form, change):

		if change:
			super(DesignerAdmin, self).save_model(request, obj, form, change)
		else:
			email = form.cleaned_data.get('email')
			user = User.objects.create_user(username=email, email=email, password=get_random_string())
			
			user.save()
			obj.user_id = user.id
			obj.save()


class ClientAdmin(admin.ModelAdmin):

	list_display = ('full_name',)

	
	class Meta:
		form = forms.ClientAdminForm


admin.site.register(models.Designer, DesignerAdmin)
admin.site.register(models.Client, ClientAdmin)
