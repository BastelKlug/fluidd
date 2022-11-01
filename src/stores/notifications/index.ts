import { defineStore, Store, StoreDefinition } from 'pinia'
import { NotificationsState, state } from './state'
import { NotificationsActions, actions } from './actions'
import { NotificationsGetters, getters } from './getters'

export type NotificationsStore = Store<'notifications', NotificationsState, NotificationsGetters, NotificationsActions>
export type NotificationsStoreDefinition = StoreDefinition<'notifications', NotificationsState, NotificationsGetters, NotificationsActions>

export const notifications: NotificationsStoreDefinition = defineStore('notifications', { state, getters, actions })
