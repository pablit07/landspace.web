from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render

def index(request):

	view_data = {}

	response = render(request, 'landspace_web/index.html', view_data)

	return response