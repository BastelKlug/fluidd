import { PiniaState, PiniaStateTree } from '../piniaTypes'
import { MeshStore } from './index'

export interface KlipperMesh {
    [index: string]: string | boolean | number[] | number[][] | undefined;
    profile_name: string;
    active: boolean;
    markedForRemoval?: boolean;
    markedForSave?: boolean;
    mesh_max?: number[];
    mesh_min?: number[];
    mesh_matrix?: number[][];
    probed_matrix?: number[][];
}

export interface AppMeshes {
    [index: string]: ProcessedMesh;
}

export interface ProcessedMesh {
    coordinates: MeshCoordinates[];
    variance: number;
    min: number;
    mid: number;
    max: number;
}

export interface MeshCoordinates {
    name: string;
    value: number[];
}

export interface MeshState extends PiniaStateTree {
    variance: number;
    wireframe: boolean;
    scale: number;
    boxScale: number;
    flatSurface: boolean;
    matrix: 'probed_matrix' | 'mesh_matrix';
}

export const state : PiniaState<MeshStore> = () => ({
  variance: 0,
  wireframe: false,
  scale: 0.2,
  boxScale: 2.0,
  flatSurface: false,
  matrix: 'mesh_matrix'
})
