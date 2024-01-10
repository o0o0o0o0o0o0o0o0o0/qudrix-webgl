import * as THREE from 'three'
import Loaders from '../../Utils/Loaders'
import Materials from '../../Resources/Materials'

import Experience from '../../Experience'

let mixer

export default class Qudrix01
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.loader = new Loaders()

        this.materials = new Materials()

        this.instance = new THREE.Group()

        // Base
        this.base = new THREE.Group()

        // Roof
        this.roof = new THREE.Group()
        this.roofSolidPanels = new THREE.Group()
        this.roofMirrorGlass = new THREE.Group()
        this.roofPergolaQ25 = new THREE.Group()
        this.roofPergolaQ27 = new THREE.Group()
        this.roofAccessories = new THREE.Group()
        this.roof.add(
            this.roofSolidPanels,
            this.roofMirrorGlass,
            this.roofPergolaQ25,
            this.roofPergolaQ27,
            this.roofAccessories
        )

        this.roofAccessoriesStatus = false

        this.mixerPergolaQ25 = null
        this.mixerPergolaQ27 = null
        this.mixerRoofAccessories = null



        this.attachment = new THREE.Group()

        this.instance.add(
            this.base,
            this.roof,

        )

        this.loadQudrix01()
        this.loadRoofPergolaQ25()
        this.loadRoofPergolaQ27()
        this.loadRoofAccessories()



        this.wallsMaterials = new THREE.MeshBasicMaterial()

        this.roofStatus = 'default'

        this.roofDebug()


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
                    * Add Base
                    */
                    if (child.name === 'base' ||
                        child.name === 'floor')
                    {
                        this.base.add(child)

                        child.castShadow = true
                        child.receiveShadow = true
                    }

                    /**
                     * Add Roof
                     */

                    // Add roof solid panel
                    if (child.name === 'roof_fixed_aluminium_slats')
                    {
                        this.roofSolidMesh = new THREE.Mesh(
                            new THREE.PlaneGeometry(1, 1, 1, 1),
                            child.material
                        )

                        this.roofSolidMesh.copy(child)
                        this.roofSolidPanels.add(this.roofSolidMesh)
                        const scale = 1
                        this.roofSolidMesh.scale.set(scale, scale, scale)

                        this.roofSolidMesh.castShadow = true
                        this.roofSolidMesh.receiveShadow = true
                    }

                    // Add roof mirror glass
                    if (child.name === 'roof_fixed_aluminium_slats')
                    {
                        this.roofMirrorMesh = new THREE.Mesh(
                            new THREE.PlaneGeometry(1, 1, 1, 1),
                            child.material
                        )

                        this.roofMirrorMesh.copy(child)
                        this.roofMirrorMesh.material = this.materials.glass
                        // this.roofMirrorMesh.material = new THREE.MeshBasicMaterial()
                        this.roofMirrorGlass.add(this.roofMirrorMesh)
                        const scale = 0
                        this.roofMirrorGlass.scale.set(scale, scale, scale)

                        this.roofMirrorGlass.castShadow = true
                        this.roofMirrorGlass.receiveShadow = true
                    }



                }
            }
        )
    }

    loadRoofPergolaQ25()
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_roof_bioclimatic-pergola-Q25.glb',
            (gltf) =>
            {
                this.roofPergolaQ25.add(gltf.scene)
                this.roofPergolaQ25.scale.set(0, 0, 0)

                this.mixerPergolaQ25 = new THREE.AnimationMixer(gltf.scene)
                this.actionPergolaQ25 = this.mixerPergolaQ25.clipAction(gltf.animations[0])
                // console.log(this.actionPergolaQ25);
                this.actionPergolaQ25.timeScale = 1
                this.actionPergolaQ25.play()

                // Set up event listener for the finished event
                this.actionPergolaQ25.clampWhenFinished = true;
                this.actionPergolaQ25.loop = THREE.LoopOnce;

                // gltf's children hierarchy
                const objects = this.roofPergolaQ25.children[0].children[0].children
                for (const child of objects)
                {
                    child.receiveShadow = true
                    child.castShadow = true
                }




            }
        )
    }

    loadRoofPergolaQ27()
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_roof_bioclimatic-pergola-Q25.glb',
            (gltf) =>
            {
                this.roofPergolaQ27.add(gltf.scene)
                this.roofPergolaQ27.scale.set(0, 0, 0)

                this.mixerPergolaQ27 = new THREE.AnimationMixer(gltf.scene)
                this.actionPergolaQ27 = this.mixerPergolaQ27.clipAction(gltf.animations[0])
                // console.log(this.actionPergolaQ27);
                this.actionPergolaQ27.timeScale = 1
                this.actionPergolaQ27.play()

                // Set up event listener for the finished event
                this.actionPergolaQ27.clampWhenFinished = true;
                this.actionPergolaQ27.loop = THREE.LoopOnce;

                // gltf's children hierarchy
                const objects = this.roofPergolaQ27.children[0].children[0].children
                for (const child of objects)
                {
                    child.receiveShadow = true
                    child.castShadow = true
                }



            }
        )
    }

    loadRoofAccessories()
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_sides_automatic-sunscreen.glb',
            (gltf) =>
            {
                // console.log(gltf.scene);
                this.roofAccessories.add(gltf.scene)

                this.roofAccessories.position.set(0, 1.3, -1.5)
                this.roofAccessories.scale.set(0, 0, 0) //(1, 1.1, 1)
                gltf.scene.rotation.y = Math.PI / 2
                this.roofAccessories.rotation.x = Math.PI / 2


                this.mixerRoofAccessories = new THREE.AnimationMixer(gltf.scene)
                this.actionRoofAccessories = this.mixerRoofAccessories.clipAction(gltf.animations[0])
                // console.log(this.actionRoofAccessories);
                this.actionRoofAccessories.timeScale = 1
                this.actionRoofAccessories.play()


                this.actionRoofAccessories.clampWhenFinished = true;
                this.actionRoofAccessories.loop = THREE.LoopOnce;
                // this.actionRoofAccessories.loop = THREE.LoopPingPong;

                // console.log(this.roofAccessories.children[0].children[0].children[0].children);
                const objects = this.roofAccessories.children[0].children[0].children[0].children
                for (const child of objects)
                {
                    child.receiveShadow = true
                    child.castShadow = true
                }



            }
        )
    }


    setRoofFunctions()
    {
        this.roofFunctions = {}

        this.roofFunctions.addRoofSolidPanels = () =>
        {
            this.roofSolidPanels.scale.set(1, 1, 1)
            this.roofMirrorGlass.scale.set(0, 0, 0)
            this.roofPergolaQ25.scale.set(0, 0, 0)
            this.roofPergolaQ27.scale.set(0, 0, 0)
            this.roofAccessories.scale.set(0, 0, 0)

            this.debug.pergolaQ27Accessories.close()
        }

        this.roofFunctions.addRoofMirrorGlass = () =>
        {
            this.roofSolidPanels.scale.set(0, 0, 0)
            this.roofMirrorGlass.scale.set(1, 1, 1)
            this.roofPergolaQ25.scale.set(0, 0, 0)
            this.roofPergolaQ27.scale.set(0, 0, 0)
            this.roofAccessories.scale.set(0, 0, 0)

            this.debug.pergolaQ27Accessories.close()
        }

        this.roofFunctions.addRoofPergolaQ25 = () =>
        {
            this.roofSolidPanels.scale.set(0, 0, 0)
            this.roofMirrorGlass.scale.set(0, 0, 0)
            this.roofPergolaQ25.scale.set(1, 1, 1)
            this.roofPergolaQ27.scale.set(0, 0, 0)
            this.roofAccessories.scale.set(0, 0, 0)

            this.actionPergolaQ25.reset()
            this.debug.pergolaQ27Accessories.close()
        }
        this.roofFunctions.addRoofPergolaQ27 = () =>
        {
            this.roofSolidPanels.scale.set(0, 0, 0)
            this.roofMirrorGlass.scale.set(0, 0, 0)
            this.roofPergolaQ25.scale.set(0, 0, 0)
            this.roofPergolaQ27.scale.set(1, 1, 1)
            if (!this.roofAccessoriesStatus) this.roofAccessories.scale.set(0, 0, 0)
            if (this.roofAccessoriesStatus) this.roofAccessories.scale.set(1, 1.1, 1)


            this.actionPergolaQ27.reset()
            this.debug.pergolaQ27Accessories.open()
        }

        this.roofFunctions.removeAccessories = () =>
        {
            this.roofAccessories.scale.set(0, 0, 0)
            this.roofAccessoriesStatus = false
        }

        this.roofFunctions.addAccessories = () =>
        {
            this.roofAccessories.scale.set(1, 1.1, 1)
            this.actionRoofAccessories.reset()

            this.roofAccessoriesStatus = true
        }

    }

    roofDebug()
    {
        this.setRoofFunctions()

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.roofFolder.add(this.roofFunctions, 'addRoofSolidPanels').name('SolidPanels')
            this.debug.roofFolder.add(this.roofFunctions, 'addRoofMirrorGlass').name('MirrorGlass')
            this.debug.roofFolder.add(this.roofFunctions, 'addRoofPergolaQ25').name('PergolaQ25')
            this.debug.roofFolder.add(this.roofFunctions, 'addRoofPergolaQ27').name('PergolaQ27')

            this.debug.pergolaQ27Accessories.add(this.roofFunctions, 'removeAccessories').name('No Accessories')
            this.debug.pergolaQ27Accessories.add(this.roofFunctions, 'addAccessories').name('Add Sunshade')
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