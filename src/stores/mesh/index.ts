import { defineStore, Store, StoreDefinition } from 'pinia'
import { MeshState, state } from './state'
import { MeshActions, actions } from './actions'
import { MeshGetters, getters } from './getters'

export type MeshStore = Store<'mesh', MeshState, MeshGetters, MeshActions>
export type MeshStoreDefinition = StoreDefinition<'mesh', MeshState, MeshGetters, MeshActions>

export const mesh: MeshStoreDefinition = defineStore('mesh', { state, getters, actions })
