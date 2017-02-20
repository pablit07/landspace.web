from django.shortcuts import render
from . import forms

def index(request):

	return render(request, 'projects/index.html')

def create_project(request):

	# form = forms.ProfileProfileForm(request.POST, instance=project)
	form = forms.ProjectProfileForm(request.POST or None)
	view_data = {
		'form': form
	}
	return render(request, 'projects/create.html', view_data)