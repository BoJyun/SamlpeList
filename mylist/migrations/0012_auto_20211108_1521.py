# Generated by Django 3.1 on 2021-11-08 07:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mylist', '0011_auto_20211108_1400'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attachmentfile',
            name='field_id',
        ),
        migrations.AddField(
            model_name='mylist',
            name='file_path',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='attachmentfile',
            name='file_path',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mylist.mylist'),
        ),
    ]
