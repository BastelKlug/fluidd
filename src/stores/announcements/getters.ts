import { PiniaGetters, PiniaGetterTree } from '../piniaTypes'
import { AnnouncementsStore } from './index'

export interface AnnouncementsGetters extends PiniaGetterTree {
  getAnnouncements(): any;
}

export const getters: PiniaGetters<AnnouncementsStore> = {
  getAnnouncements (state) {
    return state.entries.filter(announcement => !announcement.dismissed)
  }
}
