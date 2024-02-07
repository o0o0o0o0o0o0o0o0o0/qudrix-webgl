import * as THREE from 'three'
import Loaders from '../../Utils/Loaders'
import Materials from '../../Resources/Materials'


import Experience from '../../Experience'

import StaticModel from './Q02/Q02StaticModel'

import Roof from './Q02/Q02Roof'
import Side01 from './Q02/Q02Side01'
import Side02 from './Q02/Q02Side02'
import Side03 from './Q02/Q02Side03'
import Side04 from './Q02/Q02Side04'
import Attachment from './Q02/Q02Attachment'
import Lights from './Q02/Q02Lights'

let instance = null

export default class Qudrix02
{
    constructor(CONFIG)
    {

        // Singleton
        if (instance)
        {
            return instance
        }
        instance = this

        this.experience = new Experience()

        this.time = this.experience.time
        this.manager = this.experience.manager
        this.loader = new Loaders(this.manager.loadingManager)

        this.materials = this.experience.materials
        this.staticModel = new StaticModel(CONFIG)

        // Debug
        this.debug = this.experience.debug

        this.instance = new THREE.Group()

        /**
         * Ground
         */
        this.loadGround(CONFIG)

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

        /**
         * Attachment
         */
        this.attachment = new Attachment(CONFIG)
        this.instance.add(this.attachment.instance)

        /**
         * Lights
         */
        this.lights = new Lights(CONFIG)
        this.instance.add(this.lights.instance)

        /**
         * Color 
         */

        // this.colorDebug()
    }

    loadGround(CONFIG)
    {
        this.ground = new THREE.Mesh(
            new THREE.PlaneGeometry(25, 25, 1, 1),
            this.materials.groundQ02
        )
        this.ground.rotation.x = - Math.PI / 2
        this.instance.add(this.ground)

        if (CONFIG.attachment['element-name'] === 'None') { this.materials.groundQ02.map = this.materials.textures.groundBakeQ02 }
        else { this.materials.groundQ02.map = this.materials.textures.groundAttachmentBakeQ02 }

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

