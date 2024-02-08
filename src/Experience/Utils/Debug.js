import * as dat from 'lil-gui'

import Experience from '../Experience'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if (this.active)
        {
            this.ui = new dat.GUI()

            this.MASTERfolder = this.ui.addFolder('MASTER').open().hide()
            this.CONFIGfolder = this.ui.addFolder('CONFIG').open().hide()
            this.materialFolder = this.ui.addFolder('material').open().hide()
            this.cameraFolder = this.ui.addFolder('camera').open().hide()
            this.rendererFolder = this.ui.addFolder('renderer').open().hide()
            this.ambientLightFolder = this.ui.addFolder('ambient').open().hide()
            this.directionalLightFolder = this.ui.addFolder('directional').open().hide()
            this.areaLightFolder = this.ui.addFolder('areaLight').open().hide()

            this.sizeFolder = this.ui.addFolder('sizes').show().open()
            this.roofFolder = this.ui.addFolder('roof').show().open()
            this.pergolaQ27Accessories = this.ui.addFolder('pergolaQ27 Accessories').close().show()
            this.sidesFolder = this.ui.addFolder('Sides').open().show()
            this.side01Folder = this.sidesFolder.addFolder('Side 01').close().show()
            this.side02Folder = this.sidesFolder.addFolder('Side 02').close().show()
            this.side03Folder = this.sidesFolder.addFolder('Side 03').close().show()
            this.side04Folder = this.sidesFolder.addFolder('Side 04').close().show()

            this.attachmentFolder = this.ui.addFolder('attachment').close().show()
            this.lightsFolder = this.ui.addFolder('lights').close().show()
            this.colorFolder = this.ui.addFolder('color').close().show()

        }
    }

} 