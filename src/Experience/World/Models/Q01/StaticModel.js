import * as THREE from 'three'
import Loaders from '../../../Utils/Loaders'
import Materials from '../../../Resources/Materials'

import Experience from '../../../Experience'
import Animation from '../../../Utils/Animation'

export default class StaticModel
{
    constructor(CONFIG)
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.animation = new Animation()
        this.debug = this.experience.debug

        this.loader = new Loaders()
        this.materials = new Materials()

        this.instance = new THREE.Group()

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
            '/3D/qudrix-webgl_q1.glb',
            (gltf) =>
            {
                // console.log(gltf);
                const children = [...gltf.scene.children]

                for (const child of children)
                {
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
                            material
                        )

                        // Solid
                        this.roofSolidMesh.copy(child)
                        this.roofSolidPanels.add(this.roofSolidMesh)
                        this.roofSolidMesh.castShadow = true
                        this.roofSolidMesh.receiveShadow = true
                        // Check CONFIG
                        if (CONFIG.roof['element-name'] === 'SolidPanels') { this.roofSolidPanels.scale.set(1, 1, 1) }
                        else { this.roofSolidPanels.scale.set(0, 0, 0) }

                        // Mirror
                        this.roofMirrorMesh.copy(child)
                        this.roofMirrorMesh.material = this.materials.glass
                        this.roofMirrorGlass.add(this.roofMirrorMesh)
                        this.roofMirrorGlass.castShadow = true
                        this.roofMirrorGlass.receiveShadow = true
                        // Check CONFIG
                        if (CONFIG.roof['element-name'] === 'MirrorGlass') { this.roofMirrorGlass.scale.set(1, 1, 1) }
                        else { this.roofMirrorGlass.scale.set(0, 0, 0) }

                    }

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

                    /**
                     * Attachment
                     */

                    if (child.name === 'attach_bioclimactic_pergola_Q27')
                    {
                        this.attachment.add(child.children[0])
                    }


                }
            }
        )
    }
}