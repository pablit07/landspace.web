from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
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