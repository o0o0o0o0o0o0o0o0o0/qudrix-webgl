import * as THREE from 'three'

import Experience from '../Experience'

import AreaLight from './AreaLight'

export default class Lights
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug

        this.areaLight = new AreaLight()

        this.setAmbient()
        // this.debugAmbient()

        this.setDirLight()
        // this.debugDirLight()



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

        }
    }

    setDirLight()
    {
        this.directional = new THREE.DirectionalLight()
        this.directional.position.x = 0
        this.directional.position.y = 12
        this.directional.position.z = 0

        this.directional.rotation.x = 1.55
        this.directional.rotation.y = 0
        this.directional.rotation.z = 0

        this.directional.color = new THREE.Color(0xffffff)
        this.directional.intensity = 0.1
        this.directionalHelper = new THREE.DirectionalLightHelper(this.directional, 0.2)

        this.directional.castShadow = true
        this.directional.shadow.mapSize.width = 2048
        this.directional.shadow.mapSize.height = 2048
        this.directional.shadow.radius = 10

        this.directional.shadow.camera.near = 1
        this.directional.shadow.camera.far = 20
        this.directional.shadow.camera.top = 9
        this.directional.shadow.camera.right = 9
        this.directional.shadow.camera.bottom = - 9
        this.directional.shadow.camera.left = - 9
        this.directionalCameraShadowHelper = new THREE.CameraHelper(this.directional.shadow.camera)

    }

    debugDirLight()
    {

        if (this.debug.active)
        {

            this.debug.directionalLightFolder.add(this.directional.position, 'x', -50, 50, 0.001).name('directional.position.x')
            this.debug.directionalLightFolder.add(this.directional.position, 'y', 0, 50, 0.001).name('directional.position.y')
            this.debug.directionalLightFolder.add(this.directional.position, 'z', -50, 50, 0.001).name('directional.position.z')
            this.debug.directionalLightFolder.add(this.directional.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.001).name('directional.rotation.x')
            this.debug.directionalLightFolder.add(this.directional.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.001).name('directional.rotation.y')
            this.debug.directionalLightFolder.add(this.directional.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.001).name('directional.rotation.z')
            this.debug.directionalLightFolder.add(this.directional, 'intensity', 0, 20, 0.001).name('directional.intensity')

        }

    }
}