import * as THREE from 'three'
import Loaders from '../Utils/Loaders'

import Textures from './Texture'



export default class Materials
{
    constructor()
    {

        this.wallPhysicMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x161616, //0x161616
            metalness: 0,
            roughness: 0.45
        })


        this.textures = new Textures()
        this.loader = new Loaders()

        this.basic = new THREE.MeshStandardMaterial({
            metalness: 0.45,
            roughness: 0.65,
            side: THREE.DoubleSide,
        })

        this.glass = new THREE.MeshPhysicalMaterial({
            metalness: 0.8,
            roughness: 0.2,
            transmission: 0.8,
            thickness: 0.1,
            transparent: true,
            emissive: new THREE.Color(0x0C1414),
            opacity: 0.8,
            side: THREE.DoubleSide
        })

        this.glassWindow = new THREE.MeshPhysicalMaterial({
            metalness: 0.8,
            roughness: 0.05,
            transmission: 0.8,
            thickness: 0.1,
            transparent: true,
            emissive: new THREE.Color(0x0C1414),
            opacity: 0.5,
            side: THREE.DoubleSide
        })


    }



}