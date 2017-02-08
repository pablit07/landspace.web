from .base import *

# to use localhost
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025

# to use AWS
# EMAIL_HOST = 'email-smtp.us-west-2.amazonaws.com'
# EMAIL_PORT = 25
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = 'AKIAIUBIEEQFDGURX6FQ'
# EMAIL_HOST_PASSWORD = 'ArA4+R4C4lJGzsPyVhQhV0ZGmRg8Dn7AJ5fCAQlRxOsR'

SOCIAL_AUTH_FACEBOOK_KEY='1862275167388345'
SOCIAL_AUTH_FACEBOOK_SECRET='e8fd4bd0685e9cab6f2928177fd53f82'

# Settings for Webpack Dev Server
STATIC_URL = 'http://localhost:9000/'
STATIC_ROOT = os.path.join(BASE_DIR, "..", "static")
STATICFILES_DIRS = ()

CREATE_USER_API_AUTH = ('rest_framework.authentication.TokenAuthentication', 'rest_framework.authentication.SessionAuthentication',)

EMAIL_HOST = 'email-smtp.us-west-2.amazonaws.com'
EMAIL_PORT = 25
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'AKIAIUBIEEQFDGURX6FQ'
EMAIL_HOST_PASSWORD = 'ArA4+R4C4lJGzsPyVhQhV0ZGmRg8Dn7AJ5fCAQlRxOsR'