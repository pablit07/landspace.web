# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-02 16:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_auto_20170202_1646'),
    ]

    operations = [
        migrations.AddField(
            model_name='step',
            name='action',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]