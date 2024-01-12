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

const experience = new Experience(canvas)


// let CONFIG = {}

// fetch('CONFIG.json')
//     .then((response) =>
//     {
//         return response.json()
//     })
//     .then((obj) =>
//     {
//         // console.log(obj);
//         CONFIG = obj
//         console.log(CONFIG);
//     })

// const module = await import('./CONFIG.json', {
//     with: { type: "json" },
// });
// console.log(module.size['element-name']);



