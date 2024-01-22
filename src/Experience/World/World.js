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

        /**
         * Debug elements
         */
        this.debugSizes()
        this.debugRoof()
        this.debugSide01()
        this.debugSide02()
        this.debugSide03()
        this.debugSide04()
        this.debugAttachment()

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

    setFunctionsSide01()
    {
        this.functionsSide01 = {}

        this.functionsSide01.addSliderDoor = () =>
        {
            this.qudrix01.side01.functions.addSliderDoor()
            this.qudrix02.side01.functions.addSliderDoor()
        }
        this.functionsSide01.addSolidWall = () =>
        {
            this.qudrix01.side01.functions.addSolidWall()
            this.qudrix02.side01.functions.addSolidWall()
        }
        this.functionsSide01.addGlassWindow = () =>
        {
            this.qudrix01.side01.functions.addGlassWindow()
            this.qudrix02.side01.functions.addGlassWindow()
        }
        this.functionsSide01.addGuillotineWindow = () =>
        {
            this.qudrix01.side01.functions.addGuillotineWindow()
            this.qudrix02.side01.functions.addGuillotineWindow()
        }
        this.functionsSide01.addPortalDoor = () =>
        {
            this.qudrix01.side01.functions.addPortalDoor()
            this.qudrix02.side01.functions.addPortalDoor()
        }
        this.functionsSide01.addAccordionDoor = () =>
        {
            this.qudrix01.side01.functions.addAccordionDoor()
            this.qudrix02.side01.functions.addAccordionDoor()
        }
        this.functionsSide01.addSmartGlassWindow = () =>
        {
            this.qudrix01.side01.functions.addSmartGlassWindow()
            this.qudrix02.side01.functions.addSmartGlassWindow()
        }

    }

    setFunctionsSide02()
    {
        this.functionsSide02 = {}

        this.functionsSide02.addSliderDoor = () =>
        {
            this.qudrix01.side02.functions.addSliderDoor()
            this.qudrix02.side02.functions.addSliderDoor()
        }
        this.functionsSide02.addSolidWall = () =>
        {
            this.qudrix01.side02.functions.addSolidWall()
            this.qudrix02.side02.functions.addSolidWall()
        }
        this.functionsSide02.addGlassWindow = () =>
        {
            this.qudrix01.side02.functions.addGlassWindow()
            this.qudrix02.side02.functions.addGlassWindow()
        }
        this.functionsSide02.addGuillotineWindow = () =>
        {
            this.qudrix01.side02.functions.addGuillotineWindow()
            this.qudrix02.side02.functions.addGuillotineWindow()
        }
        this.functionsSide02.addPortalDoor = () =>
        {
            this.qudrix01.side02.functions.addPortalDoor()
            this.qudrix02.side02.functions.addPortalDoor()
        }
        this.functionsSide02.addAccordionDoor = () =>
        {
            this.qudrix01.side02.functions.addAccordionDoor()
            this.qudrix02.side02.functions.addAccordionDoor()
        }
        this.functionsSide02.addSmartGlassWindow = () =>
        {
            this.qudrix01.side02.functions.addSmartGlassWindow()
            this.qudrix02.side02.functions.addSmartGlassWindow()
        }

    }

    setFunctionsSide03()
    {
        this.functionsSide03 = {}

        this.functionsSide03.addSliderDoor = () =>
        {
            this.qudrix01.side03.functions.addSliderDoor()
            this.qudrix02.side03.functions.addSliderDoor()
        }
        this.functionsSide03.addSolidWall = () =>
        {
            this.qudrix01.side03.functions.addSolidWall()
            this.qudrix02.side03.functions.addSolidWall()
        }
        this.functionsSide03.addGlassWindow = () =>
        {
            this.qudrix01.side03.functions.addGlassWindow()
            this.qudrix02.side03.functions.addGlassWindow()
        }
        this.functionsSide03.addGuillotineWindow = () =>
        {
            this.qudrix01.side03.functions.addGuillotineWindow()
            this.qudrix02.side03.functions.addGuillotineWindow()
        }
        this.functionsSide03.addPortalDoor = () =>
        {
            this.qudrix01.side03.functions.addPortalDoor()
            this.qudrix02.side03.functions.addPortalDoor()
        }
        this.functionsSide03.addAccordionDoor = () =>
        {
            this.qudrix01.side03.functions.addAccordionDoor()
            this.qudrix02.side03.functions.addAccordionDoor()
        }
        this.functionsSide03.addSmartGlassWindow = () =>
        {
            this.qudrix01.side03.functions.addSmartGlassWindow()
            this.qudrix02.side03.functions.addSmartGlassWindow()
        }

    }

    setFunctionsSide04()
    {
        this.functionsSide04 = {}

        this.functionsSide04.addSliderDoor = () =>
        {
            this.qudrix01.side04.functions.addSliderDoor()
            this.qudrix02.side04.functions.addSliderDoor()
        }
        this.functionsSide04.addSolidWall = () =>
        {
            this.qudrix01.side04.functions.addSolidWall()
            this.qudrix02.side04.functions.addSolidWall()
        }
        this.functionsSide04.addGlassWindow = () =>
        {
            this.qudrix01.side04.functions.addGlassWindow()
            this.qudrix02.side04.functions.addGlassWindow()
        }
        this.functionsSide04.addGuillotineWindow = () =>
        {
            this.qudrix01.side04.functions.addGuillotineWindow()
            this.qudrix02.side04.functions.addGuillotineWindow()
        }
        this.functionsSide04.addPortalDoor = () =>
        {
            this.qudrix01.side04.functions.addPortalDoor()
            this.qudrix02.side04.functions.addPortalDoor()
        }
        this.functionsSide04.addAccordionDoor = () =>
        {
            this.qudrix01.side04.functions.addAccordionDoor()
            this.qudrix02.side04.functions.addAccordionDoor()
        }
        this.functionsSide04.addSmartGlassWindow = () =>
        {
            this.qudrix01.side04.functions.addSmartGlassWindow()
            this.qudrix02.side04.functions.addSmartGlassWindow()
        }

    }

    debugSide01()
    {
        this.setFunctionsSide01()

        if (this.debug.active) {
            this.debug.side01Folder.add(this.functionsSide01, 'addSliderDoor').name('SliderDoor')
            this.debug.side01Folder.add(this.functionsSide01, 'addSolidWall').name('SolidWall')
            this.debug.side01Folder.add(this.functionsSide01, 'addGlassWindow').name('GlassWindow')
            this.debug.side01Folder.add(this.functionsSide01, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side01Folder.add(this.functionsSide01, 'addPortalDoor').name('PortalDoor')
            this.debug.side01Folder.add(this.functionsSide01, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side01Folder.add(this.functionsSide01, 'addSmartGlassWindow').name('SmartGlassWindow')
        }

    }

    debugSide02()
    {
        this.setFunctionsSide02()

        if (this.debug.active) {
            this.debug.side02Folder.add(this.functionsSide02, 'addSliderDoor').name('SliderDoor')
            this.debug.side02Folder.add(this.functionsSide02, 'addSolidWall').name('SolidWall')
            this.debug.side02Folder.add(this.functionsSide02, 'addGlassWindow').name('GlassWindow')
            this.debug.side02Folder.add(this.functionsSide02, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side02Folder.add(this.functionsSide02, 'addPortalDoor').name('PortalDoor')
            this.debug.side02Folder.add(this.functionsSide02, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side02Folder.add(this.functionsSide02, 'addSmartGlassWindow').name('SmartGlassWindow')
        }

    }

    debugSide03()
    {
        this.setFunctionsSide03()

        if (this.debug.active) {
            this.debug.side03Folder.add(this.functionsSide03, 'addSliderDoor').name('SliderDoor')
            this.debug.side03Folder.add(this.functionsSide03, 'addSolidWall').name('SolidWall')
            this.debug.side03Folder.add(this.functionsSide03, 'addGlassWindow').name('GlassWindow')
            this.debug.side03Folder.add(this.functionsSide03, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side03Folder.add(this.functionsSide03, 'addPortalDoor').name('PortalDoor')
            this.debug.side03Folder.add(this.functionsSide03, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side03Folder.add(this.functionsSide03, 'addSmartGlassWindow').name('SmartGlassWindow')
        }

    }

    debugSide04()
    {
        this.setFunctionsSide04()

        if (this.debug.active) {
            this.debug.side04Folder.add(this.functionsSide04, 'addSliderDoor').name('SliderDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addSolidWall').name('SolidWall')
            this.debug.side04Folder.add(this.functionsSide04, 'addGlassWindow').name('GlassWindow')
            this.debug.side04Folder.add(this.functionsSide04, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side04Folder.add(this.functionsSide04, 'addPortalDoor').name('PortalDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addSmartGlassWindow').name('SmartGlassWindow')
        }

    }

    debugAttachment() {

        this.functionsAttachment = {}
        this.functionsAttachment.addAutomaticAwing = () => {
            this.qudrix01.attachment.functions.addAutomaticAwing()
            this.qudrix02.attachment.functions.addAutomaticAwing()
        }
        this.functionsAttachment.addBioclimacticPergola = () => {
            this.qudrix01.attachment.functions.addBioclimacticPergola()
            this.qudrix02.attachment.functions.addBioclimacticPergola()
        }
        this.functionsAttachment.removeAttachment = () => {
            this.qudrix01.attachment.functions.removeAttachment()
            this.qudrix02.attachment.functions.removeAttachment()
        }

        if (this.debug.active)
        {
            // Attachment
            this.debug.attachmentFolder.add(this.functionsAttachment, 'addAutomaticAwing').name('AutomaticAwing')
            this.debug.attachmentFolder.add(this.functionsAttachment, 'addBioclimacticPergola').name('BioclimacticPergola')
            this.debug.attachmentFolder.add(this.functionsAttachment, 'removeAttachment').name('removeAttachment')
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