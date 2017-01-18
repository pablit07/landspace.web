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
import serializers


class CreateUserView(CreateAPIView):

    model = User
    serializer_class = serializers.UserSerializer


class UserViewSet(viewsets.ModelViewSet):
	
	http_method_names = ['get',]
	queryset = User.objects.all()
	serializer_class = serializers.UserSerializer

	def retrieve(self, request, pk=None):
		if pk != unicode(request.user.id):
			raise PermissionDenied()

		return super(UserViewSet, self).retrieve(request, pk=pk)


class ReverseUrlApiView(APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):
		name = request.GET.get('name', None)
		p1 = request.GET.get('p1', None)
		args = None

		if p1:
			args = [p1]

		json_data = {
			'url': reverse(name, args=args)
		}
		return Response(json_data)