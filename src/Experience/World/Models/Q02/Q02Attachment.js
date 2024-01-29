import * as THREE from 'three'
import Loaders from '../../../Utils/Loaders'
import Materials from '../../../Resources/Materials'

import Experience from '../../../Experience'
import Animation from '../../../Utils/Animation'

// import StaticModel from './StaticModel'
import Qudrix02 from '../Qudrix02'

export default class Attachment
{
    constructor(CONFIG)
    {
        this.experience = new Experience()
         
        this.time = this.experience.time
        this.animation = new Animation()
        this.renderer = this.experience.renderer
        this.debug = this.experience.debug

                this.manager = this.experience.manager
        this.loader = new Loaders(this.manager.loadingManager)
        this.materials = this.experience.materials

        // this.staticModel = new StaticModel(CONFIG)
        this.qudrix02 = new Qudrix02()

        /**
         * Attachment
         */
        this.instance = this.qudrix02.staticModel.attachment
        this.instance.scale.set(0, 0, 0)

        this.automaticAwing = new THREE.Group()
        this.bioclimacticPergola = new THREE.Group()

        this.zOffset = 0.42
        this.automaticAwing.position.z += this.zOffset
        this.bioclimacticPergola.position.z += this.zOffset

        this.instance.add(
            this.automaticAwing,
            this.bioclimacticPergola
        )

        /**
         * Attachment animations
         */
        this.mixerAutomaticAwing = null
        this.mixerBioclimacticPergola = null

        this.loadAutomaticAwing(CONFIG)
        this.loadBioclimacticPergola(CONFIG)

        /**
         * Set functions
         */
        this.setFunctions()

    }

    loadAutomaticAwing(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q02/Animation/qudrix-webgl_q2_attach_automatic-awing.glb',
            (gltf) =>
            {
                this.automaticAwing.add(gltf.scene)
                
                gltf.scene.traverse((obj) => {
                    if (obj.isMesh) {

                        obj.castShadow = true
                        obj.receiveShadow = true

                        if (obj.material.name === 'Golden silk fabric.008') {
                            obj.material = this.materials.roofWhite
                        }
                        else {
                            obj.material = this.materials.wallBlack
                        }
                       
                    }
                })

                // this.automaticAwing.scale.set(0, 0, 0)

                this.mixerAutomaticAwing = new THREE.AnimationMixer(gltf.scene)
                this.actionAutomaticAwing = this.mixerAutomaticAwing.clipAction(gltf.animations[0])
                this.animation.reverse(this.actionAutomaticAwing, 1.5)

                if (CONFIG.attachment['element-name'] === "Automatic Awing")
                {
                    this.automaticAwing.scale.set(1, 1, 1)
                    this.instance.scale.set(1, 1, 1)
                }
                else
                {
                    this.automaticAwing.scale.set(0, 0, 0)
                    // this.instance.scale.set(0, 0, 0)
                }

            }
        )
    }

    loadBioclimacticPergola(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Q02/Animation/qudrix-webgl_q2_attach_bioclimactic-pergola-Q27.glb',
            (gltf) =>
            {
                this.bioclimacticPergola.add(gltf.scene)
                gltf.scene.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.castShadow = true
                        obj.receiveShadow = true
                        obj.material = this.materials.roofWhite
                    }
                })
                // this.bioclimacticPergola.scale.set(0, 0, 0)

                this.mixerBioclimacticPergola = new THREE.AnimationMixer(gltf.scene)
                this.actionBioclimacticPergola = this.mixerBioclimacticPergola.clipAction(gltf.animations[0])
                this.animation.play(this.actionBioclimacticPergola, 1.5)

                if (CONFIG.attachment['element-name'] === "Bioclimatic pergola Q27")
                {
                    this.bioclimacticPergola.scale.set(1, 1, 1)
                    this.instance.scale.set(1, 1, 1)
                }
                else
                {
                    this.bioclimacticPergola.scale.set(0, 0, 0)
                    // this.instance.scale.set(0, 0, 0)
                }

            }
        )
    }

    setFunctions()
    {
        this.functions = {}

        this.functions.addAutomaticAwing = () =>
        {
            this.instance.scale.set(1, 1, 1)
            this.automaticAwing.scale.set(1, 1, 1)
            this.bioclimacticPergola.scale.set(0, 0, 0)

            this.animation.reverse(this.actionAutomaticAwing, 1.5)

            this.materials.groundQ02.map = this.materials.textures.groundAttachmentBakeQ02
        }

        this.functions.addBioclimacticPergola = () =>
        {
            this.instance.scale.set(1, 1, 1)
            this.automaticAwing.scale.set(0, 0, 0)
            this.bioclimacticPergola.scale.set(1, 1, 1)

            this.animation.play(this.actionBioclimacticPergola, 1.5)

            this.materials.groundQ02.map = this.materials.textures.groundAttachmentBakeQ02

        }

        this.functions.removeAttachment = () =>
        {
            this.instance.scale.set(0, 0, 0)
            this.automaticAwing.scale.set(0, 0, 0)
            this.bioclimacticPergola.scale.set(0, 0, 0)

            this.materials.groundQ02.map = this.materials.textures.groundBakeQ02


        }
    }

    update()
    {
        if (this.mixerAutomaticAwing)
        {
            this.mixerAutomaticAwing.update(this.time.delta * 0.0005)
        }
        if (this.mixerBioclimacticPergola)
        {
            this.mixerBioclimacticPergola.update(this.time.delta * 0.0005)
        }
    }
}