import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

import Experience from '../Experience'

export default class AreaLight {
    constructor() {

        this.experience = new Experience()
        this.debug = this.experience.debug

        this.key = new THREE.RectAreaLight()
        this.key.position.x = 0
        this.key.position.y = 0
        this.key.position.z = 16.8
        this.key.rotation.x = 0
        this.key.rotation.y = 0
        this.key.rotation.z = 0
        this.key.color = new THREE.Color(0xffffff)
        this.key.intensity = 10
        this.key.width = 10
        this.key.height = 10
        this.keyHelper = new RectAreaLightHelper(this.key)

        this.top = new THREE.RectAreaLight()
        this.top.position.x = 0
        this.top.position.y = 15.585
        this.top.position.z = 0
        this.top.rotation.x = - Math.PI / 2
        this.top.rotation.y = 0
        this.top.rotation.z = 0
        this.top.color = new THREE.Color(0xffffff)
        this.top.intensity = 10
        this.top.width = 10
        this.top.height = 10
        this.topHelper = new RectAreaLightHelper(this.top)

        // this.debugArea()

    }

    debugArea() {
        
        if (this.debug.active) {

            this.debug.areaLightFolder.add(this.key.position, 'x', -50, 50, 0.001).name('key.position.x')
            this.debug.areaLightFolder.add(this.key.position, 'y', 0, 7, 0.001).name('key.position.y')
            this.debug.areaLightFolder.add(this.key.position, 'z', -50, 50, 0.001).name('key.position.z')
            this.debug.areaLightFolder.add(this.key.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('key.rotation.x')
            this.debug.areaLightFolder.add(this.key.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('key.rotation.y')
            this.debug.areaLightFolder.add(this.key.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('key.rotation.z')
            this.debug.areaLightFolder.add(this.key, 'width', 0, 20, 0.001).name('key.width')
            this.debug.areaLightFolder.add(this.key, 'height', 0, 20, 0.001).name('key.height')
            this.debug.areaLightFolder.add(this.key, 'intensity', 0, 20, 0.001).name('key.intensity')

            this.debug.areaLightFolder.add(this.top.position, 'x', -50, 50, 0.001).name('top.position.x')
            this.debug.areaLightFolder.add(this.top.position, 'y', 0, 50, 0.001).name('top.position.y')
            this.debug.areaLightFolder.add(this.top.position, 'z', -50, 50, 0.001).name('top.position.z')
            this.debug.areaLightFolder.add(this.top.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('top.rotation.x')
            this.debug.areaLightFolder.add(this.top.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('top.rotation.y')
            this.debug.areaLightFolder.add(this.top.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('top.rotation.z')
            this.debug.areaLightFolder.add(this.top, 'width', 0, 20, 0.001).name('top.width')
            this.debug.areaLightFolder.add(this.top, 'height', 0, 20, 0.001).name('top.height')
            this.debug.areaLightFolder.add(this.top, 'intensity', 0, 20, 0.001).name('top.intensity')
        }

    }


}