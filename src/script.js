import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience/Experience'

/**
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl')

/**
 * Experience class
 */

// const experience = new Experience(canvas)
let experience = null

// experience.manager.loadingManager.onLoad = () => {
//     experience.world.debugWorld.functionsMASTER.build()
// }

async function getData(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
    
}

getData('http://localhost:3000/config01').then(data => {
    // console.log(`config01: ${JSON.stringify(data)}`)
    experience = new Experience(canvas, data)

    experience.manager.loadingManager.onLoad = () => {

        experience.world.debugWorld.functionsMASTER.build(data)
    }

})

setTimeout(() => {
    getData('http://localhost:3000/config02').then(data => {
        // console.log(`config02: ${JSON.stringify(data)}`)
        experience.world.debugWorld.functionsMASTER.build(data)
    })
}, 5000)



// experience.manager.loadingManager.onLoad = () => {

//     getData('http://localhost:3000/config01').then(data => {
//         // console.log(`config01: ${JSON.stringify(data)}`)
//         const experience = new Experience(canvas, data)
//         experience.world.debugWorld.functionsMASTER.build(data)
//     })
// }

// setTimeout(() => {
//     getData('http://localhost:3000/config02').then(data => {
//         // console.log(`config02: ${JSON.stringify(data)}`)
//         experience.world.debugWorld.functionsMASTER.build(data)
//     })
// }, 5000)








