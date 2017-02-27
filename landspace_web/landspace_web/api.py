from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from django.core.urlresolvers import reverse
from rest_framework.authtoken.models import Token
from django.contrib.auth.tokens import default_token_generator
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import PermissionDenied
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import get_default_password_validators
from django.http import HttpResponseBadRequest
from django.utils.crypto import get_random_string 
from utils import get_registration_url
from . import models
import serializers
import rest_framework


class CreateUserView(CreateAPIView):

	create_user_authentication_classes = tuple(map(lambda s : eval(s), settings.CREATE_USER_API_AUTH))

	model = User
	serializer_class = serializers.UserSerializer
	authentication_classes = create_user_authentication_classes

	def create(self, request):

		return super(CreateAPIView, self).create(request)


class UserViewSet(viewsets.ModelViewSet):
	
	http_method_names = ['get', 'patch',]
	queryset = User.objects.all()
	serializer_class = serializers.UserSerializer

	def retrieve(self, request, pk=None):
		if pk != unicode(request.user.id):
			raise PermissionDenied()

		return super(UserViewSet, self).retrieve(request, pk=pk)


class DesignerViewSet(viewsets.ModelViewSet):
	queryset = models.Designer.objects.all()
	serializer_class = serializers.DesignerSerializer


class ClientViewSet(viewsets.ModelViewSet):
	queryset = models.Client.objects.all()
	serializer_class = serializers.ClientSerializer


class ReverseUrlApiView(APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):
		name = request.GET.get('name', None)
		p1 = request.GET.get('p1', None)
		p2 = request.GET.get('p2', None)

		args = None

		if p1:
			args = [p1]

		if p2:
			args += [p2]

		json_data = {
			'url': reverse(name, args=args)
		}
		return Response(json_data)


class ClientRegisterUrlApiView(APIView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request):
		email = request.POST.get('email')
		user_queryset = User.objects.filter(username=email)
		user = None
		client = None

		if user_queryset.exists() and user_queryset.first().client.has_registered:
			return HttpResponseBadRequest()
		elif not user_queryset.first().client:
			user = User.objects.create_user(username=email, email=email, password=get_random_string())
			user.save()
			client = models.Client(user=user)
			client.save()
		else:
			user = user_queryset.first()
			client = user.client

		url = get_registration_url(user)
		if client:
			client.registration_url = url
			client.has_registered = True
			client.save()

		return Response({'url': url})


class UserTokenApiView(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (authentication.TokenAuthentication, authentication.SessionAuthentication)

	def post(self, request):
		email = request.POST.get('email', None)
		authtoken = None

		if email:
			user = User.objects.get(username=email)
			token = request.POST.get('token', '')
		elif request.user.is_authenticated:
			user = request.user
			authtoken, created = Token.objects.get_or_create(user=user)
		else:
			raise PermissionDenied

		if not authtoken:	
			valid = default_token_generator.check_token(user, token)
			if not valid:
				raise PermissionDenied
			authtoken, created = Token.objects.get_or_create(user=user)

		return Response({'id': user.id, 'token': authtoken.key})


class ValidatePasswordApiView(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (authentication.TokenAuthentication,)

	def post(self, request):
		password = request.POST.get('password')
		errors = []

		password_validators = get_default_password_validators()
		for validator in password_validators:
			try:
				validator.validate(password)
			except ValidationError as error:
				errors.append(str(error))


		return Response({'errors': errors})

