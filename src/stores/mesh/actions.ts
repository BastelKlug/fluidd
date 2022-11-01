import { PiniaActions, PiniaActionTree } from '../piniaTypes'
import { MeshStore } from './index'

export interface MeshActions extends PiniaActionTree {
    reset (): Promise<void>;
    onMatrix (payload:any): Promise<void>;
    onScale (payload:any): Promise<void>;
    onBoxScale (payload:any): Promise<void>;
    onWireframe (payload:any): Promise<void>;
    onFlatSurface (payload:any): Promise<void>;

}

export const actions: PiniaActions<MeshStore> = {
  async reset () {
    this.$reset()
  },

  async onMatrix (payload) {
    this.matrix = payload
  },

  async onScale (payload) {
    this.scale = payload
  },

  async onBoxScale (payload) {
    this.boxScale = payload
  },

  async onWireframe (payload) {
    this.wireframe = payload
  },

  async onFlatSurface (payload) {
    this.flatSurface = payload
  }
}
