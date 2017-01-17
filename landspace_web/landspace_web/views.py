from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordResetForm
from django.http import HttpResponseBadRequest
import serializers

def index(request):

	view_data = {}

	response = render(request, 'landspace_web/index.html', view_data)

	return response

def passwordreset(request):

	email = request.POST.get('email', None)

	if not email:
		return HttpResponseBadRequest()

	user = User.objects.get(email=email)

	if user and user.email:
		form = PasswordResetForm({'email': user.email})

		if form.is_valid():
			form.save(
				use_https=False,
				from_email="no-reply@landspace.site", 
				email_template_name='registration/password_reset_email.html',
				request=request)

			return redirect('password-reset-done')


	return render(request, 'landspace_web/index.html', {errors: ['Could not reset password']})