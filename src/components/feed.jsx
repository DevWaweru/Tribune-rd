import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import { getApiData, postApiData } from '../services/httpService';

class Feed extends Component {
    state = {
        data: [],
        post: {title:'React Article', content:'React is the UI to use'}
    }
    async componentDidMount() {
        try{
            const { data } = await getApiData('api/');
            console.log(data);
            this.setState({ data});
        }catch (ex){
            
        }        
    }
    doSubmit = async () => {
        const { user } = this.props;
        const { post } = this.state;
        const fullPost = {...post, user:user.pk}
        console.log(fullPost);
                
        try {
            const { data } = await postApiData('api/', fullPost);
            const allPost = [data, ...this.state.data];
            this.setState({ data: allPost });
        } catch (ex) {
            
        }
    }
    render() {
        const { data } = this.state;
        return (
            <React.Fragment>
                <MDBContainer style={{ marginTop: "5rem" }}>
                    <MDBRow >
                        <MDBCol md="12">
                            <h2 className="text-center">Articles</h2>
                            <Button onClick={this.doSubmit} >Post</Button>
                        </MDBCol>
                        {data.map(post => (
                        <MDBCol md="4" key={post.id} style={{ marginBottom: "1.5rem" }}>
                            <Card style={{ width: "22rem" }}>
                                <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                                <CardBody>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardText>
                                    {post.content}
                                    </CardText>
                                    <Button>View</Button>
                                </CardBody>
                            </Card>
                        </MDBCol>
                        ))}
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default Feed;