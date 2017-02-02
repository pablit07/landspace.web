from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Project(models.Model):
	name = models.CharField(max_length=100, blank=False, null=False)
	client = models.ForeignKey(User)

	def __unicode__(self):
		return self.name


class Step(models.Model):
	percent_shown = models.IntegerField(blank=True, null=True, default=0)
	name = models.CharField(max_length=100)
	action = models.CharField(max_length=50, blank=True, null=True)
	url = models.CharField(max_length=300, blank=True, null=True)
	next = models.OneToOneField("self", blank=True, null=True)
	icon_class = models.CharField(max_length=20, blank=True, null=True)

	def __unicode__(self):
		return self.name