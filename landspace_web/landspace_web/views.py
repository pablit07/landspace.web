from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
import serializers

def index(request):

	view_data = {}

	response = render(request, 'landspace_web/index.html', view_data)

	return response
