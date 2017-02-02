from django.contrib.auth.models import Group, User
from django.db import models
from projects.models import Step


class Designer(models.Model):
	user = models.ForeignKey(User)
	region = models.CharField(max_length=5)
	is_available = models.BooleanField(default=True)

	@property
	def url(self):
		return '/api/users/designers/%s/' % self.id

	def __unicode__(self):
		return self.full_name

	@property
	def full_name(self):
		return "%s %s" % (self.user.first_name, self.user.last_name)


class Client(models.Model):
	user = models.ForeignKey(User)	
	current_step = models.ForeignKey(Step)

	@property
	def url(self):
		return '/api/users/clients/%s/' % self.id

	def __unicode__(self):
		return self.full_name

	@property
	def full_name(self):
		return "%s %s" % (self.user.first_name, self.user.last_name)

