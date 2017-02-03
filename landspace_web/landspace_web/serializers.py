from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
from landspace_web.models import Client, Designer
from projects.serializers import StepSerializer


class UserSerializer(serializers.ModelSerializer):

	CLIENT_ROLE = 'CLIENT'
	DESIGNER_ROLE = 'DESIGNER'
	ROLE_CHOICES = ((CLIENT_ROLE, 'Client'), (DESIGNER_ROLE, 'Designer'), (None, '--------'))

	password = serializers.CharField(write_only=True)
	role = serializers.ChoiceField(write_only=True, choices=ROLE_CHOICES, required=False)
	designer = serializers.SerializerMethodField('get_designer_url')
	client = serializers.SerializerMethodField('get_client_url')

	def get_designer_url(self, obj):
		designer_obj = models.Designer.objects.filter(user_id=obj.id)
		return designer_obj.first().url if designer_obj.exists() else None

	def get_client_url(self, obj):
		client_obj = models.Client.objects.filter(user_id=obj.id)
		return client_obj.first().url if client_obj.exists() else None

	def create(self, validated_data):
		user = User.objects.create(
		    username=validated_data['username']
		)
		user.set_password(validated_data['password'])
		user.save()

		if 'role' in validated_data and validated_data['role'] != None:
			if validated_data['role'] == self.CLIENT_ROLE:
				Client.objects.create(user_id=user.id)
			elif validated_data['role'] == self.DESIGNER_ROLE:
				Designer.objects.create(user_id=user.id)

		return user

	class Meta:
		model = User
		fields = '__all__'


class DesignerSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Designer
		fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
	current_step = StepSerializer()

	class Meta:
		model = models.Client
		fields = '__all__'