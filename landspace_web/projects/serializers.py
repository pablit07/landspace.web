from rest_framework import serializers
from . import models


class ProjectSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Project
		fields = '__all__'


class NextStepSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Step
		fields = '__all__'


class StepSerializer(serializers.ModelSerializer):
	next = NextStepSerializer()

	class Meta:
		model = models.Step
		fields = '__all__'