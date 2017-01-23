from rest_framework import serializers
from django.contrib.auth.models import User
from models import Designer
from . import models


class UserSerializer(serializers.ModelSerializer):

	password = serializers.CharField(write_only=True)
	designer = serializers.SerializerMethodField('get_designer_url')

	def get_designer_url(self, obj):
		designer_obj = Designer.objects.filter(user_id=obj.id)
		return designer_obj.first().url if designer_obj.exists() else None

	def create(self, validated_data):
		user = User.objects.create(
		    username=validated_data['username']
		)
		user.set_password(validated_data['password'])
		user.save()

		return user

	class Meta:
		model = User
		fields = '__all__'


class DesignerSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Designer
		fields = '__all__'