import React, { useEffect, useState } from 'react';
import './AdminHotelCpn.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { getAllHotel } from '../../../service/hotelService';
import AddHotelForm from './AddHotelForm';
import { addHotel, deleteHotel, updateHotel } from '../../../service/adminService';
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditHotelForm from './EditHotelForm';

const AdminHotelCpn = () => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [idSelectedHotel, setidSelectedHotel] = useState(null)
    const { hotel } = useSelector((state) => state.hotel);
    const [editForm] = Form.useForm();

    console.log('listHotel', hotel)
    useEffect(() => {
        dispatch(getAllHotel());
    }, [dispatch]);

    const handleViewDetails = (hotel) => {
        setSelectedHotel(hotel);
        setIsDetailModalVisible(true);
    };

    const handleDelete = (id) => {
        console.log('id', id)
        dispatch(deleteHotel({ id: id }))
        useEffect(() => {
            dispatch(getAllHotel());
        }, [dispatch]);
    };

    const handleAddNewHotel = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
        setSelectedHotel(null);
    };

    const handleEdit = (id) => {
        console.log('id', id)
        setidSelectedHotel(id)
        setIsEditModalVisible(true);
    };
    console.log('idSelectedHotel', idSelectedHotel)
    const handleSubmitEditHotel = (data) => {
        console.log('Updated Hotel Data:', { ...selectedHotel, ...data });
        setIsEditModalVisible(false);
        dispatch(updateHotel({
            accommodationId: idSelectedHotel,
            data: data
        }))
        useEffect(() => {
            dispatch(getAllHotel());
        }, [dispatch]);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalVisible(false);
        setSelectedHotel(null);
    };
    const handleSubmitHotel = async (data) => {
        try {
            await dispatch(addHotel({ data })).unwrap();
            message.success('Hotel added successfully!');
            setIsModalVisible(false);
        } catch (err) {
            message.error(err || 'Failed to add hotel');
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Admin Hotel Management</h2>

            <button className="btn btn-success mb-3" onClick={handleAddNewHotel}>
                Add New Hotel
            </button>

            <AddHotelForm
                visible={isModalVisible}
                onClose={handleCloseModal}
                onSubmit={handleSubmitHotel}
            />

            <EditHotelForm
                visible={isEditModalVisible}
                onCancel={handleCloseEditModal}
                onSubmit={handleSubmitEditHotel}
                id={idSelectedHotel}
            />

            {selectedHotel && (
                <Modal
                    title="Hotel Details"
                    visible={isDetailModalVisible}
                    onCancel={handleCloseDetailModal}
                    footer={null}
                >
                    <p><strong>Name:</strong> {selectedHotel.name}</p>
                    <p><strong>Address:</strong> {selectedHotel.address}</p>
                    <p><strong>Price:</strong> {selectedHotel.price} VND</p>
                    <p><strong>Rating:</strong> {selectedHotel.rating} Stars</p>
                    <p><strong>Type:</strong> {selectedHotel.type}</p>
                    <p><strong>Amenities:</strong> {selectedHotel.amenities?.join(', ')}</p>
                </Modal>
            )}

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Type</th>
                        <th>Amenities</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotel?.data?.map((hotel) => (
                        <tr key={hotel._id}>
                            <td>{hotel.name}</td>
                            <td>{hotel.address}</td>
                            <td>{hotel.price} VND</td>
                            <td>{hotel.rating} Stars</td>
                            <td>{hotel.type}</td>
                            <td>{hotel.amenities.join(', ')}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleViewDetails(hotel)}>
                                    View Details
                                </button>
                                <button className="btn btn-warning" onClick={() => handleEdit(hotel._id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(hotel._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminHotelCpn;
