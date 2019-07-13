import { Auth } from 'aws-amplify';

const post = user => {
    console.log('AuthClient.post', user);

    let username = user['username'];
    let password = user['password'];

    Auth.signUp({
        username,
        password
    }).then(data => {
        console.log('Auth.signup.data:::', data);
    }).catch(err => console.log('err:::', err));
};

export default {
    post,
    postAsync: (pkg) => {
        console.log('PostUSERASync:::', post);
        return dispatch => post(pkg)
            .then(res => {
                console.log('postAsync.pkg', res);
                if(pkg.type != null) {
                    dispatch({
                        type: pkg.type,
                        data: res
                    });
                }
                return res;
            })
            .catch(err => {
                console.log('err:::', err);
                throw err;
            });
    }
};