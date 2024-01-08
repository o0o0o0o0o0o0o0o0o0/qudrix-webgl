import * as THREE from 'three'
import Loaders from '../Utils/Loaders'

import Textures from './Texture'

export default class Materials
{
    constructor()
    {
        this.textures = new Textures()
        this.loader = new Loaders()

        this.basic = new THREE.MeshStandardMaterial({
            metalness: 0.45,
            roughness: 0.65,
            side: THREE.DoubleSide,
        })

    }



}