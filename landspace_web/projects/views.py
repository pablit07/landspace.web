from django.shortcuts import render, redirect, reverse
from . import forms

def index(request, role=None):
	if not role and hasattr(request.user, 'designer'):
		return redirect('/projects/designer/')

	return render(request, 'projects/index.html')

def create_project(request):

	form = forms.ProjectProfileForm(request.POST or None)
	view_data = {
		'form': form
	}
	return render(request, 'projects/create.html', view_data)

def testdrive(request):

	return render(request, 'projects/testdrive.html', {})