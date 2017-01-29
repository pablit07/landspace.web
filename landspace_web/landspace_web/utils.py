from social_core.exceptions import AuthForbidden

def auth_allowed(backend, strategy, user=None, *args, **kwargs):
	if strategy.session_get('social_auth_new_user_allowed', '0')=='0' and user==None:
		return strategy.redirect('/users/login/badfbauth/')