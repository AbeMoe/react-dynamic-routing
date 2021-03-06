import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";



import axios from 'axios';
function App() {
  const [data, setData] = useState({ hits: [] });
  useEffect(() => {//Here we're grabbing data from our API
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux', //This could be your firebase api route
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <Router>
      {/*This creates our links to our routes,notice how all of our links are created from our fetchData function from earlier*/}
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <Link to={{pathname:'/'+item.objectID,state:{item:item}}}>{item.title}</Link>
          </li>
        ))}
      </ul>
      {/* This routes says "When the user requests a given path, display it with these props*/}
      <Switch>
        <Route path="/:id" render={props=>
          (<Childs {...props}/>)}/>       
      </Switch>
    </Router>
  );
}

//This class is what creates and updates our routes 
class Childs extends React.Component {
  state = {//We need to declare what our state contains and initalize it to a non-null answer or else react will crash
    item: 'asdasdsd'
  }
  //Once the component has mounted we hand it the prop
  //we generated in the Link component earlier.
  //That "state" part of the object we gave "LinK"
  //is stored in this.props.location.state.
  componentDidMount () {
    const { item } = this.props.location.state
    //Now, right here I opted to just use the object we already handed in
    //through the state parameter but in this componentDidMount block you are free
    //to try and make another axios call using the ID from earlier (that you see in the path)
    //to maybe run a GET on a user profile and then using set state to change what is displayed 
    this.setState(() => ({ item }))
  }
  render() {

    //just a plain simple render function
    return(<h1>{this.props.location.state.item.title}</h1>)
  }
}


export default App;
