# Generated by Django 3.1 on 2021-11-04 06:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mylist', '0008_auto_20211020_1708'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttachmentFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_path', models.CharField(max_length=50)),
                ('done_user', models.CharField(max_length=20)),
                ('start_time', models.TimeField()),
                ('done_time', models.TimeField()),
                ('file_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mylist.mylist')),
            ],
        ),
    ]
