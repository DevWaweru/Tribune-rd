import React, { Component } from 'react';
import NavBar from './components/navBar';
import Routes from './routes';
import { getApiData } from './services/httpService';
import './App.css';

class App extends Component {
  state = {}
  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token){
      try{
        const { data } = await getApiData('rest-auth/user/');
        this.setState({ user: data });
      }catch (ex){
      }
    }
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <NavBar user={user} />
        <Routes user={user} />
      </React.Fragment>
    );
  }
}

export default App;
