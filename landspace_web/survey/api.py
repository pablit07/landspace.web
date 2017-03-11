from rest_framework.views import APIView	
from rest_framework import authentication, permissions
from landspace_web.utils import get_registration_url
from django.utils.crypto import get_random_string 
from rest_framework.response import Response
from django.contrib.auth.models import User
from . import models

class CreateSurveyResponseApiView(APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):

		email = request.GET['email']
		length = 5
		survey_response = models.SurveyResponse(survey=models.Survey.objects.get(name=models.DEFAULT_SURVEY_NAME))
		questions = []

		user = User.objects.create_user(username=email, email=email, password=get_random_string())	
		user.save()

		redirect_url = get_registration_url(user)

		for x in xrange(1,length):
			q = request.GET.get('q'+str(x), None)
			if q:
				setattr(survey_response, 'q'+str(), q)
				questions.append(q)

		survey_response.save()


		json_data = {
			'survey_id': survey_response.id,
			'redirect_url': redirect_url
		}
		return Response(json_data)