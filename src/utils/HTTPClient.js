import { API } from 'aws-amplify';
import articles from './cannedResults';
import topicArticles from './topicResults';

const get = async req => {

    if(req.type == 'GET_USER_LOCATION') {
        console.log('GET_USER_LOCATION!:::', req);

        const usersCountryCode = await API.get('gNewsNotes', '/getPublicIp/fish')
                    .then(response => {
                        console.log('response from Aws API module(location):::', response);
                        const countryCode = response.data.countryCode.toLowerCase();
                        console.log('countryCode:::', countryCode);
                        return countryCode;
                    })
                    .catch(error => {
                        console.log('error from AWS API module(location)', error);
                        return error;
                    });
        console.log('cC:::', usersCountryCode);
        return usersCountryCode;
    }

    if(req.type == 'GET_NEWS') {
        console.log('GETTING NEWS!:::', req);
        
        if(req.query !== undefined ) {
            // let userLocation = req.query.userLocation;
            console.log('getNews.req.query', req.query);

            let queryStringParameters = {
                country: req.query.userLocation,
                sources: req.query.sources,
                q: req.query.searchTerms,
                category: req.query.topic,
                language: req.query.language
            };

            let myInit = {
                queryStringParameters
            };
            console.log('myInit:::', myInit);

            // const articles = await API.get('gNewsNotes', '/getNews', myInit)
            // .then(response => {
            //     console.log('response from Aws API module(news):::', response);
            //     const apiNewsResults = response.data;
            //     return apiNewsResults;
            // })
            // .catch(error => {
            //     console.log('error from AWS API module(news)', error);
            //     return error;
            // });

            // let articles = [
            //     ['articleOne',  { object1: 'fake object'}],
            //     ['articleTwo',  { object2: 'fake object'}],
            //     ['articleThree',  { object3: 'fake object'}]
            // ]
            
            console.log('canned articles:::', articles);
    
            return articles;
        }
    }

    if(req.type == 'GET_NEWS_BY_TOPIC') {
        console.log('GET_NEWS_BY_TOPIC:::', req);

        if(req.query !== undefined ) {
            // let userLocation = req.query.userLocation;
            console.log('getNewsByTopic.req.query', req.query);

            let queryStringParameters = {
                country: req.query.userLocation,
                sources: req.query.sources,
                q: req.query.searchTerms,
                category: req.query.topic,
                language: req.query.language
            };

            let myInit = {
                queryStringParameters
            };
            console.log('myInit:::', myInit);

            // const articles = await API.get('gNewsNotes', '/getNews', myInit)
            // .then(response => {
            //     console.log('response from Aws API module(news):::', response);
            //     const apiNewsResults = response.data;
            //     return apiNewsResults;
            // })
            // .catch(error => {
            //     console.log('error from AWS API module(news)', error);
            //     return error;
            // });

            // let articles = [
            //     ['articleOne',  { object1: 'fake object'}],
            //     ['articleTwo',  { object2: 'fake object'}],
            //     ['articleThree',  { object3: 'fake object'}]
            // ]
            
            console.log('canned articles:::', topicArticles);
    
            return topicArticles;
        }


    }
}

// const post = async req => {
//     console.log('GETTING NEWS!:::', type, endpoint, body);
//     // if(type == 'GET_NEWS') {
//         console.log('GETTING NEWS!:::', type, endpoint, body);
        
//         // try {
//         //    let response = await API.post('getNews', "/getNews", { body: body })
//         //     console.log('HTTPClient.post response:::', response);
//         // } catch (error) {
//         //     console.log('caught error::::', error);
//         // }
//         let apiPostRes = API.get('gNewsNotes', "/getNewsapi")
//         .then(res => {
//             console.log('apiPostRes', res);
//             return  res;
//         })
//         .catch(err => console.log('API.get error::::', err));

//         console.log('apiPostRes:::', apiPostRes);
        
//         return apiPostRes;
// }

export default {

    getAsync: req => {
        console.log('getAsync.req:::', req);
        return dispatch =>
          get(req)
          .then(res => {
            console.log('responseFromThunkFunction:::', res);
            if (req.type != null) {
              dispatch({
                type: req.type,
                data: res
              });
            }
          });
      },

    postAsync: (req) => {
        console.log('postAsync.:::', type, endpoint, body);
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
        //     console.log('get():::', post());
            

        //     console.log('asyncResponse', asyncResponse);
        // } catch (error) {
        //     console.log('caught error::::', error);
        // }
    }
}