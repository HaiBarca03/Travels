import AdminPage from '../pages/AdminPage/AdminPage'
import BookedPage from '../pages/BookedPage/BookedPage'
import HotelBooking from '../pages/BookingPage/HotelBooking/HotelBooking'
import RestaurantBooking from '../pages/BookingPage/RestaurantBooking/RestaurantBooking'
import TourBooking from '../pages/BookingPage/TourBooking/TourBooking'
import TouristBooking from '../pages/BookingPage/TouristBooking/TouristBooking'
import HomePage from '../pages/HomePage/HomePage'
import HotelDetail from '../pages/HotelDetail/HotelDetail'
import HotelPage from '../pages/HotelPage/HotelPage'
import LocationPage from '../pages/LocationPage/LocationPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotPoundPage from '../pages/NotPoundPage/NotPoundPage'
import OrderPage from '../pages/OrderPage/OrderPage'
import PaymentPage from '../pages/PaymentPage/PaymentPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import RestaurantDetail from '../pages/RestaurantDetail/RestaurantDetail'
import RestaurantPage from '../pages/RestaurantPage/RestaurantPage'
import RestaurantSearch from '../pages/SearchPage/RestaurantSearch/RestaurantSearch'
import TouristSearch from '../pages/SearchPage/TouristSearch/TouristSearch'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import TourDetail from '../pages/TourDetail/TourDetail'
import TouristDestinationDetail from '../pages/TouristDestinationDetail/TouristDestinationDetail'
import TouristDestinationPage from '../pages/TouristDestinationPage/TouristDestinationPage'
import TourPage from '../pages/TourPage/TourPage'

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true
  },
  {
    path: '/admin',
    page: AdminPage,
    isShowHeader: false
  },
  {
    path: '/profile',
    page: ProfilePage,
    isShowHeader: true
  },
  {
    path: '/location',
    page: LocationPage,
    isShowHeader: true
  },
  {
    path: '/hotel',
    page: HotelPage,
    isShowHeader: true
  },
  {
    path: '/hotel-detail',
    page: HotelDetail,
    isShowHeader: true
  },
  {
    path: '/restaurant',
    page: RestaurantPage,
    isShowHeader: true
  },
  {
    path: '/restaurant-detail',
    page: RestaurantDetail,
    isShowHeader: true
  },
  {
    path: '/search/restaurant',
    page: RestaurantSearch,
    isShowHeader: true
  },
  {
    path: '/tourist-destination',
    page: TouristDestinationPage,
    isShowHeader: true
  },
  {
    path: '/tourist-destination-detail',
    page: TouristDestinationDetail,
    isShowHeader: true
  },
  {
    path: '/tour',
    page: TourPage,
    isShowHeader: true
  },
  {
    path: '/tour-detail/:id',
    page: TourDetail,
    isShowHeader: true
  },
  {
    path: '/search/tourist-destination',
    page: TouristSearch,
    isShowHeader: true
  },
  {
    path: '/tour/booking',
    page: TourBooking,
    isShowHeader: true
  },
  {
    path: '/tourist/booking',
    page: TouristBooking,
    isShowHeader: true
  },
  {
    path: '/hotel/booking',
    page: HotelBooking,
    isShowHeader: true
  },
  {
    path: '/restaurant/booking',
    page: RestaurantBooking,
    isShowHeader: true
  },
  {
    path: '/payment',
    page: PaymentPage,
    isShowHeader: true
  },
  {
    path: '/login',
    page: LoginPage,
    isShowHeader: false
  },
  {
    path: '/register',
    page: SignUpPage,
    isShowHeader: false
  },
  {
    path: '/order',
    page: OrderPage,
    isShowHeader: true
  },
  {
    path: '/booked',
    page: BookedPage,
    isShowHeader: true
  },
  {
    path: '*',
    page: NotPoundPage
  }
]
