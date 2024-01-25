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
        this.materials = this.experience.materials
        this.debug = this.experience.debug

        this.world = new World()
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
        this.debugSizes()
        this.debugRoof()
        this.debugSide01()
        this.debugSide02()
        this.debugSide03()
        this.debugSide04()
        this.debugAttachment()

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

                this.key.width = 10 * value
                this.key.height = 10 * value
                this.top.width = 10 * value
                this.top.height = 10 * value
            })
        }
    }

    setFunctionSizes()
    {
        this.functionsSizes = {}
        this.functionsSizes.setQ01 = () =>
        {
            this.qudrix01.instance.scale.set(1, 1, 1)
            this.qudrix02.instance.scale.set(0, 0, 0)

            this.debugCamera.functions.default()
        }
        this.functionsSizes.setQ02 = () =>
        {
            this.qudrix01.instance.scale.set(0, 0, 0)
            this.qudrix02.instance.scale.set(1, 1, 1)

            this.debugCamera.functions.default()
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

    setFunctionRoof()
    {
        this.functionsRoof = {}
        this.functionsRoof.addRoofSolidPanels = () =>
        {
            this.qudrix01.roof.functions.addRoofSolidPanels()
            this.qudrix02.roof.functions.addRoofSolidPanels()

            this.debugCamera.functions.default()
        }
        this.functionsRoof.addRoofMirrorGlass = () =>
        {
            this.qudrix01.roof.functions.addRoofMirrorGlass()
            this.qudrix02.roof.functions.addRoofMirrorGlass()

            this.debugCamera.functions.default()
        }
        this.functionsRoof.addRoofPergolaQ25 = () =>
        {
            this.qudrix01.roof.functions.addRoofPergolaQ25()
            this.qudrix02.roof.functions.addRoofPergolaQ25()

            this.debugCamera.functions.default()
        }
        this.functionsRoof.addRoofPergolaQ27 = () =>
        {
            this.qudrix01.roof.functions.addRoofPergolaQ27()
            this.qudrix02.roof.functions.addRoofPergolaQ27()

            this.debugCamera.functions.default()
        }
        this.functionsRoof.removeAccessories = () =>
        {
            this.qudrix01.roof.functions.removeAccessories()
            this.qudrix02.roof.functions.removeAccessories()

            this.debugCamera.functions.default()
        }
        this.functionsRoof.addAccessories = () =>
        {
            this.qudrix01.roof.functions.addAccessories()
            this.qudrix02.roof.functions.addAccessories()

            this.debugCamera.functions.default()
        }
    }

    debugRoof()
    {
        this.setFunctionRoof()

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

            this.debugCamera.functions.side01()
        }
        this.functionsSide01.addSolidWall = () =>
        {
            this.qudrix01.side01.functions.addSolidWall()
            this.qudrix02.side01.functions.addSolidWall()

            this.debugCamera.functions.side01()
        }
        this.functionsSide01.addGlassWindow = () =>
        {
            this.qudrix01.side01.functions.addGlassWindow()
            this.qudrix02.side01.functions.addGlassWindow()

            this.debugCamera.functions.side01()
        }
        this.functionsSide01.addGuillotineWindow = () =>
        {
            this.qudrix01.side01.functions.addGuillotineWindow()
            this.qudrix02.side01.functions.addGuillotineWindow()

            this.debugCamera.functions.side01()
        }
        this.functionsSide01.addPortalDoor = () =>
        {
            this.qudrix01.side01.functions.addPortalDoor()
            this.qudrix02.side01.functions.addPortalDoor()

            this.debugCamera.functions.side01()
        }
        this.functionsSide01.addAccordionDoor = () =>
        {
            this.qudrix01.side01.functions.addAccordionDoor()
            this.qudrix02.side01.functions.addAccordionDoor()

            this.debugCamera.functions.side01()
        }
        this.functionsSide01.addSmartGlassWindow = () =>
        {
            this.qudrix01.side01.functions.addSmartGlassWindow()
            this.qudrix02.side01.functions.addSmartGlassWindow()

            this.debugCamera.functions.side01()
        }

    }

    setFunctionsSide02()
    {
        this.functionsSide02 = {}

        this.functionsSide02.addSliderDoor = () =>
        {
            this.qudrix02.side02.functions.addSliderDoor()
            this.qudrix02.side02.functions.addSliderDoor()

            this.debugCamera.functions.side02()
        }
        this.functionsSide02.addSolidWall = () =>
        {
            this.qudrix02.side02.functions.addSolidWall()
            this.qudrix02.side02.functions.addSolidWall()

            this.debugCamera.functions.side02()
        }
        this.functionsSide02.addGlassWindow = () =>
        {
            this.qudrix02.side02.functions.addGlassWindow()
            this.qudrix02.side02.functions.addGlassWindow()

            this.debugCamera.functions.side02()
        }
        this.functionsSide02.addGuillotineWindow = () =>
        {
            this.qudrix02.side02.functions.addGuillotineWindow()
            this.qudrix02.side02.functions.addGuillotineWindow()

            this.debugCamera.functions.side02()
        }
        this.functionsSide02.addPortalDoor = () =>
        {
            this.qudrix02.side02.functions.addPortalDoor()
            this.qudrix02.side02.functions.addPortalDoor()

            this.debugCamera.functions.side02()
        }
        this.functionsSide02.addAccordionDoor = () =>
        {
            this.qudrix02.side02.functions.addAccordionDoor()
            this.qudrix02.side02.functions.addAccordionDoor()

            this.debugCamera.functions.side02()
        }
        this.functionsSide02.addSmartGlassWindow = () =>
        {
            this.qudrix02.side02.functions.addSmartGlassWindow()
            this.qudrix02.side02.functions.addSmartGlassWindow()

            this.debugCamera.functions.side02()
        }

    }

    setFunctionsSide03()
    {
        this.functionsSide03 = {}

        this.functionsSide03.addSliderDoor = () =>
        {
            this.qudrix03.side03.functions.addSliderDoor()
            this.qudrix03.side03.functions.addSliderDoor()

            this.debugCamera.functions.side03()
        }
        this.functionsSide03.addSolidWall = () =>
        {
            this.qudrix03.side03.functions.addSolidWall()
            this.qudrix03.side03.functions.addSolidWall()

            this.debugCamera.functions.side03()
        }
        this.functionsSide03.addGlassWindow = () =>
        {
            this.qudrix03.side03.functions.addGlassWindow()
            this.qudrix03.side03.functions.addGlassWindow()

            this.debugCamera.functions.side03()
        }
        this.functionsSide03.addGuillotineWindow = () =>
        {
            this.qudrix03.side03.functions.addGuillotineWindow()
            this.qudrix03.side03.functions.addGuillotineWindow()

            this.debugCamera.functions.side03()
        }
        this.functionsSide03.addPortalDoor = () =>
        {
            this.qudrix03.side03.functions.addPortalDoor()
            this.qudrix03.side03.functions.addPortalDoor()

            this.debugCamera.functions.side03()
        }
        this.functionsSide03.addAccordionDoor = () =>
        {
            this.qudrix03.side03.functions.addAccordionDoor()
            this.qudrix03.side03.functions.addAccordionDoor()

            this.debugCamera.functions.side03()
        }
        this.functionsSide03.addSmartGlassWindow = () =>
        {
            this.qudrix03.side03.functions.addSmartGlassWindow()
            this.qudrix03.side03.functions.addSmartGlassWindow()

            this.debugCamera.functions.side03()
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
        }
        this.functionsSide04.addSolidWall = () =>
        {
            this.qudrix01.side04.functions.addSolidWall()
            this.qudrix02.side04.functions.addSolidWall()
            this.debugCamera.functions.side04()

        }
        this.functionsSide04.addGlassWindow = () =>
        {
            this.qudrix01.side04.functions.addGlassWindow()
            this.qudrix02.side04.functions.addGlassWindow()

            this.debugCamera.functions.side04()

        }
        this.functionsSide04.addGuillotineWindow = () =>
        {
            this.qudrix01.side04.functions.addGuillotineWindow()
            this.qudrix02.side04.functions.addGuillotineWindow()

            this.debugCamera.functions.side04()

        }
        this.functionsSide04.addPortalDoor = () =>
        {
            this.qudrix01.side04.functions.addPortalDoor()
            this.qudrix02.side04.functions.addPortalDoor()

            this.debugCamera.functions.side04()

        }
        this.functionsSide04.addAccordionDoor = () =>
        {
            this.qudrix01.side04.functions.addAccordionDoor()
            this.qudrix02.side04.functions.addAccordionDoor()

            this.debugCamera.functions.side04()

        }
        this.functionsSide04.addSmartGlassWindow = () =>
        {
            this.qudrix01.side04.functions.addSmartGlassWindow()
            this.qudrix02.side04.functions.addSmartGlassWindow()

            this.debugCamera.functions.side04()

        }

    }

    debugSide01()
    {
        this.setFunctionsSide01()

        if (this.debug.active)
        {
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

        if (this.debug.active)
        {
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

        if (this.debug.active)
        {
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

        if (this.debug.active)
        {
            this.debug.side04Folder.add(this.functionsSide04, 'addSliderDoor').name('SliderDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addSolidWall').name('SolidWall')
            this.debug.side04Folder.add(this.functionsSide04, 'addGlassWindow').name('GlassWindow')
            this.debug.side04Folder.add(this.functionsSide04, 'addGuillotineWindow').name('GuillotineWindow')
            this.debug.side04Folder.add(this.functionsSide04, 'addPortalDoor').name('PortalDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addAccordionDoor').name('AccordionDoor')
            this.debug.side04Folder.add(this.functionsSide04, 'addSmartGlassWindow').name('SmartGlassWindow')
        }

    }

    debugAttachment()
    {

        this.functionsAttachment = {}
        this.functionsAttachment.addAutomaticAwing = () =>
        {
            this.qudrix01.attachment.functions.addAutomaticAwing()
            this.qudrix02.attachment.functions.addAutomaticAwing()

            this.debugCamera.functions.default()
        }
        this.functionsAttachment.addBioclimacticPergola = () =>
        {
            this.qudrix01.attachment.functions.addBioclimacticPergola()
            this.qudrix02.attachment.functions.addBioclimacticPergola()

            this.debugCamera.functions.default()
        }
        this.functionsAttachment.removeAttachment = () =>
        {
            this.qudrix01.attachment.functions.removeAttachment()
            this.qudrix02.attachment.functions.removeAttachment()

            this.debugCamera.functions.default()
        }

        if (this.debug.active)
        {
            // Attachment
            this.debug.attachmentFolder.add(this.functionsAttachment, 'addAutomaticAwing').name('AutomaticAwing')
            this.debug.attachmentFolder.add(this.functionsAttachment, 'addBioclimacticPergola').name('BioclimacticPergola')
            this.debug.attachmentFolder.add(this.functionsAttachment, 'removeAttachment').name('removeAttachment')
        }
    }



    setCameraFunctions(camera)
    {
        this.functionsCamera = {}

        this.functionsCamera.default = () =>
        {
            this.duration = 0.75
            this.positionY = 0
            this.scaleXYZ = 1

            console.log(camera.position);

            gsap.to(camera.position, {
                x: 14,
                y: 9.5,
                z: 10,
                ease: this.ease,
                duration: this.duration
            })
            gsap.to(camera.rotation, {
                x: -0.7,
                y: 0.8,
                z: 0.56,
                ease: this.ease,
                duration: this.duration
            })
            this.scaleBuildingAndLights(this.positionY, this.scaleXYZ)
        }

        this.functionsCamera.side01 = () =>
        {
            this.duration = 1
            this.positionY = -2.75
            this.scaleXYZ = 2.5
            gsap
                .to(camera.position, {
                    x: 0,
                    y: 1,
                    z: 13.5,
                    ease: this.ease,
                    duration: this.duration
                })
            gsap
                .to(camera.rotation, {
                    x: 0.0785,
                    y: 0.000,
                    z: 0.000,
                    ease: this.ease,
                    duration: this.duration
                })
            this.scaleBuildingAndLights(this.positionY, this.scaleXYZ)
        }
    }

    debugCamera(camera)
    {
        this.setCameraFunctions(camera)
        // Debug

        if (this.debug.active)
        {
            this.debug.cameraFolder.add(this.functionsCamera, 'default')
            this.debug.cameraFolder.add(this.functionsCamera, 'side01')
            // this.debug.cameraFolder.add(this.functionsCamera, 'side02')
            // this.debug.cameraFolder.add(this.functionsCamera, 'side03')
            // this.debug.cameraFolder.add(this.functionsCamera, 'side04')
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


}

