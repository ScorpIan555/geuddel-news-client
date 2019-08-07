import { API } from 'aws-amplify';
// import articles from './cannedResults';
// import topicArticles from './topicResults';

const get = async req => {

    if(req.type === 'GET_CURRENT_USER_DB_INFO') {
        
        console.log('GET_USER_LOCATION!:::', req);
        const path = '/user/' + req.currentUser;

        const currentUserData = await API.get('gNewsUser', path)
        .then(response => {
            console.log('response from Aws API module(userData):::', response);
            // const countryCode = response.data.countryCode.toLowerCase();
            // console.log('countryCode:::', countryCode);
            return response;
        })
        .catch(error => {
            console.log('error from AWS API module(userData)', error);
            return error;
        });
        console.log('cC:::', currentUserData);
        // return 
        return currentUserData;
    }

    if(req.type === 'GET_USER_LOCATION') {
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
        // return 
        return usersCountryCode;
    }

    if(req.type === 'GET_NEWS') {
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

            const articles = await API.get('gNewsNotes', '/getNews', myInit)
            .then(response => {
                console.log('response from Aws API module(news):::', response);
                const apiNewsResults = response.data;
                return apiNewsResults;
            })
            .catch(error => {
                console.log('error from AWS API module(news)', error);
                return error;
            });

            
            // uncomment these after commenting out the above to use dummy api data
            // console.log('canned articles:::', articles);
    
            // return articles
            return articles;
        }
    }

  
}


const post = async req => {
    console.log('post:::', req);

    if(req.type === 'CREATE_USER_DB_INFO') {
        console.log('post:::', req);
        console.log('post:::', req.body.email);
        console.log('post:::', req.body.language);
        console.log('post:::', req.body.country);
        console.log('post:::', req.body.category);
           const response = await API.post('gNewsUser', '/user', {
               body: {
                  // PRIMARY key is provided in request headers from Cognito ID
                  userId: req.body.email,
                  email: req.body.email,
                  language: req.body.language,
                  country: req.body.country,  // RANGE key
                  category: req.body.category
               }
           })
           console.log('response:::', response);
            response['HttpResponse'] = 'Success';
            console.log('response:::', response);
        
            return response;
       }

   if(req.type === 'UPDATE_USER_DB_INFO') {
    console.log('post:::', req);
    console.log('post:::', req.body.email);
    console.log('post:::', req.body.language);
    console.log('post:::', req.body.country);
    console.log('post:::', req.body.category);

    const path = '/user/' + req.body.email;
       const response = await API.put('gNewsUser', path, {
           body: {
            // PRIMARY key is provided in request headers from Cognito ID
              userId: req.body.email,
              email: req.body.email,
              language: req.body.language,
              country: req.body.country, // RANGE key
              category: req.body.category
           }
       })

        response['HttpResponse'] = 'Success';
        console.log('response:::', response);
    
        return response;
   }

}

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
        console.log('postAsync.:::', req);
        return dispatch => post(req)
        .then(response => {
            console.log('asyncPost.response::', response);
            // if(type != null ) {
                dispatch({
                    type: req.type,
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