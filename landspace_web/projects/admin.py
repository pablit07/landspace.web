from django.contrib import admin
from . import models
from django.contrib.auth.models import Group
from social_django import models as social_django_models


class ProjectAdmin(admin.ModelAdmin):
	change_list_template = 'admin/project_change_form.html'

admin.site.register(models.Project)
admin.site.register(models.Step)

admin.site.unregister(social_django_models.Association)
admin.site.unregister(social_django_models.Nonce)
admin.site.unregister(social_django_models.UserSocialAuth)
admin.site.unregister(Group)
