import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

import Loaders from '../../../Utils/Loaders'
import Materials from '../../../Resources/Materials'

import Experience from '../../../Experience'
import Animation from '../../../Utils/Animation'
import AreaLight from '../../Lights/AreaLight'

export default class StaticModel
{
    constructor(CONFIG)
    {
        this.experience = new Experience()
        this.manager = this.experience.manager
        this.time = this.experience.time
        this.animation = new Animation()
        this.debug = this.experience.debug


        this.loader = new Loaders(this.manager.loadingManager)

        this.materials = this.experience.materials

        this.instance = new THREE.Group()

        /**
         * Base
         */

        this.base = new THREE.Group()

        /**
         * Roof
         */
        this.roofSolidPanels = new THREE.Group()
        this.roofMirrorGlass = new THREE.Group()

        /**
         * Sides
         */
        this.glassWindow = new THREE.Group()
        this.solidWall = new THREE.Group()
        this.smartGlassWindow = new THREE.Group()

        /**
         * Attachmet
         */
        this.attachment = new THREE.Group()

        this.loadStaticModel(CONFIG)
    }



    loadStaticModel(CONFIG)
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
                    * Add Base
                    */
                    if (child.name === 'base' ||
                        child.name === 'floor')
                    {
                        this.base.add(child)

                        // child.castShadow = true
                        // child.receiveShadow = true

                        // console.log(child.material);
                        child.material = this.materials.wallBlack

                    }

                    /**
                     * Add Roof
                     */

                    // Add roof solid panel + add roof mirror glass
                    if (child.name === 'roof_fixed_aluminium_slats')
                    {
                        const material = child.material
                        this.roofSolidMesh = new THREE.Mesh(
                            new THREE.PlaneGeometry(1, 1, 1, 1),
                            material
                        )
                        this.roofMirrorMesh = new THREE.Mesh(
                            new THREE.PlaneGeometry(1, 1, 1, 1),
                            new THREE.MeshBasicMaterial()
                        )

                        // Solid
                        this.roofSolidMesh.copy(child)
                        this.roofSolidMesh.material = this.materials.roofWhite
                        this.roofSolidPanels.add(this.roofSolidMesh)
                        this.roofSolidMesh.castShadow = false
                        this.roofSolidMesh.receiveShadow = false

                        this.roofSolidPanels.scale.set(0,0,0)

                        // Mirror
                        this.roofMirrorMesh.copy(child)
                        this.roofMirrorMesh.material = this.materials.mirrorGlass
                        this.roofMirrorGlass.add(this.roofMirrorMesh)
                        this.roofMirrorGlass.castShadow = false
                        this.roofMirrorGlass.receiveShadow = false
                        this.roofMirrorGlass.renderOrder = 1
                        // Check CONFIG
                        // if (CONFIG.roof['element-name'] === 'Mirror Glass') { this.roofMirrorGlass.scale.set(1, 1, 1) }
                        // else { this.roofMirrorGlass.scale.set(0, 0, 0) }

                    }

                    /**
                     * Add Sides
                     */

                    if (child.name === 'sides_glass_window')
                    {
                        this.glassWindow.add(child)
                        this.glassWindow.scale.set(0, 0, 0)

                        child.children[0].material = this.materials.sidesGlass
                        child.children[0].renderOrder = 1
                        // child.castShadow = true
                        // child.receiveShadow = true
                    }

                    if (child.name === 'sides_solid_panel_01')
                    {
                        this.solidWall.add(child)
                        this.solidWall.scale.set(0, 0, 0)
                        // child.castShadow = true
                        // child.receiveShadow = true
                    }

                    if (child.name === 'sides_solid_panels_02')
                    {
                        this.smartGlassWindow.add(child)
                        this.smartGlassWindow.scale.set(0, 0, 0)
                        // child.castShadow = true
                        // child.receiveShadow = true
                        child.children[1].material = this.materials.sidesGlass
                        child.children[1].renderOrder = 1

                    }

                    /**
                     * Attachment
                     */

                    if (child.name === 'attach_bioclimactic_pergola_Q27')
                    {

                        // console.log(child);
                        this.attachment.add(child.children[0])
                    }

                    // Material attachment
                    gltf.scene.traverse((object) =>
                    {
                        if (object.isMesh)
                        {
                            object.receiveShadow = true
                            object.castShadow = true
                        }
                        if (object.isMesh && object.name === 'attach_bioclimactic_pergola_Q27_base')
                        {
                            // console.log(object.material.name);
                            object.material = this.materials.wallBlack
                        }
                    })

                }
            }
        )
    }

    setFunctions()
    {
        this.functions = {}

        this.functions.blackColor = () =>
        {
            this.materials.wallBlack.color = new THREE.Color(0x161616)
        }

        this.functions.creamColor = () =>
        {
            this.materials.wallBlack.color = new THREE.Color(0xF2EFE4)
        }
    }
}