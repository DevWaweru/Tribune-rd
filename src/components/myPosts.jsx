import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { getApiData } from '../services/httpService';
import PostsLayout from '../common/layout';

class MyPosts extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        setTimeout(() => {
            this.getUserData();
        }, 2000);
    }
    getUserData = async () => {
        const { user } = this.props;
        try{
            const { data } = await getApiData(`api/profile/${user.pk}/`);
            console.log(data);
            this.setState({ posts: data });
        } catch (ex){
            console.log(ex);
        }
    }
    render() {
        const { posts } = this.state;
        
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

export default MyPosts;