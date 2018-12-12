import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, Button } from 'mdbreact';
import { getApiData, putApiData, deleteApiData } from '../services/httpService';
import EntryModal from './entryModal';

class Post extends Component {
    state = {
        post: {},
        modal8: false,
        user: { pk:'', title:'', content:'' }
    }
    async componentDidMount() {
        const postId = this.props.match.params.id;
        try {
            const { data } = await getApiData(`api/${postId}/`);
            this.setState({ post: data["0"] });
        } catch (error) {
            if(error.response && error.response.status === 404) this.props.history.replace('/not-found');            
        }        
        const user = this.props.user;
        this.setState({ user });
    }
    
    toggle = (nr) => {
        let modalNumber = 'modal' + nr
        this.setState({ [modalNumber]: !this.state[modalNumber] });
    }

    doSubmit = async(data)=>{
        const { user, match } = this.props;
        const fullPost = {...data, user:user.pk}
        console.log(fullPost);
                
        try {
            const { data } = await putApiData(`api/${match.params.id}/`, fullPost);
            this.setState({ post: data, modal8: !this.state.modal8 });
        } catch (ex) {
            
        }
    }
    doDelete = async () => {
        const { match } = this.props;
        try{
            const data = await deleteApiData(`api/${match.params.id}/`);
            this.props.history.push('/')
        }catch (ex){
            console.log(ex);
        }
    }
    render() {
        const { match } = this.props;
        const { post, modal8, user } = this.state;
        
        return (
            <React.Fragment>
                <EntryModal modal={modal8} toggle={() => this.toggle(8)} doSubmit={this.doSubmit} content={post}/>
                <MDBContainer style={{ marginTop: "5rem" }}>
                    {user.pk === post.user ? 
                        <React.Fragment>
                            <Button color="primary" onClick={() => this.toggle(8)} >Edit Post</Button>
                            <Button color="danger" onClick={this.doDelete} >Delete</Button>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <Button disabled color="primary" >Edit Post</Button>
                            <Button disabled color="danger" >Delete</Button>
                            <p className="small text-muted">Cannot manipulate because you are not the owner of post</p>
                        </React.Fragment>
                        }
                    <h2 className="text-center">Post {match.params.id}: {post.title} </h2>
                    <MDBRow>
                        <MDBCol md="8">
                            <p className="text-center">{post.content}</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default Post;