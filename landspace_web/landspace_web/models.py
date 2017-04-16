from django.contrib.auth.models import Group, User
from django.db import models
from userbilling.models import UserBilling
from projects.models import Step


class Designer(models.Model):
	user = models.OneToOneField(User, related_name='designer')
	region = models.CharField(max_length=5)
	is_available = models.BooleanField(default=True)

	@property
	def url(self):
		return '/api/users/designers/%s/' % self.id

	def __unicode__(self):
		if self.user.first_name or self.user.last_name:
			return self.full_name
		else:
			return self.user.email

	@property
	def full_name(self):
		if self.user.first_name or self.user.last_name:
			return "%s %s" % (self.user.first_name, self.user.last_name)
		else:
			return self.user.email


class Client(models.Model):
	user = models.OneToOneField(User, related_name='client')
	current_step = models.ForeignKey(Step, blank=True, null=True)
	registration_url = models.URLField(blank=True, null=True)
	has_registered = models.BooleanField(default=False)
	is_mailing_list = models.BooleanField(default=False)
	is_showcase_project = models.BooleanField(default=False)
	has_active_project = models.BooleanField(default=False)

	def save(self, *args, **kwargs):
		if self.user and not hasattr(self.user, 'userbilling'):
			UserBilling.objects.create(user=self.user)
		super(Client, self).save(*args, **kwargs)

	@property
	def url(self):
		return '/api/users/clients/%s/' % self.id

	def __unicode__(self):
		if self.user.first_name or self.user.last_name:
			return self.full_name
		else:
			return self.user.email

	@property
	def full_name(self):
		return "%s %s" % (self.user.first_name, self.user.last_name)

