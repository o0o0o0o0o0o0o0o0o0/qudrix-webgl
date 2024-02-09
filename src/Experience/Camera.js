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
        
    }

    setInstance()
    {

        this.number = 8
        this.aspect = this.sizes.width / this.sizes.height
        this.instance = new THREE.OrthographicCamera(-this.number * this.aspect, this.number * this.aspect, this.number, -this.number, 0.01, 100000)
        // this.instance = new THREE.PerspectiveCamera(25, this.aspect, 1, 1000)
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

    setZoom()
    {
        if (this.instance.zoom <= this.minZoom)
        {
            this.instance.zoom = this.minZoom
        }
        if (this.instance.zoom >= this.maxZoom)
        {
            this.instance.zoom = this.maxZoom
        }
    }

    setControl()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.maxPolarAngle = Math.PI / 2.01
        // this.controls.minDistance = 5
        // this.controls.maxDistance = 21
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: null, //THREE.MOUSE.DOLLY
            RIGHT: null //THREE.MOUSE.PAN, null
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


}