import { PiniaGetters, PiniaGetterTree } from '../piniaTypes'
import { MeshStore } from './index'
import vuexStore from '@/store'
import { AppMeshes, KlipperMesh } from './state'
import { transformMesh } from '@/util/transform-mesh'

export interface MeshGetters extends PiniaGetterTree {
  getSupportsBedMesh(): any;
  getBedMeshes(): KlipperMesh[];
  getCurrentMeshData(): AppMeshes;
}

export const getters: PiniaGetters<MeshStore> = {

  /**
   * Has this printer been configured for bed meshes?
   */
  getSupportsBedMesh () {
    return vuexStore.getters['printer/getPrinterSettings']('bed_mesh') !== undefined
  },

  /**
   * Returns all available bed meshes, including those only in memory / currently loaded.
   */
  getBedMeshes () {
    const meshes: KlipperMesh[] = []
    const currentProfile = vuexStore.state.printer.printer.bed_mesh.profile_name || ''
    const config = vuexStore.getters['printer/getPrinterConfig']()
    if (vuexStore.state.printer.printer.bed_mesh && currentProfile.length > 0) {
      meshes.push({
        ...vuexStore.state.printer.printer.bed_mesh,
        active: true
      })
    }
    if (config) {
      const meshSettings = Object.keys(config).filter(key => key.startsWith('bed_mesh'))
      for (const key of meshSettings) {
        if (key === 'bed_mesh') continue // The mesh configuration.
        const profile_name = key.split(' ').splice(1).join(' ')
        if (
          profile_name !== currentProfile
        ) {
          const profile: KlipperMesh = {
            profile_name,
            active: false
          }
          meshes.push(profile)
        }
      }
    }
    return meshes.sort((a: KlipperMesh, b: KlipperMesh) => {
      const name1 = a.profile_name.toLowerCase()
      const name2 = b.profile_name.toLowerCase()
      if (a.profile_name === 'default' || b.profile_name === 'default') return 1
      return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0
    })
  },

  /**
   * Returns the current mesh, in a usable format for echarts.
   */
  getCurrentMeshData () {
    return {
      mesh_matrix: transformMesh(vuexStore.state.printer.printer.bed_mesh, 'mesh_matrix'),
      probed_matrix: transformMesh(vuexStore.state.printer.printer.bed_mesh, 'probed_matrix'),
      mesh_matrix_flat: transformMesh(vuexStore.state.printer.printer.bed_mesh, 'mesh_matrix', true),
      probed_matrix_flat: transformMesh(vuexStore.state.printer.printer.bed_mesh, 'probed_matrix', true)
    }
  }
}
