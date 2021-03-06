from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User


class UserSelectRelatedBackend(ModelBackend):
    def get_user(self, user_id):
        try:
            # This is where the magic happens
            return User.objects. \
                prefetch_related('client'). \
                get(pk=user_id)
        except User.DoesNotExist:
            return None