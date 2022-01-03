<template>
    <div class="Auth">
        <div class="Auth__Login">
            <Spin tip="Đang xử lý..." :spinning="loading">
                <div class="FormLogin__Content">
                    <div class="FormLogin__Content__Logo">
                        <img src="@/assets/images/logo_login.svg" width="100" height="100" />
                    </div>
                    <button class="login-with-google-btn" @click="signInWithGoogle">Đăng nhập với Google</button>
                    <!-- <a class="fb connect" @click="signInWithFacebook"> Đăng nhập với Facebook </a> -->
                    <Form>
                        <FormItem v-bind="validateInfos['email']">
                            <Input
                                v-model:value="formData.email"
                                placeholder="Nhập tên đăng nhập"
                                size="large"
                                autofocus
                                @pressEnter="signInWithEmailAndPassword"
                            ></Input>
                        </FormItem>
                        <FormItem v-bind="validateInfos['password']">
                            <Input
                                v-model:value="formData.password"
                                type="password"
                                autocomplete="off"
                                placeholder="Nhập mật khẩu"
                                size="large"
                                @pressEnter="signInWithEmailAndPassword"
                            ></Input>
                        </FormItem>
                        <Button size="large" class="FormLogin__Content__Submit" type="primary" @click="onSubmitLogin"
                            >Đăng nhập</Button
                        >
                        <!-- <span class="FormLogin__Content__Forgot" @click="onForgotPassword"
          >Quên mật khẩu của bạn?</span
        > -->
                    </Form>
                </div>
            </Spin>
        </div>
    </div>
    <!-- <div v-if="loading">Loading...</div>
  <div v-else>
    <div v-if="user">
      <div>Welcome {{ user.email }}!</div>
      <div>
        <label style="display: block">ID Token:</label>
        <textarea
          v-if="credential"
          readonly
          style="max-width: 400px"
          v-model="credential.idToken"
          cols="100"
          rows="5"
        ></textarea>
      </div>
      <button @click="signOut">Logout</button>
    </div>
    <div v-else>
      <div>No user signed in.</div>
      <div><button @click="signInWithGoogle">Đăng nhập với Google</button></div>
      <div>
        <button @click="signInWithFacebook">Đăng nhập với Facebook</button>
      </div>
      <div>hoặc:</div>
      <div>
        <input v-model="email" type="email" placeholder="Input email" />
      </div>
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Input password"
        />
      </div>
      <button @click="signInWithEmailAndPassword">
        Đăng nhập với email và mật khẩu
      </button>
    </div>
  </div> -->
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { Form, Input, Button, Spin, message } from 'ant-design-vue';
import firebase from '@/plugins/firebase';
import { useAuth } from '@/composables/auth/index';
import { useRouter } from 'vue-router';
const useForm = Form.useForm;

const { Item: FormItem } = Form;

export default {
    name: 'Login',
    components: {
        Form,
        FormItem,
        Input,
        Button,
        Spin,
    },
    setup() {
        const loading = ref(true);
        const user = ref(firebase.auth.currentUser);
        const credential = ref(undefined);
        const email = ref('');
        const password = ref('');
        const signInError = ref(undefined);
        const { firebaseLogin, _isAuthenticated, resultData } = useAuth();
        const router = useRouter();

        watch(_isAuthenticated, () => {
            if (_isAuthenticated.value) {
                message.success(resultData.value);
                router.push({ name: 'Home' });
            }
        });

        const signInWithGoogle = () => {
            firebase.signInWithGoogle().catch(error => {
                signInError.value = error;
            });
        };

        const signInWithFacebook = () => {
            firebase.signInWithFacebook().catch(error => {
                signInError.value = error;
            });
        };

        const signInWithEmailAndPassword = () => {
            firebase.signInWithEmailAndPassword(formData.value).catch(error => {
                signInError.value = error;
            });
        };

        const signOut = () => {
            firebase.signOut();
            window.location.reload();
        };

        firebase
            .getRedirectResult()
            .then(function (result) {
                signInError.value = undefined;
                if (result && result.credential) {
                    // has just redirected from the login page
                    // $this.credential.value = result.credential;
                    user.value = result.user;
                }
            })
            .catch(function (error) {
                signInError.value = error;
            });

        // always re-pull user info once the browser is refreshed
        firebase.auth.onAuthStateChanged(function (usr) {
            loading.value = false;
            if (usr) {
                signInError.value = undefined;
                user.value = usr;

                if (!credential.value) {
                    user.value
                        .getIdToken()
                        .then(function (idToken) {
                            firebaseLogin(idToken);
                            credential.value = {
                                idToken: idToken,
                            };
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            }
        });

        // for username/password
        const formData = reactive({
            email: undefined,
            password: undefined,
        });

        const formRules = reactive({
            email: [
                {
                    required: true,
                    message: 'Vui lòng nhập tên tài khoản',
                },
            ],
            password: [
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu',
                },
            ],
        });

        const { validateInfos, validate } = useForm(formData, formRules);

        const onSubmitLogin = () => {
            validate()
                .then(() => {
                    signInWithEmailAndPassword(formData);
                })
                .catch(ex => {
                    message.error('Có lỗi xảy ra', ex);
                });
        };

        return {
            loading,
            user,
            credential,
            email,
            password,
            signInError,
            formData,
            validateInfos,
            onSubmitLogin,
            signInWithGoogle,
            signInWithFacebook,
            signOut,
            signInWithEmailAndPassword,
        };
    },
    watch: {
        signInError(err) {
            if (!err) return;

            console.log(err);

            // User's email already exists.
            if (err.code === 'auth/account-exists-with-different-credential') {
                // Temporary keep the credential
                const pendingCred = err.credential;
                console.log(pendingCred);
                const email = err.email;

                // Get the sign-in methods for this email.
                firebase.auth.fetchSignInMethodsForEmail(email).then(methods => {
                    console.log(methods);
                    // TODO: Ask the user to choose a method
                });
            }
        },
    },
};
</script>

<style lang="scss">
.Auth {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url(/img/bg_login.5f0ac95e.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &__Login {
        width: 398px;
        border-radius: 15px;
        background: #fff;
        border: 1px solid #f4f4f4;
        padding: 40px;
    }
}

.LayoutBlank__Content {
    background-image: url('~@/assets/images/bg_login.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
}

.FormLogin__Content {
    .ant-form-item-explain-error {
        font-size: 1rem;
        text-align: left;
    }

    input {
        font-size: 14px;
        height: 40px;
    }

    &__Logo {
        width: 318px;
        margin: 0 auto;
        margin-bottom: 40px;

        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }

    &__Submit {
        margin: 16px 0;
        width: 100%;
        font-weight: 500;
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
        background: #53459b !important;
        border-color: #53459b !important;
        border-radius: 5px;
    }

    &__CheckAuto {
        display: block;
        color: #999;

        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #53459b !important;
            border-color: #53459b !important;
        }

        .ant-checkbox:active .ant-checkbox-inner,
        .ant-checkbox:hover .ant-checkbox-inner {
            border-color: #53459b !important;
        }

        span {
            font-size: 12px;
            font-weight: 500;
        }
    }

    &__Forgot {
        display: block;
        font-size: 12px;
        color: #999;
        text-align: center;

        &:hover {
            cursor: pointer;
            color: #53459b;
        }
    }
}

.login-with-google-btn {
    transition: background-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
    padding: 12px 40px 12px 66px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    color: #757575;
    font-size: 14px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 12px 14px;
    margin-bottom: 24px;

    &:hover {
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }

    &:active {
        background-color: #eee;
    }

    &:focus {
        outline: none;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25), 0 0 0 3px #c8dafc;
    }

    &:disabled {
        filter: grayscale(100%);
        background-color: #ebebeb;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
    }
}

a.fb {
    font-family: Lucida Grande, Helvetica Neue, Helvetica, Arial, sans-serif;
    display: inline-block;
    font-size: 14px;
    padding: 13px 30px 15px 44px;
    background: #3a5a97;
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 20, 0.4);
    text-decoration: none;
    line-height: 1;
    position: relative;
    border-radius: 5px;
    margin-top: 24px;
    margin-bottom: 24px;

    &:hover {
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }
}

.connect::before {
    display: inline-block;
    position: relative;
    background-image: url(data:image/png;base64,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);
    height: 23px;
    background-repeat: no-repeat;
    background-position: 0 3px;
    text-indent: -9999px;
    text-align: center;
    width: 29px;
    line-height: 23px;
    margin: -8px 7px -7px -30px;
    padding: 2 25px 0 0;
    content: 'f';
}
</style>
