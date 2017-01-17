from django.core.management.base import BaseCommand
from django.contrib.auth.models import User, Group, Permission
from guardian.shortcuts import assign_perm


class Command(BaseCommand):
    def handle(self, *args, **options):

        baseballAdminGroup = Group.objects.get(name='Baseball Admin')
        baseballPermissions = Permission.objects.filter(name__icontains='baseball')
        pitchPermissions = Permission.objects.filter(name__icontains='pitch')
        labelPermissions = Permission.objects.filter(name__icontains='label')
        registrationPermissions = Permission.objects.filter(name__icontains='registration code')

        # add permissions to group

        for permission in baseballPermissions:
            if not baseballAdminGroup.permissions.filter(id=permission.id).exists():
                baseballAdminGroup.permissions.add(permission)

        for permission in pitchPermissions:
            if not baseballAdminGroup.permissions.filter(id=permission.id).exists():
                baseballAdminGroup.permissions.add(permission)

        for permission in registrationPermissions:
            if not baseballAdminGroup.permissions.filter(id=permission.id).exists():
                baseballAdminGroup.permissions.add(permission)

        for permission in labelPermissions:
            if not baseballAdminGroup.permissions.filter(id=permission.id).exists():
                baseballAdminGroup.permissions.add(permission)

        # add group to users

        if User.objects.filter(username="tompardikes").exists():
            tom = User.objects.get(username="tompardikes")
            baseballAdminGroup.user_set.add(tom)

        if User.objects.filter(username='peterfadde').exists():
            peter = User.objects.get(username="peterfadde")
            baseballAdminGroup.user_set.add(peter)

        if User.objects.filter(username="paulkohlhoff").exists():
            paul = User.objects.get(username="paulkohlhoff")
            baseballAdminGroup.user_set.add(paul)

        if User.objects.filter(username="edwardmelia").exists():
            ed = User.objects.get(username="edwardmelia")
            baseballAdminGroup.user_set.add(ed)

        if User.objects.filter(username="leonardzaichkowsky").exists():
            len = User.objects.get(username="leonardzaichkowsky")
            baseballAdminGroup.user_set.add(len)

        if User.objects.filter(username="danpeterson").exists():
            len = User.objects.get(username="danpeterson")
            baseballAdminGroup.user_set.add(len)

        if User.objects.filter(username="lindseybeaubien").exists():
            len = User.objects.get(username="lindseybeaubien")
            baseballAdminGroup.user_set.add(len)

        assign_perm('player.view_drill', baseballAdminGroup)

