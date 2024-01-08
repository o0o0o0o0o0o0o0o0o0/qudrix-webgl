import * as THREE from 'three'
import Loaders from '../../Utils/Loaders'

import Experience from '../../Experience'


export default class Qudrix01
{
    constructor()
    {
        this.experience = new Experience()

        this.loader = new Loaders()

        this.instance = new THREE.Group()
        this.roofDefault = new THREE.Group()
        this.roofBioclimaticPergola = new THREE.Group()
        this.attachment = new THREE.Group()

        this.instance.add(
            this.roofDefault,
            this.roofBioclimaticPergola,
            this.attachment)

        this.loadQudrix01()
        this.loadRoof01()

        this.addWalls()

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
                    if (child.name !== 'roof_fixed_aluminium_slats' &&
                        child.name !== 'attach_automatic_awing' &&
                        child.name !== 'attach_bioclimactic_pergola_Q27')
                    {
                        this.instance.add(child)
                    }

                    child.castShadow = true
                    child.receiveShadow = true
                    // console.log(child.scale);

                    // Roof Default
                    if (child.name === 'roof_fixed_aluminium_slats')
                    {
                        this.roofDefault.add(child)
                    }

                    // hide unnessesary roof
                    if (child.name === 'roof_bioclimatic_pergola_Q27' ||
                        child.name === 'roof_bioclimatic_pergola_Q25')
                    {
                        child.scale.set(0, 0, 0)
                    }

                    // attachment
                    if (child.name === 'attach_automatic_awing' ||
                        child.name === 'attach_bioclimactic_pergola_Q27')
                    {
                        this.attachment.add(child)
                        this.attachment.scale.set(0, 0, 0)
                    }

                    if (child.name === 'base')
                    {
                        // console.log(child.material)
                        this.materialWall = child.material

                        this.baseMaterial = child.material

                        // console.log(this.wall);
                    }

                    this.addWalls()

                    this.wallsMaterials.copy(this.baseMaterial)
                    this.wallsMaterials.color = new THREE.Color(0x303030)
                    this.wallsMaterials.metalness = 1
                    this.wallsMaterials.reflectivity = 0
                    this.wallsMaterials.side = THREE.DoubleSide

                    this.wall01.material = this.wallsMaterials
                    this.wall02.material = this.wallsMaterials
                    this.wall03.material = this.wallsMaterials




                }
            }
        )
    }

    loadRoof01()
    {
        this.loader.gltf.load(
            '/3D/qudrix-webgl_q1_roof_bioclimatic-pergola-Q25.glb',
            (gltf) =>
            {
                console.log(gltf);
                this.roofBioclimaticPergola.add(gltf.scene)

            }
        )
    }

    addWalls()
    {
        const side = 2.8
        this.wall01 = new THREE.Mesh(
            new THREE.PlaneGeometry(side, side, 16, 16),
            new THREE.MeshBasicMaterial()
        )
        this.wall01.position.y += side / 2
        this.wall01.position.z += 1.5

        this.wall02 = new THREE.Mesh(
            new THREE.PlaneGeometry(side, side, 16, 16),
            new THREE.MeshBasicMaterial()
        )
        this.wall02.rotation.y = Math.PI / 2
        this.wall02.position.y += side / 2
        this.wall02.position.x += -1.5

        this.wall03 = new THREE.Mesh(
            new THREE.PlaneGeometry(side, side, 16, 16),
            new THREE.MeshBasicMaterial()
        )
        this.wall03.position.y += side / 2
        this.wall03.position.z += -1.5

        this.instance.add(this.wall01, this.wall02, this.wall03)

        this.wall01.castShadow = true
        this.wall01.receiveShadow = true
        this.wall02.castShadow = true
        this.wall02.receiveShadow = true
        this.wall03.castShadow = true
        this.wall03.receiveShadow = true
    }

    setFunctions()
    {
        this.functions = {}

        // add default roof
        this.functions.roofDefault = () =>
        {
            this.roofStatus = 'default'
            this.roofDefault.scale.set(1, 1, 1)

        }

        // add biocPerg roof
        this.functions.roofBioclimaticPergola = () =>
        {
            this.roofStatus = 'bioclimaticPergola'
            this.roofDefault.scale.set(0, 0, 0)
        }

        // add attachment
        this.functions.addAttachment = () =>
        {
            this.attachment.scale.set(1, 1, 1)
        }
        // remove attachment
        this.functions.removeAttachment = () =>
        {
            this.attachment.scale.set(0, 0, 0)
        }
    }

    roofDebug()
    {
        this.setFunctions()

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.roofFolder.add(this.functions, 'roofDefault').name('Default')
            this.debug.roofFolder.add(this.functions, 'roofBioclimaticPergola').name('BioclimaticPergola')
            this.debug.attachmentFolder.add(this.functions, 'addAttachment').name('addAttachment')
            this.debug.attachmentFolder.add(this.functions, 'removeAttachment').name('removeAttachment')
        }
    }
}