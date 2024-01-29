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

            this.MASTERfolder = this.ui.addFolder('MASTER').open().show()
            this.CONFIGfolder = this.ui.addFolder('CONFIG').open().show()
            this.cameraFolder = this.ui.addFolder('camera').open().hide()
            this.rendererFolder = this.ui.addFolder('renderer').open().hide()
            this.ambientLightFolder = this.ui.addFolder('ambient').open().hide()
            this.directionalLightFolder = this.ui.addFolder('directional').open().hide()
            this.areaLightFolder = this.ui.addFolder('areaLight').open().hide()

            this.sizeFolder = this.ui.addFolder('sizes').hide()
            this.roofFolder = this.ui.addFolder('roof').hide()
            this.pergolaQ27Accessories = this.ui.addFolder('pergolaQ27 Accessories').close().hide()
            this.sidesFolder = this.ui.addFolder('Sides').open().hide()
            this.side01Folder = this.sidesFolder.addFolder('Side 01').close().hide()
            this.side02Folder = this.sidesFolder.addFolder('Side 02').close().hide()
            this.side03Folder = this.sidesFolder.addFolder('Side 03').close().hide()
            this.side04Folder = this.sidesFolder.addFolder('Side 04').close().hide()
            this.attachmentFolder = this.ui.addFolder('attachment').close().hide()
            this.colorFolder = this.ui.addFolder('color').open().hide()

        }
    }

} 