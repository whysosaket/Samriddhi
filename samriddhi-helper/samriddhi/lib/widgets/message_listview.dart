import 'package:flutter/material.dart';
import 'package:flutter_sms_inbox/flutter_sms_inbox.dart';
import 'package:flutter_sms/flutter_sms.dart';

const fabssphone = '+919596181712';
const fabssphone2 = '9596181712';
const fabssphone3 = 'Fabsssss';

class MessagesListView extends StatelessWidget {
  const MessagesListView({
    Key? key,
    required this.messages,
  }) : super(key: key);

  final List<SmsMessage> messages;

  @override
  Widget build(BuildContext context) {
    List<SmsMessage> filteredMessages = messages.where((message) {
      // Check if the message is sent by fabssphone
      bool isSentByFabssphone = message.sender == fabssphone;
      bool isSentByFabssphone2 = message.sender == fabssphone2;
      bool isSentByFabssphone3 = message.sender == fabssphone3;

      return isSentByFabssphone || isSentByFabssphone2 || isSentByFabssphone3;
      // return true;
    }).toList();

    return ListView.builder(
      shrinkWrap: true,
      itemCount: filteredMessages.length,
      itemBuilder: (BuildContext context, int i) {
        var message = filteredMessages[i];

        return ListTile(
          title: Text('${message.sender} [${message.date}]'),
          subtitle: Text('${message.body}'),
        );
      },
    );
  }
}

String message = "This is a test message!";
List<String> recipents = ["9596181712"];

void _sendSMS(String message, List<String> recipents) async {
  String _result = await sendSMS(message: message, recipients: recipents)
      .catchError((onError) {
    print(onError);
  });
  print(_result);
}
