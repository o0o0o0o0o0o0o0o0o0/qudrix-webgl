import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

export default class Lights
{
    constructor(CONFIG)
    {
        this.instance = new THREE.Group()


        this.posY = 2.7
        this.intensity = 100
        this.offset = 1.3

        this.setLights(CONFIG)
        this.setFunctions()
    }

    setLights(CONFIG)
    {

        this.light01 = new THREE.RectAreaLight()
        this.light01Helper = new RectAreaLightHelper(this.light01)
        this.light01.position.x = 0
        this.light01.position.y = this.posY
        this.light01.position.z = -this.offset
        this.light01.rotation.x = - Math.PI / 2
        this.light01.rotation.y = 0
        this.light01.rotation.z = 0
        this.light01.width = 2.7
        this.light01.height = 0.5
        this.light01.intensity = this.intensity

        this.light02 = new THREE.RectAreaLight()
        this.light02Helper = new RectAreaLightHelper(this.light02)
        this.light02.position.x = this.offset
        this.light02.position.y = this.posY
        this.light02.position.z = 0
        this.light02.rotation.x = - Math.PI / 2
        this.light02.rotation.y = 0
        this.light02.rotation.z = Math.PI / 2
        this.light02.width = 2.7
        this.light02.height = 0.5
        this.light02.intensity = this.intensity

        this.light03 = new THREE.RectAreaLight()
        this.light03Helper = new RectAreaLightHelper(this.light03)
        this.light03.position.x = 0
        this.light03.position.y = this.posY
        this.light03.position.z = this.offset
        this.light03.rotation.x = - Math.PI / 2
        this.light03.rotation.y = 0
        this.light03.rotation.z = 0
        this.light03.width = 2.7
        this.light03.height = 0.5
        this.light03.intensity = this.intensity

        this.light04 = new THREE.RectAreaLight()
        this.light04Helper = new RectAreaLightHelper(this.light04)
        this.light04.position.x = -this.offset
        this.light04.position.y = this.posY
        this.light04.position.z = 0
        this.light04.rotation.x = - Math.PI / 2
        this.light04.rotation.y = 0
        this.light04.rotation.z = Math.PI / 2
        this.light04.width = 2.7
        this.light04.height = 0.5
        this.light04.intensity = this.intensity

        this.instance.add(
            this.light01,
            this.light02,
            this.light03,
            this.light04,
            this.light01Helper,
            this.light02Helper,
            this.light03Helper,
            this.light04Helper
        )

        if (CONFIG.light['element-name'] === 'LED')
        {
            this.instance.scale.set(1, 1, 1)
            this.light01.color = new THREE.Color('white')
            this.light02.color = new THREE.Color('white')
            this.light03.color = new THREE.Color('white')
            this.light04.color = new THREE.Color('white')

        }
        else if (CONFIG.light['element-name'] === 'RGB')
        {
            this.instance.scale.set(1, 1, 1)
            this.light01.color = new THREE.Color('red')
            this.light02.color = new THREE.Color('green')
            this.light03.color = new THREE.Color('blue')
            this.light04.color = new THREE.Color('blue')
        }
        else 
        {
            this.instance.scale.set(0, 0, 0)
        }

    }

    setFunctions() {
        this.functions = {}

        this.functions.addLED = () => {
            this.instance.scale.set(1, 1, 1)
            this.light01.color = new THREE.Color('white')
            this.light02.color = new THREE.Color('white')
            this.light03.color = new THREE.Color('white')
            this.light04.color = new THREE.Color('white') 
        }

        this.functions.addRGB = () => {
            this.instance.scale.set(1, 1, 1)
            this.light01.color = new THREE.Color('red')
            this.light02.color = new THREE.Color('green')
            this.light03.color = new THREE.Color('blue')
            this.light04.color = new THREE.Color('blue')
        }

        this.functions.removeLight = () => {
            this.instance.scale.set(0, 0, 0)
        }
    }




}