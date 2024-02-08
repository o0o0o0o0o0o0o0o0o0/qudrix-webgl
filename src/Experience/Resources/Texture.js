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

        this.environmentMap = this.loaders.cube.load([
            '../../envMap/01/px.png',
            '../../envMap/01/nx.png',
            '../../envMap/01/py.png',
            '../../envMap/01/ny.png',
            '../../envMap/01/pz.png',
            '../../envMap/01/nz.png',
        ])

        this.environmentMap02 = this.loaders.cube.load([
            '../../envMap/02/px.png',
            '../../envMap/02/nx.png',
            '../../envMap/02/py.png',
            '../../envMap/02/ny.png',
            '../../envMap/02/pz.png',
            '../../envMap/02/nz.png',
        ])

        this.environmentMapSidesGlass = this.loaders.textures.load('../../envMap/03/py.png')
        this.environmentMapSidesGlass.repeat.x = 1
        this.environmentMapSidesGlass.repeat.y = 0.2
        this.environmentMapSidesGlass.wrapS = THREE.RepeatWrapping
        this.environmentMapSidesGlass.wrapT = THREE.RepeatWrapping

        this.gridMosquito = this.loaders.textures.load('../../textures/Mosquito/grid.png')
        this.gridMosquito.repeat.x = 4
        this.gridMosquito.repeat.y = 1
        this.gridMosquito.wrapS = THREE.RepeatWrapping
        this.gridMosquito.wrapT = THREE.RepeatWrapping


        // Ground
        this.groundBakeQ01 = this.loaders.textures.load('../../textures/Bake/Q01_base.png')
        this.groundAttachmentBakeQ01 = this.loaders.textures.load('../../textures/Bake/Q01_attach.png')
        this.groundBakeQ02 = this.loaders.textures.load('../../textures/Bake/Q02_base.png')
        this.groundAttachmentBakeQ02 = this.loaders.textures.load('../../textures/Bake/Q02_attach.png')
        this.bg = this.loaders.textures.load('../../textures/Bake/env.png')


        // Bricks
        const bricks_x = 0.7
        const bricks_y = 0.2
        this.bricksColor = this.loaders.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_Color.jpg')
        this.bricksColor.repeat.x = bricks_x
        this.bricksColor.repeat.y = bricks_y
        this.bricksColor.wrapS = THREE.RepeatWrapping
        this.bricksColor.wrapT = THREE.RepeatWrapping
        this.bricksDisplacement = this.loaders.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_Displacement.jpg')
        this.bricksDisplacement.repeat.x = bricks_x
        this.bricksDisplacement.repeat.y = bricks_y
        this.bricksDisplacement.wrapS = THREE.RepeatWrapping
        this.bricksDisplacement.wrapT = THREE.RepeatWrapping
        this.bricksNormalGL = this.loaders.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_NormalGL.jpg')
        this.bricksNormalGL.repeat.x = bricks_x
        this.bricksNormalGL.repeat.y = bricks_y
        this.bricksNormalGL.wrapS = THREE.RepeatWrapping
        this.bricksNormalGL.wrapT = THREE.RepeatWrapping
        // this.bricksAmbientOcclusion = this.loaders.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_AmbientOcclusion.jpg')
        // this.bricksAmbientOcclusion.repeat.x = bricks_x
        // this.bricksAmbientOcclusion.repeat.y = bricks_y
        // this.bricksAmbientOcclusion.wrapS = THREE.RepeatWrapping
        // this.bricksAmbientOcclusion.wrapT = THREE.RepeatWrapping
        this.bricksRoughness = this.loaders.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_Roughness.jpg')
        this.bricksRoughness.repeat.x = bricks_x
        this.bricksRoughness.repeat.y = bricks_y
        this.bricksRoughness.wrapS = THREE.RepeatWrapping
        this.bricksRoughness.wrapT = THREE.RepeatWrapping

        // Painted Bricks
        const paintedBricks_x = 0.7
        const paintedBricks_y = 0.7
        this.paintedBricksColor = this.loaders.textures.load('../../textures/PaintedBricks001_1K-JPG/PaintedBricks001_1K-JPG_Color.jpg')
        this.paintedBricksColor.repeat.x = paintedBricks_x
        this.paintedBricksColor.repeat.y = paintedBricks_y
        this.paintedBricksColor.wrapS = THREE.RepeatWrapping
        this.paintedBricksColor.wrapT = THREE.RepeatWrapping
        this.paintedBricksDisplacement = this.loaders.textures.load('../../textures/PaintedBricks001_1K-JPG/PaintedBricks001_1K-JPG_Displacement.jpg')
        this.paintedBricksDisplacement.repeat.x = paintedBricks_x
        this.paintedBricksDisplacement.repeat.y = paintedBricks_y
        this.paintedBricksDisplacement.wrapS = THREE.RepeatWrapping
        this.paintedBricksDisplacement.wrapT = THREE.RepeatWrapping
        this.paintedBricksNormalGL = this.loaders.textures.load('../../textures/PaintedBricks001_1K-JPG/PaintedBricks001_1K-JPG_NormalGL.jpg')
        this.paintedBricksNormalGL.repeat.x = paintedBricks_x
        this.paintedBricksNormalGL.repeat.y = paintedBricks_y
        this.paintedBricksNormalGL.wrapS = THREE.RepeatWrapping
        this.paintedBricksNormalGL.wrapT = THREE.RepeatWrapping
        this.paintedBricksAmbientOcclusion = this.loaders.textures.load('../../textures/PaintedBricks001_1K-JPG/PaintedBricks001_1K-JPG_AmbientOcclusion.jpg')
        this.paintedBricksAmbientOcclusion.repeat.x = paintedBricks_x
        this.paintedBricksAmbientOcclusion.repeat.y = paintedBricks_y
        this.paintedBricksAmbientOcclusion.wrapS = THREE.RepeatWrapping
        this.paintedBricksAmbientOcclusion.wrapT = THREE.RepeatWrapping
        this.paintedBricksRoughness = this.loaders.textures.load('../../textures/PaintedBricks001_1K-JPG/PaintedBricks001_1K-JPG_Roughness.jpg')
        this.paintedBricksRoughness.repeat.x = paintedBricks_x
        this.paintedBricksRoughness.repeat.y = paintedBricks_y
        this.paintedBricksRoughness.wrapS = THREE.RepeatWrapping
        this.paintedBricksRoughness.wrapT = THREE.RepeatWrapping

        // Painted Plaster
        const paintedPlaster_x = 2
        const paintedPlaster_y = 2
        this.paintedPlasterColor = this.loaders.textures.load('../../textures/PaintedPlaster001_1K-JPG/PaintedPlaster001_1K-JPG_Color.jpg')
        this.paintedPlasterColor.repeat.x = paintedPlaster_x
        this.paintedPlasterColor.repeat.y = paintedPlaster_y
        this.paintedPlasterColor.wrapS = THREE.RepeatWrapping
        this.paintedPlasterColor.wrapT = THREE.RepeatWrapping
        this.paintedPlasterDisplacement = this.loaders.textures.load('../../textures/PaintedPlaster001_1K-JPG/PaintedPlaster001_1K-JPG_Displacement.jpg')
        this.paintedPlasterDisplacement.repeat.x = paintedPlaster_x
        this.paintedPlasterDisplacement.repeat.y = paintedPlaster_y
        this.paintedPlasterDisplacement.wrapS = THREE.RepeatWrapping
        this.paintedPlasterDisplacement.wrapT = THREE.RepeatWrapping
        this.paintedPlasterNormalGL = this.loaders.textures.load('../../textures/PaintedPlaster001_1K-JPG/PaintedPlaster001_1K-JPG_NormalGL.jpg')
        this.paintedPlasterNormalGL.repeat.x = paintedPlaster_x
        this.paintedPlasterNormalGL.repeat.y = paintedPlaster_y
        this.paintedPlasterNormalGL.wrapS = THREE.RepeatWrapping
        this.paintedPlasterNormalGL.wrapT = THREE.RepeatWrapping
        // this.paintedPlasterAmbientOcclusion = this.loaders.textures.load('../../textures/PaintedPlaster001_1K-JPG/PaintedPlaster001_1K-JPG_AmbientOcclusion.jpg')
        // this.paintedPlasterAmbientOcclusion.repeat.x = paintedPlaster_x
        // this.paintedPlasterAmbientOcclusion.repeat.y = paintedPlaster_y
        // this.paintedPlasterAmbientOcclusion.wrapS = THREE.RepeatWrapping
        // this.paintedPlasterAmbientOcclusion.wrapT = THREE.RepeatWrapping
        this.paintedPlasterRoughness = this.loaders.textures.load('../../textures/PaintedPlaster001_1K-JPG/PaintedPlaster001_1K-JPG_Roughness.jpg')
        this.paintedPlasterRoughness.repeat.x = paintedPlaster_x
        this.paintedPlasterRoughness.repeat.y = paintedPlaster_y
        this.paintedPlasterRoughness.wrapS = THREE.RepeatWrapping
        this.paintedPlasterRoughness.wrapT = THREE.RepeatWrapping

        // Painted Wall
        const paintedWall_x = 0.1
        const paintedWall_y = 0.1
        this.paintedWallColor = this.loaders.textures.load('../../textures/PaintedPlaster009_1K-JPG/PaintedPlaster009_1K-JPG_Color.jpg')
        this.paintedWallColor.repeat.x = paintedWall_x
        this.paintedWallColor.repeat.y = paintedWall_y
        this.paintedWallColor.wrapS = THREE.RepeatWrapping
        this.paintedWallColor.wrapT = THREE.RepeatWrapping
        this.paintedWallDisplacement = this.loaders.textures.load('../../textures/PaintedPlaster009_1K-JPG/PaintedPlaster009_1K-JPG_Displacement.jpg')
        this.paintedWallDisplacement.repeat.x = paintedWall_x
        this.paintedWallDisplacement.repeat.y = paintedWall_y
        this.paintedWallDisplacement.wrapS = THREE.RepeatWrapping
        this.paintedWallDisplacement.wrapT = THREE.RepeatWrapping
        this.paintedWallNormalGL = this.loaders.textures.load('../../textures/PaintedPlaster009_1K-JPG/PaintedPlaster009_1K-JPG_NormalGL.jpg')
        this.paintedWallNormalGL.repeat.x = paintedWall_x
        this.paintedWallNormalGL.repeat.y = paintedWall_y
        this.paintedWallNormalGL.wrapS = THREE.RepeatWrapping
        this.paintedWallNormalGL.wrapT = THREE.RepeatWrapping
        this.paintedWallAmbientOcclusion = this.loaders.textures.load('../../textures/PaintedPlaster009_1K-JPG/PaintedPlaster009_1K-JPG_AmbientOcclusion.jpg')
        this.paintedWallAmbientOcclusion.repeat.x = paintedWall_x
        this.paintedWallAmbientOcclusion.repeat.y = paintedWall_y
        this.paintedWallAmbientOcclusion.wrapS = THREE.RepeatWrapping
        this.paintedWallAmbientOcclusion.wrapT = THREE.RepeatWrapping
        this.paintedWallRoughness = this.loaders.textures.load('../../textures/PaintedPlaster009_1K-JPG/PaintedPlaster009_1K-JPG_Roughness.jpg')
        this.paintedWallRoughness.repeat.x = paintedWall_x
        this.paintedWallRoughness.repeat.y = paintedWall_y
        this.paintedWallRoughness.wrapS = THREE.RepeatWrapping
        this.paintedWallRoughness.wrapT = THREE.RepeatWrapping

        // Wood Siding
        const woodSiding_x = 0.01
        const woodSiding_y = 0.01
        this.woodSidingColor = this.loaders.textures.load('../../textures/WoodSiding005_1K-JPG/WoodSiding005_1K-JPG_Color.jpg')
        this.woodSidingColor.repeat.x = woodSiding_x
        this.woodSidingColor.repeat.y = woodSiding_y
        this.woodSidingColor.wrapS = THREE.RepeatWrapping
        this.woodSidingColor.wrapT = THREE.RepeatWrapping
        this.woodSidingDisplacement = this.loaders.textures.load('../../textures/WoodSiding005_1K-JPG/WoodSiding005_1K-JPG_Displacement.jpg')
        this.woodSidingDisplacement.repeat.x = woodSiding_x
        this.woodSidingDisplacement.repeat.y = woodSiding_y
        this.woodSidingDisplacement.wrapS = THREE.RepeatWrapping
        this.woodSidingDisplacement.wrapT = THREE.RepeatWrapping
        this.woodSidingNormalGL = this.loaders.textures.load('../../textures/WoodSiding005_1K-JPG/WoodSiding005_1K-JPG_NormalGL.jpg')
        this.woodSidingNormalGL.repeat.x = woodSiding_x
        this.woodSidingNormalGL.repeat.y = woodSiding_y
        this.woodSidingNormalGL.wrapS = THREE.RepeatWrapping
        this.woodSidingNormalGL.wrapT = THREE.RepeatWrapping
        this.woodSidingAmbientOcclusion = this.loaders.textures.load('../../textures/WoodSiding005_1K-JPG/WoodSiding005_1K-JPG_AmbientOcclusion.jpg')
        this.woodSidingAmbientOcclusion.repeat.x = woodSiding_x
        this.woodSidingAmbientOcclusion.repeat.y = woodSiding_y
        this.woodSidingAmbientOcclusion.wrapS = THREE.RepeatWrapping
        this.woodSidingAmbientOcclusion.wrapT = THREE.RepeatWrapping
        this.woodSidingRoughness = this.loaders.textures.load('../../textures/WoodSiding005_1K-JPG/WoodSiding005_1K-JPG_Roughness.jpg')
        this.woodSidingRoughness.repeat.x = woodSiding_x
        this.woodSidingRoughness.repeat.y = woodSiding_y
        this.woodSidingRoughness.wrapS = THREE.RepeatWrapping
        this.woodSidingRoughness.wrapT = THREE.RepeatWrapping


    }
}