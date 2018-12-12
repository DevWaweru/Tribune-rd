import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MDBCol, Card, CardBody, CardImage, CardTitle, CardText, Button } from 'mdbreact';

const PostsLayout = ({ posts }) => {
    return (
        <Fragment>
            {posts.map(post => (
                <MDBCol md="4" key={post.id} style={{ marginBottom: "1.5rem" }}>
                    <Card style={{ width: "22rem" }}>
                        <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/17.jpg" waves />
                        <CardBody>
                            <CardTitle>{post.title}</CardTitle>
                            <CardText>
                                {post.content}
                            </CardText>
                            <Link className="btn btn-unique Ripple-parent" to={`/post/${post.id}`}>View</Link>
                        </CardBody>
                    </Card>
                </MDBCol>
            ))}
        </Fragment>
    );
}

export default PostsLayout;