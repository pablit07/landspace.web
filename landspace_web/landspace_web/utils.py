from social_core.exceptions import AuthForbidden
from django.utils.decorators import available_attrs
from django.http import HttpResponseRedirect
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from functools import wraps
from django.conf import settings
import urllib


def logout_user(view_func):
    def _wrapped_view(request, *args, **kwargs):
        from django.contrib.auth import logout
        logout(request)
        
        return view_func(request, *args, **kwargs)
    return wraps(view_func, assigned=available_attrs(view_func))(_wrapped_view)

def auth_allowed(backend, strategy, user=None, *args, **kwargs):
	if strategy.session_get('social_auth_new_user_allowed', '0')=='0' and user==None:
		return strategy.redirect('/users/login/badfbauth/')


def get_registration_url(user):
	base_url = 'users/new/designer/{token}/{email}/{uid}' if hasattr(user, 'designer') else 'users/new/{token}/{email}/{uid}'
	return settings.SITE_URL + base_url.format(token=default_token_generator.make_token(user),
																				 email=urllib.quote(user.username),
																				 uid=urlsafe_base64_encode(force_bytes(user.pk)).decode())