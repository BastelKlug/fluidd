import { PiniaGetters, PiniaGetterTree } from '../piniaTypes'
import { NotificationsStore } from './index'
import { announcements } from '@/stores'
import { Announcement } from '@/stores/announcements/state'
import { AppNotification } from './state'

export interface NotificationsGetters extends PiniaGetterTree {
  getNotifications(): any;
  getAnnouncementsAsNotifications(): any;
}

export const getters: PiniaGetters<NotificationsStore> = {
  getNotifications (state) {
    let notifications = [...state.notifications].sort((a, b) => {
      return b.timestamp - a.timestamp
    })

    notifications = notifications.concat(this.getAnnouncementsAsNotifications)

    // Easier to read.
    return [
      ...notifications.filter(n => n.type === 'error'),
      ...notifications.filter(n => n.type !== 'error')
    ]
  },
  getAnnouncementsAsNotifications () {
    const store = announcements()
    const getAnnouncements = store.getAnnouncements

    return getAnnouncements.map((a: Announcement) => ({
      id: a.entry_id,
      type: 'announcement',
      to: a.url,
      title: a.title,
      description: a.description,
      timestamp: a.date,
      clear: true,
      merge: true
    } as AppNotification))
  }
}
