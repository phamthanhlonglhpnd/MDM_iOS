/**
 * @format
 */

import {AppRegistry} from 'react-native';
import RootNavigation from './app/components/navigation/RootNavigation';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {LogBox} from "react-native";

LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])
LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
])
 
 // Must be outside of any component LifeCycle (such as `componentDidMount`).
 PushNotification.configure({
     onNotification: function (notification) {
        //  console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
       },
       permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
     requestPermissions: Platform.OS === 'ios'
 })


AppRegistry.registerComponent(appName, () => RootNavigation);
