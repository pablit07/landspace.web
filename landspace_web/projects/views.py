from django.shortcuts import render, redirect, reverse
from django.conf import settings
import django_excel
from . import forms, models


def index(request, role=None):
	if not role and hasattr(request.user, 'designer'):
		return redirect('/projects/designer/')

	return render(request, 'projects/index.html')

def create_project(request):

	form = forms.ProjectProfileForm(request.POST or None, user=request.user)
	if form.is_valid():
		form.save(commit=True)
		request.user.client.current_step = request.user.client.current_step.next
		request.user.client.save()

		return redirect('/projects/')

	view_data = {
		'form': form,
		'stripe_public_key': settings.STRIPE_PUBLIC_API_KEY
	}
	return render(request, 'projects/create.html', view_data)

def image_upload(request, role=None):
	request.user.client.current_step = models.Step.objects.filter(name__icontains="upload").first()
	request.user.client.save()

	return render(request, 'projects/index.html')

def testdrive(request):

	return render(request, 'projects/testdrive.html', {})


def export_project(request, pk):
	if not pk:
		raise

	queryset = models.Project.objects.filter(id=pk)

	return django_excel.make_response_from_records(queryset.values(), 'xlsx', file_name="Project_"+pk)