from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


DEFAULT_SURVEY_NAME = "Style Survey"


class Survey(models.Model):
	name = models.CharField(max_length=100)

	def __unicode__(self):
		return self.name


class SurveyResponse(models.Model):
	user = models.ForeignKey(User)
	survey = models.ForeignKey(Survey)
	q1 = models.TextField()
	q2 = models.TextField(blank=True, null=True)
	q3 = models.TextField(blank=True, null=True)
	q4 = models.TextField(blank=True, null=True)
	q5 = models.TextField(blank=True, null=True)