from django.contrib.auth.models import Group, User
from django.db import models


class Designer(models.Model):
	user = models.ForeignKey(User)
	region = models.CharField(max_length=100)

	def __unicode__(self):
		return "%s %s" % (self.user.first_name, self.user.last_name)