import * as THREE from 'three'

import Experience from "../Experience";

import Lights from './Lights/Lights';

import Cube from './Models/Cube';

import Qudrix01 from './Models/Qudrix01';
import Qudrix02 from './Models/Qudrix02';

import data from '../../CONFIG.json'
const CONFIG = data

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.materials = this.experience.materials
        this.debug = this.experience.debug
        this.scene = this.experience.scene

        this.lights = new Lights()

        this.cube = new Cube()
        this.qudrix01 = new Qudrix01(CONFIG)
        this.qudrix02 = new Qudrix02(CONFIG)

        // Add lights
        this.scene.add(
            this.lights.directional,
            // this.lights.directionalHelper,
            // this.lights.directionalCameraShadowHelper,
            this.lights.ambient,
            this.lights.areaLight.key,
            // this.lights.areaLight.keyHelper,
            this.lights.areaLight.top,
            // this.lights.areaLight.topHelper,
        )

        // Add models
        this.scene.add(
            this.cube.instance,
            this.qudrix01.instance,
            this.qudrix02.instance,
        )
        if (CONFIG.size['element-name'] === 'Q01') { this.qudrix01.instance.scale.set(1, 1, 1) }
        else { this.qudrix01.instance.scale.set(0, 0, 0) }
        if (CONFIG.size['element-name'] === 'Q02') { this.qudrix02.instance.scale.set(1, 1, 1) }
        else { this.qudrix02.instance.scale.set(0, 0, 0) }

        this.setBG()
        this.setShadowCatcher()
        this.debugShadowCatcher()

        this.debugSizes()
        this.debugRoof()

    }

    setBG()
    {
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(30, 30, 16, 16),
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

    setFunctions()
    {
        this.functions = {}
        this.functions.setQ01 = () =>
        {
            this.qudrix01.instance.scale.set(1, 1, 1)
            this.qudrix02.instance.scale.set(0, 0, 0)
        }
        this.functions.setQ02 = () =>
        {
            this.qudrix01.instance.scale.set(0, 0, 0)
            this.qudrix02.instance.scale.set(1, 1, 1)
        }
    }

    debugSizes()
    {
        this.setFunctions()
        if (this.debug.active)
        {
            this.debug.sizeFolder.add(this.functions, 'setQ01').name('Q01')
            this.debug.sizeFolder.add(this.functions, 'setQ02').name('Q02')
        }
    }

    debugRoof()
    {
        console.log(this.qudrix01.roof.functions);
        this.functionsRoof = {}
        this.functionsRoof.addRoofSolidPanels = () =>
        {
            this.qudrix01.roof.functions.addRoofSolidPanels()
            this.qudrix02.roof.functions.addRoofSolidPanels()
        }
        this.functionsRoof.addRoofMirrorGlass = () =>
        {
            this.qudrix01.roof.functions.addRoofMirrorGlass()
            this.qudrix02.roof.functions.addRoofMirrorGlass()
        }
        this.functionsRoof.addRoofPergolaQ25 = () =>
        {
            this.qudrix01.roof.functions.addRoofPergolaQ25()
            this.qudrix02.roof.functions.addRoofPergolaQ25()
        }
        this.functionsRoof.addRoofPergolaQ27 = () =>
        {
            this.qudrix01.roof.functions.addRoofPergolaQ27()
            this.qudrix02.roof.functions.addRoofPergolaQ27()
        }
        this.functionsRoof.removeAccessories = () =>
        {
            this.qudrix01.roof.functions.removeAccessories()
            this.qudrix02.roof.functions.removeAccessories()
        }
        this.functionsRoof.addAccessories = () =>
        {
            this.qudrix01.roof.functions.addAccessories()
            this.qudrix02.roof.functions.addAccessories()
        }

        if (this.debug.active)
        {
            this.debug.roofFolder.add(this.functionsRoof, 'addRoofSolidPanels').name('SolidPanels')
            this.debug.roofFolder.add(this.functionsRoof, 'addRoofMirrorGlass').name('MirrorGlass')
            this.debug.roofFolder.add(this.functionsRoof, 'addRoofPergolaQ25').name('PergolaQ25')
            this.debug.roofFolder.add(this.functionsRoof, 'addRoofPergolaQ27').name('PergolaQ27')
            this.debug.pergolaQ27Accessories.add(this.functionsRoof, 'removeAccessories').name('No Accessories')
            this.debug.pergolaQ27Accessories.add(this.functionsRoof, 'addAccessories').name('Add Sunshade')
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