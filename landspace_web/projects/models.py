from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Project(models.Model):
	name = models.CharField(max_length=100, blank=False, null=False)
	client = models.ForeignKey(User)