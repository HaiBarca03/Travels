import React from 'react'
import './SearchTour.css'
import { Button } from 'antd'
import { CiLocationOn } from 'react-icons/ci'

const SearchTour = () => {
    return (
        <div className="search_nav">
            <table className='table_search' border="1">
                <tr>
                    <td>
                        <CiLocationOn className='item_icon-search' />
                        Địa điểm
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td className='option_tour'>
                        <select className="city-select">
                            <option value="hanoi">Hà Nội</option>
                            <option value="hochiminh">Hồ Chí Minh</option>
                            <option value="danang">Đà Nẵng</option>
                            <option value="halong">Hạ Long</option>
                        </select>
                    </td>
                    <td className='btn_tour'>
                        <Button>
                            Tìm kiếm
                        </Button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default SearchTour
