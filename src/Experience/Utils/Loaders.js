import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Loaders
{
    constructor(manager)
    {
        this.textures = new THREE.TextureLoader(manager)
        this.cube = new THREE.CubeTextureLoader(manager)
        this.gltf = new GLTFLoader(manager)
    }
}