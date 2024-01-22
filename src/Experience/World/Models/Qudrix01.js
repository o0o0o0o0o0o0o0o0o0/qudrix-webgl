import * as THREE from 'three'
import Loaders from '../../Utils/Loaders'
import Materials from '../../Resources/Materials'


import Experience from '../../Experience'

import StaticModel from './Q01/StaticModel'

import Roof from './Q01/Roof'
import Side01 from './Q01/Side01'
import Side02 from './Q01/Side02'
import Side03 from './Q01/Side03'
import Side04 from './Q01/Side04'
import Attachment from './Q01/Attachment'

import data from '../../../CONFIG.json'
const CONFIG = data

let instance = null

export default class Qudrix01
{
    constructor()
    {

        // Singleton
        if (instance)
        {
            return instance
        }
        instance = this

        this.experience = new Experience()

        this.time = this.experience.time
        this.loader = new Loaders()

        this.materials = this.experience.materials
        this.staticModel = new StaticModel(CONFIG)

        // Debug
        this.debug = this.experience.debug

        this.instance = new THREE.Group()

        /**
         * Ground
         */
        this.loadGround()
        this.shadowCatcherDebug()


        /**
         * Cube
         */

        this.cube = new THREE.Group()
        // this.instance.add(this.cube)
        this.loadCube()

        /**
         * Sphere
         */

        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(30, 30, 16, 16),
            this.materials.bg
        )
        this.instance.add(this.sphere)

        /**
         * Base
         */
        this.base = this.staticModel.base
        this.instance.add(this.base)


        /**
         * Roof
         */
        this.roof = new Roof(CONFIG)
        this.instance.add(this.roof.instance)
        this.roofDebug()

        /**
         * Sides
         */
        this.sides = new THREE.Group()
        this.instance.add(this.sides)

        this.side01 = new Side01(CONFIG)
        this.side02 = new Side02(CONFIG)
        this.side03 = new Side03(CONFIG)
        this.side04 = new Side04(CONFIG)
        this.sides.add(
            this.side01.instance,
            this.side02.instance,
            this.side03.instance,
            this.side04.instance,
        )

        this.side01.instance.rotation.y = 0
        this.side02.instance.rotation.y = - Math.PI / 2
        this.side03.instance.rotation.y = Math.PI
        this.side04.instance.rotation.y = Math.PI / 2


        this.sidesDebug()

        /**
         * Attachment
         */
        this.attachment = new Attachment(CONFIG)
        this.instance.add(this.attachment.instance)

        this.attachmentDebug()

        /**
         * Color 
         */

        this.colorDebug()
    }

    loadGround()
    {
        this.ground = new THREE.Mesh(
            new THREE.PlaneGeometry(25, 25, 1, 1),
            this.materials.ground
        )
        this.ground.rotation.x = - Math.PI / 2
        this.instance.add(this.ground)

        if (CONFIG.attachment['element-name'] === 'None') { this.materials.ground.map = this.materials.textures.groundBake }
        else { this.materials.ground.map = this.materials.textures.groundAttachmentBake }

        this.shadowCatcher = new THREE.Mesh(
            new THREE.PlaneGeometry(25, 25, 1, 1),
            this.materials.floorShadow
        )
        this.shadowCatcher.scale.set(0, 0, 0)
        this.shadowCatcher.rotation.x = -Math.PI / 2
        this.shadowCatcher.position.y = 0.1
        this.instance.add(this.shadowCatcher)
        this.shadowCatcher.receiveShadow = true

        this.shadowCatcherStatus = {
            shadows: false
        }
    }

    shadowCatcherDebug()
    {
        if (this.debug.active)
        {
            this.debug.rendererFolder.add(this.shadowCatcherStatus, 'shadows').name('shadows').onChange((value) =>
            {
                if (this.shadowCatcherStatus.shadows) {
                    this.shadowCatcher.scale.set(1, 1, 1)
                }
                if (!this.shadowCatcherStatus.shadows) {
                    this.shadowCatcher.scale.set(0, 0, 0)
                }
            })
        }
    }

    loadCube()
    {
        this.loader.gltf.load(
            '/3D/cube.glb',
            (gltf) =>
            {
                this.cube.add(gltf.scene)
                gltf.scene.scale.set(0.1, 0.1, 0.1)
                gltf.scene.children[0].children[0].children[0].children[0].material = this.materials.cube
                gltf.scene.position.y += 0

            }
        )
    }

    roofDebug()
    {
        this.roof.setFunctions()

        if (this.debug.active)
        {
            this.debug.roofFolder.add(this.roof.functions, 'addRoofSolidPanels').name('SolidPanels')
            this.debug.roofFolder.add(this.roof.functions, 'addRoofMirrorGlass').name('MirrorGlass')
            this.debug.roofFolder.add(this.roof.functions, 'addRoofPergolaQ25').name('PergolaQ25')
            this.debug.roofFolder.add(this.roof.functions, 'addRoofPergolaQ27').name('PergolaQ27')
            this.debug.pergolaQ27Accessories.add(this.roof.functions, 'removeAccessories').name('No Accessories')
            this.debug.pergolaQ27Accessories.add(this.roof.functions, 'addAccessories').name('Add Sunshade')
        }
    }

    sidesDebug()
    {

        this.side01.setFunctions()
        this.side02.setFunctions()
        this.side03.setFunctions()
        this.side04.setFunctions()

        if (this.debug.active)
        {
            // Side01
            this.debug.side01Folder.add(this.side01.functions, 'addSliderDoor').name('SliderDoor')
            this.debug.side01Folder.add(this.side01.functions, 'addSolidWall').name('SolidWall')
            this.debug.side01Folder.add(this.side01.functions, 'addGlassWindow').name('GlassWindow')
            this.debug.side01Folder.add(this.side01.functions, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side01Folder.add(this.side01.functions, 'addPortalDoor').name('PortalDoor')
            this.debug.side01Folder.add(this.side01.functions, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side01Folder.add(this.side01.functions, 'addSmartGlassWindow').name('SmartGlassWindow')

            // Side02
            this.debug.side02Folder.add(this.side02.functions, 'addSliderDoor').name('SliderDoor')
            this.debug.side02Folder.add(this.side02.functions, 'addSolidWall').name('SolidWall')
            this.debug.side02Folder.add(this.side02.functions, 'addGlassWindow').name('GlassWindow')
            this.debug.side02Folder.add(this.side02.functions, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side02Folder.add(this.side02.functions, 'addPortalDoor').name('PortalDoor')
            this.debug.side02Folder.add(this.side02.functions, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side02Folder.add(this.side02.functions, 'addSmartGlassWindow').name('SmartGlassWindow')

            // Side03
            this.debug.side03Folder.add(this.side03.functions, 'addSliderDoor').name('SliderDoor')
            this.debug.side03Folder.add(this.side03.functions, 'addSolidWall').name('SolidWall')
            this.debug.side03Folder.add(this.side03.functions, 'addGlassWindow').name('GlassWindow')
            this.debug.side03Folder.add(this.side03.functions, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side03Folder.add(this.side03.functions, 'addPortalDoor').name('PortalDoor')
            this.debug.side03Folder.add(this.side03.functions, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side03Folder.add(this.side03.functions, 'addSmartGlassWindow').name('SmartGlassWindow')

            // Side04
            this.debug.side04Folder.add(this.side04.functions, 'addSliderDoor').name('SliderDoor')
            this.debug.side04Folder.add(this.side04.functions, 'addSolidWall').name('SolidWall')
            this.debug.side04Folder.add(this.side04.functions, 'addGlassWindow').name('GlassWindow')
            this.debug.side04Folder.add(this.side04.functions, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side04Folder.add(this.side04.functions, 'addPortalDoor').name('PortalDoor')
            this.debug.side04Folder.add(this.side04.functions, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side04Folder.add(this.side04.functions, 'addSmartGlassWindow').name('SmartGlassWindow')

        }
    }

    attachmentDebug()
    {
        this.attachment.setFunctions()


        if (this.debug.active)
        {
            // Attachment
            this.debug.attachmentFolder.add(this.attachment.functions, 'addAutomaticAwing').name('AutomaticAwing')
            this.debug.attachmentFolder.add(this.attachment.functions, 'addBioclimacticPergola').name('BioclimacticPergola')
            this.debug.attachmentFolder.add(this.attachment.functions, 'removeAttachment').name('removeAttachment')
        }
    }

    colorDebug()
    {
        this.staticModel.setFunctions()

        if (this.debug.active)
        {
            this.debug.colorFolder.add(this.staticModel.functions, 'blackColor')
            this.debug.colorFolder.add(this.staticModel.functions, 'creamColor')

        }
    }

    updateSides()
    {
        this.side01.update()
        this.side02.update()
        this.side03.update()
        this.side04.update()
    }


    update()
    {
        this.roof.update()
        this.updateSides()
        this.attachment.update()
    }
}

