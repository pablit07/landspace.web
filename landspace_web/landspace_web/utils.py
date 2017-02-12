from social_core.exceptions import AuthForbidden
from django.utils.decorators import available_attrs
from django.http import HttpResponseRedirect
from functools import wraps

def logout_user(view_func):
    def _wrapped_view(request, *args, **kwargs):
        from django.contrib.auth import logout
        logout(request)
        
        return view_func(request, *args, **kwargs)            
    return wraps(view_func, assigned=available_attrs(view_func))(_wrapped_view)

def auth_allowed(backend, strategy, user=None, *args, **kwargs):
	if strategy.session_get('social_auth_new_user_allowed', '0')=='0' and user==None:
		return strategy.redirect('/users/login/badfbauth/')