import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import LocationPage from "../pages/LocationPage/LocationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

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