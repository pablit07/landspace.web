from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from survey.models import SurveyResponse, Survey





class Style(models.Model):
	name = models.CharField(max_length=100)
	survey = models.ForeignKey(Survey)
	image_src = models.CharField(max_length=300, blank=True, null=True)

	def __unicode__(self):
		return self.name

# http://localhost:8000/survey/api/?email=paulkohlhoff@gmail.com&q1=yes&q2=mediterranean
class DefaultStyleFinder():
	def find_style(self, user, user_style, survey_response):
		return Style.objects.get(name__iexact=survey_response.q2)


class UserStyle(models.Model):
	user = models.ForeignKey(User, related_name='userstyle')
	style = models.ForeignKey(Style, blank=True, null=True)
	survey = models.ForeignKey(SurveyResponse, blank=True, null=True)

	style_finder_class = DefaultStyleFinder

	def find_style(self):
		style_finder = self.style_finder_class()
		self.style = style_finder.find_style(self.user, self, self.survey)

