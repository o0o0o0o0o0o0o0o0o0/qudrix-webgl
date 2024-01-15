import * as THREE from 'three'
import Loaders from '../../../Utils/Loaders'
import Materials from '../../../Resources/Materials'

import Experience from '../../../Experience'
import Animation from '../../../Utils/Animation'

import StaticModel from './StaticModel'

export default class Attachment
{
    constructor(CONFIG)
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.animation = new Animation()
        this.debug = this.experience.debug

        this.loader = new Loaders()
        this.materials = new Materials()

        this.staticModel = new StaticModel(CONFIG)

        /**
         * Attachment
         */
        this.instance = this.staticModel.attachment
        this.instance.scale.set(0, 0, 0)

        this.automaticAwing = new THREE.Group()
        this.bioclimacticPergola = new THREE.Group()

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

    }

    loadAutomaticAwing(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_attach_automatic-awing.glb',
            (gltf) =>
            {
                this.automaticAwing.add(gltf.scene)
                this.automaticAwing.scale.set(0, 0, 0)

                this.mixerAutomaticAwing = new THREE.AnimationMixer(gltf.scene)
                this.actionAutomaticAwing = this.mixerAutomaticAwing.clipAction(gltf.animations[0])
                this.animation.reverse(this.actionAutomaticAwing, 1.5)

            }
        )
    }

    loadBioclimacticPergola(CONFIG)
    {
        this.loader.gltf.load(
            '/3D/Animation/qudrix-webgl_q1_attach_bioclimactic-pergola-Q27.glb',
            (gltf) =>
            {
                this.bioclimacticPergola.add(gltf.scene)
                this.bioclimacticPergola.scale.set(0, 0, 0)

                this.mixerBioclimacticPergola = new THREE.AnimationMixer(gltf.scene)
                this.actionBioclimacticPergola = this.mixerBioclimacticPergola.clipAction(gltf.animations[0])
                this.animation.reverse(this.actionBioclimacticPergola, 1.5)

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
        }

        this.functions.addBioclimacticPergola = () =>
        {
            this.instance.scale.set(1, 1, 1)
            this.automaticAwing.scale.set(0, 0, 0)
            this.bioclimacticPergola.scale.set(1, 1, 1)

            this.animation.reverse(this.actionBioclimacticPergola, 1.5)
        }

        this.functions.removeAttachment = () =>
        {
            this.instance.scale.set(0, 0, 0)
            this.automaticAwing.scale.set(0, 0, 0)
            this.bioclimacticPergola.scale.set(0, 0, 0)
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