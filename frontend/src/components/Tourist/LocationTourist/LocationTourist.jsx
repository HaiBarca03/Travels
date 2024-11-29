import React from 'react'
import CardTour from '../CardTour'

const LocationTourist = ({ locationId }) => {
    return (
        <div>
            <CardTour locationId={locationId} />
        </div>
    )
}

export default LocationTourist
