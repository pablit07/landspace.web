# coding=utf-8
from django import forms
from . import models, widgets


class ProjectProfileForm(forms.ModelForm):
	project_type = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(), choices=(('front yard', 'front yard'), ('backyard', 'backyard'), ('small garden area', 'small garden area'), ('deck or patio', 'deck or patio'), ('roofdeck', 'roofdeck'), ('other', 'other')))
	work_type = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(), choices=(('planting', 'planting'),('wood construction', 'wood construction'),('stonework or masonry', 'stonework or masonry'),\
													('walls', 'walls'),('art installation', 'art installation'),('small improvements (pots, firepit, etc)', 'small improvements (pots, firepit, etc)'),\
													('patio', 'patio'),('pool or hot tub', 'pool or hot tub'),('fountain', 'fountain'),('pond', 'pond'),('outdoor kitchen', 'outdoor kitchen'),\
													('playspace', 'playspace'), ('earthwork', 'earthwork'), ('wood construction (deck, pergola, etc.)', 'wood construction (deck, pergola, etc.)'), ('rooftop', 'rooftop'), ('sports court', 'sports court'),('I don’t have a set plan yet. I am looking for a designer to assist me',\
													 'I don’t have a set plan yet. I am looking for a designer to assist me'),('other', 'other'),))
	primary_users = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(), choices=(('just me.', 'just me.'),('my partner and I', 'my partner and I'),('my family with young kids', 'my family with young kids'),('my family with young adults', 'my family with young adults'),('my family with elderly adults', 'my family with elderly adults'),('my friends and I', 'my friends and I'),('other', 'other'),))
	has_pets = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(), choices=(('dog', 'dog'), ('cat', 'cat'), ('reptile', 'reptile'), ('horse', 'horse'), ('tiger', 'tiger'), ('other', 'other'), ('no', 'no'),))
	outdoor_cooking_level = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(), choices=(('none, we cook inside','none, we cook inside'),('space for a pre-fab bbq grill','space for a pre-fab bbq grill'),('built-in outdoor kitchen','built-in outdoor kitchen'),('custom brick oven','custom brick oven'),))
	
	class Meta:
		model = models.Project
		fields = ["name","project_type","lot_size","slope_amount","work_type","primary_users","has_edible_garden","has_pets","approximate_budget","requires_contractor","is_in_phases",'accessibility_concerns','start','preferred_designer','is_for_sports','outdoor_cooking_level','has_existing_plan','has_allergies',"project_description_text","address_1","address_2","city","state_province","zip_code","country",]
		widgets = {
			'slope_amount': forms.RadioSelect(),
			'has_edible_garden': forms.RadioSelect(),
			'approximate_budget': forms.RadioSelect(),
			'requires_contractor': forms.RadioSelect(),
			'is_in_phases': forms.RadioSelect(),
			'accessibility_concerns': forms.RadioSelect(),
			'start': forms.RadioSelect(),
			'is_for_sports': forms.RadioSelect(),
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
			"requires_contractor": "Would you like one of our landspace designers to help connect you to a contractor in your area?",
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


	def __init__(self, *args, **kwargs):
		self.user = kwargs.pop('user', None)
		super(ProjectProfileForm, self).__init__(*args, **kwargs)

	def save(self, commit=False):
		instance = super(ProjectProfileForm, self).save(commit=False)
		instance.client = self.user

		if commit:
			instance.save()

		return instance

		