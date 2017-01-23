from django.contrib import admin
from . import models
from django.contrib.auth.models import Group
from social_django import models as social_django_models


admin.site.register(models.Designer)
