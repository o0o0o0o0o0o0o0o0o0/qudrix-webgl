import * as THREE from 'three'
import Loaders from '../../../Utils/Loaders'
import Materials from '../../../Resources/Materials'

import Experience from '../../../Experience'

export default class Side01
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.loader = new Loaders()
        this.materials = new Materials()

        this.instance = new THREE.Group()

        this.sliderDoor = new THREE.Group()
        this.portalDoor = new THREE.Group()
        this.glassWindow = new THREE.Group()
        this.guillotineWindow = new THREE.Group()
        this.accordionDoor = new THREE.Group()
        this.solidWall = new THREE.Group()
        this.smartGlassWindow = new THREE.Group()

        this.instance.add(
            this.sliderDoor,
            this.portalDoor,
            this.glassWindow,
            this.guillotineWindow,
            this.accordionDoor,
            this.solidWall,
            this.smartGlassWindow
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
        this.loadQudrix01() //load from the main file
        this.loadSliderDoor()
        this.loadPortalDoor()
        this.loadGuillotineWindow()
        this.loadAccordionDoor()
        // this.sidesDebug()

    }

    loadQudrix01()
    {
        this.loader.gltf.load(
            '/3D/qudrix-webgl_q1.glb',
            (gltf) =>
            {
                // console.log(gltf);
                const children = [...gltf.scene.children]

                for (const child of children)
                {

                    /**
                     * Add Sides
                     */

                    if (child.name === 'sides_glass_window')
                    {
                        this.glassWindow.add(child)
                        this.glassWindow.scale.set(0, 0, 0)

                        child.children[0].material = this.materials.glassWindow

                        child.castShadow = true
                        child.receiveShadow = true
                    }

                    if (child.name === 'sides_solid_panel_01')
                    {
                        this.solidWall.add(child)
                        this.solidWall.scale.set(0, 0, 0)
                        child.castShadow = true
                        child.receiveShadow = true
                    }

                    if (child.name === 'sides_solid_panels_02')
                    {
                        this.smartGlassWindow.add(child)
                        this.smartGlassWindow.scale.set(0, 0, 0)
                        child.castShadow = true
                        child.receiveShadow = true
                        child.children[1].material = this.materials.glassWindow
                    }

                }
            }
        )
    }


    loadSliderDoor()
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_sides_slider-door.glb',
            (gltf) =>
            {
                this.sliderDoor.add(gltf.scene)
                this.sliderDoor.scale.set(0, 0, 0)
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
                this.actionSliderDoor.timeScale = 1
                this.actionSliderDoor.play()

                // Set up event listener for the finished event
                this.actionSliderDoor.clampWhenFinished = true;
                this.actionSliderDoor.loop = THREE.LoopOnce;

            }
        )
    }

    loadPortalDoor()
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_sides_portal-door.glb',
            (gltf) =>
            {
                this.portalDoor.add(gltf.scene)
                this.portalDoor.scale.set(0, 0, 0)
                // this.sliderDoor.rotation.y = Math.PI / -2

                // Shadows
                gltf.scene.traverse((child) =>
                {
                    if (child.isMesh)
                    {
                        child.receiveShadow = true
                        child.castShadow = true
                    }

                    if (child.isMesh && child.material.name === 'Glass 001')
                    {
                        child.material = this.materials.glassWindow

                    }
                })

                this.mixerPortalDoor = new THREE.AnimationMixer(gltf.scene)
                this.actionPortalDoor = this.mixerPortalDoor.clipAction(gltf.animations[0])
                // console.log(this.actionPortalDoor);
                this.actionPortalDoor.timeScale = 1
                this.actionPortalDoor.play()

                // Set up event listener for the finished event
                this.actionPortalDoor.clampWhenFinished = true;
                this.actionPortalDoor.loop = THREE.LoopOnce;

            }
        )
    }

    loadGuillotineWindow()
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_sides_guillotine-q2-window.glb',
            (gltf) =>
            {
                this.guillotineWindow.add(gltf.scene)
                this.guillotineWindow.scale.set(0, 0, 0)
                // this.sliderDoor.rotation.y = Math.PI / -2

                gltf.scene.traverse((child) =>
                {
                    if (child.isMesh && child.material.name === 'glass 003')
                    {
                        child.material = this.materials.glass
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
                // console.log(this.actionGuillotineWindow);
                this.actionGuillotineWindow.timeScale = 1
                this.actionGuillotineWindow.play()

                // Set up event listener for the finished event
                this.actionGuillotineWindow.clampWhenFinished = true;
                this.actionGuillotineWindow.loop = THREE.LoopOnce;

            }
        )
    }

    loadAccordionDoor()
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_sides_accordion-door.glb',
            (gltf) =>
            {
                this.accordionDoor.add(gltf.scene)
                this.accordionDoor.scale.set(0, 0, 0)
                // this.sliderDoor.rotation.y = Math.PI / -2

                gltf.scene.traverse((child) =>
                {

                    if (child.isMesh && child.material.name === 'Glass')
                    {
                        child.material = this.materials.glass

                        // console.log(child.material);
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
                // console.log(this.actionAccordionDoor);
                this.actionAccordionDoor.timeScale = 1
                this.actionAccordionDoor.play()

                // Set up event listener for the finished event
                this.actionAccordionDoor.clampWhenFinished = true;
                this.actionAccordionDoor.loop = THREE.LoopOnce;

            }
        )
    }

    setFunctions()
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

            this.actionSliderDoor.reset()
        }

        this.functions.addSolidWall = () =>
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

            this.actionGuillotineWindow.reset()
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

            this.actionPortalDoor.reset()
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

            this.actionAccordionDoor.reset()
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
    }
}