from rest_framework import serializers
from . import models


class NextStepSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Step
		fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
	client = serializers.SerializerMethodField('get_client_url')
	designer_step = NextStepSerializer()

	def get_client_url(self, obj):
		return obj.client.client.url if (hasattr(obj, 'client') and hasattr(obj.client, 'client')) else None

	class Meta:
		model = models.Project
		fields = '__all__'


class StepSerializer(serializers.ModelSerializer):
	next = NextStepSerializer()

	class Meta:
		model = models.Step
		fields = '__all__'