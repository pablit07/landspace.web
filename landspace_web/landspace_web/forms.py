from django import forms
from django.contrib.auth import forms as auth_forms
from . import models


class DesignerAdminForm(forms.ModelForm):

	region = forms.CharField(max_length=5, min_length=5)
	email = forms.CharField()

	class Meta:
		fields = '__all__'
		model = models.Designer


class ClientAdminForm(forms.ModelForm):

	class Meta:
		fields = '__all__'
		model = models.Client


class BadFbAuthForm(auth_forms.AuthenticationForm):
	
	def clean(self):
		del self.errors['username']
		del self.errors['password']

		raise forms.ValidationError(
                    'Please click the link to <a href="http://www.landspace.site/survey">complete the survey</a> before logging in.',
                    params={'username': self.username_field.verbose_name}
                )