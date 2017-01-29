from social_core.exceptions import AuthForbidden

def auth_allowed(backend, strategy, response, *args, **kwargs):
	if strategy.session_get('social_auth_new_user_allowed', '0') == '0':
		return strategy.redirect('/users/login/badfbauth/')