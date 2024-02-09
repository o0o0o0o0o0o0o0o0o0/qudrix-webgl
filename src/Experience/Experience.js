import * as THREE from 'three'

import Debug from './Utils/Debug';
import Manager from './Utils/Manager';

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';

import Textures from './Resources/Texture';
import Materials from './Resources/Materials';

let instance = null

export default class Experience
{
    constructor(canvas, data)
    {

        // Singleton
        if (instance)
        {
            return instance
        }
        instance = this

        this.canvas = canvas

        this.CONFIG = data

        this.debug = new Debug()
        this.manager = new Manager()

        this.textures = new Textures()
        this.materials = new Materials()

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        // this.cubeMaterial = new THREE.MeshPhongMaterial({ color: 'grey' })
        // this.cubeMaterial.roughness = 0.0
        // this.cubeMaterial.metalness = 1.0
        // // this.cubeMaterial.envMap = this.textures.environmentMap
        // // this.cubeMaterial.envMapIntensity = 1.0
        // this.cube = new THREE.Mesh(
        //     new THREE.BoxGeometry(5, 5, 5),
        //     this.cubeMaterial
        // )

        // if (this.debug.active) {
        //     this.debug.materialFolder.add(this.cubeMaterial, 'roughness', 0, 1, 0.01).name('Roughness')
        //     this.debug.materialFolder.add(this.cubeMaterial, 'metalness', 0, 1, 0.01).name('Metalness')
        //     // this.debug.materialFolder.add(this.cubeMaterial, 'envMapIntensity', 0, 10, 0.01).name('EnvMapIntensity')
        // }
        // this.cube.position.y = 4
        // this.scene.add(this.cube)

        this.world = new World(this.CONFIG)
        this.camera = this.world.camera
        // this.camera = new Camera()  
        this.renderer = new Renderer()
        // this.camera = this.world.camera

        this.axesHelper = new THREE.AxesHelper(5)
        // this.scene.add(this.axesHelper)

        this.setEnvMap()

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.time.on('tick', () =>
        {
            this.update()
        })

    }

    setEnvMap()
    {
        // this.scene.background = this.textures.environmentMap
        this.scene.background = new THREE.Color(0x888988)
        // this.scene.environment = this.textures.bg
        this.scene.environment = this.textures.environmentMap

        this.scene.backgroundBlurriness = 0
        this.scene.backgroundIntensity = 2
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}



