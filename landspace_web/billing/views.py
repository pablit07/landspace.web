from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def webhook(request):
	if request.method != 'POST':
		print 'No POST received, request method was {method} and request.'\
			  'POST was {post}'.format(method=request.method, post=request.POST)
		return HttpResponse(status=400)
	event_obj = request.POST
	print event_obj
	return HttpResponse(status=200)