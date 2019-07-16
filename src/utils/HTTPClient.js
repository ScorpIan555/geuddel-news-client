import { API } from 'aws-amplify';

const get = async(type, endpoint, data) => {

    if(type == 'GET_NEWS') {
        console.log('GETTING NEWS!:::', type, endpoint, data);
    }
    console.log('DIDNt match GET NEWS:::', type, endpoint, data );
    return;
}

const post = async(type, endpoint, body) => {
    console.log('GETTING NEWS!:::', type, endpoint, body);
    // if(type == 'GET_NEWS') {
        console.log('GETTING NEWS!:::', type, endpoint, body);
        
        // try {
        //    let response = await API.post('getNews', "/getNews", { body: body })
        //     console.log('HTTPClient.post response:::', response);
        // } catch (error) {
        //     console.log('caught error::::', error);
        // }
        let apiPostRes = API.get('gNewsNotes', "/getNews")
        .then(res => {
            console.log('apiPostRes', res);
            return  res;
        })
        .catch(err => console.log('API.get error::::', err));

        console.log('apiPostRes:::', apiPostRes);
        
        return apiPostRes;
}

export default {
    asyncGet: async(pkg) => {
        console.log('AsyncGet.pkg:::', pkg);

        try {
            console.log('get(pkg):::', get(pkg));
            
            
        } catch (error) {
            console.log('caught error::::', error);
        }
    },

    asyncPost: (type, endpoint, body) => {
        console.log('AsyncPost.pkg:::', type, endpoint, body);
        return dispatch => post(type, endpoint, body)
        .then(response => {
            console.log('asyncPost.response::', response);
            // if(type != null ) {
                dispatch({
                    type: type.type,
                    data: response
                });
            // }
            return response;
        })
        .catch(err => {
            console.log('asyncPost::: ', err);
            throw err;
        })

        // try {
        //     console.log('get(pkg):::', post(pkg));
            

        //     console.log('asyncResponse', asyncResponse);
        // } catch (error) {
        //     console.log('caught error::::', error);
        // }
    }
}