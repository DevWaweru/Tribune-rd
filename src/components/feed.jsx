import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, Button } from 'mdbreact';
import { getApiData, postApiData } from '../services/httpService';
import EntryModal from './entryModal';
import PostsLayout from '../common/layout';

class Feed extends Component {
    state = {
        data: [],
        post: {title:'', content:''},
        modal8: false
    }
    async componentDidMount() {
        try{
            const { data } = await getApiData('api/');
            console.log(data);
            this.setState({ data});
        }catch (ex){
            
        }        
    }

    toggle = (nr) => {
        let modalNumber = 'modal' + nr
        this.setState({ [modalNumber]: !this.state[modalNumber] });
    }

    doSubmit = async (data) => {
        const { user } = this.props;
        const fullPost = {...data, user:user.pk}
        console.log(fullPost);
                
        try {
            const { data } = await postApiData('api/', fullPost);
            const allPost = [data, ...this.state.data];
            this.setState({ data: allPost, modal8: !this.state.modal8 });
        } catch (ex) {
            
        }
    }
    render() {
        const { data, modal8, post } = this.state;
        console.log(data);
        return (
            <Fragment>
                {data.length === 0 ? <div className="center"><div className="loader small"></div></div> :
                <Fragment>
                    <EntryModal modal={modal8} toggle={() => this.toggle(8)} doSubmit={this.doSubmit} content={post}/>
                    <MDBContainer style={{ marginTop: "5rem" }}>
                        <MDBRow >
                            <MDBCol md="12">
                                <h2 className="text-center">Articles</h2>
                                <Button color="primary" onClick={() => this.toggle(8)} >Create Post</Button>
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

export default Feed;