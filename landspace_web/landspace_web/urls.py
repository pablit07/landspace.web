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
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import RedirectView
from . import api
from . import views
from projects import api as projects_api
from survey import api as survey_api
from utils import logout_user


urlpatterns = [
	url(r'^$', RedirectView.as_view(url='projects/', permanent=False), name='index'),
    url(r'^projects/?', include('projects.urls', namespace='projects')),
    url(r'^survey/?', include('survey.urls', namespace='survey')),
    url(r'^billing/?', include('billing.urls', namespace='billing')),
    url(r'^admin/?', admin.site.urls),
    url(r'^login/$', auth_views.login),
	url(r'^auth/', include('social_django.urls', namespace='social')),
    url(r'^users/logout/$', auth_views.logout, name='logout'),
    url(r'^users/login/badfbauth/', views.fbauth_create_not_allowed),
    url(r'^users/login/', auth_views.login),
    url(r'^users/new/', logout_user(auth_views.login)),

    url(r'^api/users/validatepassword/$', api.ValidatePasswordApiView.as_view(), name='users-api-validatepassword'),
    url(r'^api/users/(?P<user_id>\d+)/projects', projects_api.UserProjectsViewSet.as_view({'get': 'list'}), name='user-projects'),
    url(r'^api/users/clients/register-url$', api.ClientRegisterUrlApiView.as_view(), name='clients-register-url-api'),
    url(r'^api/users/clients/(?P<pk>\d+)/$', api.ClientViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='clients-api'),
    url(r'^api/users/obtainauthtoken/$', csrf_exempt(api.UserTokenApiView.as_view()), name='designer-token-auth'),
    url(r'^api/users/designers/(?P<pk>\d+)/$', api.DesignerViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='designers-api'),
    url(r'^api/users/designers/(?P<pk>\d+)/projects', projects_api.DesignerProjectsViewSet.as_view({'get': 'list'}), name='designer-projects-api'),
    url(r'^api/users/(?P<pk>\d+)/$', api.UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='users-api'),
    url(r'^api/users/$', api.CreateUserView.as_view(), name='users-api-create'),

    url(r'^api/url/$', api.ReverseUrlApiView.as_view()),
    url(r'^users/password/reset/$', views.passwordreset, name='password-reset'),
    url(r'^users/password/reset/done/$', views.index, name='password-reset-done'),
    url(r'^users/password/reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', auth_views.password_reset_confirm, {'post_reset_redirect' : '/users/password/done/'}, name='password-reset-confirm'),
    url(r'^users/password/done/$', auth_views.password_reset_complete),
    # Catch-all: authentication required
    url(r'', decorators.login_required(views.index, login_url='/users/login/'))
]
