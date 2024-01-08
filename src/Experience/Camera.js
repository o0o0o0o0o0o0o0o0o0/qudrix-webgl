import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


import Experience from './Experience'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControl()

        this.cameraDebug()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(
            13.12,
            5.75,
            13.13
        )
        this.instance.rotation.set(
            -0.36,
            0.76,
            0.25
        )
        this.scene.add(this.instance)

    }

    setControl()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.maxPolarAngle = Math.PI / 2.1
        this.controls.minDistance = 5
        this.controls.maxDistance = 21
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: null //THREE.MOUSE.PAN
        }
    }

    setDebug()
    {
        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.instance.position, 'x', -50, 50, 0.01).name('camera.position.x')
            this.debug.ui.add(this.instance.position, 'y', -50, 50, 0.01).name('camera.position.y')
            this.debug.ui.add(this.instance.position, 'z', -50, 50, 0.01).name('camera.position.z')
            this.debug.ui.add(this.instance.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.x')
            this.debug.ui.add(this.instance.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.y')
            this.debug.ui.add(this.instance.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.z')
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
        // console.log(
        //     this.instance.position,
        //     this.instance.rotation
        // )
    }

    setFunctions()
    {
        this.functions = {}

        this.functions.default = () =>
        {
            this.instance.position.set(13.1199, 5.7499, 13.13)
            this.instance.rotation.set(-0.4127, 0.7412, 0.2874)
        }

        this.functions.side01 = () =>
        {
            this.instance.position.set(0, 1, 13.5)
            this.instance.rotation.set(0.078, 0.009, 0.0007)
        }

        this.functions.side02 = () =>
        {
            this.instance.position.set(-13.497, 1, 0.22)
            this.instance.rotation.set(-1.356, -1.4942, -1.3557)
        }

        this.functions.side03 = () =>
        {
            this.instance.position.set(0.399, 1, -13.5)
            this.instance.rotation.set(-3.0667, 0.0295, 3.139)
        }

        this.functions.side04 = () =>
        {
            this.instance.position.set(13.497, 1, 0.22)
            this.instance.rotation.set(-1.8489, 1.493, 1.8497)
        }

    }

    cameraDebug()
    {
        this.setFunctions()

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.sidesFolder.add(this.functions, 'default')
            this.debug.sidesFolder.add(this.functions, 'side01')
            this.debug.sidesFolder.add(this.functions, 'side02')
            this.debug.sidesFolder.add(this.functions, 'side03')
            this.debug.sidesFolder.add(this.functions, 'side04')
        }
    }
    //pos00 (13.1199, 5.7499, 13.13)
    //rot00 (-0.4127, 0.7412, 0.2874)

    // pos01 (0, 1, 13.5)
    // rot01 (0.078, 0.009, 0.0007)

    // pos02 (-13.497, 1, 0.22)
    // rot02 (-1.356, -1.4942, -1.3557)

    // pos03 (0.399, 1, -13.5)
    // rot03 (-3.0667, 0.0295, 3.139)
}