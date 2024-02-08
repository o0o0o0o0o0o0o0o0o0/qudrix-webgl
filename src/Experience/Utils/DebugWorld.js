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

        /**
         * Set MASTER Function
         */
        this.setMASTER(this.CONFIG)

        // Debug

        this.ease = "power3.inOut"

        this.debugCamera = new DebugCamera(camera)

        this.debugCamera.start()

        // this.debugCamera(camera)

        this.debugCONFIG()

        // this.debugMASTER(this.CONFIG)

        this.debugSizes()
        this.debugRoof()
        this.debugSide01()
        this.debugSide02()
        this.debugSide03()
        this.debugSide04()
        this.debugAttachment()
        this.debugLights()

        // this.experience.manager.loadingManager.onLoad = () => {
        //     this.functionsMASTER.build()
        // }





    }

    setFunctionSizes()
    {
        this.functionsSizes = {}
        this.functionsSizes.setQ01 = () =>
        {
            this.CONFIG.size["element-name"] = "Q01"
            this.functionsMASTER.build()
        }
        this.functionsSizes.setQ02 = () =>
        {
            this.CONFIG.size["element-name"] = "Q02"
            this.functionsMASTER.build()
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

    setMASTER(data)
    {

        this.functionsMASTER = {}

        this.functionsMASTER.build = () =>
        {
            this.CONFIG = data

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

                // correct area light
                this.world.lights.areaLight.key.intensity = 6
            }
            if (this.CONFIG.roof["element-name"] === "Mirror Glass")
            {
                this.world.qudrix01.roof.functions.addRoofMirrorGlass()
                this.world.qudrix02.roof.functions.addRoofMirrorGlass()

                // correct area light
                this.world.lights.areaLight.key.intensity = 0
            }
            if (this.CONFIG.roof["element-name"] === "Swivel Sliding pergola Q25")
            {
                this.world.qudrix01.roof.functions.addRoofPergolaQ25()
                this.world.qudrix02.roof.functions.addRoofPergolaQ25()

                // correct area light
                this.world.lights.areaLight.key.intensity = 6
            }
            if (this.CONFIG.roof["element-name"] === "Bioclimatic pergola Q27")
            {
                this.world.qudrix01.roof.functions.addRoofPergolaQ27()
                this.world.qudrix02.roof.functions.addRoofPergolaQ27()

                // correct area light
                this.world.lights.areaLight.key.intensity = 6
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

            /**
             * Side-01
             */
            if (this.CONFIG.sides['side-01']["element-name"] === "Slider Door")
            {
                this.world.qudrix01.side01.functions.addSliderDoor()
                this.world.qudrix02.side01.functions.addSliderDoor()
            }
            if (this.CONFIG.sides['side-01']["element-name"] === "Solid Panels")
            {
                this.world.qudrix01.side01.functions.addSolidPanels()
                this.world.qudrix02.side01.functions.addSolidPanels()
            }
            if (this.CONFIG.sides['side-01']["element-name"] === "Glass Window")
            {
                this.world.qudrix01.side01.functions.addGlassWindow()
                this.world.qudrix02.side01.functions.addGlassWindow()
            }
            if (this.CONFIG.sides['side-01']["element-name"] === "Guillotine Q2 Window")
            {
                this.world.qudrix01.side01.functions.addGuillotineWindow()
                this.world.qudrix02.side01.functions.addGuillotineWindow()
            }
            if (this.CONFIG.sides['side-01']["element-name"] === "Portal Door")
            {
                this.world.qudrix01.side01.functions.addPortalDoor()
                this.world.qudrix02.side01.functions.addPortalDoor()
            }
            if (this.CONFIG.sides['side-01']["element-name"] === "Accordion Door")
            {
                this.world.qudrix01.side01.functions.addAccordionDoor()
                this.world.qudrix02.side01.functions.addAccordionDoor()
            }
            if (this.CONFIG.sides['side-01']["element-name"] === "Smart Glass Window")
            {
                this.world.qudrix01.side01.functions.addSmartGlassWindow()
                this.world.qudrix02.side01.functions.addSmartGlassWindow()
            }

            if (this.CONFIG.sides['side-01']["accessory01-name"] === "Automatic Sunscreen")
            {
                this.world.qudrix01.side01.functions.addAutomaticSunscreen()
                this.world.qudrix02.side01.functions.addAutomaticSunscreen()
            }

            if (this.CONFIG.sides['side-01']["accessory02-name"] === "Mosquito net")
            {
                this.world.qudrix01.side01.functions.addMosquito()
                this.world.qudrix02.side01.functions.addMosquito()
            }

            if (this.CONFIG.sides['side-01']["accessory01-name"] === "None" &&
                this.CONFIG.sides['side-01']["accessory02-name"] === "None") 
            {
                this.world.qudrix01.side01.functions.removeAccessories()
                this.world.qudrix02.side01.functions.removeAccessories()
            }

            /**
             * Side-02
             */
            if (this.CONFIG.sides['side-02']["element-name"] === "Slider Door")
            {
                this.world.qudrix01.side02.functions.addSliderDoor()
                this.world.qudrix02.side02.functions.addSliderDoor()
            }
            if (this.CONFIG.sides['side-02']["element-name"] === "Solid Panels")
            {
                this.world.qudrix01.side02.functions.addSolidPanels()
                this.world.qudrix02.side02.functions.addSolidPanels()
            }
            if (this.CONFIG.sides['side-02']["element-name"] === "Glass Window")
            {
                this.world.qudrix01.side02.functions.addGlassWindow()
                this.world.qudrix02.side02.functions.addGlassWindow()
            }
            if (this.CONFIG.sides['side-02']["element-name"] === "Guillotine Q2 Window")
            {
                this.world.qudrix01.side02.functions.addGuillotineWindow()
                this.world.qudrix02.side02.functions.addGuillotineWindow()
            }
            if (this.CONFIG.sides['side-02']["element-name"] === "Portal Door")
            {
                this.world.qudrix01.side02.functions.addPortalDoor()
                this.world.qudrix02.side02.functions.addPortalDoor()
            }
            if (this.CONFIG.sides['side-02']["element-name"] === "Accordion Door")
            {
                this.world.qudrix01.side02.functions.addAccordionDoor()
                this.world.qudrix02.side02.functions.addAccordionDoor()
            }
            if (this.CONFIG.sides['side-02']["element-name"] === "Smart Glass Window")
            {
                this.world.qudrix01.side02.functions.addSmartGlassWindow()
                this.world.qudrix02.side02.functions.addSmartGlassWindow()
            }

            /**
             * Side-03
             */
            if (this.CONFIG.sides['side-03']["element-name"] === "Slider Door")
            {
                this.world.qudrix01.side03.functions.addSliderDoor()
                this.world.qudrix02.side03.functions.addSliderDoor()
            }
            if (this.CONFIG.sides['side-03']["element-name"] === "Solid Panels")
            {
                this.world.qudrix01.side03.functions.addSolidPanels()
                this.world.qudrix02.side03.functions.addSolidPanels()
            }
            if (this.CONFIG.sides['side-03']["element-name"] === "Glass Window")
            {
                this.world.qudrix01.side03.functions.addGlassWindow()
                this.world.qudrix02.side03.functions.addGlassWindow()
            }
            if (this.CONFIG.sides['side-03']["element-name"] === "Guillotine Q2 Window")
            {
                this.world.qudrix01.side03.functions.addGuillotineWindow()
                this.world.qudrix02.side03.functions.addGuillotineWindow()
            }
            if (this.CONFIG.sides['side-03']["element-name"] === "Portal Door")
            {
                this.world.qudrix01.side03.functions.addPortalDoor()
                this.world.qudrix02.side03.functions.addPortalDoor()
            }
            if (this.CONFIG.sides['side-03']["element-name"] === "Accordion Door")
            {
                this.world.qudrix01.side03.functions.addAccordionDoor()
                this.world.qudrix02.side03.functions.addAccordionDoor()
            }
            if (this.CONFIG.sides['side-03']["element-name"] === "Smart Glass Window")
            {
                this.world.qudrix01.side03.functions.addSmartGlassWindow()
                this.world.qudrix02.side03.functions.addSmartGlassWindow()
            }

            /**
            * Side-04
            */
            if (this.CONFIG.sides['side-04']["element-name"] === "Slider Door")
            {
                this.world.qudrix01.side04.functions.addSliderDoor()
                this.world.qudrix02.side04.functions.addSliderDoor()
            }
            if (this.CONFIG.sides['side-04']["element-name"] === "Solid Panels")
            {
                this.world.qudrix01.side04.functions.addSolidPanels()
                this.world.qudrix02.side04.functions.addSolidPanels()
            }
            if (this.CONFIG.sides['side-04']["element-name"] === "Glass Window")
            {
                this.world.qudrix01.side04.functions.addGlassWindow()
                this.world.qudrix02.side04.functions.addGlassWindow()
            }
            if (this.CONFIG.sides['side-04']["element-name"] === "Guillotine Q2 Window")
            {
                this.world.qudrix01.side04.functions.addGuillotineWindow()
                this.world.qudrix02.side04.functions.addGuillotineWindow()
            }
            if (this.CONFIG.sides['side-04']["element-name"] === "Portal Door")
            {
                this.world.qudrix01.side04.functions.addPortalDoor()
                this.world.qudrix02.side04.functions.addPortalDoor()
            }
            if (this.CONFIG.sides['side-04']["element-name"] === "Accordion Door")
            {
                this.world.qudrix01.side04.functions.addAccordionDoor()
                this.world.qudrix02.side04.functions.addAccordionDoor()
            }
            if (this.CONFIG.sides['side-04']["element-name"] === "Smart Glass Window")
            {
                this.world.qudrix01.side04.functions.addSmartGlassWindow()
                this.world.qudrix02.side04.functions.addSmartGlassWindow()
            }

            /**
            * Attachment
            */
            if (this.CONFIG.attachment["element-name"] === "None")
            {
                this.world.qudrix01.attachment.functions.removeAttachment()
                this.world.qudrix02.attachment.functions.removeAttachment()
            }
            if (this.CONFIG.attachment["element-name"] === "Automatic Awing")
            {
                this.world.qudrix01.attachment.functions.addAutomaticAwing()
                this.world.qudrix02.attachment.functions.addAutomaticAwing()
            }
            if (this.CONFIG.attachment["element-name"] === "Bioclimatic pergola Q27")
            {
                this.world.qudrix01.attachment.functions.addBioclimacticPergola()
                this.world.qudrix02.attachment.functions.addBioclimacticPergola()
            }

            /**
             * Lights
             */
            if (this.CONFIG.light['element-name'] === 'LED')
            {
                this.world.qudrix01.lights.functions.addLED()
                this.world.qudrix02.lights.functions.addLED()
            }
            if (this.CONFIG.light['element-name'] === 'RGB')
            {
                this.world.qudrix01.lights.functions.addRGB()
                this.world.qudrix02.lights.functions.addRGB()
            }
            if (this.CONFIG.light['element-name'] === 'None')
            {
                this.world.qudrix01.lights.functions.removeLight()
                this.world.qudrix02.lights.functions.removeLight()
            }


        }

    }

    debugMASTER()
    {

        this.setMASTER(data)

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
            this.CONFIG.roof["element-name"] = "Solid Panels"
            this.functionsMASTER.build()

            // this.debugCamera.functions.roof()
        }
        this.functionsRoof.addRoofMirrorGlass = () =>
        {
            this.CONFIG.roof["element-name"] = "Mirror Glass"
            this.functionsMASTER.build()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.addRoofPergolaQ25 = () =>
        {
            this.CONFIG.roof["element-name"] = "Swivel Sliding pergola Q25"
            this.functionsMASTER.build()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.addRoofPergolaQ27 = () =>
        {
            this.CONFIG.roof["element-name"] = "Bioclimatic pergola Q27"
            this.functionsMASTER.build()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.removeAccessories = () =>
        {
            this.CONFIG.roof["accessory01-name"] = "None"
            this.functionsMASTER.build()

            // this.debugCamera.functions.roof()

        }
        this.functionsRoof.addAccessories = () =>
        {
            this.CONFIG.roof["accessory01-name"] = "Sunshade Dazzoni"
            this.functionsMASTER.build()

            // this.debugCamera.functions.roof()

        }
    }

    setFunctionsSide01()
    {
        this.functionsSide01 = {}

        this.functionsSide01.addSliderDoor = () =>
        {
            this.CONFIG.sides['side-01']["element-name"] = "Slider Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side01()


        }
        this.functionsSide01.addSolidPanels = () =>
        {
            this.CONFIG.sides['side-01']["element-name"] = "Solid Panels"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side01()

        }
        this.functionsSide01.addGlassWindow = () =>
        {
            this.CONFIG.sides['side-01']["element-name"] = "Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side01()

        }
        this.functionsSide01.addGuillotineWindow = () =>
        {
            this.CONFIG.sides['side-01']["element-name"] = "Guillotine Q2 Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side01()

        }
        this.functionsSide01.addPortalDoor = () =>
        {
            this.CONFIG.sides['side-01']["element-name"] = "Portal Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side01()

        }
        this.functionsSide01.addAccordionDoor = () =>
        {
            this.CONFIG.sides['side-01']["element-name"] = "Accordion Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side01()
        }
        this.functionsSide01.addSmartGlassWindow = () =>
        {
            this.CONFIG.sides['side-01']["element-name"] = "Smart Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side01()
        }

        this.functionsSide01.addAutomaticSunscreen = () =>
        {
            this.CONFIG.sides['side-01']["accessory01-name"] = "Automatic Sunscreen"
            this.CONFIG.sides['side-01']["accessory02-name"] = "None"


            console.log(this.CONFIG.sides['side-01']["accessory01-name"]);

            this.functionsMASTER.build()

        }

        this.functionsSide01.addMosquito = () =>
        {

            this.CONFIG.sides['side-01']["accessory01-name"] = "None"
            this.CONFIG.sides['side-01']["accessory02-name"] = "Mosquito net"
            this.functionsMASTER.build()

        }

        this.functionsSide01.removeAccessories = () =>
        {
            this.CONFIG.sides['side-01']["accessory01-name"] = "None"
            this.CONFIG.sides['side-01']["accessory02-name"] = "None"
            this.functionsMASTER.build()
        }

    }

    setFunctionsSide02()
    {
        this.functionsSide02 = {}

        this.functionsSide02.addSliderDoor = () =>
        {
            this.CONFIG.sides['side-02']["element-name"] = "Slider Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side02()


        }
        this.functionsSide02.addSolidPanels = () =>
        {
            this.CONFIG.sides['side-02']["element-name"] = "Solid Panels"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side02()

        }
        this.functionsSide02.addGlassWindow = () =>
        {
            this.CONFIG.sides['side-02']["element-name"] = "Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side02()

        }
        this.functionsSide02.addGuillotineWindow = () =>
        {
            this.CONFIG.sides['side-02']["element-name"] = "Guillotine Q2 Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side02()

        }
        this.functionsSide02.addPortalDoor = () =>
        {
            this.CONFIG.sides['side-02']["element-name"] = "Portal Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side02()

        }
        this.functionsSide02.addAccordionDoor = () =>
        {
            this.CONFIG.sides['side-02']["element-name"] = "Accordion Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side02()
        }
        this.functionsSide02.addSmartGlassWindow = () =>
        {
            this.CONFIG.sides['side-02']["element-name"] = "Smart Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side02()

        }

    }

    setFunctionsSide03()
    {
        this.functionsSide03 = {}

        this.functionsSide03.addSliderDoor = () =>
        {
            this.CONFIG.sides['side-03']["element-name"] = "Slider Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side03()


        }
        this.functionsSide03.addSolidPanels = () =>
        {
            this.CONFIG.sides['side-03']["element-name"] = "Solid Panels"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side03()

        }
        this.functionsSide03.addGlassWindow = () =>
        {
            this.CONFIG.sides['side-03']["element-name"] = "Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side03()

        }
        this.functionsSide03.addGuillotineWindow = () =>
        {
            this.CONFIG.sides['side-03']["element-name"] = "Guillotine Q2 Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side03()

        }
        this.functionsSide03.addPortalDoor = () =>
        {
            this.CONFIG.sides['side-03']["element-name"] = "Portal Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side03()

        }
        this.functionsSide03.addAccordionDoor = () =>
        {
            this.CONFIG.sides['side-03']["element-name"] = "Accordion Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side03()
        }
        this.functionsSide03.addSmartGlassWindow = () =>
        {
            this.CONFIG.sides['side-03']["element-name"] = "Smart Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side03()

        }

    }

    setFunctionsSide04()
    {
        this.functionsSide04 = {}

        this.functionsSide04.addSliderDoor = () =>
        {
            this.CONFIG.sides['side-04']["element-name"] = "Slider Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side04()


        }
        this.functionsSide04.addSolidPanels = () =>
        {
            this.CONFIG.sides['side-04']["element-name"] = "Solid Panels"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side04()

        }
        this.functionsSide04.addGlassWindow = () =>
        {
            this.CONFIG.sides['side-04']["element-name"] = "Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side04()

        }
        this.functionsSide04.addGuillotineWindow = () =>
        {
            this.CONFIG.sides['side-04']["element-name"] = "Guillotine Q2 Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side04()

        }
        this.functionsSide04.addPortalDoor = () =>
        {
            this.CONFIG.sides['side-04']["element-name"] = "Portal Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side04()

        }
        this.functionsSide04.addAccordionDoor = () =>
        {
            this.CONFIG.sides['side-04']["element-name"] = "Accordion Door"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side04()
        }
        this.functionsSide04.addSmartGlassWindow = () =>
        {
            this.CONFIG.sides['side-04']["element-name"] = "Smart Glass Window"
            this.functionsMASTER.build()

            // this.debugCamera.functions.side04()

        }

    }

    setFunctionsAttachment()
    {

        this.functionsAttachment = {}
        this.functionsAttachment.addAutomaticAwing = () =>
        {
            this.CONFIG.attachment["element-name"] = "Automatic Awing"
            this.functionsMASTER.build()

            // this.debugCamera.functions.default()


        }
        this.functionsAttachment.addBioclimacticPergola = () =>
        {
            this.CONFIG.attachment["element-name"] = "Bioclimatic pergola Q27"
            this.functionsMASTER.build()

            // this.debugCamera.functions.default()

        }
        this.functionsAttachment.removeAttachment = () =>
        {
            this.CONFIG.attachment["element-name"] = "None"
            this.functionsMASTER.build()

            // this.debugCamera.functions.default()


        }
    }

    setFunctionLights()
    {
        this.functionsLights = {}
        this.functionsLights.addLED = () =>
        {
            this.CONFIG.light['element-name'] = 'LED'
            this.functionsMASTER.build()
        }
        this.functionsLights.addRGB = () =>
        {
            this.CONFIG.light['element-name'] = 'RGB'
            this.functionsMASTER.build()
        }
        this.functionsLights.removeLight = () =>
        {
            this.CONFIG.light['element-name'] = 'None'
            this.functionsMASTER.build()
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
            this.debug.side01Folder.add(this.functionsSide01, 'addAutomaticSunscreen').name('addAutomaticSunscreen')
            this.debug.side01Folder.add(this.functionsSide01, 'addMosquito').name('addMosquito')
            this.debug.side01Folder.add(this.functionsSide01, 'removeAccessories').name('removeAccessories')
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

    debugLights()
    {
        this.setFunctionLights()

        if (this.debug.active)
        {
            this.debug.lightsFolder.add(this.functionsLights, 'addLED').name('LED')
            this.debug.lightsFolder.add(this.functionsLights, 'addRGB').name('RGB')
            this.debug.lightsFolder.add(this.functionsLights, 'removeLight').name('None')
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

