from django import forms
from django.contrib.auth import forms as auth_forms


class DesignerForm(forms.ModelForm):
	class Meta:
		fields = '__all__'

	region = forms.CharField(max_length=5, min_length=5)


class ClientForm(forms.ModelForm):
	class Meta:
		fields = '__all__'


class BadFbAuthForm(auth_forms.AuthenticationForm):
	
	def clean(self):
		del self.errors['username']
		del self.errors['password']

		raise forms.ValidationError(
                    'Please click the link to <a href="http://www.landspace.site/survey">complete the survey</a> before logging in.',
                    params={'username': self.username_field.verbose_name}
                )