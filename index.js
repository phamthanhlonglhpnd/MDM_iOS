/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
import { LogBox } from "react-native";

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
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
})

PushNotification.setApplicationIconBadgeNumber(0)

AppRegistry.registerComponent(appName, () => App);
