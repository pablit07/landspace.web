from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views, decorators
from django.views.generic.base import RedirectView
from . import api
from . import views


urlpatterns = [	
	url(r'^api/?', api.CreateSurveyResponseApiView.as_view(), name='create-survey-response')

]