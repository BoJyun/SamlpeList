# Generated by Django 3.1 on 2021-09-12 15:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mylist', '0002_auto_20210912_2216'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mylist',
            old_name='data',
            new_name='date',
        ),
    ]