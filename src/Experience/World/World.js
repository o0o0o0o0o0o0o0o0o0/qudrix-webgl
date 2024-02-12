import * as THREE from 'three'

import Experience from "../Experience";

import Lights from './Lights/Lights';
import Camera from '../Camera.js'

import Cube from './Models/Cube';

import Qudrix01 from './Models/Qudrix01';
import Qudrix02 from './Models/Qudrix02';

import DebugWorld from '../Utils/DebugWorld';

let instance = null

export default class World
{
    constructor(data)
    {

        // Singleton
        if (instance)
        {
            return instance
        }
        instance = this

        this.CONFIG = data

        this.experience = new Experience()
        this.materials = this.experience.materials
        this.debug = this.experience.debug
        this.scene = this.experience.scene

        this.lights = new Lights()
        this.camera = new Camera()


        this.cube = new Cube()
        this.qudrix01 = new Qudrix01(this.CONFIG)
        this.qudrix02 = new Qudrix02(this.CONFIG)

        this.buildingGroup = new THREE.Group()
        this.scene.add(this.buildingGroup)

        this.scene.add(
            this.lights.directional,
            // this.lights.directionalHelper,
            // this.lights.directionalCameraShadowHelper,
            
            this.lights.ambient,
        )

        // Add lights
        this.buildingGroup.add(
            this.lights.directionalFill,
            // this.lights.directionalFillHelper,
            this.lights.point,
         
            //  AREALIGHTS
            this.lights.areaLight.key,
            // this.lights.areaLight.keyHelper,
            this.lights.areaLight.top,
            // this.lights.areaLight.topHelper,
            this.lights.areaLight.fill01,
            // this.lights.areaLight.fill01Helper,
            this.lights.areaLight.fill03,
            // this.lights.areaLight.fill03Helper,
            this.lights.areaLight.fill04,
            // this.lights.areaLight.fill04Helper,
        )

        // Add models
        this.buildingGroup.add(
            // this.cube.instance,
            this.qudrix01.instance,
            this.qudrix02.instance,
        )
        if (this.CONFIG.size['element-name'] === 'Q01') { this.qudrix01.instance.scale.set(1, 1, 1) }
        else { this.qudrix01.instance.scale.set(0, 0, 0) }
        if (this.CONFIG.size['element-name'] === 'Q02') { this.qudrix02.instance.scale.set(1, 1, 1) }
        else { this.qudrix02.instance.scale.set(0, 0, 0) }

        this.setBG()
        // this.setShadowCatcher()
        // this.debugShadowCatcher()

        /**
         * Debug world elemetns
         */
        this.debugWorld = new DebugWorld(this.camera.instance)




    }

    setBG()
    {
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(500, 500, 16, 16),
            this.materials.bg
        )
        this.scene.add(this.sphere)
    }

    setShadowCatcher()
    {
        this.shadowCatcher = new THREE.Mesh(
            new THREE.PlaneGeometry(25, 25, 1, 1),
            this.materials.floorShadow
        )
        this.shadowCatcher.scale.set(0, 0, 0)
        this.shadowCatcher.rotation.x = -Math.PI / 2
        this.shadowCatcher.position.y = 0.1
        this.scene.add(this.shadowCatcher)
        this.shadowCatcher.receiveShadow = true

        this.shadowCatcherStatus = {
            shadows: false
        }
    }

    debugShadowCatcher()
    {
        if (this.debug.active)
        {
            this.debug.rendererFolder.add(this.shadowCatcherStatus, 'shadows').name('shadows').onChange((value) =>
            {
                if (this.shadowCatcherStatus.shadows)
                {
                    this.shadowCatcher.scale.set(1, 1, 1)
                }
                if (!this.shadowCatcherStatus.shadows)
                {
                    this.shadowCatcher.scale.set(0, 0, 0)
                }
            })
        }
    }


    update()
    {
        if (this.qudrix01)
        {
            this.qudrix01.update()
        }
        if (this.qudrix02)
        {
            this.qudrix02.update()
        }
    }

}