import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { getApiData } from '../services/httpService';
import PostsLayout from '../common/layout';

class MyPosts extends Component {
    state = {
        posts: [],
        isData: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.getUserData();
        }, 2000);
    }

    getUserData = async () => {
        const { user } = this.props;
        let isData= true;
        try{
            const { data } = await getApiData(`api/profile/${user.pk}/`);
            if (!data){
                isData= false; 
            }
            this.setState({ posts: data, isData });
        } catch (ex){
            console.log(ex);
        }
    }
    render() {
        const { posts, isData } = this.state;
        if (!isData){
            return(
                <Fragment>
                    <MDBContainer style={{ marginTop: "5rem" }}>
                        <MDBRow>
                            <MDBCol md="12">
                                <p className="text-center">You have no posts</p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    {posts.length === 0 ? <div className="center"><div className="loader small"></div></div> : 
                    <MDBContainer style={{ marginTop: "5rem" }}>
                        <MDBRow>
                            <MDBCol md="12">
                                <p className="text-center">These are my posts</p>
                            </MDBCol>
                            <PostsLayout posts={posts} />
                        </MDBRow>
                    </MDBContainer>
                    }
                </Fragment>
            );
        }
    }
}

export default MyPosts;