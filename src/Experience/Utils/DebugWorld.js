import * as THREE from 'three'
import gsap from 'gsap'

import Experience from '../Experience'
import World from '../World/World'

import DebugCamera from './DebugCamera'

// import Camera from '../Camera'

export default class DebugWorld
{
    constructor(camera)
    {
        // this.camera = new Camera()

        this.experience = new Experience()
        this.manager = this.experience.manager
        this.materials = this.experience.materials
        this.debug = this.experience.debug

        this.world = new World()
        this.CONFIG = this.world.CONFIG

        this.buildingGroup = this.world.buildingGroup
        this.areaLightKey = this.world.lights.areaLight.key
        this.areaLightTop = this.world.lights.areaLight.top
        this.areaLightSide = this.world.lights.areaLight.side

        this.qudrix01 = this.world.qudrix01
        this.qudrix02 = this.world.qudrix02

        // Debug

        this.ease = "power3.inOut"

        this.debugCamera = new DebugCamera(camera)

        this.debugCamera.start()

        // this.debugCamera(camera)
        this.debugCONFIG()
        this.debugMASTER()
        this.debugSizes()
        this.debugRoof()
        // this.debugSide01()
        // this.debugSide02()
        // this.debugSide03()
        // this.debugSide04()
        // this.debugAttachment()

        // this.experience.manager.loadingManager.onLoad = () => {
        //     this.functionsMASTER.build()
        // }





    }

    setFunctionSizes()
    {
        this.functionsSizes = {}
        this.functionsSizes.setQ01 = () =>
        {

            this.qudrix01.instance.scale.set(1, 1, 1)
            this.qudrix02.instance.scale.set(0, 0, 0)



        }
        this.functionsSizes.setQ02 = () =>
        {
            this.qudrix01.instance.scale.set(0, 0, 0)
            this.qudrix02.instance.scale.set(1, 1, 1)

            this.CONFIG.size["element-name"] = "Q02"
            console.log(this.CONFIG.size["element-name"]);
        }
    }

    setFunctionsCONFIG()
    {
        this.functionsCONFIG = {}

        this.functionsCONFIG.setQ01 = () =>
        {
            this.CONFIG.size["element-name"] = "Q01"
            console.log("this.CONFIG.size.element-name:", this.CONFIG.size["element-name"]);
        }
        this.functionsCONFIG.setQ02 = () =>
        {
            this.CONFIG.size["element-name"] = "Q02"
            console.log("this.CONFIG.size.element-name:", this.CONFIG.size["element-name"]);
        }

        this.functionsCONFIG.setRoofSolidPanels = () =>
        {
            this.CONFIG.roof["element-name"] = "Solid Panels"
            console.log("this.CONFIG.roof.element-name:", this.CONFIG.roof["element-name"]);
        }

        this.functionsCONFIG.setRoofMirrorGlass = () =>
        {
            this.CONFIG.roof["element-name"] = "Mirror Glass"
            console.log("this.CONFIG.roof.element-name:", this.CONFIG.roof["element-name"]);
        }

        this.functionsCONFIG.setRoofPergolaQ25 = () =>
        {
            this.CONFIG.roof["element-name"] = "Swivel Sliding pergola Q25"
            console.log("this.CONFIG.roof.element-name:", this.CONFIG.roof["element-name"]);
        }

        this.functionsCONFIG.setRoofPergolaQ27 = () =>
        {
            this.CONFIG.roof["element-name"] = "Bioclimatic pergola Q27"
            console.log("this.CONFIG.roof.element-name:", this.CONFIG.roof["element-name"]);
        }
        this.functionsCONFIG.removeRoofAccessories = () =>
        {
            this.CONFIG.roof["accessory01-name"] = "None"
            console.log("this.CONFIG.roof.accessory01-name:", this.CONFIG.roof["accessory01-name"]);

        }
        this.functionsCONFIG.addRoofAccessories = () =>
        {
            this.CONFIG.roof["accessory01-name"] = "Sunshade Dazzoni"
            console.log("this.CONFIG.roof.accessory01-name:", this.CONFIG.roof["accessory01-name"]);

        }
    }

    debugCONFIG()
    {
        this.setFunctionsCONFIG()

        if (this.debug.active)
        {
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'setQ01').name('Q01')
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'setQ02').name('Q02')
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'setRoofSolidPanels').name('SolidPanels')
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'setRoofMirrorGlass').name('MirrorGlass')
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'setRoofPergolaQ25').name('PergolaQ25')
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'setRoofPergolaQ27').name('PergolaQ27')
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'removeRoofAccessories').name('None')
            this.debug.CONFIGfolder.add(this.functionsCONFIG, 'addRoofAccessories').name('Sunshade Dazzoni')
        }
    }

    setMASTER()
    {

        this.functionsMASTER = {}

        this.functionsMASTER.build = (data) =>
        {
            this.CONFIG = data
            // console.log(this.CONFIG);

            /**
             * Size
             */
            if (this.CONFIG.size['element-name'] === 'Q01')
            {
                this.world.qudrix01.instance.scale.set(1, 1, 1,)
                this.world.qudrix02.instance.scale.set(0, 0, 0,)
            }
            if (this.CONFIG.size['element-name'] === 'Q02')
            {
                this.world.qudrix01.instance.scale.set(0, 0, 0,)
                this.world.qudrix02.instance.scale.set(1, 1, 1,)
            }

            /**
             * Roof
             */

            if (this.CONFIG.roof["element-name"] === "Solid Panels")
            {
                this.world.qudrix01.roof.functions.addRoofSolidPanels()
                this.world.qudrix02.roof.functions.addRoofSolidPanels()
            }
            if (this.CONFIG.roof["element-name"] === "Mirror Glass")
            {
                this.world.qudrix01.roof.functions.addRoofMirrorGlass()
                this.world.qudrix02.roof.functions.addRoofMirrorGlass()
            }
            if (this.CONFIG.roof["element-name"] === "Swivel Sliding pergola Q25")
            {
                this.world.qudrix01.roof.functions.addRoofPergolaQ25()
                this.world.qudrix02.roof.functions.addRoofPergolaQ25()
            }
            if (this.CONFIG.roof["element-name"] === "Bioclimatic pergola Q27")
            {
                this.world.qudrix01.roof.functions.addRoofPergolaQ27()
                this.world.qudrix02.roof.functions.addRoofPergolaQ27()
            }
            if (this.CONFIG.roof["accessory01-name"] === "None")
            {
                this.world.qudrix01.roof.functions.removeAccessories()
                this.world.qudrix02.roof.functions.removeAccessories()
            }
            if (this.CONFIG.roof["accessory01-name"] === "Sunshade Dazzoni" &&
                this.CONFIG.roof["element-name"] === "Bioclimatic pergola Q27")
            {
                this.world.qudrix01.roof.functions.addAccessories()
                this.world.qudrix02.roof.functions.addAccessories()
            }


        }

    }

    debugMASTER()
    {

        this.setMASTER()

        if (this.debug.active)
        {
            this.debug.MASTERfolder.add(this.functionsMASTER, 'build')
        }

    }

    setFunctionsRoof()
    {
        this.functionsRoof = {}
        this.functionsRoof.addRoofSolidPanels = () =>
        {
            this.qudrix01.roof.functions.addRoofSolidPanels()
            this.qudrix02.roof.functions.addRoofSolidPanels()

            // this.debugCamera.functions.roof()
        }
        this.functionsRoof.addRoofMirrorGlass = () =>
        {
            this.qudrix01.roof.functions.addRoofMirrorGlass()
            this.qudrix02.roof.functions.addRoofMirrorGlass()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.addRoofPergolaQ25 = () =>
        {
            this.qudrix01.roof.functions.addRoofPergolaQ25()
            this.qudrix02.roof.functions.addRoofPergolaQ25()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.addRoofPergolaQ27 = () =>
        {
            this.qudrix01.roof.functions.addRoofPergolaQ27()
            this.qudrix02.roof.functions.addRoofPergolaQ27()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.removeAccessories = () =>
        {
            this.qudrix01.roof.functions.removeAccessories()
            this.qudrix02.roof.functions.removeAccessories()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.addAccessories = () =>
        {
            this.qudrix01.roof.functions.addAccessories()
            this.qudrix02.roof.functions.addAccessories()

            // this.debugCamera.functions.roof()

        }
    }

    setFunctionsSide01()
    {
        this.functionsSide01 = {}

        this.functionsSide01.addSliderDoor = () =>
        {
            this.qudrix01.side01.functions.addSliderDoor()
            this.qudrix02.side01.functions.addSliderDoor()

            // this.debugCamera.functions.side01()

            this.CONFIG.sides['side-01']["element-name"] = "Slider Door"
            console.log(this.CONFIG.sides['side-01']["element-name"]);
        }
        this.functionsSide01.addSolidPanels = () =>
        {
            this.qudrix01.side01.functions.addSolidPanels()
            this.qudrix02.side01.functions.addSolidPanels()

            // this.debugCamera.functions.side01()

            this.CONFIG.sides['side-01']["element-name"] = "Solid Panels"
            console.log(this.CONFIG.sides['side-01']["element-name"]);
        }
        this.functionsSide01.addGlassWindow = () =>
        {
            this.qudrix01.side01.functions.addGlassWindow()
            this.qudrix02.side01.functions.addGlassWindow()

            // this.debugCamera.functions.side01()

            this.CONFIG.sides['side-01']["element-name"] = "Glass Window"
            console.log(this.CONFIG.sides['side-01']["element-name"]);
        }
        this.functionsSide01.addGuillotineWindow = () =>
        {
            this.qudrix01.side01.functions.addGuillotineWindow()
            this.qudrix02.side01.functions.addGuillotineWindow()

            // this.debugCamera.functions.side01()

            this.CONFIG.sides['side-01']["element-name"] = "Guillotine Q2 Window"
            console.log(this.CONFIG.sides['side-01']["element-name"]);
        }
        this.functionsSide01.addPortalDoor = () =>
        {
            this.qudrix01.side01.functions.addPortalDoor()
            this.qudrix02.side01.functions.addPortalDoor()

            // this.debugCamera.functions.side01()

            this.CONFIG.sides['side-01']["element-name"] = "Portal Door"
            console.log(this.CONFIG.sides['side-01']["element-name"]);
        }
        this.functionsSide01.addAccordionDoor = () =>
        {
            this.qudrix01.side01.functions.addAccordionDoor()
            this.qudrix02.side01.functions.addAccordionDoor()

            // this.debugCamera.functions.side01()

            this.CONFIG.sides['side-01']["element-name"] = "Accordion Door"
            console.log(this.CONFIG.sides['side-01']["element-name"]);
        }
        this.functionsSide01.addSmartGlassWindow = () =>
        {
            this.qudrix01.side01.functions.addSmartGlassWindow()
            this.qudrix02.side01.functions.addSmartGlassWindow()

            // this.debugCamera.functions.side01()

            this.CONFIG.sides['side-01']["element-name"] = "Smart Glass Window"
            console.log(this.CONFIG.sides['side-01']["element-name"]);
        }

    }

    setFunctionsSide02()
    {
        this.functionsSide02 = {}

        this.functionsSide02.addSliderDoor = () =>
        {
            this.qudrix01.side02.functions.addSliderDoor()
            this.qudrix02.side02.functions.addSliderDoor()

            // this.debugCamera.functions.side02()

            this.CONFIG.sides['side-02']["element-name"] = "Slider Door"
            console.log(this.CONFIG.sides['side-02']["element-name"]);
        }
        this.functionsSide02.addSolidPanels = () =>
        {
            this.qudrix01.side02.functions.addSolidPanels()
            this.qudrix02.side02.functions.addSolidPanels()

            // this.debugCamera.functions.side02()

            this.CONFIG.sides['side-02']["element-name"] = "Solid Panels"
            console.log(this.CONFIG.sides['side-02']["element-name"]);
        }
        this.functionsSide02.addGlassWindow = () =>
        {
            this.qudrix01.side02.functions.addGlassWindow()
            this.qudrix02.side02.functions.addGlassWindow()

            // this.debugCamera.functions.side02()

            this.CONFIG.sides['side-02']["element-name"] = "Glass Window"
            console.log(this.CONFIG.sides['side-02']["element-name"]);
        }
        this.functionsSide02.addGuillotineWindow = () =>
        {
            this.qudrix01.side02.functions.addGuillotineWindow()
            this.qudrix02.side02.functions.addGuillotineWindow()

            // this.debugCamera.functions.side02()

            this.CONFIG.sides['side-02']["element-name"] = "Guillotine Q2 Window"
            console.log(this.CONFIG.sides['side-02']["element-name"]);
        }
        this.functionsSide02.addPortalDoor = () =>
        {
            this.qudrix01.side02.functions.addPortalDoor()
            this.qudrix02.side02.functions.addPortalDoor()

            // this.debugCamera.functions.side02()

            this.CONFIG.sides['side-02']["element-name"] = "Portal Door"
            console.log(this.CONFIG.sides['side-02']["element-name"]);
        }
        this.functionsSide02.addAccordionDoor = () =>
        {
            this.qudrix01.side02.functions.addAccordionDoor()
            this.qudrix02.side02.functions.addAccordionDoor()

            // this.debugCamera.functions.side02()

            this.CONFIG.sides['side-02']["element-name"] = "Accordion Door"
            console.log(this.CONFIG.sides['side-02']["element-name"]);
        }
        this.functionsSide02.addSmartGlassWindow = () =>
        {
            this.qudrix01.side02.functions.addSmartGlassWindow()
            this.qudrix02.side02.functions.addSmartGlassWindow()

            // this.debugCamera.functions.side02()

            this.CONFIG.sides['side-02']["element-name"] = "Smart Glass Window"
            console.log(this.CONFIG.sides['side-02']["element-name"]);
        }
    }

    setFunctionsSide03()
    {
        this.functionsSide03 = {}

        this.functionsSide03.addSliderDoor = () =>
        {
            this.qudrix01.side03.functions.addSliderDoor()
            this.qudrix02.side03.functions.addSliderDoor()

            this.debugCamera.functions.side03()

            this.CONFIG.sides['side-03']["element-name"] = "Slider Door"
            console.log(this.CONFIG.sides['side-03']["element-name"]);
        }
        this.functionsSide03.addSolidPanels = () =>
        {
            this.qudrix01.side03.functions.addSolidPanels()
            this.qudrix02.side03.functions.addSolidPanels()

            this.debugCamera.functions.side03()

            this.CONFIG.sides['side-03']["element-name"] = "Solid Panels"
            console.log(this.CONFIG.sides['side-03']["element-name"]);
        }
        this.functionsSide03.addGlassWindow = () =>
        {
            this.qudrix01.side03.functions.addGlassWindow()
            this.qudrix02.side03.functions.addGlassWindow()

            this.debugCamera.functions.side03()

            this.CONFIG.sides['side-03']["element-name"] = "Glass Window"
            console.log(this.CONFIG.sides['side-03']["element-name"]);
        }
        this.functionsSide03.addGuillotineWindow = () =>
        {
            this.qudrix01.side03.functions.addGuillotineWindow()
            this.qudrix02.side03.functions.addGuillotineWindow()

            this.debugCamera.functions.side03()

            this.CONFIG.sides['side-03']["element-name"] = "Guillotine Q2 Window"
            console.log(this.CONFIG.sides['side-03']["element-name"]);
        }
        this.functionsSide03.addPortalDoor = () =>
        {
            this.qudrix01.side03.functions.addPortalDoor()
            this.qudrix02.side03.functions.addPortalDoor()

            this.debugCamera.functions.side03()

            this.CONFIG.sides['side-03']["element-name"] = "Portal Door"
            console.log(this.CONFIG.sides['side-03']["element-name"]);
        }
        this.functionsSide03.addAccordionDoor = () =>
        {
            this.qudrix01.side03.functions.addAccordionDoor()
            this.qudrix02.side03.functions.addAccordionDoor()

            this.debugCamera.functions.side03()

            this.CONFIG.sides['side-03']["element-name"] = "Accordion Door"
            console.log(this.CONFIG.sides['side-03']["element-name"]);
        }
        this.functionsSide03.addSmartGlassWindow = () =>
        {
            this.qudrix01.side03.functions.addSmartGlassWindow()
            this.qudrix02.side03.functions.addSmartGlassWindow()

            this.debugCamera.functions.side03()

            this.CONFIG.sides['side-03']["element-name"] = "Smart Glass Window"
            console.log(this.CONFIG.sides['side-03']["element-name"]);
        }

    }

    setFunctionsSide04()
    {
        this.functionsSide04 = {}

        this.functionsSide04.addSliderDoor = () =>
        {
            this.qudrix01.side04.functions.addSliderDoor()
            this.qudrix02.side04.functions.addSliderDoor()

            this.debugCamera.functions.side04()

            this.CONFIG.sides['side-04']["element-name"] = "Slider Door"
            console.log(this.CONFIG.sides['side-04']["element-name"]);
        }
        this.functionsSide04.addSolidPanels = () =>
        {
            this.qudrix01.side04.functions.addSolidPanels()
            this.qudrix02.side04.functions.addSolidPanels()

            this.debugCamera.functions.side04()

            this.CONFIG.sides['side-04']["element-name"] = "Solid Panels"
            console.log(this.CONFIG.sides['side-04']["element-name"]);
        }
        this.functionsSide04.addGlassWindow = () =>
        {
            this.qudrix01.side04.functions.addGlassWindow()
            this.qudrix02.side04.functions.addGlassWindow()

            this.debugCamera.functions.side04()

            this.CONFIG.sides['side-04']["element-name"] = "Glass Window"
            console.log(this.CONFIG.sides['side-04']["element-name"]);
        }
        this.functionsSide04.addGuillotineWindow = () =>
        {
            this.qudrix01.side04.functions.addGuillotineWindow()
            this.qudrix02.side04.functions.addGuillotineWindow()

            this.debugCamera.functions.side04()

            this.CONFIG.sides['side-04']["element-name"] = "Guillotine Q2 Window"
            console.log(this.CONFIG.sides['side-04']["element-name"]);
        }
        this.functionsSide04.addPortalDoor = () =>
        {
            this.qudrix01.side04.functions.addPortalDoor()
            this.qudrix02.side04.functions.addPortalDoor()

            this.debugCamera.functions.side04()

            this.CONFIG.sides['side-04']["element-name"] = "Portal Door"
            console.log(this.CONFIG.sides['side-04']["element-name"]);
        }
        this.functionsSide04.addAccordionDoor = () =>
        {
            this.qudrix01.side04.functions.addAccordionDoor()
            this.qudrix02.side04.functions.addAccordionDoor()

            this.debugCamera.functions.side04()

            this.CONFIG.sides['side-04']["element-name"] = "Accordion Door"
            console.log(this.CONFIG.sides['side-04']["element-name"]);
        }
        this.functionsSide04.addSmartGlassWindow = () =>
        {
            this.qudrix01.side04.functions.addSmartGlassWindow()
            this.qudrix02.side04.functions.addSmartGlassWindow()

            this.debugCamera.functions.side04()

            this.CONFIG.sides['side-04']["element-name"] = "Smart Glass Window"
            console.log(this.CONFIG.sides['side-04']["element-name"]);
        }

    }

    setFunctionsAttachment()
    {

        this.functionsAttachment = {}
        this.functionsAttachment.addAutomaticAwing = () =>
        {
            this.qudrix01.attachment.functions.addAutomaticAwing()
            this.qudrix02.attachment.functions.addAutomaticAwing()

            this.debugCamera.functions.default()

            this.CONFIG.attachment["element-name"] = "Automatic Awing"
            console.log(this.CONFIG.attachment["element-name"]);
        }
        this.functionsAttachment.addBioclimacticPergola = () =>
        {
            this.qudrix01.attachment.functions.addBioclimacticPergola()
            this.qudrix02.attachment.functions.addBioclimacticPergola()

            this.debugCamera.functions.default()

            this.CONFIG.attachment["element-name"] = "Bioclimatic pergola Q27"
            console.log(this.CONFIG.attachment["element-name"]);
        }
        this.functionsAttachment.removeAttachment = () =>
        {
            this.qudrix01.attachment.functions.removeAttachment()
            this.qudrix02.attachment.functions.removeAttachment()

            this.debugCamera.functions.default()

            this.CONFIG.attachment["element-name"] = "None"
            console.log(this.CONFIG.attachment["element-name"]);
        }
    }




    debugSizes()
    {
        this.setFunctionSizes()

        if (this.debug.active)
        {
            this.debug.sizeFolder.add(this.functionsSizes, 'setQ01').name('Q01')
            this.debug.sizeFolder.add(this.functionsSizes, 'setQ02').name('Q02')
        }
    }


    debugRoof()
    {
        this.setFunctionsRoof()

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


    debugSide01()
    {
        this.setFunctionsSide01()

        if (this.debug.active)
        {
            this.debug.side01Folder.add(this.functionsSide01, 'addSliderDoor').name('SliderDoor')
            this.debug.side01Folder.add(this.functionsSide01, 'addSolidPanels').name('SolidPanels')
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

        if (this.debug.active)
        {
            this.debug.side02Folder.add(this.functionsSide02, 'addSliderDoor').name('SliderDoor')
            this.debug.side02Folder.add(this.functionsSide02, 'addSolidPanels').name('SolidPanels')
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

        if (this.debug.active)
        {
            this.debug.side03Folder.add(this.functionsSide03, 'addSliderDoor').name('SliderDoor')
            this.debug.side03Folder.add(this.functionsSide03, 'addSolidPanels').name('SolidPanels')
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

        if (this.debug.active)
        {
            this.debug.side04Folder.add(this.functionsSide04, 'addSliderDoor').name('SliderDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addSolidPanels').name('SolidPanels')
            this.debug.side04Folder.add(this.functionsSide04, 'addGlassWindow').name('GlassWindow')
            this.debug.side04Folder.add(this.functionsSide04, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side04Folder.add(this.functionsSide04, 'addPortalDoor').name('PortalDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addSmartGlassWindow').name('SmartGlassWindow')
        }

    }



    debugAttachment()
    {

        this.setFunctionsAttachment()

        if (this.debug.active)
        {
            // Attachment
            this.debug.attachmentFolder.add(this.functionsAttachment, 'addAutomaticAwing').name('AutomaticAwing')
            this.debug.attachmentFolder.add(this.functionsAttachment, 'addBioclimacticPergola').name('BioclimacticPergola')
            this.debug.attachmentFolder.add(this.functionsAttachment, 'removeAttachment').name('removeAttachment')
        }
    }



    scaleBuildingAndLights(positionY, scaleXYZ)
    {
        gsap
            .to(this.buildingGroup.position, {
                y: this.positionY,
                ease: this.ease,
                duration: this.duration
            })
        gsap
            .to(this.buildingGroup.scale, {
                x: this.scaleXYZ,
                y: this.scaleXYZ,
                z: this.scaleXYZ,
                ease: this.ease,
                duration: this.duration
            })
        gsap
            .to(this.areaLightKey, {
                width: this.areaLightSide * this.scaleXYZ,
                height: this.areaLightSide * this.scaleXYZ,
                ease: this.ease,
                duration: this.duration
            })
        gsap
            .to(this.areaLightTop, {
                width: this.areaLightSide * this.scaleXYZ,
                height: this.areaLightSide * this.scaleXYZ,
                ease: this.ease,
                duration: this.duration
            })
    }

    debugBuildingGroup()
    {

        if (this.debug.active)
        {
            this.debug.cameraFolder.add(this.buildingGroup.position, 'x', -10, 10, 0.001).name('position.x')
            this.debug.cameraFolder.add(this.buildingGroup.position, 'y', -10, 10, 0.001).name('position.y')
            this.debug.cameraFolder.add(this.buildingGroup.position, 'z', -10, 10, 0.001).name('position.z')
            this.debug.cameraFolder.add(this.buildingGroup.scale, 'x', 0, 10, 0.01).name('building.scale').onChange((value) =>
            {
                this.buildingGroup.scale.y = value
                this.buildingGroup.scale.z = value

                this.areaLightKey.width = 10 * value
                this.areaLightKey.height = 10 * value
                this.areaLightTop.width = 10 * value
                this.areaLightTop.height = 10 * value
            })
        }
    }




}

