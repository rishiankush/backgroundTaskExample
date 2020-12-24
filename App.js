/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import BackgroundJob from 'react-native-background-actions';

import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const taskRandom = () => {
  // if (Platform.OS === 'ios') {
    // PushNotificationIOS.scheduleLocalNotification({
    //   message: "My Notification Message", // (required)
    //   date: new Date(Date.now() + (60 * 1000)) // in 60 secs
    // });

    setInterval(() => {
      PushNotificationIOS.presentLocalNotification({
        alertTitle: 'Sample Title',
        alertBody: 'Sample local notification',
        // applicationIconBadgeNumber: 1,
      });
    }, 960000);


    // PushNotification.localNotificationSchedule({ message: "background job running", date: new Date(Date.now() + (20 * 1000)) })
  // }
  // await new Promise(async resolve => {
  //   // For loop with a delay
  //   const {delay} = taskData;
  //   for (let i = 0; BackgroundJob.isRunning(); i++) {
  //     console.log('Runned -> ', i);
  //     await BackgroundJob.updateNotification({taskDesc: 'Runned -> ' + i});
  //     await sleep(delay);
  //   }
  // });
};

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask desc',
  // taskIcon: {
  //   name: 'ic_launcher',
  //   type: 'mipmap',
  // },
  color: '#ff00ff',
  // linkingURI: 'exampleScheme://chat/jane',
  // parameters: {
  //   delay: 1000,
  // },
};


function handleOpenURL(evt) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

class App extends React.Component {
  playing = BackgroundJob.isRunning();

  /**
   * Toggles the background task
   */

  toggleBackground = async () => {
    // this.playing = !this.playing;
    // if (this.playing) {
    //   try {
    //     console.log('Trying to start background service');
    //     await BackgroundJob.start(taskRandom, options);
    //     alert.log('Successful start!');
    //   } catch (e) {
    //     alert('Error');
    //   }
    // } else {
    //   alert('Stop background service');
    //   await BackgroundJob.stop();
    // }
  };

  async componentDidMount(){
    await BackgroundJob.start(taskRandom, options);
  }

  async componentWillUnmount(){
    await BackgroundJob.stop()
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <TouchableOpacity
                style={{height: 100, width: 100, backgroundColor: 'red'}}
                onPress={this.toggleBackground}></TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
