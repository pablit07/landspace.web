from django.contrib import admin
from . import models
from django.contrib.auth.models import Group
from social_django import models as social_django_models
from landspace_web.utils import subscribe_list


class ProjectAdmin(admin.ModelAdmin):
	change_list_template = 'admin/project_change_form.html'
	readonly_fields = ('designer_step', 'admin_step')

	def changelist_view(self, request, extra_context=None):
		extra_context = extra_context or {}
		extra_context['pending_action_projects'] = models.Project.objects.exclude(admin_step=None)
		return super(ProjectAdmin, self).changelist_view(request, extra_context=extra_context)

	def save_model(self, request, obj, form, change):
		# if needs designer, and designer added, mark step completed
		if obj.designer and obj.drive_folder and obj.admin_step and obj.admin_step.name == models.DESIGNER_MATCH_ADMIN_NAME:
			obj.admin_step = None
			obj.designer_step = obj.designer_step.next
			obj.client.client.current_step = obj.client.client.current_step.next
			obj.client.client.save()
			subscribe_list('8f9fa76ea6', obj.client.client.user.email, obj.client.client.user.first_name, obj.client.client.user.last_name, False, {'DNAME':obj.designer.full_name})


		obj.save()

admin.site.register(models.Project, ProjectAdmin)
admin.site.register(models.Step)

admin.site.unregister(social_django_models.Association)
admin.site.unregister(social_django_models.Nonce)
admin.site.unregister(social_django_models.UserSocialAuth)
admin.site.unregister(Group)
