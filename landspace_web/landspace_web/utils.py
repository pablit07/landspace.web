from social_core.exceptions import AuthForbidden
from django.utils.decorators import available_attrs
from django.http import HttpResponseRedirect
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from landspace_web.models import Designer
from functools import wraps
from django.conf import settings
import urllib, mailchimp


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
# MAILCHIMP

def get_mailchimp_api():
    if not hasattr(settings, 'MAILCHIMP_API_KEY'):
        return False
    return mailchimp.Mailchimp(settings.MAILCHIMP_API_KEY)  # your api key here


def get_lists(list_id):
    members = []
    try:
        m = get_mailchimp_api()
        lists = m.lists.list({'list_id': list_id})
        list = lists['data'][0]
        members = m.lists.members(list_id)['data']
    except mailchimp.ListDoesNotExistError:
        print "The list does not exist"
    except mailchimp.Error, e:
        print 'An error occurred: %s - %s' % (e.__class__, e)
    return members


def subscribe_list(list_id, email, first_name='', last_name='', double_optin=True, extra_merge_vars=None):
    try:
        m = get_mailchimp_api()
        if not m:
            return False
        if extra_merge_vars is None:
        	extra_merge_vars = dict()
        merge_vars = {'FNAME': first_name, 'LNAME': last_name}
        merge_vars = dict(extra_merge_vars.items() + merge_vars.items())
        m.lists.subscribe(list_id, {'email': email}, merge_vars=merge_vars, double_optin=double_optin)
        return True
    # messages.success(request,  "The email has been successfully subscribed")
    except mailchimp.Error as e:
        print e.__class__
        return False