# Generated by Django 3.1 on 2021-09-12 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mylist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('data', models.DateTimeField()),
                ('time', models.DateTimeField()),
                ('file', models.CharField(max_length=30)),
                ('commit', models.TextField(max_length=200)),
                ('important', models.CharField(max_length=30)),
                ('compelte', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'mylist',
            },
        ),
    ]