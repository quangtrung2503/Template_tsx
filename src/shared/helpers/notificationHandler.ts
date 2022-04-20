import NavigationService from './navigationService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { DeviceEventEmitter, EmitterSubscription, Platform } from 'react-native';
import PushNotification, { ReceivedNotification } from 'react-native-push-notification';
import { v4 as uuidv4 } from 'uuid';
import NotificationHelper from './notificationHelper';
import { EmitType } from './constant';
import { RouteNames } from "./routes";
import { appState } from '../App';
import { ListSuggestHeaderKey } from '../screens/ListSuggest';

export interface INotificationOpenData {
    collapse_key?: string,
    dataId?: string,
    dataTypeId?: string,
    from?: string,
    messageId?: string,
    messageTypeId?: string,
}
export interface INotificationHandler {
    onMessage: (message: FirebaseMessagingTypes.RemoteMessage) => void;
    onNotificationDisplayed?: (notification: any) => void;
    onNotificationOpened?: (notificationOpen: ReceivedNotification, isForeground: boolean) => void;
}

export enum NotiMessTypeId {
    RequestPending = '47', RequestReject = '49', RequestApprove = '50', EmotionToAPost = '41316', TagInACommentOfPost = '41317',
    EmotionToACommentOfPost = '41318', TagInACommentOfRequest = '41319', EmotionToCommentOfRequest = '41320', HasPayslip = '41321',
};
export default class DefaultNotificationHandler implements INotificationHandler {
    subscription?: EmitterSubscription;

    onMessage = (notification: FirebaseMessagingTypes.RemoteMessage) => {
        // DeviceEventEmitter.emit(EmitType.RefreshNotification);
        this.displayNotification(notification);
    };

    /**
     * when app state is ready
     * process navigation of deeplink
     */
    handleOpenNotification = (_notificationOpen: ReceivedNotification) => {
        const data: INotificationOpenData = _notificationOpen?.data;
        const type = data?.messageTypeId;
        const dataId = data?.dataId;
        const messageId = data?.messageId;
        let key: ListSuggestHeaderKey;
        switch (type) {
            case NotiMessTypeId.RequestPending:
                key = 'waitBrowse';
                NavigationService.navigate(RouteNames.SuggestScreen, { key: key });
                break;
            case NotiMessTypeId.RequestReject:
                key = 'denyBrowse';
                NavigationService.navigate(RouteNames.SuggestScreen, { key: key });
                break;
            case NotiMessTypeId.RequestApprove:
                key = 'finishBrowse';
                NavigationService.navigate(RouteNames.SuggestScreen, { key: key });
                break;
            case NotiMessTypeId.EmotionToAPost:
            case NotiMessTypeId.TagInACommentOfPost:
            case NotiMessTypeId.EmotionToACommentOfPost:
            case NotiMessTypeId.TagInACommentOfRequest:
            case NotiMessTypeId.EmotionToCommentOfRequest:
                NavigationService.navigate(RouteNames.newDetailScreen, { id: dataId });
                break;
            case NotiMessTypeId.HasPayslip:
                NavigationService.navigate(RouteNames.PaycheckScreen);
                break;
            default:
                break;
        }
    };

    onNotificationOpened = (notificationOpen: ReceivedNotification, isForeground: boolean) => {
        console.info('Opened Notification: ', notificationOpen);
        console.info('isForeground: ', isForeground);

        /**
         * Using emitter when open notif from background
         * Wait until all setup steps are done
         */
        if (!isForeground) {
            this.subscription?.remove();
            if (appState.readyForAuth) { // check app state is ready
                this.handleOpenNotification(notificationOpen);
            } else {
                this.subscription = DeviceEventEmitter.addListener(EmitType.AppReadyForAuth, () => {
                    console.info('app init success emit');
                    this.handleOpenNotification(notificationOpen);
                });
            }
        } else {
            this.handleOpenNotification(notificationOpen);
        }
    };

    displayNotification = (notification: FirebaseMessagingTypes.RemoteMessage) => {
        const payload = notification?.data || {};
        const notificationContent = notification?.notification || {};
        console.info('display noti: ', notification);
        if (notificationContent && notificationContent.body && notificationContent.title) {
            if (Platform.OS === 'ios') {
                PushNotificationIOS.addNotificationRequest({
                    id: uuidv4(),
                    body: notificationContent.body,
                    title: notificationContent.title,
                    userInfo: payload
                });
            } else {
                PushNotification.presentLocalNotification({
                    message: notificationContent.body,
                    title: notificationContent.title,
                    userInfo: payload,
                    channelId: NotificationHelper.NOTIFICATION_CHANNEL
                });
            }
        }
    };
}
