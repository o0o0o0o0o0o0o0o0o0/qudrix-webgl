import * as THREE from 'three'

export default class Manager
{
    constructor()
    {


        this.loadingStatus = false


        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                console.log('loaded')
                this.loadingStatus = true
                console.log(this.loadingStatus);


            },

            // Progress
            
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                const progressRatio = itemsLoaded / itemsTotal
                // console.log(progressRatio.toFixed(2) * 100 + "%")
            }

            // () =>
            // {
            //     console.log('progress')
            // }
        )

    }
}