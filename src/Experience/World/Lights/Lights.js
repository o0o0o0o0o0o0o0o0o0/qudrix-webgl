import * as THREE from 'three'

import Experience from '../../Experience'

import AreaLight from './AreaLight'

export default class Lights
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug

        this.areaLight = new AreaLight()

        this.setAmbient()
        this.debugAmbient()

        this.setDirLight()
        this.debugDirLight()



    }

    setAmbient()
    {
        this.ambient = new THREE.AmbientLight(0xffffff, 0.1)
    }

    debugAmbient()
    {

        if (this.debug.active)
        {
            this.debug.ambientLightFolder.add(this.ambient, 'intensity', 0, 20, 0.001).name('ambient.intensity')
            // this.debug.ambientLightFolder.add(this.ambient, 'color').name('ambient.color')

        }
    }

    setDirLight()
    {
        this.directional = new THREE.DirectionalLight()
        this.directional.position.x = -13
        this.directional.position.y = 56.9
        this.directional.position.z = 16.42

        this.directional.color = new THREE.Color(0xffffff)
        this.directional.intensity = 2
        this.directionalHelper = new THREE.DirectionalLightHelper(this.directional, 0.2)

        this.directional.castShadow = true
        this.directional.shadow.mapSize.width = 2048
        this.directional.shadow.mapSize.height = 2048
        this.directional.shadow.radius = 6
        this.directional.shadow.camera.near = 1
        this.directional.shadow.camera.far = 100
        this.directional.shadow.camera.top = 20
        this.directional.shadow.camera.right = 20
        this.directional.shadow.camera.bottom = - 20
        this.directional.shadow.camera.left = - 20
        this.directionalCameraShadowHelper = new THREE.CameraHelper(this.directional.shadow.camera)

        this.directionalFill = new THREE.DirectionalLight()
        this.directionalFill.position.x = 23
        this.directionalFill.position.y = 14
        this.directionalFill.position.z = -2
        this.directionalFill.color = new THREE.Color(0xffffff)
        this.directionalFill.intensity = 1.6
        this.directionalFillHelper = new THREE.DirectionalLightHelper(this.directionalFill, 0.2)

    }

    debugDirLight()
    {

        if (this.debug.active)
        {

            this.debug.directionalLightFolder.add(this.directional.position, 'x', -100, 100, 0.001).name('directional.position.x')
            this.debug.directionalLightFolder.add(this.directional.position, 'y', 0, 100, 0.001).name('directional.position.y')
            this.debug.directionalLightFolder.add(this.directional.position, 'z', -100, 100, 0.001).name('directional.position.z')
            this.debug.directionalLightFolder.add(this.directional.shadow, 'radius', 0, 20, 0.01).name('directional.radius.z')
            this.debug.directionalLightFolder.add(this.directional, 'intensity', 0, 20, 0.001).name('directional.intensity')

            this.debug.directionalLightFolder.add(this.directionalFill.position, 'x', -100, 100, 0.001).name('directionalFill.position.x')
            this.debug.directionalLightFolder.add(this.directionalFill.position, 'y', 0, 100, 0.001).name('directionalFill.position.y')
            this.debug.directionalLightFolder.add(this.directionalFill.position, 'z', -100, 100, 0.001).name('directionalFill.position.z')
            this.debug.directionalLightFolder.add(this.directionalFill, 'intensity', 0, 20, 0.001).name('directionalFill.intensity')

        }

    }
}