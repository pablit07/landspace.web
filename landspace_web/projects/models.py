# coding=utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Project(models.Model):
	name = models.CharField(max_length=100, blank=False, null=False)
	client = models.ForeignKey(User, related_name='client_project')
	designer = models.ForeignKey(User, related_name='designer_project', blank=True, null=True)

	project_type = models.CharField(max_length=100, choices=[('front yard', 'front yard'), ('backyard', 'backyard'), ('small garden area', 'small garden area'), ('deck or patio', 'deck or patio'), ('roofdeck', 'roofdeck'), ('other', 'other')])
	lot_size = models.IntegerField(blank=True, null=True)
	slope_amount = models.CharField(max_length=100, choices=[('None, the space is flat', 'None, the space is flat'), ('Some, moderate grade change', 'Some, moderate grade change'), ('A lot, steep slopes', 'A lot, steep slopes')])
	work_type = models.CharField(max_length=100, choices=[('planting', 'planting'),('wood construction', 'wood construction'),('stonework or masonry', 'stonework or masonry'),\
													('walls', 'walls'),('art installation', 'art installation'),('small improvements (pots, firepit, etc)', 'small improvements (pots, firepit, etc)'),\
													('patio', 'patio'),('pool or hot tub', 'pool or hot tub'),('fountain', 'fountain'),('pond', 'pond'),('outdoor kitchen', 'outdoor kitchen'),\
													('playspace', 'playspace'), ('earthwork', 'earthwork'), ('wood construction (deck, pergola, etc.)', 'wood construction (deck, pergola, etc.)'), ('rooftop', 'rooftop'), ('sports court', 'sports court'),('I don’t have a set plan yet. I am looking for a designer to assist me',\
													 'I don’t have a set plan yet. I am looking for a designer to assist me'),('other', 'other'),])
	primary_users = models.CharField(max_length=100, choices=[('just me.', 'just me.'),('my partner and I', 'my partner and I'),('my family with young kids', 'my family with young kids'),('my family with young adults', 'my family with young adults'),('my family with elderly adults', 'my family with elderly adults'),('my friends and I', 'my friends and I'),('other', 'other'),])
	has_edible_garden = models.CharField(max_length=100, choices=[('herbs (small pots - vertical)', ' herbs (small pots - vertical)'),('vegetables (raised planter boxes)', ' vegetables (raised planter boxes)'),('fruit trees', ' fruit trees'),('not for my space', ' not for my space'),])
	has_pets = models.CharField(max_length=100, choices=[('dog', 'dog'), ('cat', 'cat'), ('reptile', 'reptile'), ('horse', 'horse'), ('tiger', 'tiger'), ('other', 'other'), ('no', 'no'),])
	approximate_budget = models.CharField(max_length=100, choices=[('$500 - $1,000', '$500 - $1,000'),('$1,000 - $5,000', '$1,000 - $5,000'),('$5000 - $10,000', '$5000 - $10,000'),('$10,000 - $20,000', '$10,000 - $20,000'),('$20,000 - $50,000', '$20,000 - $50,000'),('$50,000 - $100,000', '$50,000 - $100,000'),('$100,000+', '$100,000+'),])
	project_description_text = models.TextField(null=True, blank=True)
	address_1 = models.CharField(max_length=300)
	address_2 = models.CharField(max_length=300, blank=True, null=True)
	city = models.CharField(max_length=100)
	state_province = models.CharField(max_length=50)
	zip_code = models.CharField(max_length=5)
	country = models.CharField(max_length=100)

	requires_contractor = models.CharField(max_length=100, choices=[('yes', 'yes'),('no - I will be diy-ing this project', 'no - I will be diy-ing this project'),('no - I already have a good contractor', 'no - I already have a good contractor'),('no - I am not planning on building just yet', 'no - I am not planning on building just yet'),])
	is_in_phases = models.CharField(max_length=100, choices=[('yes - I will build them when I have the time','yes - I will build them when I have the time'),('no - let’s get this all out in one shot ','no - let’s get this all out in one shot '),])
	timeline = models.CharField(max_length=50)

	accessibility_concerns = models.CharField(max_length=100, choices=[('yes wheelchair access is important','yes wheelchair access is important'),('no','no'),])
	start = models.CharField(max_length=100, choices=[('now','now'),('in a few months','in a few months'),('several months','several months'),('not sure, just checking my options','not sure, just checking my options'),])
	preferred_designer = models.ForeignKey('landspace_web.Designer', blank=True, null=True)
	is_for_sports = models.CharField(max_length=100, choices=[('no','no'),('bocce','bocce'),('basketball','basketball'),('horseshoes','horseshoes'),('open lawn for free play','open lawn for free play'),('other','other'),])
	outdoor_cooking_level = models.CharField(max_length=100, choices=[('none, we cook inside','none, we cook inside'),('space for a pre-fab bbq grill','space for a pre-fab bbq grill'),('built-in outdoor kitchen','built-in outdoor kitchen'),('custom brick oven','custom brick oven'),])
	has_existing_plan = models.CharField(max_length=100, choices=[('yes I will upload them when I upload images','yes I will upload them when I upload images'),('no I am a blank canvas','no I am a blank canvas'),])
	has_allergies = models.CharField(max_length=100, choices=[('nope all good!','nope all good!'),('yes I will explain on the call with my designer','yes I will explain on the call with my designer'),])

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

