from rest_framework import serializers
from mylist.models import Mylist, AttachmentFile


class MylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mylist
        fields = '__all__'


class AttachmentFile(serializers.ModelSerializer):

    class Meta:
        model = AttachmentFile
        fields = '__all__'
