# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-28 22:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landspace_web', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='designer',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='designer',
            name='region',
            field=models.CharField(max_length=5),
        ),
    ]
