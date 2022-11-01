import { GetterTree } from 'vuex'
import { AppNotification, NotificationsState } from './types'
import { Announcement } from '@/stores/announcements/state'
import { RootState } from '../types'
import { announcements } from '@/stores'

export const getters: GetterTree<NotificationsState, RootState> = {
  getNotifications: (state, getters) => {
    // Sort by datestamp, most recent first.
    let notifications = [...state.notifications].sort((a, b) => {
      return b.timestamp - a.timestamp
    })

    notifications = notifications.concat(getters.getAnnouncementsAsNotifications)

    // Easier to read.
    return [
      ...notifications.filter(n => n.type === 'error'),
      ...notifications.filter(n => n.type !== 'error')
    ]
  },

  getAnnouncementsAsNotifications: () => {
    const announcementsStore = announcements()
    const getAnnouncements = announcementsStore.getAnnouncements
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
