import { NotificationType } from "../types/types";

export function isNotificationsRead(notificatons: Array<NotificationType>) {
    if (notificatons.filter((notification) => notification.status === 'read').length === 0) {
        return true;
    } else {
        return false;
    }
}