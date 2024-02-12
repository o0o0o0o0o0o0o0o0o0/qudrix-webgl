import * as THREE from 'three'

import Experience from '../Experience'

import Loaders from '../Utils/Loaders'

export default class Textures
{
    constructor()
    {

        this.experience = new Experience()
        this.manager = this.experience.manager

        
        this.loaders = new Loaders(this.manager.loadingManager)

        this.environmentMap_01 = this.loaders.cube.load([
            '../../envMap/01/px.png',
            '../../envMap/01/nx.png',
            '../../envMap/01/py.png',
            '../../envMap/01/ny.png',
            '../../envMap/01/pz.png',
            '../../envMap/01/nz.png',
        ])


        this.environmentMap_02 = this.loaders.cube.load([
            '../../envMap/02/px.png',
            '../../envMap/02/nx.png',
            '../../envMap/02/py.png',
            '../../envMap/02/ny.png',
            '../../envMap/02/pz.png',
            '../../envMap/02/nz.png',
        ])

        this.environmentMap_03 = this.loaders.cube.load([
            '../../envMap/03/px.png',
            '../../envMap/03/nx.png',
            '../../envMap/03/py.png',
            '../../envMap/03/ny.png',
            '../../envMap/03/pz.png',
            '../../envMap/03/nz.png',
        ])

        this.environmentMap_04 = this.loaders.cube.load([
            '../../envMap/04/px.png',
            '../../envMap/04/nx.png',
            '../../envMap/04/py.png',
            '../../envMap/04/ny.png',
            '../../envMap/04/pz.png',
            '../../envMap/04/nz.png',
        ])

        this.mosquito = this.loaders.textures.load('../../textures/mosquito.png')
        this.mosquito.repeat.x = 0.2
        this.mosquito.repeat.y = 4
        this.mosquito.wrapS = THREE.RepeatWrapping
        this.mosquito.wrapT = THREE.RepeatWrapping
        this.mosquitoOpacity = this.loaders.textures.load('../../textures/mosquito_opacity.png')
        this.mosquito.repeat.x = 0.2
        this.mosquito.repeat.y = 4
        this.mosquito.wrapS = THREE.RepeatWrapping
        this.mosquito.wrapT = THREE.RepeatWrapping

        // Ground
        this.groundBakeQ01 = this.loaders.textures.load('../../textures/Bake/Q01_base.png')
        this.groundAttachmentBakeQ01 = this.loaders.textures.load('../../textures/Bake/Q01_attach.png')
        this.groundBakeQ02 = this.loaders.textures.load('../../textures/Bake/Q02_base.png')
        this.groundAttachmentBakeQ02 = this.loaders.textures.load('../../textures/Bake/Q02_attach.png')
        this.bg = this.loaders.textures.load('../../textures/Bake/env.png')
        this.bgDark = this.loaders.textures.load('../../textures/Bake/envDark.png')


    }
}