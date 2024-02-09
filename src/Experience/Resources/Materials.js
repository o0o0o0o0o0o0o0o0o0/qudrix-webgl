import * as THREE from 'three'

import Experience from '../Experience'
import Textures from './Texture'



export default class Materials
{
    constructor()
    {

        this.experience = new Experience()
        this.debug = this.experience.debug

        this.textures = new Textures()

        this.wallBlack = new THREE.MeshStandardMaterial({
            color: 0x161616, //0x161616
            metalness: 0,
            roughness: 0.45,
            side: THREE.DoubleSide,
            name: 'wallBlack'
        })

        this.wallWhite = new THREE.MeshStandardMaterial({
            color: 0x595959, //0x161616
            metalness: 0.43,
            roughness: 0.46,
            envMapIntensity: 2,
            side: THREE.DoubleSide,
            name: 'wallWhite'
        })
        this.wallWhite.envMap = this.textures.environmentMap02


        this.mirrorGlass = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0.0,
            transparent: true,
            opacity: 0.9,
            side: THREE.FrontSide,
            ior: 1.5,
            // normalMap: this.textures.paintedPlasterNormalGL,
            // normalScale: new THREE.Vector2(0.2, 0.2)
        })
        // this.mirrorGlass.envMap = this.textures.environmentMap02
        // this.mirrorGlass.envMapIntensity = 1

        this.sidesGlass = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('white'),
            map: this.textures.environmentMapSidesGlass,
            metalness: 1,
            roughness: 1,
            transmission: 0,
            thickness: 0,
            transparent: true,
            // emissive: new THREE.Color(0x0C1414),
            opacity: 0.24,
            side: THREE.DoubleSide,
            envMap: this.textures.environmentMapSidesGlass,
            envMapIntensity: 1,
            ior: 1,
            clearcoat: 1,
            clearcoatRoughness: 0,
            normalMap: this.textures.paintedPlasterNormalGL,
            normalScale: new THREE.Vector2(1, 1)
        })

        // this.sidesGlass = new THREE.MeshStandardMaterial({
        //     color: 0x161616, //0x161616
        //     metalness: 0,
        //     roughness: 0.45,
        //     side: THREE.DoubleSide,
        //     transparent: true,
        //     opacity: 0
        // })







        this.sunscreen = new THREE.MeshStandardMaterial({
            color: 0x161616, //0x161616
            map: this.textures.gridMosquito,
            metalness: 0,
            roughness: 0.45,
            transparent: true,
            // alphaMap: this.textures.gridMosquito,
            // opacity: 0.9
        })

        this.roofWhite = new THREE.MeshStandardMaterial({
            color: 0x6E6E6E,
            metalness: 0.0,
            roughness: 0.45,
            side: THREE.DoubleSide,
            name: 'roofWhite',
            transparent: false,
            opacity: 0.15
        })

        this.roofWhitePergola27 = new THREE.MeshStandardMaterial({
            color: 0x6E6E6E,
            metalness: 0.0,
            roughness: 0.45,
            side: THREE.DoubleSide,
            name: 'roofWhite',
            transparent: false,
            opacity: 0.15
        })

        this.glass = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0.1,
            transmission: 50,
            thickness: 5,
            transparent: true,
            // emissive: new THREE.Color(0x0C1414),
            opacity: 0.2,
            side: THREE.DoubleSide,
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
            // thickness: 0,
            transparent: true,
            // emissive: new THREE.Color(0x0C1414),
            opacity: 0.3,
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