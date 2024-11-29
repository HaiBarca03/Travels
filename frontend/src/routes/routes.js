import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import HotelPage from "../pages/HotelPage/HotelPage";
import LocationPage from "../pages/LocationPage/LocationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TouristDetail from "../pages/TouristDetail/TouristDetail";
import TouristPage from "../pages/TouristPage/TouristPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: false,
    },
    {
        path: '/location',
        page: LocationPage,
        isShowHeader: true,
    },
    {
        path: '/tourist-attraction/:locationId',
        page: TouristPage,
        isShowHeader: true,
    },
    {
        path: '/all-tourist-attraction/',
        page: TouristPage,
        isShowHeader: true,
    },
    {
        path: '/tourist-detail/:id',
        page: TouristDetail,
        isShowHeader: true,
    },
    {
        path: '/all-hotel',
        page: HotelPage,
        isShowHeader: true,
    },
    {
        path: '/login',
        page: LoginPage,
        isShowHeader: false,
    },
    {
        path: '/register',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '*',
        page: NotPoundPage
    }
]