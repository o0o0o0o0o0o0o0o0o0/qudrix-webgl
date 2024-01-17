import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'


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

        // this.cameraDebug()

    }

    setInstance()
    {
  
        this.number = 8
        this.aspect = this.sizes.width / this.sizes.height
        this.instance = new THREE.OrthographicCamera(-this.number * this.aspect, this.number * this.aspect, this.number, -this.number, 0.1, 10000)
        // this.instance.zoom = 10
        this.instance.position.set(
            14,
            9.5,
            10
        )
        this.instance.rotation.set(
            -0.7,
            0.8,
            0.56
        )
        this.scene.add(this.instance)

        this.minZoom = 0.48
        this.maxZoom = 2.1



    }

    setZoom() {
        if (this.instance.zoom <= this.minZoom) {
            this.instance.zoom = this.minZoom
        }
        if (this.instance.zoom >= this.maxZoom) {
            this.instance.zoom = this.maxZoom
        }
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
            MIDDLE: null, //THREE.MOUSE.DOLLY
            RIGHT:null //THREE.MOUSE.PAN, null
        }

        this.target = new THREE.Vector3(0, 0, 0)
        this.target.set(0, 1, 0)
        this.controls.target.copy(this.target)
        this.controls.update()
    }



    resize()
    {
        // this.instance.aspect = this.sizes.width / this.sizes.height

        this.aspect = this.sizes.width / this.sizes.height
        this.instance.left = - this.number * this.aspect
        this.instance.right = this.number * this.aspect
        this.instance.top = this.number 
        this.instance.bottom = -this.number 

        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
        // console.log(
        //     this.instance.position,
        //     this.instance.rotation
        // )
        this.setZoom()

   

    }

    setFunctions()
    {
        this.functions = {}

        this.functions.default = () =>
        {
            // this.instance.position.set(13.1199, 5.7499, 13.13)
            // this.instance.rotation.set(-0.4127, 0.7412, 0.2874)
            gsap.to(this.instance.position, {
                x: 13.1199,
                y: 5.7499,
                z: 13.13,
                ease: "power3.inOut",
                duration: 0.75
            })
            gsap.to(this.instance.rotation, {
                x: -0.4127,
                y: 0.7412,
                z: 0.2874,
                ease: "power3.inOut",
                duration: 0.75
            })
        }

        this.functions.side01 = () =>
        {
            // this.instance.position.set(0, 1, 13.5)
            // this.instance.rotation.set(0.078, 0.009, 0.0007)
            gsap.to(this.instance.position, {
                x: 0,
                y: 1,
                z: 13.5,
                ease: "power3.inOut",
                duration: 1
            })
            gsap.to(this.instance.rotation, {
                x: 0.078,
                y: 0.009,
                z: 0.0007,
                ease: "power3.inOut",
                duration: 1
            })
        }

        this.functions.side02 = () =>
        {
            // this.instance.position.set(-13.497, 1, 0.22)
            // this.instance.rotation.set(-1.356, -1.4942, -1.3557)
            gsap.to(this.instance.position, {
                x: -13.497,
                y: 1,
                z: 0.22,
                ease: "power3.inOut",
                duration: 1
            })
            gsap.to(this.instance.rotation, {
                x: -1.356,
                y: -1.4942,
                z: -1.3557,
                ease: "power3.inOut",
                duration: 1
            })
        }

        this.functions.side03 = () =>
        {
            // this.instance.position.set(0.399, 1, -13.5)
            // this.instance.rotation.set(-3.0667, 0.0295, 3.139)
            gsap.to(this.instance.position, {
                x: 0.399,
                y: 1,
                z: -13.5,
                ease: "power3.inOut",
                duration: 1
            })
            gsap.to(this.instance.rotation, {
                x: -3.0667,
                y: 0.0295,
                z: 3.139,
                ease: "power3.inOut",
                duration: 1
            })
        }

        this.functions.side04 = () =>
        {
            // this.instance.position.set(13.497, 1, 0.22)
            // this.instance.rotation.set(-1.8489, 1.493, 1.8497)
            gsap.to(this.instance.position, {
                x: 13.497,
                y: 1,
                z: 0.22,
                ease: "power3.inOut",
                duration: 1
            })
            gsap.to(this.instance.rotation, {
                x: -1.8489,
                y: 1.493,
                z: 1.8497,
                ease: "power3.inOut",
                duration: 1
            })
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