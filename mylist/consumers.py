import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room = "mylist"

        async_to_sync(self.channel_layer.group_add)(
            self.room, self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        # self.send(text_data=json.dumps({
        #     'message': message
        # }))

        async_to_sync(self.channel_layer.group_send)("mylist", {
            "type": "chat_message",
            "message": ["fileChange", True],
        })

    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'fileChange': message[0],
            'success': message[1]
        }))
