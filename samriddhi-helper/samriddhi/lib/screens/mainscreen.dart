import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_sms_inbox/flutter_sms_inbox.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:samriddhi/widgets/message_listview.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

const fabssphone = '+919596181712';
const fabssphone2 = '9596181712';
const fabssphone3 = 'Fabsssss';

class BuyingHistoryScreen extends StatefulWidget {
  const BuyingHistoryScreen({Key? key}) : super(key: key);

  @override
  State<BuyingHistoryScreen> createState() => _BuyingHistoryScreenState();
}

class _BuyingHistoryScreenState extends State<BuyingHistoryScreen> {
  final SmsQuery _query = SmsQuery();
  List<SmsMessage> _messages = [];
  TextEditingController _urlController = TextEditingController();
  Timer? _timer;

  @override
  void dispose() {
    _urlController.dispose();
    _timer?.cancel(); // Cancel the timer to avoid memory leaks
    super.dispose();
  }

  Future<void> _sendLastMessage() async {
    if (_messages.isNotEmpty) {
      List<String> senderPhoneNumbers = [fabssphone, fabssphone2, fabssphone3];
      List<SmsMessage> filteredMessages = _messages.where((message) {
        return senderPhoneNumbers.contains(message.sender);
      }).toList();

      if (filteredMessages.isNotEmpty) {
        SmsMessage lastMessage = filteredMessages[0];
        String url = _urlController.text;

        try {
          var response = await http.post(
            Uri.parse(url),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jsonEncode(<String, String?>{
              'sender': lastMessage.sender,
              'message': lastMessage.body,
              'date': lastMessage.dateSent.toString(),
            }),
          );

          if (response.statusCode == 200) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Message sent successfully!')),
            );
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Failed to send message!')),
            );
          }
        } catch (e) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e')),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('No messages from specified senders!')),
        );
      }
    }
  }

  void _startSendingAtInterval() {
    _timer = Timer.periodic(Duration(seconds: 2), (timer) {
      _sendLastMessage(); // Call your function to send the last message
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios,
            color: Colors.black,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        elevation: 0,
        backgroundColor: const Color.fromARGB(255, 243, 255, 232),
        title: const Text(
          'Your History',
          style: TextStyle(color: Colors.black, fontSize: 15),
        ),
      ),
      backgroundColor: const Color.fromARGB(255, 243, 255, 232),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _urlController,
              decoration: InputDecoration(
                labelText: 'Enter URL',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                _sendLastMessage();
                _startSendingAtInterval(); // Start sending at interval
              },
              child: Text('Send Last Message and Start Interval'),
            ),
            SizedBox(height: 16),
            Expanded(
              child: _messages.isNotEmpty
                  ? MessagesListView(messages: _messages)
                  : Center(
                      child: Text(
                        'No messages to show.\nTap refresh button...',
                        style: Theme.of(context).textTheme.headline6,
                        textAlign: TextAlign.center,
                      ),
                    ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          var permission = await Permission.sms.status;
          if (permission.isGranted) {
            final messages = await _query.querySms(
              kinds: [
                SmsQueryKind.inbox,
                SmsQueryKind.sent,
              ],
              count: 1000,
            );
            debugPrint('sms inbox messages: ${messages.length}');

            setState(() => _messages = messages);
          } else {
            await Permission.sms.request();
          }
        },
        child: const Icon(Icons.refresh),
      ),
    );
  }
}
