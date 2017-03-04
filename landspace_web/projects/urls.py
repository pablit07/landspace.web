from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views, decorators
from django.views.generic.base import RedirectView
from . import api
from . import views


urlpatterns = [	
	url(r'^$', decorators.login_required(views.index)),
	url(r'(?P<role>designer)?^$', decorators.login_required(views.index), name='designer'),
	url(r'^create/$', decorators.login_required(views.create_project)),
	url(r'^testdrive/$', views.testdrive),
	url(r'^export/(?P<pk>\d+)', views.export_project)
]