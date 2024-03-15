import 'package:flutter/material.dart';
import 'package:flutter_sms_inbox/flutter_sms_inbox.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:samriddhi/widgets/message_listview.dart';

class BuyingHistoryScreen extends StatefulWidget {
  const BuyingHistoryScreen({Key? key}) : super(key: key);
  @override
  State<BuyingHistoryScreen> createState() => _BuyingHistoryScreenState();
}

class _BuyingHistoryScreenState extends State<BuyingHistoryScreen> {
  final SmsQuery _query = SmsQuery();
  List<SmsMessage> _messages = [];
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
        decoration: const BoxDecoration(
          color: Color.fromARGB(255, 243, 255, 232),
        ),
        child: _messages.isNotEmpty
            ? MessagesListView(
                messages: _messages,
              )
            : Center(
                child: Text(
                  'No messages to show.\n Tap refresh button...',
                  style: Theme.of(context).textTheme.headlineSmall,
                  textAlign: TextAlign.center,
                ),
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
              // address: '+254712345789',
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

String message = "This is a test message!";
List<String> recipents = ["9596181712"];
