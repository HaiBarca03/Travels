import React, { useEffect } from 'react'
import './LocationPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocal } from '../../service/localService';

const LocationPage = () => {
    const dispatch = useDispatch();
    const { locations, isLoading, error } = useSelector((state) => state.local);

    useEffect(() => {
        dispatch(getAllLocal());
    }, [dispatch]);

    const mappedLocations = Array.isArray(locations?.data)
        ? locations.data.map((location) => ({
            name: location.provinceCity,
            image: location.avatar?.url || 'https://via.placeholder.com/300',
        }))
        : [];
    return (
        <div className="container_local-wrapper">
            <div className="title_best-local">
                <p>Địa điểm</p>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error?.message || error || 'Unable to fetch locations.'}</p>
            ) : mappedLocations.length === 0 ? (
                <p>No locations available.</p>
            ) : (<div className='wrapper_card-local'>
                {mappedLocations.map((location, index) => (
                    <div className="card_local">
                        <div
                            className="card-image_local"
                            style={{ backgroundImage: `url(${location.image})` }}
                        >
                            <div className="card-title_local">
                                <h2>{location.name}</h2>
                                <div className='detail_count-local'>
                                    <h4>40 Hotel</h4>
                                    <h4>40 Restaurant</h4>
                                    <h4>40 Tours</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    )
}

export default LocationPage