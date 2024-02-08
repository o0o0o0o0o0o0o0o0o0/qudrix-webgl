import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

import Experience from '../../Experience'

export default class AreaLight {
    constructor() {

        this.experience = new Experience()
        this.debug = this.experience.debug

        this.side = 10

        this.key = new THREE.RectAreaLight()
        this.key.position.x = 0
        this.key.position.y = 0
        this.key.position.z = 16.8
        this.key.rotation.x = 0
        this.key.rotation.y = 0
        this.key.rotation.z = 0
        this.key.color = new THREE.Color(0xffffff)
        this.key.intensity = 13
        this.key.width = 15
        this.key.height = 15
        this.keyHelper = new RectAreaLightHelper(this.key)

        this.top = new THREE.RectAreaLight()
        this.top.position.x = 0
        this.top.position.y = 16.42
        this.top.position.z = 0
        this.top.rotation.x = -1.57
        this.top.rotation.y = 0
        this.top.rotation.z = 0
        this.top.color = new THREE.Color(0xffffff)
        this.top.intensity = 6
        this.top.width = 10
        this.top.height = 10
        this.topHelper = new RectAreaLightHelper(this.top)

        this.fill01 = new THREE.RectAreaLight()
        this.fill01.position.x = 16.8
        this.fill01.position.y = 0
        this.fill01.position.z = -6.5
        this.fill01.rotation.x = 0
        this.fill01.rotation.y = 2.422
        this.fill01.rotation.z = 0
        this.fill01.color = new THREE.Color(0xffffff)
        this.fill01.intensity = 13
        this.fill01.width = 10
        this.fill01.height = 10
        this.fill01Helper = new RectAreaLightHelper(this.fill01)

        this.fill03 = new THREE.RectAreaLight()
        this.fill03.position.x = -16.8
        this.fill03.position.y = 0
        this.fill03.position.z = 0
        this.fill03.rotation.x = 0
        this.fill03.rotation.y = -1.57
        this.fill03.rotation.z = 0
        this.fill03.color = new THREE.Color(0xffffff)
        this.fill03.intensity = 16.8
        this.fill03.width = 10
        this.fill03.height = 10
        this.fill03Helper = new RectAreaLightHelper(this.fill03)

        this.fill04 = new THREE.RectAreaLight()
        this.fill04.position.x = 0
        this.fill04.position.y = 0
        this.fill04.position.z =  - 18.83
        this.fill04.rotation.x = -1.131
        this.fill04.rotation.y = -3.14
        this.fill04.rotation.z = 0
        this.fill04.color = new THREE.Color(0xffffff)
        this.fill04.intensity = 15
        this.fill04.width = 17.6
        this.fill04.height = 20
        this.fill04Helper = new RectAreaLightHelper(this.fill04)

        // this.debugArea()

    }

    debugArea() {
        
        if (this.debug.active) {

            this.debug.areaLightFolder.add(this.key.position, 'x', -100, 100, 0.001).name('key.position.x')
            this.debug.areaLightFolder.add(this.key.position, 'y', 0, 100, 0.001).name('key.position.y')
            this.debug.areaLightFolder.add(this.key.position, 'z', -100, 100, 0.001).name('key.position.z')
            this.debug.areaLightFolder.add(this.key.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('key.rotation.x')
            this.debug.areaLightFolder.add(this.key.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('key.rotation.y')
            this.debug.areaLightFolder.add(this.key.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('key.rotation.z')
            this.debug.areaLightFolder.add(this.key, 'width', 0, 100, 0.001).name('key.width')
            this.debug.areaLightFolder.add(this.key, 'height', 0, 100, 0.001).name('key.height')
            this.debug.areaLightFolder.add(this.key, 'intensity', 0, 20, 0.001).name('key.intensity')

            // this.debug.areaLightFolder.add(this.top.position, 'x', -100, 100, 0.001).name('top.position.x')
            // this.debug.areaLightFolder.add(this.top.position, 'y', 0, 100, 0.001).name('top.position.y')
            // this.debug.areaLightFolder.add(this.top.position, 'z', -100, 100, 0.001).name('top.position.z')
            // this.debug.areaLightFolder.add(this.top.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('top.rotation.x')
            // this.debug.areaLightFolder.add(this.top.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('top.rotation.y')
            // this.debug.areaLightFolder.add(this.top.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('top.rotation.z')
            // this.debug.areaLightFolder.add(this.top, 'width', 0, 100, 0.001).name('top.width')
            // this.debug.areaLightFolder.add(this.top, 'height', 0, 100, 0.001).name('top.height')
            // this.debug.areaLightFolder.add(this.top, 'intensity', 0, 20, 0.001).name('top.intensity')

            this.debug.areaLightFolder.add(this.fill01.position, 'x', -50, 50, 0.001).name('fill01.position.x')
            this.debug.areaLightFolder.add(this.fill01.position, 'y', 0, 50, 0.001).name('fill01.position.y')
            this.debug.areaLightFolder.add(this.fill01.position, 'z', -50, 50, 0.001).name('fill01.position.z')
            this.debug.areaLightFolder.add(this.fill01.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('fill01.rotation.x')
            this.debug.areaLightFolder.add(this.fill01.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('fill01.rotation.y')
            this.debug.areaLightFolder.add(this.fill01.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('fill01.rotation.z')
            this.debug.areaLightFolder.add(this.fill01, 'width', 0, 100, 0.001).name('fill01.width')
            this.debug.areaLightFolder.add(this.fill01, 'height', 0, 100, 0.001).name('fill01.height')
            this.debug.areaLightFolder.add(this.fill01, 'intensity', 0, 20, 0.001).name('fill01.intensity')

            this.debug.areaLightFolder.add(this.fill03.position, 'x', -50, 50, 0.001).name('fill03.position.x')
            this.debug.areaLightFolder.add(this.fill03.position, 'y', 0, 50, 0.001).name('fill03.position.y')
            this.debug.areaLightFolder.add(this.fill03.position, 'z', -50, 50, 0.001).name('fill03.position.z')
            this.debug.areaLightFolder.add(this.fill03.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('fill03.rotation.x')
            this.debug.areaLightFolder.add(this.fill03.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('fill03.rotation.y')
            this.debug.areaLightFolder.add(this.fill03.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('fill03.rotation.z')
            this.debug.areaLightFolder.add(this.fill03, 'width', 0, 100, 0.001).name('fill03.width')
            this.debug.areaLightFolder.add(this.fill03, 'height', 0, 100, 0.001).name('fill03.height')
            this.debug.areaLightFolder.add(this.fill03, 'intensity', 0, 20, 0.001).name('fill03.intensity')

            this.debug.areaLightFolder.add(this.fill04.position, 'x', -50, 50, 0.001).name('fill04.position.x')
            this.debug.areaLightFolder.add(this.fill04.position, 'y', 0, 50, 0.001).name('fill04.position.y')
            this.debug.areaLightFolder.add(this.fill04.position, 'z', -50, 50, 0.001).name('fill04.position.z')
            this.debug.areaLightFolder.add(this.fill04.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('fill04.rotation.x')
            this.debug.areaLightFolder.add(this.fill04.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('fill04.rotation.y')
            this.debug.areaLightFolder.add(this.fill04.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('fill04.rotation.z')
            this.debug.areaLightFolder.add(this.fill04, 'width', 0, 100, 0.001).name('fill04.width')
            this.debug.areaLightFolder.add(this.fill04, 'height', 0, 100, 0.001).name('fill04.height')
            this.debug.areaLightFolder.add(this.fill04, 'intensity', 0, 20, 0.001).name('fill04.intensity')
        }

    }


}