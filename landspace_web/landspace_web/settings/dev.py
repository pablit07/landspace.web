from .base import *


EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025

SOCIAL_AUTH_FACEBOOK_KEY='1862275167388345'
SOCIAL_AUTH_FACEBOOK_SECRET='e8fd4bd0685e9cab6f2928177fd53f82'

# Settings for Webpack Dev Server
STATIC_URL = 'http://localhost:9000/'
STATIC_ROOT = os.path.join(BASE_DIR, "..", "static")
STATICFILES_DIRS = ()