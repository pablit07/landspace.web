# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-13 00:47
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('style', '0002_style_image_src'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userstyle',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userstyle', to=settings.AUTH_USER_MODEL),
        ),
    ]
