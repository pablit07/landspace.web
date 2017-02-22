from django import forms
from . import models, widgets


class ProjectProfileForm(forms.ModelForm):
	
	class Meta:
		model = models.Project
		fields = ["name","project_type","lot_size","slope_amount","work_type","primary_users","has_edible_garden","has_pets","approximate_budget","requires_contractor","is_in_phases",'accessibility_concerns','start','preferred_designer','is_for_sports','outdoor_cooking_level','has_existing_plan','has_allergies',"project_description_text","address_1","address_2","city","state_province","zip_code","country",]
		widgets = {
			'project_type': forms.CheckboxSelectMultiple(),
			'slope_amount': forms.RadioSelect(),
			'work_type': forms.CheckboxSelectMultiple(),
			'primary_users': forms.CheckboxSelectMultiple(),
			'has_edible_garden': forms.RadioSelect(),
			'has_pets': forms.CheckboxSelectMultiple(),
			'approximate_budget': forms.RadioSelect(),
			'requires_contractor': forms.RadioSelect(),
			'is_in_phases': forms.RadioSelect(),
			'accessibility_concerns': forms.RadioSelect(),
			'start': forms.RadioSelect(),
			'is_for_sports': forms.RadioSelect(),
			'outdoor_cooking_level': forms.CheckboxSelectMultiple(),
			'has_existing_plan': forms.RadioSelect(),
			'has_allergies': forms.RadioSelect()
		}

		labels = {
			"name": "Project Name",
			"project_type": "Which of the following best describes your project?",
			"lot_size": "What is the size of your lot? (Optional)",
			"slope_amount": "How much slope does your space have?",
			"work_type": "What type of work do you anticipate being done?",
			"primary_users": "Who will be the primary users of this space?",
			"has_edible_garden": "Will you have an edible garden? If so what do you envision growing?",
			"has_pets": "Do you have any pets?",
			"approximate_budget": "What is your approximate budget for your project including construction?",
			"requires_contractor": "Would you like one of our landspace designers help connect you to a contractor in your area?",
			"is_in_phases": "Will you be doing this project in phases?",
			"project_description_text": "Short Project Description (Optional)",
			"state_province": "State/Province",
			"accessibility_concerns": "Are there any accessibility concerns?",
			"start": "When do you want to get started construction on the project?",
			"preferred_designer": "Do you have a preferred designer?",
			"is_for_sports": "Will you be using your designed space for any particular outdoor sports needing a court?",
			"outdoor_cooking_level": "What level of outdoor cooking do you plan on doing?",
			"has_existing_plan": "Do you have an existing design or Landspace plan for this space?",
			"has_allergies": "Do you have any plant allergies or sensitivities?"
		}

		help_texts = {
			'project_type': '(check all that apply)',
			'preferred_designer': 'Based on demand, please be aware your preferred designer might not be available.',
			'requires_contractor': '**Additional $50 Cost'
		}

		