import * as THREE from 'three'

import Textures from './Texture'



export default class Materials
{
    constructor()
    {

        this.textures = new Textures()

        this.wallBlack = new THREE.MeshStandardMaterial({
            color: 0x161616, //0x161616
            metalness: 0,
            roughness: 0.45,
            side: THREE.DoubleSide
        })

        this.roofWhite = new THREE.MeshStandardMaterial({
            color: 0x6E6E6E, 
            metalness: 0.0,
            roughness: 0.45,
            side: THREE.DoubleSide,
            name: 'roofWhite'
        })

        this.glass = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0.1,
            transmission: 50,
            thickness: 5,
            transparent: true,
            // emissive: new THREE.Color(0x0C1414),
            opacity: 0.2,
            side: THREE.BackSide,
            envMap: this.textures.bricksColor,
            envMapIntensity: 1,
            ior: 1.5,
            normalMap: this.textures.paintedBricksNormalGL,
            normalScale: new THREE.Vector2(10, 10)
         
        })


        this.glassWindow = new THREE.MeshPhysicalMaterial({
            metalness: 0.7,
            roughness: 0.5,
            transmission: 1,
            thickness: 2,
            transparent: true,
            // emissive: new THREE.Color(0x0C1414),
            opacity: 0.5,
            side: THREE.DoubleSide,
            // envMap: this.textures.bricksColor,
            // envMapIntensity: 1,
            ior: 5,
            normalMap: this.textures.woodSidingNormalGL,
            normalScale: new THREE.Vector2(0.4, 0.4)
        
        })

    

        this.ground = new THREE.MeshBasicMaterial({
            map: this.textures.groundBakeQ01
        })

        this.groundQ01 = new THREE.MeshBasicMaterial({
            map: this.textures.groundBakeQ01
        })
        this.groundQ02 = new THREE.MeshBasicMaterial({
            map: this.textures.groundBakeQ02
        })

        this.bg = new THREE.MeshBasicMaterial({
            map: this.textures.bg,
            side: THREE.DoubleSide
        })

        this.floorShadow = new THREE.ShadowMaterial({
            opacity: 0.25
        })






    }



}