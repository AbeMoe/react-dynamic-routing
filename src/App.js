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

//This class is what creates and updates our routes orios
class Childs extends React.Component {
  state = {
    item: 'asdasdsd'
  }
  componentDidMount () {
    const { item } = this.props.location.state
    this.setState(() => ({ item }))
  }
  render() {


    return(<h1>{this.props.location.state.item.title}</h1>)
  }
}


export default App;
