from rest_framework import routers, viewsets
from models import Project
from . import serializers


class ProjectViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.ProjectSerializer
	queryset = Project.objects.all()














router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)