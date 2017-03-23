from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class UserBilling(models.Model):
	stripe_customer_id = models.CharField(max_length=100)
	user = models.OneToOneField(User)