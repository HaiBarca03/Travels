import HomePage from "../pages/HomePage/HomePage";
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
        path: '/login',
        page: LoginPage,
        isShowHeader: true,
    },
    {
        path: '/register',
        page: SignUpPage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotPoundPage
    }
]