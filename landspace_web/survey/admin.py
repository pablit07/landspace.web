from django.contrib import admin
from . import models


admin.site.register(models.Survey)
admin.site.register(models.SurveyResponse)