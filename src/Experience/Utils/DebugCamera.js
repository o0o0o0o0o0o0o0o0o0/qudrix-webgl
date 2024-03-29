import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'

import Experience from '../Experience'
import World from '../World/World'


export default class DebugCamera
{
    constructor(camera)
    {
        this.camera = camera

        this.experience = new Experience()
        this.debug = this.experience.debug

        this.world = new World()
        this.buildingGroup = this.world.buildingGroup
        this.areaLightSide = this.world.lights.areaLight.side
        this.areaLightKey = this.world.lights.areaLight.key
        this.areaLightTop = this.world.lights.areaLight.top

        this.ease = "power3.inOut"

        this.setFunctions(camera)
        // this.start()



    }

    setFunctions()
    {
        this.functions = {}

        this.functions.default = () =>
        {
            this.duration = 1.5
            this.positionY = 0
            this.positionZ = 0
            this.scaleXYZ = 1

            gsap.to(this.camera.position, {
                x: 68.62,
                y: 42.68,
                z: 42,
                ease: this.ease,
                duration: this.duration
            })
            // gsap.to(this.camera.rotation, {
            //     x: -0.7,
            //     y: 0.8,
            //     z: 0.56,
            //     ease: this.ease,
            //     duration: this.duration
            // })
            // this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }

        this.functions.sizes = () =>
        {
            this.duration = 1.5
            this.positionY = 0
            this.positionZ = 0
            this.scaleXYZ = 1

            gsap.to(this.camera.position, {
                x: 68.62,
                y: 42.68,
                z: 42,
                ease: this.ease,
                duration: this.duration
            })
            // gsap.to(this.camera.rotation, {
            //     x: -0.7,
            //     y: 0.8,
            //     z: 0.56,
            //     ease: this.ease,
            //     duration: this.duration
            // })
            this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }

        this.functions.roof = () =>
        {
            this.duration = 1.5
            this.positionY = -1.5
            this.positionZ = 0
            this.scaleXYZ = 1

            gsap.to(this.camera.position, {
                x: 25,
                y: 15,
                z: 16,
                ease: this.ease,
                duration: this.duration
            })
            gsap.to(this.camera.rotation, {
                x: -0.7,
                y: 0.8,
                z: 0.56,
                ease: this.ease,
                duration: this.duration
            })
            this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }

        this.functions.side01 = () =>
        {
            this.duration = 1.5
            this.positionY = -0.75
            this.positionZ = 0
            this.scaleXYZ = 1
            gsap
                .to(this.camera.position, {
                    x: 31,
                    y: 1,
                    z: -5,
                    ease: this.ease,
                    duration: this.duration
                })
       
            // gsap
            //     .to(this.camera, {
            //         fov: 100,
            //         ease: this.ease,
            //         duration: this.duration
            //     })
            // gsap
            //     .to(this.camera.rotation, {
            //         x: -1.8489,
            //         y: 1.493,
            //         z: 1.8497,
            //         ease: this.ease,
            //         duration: this.duration
            //     })
            this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }

        this.functions.side02 = () =>
        {
            this.duration = 1.5
            this.positionY = -0.75
            this.positionZ = 0
            this.scaleXYZ = 1
            gsap
                .to(this.camera.position, {
                    x: 5,
                    y: 1,
                    z: 31,
                    ease: this.ease,
                    duration: this.duration
                })
            // gsap
            //     .to(this.camera.rotation, {
            //         x: 0.0785,
            //         y: 0.000,
            //         z: 0.000,
            //         ease: this.ease,
            //         duration: this.duration
            //     })
            this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }

        this.functions.side03 = () =>
        {
            this.duration = 1.5
            this.positionY = -0.75
            this.positionZ = 0
            this.scaleXYZ = 1
            gsap
                .to(this.camera.position, {
                    x: -31,
                    y: 1,
                    z: 5,
                    ease: this.ease,
                    duration: this.duration
                })
            // gsap
            //     .to(this.camera.rotation, {
            //         x: -1.356,
            //         y: -1.4942,
            //         z: -1.3557,
            //         ease: this.ease,
            //         duration: this.duration
            //     })
            this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }

        this.functions.side04 = () =>
        {
            this.duration = 1.5
            this.positionY = -0.75
            this.positionZ = 0
            this.scaleXYZ = 1
            gsap
                .to(this.camera.position, {
                    x: -5,
                    y: 1,
                    z: -31,
                    ease: this.ease,
                    duration: this.duration
                })
            // gsap
            //     .to(this.camera.rotation, {
            //         x: -3.0667,
            //         y: 0.0295,
            //         z: 3.139,
            //         ease: this.ease,
            //         duration: this.duration
            //     })
            this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }

        this.functions.attachment = () =>
        {
            this.duration = 1.5
            this.positionY = -1.5
            this.positionZ = -3
            this.scaleXYZ = 1

            gsap.to(this.camera.position, {
                x: 25,
                y: 15,
                z: 16,
                ease: this.ease,
                duration: this.duration
            })
            // gsap.to(this.camera.rotation, {
            //     x: -0.7,
            //     y: 0.8,
            //     z: 0.56,
            //     ease: this.ease,
            //     duration: this.duration
            // })
            this.scaleBuildingAndLights(this.positionY, this.positionZ, this.scaleXYZ)
        }



    }

    start()
    {

        // Debug

        if (this.debug.active)
        {
            this.debug.cameraFolder.add(this.functions, 'default')
            // this.debug.cameraFolder.add(this.functions, 'side01')
            // this.debug.cameraFolder.add(this.functions, 'side02')
            // this.debug.cameraFolder.add(this.functions, 'side03')
            // this.debug.cameraFolder.add(this.functions, 'side04')
        }
    }

    scaleBuildingAndLights(positionY, positionZ, scaleXYZ)
    {
        gsap
            .to(this.buildingGroup.position, {
                y: this.positionY,
                ease: this.ease,
                duration: this.duration
            })
        gsap
            .to(this.buildingGroup.position, {
                z: positionZ,
                ease: this.ease,
                duration: this.duration
            })
        gsap
            .to(this.buildingGroup.scale, {
                x: this.scaleXYZ,
                y: this.scaleXYZ,
                z: this.scaleXYZ,
                ease: this.ease,
                duration: this.duration
            })
        gsap
            .to(this.areaLightKey, {
                width: this.areaLightSide * this.scaleXYZ,
                height: this.areaLightSide * this.scaleXYZ,
                ease: this.ease,
                duration: this.duration
            })
        gsap
            .to(this.areaLightTop, {
                width: this.areaLightSide * this.scaleXYZ,
                height: this.areaLightSide * this.scaleXYZ,
                ease: this.ease,
                duration: this.duration
            })
    }

}

