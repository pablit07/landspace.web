from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views, decorators
from django.views.generic.base import RedirectView
from . import api
from . import views


urlpatterns = [	
	url(r'^$', views.index),
	url(r'(?P<role>designer)?^$', views.index, name='designer'),
	url(r'^create/$', views.create_project),
	url(r'^testdrive/$', views.testdrive)
]