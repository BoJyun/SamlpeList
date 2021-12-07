from django.db import models
from django.db.models.fields import IntegerField

# Create your models here.


class Mylist(models.Model):
    # id = models.IntegerField(primary_key=True)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    date = models.DateField()
    num = models.IntegerField(null=True)
    file = models.CharField(max_length=30)
    commit = models.TextField(max_length=200)
    important = models.CharField(max_length=30, blank=True)
    complete = models.BooleanField(default=False)
    file_path = models.CharField(max_length=150, null=True)

    class Meta:
        db_table = "mylist"


class AttachmentFile(models.Model):
    file_path = models.OneToOneField(Mylist, on_delete=models.CASCADE)
    done_user = models.CharField(max_length=20, null=True)
    start_time = models.TimeField(null=True)
    done_time = models.TimeField(null=True)

    class Meta:
        db_table = "AttachmentFile"
