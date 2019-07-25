import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Nav, Article } from '../presentation';
import { Sidebar } from '../containers';
import actions from '../../actions';

class Topic extends Component {
    state = {
        usersCountryCode: '',
        articles: '',
        currentUser: ''
    };

    // handleClick = event => {
    //     console.log('Click');
    //     let data = {
    //         isItWorking: 'yes, it is working'
    //     };
        
    // }

    componentDidMount() {
        console.log('Topic.componentDidMount:::', this.props);

        // // make call for newsfeed items
        // this.props.getNews(this.props.userLocation);
    }


    async componentDidUpdate(prevProps) {
        // if component updates
        if(prevProps.currentUser != this.props.currentUser) {
            console.log('Topic.componentDidUpdate.currentUser', this.props.currentUser);
            this.setState({
                currentUser: this.props.currentUser
            });
        }
       
        if(prevProps.userLocation != this.props.userLocation) {
            console.log('this.props.userLocation', this.props.userLocation);
            // await this.getUserLocation();

            console.log('usersCountry.lenght', this.props.userLocation);
            
        }

        console.log('articles:::', this.props.newsapiResponse);
      }

      getUserLocation = async () => {
        console.log('Topic.componentDidUpdate.userLocation', this.props.userLocation);
        // this.setState({
        //     usersCountryCode: this.props.userLocation
        // });
      }
    

    render() {
          // desconstruct and assign class methods
          let { handleClick } = this;
          // deconstruct and assign props to be passed into the sidebar component
          let { sidebarTop, sidebarBottom, userLocation } = this.props;
          let articles = this.props.articles || [];
          // create childProps object to be passed into sidebar component
          const sidebarChildProps = {
              sidebarTop,
              sidebarBottom,
              handleClick
          };
          
          console.log('articles:::', articles);
          const articlesWithImgThumbnails = (articles !== undefined) ? articles.filter(article => article.urlToImage !== null || undefined || '' || NaN ) : null
        //   console.log('articlesWithThumbnails:::', typeof(articles));
        //   console.log('articlesWithThumbnails:::', typeof(articlesWithImgThumbnails));

        return(
            
                

                            

                            <div className="col">
                                <div className="card card-sm">
                                    <ul className="list-group list-group-flush">

                                    { 
                                        articlesWithImgThumbnails.map((article, i) => {
                                            let childProps = {
                                                url: article.url,
                                                title: article.title,
                                                urlToImage: article.urlToImage,
                                                description: article.description,
                                                publishedAt: article.publishedAt,
                                                source: article.source
                                            }

                                            return <Article 
                                                        key={i* Math.random()} 
                                                        userLocation={userLocation}
                                                        url={article.url} 
                                                        title={article.title}
                                                        urlToImage={article.urlToImage}
                                                        description={article.description}
                                                        publishedAt={article.publishedAt}
                                                        source={article.source.name}
                                                        author={article.author}
                                                        publishedAt={article.publishedAt}
                                                    />
                                        })

                                    }

                                    </ul>
                                </div>
                            </div>
                        
            
        );
    }
}



const stateToProps = state => {
    const { topLink, bottomLink } = state.sidebar;
    const { currentUser } = state.auth;
    const { newsapiResponse, articles } = state.newsfeed;
    const userLocation = state.userLocation;
  
    return {
      sidebarTop: topLink,
      sidebarBottom: bottomLink,
      userLocation: userLocation,
      newsapiResponse: newsapiResponse,
      articles: articles,
      currentUser: currentUser
    };
  };
  
  const dispatchToProps = dispatch => {
    return {
      getNews: (data) => dispatch(actions.actionGetNews(data))
    };
  };
  
  export default connect(stateToProps, dispatchToProps)(Topic);