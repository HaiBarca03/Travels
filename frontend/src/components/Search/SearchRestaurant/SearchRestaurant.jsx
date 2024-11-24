import React from 'react'
import './SearchRestaurant.css'
import { CiLocationOn } from 'react-icons/ci'
import { IoRestaurant } from "react-icons/io5";
import { Button } from 'antd'

const SearchRestaurant = () => {
    return (
        <div className="search_nav">
            <table className='table_search' border="1">
                <tr>
                    <td>
                        <CiLocationOn className='item_icon-search' />
                        Địa điểm
                    </td>
                    <td>
                        <IoRestaurant className='item_icon-search' />
                        Loại nhà hàng
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td className='option_restaurant'>
                        <select className="city-select">
                            <option value="hanoi">Hà Nội</option>
                            <option value="hochiminh">Hồ Chí Minh</option>
                            <option value="danang">Đà Nẵng</option>
                            <option value="halong">Hạ Long</option>
                        </select>
                    </td>
                    <td className='option_restaurant'>
                        <select className="city-select">
                            <option value="hanoi">Hải sản</option>
                            <option value="hochiminh">Siêu hải sản</option>
                            <option value="danang">Người ngoài hành tinh</option>
                            <option value="halong">Khủng long</option>
                        </select>
                    </td>
                    <td className='btn_restaurant'>
                        <Button>
                            Tìm kiếm
                        </Button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default SearchRestaurant
