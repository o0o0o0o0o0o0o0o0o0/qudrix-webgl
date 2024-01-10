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

            this.roofFolder = this.ui.addFolder('roof')
            this.pergolaQ27Accessories = this.ui.addFolder('pergolaQ27 Accessories').close()
            this.attachmentFolder = this.ui.addFolder('attachment')
            this.sidesFolder = this.ui.addFolder('Sides')
        }
    }

} 