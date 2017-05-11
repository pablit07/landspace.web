from django.shortcuts import render, redirect, reverse
from django.conf import settings
from django.http import HttpResponse
from landspace_web.utils import subscribe_list
from datetime import datetime
import django_excel
from . import forms, models
import boto
from boto.s3.key import Key
import json


def handle_uploaded_file(f):
	file_name = '/tmp/%s%s.txt' % (datetime.utcnow(), f.name,)
	with open(file_name, 'wb+') as destination:
		for chunk in f.chunks():
			destination.write(chunk)
	return file_name

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
		subscribe_list('d3f6fa95c0', request.user.email, request.user.first_name, request.user.last_name, False)

		return redirect('/projects/')

	view_data = {
		'form': form,
		'stripe_public_key': settings.STRIPE_PUBLIC_API_KEY
	}
	return render(request, 'projects/create.html', view_data)

def image_upload(request, role=None):
	request.user.client.current_step = models.Step.objects.filter(name__icontains="upload").first()
	request.user.client.save()

	return render(request, 'projects/imageupload.html')

def testdrive(request):

	return render(request, 'projects/testdrive.html', {})


def export_project(request, pk):
	if not pk:
		raise

	queryset = models.Project.objects.filter(id=pk)

	return django_excel.make_response_from_records(queryset.values(), 'xlsx', file_name="Project_"+pk)

def add_images(request):
	
	if request.method == 'GET':
		# we are expected to return a list of dicts with infos about the already available files:
		file_infos = []
		# for file_name in list_files():
		# 	file_url = url_for('download', file_name=file_name)
		# 	file_size = get_file_size(file_name)
		# 	file_infos.append(dict(name=file_name,
		# 	                       size=file_size,
		# 	                       url=file_url))
		return HttpResponse(json.dumps({'files':file_infos}), content_type='application/json')

	if request.method == 'POST':

		for key, file in request.FILES.items():
			file_path = handle_uploaded_file(file)
			conn = boto.connect_s3(settings.AWS_ACCESS_KEY_ID, settings.AWS_SECRET_ACCESS_KEY)
			bucket = conn.get_bucket('landspace-file-uploads')
			k = Key(bucket)
			k.key = file.name
			k.set_contents_from_filename(file_path)
			k.make_public()


		data_file = request.FILES['files[]']
		file_name = data_file.name
		# save_file(data_file, file_name)
		# file_size = get_file_size(file_name)
		# file_url = url_for('download', file_name=file_name)
		# # providing the thumbnail url is optional
		# thumbnail_url = url_for('thumbnail', file_name=file_name)
		file_size = 0
		thumbnail_url = ''
		file_url = ''

		return HttpResponse(json.dumps({'name':file_name,
		           'size':file_size,
		           'url':file_url,
		           'thumbnail':thumbnail_url}), content_type='application/json')
