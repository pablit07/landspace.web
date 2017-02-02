# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-02 15:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_project_client'),
    ]

    operations = [
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percent_shown', models.IntegerField(blank=True, default=0, null=True)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]
