from django import forms
from django.template.loader import render_to_string


class InkCheckboxSelectMultiple(forms.CheckboxSelectMultiple):
	template_name = 'widgets/checkbox_select.html'

	def get_context(self, name, value, attrs=None):
		context = {}
		context['widget'] = {
		'name': name,
		'is_hidden': self.is_hidden,
		'required': self.is_required,
		'value': value,
		'attrs': self.build_attrs(self.attrs),
		'template_name': self.template_name,
		}
		return context

	def render(self, name=None, value=None, attrs=None):
		context = self.get_context(name, value, attrs=attrs)
		return render_to_string(self.template_name, context)