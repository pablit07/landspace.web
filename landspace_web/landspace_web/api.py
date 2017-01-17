from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
import serializers


class CreateUserView(CreateAPIView):

    model = User
    serializer_class = serializers.UserSerializer