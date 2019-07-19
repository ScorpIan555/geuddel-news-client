import { API } from 'aws-amplify';

const get = async pkg => {

    if(pkg.type == 'GET_NEWS') {
        console.log('GETTING NEWS!:::', pkg);

        const hopefullyNewsResults = await API.get('gNewsNotes', '/getNews')
                    .then(response => {
                        console.log('response from Aws API module:::', response)
                    })
                    .catch(error => {
                        console.log('error from AWS API module', error);
                    })
                console.log('hopefullyNewsResults', hopefullyNewsResults);
        return hopefullyNewsResults;

    }
    console.log('DIDNt match GET NEWS:::', pkg );
    return;
}

const post = async pkg => {
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
    // asyncGet: async pkg => {
    //     console.log('AsyncGet.pkg:::', pkg);

    //     try {
    //         console.log('get(pkg):::', get(pkg));
            
            
    //     } catch (error) {
    //         console.log('caught error::::', error);
    //     }
    // },
    getAsync: pkg => {
        return dispatch =>
          get(pkg).then(responseFromThunkFunction => {
            console.log('responseFromThunkFunction:::', responseFromThunkFunction);
            if (pkg.type != null) {
              dispatch({
                type: pkg.type,
                data: responseFromThunkFunction
              });
            }
          });
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