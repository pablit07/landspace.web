from rest_framework.views import APIView	
from rest_framework import authentication, permissions
from landspace_web.utils import get_registration_url
from django.utils.crypto import get_random_string 
from rest_framework.response import Response
from django.http import HttpResponseBadRequest
from django.contrib.auth.models import User
from . import models
from landspace_web.forms import ClientAdminForm

class CreateSurveyResponseApiView(APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):

		email = request.GET['email']
		client = None
		user = None
		length = 5
		survey_response = models.SurveyResponse(survey=models.Survey.objects.get(name=models.DEFAULT_SURVEY_NAME))
		questions = []

		form = ClientAdminForm(request.GET or None)
		if form.is_valid():
			client = form.save()
			user = client.user
		else:
			return HttpResponseBadRequest()

		redirect_url = client.registration_url

		for x in xrange(1,length):
			q = request.GET.get('q'+str(x), None)
			if q:
				setattr(survey_response, 'q'+str(), q)
				questions.append(q)

		survey_response.user = user
		survey_response.save()

		user_style = UserStyle(user=user, survey_response=survey_response)
		user_style.find_style()
		user_style.save()


		json_data = {
			'survey_id': survey_response.id,
			'redirect_url': redirect_url
		}
		return Response(json_data)