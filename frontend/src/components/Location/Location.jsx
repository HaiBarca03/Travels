import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import './Location.css';
import { getAllLocal } from '../../service/localService';
import { RiMoreFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Location = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
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

    const navigatePage = () => {
        navigate('/location')
    }
    return (
        <div className="container_local">
            <div className="title_best-local">
                <p>Địa điểm tốt nhất</p>
                <div><span onClick={navigatePage}>xem thêm</span><RiMoreFill /></div>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error?.message || error || 'Unable to fetch locations.'}</p>
            ) : mappedLocations.length === 0 ? (
                <p>No locations available.</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {mappedLocations.map((location, index) => (
                        <SwiperSlide key={index}>
                            <div className="card_local">
                                <div
                                    className="card-image_local"
                                    style={{ backgroundImage: `url(${location.image})` }}
                                >
                                    <div className="card-title_local">
                                        <h2>{location.name}</h2>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Location;
