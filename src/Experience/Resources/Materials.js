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
            color: 0x808080, //0x161616
            metalness: 0.8,
            roughness: 0.4,
            envMapIntensity: 2,
            side: THREE.DoubleSide,
        })
        this.wallWhite.envMap = this.textures.environmentMap_02


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
        this.mirrorGlass.envMap = this.textures.environmentMap_04
        this.mirrorGlass.envMapIntensity = 1

        this.sidesGlass = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('white'),
            metalness: 1,
            roughness: 0,
            transmission: 1,
            thickness: 5,
            transparent: true,
            // emissive: new THREE.Color(0x0C1414),
            opacity: 0.5,
            // side: THREE.DoubleSide,
            envMap: this.textures.environmentMap_04,
            envMapIntensity: 1.5,
            ior: 3,
            clearcoat: 1,
            clearcoatRoughness: 0,
            // normalMap: this.textures.paintedPlasterNormalGL,
            // normalScale: new THREE.Vector2(1, 1)
            depthWrite: false,
        })

        this.accordionDoorGlass = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('white'),
            metalness: 1,
            roughness: 0.3,
            transmission: 0,
            thickness: 0,
            transparent: true,
            // emissive: new THREE.Color(0x0C1414),
            opacity: 0.5,
            side: THREE.DoubleSide,
            envMap: this.textures.environmentMap_04,
            envMapIntensity: 1,
            ior: 1.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
            // normalMap: this.textures.paintedPlasterNormalGL,
            // normalScale: new THREE.Vector2(1, 1),
            depthWrite: false,
        })


        this.sunscreen = new THREE.MeshBasicMaterial()
        this.sunscreen.map = this.textures.mosquito
        this.sunscreen.color = new THREE.Color(0x262626)
        this.sunscreen.transparent = true
        this.sunscreen.alphaMap = this.textures.mosquitoOpacity
        this.sunscreen.format = THREE.RGBFormat
        this.sunscreen.depthWrite = false

        this.mosquito = new THREE.MeshBasicMaterial()
        // this.mosquito.map = this.textures.mosquito
        this.mosquito.color = new THREE.Color('darkgreen')
        this.mosquito.transparent = true
        this.mosquito.opacity = 0.5
        // this.mosquito.alphaMap = this.textures.mosquitoOpacity
        this.mosquito.depthWrite = false

        // this.sunscreen.side = THREE.DoubleSide


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