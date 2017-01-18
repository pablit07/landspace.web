"""landspace_web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views, decorators
from django.views.generic.base import RedirectView
from . import api
from . import views

urlpatterns = [
	url(r'^$', RedirectView.as_view(url='projects/', permanent=False), name='index'),
    url(r'^admin/?', admin.site.urls),
    url(r'^login/$', auth_views.login),
	url(r'^auth/', include('social_django.urls', namespace='social')),
    url(r'^users/logout/$', auth_views.logout, name='logout'),
    url(r'^users/login/', views.index),
    url(r'^api/users/(?P<pk>\d+)/$', api.UserViewSet.as_view({'get': 'retrieve'}), name='users-api'),
    url(r'^api/users/$', api.CreateUserView.as_view()),
    url(r'^api/url/$', api.ReverseUrlApiView.as_view()),
    url(r'^users/password/reset/$', views.passwordreset, name='password-reset'),
    url(r'^users/password/reset/done/$', views.index, name='password-reset-done'),
    url(r'^users/password/reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', auth_views.password_reset_confirm, {'post_reset_redirect' : '/users/password/done/'}, name='password-reset-confirm'),
    url(r'^users/password/done/$', auth_views.password_reset_complete),
    # Catch-all: authentication required
    url(r'', decorators.login_required(views.index, login_url='/users/login/'))
]
