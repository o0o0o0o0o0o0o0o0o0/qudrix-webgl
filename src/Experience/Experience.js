import * as THREE from 'three'

import Debug from './Utils/Debug';

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
    constructor(canvas)
    {

        // Singleton
        if (instance)
        {
            return instance
        }
        instance = this

        this.canvas = canvas

        this.debug = new Debug()

        this.textures = new Textures()
        this.materials = new Materials()

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.axesHelper = new THREE.AxesHelper(5)
        this.scene.add(this.axesHelper)

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
        this.scene.environment = this.textures.bg

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




