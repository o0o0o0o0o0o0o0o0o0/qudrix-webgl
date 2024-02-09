import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience/Experience'

import dataJSON from './CONFIG.json'
// import dataJSONbefore from './CONFIGbefore.json'

/**
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl')

/**
 * Experience class
 */


let experience = null

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

// getData('http://localhost:3000/config01').then(data => {
//     // console.log(`config01: ${JSON.stringify(data)}`)
//     experience = new Experience(canvas, data)

//     experience.manager.loadingManager.onLoad = () => {

//         experience.world.debugWorld.functionsMASTER.build(data)
//     }

// })

experience = new Experience(canvas, dataJSON)

experience.manager.loadingManager.onLoad = () => {

    experience.world.debugWorld.functionsMASTER.build(dataJSON)
}











