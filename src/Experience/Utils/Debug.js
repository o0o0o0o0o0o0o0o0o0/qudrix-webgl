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

            this.rendererFolder = this.ui.addFolder('renderer').open().show()
            this.ambientLightFolder = this.ui.addFolder('ambient').open().hide()
            this.directionalLightFolder = this.ui.addFolder('directional').open().hide()
            this.areaLightFolder = this.ui.addFolder('areaLight').open().hide()

            this.roofFolder = this.ui.addFolder('roof')
            this.pergolaQ27Accessories = this.ui.addFolder('pergolaQ27 Accessories').close()
            this.sidesFolder = this.ui.addFolder('Sides').open()
            this.side01Folder = this.sidesFolder.addFolder('Side 01').open()
            this.side02Folder = this.sidesFolder.addFolder('Side 02').close()
            this.side03Folder = this.sidesFolder.addFolder('Side 03').close()
            this.side04Folder = this.sidesFolder.addFolder('Side 04').close()
            this.attachmentFolder = this.ui.addFolder('attachment').open()
            this.colorFolder = this.ui.addFolder('color').open()

        }
    }

} 