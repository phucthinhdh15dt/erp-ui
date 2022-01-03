import { ref, inject, toRaw } from 'vue';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import firebase from '@/plugins/firebase';

const useAuth = () => {
    const accessToken = ref(localStorage.getItem('access_token') || sessionStorage.getItem('access_token'));
    const loginResult = ref('');
    const _isAuthenticated = ref(false);
    const resultData = ref('');
    const isLoading = ref(false);
    const changeResult = ref(false);
    const _requirePassChange = ref(false);

    const api = inject('api');

    const logout = () => {
        isLoading.value = true;
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
        firebase.signOut();
        _isAuthenticated.value = false;
        isLoading.value = false;
    };

    const isAuthenticated = () => {
        try {
            const { exp, is_must_be_change_password: requireChangePass } = jwtDecode(accessToken.value);
            const isValid = moment(exp * 1000).isAfter(moment());

            _isAuthenticated.value = isValid;
            _requirePassChange.value = requireChangePass;

            return isValid;
        } catch {
            return false;
        }
    };

    const getUserProfile = () => {
        try {
            const { username, name, picture } = jwtDecode(accessToken.value);

            return {
                username: username || name,
                avatar: picture,
            };
        } catch {
            return {};
        }
    };

    const hasPermission = permiss => {
        try {
            const { permission } = jwtDecode(accessToken.value);
            return permission.includes(permiss);
        } catch {
            return false;
        }
    };

    const requestLogin = data => {
        const { username, password } = toRaw(data);
        return api.auth.requestLogin({ username, password });
    };

    const login = async data => {
        try {
            isLoading.value = true;
            const { isAutoLogin } = toRaw(data);
            const response = await requestLogin(data);

            if (response.token) {
                if (isAutoLogin) {
                    localStorage.setItem('access_token', response.token);
                } else {
                    sessionStorage.setItem('access_token', response.token);
                }

                _isAuthenticated.value = true;
                resultData.value = 'Đăng nhập thành công';
            }
            isLoading.value = false;
        } catch (e) {
            _isAuthenticated.value = false;
            isLoading.value = false;
            throw e;
        }
    };

    const firebaseLogin = token => {
        try {
            isLoading.value = true;

            if (token) {
                localStorage.setItem('access_token', token);

                _isAuthenticated.value = true;
                resultData.value = 'Đăng nhập thành công';
            }

            isLoading.value = false;
        } catch (e) {
            _isAuthenticated.value = false;
            isLoading.value = false;
            throw e;
        }
    };

    const requestChangePassword = async data => {
        try {
            isLoading.value = true;
            const { password, rePassword } = toRaw(data);
            const new_password = password;
            const confirm_new_password = rePassword;
            const response = await api.auth.requestChangePassword({ new_password, confirm_new_password });
            if (response.error) {
                changeResult.value = false;
                resultData.value = response.error.message;
            } else {
                changeResult.value = true;
                resultData.value = 'Đổi mật khẩu thành công';
            }

            isLoading.value = false;
        } catch (e) {
            isLoading.value = false;
            throw e;
        }
    };

    return {
        _isAuthenticated,
        _requirePassChange,
        getUserProfile,
        resultData,
        accessToken,
        isAuthenticated,
        login,
        loginResult,
        logout,
        isLoading,
        requestChangePassword,
        changeResult,
        hasPermission,
        firebaseLogin,
    };
};

export { useAuth };
