from django.contrib.auth.models import User
from django import forms
from django.contrib.auth import forms as auth_forms
from . import models
import re


class DesignerAdminForm(forms.ModelForm):

	region = forms.CharField(max_length=5, min_length=5, required=True)
	email = forms.CharField(required=False)

	class Meta:
		fields = '__all__'
		model = models.Designer

	def clean(self):
		email=self.cleaned_data.get('email', None)

		cleaned_data = super(DesignerAdminForm, self).clean()
		region=cleaned_data.get('region')

		if email and User.objects.filter(username=email).exists():
			raise forms.ValidationError('Email address already in use.')

		if not re.match(r'[0-9]{5}', region):
			raise forms.ValidationError('Invalid Region; should be zip code.')


class ClientAdminForm(forms.ModelForm):

	email = forms.CharField(required=False)

	class Meta:
		fields = '__all__'
		model = models.Client
		help_texts = {
			'registration_url': 'Leave blank to generate'
		}

	def clean(self):
		email=self.cleaned_data.get('email', None)

		cleaned_data = super(ClientAdminForm, self).clean()

		if email and User.objects.filter(username=email).exists():
			raise forms.ValidationError('Email address already in use.')


class BadFbAuthForm(auth_forms.AuthenticationForm):
	
	def clean(self):
		del self.errors['username']
		del self.errors['password']

		raise forms.ValidationError(
                    'Please click the link to <a href="http://www.landspace.site/survey">complete the survey</a> before logging in.',
                    params={'username': self.username_field.verbose_name}
                )