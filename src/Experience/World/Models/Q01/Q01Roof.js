import * as THREE from 'three'
import Loaders from '../../../Utils/Loaders'
import Materials from '../../../Resources/Materials'

import Experience from '../../../Experience'
import Animation from '../../../Utils/Animation'


import Qudrix01 from '../Qudrix01'


export default class Roof
{
    constructor(CONFIG)
    {
        this.experience = new Experience()

        this.time = this.experience.time
        this.animation = new Animation()
        this.debug = this.experience.debug

        this.loader = new Loaders()
        this.materials = this.experience.materials

        this.qudrix01 = new Qudrix01()

        this.instance = new THREE.Group()

        /**
         * Roof
         */
        this.roofSolidPanels = this.qudrix01.staticModel.roofSolidPanels
        this.roofMirrorGlass = this.qudrix01.staticModel.roofMirrorGlass
        this.roofPergolaQ25 = new THREE.Group()
        this.roofPergolaQ27 = new THREE.Group()
        this.roofAccessories = new THREE.Group()

        this.instance.add(
            this.roofSolidPanels,
            this.roofMirrorGlass,
            this.roofPergolaQ25,
            this.roofPergolaQ27,
            this.roofAccessories
        )
        this.roofAccessoriesStatus = false



        /**
         * Roof Animations
         */
        this.mixerPergolaQ25 = null
        this.mixerPergolaQ27 = null
        this.mixerRoofAccessories = null

        /**
         * Check Config
         */


        /**
         * Load Roof
         */
        this.loadRoofPergolaQ25(CONFIG)
        this.loadRoofPergolaQ27(CONFIG)
        this.loadRoofAccessories()

        /**
         * Set functions for debug
         */
        this.setFunctions()


    }

    loadRoofPergolaQ25(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_roof_bioclimatic-pergola-Q25.glb',
            (gltf) =>
            {
                this.roofPergolaQ25.add(gltf.scene)

                gltf.scene.traverse((obj) =>
                {
                    if (obj.isMesh)
                    {
                        obj.material = this.materials.roofWhite

                        obj.castShadow = true
                        obj.receiveShadow = true
                    }
                })

                this.mixerPergolaQ25 = new THREE.AnimationMixer(gltf.scene)
                this.actionPergolaQ25 = this.mixerPergolaQ25.clipAction(gltf.animations[0])
                this.animation.reverse(this.actionPergolaQ25, 1.5)



                // Check CONFIG
                if (CONFIG.roof['element-name'] === 'Swivel Sliding pergola Q25') { this.roofPergolaQ25.scale.set(1, 1, 1) }
                else { this.roofPergolaQ25.scale.set(0, 0, 0) }

            }
        )
    }

    loadRoofPergolaQ27(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_roof_bioclimatic-pergola-Q27.glb',
            (gltf) =>
            {
                this.roofPergolaQ27.add(gltf.scene)

                gltf.scene.traverse((obj) =>
                {
                    if (obj.isMesh)
                    {
                        obj.material = this.materials.roofWhite

                        obj.castShadow = true
                        obj.receiveShadow = true
                    }
                })

                this.mixerPergolaQ27 = new THREE.AnimationMixer(gltf.scene)
                this.actionPergolaQ27 = this.mixerPergolaQ27.clipAction(gltf.animations[0])
                this.animation.play(this.actionPergolaQ27, 1.5)

                // Check CONFIG
                if (CONFIG.roof['element-name'] === 'Bioclimatic pergola Q27') { this.roofPergolaQ27.scale.set(1, 1, 1) }
                else { this.roofPergolaQ27.scale.set(0, 0, 0) }



            }
        )
    }

    loadRoofAccessories()
    {
        this.loader.gltf.load(
            '/3D/Q01/Animation/qudrix-webgl_q1_roof_sunshade-dazzoni.glb',
            (gltf) =>
            {
                // console.log(gltf.scene);
                this.roofAccessories.add(gltf.scene)

                gltf.scene.traverse((obj) =>
                {
                    if (obj.isMesh)
                    {
                        obj.castShadow = true
                        obj.receiveShadow = true
                    }
                })

                this.roofAccessories.position.set(0, -0.15, 0)
                this.roofAccessories.scale.set(0, 0, 0) //(1, 1.1, 1)
                // gltf.scene.rotation.y = Math.PI / 2
                // this.roofAccessories.rotation.x = Math.PI / 2


                this.mixerRoofAccessories = new THREE.AnimationMixer(gltf.scene)
                this.actionRoofAccessories = this.mixerRoofAccessories.clipAction(gltf.animations[0])
                this.animation.play(this.actionRoofAccessories, 1.5)


            }
        )
    }

    setFunctions()
    {
        this.functions = {}

        this.functions.addRoofSolidPanels = () =>
        {
            this.roofSolidPanels.scale.set(1, 1, 1)
            this.roofMirrorGlass.scale.set(0, 0, 0)
            this.roofPergolaQ25.scale.set(0, 0, 0)
            this.roofPergolaQ27.scale.set(0, 0, 0)
            this.roofAccessories.scale.set(0, 0, 0)

            this.debug.pergolaQ27Accessories.close()
        }

        this.functions.addRoofMirrorGlass = () =>
        {
            this.roofSolidPanels.scale.set(0, 0, 0)
            this.roofMirrorGlass.scale.set(1, 1, 1)
            this.roofPergolaQ25.scale.set(0, 0, 0)
            this.roofPergolaQ27.scale.set(0, 0, 0)
            this.roofAccessories.scale.set(0, 0, 0)

            this.debug.pergolaQ27Accessories.close()
        }

        this.functions.addRoofPergolaQ25 = () =>
        {
            this.roofSolidPanels.scale.set(0, 0, 0)
            this.roofMirrorGlass.scale.set(0, 0, 0)
            this.roofPergolaQ25.scale.set(1, 1, 1)
            this.roofPergolaQ27.scale.set(0, 0, 0)
            this.roofAccessories.scale.set(0, 0, 0)

            this.animation.reverse(this.actionPergolaQ25, 1.5)
            this.debug.pergolaQ27Accessories.close()
        }
        this.functions.addRoofPergolaQ27 = () =>
        {
            this.roofSolidPanels.scale.set(0, 0, 0)
            this.roofMirrorGlass.scale.set(0, 0, 0)
            this.roofPergolaQ25.scale.set(0, 0, 0)
            this.roofPergolaQ27.scale.set(1, 1, 1)
            if (!this.roofAccessoriesStatus) this.roofAccessories.scale.set(0, 0, 0)
            if (this.roofAccessoriesStatus) this.roofAccessories.scale.set(1, 1.1, 1)


            this.animation.play(this.actionPergolaQ27, 1.5)
            this.debug.pergolaQ27Accessories.open()


        }

        this.functions.removeAccessories = () =>
        {
            this.roofAccessories.scale.set(0, 0, 0)
            this.roofAccessoriesStatus = false
            // this.roofPergolaQ27Opacity(this.roofPergolaQ27, false)

        }

        this.functions.addAccessories = () =>
        {
            this.roofAccessories.scale.set(1, 1.1, 1)
            this.animation.play(this.actionRoofAccessories, 1.5)

            this.roofAccessoriesStatus = true
            // this.roofPergolaQ27Opacity(this.roofPergolaQ27, true)

        }

    }

    roofPergolaQ27Opacity(roofPergolaQ27, status)
    {
        const roofPergolaQ27Array = roofPergolaQ27.children[0].children[0].children
        for (const child of roofPergolaQ27Array)
        {
            if (child.isMesh)
            {
                child.material.transparent = status
                if (status) child.material.opacity = 0.7
                if (!status) child.material.opacity = 1
            }
        }
    }

    update()
    {
        if (this.mixerPergolaQ25)
        {
            this.mixerPergolaQ25.update(this.time.delta * 0.0005)
        }
        if (this.mixerPergolaQ27)
        {
            this.mixerPergolaQ27.update(this.time.delta * 0.0005)
        }
        if (this.mixerRoofAccessories)
        {
            this.mixerRoofAccessories.update(this.time.delta * 0.0005)
        }

    }


}






// loadQudrix01(CONFIG)
// {
//     this.loader.gltf.load(
//         '/3D/Q01/qudrix-webgl_q1.glb',
//         (gltf) =>
//         {
//             // console.log(gltf);
//             const children = [...gltf.scene.children]

//             for (const child of children)
//             {
//                 /**
//                  * Add Roof
//                  */

//                 // Add roof solid panel + add roof mirror glass
//                 if (child.name === 'roof_fixed_aluminium_slats')
//                 {
//                     const material = child.material
//                     this.roofSolidMesh = new THREE.Mesh(
//                         new THREE.PlaneGeometry(1, 1, 1, 1),
//                         material
//                     )
//                     this.roofMirrorMesh = new THREE.Mesh(
//                         new THREE.PlaneGeometry(1, 1, 1, 1),
//                         material
//                     )

//                     // Solid
//                     this.roofSolidMesh.copy(child)
//                     this.roofSolidPanels.add(this.roofSolidMesh)
//                     this.roofSolidMesh.castShadow = true
//                     this.roofSolidMesh.receiveShadow = true
//                     // Check CONFIG
//                     if (CONFIG.roof['element-name'] === 'SolidPanels') { this.roofSolidPanels.scale.set(1, 1, 1) }
//                     else { this.roofSolidPanels.scale.set(0, 0, 0) }

//                     // Mirror
//                     this.roofMirrorMesh.copy(child)
//                     this.roofMirrorMesh.material = this.materials.glass
//                     this.roofMirrorGlass.add(this.roofMirrorMesh)
//                     this.roofMirrorGlass.castShadow = true
//                     this.roofMirrorGlass.receiveShadow = true
//                     // Check CONFIG
//                     if (CONFIG.roof['element-name'] === 'MirrorGlass') { this.roofMirrorGlass.scale.set(1, 1, 1) }
//                     else { this.roofMirrorGlass.scale.set(0, 0, 0) }

//                 }
//             }
//         }
//     )
// }