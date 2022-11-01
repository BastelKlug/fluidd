import { SocketActions } from '@/api/socketActions'
import { PiniaActions, PiniaActionTree } from '../piniaTypes'
import { AnnouncementsStore } from './index'
import { Announcement, AnnouncementsState } from './state'
import Vue from 'vue'

export interface AnnouncementsActions extends PiniaActionTree {
  reset (): Promise<void>;
  init (): Promise<void>;
  onAnnouncementsList (payload:any): Promise<void>;
  onAnnouncementUpdate (payload:any): Promise<void>;
  onAnnouncementDismissed (payload:any): Promise<void>;
  onAnnouncementWake (payload:any): Promise<void>;
  dismiss (payload:any): Promise<void>;
  dismissAll (): Promise<void>;
}

export const actions: PiniaActions<AnnouncementsStore> = {
  async reset () {
    this.$reset()
  },
  async init () {
    SocketActions.serverAnnouncementsList()
  },

  async onAnnouncementsList (payload:any) {
    if (payload) {
      setAnnouncementsList(this, payload)
    }
  },

  async onAnnouncementUpdate (payload:any) {
    if (payload) {
      setAnnouncementsList(this, payload)
    }
  },

  async onAnnouncementDismissed (payload:any) {
    if (payload) {
      setAnnouncementDismissed(this, { entry_id: payload.entry_id, dismissed: true })
    }
  },

  async onAnnouncementWake (payload:any) {
    if (payload) {
      setAnnouncementDismissed(this, { entry_id: payload.entry_id, dismissed: false })
    }
  },

  async dismiss (payload:any) {
    SocketActions.serverAnnouncementsDismiss(payload.entry_id, payload.wake_time)
  },

  async dismissAll () {
    const entries = [...this.entries]

    entries.forEach(async (entry: Announcement) => await SocketActions.serverAnnouncementsDismiss(entry.entry_id))
  }
}

function setAnnouncementsList (store:any, payload: AnnouncementsState) {
  if (payload.entries) Vue.set(store, 'entries', payload.entries)
  if (payload.feeds) Vue.set(store, 'feeds', payload.feeds)
}

function setAnnouncementDismissed (store:any, payload: { entry_id: string, dismissed: boolean }) {
  const entries = [...store.entries]

  const entry = entries.find(entry => entry.entry_id === payload.entry_id)
  if (entry) {
    entry.dismissed = payload.dismissed

    if (!payload.dismissed) {
      entry.date_dismissed = null
      entry.dismiss_wake = null
    } else {
      entry.date_dismissed = new Date().getTime()
    }
  }

  Vue.set(store, 'entries', entries)
}
