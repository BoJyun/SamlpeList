# Generated by Django 3.1 on 2021-11-09 13:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mylist', '0012_auto_20211108_1521'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attachmentfile',
            name='file_path',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='mylist.mylist'),
        ),
        migrations.AlterField(
            model_name='mylist',
            name='file_path',
            field=models.CharField(max_length=150, null=True),
        ),
    ]