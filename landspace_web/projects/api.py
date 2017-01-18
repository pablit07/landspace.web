from rest_framework import routers, viewsets
from models import Project
from . import serializers


class UserProjectsViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.ProjectSerializer
	
	def get_queryset(self):
		"""
		This view should return a list of only the projects for which the given user is authenticated
		"""
		user_id = self.kwargs['user_id']
		queryset = Project.objects.filter(client=user_id)

		return queryset