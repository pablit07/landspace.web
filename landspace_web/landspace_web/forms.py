from django import forms


class DesignerForm(forms.ModelForm):
	class Meta:
		fields = '__all__'

	region = forms.CharField(max_length=5, min_length=5)