# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-25 03:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('landspace_web', '0007_auto_20170225_0256'),
    ]

    operations = [
        migrations.AlterField(
            model_name='designer',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='designer', to=settings.AUTH_USER_MODEL),
        ),
    ]
