import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, Button } from 'mdbreact';
import { getApiData, postApiData } from '../services/httpService';
import EntryModal from './entryModal';
import PostsLayout from '../common/layout';

class Feed extends Component {
    state = {
        data: [],
        post: {title:'', content:''},
        modal8: false,
        isData: true
    }
    async componentDidMount() {
        let isData= true;
        try{
            const { data } = await getApiData('api/');
            console.log(data);
            if (data.length===0){
                isData= false; 
            }
            this.setState({ data, isData });
        }catch (ex){
            
        }        
    }

    toggle = (nr) => {
        let modalNumber = 'modal' + nr
        this.setState({ [modalNumber]: !this.state[modalNumber] });
    }

    doSubmit = async (data) => {
        const { user } = this.props;
        const fullPost = {...data, user:user.pk};
        let { isData } = this.state;
        if (!isData){
            isData = true;
        }
                
        try {
            const { data } = await postApiData('api/', fullPost);
            const allPost = [data, ...this.state.data];
            this.setState({ data: allPost, modal8: !this.state.modal8, isData });
        } catch (ex) {
            
        }
    }
    render() {
        const { data, modal8, post, isData } = this.state;
        const { user } = this.props;
        
        if (!isData){
            return(
                <Fragment>
                    <EntryModal modal={modal8} toggle={() => this.toggle(8)} doSubmit={this.doSubmit} content={post}/>
                    <MDBContainer style={{ marginTop: "5rem" }}>
                        <MDBRow>
                            <MDBCol md="12">
                                <p className="text-center">No Posts Yet. Create post by clicking the button below</p>
                                {user && <Button color="primary" onClick={() => this.toggle(8)} >Create Post</Button>}
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    {data.length === 0 ? <div className="center"><div className="loader small"></div></div> :
                    <Fragment>
                        <EntryModal modal={modal8} toggle={() => this.toggle(8)} doSubmit={this.doSubmit} content={post}/>
                        <MDBContainer style={{ marginTop: "5rem" }}>
                            <MDBRow>
                                <MDBCol md="12">
                                    <h2 className="text-center">Articles</h2>
                                    {user && <Button color="primary" onClick={() => this.toggle(8)} >Create Post</Button>}
                                    {!user && <p className="text-center">Sign in to Add and view articles</p> }
                                </MDBCol>
                                <PostsLayout posts={data} />
                            </MDBRow>
                        </MDBContainer>
                    </Fragment>
                }
                </Fragment>
            );
        }
    }
}

export default Feed;