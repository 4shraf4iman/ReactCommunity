
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { BiGitRepoForked } from 'react-icons/bi';
import { MdPreview } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from '@mui/material';
import { Navbar } from 'react-bootstrap';


const styles = {
  display:'inline',
  width:'150%',
  height:150,
  float:'left',
  padding:5,
  border:'0.5px solid black',
  marginBottom:10,
  marginRight:10,

  }

function App() {
const [allData,setAllData] = useState([]);
const [filteredData,setFilteredData] = useState(allData);

const handleSearch = (event) => {
let value = event.target.value.toLowerCase();
let result = [];
console.log(value);
result = allData.filter((repos) => {
return repos.name.search(value) !== -1;
});
setFilteredData(result);
}

useEffect(() => {
  axios('https://api.github.com/users/reactjs/repos')
  .then(response => {
    console.log(response.data)
   setAllData(response.data);
   setFilteredData(response.data);
  })
   .catch(error => {
   console.log('Error getting data: ' + error);
   })
   }, [])


  return (

    
    <div className="App">
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>ReactJS Community</Navbar.Brand> 
    </Container>
  </Navbar>
    <div style={{ margin: '0 auto', marginTop: '5%' }}>
    <label>Search Any ReactJS Repository Below : </label><br/><br/>
  

    <input type="text" onChange={(event) =>handleSearch(event)} placeholder="type repository ..."/>
    </div> 
  
    <div style={{padding:10}}>
    {filteredData.map((repos,index)=>{
    return(
      
      <div className="post">
  
      <div className="bg-light border" style={styles} key={repos.index}>
      <a href={repos.html_url}>{repos.name}</a><br/>
      " {repos.description}"<br/><br/>
      <BiGitRepoForked data-tip="Forked"/ >{repos.forks_count}  <span/>
      <MdPreview data-tip="Watchers" />{repos.watchers_count}  <span/>
      <AiFillStar data-tip="Star Gazers" />{repos.stargazers_count}  <br/><span/>
     Language : {repos.language}
     
      </div>
      </div>
      
    )
    })
    }
    
    </div>
    </div>
      
  );
}

export default App;
