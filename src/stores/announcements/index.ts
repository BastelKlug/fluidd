import { defineStore, Store, StoreDefinition } from 'pinia'
import { AnnouncementsState, state } from './state'
import { AnnouncementsActions, actions } from './actions'
import { AnnouncementsGetters, getters } from './getters'

export type AnnouncementsStore = Store<'announcements', AnnouncementsState, AnnouncementsGetters, AnnouncementsActions>
export type AnnouncementsStoreDefinition = StoreDefinition<'announcements', AnnouncementsState, AnnouncementsGetters, AnnouncementsActions>

export const announcements: AnnouncementsStoreDefinition = defineStore('announcements', { state, getters, actions })
