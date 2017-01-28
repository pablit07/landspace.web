from django.contrib.auth.models import Group, User
from django.db import models


class Designer(models.Model):
	user = models.ForeignKey(User)
	region = models.CharField(max_length=5)
	is_available = models.BooleanField(default=True)

	@property
	def url(self):
		return '/api/users/designers/%s/' % self.id

	@property
	def full_name(self):
		return "%s %s" % (self.user.first_name, self.user.last_name)
		
	def __unicode__(self):
		return self.full_name
