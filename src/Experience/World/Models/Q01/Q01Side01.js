//rename Side01, side-01

import * as THREE from 'three'
import Loaders from '../../../Utils/Loaders'
import Materials from '../../../Resources/Materials'

import Experience from '../../../Experience'
import Animation from '../../../Utils/Animation'

import Qudrix01 from '../Qudrix01'
import StaticModel from './Q01StaticModel'


export default class Side01
{
    constructor(CONFIG)
    {
        this.experience = new Experience()

        this.time = this.experience.time
        this.animation = new Animation()
        this.debug = this.experience.debug

        this.manager = this.experience.manager
        this.loader = new Loaders(this.manager.loadingManager)
        this.materials = this.experience.materials

        this.qudrix01 = new Qudrix01()
        this.staticModel = new StaticModel(CONFIG)

        this.instance = new THREE.Group()

        this.glassWindow = new THREE.Group()
        this.solidWall = new THREE.Group()
        this.smartGlassWindow = new THREE.Group()
        this.sliderDoor = new THREE.Group()
        this.portalDoor = new THREE.Group()
        this.guillotineWindow = new THREE.Group()
        this.accordionDoor = new THREE.Group()
        this.mosquito = new THREE.Group()
        this.automaticSunscreen = new THREE.Group()


        this.instance.add(
            this.glassWindow,
            this.solidWall,
            this.smartGlassWindow,
            this.sliderDoor,
            this.portalDoor,
            this.guillotineWindow,
            this.accordionDoor,
            this.mosquito,
            this.automaticSunscreen
        )

        /**
         * Sides Animations
         */
        this.mixerSliderDoor = null
        this.mixerPortalDoor = null
        this.mixerGuillotineWindow = null
        this.mixerAccordionDoor = null

        /**
         * Load Sides
         */
        this.loadWalls(CONFIG)
        this.loadGlassWindow(CONFIG)
        this.loadSliderDoor(CONFIG)
        this.loadPortalDoor(CONFIG)
        this.loadGuillotineWindow(CONFIG)
        this.loadAccordionDoor(CONFIG)
        this.loadMosquito(CONFIG)
        this.loadAutomaticSunscreen(CONFIG)

        /**
         * Set functions
         */
        this.setFunctions(CONFIG)


    }

    loadWalls(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/qudrix-webgl_q1.glb',
            (gltf) =>
            {
                // console.log(gltf);
                const children = [...gltf.scene.children]

                for (const child of children)
                {

                    /**
                     * Add Sides
                     */

                    if (child.name === 'sides_solid_panel_01')
                    {
                        this.solidWall.add(child)

                        child.children[1].material = this.materials.wallBlack
                        // this.solidWall.scale.set(0, 0, 0)
                        child.castShadow = true
                        child.receiveShadow = true

                        if (CONFIG.sides['side-01']['element-name'] === "Solid Panels") { this.solidWall.scale.set(1, 1, 1) }
                        else { this.solidWall.scale.set(0, 0, 0) }
                    }

                    if (child.name === 'sides_solid_panels_02')
                    {
                        this.smartGlassWindow.add(child)
                        // this.smartGlassWindow.scale.set(0, 0, 0)
                        child.castShadow = true
                        child.receiveShadow = true
                        child.children[0].material = this.materials.glassWindow
                        child.children[1].material = this.materials.glassWindow

                        if (CONFIG.sides['side-01']['element-name'] === "Smart Glass Window") { this.smartGlassWindow.scale.set(1, 1, 1) }
                        else { this.smartGlassWindow.scale.set(0, 0, 0) }
                    }

                }
            }
        )
    }

    loadGlassWindow(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_glassWindow.gltf',
            (gltf) =>
            {
                // this.glassWindow.add(gltf.scene)

                const glass = gltf.scene.children[0].children[0]
                const metal = gltf.scene.children[0].children[1]

                // console.log(gltf.scene.children[0].children[0]);

                this.glassWindow.add(
                    glass,
                    metal
                )

                glass.material = this.materials.glassWindow
                metal.material = this.materials.wallBlack

                if (CONFIG.sides['side-01']['element-name'] === "Glass Window") { this.glassWindow.scale.set(1, 1, 1) }
                else { this.glassWindow.scale.set(0, 0, 0) }

            }
        )
    }

    loadSliderDoor(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_sides_slider-door.glb',
            (gltf) =>
            {
                this.sliderDoor.add(gltf.scene)



                gltf.scene.children[0].children[0].material = this.materials.wallBlack
                gltf.scene.children[0].children[1].material = this.materials.wallBlack
                gltf.scene.children[0].children[2].material = this.materials.wallBlack
                gltf.scene.children[0].children[3].material = this.materials.wallBlack

                gltf.scene.children[0].children[4].children[0].material = this.materials.wallBlack
                gltf.scene.children[0].children[4].children[1].material = this.materials.glassWindow
                gltf.scene.children[0].children[5].children[0].material = this.materials.wallBlack
                gltf.scene.children[0].children[5].children[1].material = this.materials.glassWindow
                gltf.scene.children[0].children[6].children[0].material = this.materials.wallBlack
                gltf.scene.children[0].children[6].children[1].material = this.materials.glassWindow
                gltf.scene.children[0].children[7].children[0].material = this.materials.wallBlack
                gltf.scene.children[0].children[7].children[1].material = this.materials.glassWindow

                // this.sliderDoor.rotation.y = Math.PI / -2

                // Shadows
                gltf.scene.traverse((child) =>
                {
                    if (child.isMesh)
                    {
                        child.receiveShadow = true
                        child.castShadow = true
                    }

                    if (child.isMesh && child.material.name === 'glass 001')
                    {
                        child.material = this.materials.glass

                    }
                })

                this.mixerSliderDoor = new THREE.AnimationMixer(gltf.scene)
                this.actionSliderDoor = this.mixerSliderDoor.clipAction(gltf.animations[0])
                // console.log(this.actionSliderDoor);

                this.animation.play(this.actionSliderDoor, 1.5)

                if (CONFIG.sides['side-01']['element-name'] === 'Slider Door') { this.sliderDoor.scale.set(1, 1, 1) }
                else { this.sliderDoor.scale.set(0, 0, 0) }


            }
        )
    }

    loadPortalDoor(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_sides_portal-door.glb',
            (gltf) =>
            {
                this.portalDoor.add(gltf.scene)

                // frame
                gltf.scene.children[0].children[0].material = this.materials.wallBlack
                // part01 frame
                gltf.scene.children[0].children[1].children[0].material = this.materials.wallBlack
                // part01 frame
                gltf.scene.children[0].children[1].children[1].material = this.materials.glassWindow
                // part02 frame
                gltf.scene.children[0].children[2].children[0].material = this.materials.wallBlack
                // part02 frame
                gltf.scene.children[0].children[2].children[1].material = this.materials.glassWindow


                // this.portalDoor.add(
                //     frame,
                //     part01,
                //     part02
                // )
                // this.sliderDoor.rotation.y = Math.PI / -2

                // Shadows
                gltf.scene.traverse((child) =>
                {
                    if (child.isMesh)
                    {
                        child.receiveShadow = true
                        child.castShadow = true
                    }

                    // console.log(child.material);

                    // if (child.isMesh && child.material.name === 'Glass 001')
                    // {
                    //     child.material = this.materials.glass

                    // }
                })



                this.mixerPortalDoor = new THREE.AnimationMixer(gltf.scene)
                this.actionPortalDoor = this.mixerPortalDoor.clipAction(gltf.animations[0])

                this.animation.reverse(this.actionPortalDoor, 1.5)

                if (CONFIG.sides['side-01']['element-name'] === "Portal door") { this.portalDoor.scale.set(1, 1, 1) }
                else { this.portalDoor.scale.set(0, 0, 0) }


            }
        )
    }

    loadGuillotineWindow(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_sides_guillotine-q2-window.glb',
            (gltf) =>
            {
                this.guillotineWindow.add(gltf.scene)

                // this.guillotineWindow.rotation.x = Math.PI 



                gltf.scene.traverse((child) =>
                {

                    if (child.isMesh && child.material.name === 'glass 003')
                    {
                        child.material = this.materials.glassWindow
                    }
                    if (child.isMesh && child.material.name === 'Metal для всех 001')
                    {
                        child.material = this.materials.wallBlack
                    }
                })

                // Shadows
                gltf.scene.traverse((child) =>
                {
                    if (child.isMesh)
                    {
                        child.receiveShadow = true
                        child.castShadow = true
                    }
                })

                this.mixerGuillotineWindow = new THREE.AnimationMixer(gltf.scene)
                this.actionGuillotineWindow = this.mixerGuillotineWindow.clipAction(gltf.animations[0])

                this.animation.play(this.actionGuillotineWindow, 1.5)

                if (CONFIG.sides['side-01']['element-name'] === "Guillotine Q2 Window") { this.guillotineWindow.scale.set(1, 1, 1) }
                else { this.guillotineWindow.scale.set(0, 0, 0) }


            }
        )
    }

    loadAccordionDoor(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_sides_accordion-door.glb',
            (gltf) =>
            {
                this.accordionDoor.add(gltf.scene)
                // this.sliderDoor.rotation.y = Math.PI / -2

                gltf.scene.traverse((child) =>
                {

                    if (child.isMesh && child.material.name === 'Glass')
                    {
                        child.material = this.materials.glassWindow

                    }
                    if (child.isMesh && child.material.name === 'Metal 002')
                    {
                        child.material = this.materials.wallBlack

                    }
                    if (child.isMesh && child.material.name === 'Black Plastic')
                    {
                        child.material = this.materials.roofWhite

                    }
                })

                // Shadows
                gltf.scene.traverse((child) =>
                {
                    if (child.isMesh)
                    {
                        child.receiveShadow = true
                        child.castShadow = true
                    }
                })

                this.mixerAccordionDoor = new THREE.AnimationMixer(gltf.scene)
                this.actionAccordionDoor = this.mixerAccordionDoor.clipAction(gltf.animations[0])

                this.animation.reverse(this.actionAccordionDoor, 1.5)

                if (CONFIG.sides['side-01']['element-name'] === "Accordion Door") { this.accordionDoor.scale.set(1, 1, 1) }
                else { this.accordionDoor.scale.set(0, 0, 0) }


            }
        )
    }

    loadAutomaticSunscreen(CONFIG)
    {
        {
            this.loader.gltf.load(
                '/3D/Q01/Animation/qudrix-webgl_q1_automatic_sunscreen.gltf',
                (gltf) =>
                {
                    gltf.scene.children[0].children[0].material = this.materials.sunscreen
                    gltf.scene.children[0].children[1].material = this.materials.wallBlack
                    this.automaticSunscreen.add(gltf.scene)
                    this.automaticSunscreen.position.x = -0.05

                    this.mixerAutomaticSunscreen = new THREE.AnimationMixer(gltf.scene)
                    this.actionAutomaticSunscreen = this.mixerAutomaticSunscreen.clipAction(gltf.animations[0])

                    this.animation.play(this.actionAutomaticSunscreen, 1.5)

                    this.statusAutomaticSunscreen = true

                    if (CONFIG.sides['side-01']['accessory01-name'] === "Automatic sunscreen")
                    {
                        this.automaticSunscreen.scale.set(1, 1, 1)
                        this.statusAutomaticSunscreen = true
                    }
                    else
                    {
                        this.automaticSunscreen.scale.set(0, 0, 0)
                        this.statusAutomaticSunscreen = false
                    }
                })
        }
    }

    loadMosquito(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_mosquito_02.gltf',
            (gltf) =>
            {

                gltf.scene.children[0].children[0].material = this.materials.wallBlack
                gltf.scene.children[0].children[1].children[0].material = this.materials.wallBlack
                gltf.scene.children[0].children[1].children[1].material = this.materials.sunscreen

                this.mosquito.add(gltf.scene)
                this.mosquito.position.x = -0.05

                this.mixerMosquito = new THREE.AnimationMixer(gltf.scene)
                this.actionMosquito = this.mixerMosquito.clipAction(gltf.animations[0])

                this.animation.play(this.actionMosquito, 1.5)

                if (CONFIG.sides['side-01']['accessory02-name'] === "Mosquito net")
                {
                    this.mosquito.scale.set(1, 1, 1)
                    this.statusMosquito = true
                }
                else
                {
                    this.mosquito.scale.set(0, 0, 0)
                    this.statusMosquito = false
                }
            })
    }



    setFunctions(CONFIG)
    {
        this.functions = {}

        this.functions.addSliderDoor = () =>
        {
            this.sliderDoor.scale.set(1, 1, 1)
            this.solidWall.scale.set(0, 0, 0)
            this.glassWindow.scale.set(0, 0, 0)
            this.guillotineWindow.scale.set(0, 0, 0)
            this.portalDoor.scale.set(0, 0, 0)
            this.accordionDoor.scale.set(0, 0, 0)
            this.smartGlassWindow.scale.set(0, 0, 0)

            this.animation.play(this.actionSliderDoor, 1.5)

        }

        this.functions.addSolidPanels = () =>
        {
            this.sliderDoor.scale.set(0, 0, 0)
            this.solidWall.scale.set(1, 1, 1)
            this.glassWindow.scale.set(0, 0, 0)
            this.guillotineWindow.scale.set(0, 0, 0)
            this.portalDoor.scale.set(0, 0, 0)
            this.accordionDoor.scale.set(0, 0, 0)
            this.smartGlassWindow.scale.set(0, 0, 0)
        }

        this.functions.addGlassWindow = () =>
        {
            this.sliderDoor.scale.set(0, 0, 0)
            this.solidWall.scale.set(0, 0, 0)
            this.glassWindow.scale.set(1, 1, 1)
            this.guillotineWindow.scale.set(0, 0, 0)
            this.portalDoor.scale.set(0, 0, 0)
            this.accordionDoor.scale.set(0, 0, 0)
            this.smartGlassWindow.scale.set(0, 0, 0)
        }

        this.functions.addGuillotineWindow = () =>
        {
            this.sliderDoor.scale.set(0, 0, 0)
            this.solidWall.scale.set(0, 0, 0)
            this.glassWindow.scale.set(0, 0, 0)
            this.guillotineWindow.scale.set(1, 1, 1)
            this.portalDoor.scale.set(0, 0, 0)
            this.accordionDoor.scale.set(0, 0, 0)
            this.smartGlassWindow.scale.set(0, 0, 0)

            this.animation.play(this.actionGuillotineWindow, 1.5)

        }

        this.functions.addPortalDoor = () =>
        {
            this.sliderDoor.scale.set(0, 0, 0)
            this.solidWall.scale.set(0, 0, 0)
            this.glassWindow.scale.set(0, 0, 0)
            this.guillotineWindow.scale.set(0, 0, 0)
            this.portalDoor.scale.set(1, 1, 1)
            this.accordionDoor.scale.set(0, 0, 0)
            this.smartGlassWindow.scale.set(0, 0, 0)

            this.animation.reverse(this.actionPortalDoor, 1.5)

        }

        this.functions.addAccordionDoor = () =>
        {
            this.sliderDoor.scale.set(0, 0, 0)
            this.solidWall.scale.set(0, 0, 0)
            this.glassWindow.scale.set(0, 0, 0)
            this.guillotineWindow.scale.set(0, 0, 0)
            this.portalDoor.scale.set(0, 0, 0)
            this.accordionDoor.scale.set(1, 1, 1)
            this.smartGlassWindow.scale.set(0, 0, 0)

            this.animation.reverse(this.actionAccordionDoor, 1.5)

        }

        this.functions.addSmartGlassWindow = () =>
        {
            this.sliderDoor.scale.set(0, 0, 0)
            this.solidWall.scale.set(0, 0, 0)
            this.glassWindow.scale.set(0, 0, 0)
            this.guillotineWindow.scale.set(0, 0, 0)
            this.portalDoor.scale.set(0, 0, 0)
            this.accordionDoor.scale.set(0, 0, 0)
            this.smartGlassWindow.scale.set(1, 1, 1)
        }

        this.functions.addAutomaticSunscreen = () =>
        {
           
            this.automaticSunscreen.scale.set(1, 1, 1)
            this.mosquito.scale.set(0, 0, 0)

            this.animation.play(this.actionAutomaticSunscreen, 1.5)


        }

        this.functions.addMosquito = () =>
        {
            this.automaticSunscreen.scale.set(0, 0, 0)
            this.mosquito.scale.set(1, 1, 1)
        }

        this.functions.removeAccessories = () => {
            this.automaticSunscreen.scale.set(0, 0, 0)
            this.mosquito.scale.set(0, 0, 0)
        }

    }


    update()
    {
        if (this.mixerSliderDoor)
        {
            this.mixerSliderDoor.update(this.time.delta * 0.0005)
        }
        if (this.mixerPortalDoor)
        {
            this.mixerPortalDoor.update(this.time.delta * 0.0005)
        }
        if (this.mixerGuillotineWindow)
        {
            this.mixerGuillotineWindow.update(this.time.delta * 0.0005)
        }
        if (this.mixerAccordionDoor)
        {
            this.mixerAccordionDoor.update(this.time.delta * 0.0005)
        }
        if (this.mixerMosquito)
        {
            // this.mixerMosquito.update(this.time.delta * 0.0005)
        }
        if (this.mixerAutomaticSunscreen)
        {
            this.mixerAutomaticSunscreen.update(this.time.delta * 0.0005)
        }
    }
}