# Generated by Django 3.1 on 2022-01-04 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mylist', '0014_auto_20211202_1733'),
    ]

    operations = [
        migrations.AddField(
            model_name='mylist',
            name='project',
            field=models.CharField(max_length=30, null=True),
        ),
    ]