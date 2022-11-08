import React,{useState, useEffect} from 'react';
import './App.scss';
import './scss/main.scss';
import { Routes,Route } from 'react-router';
import List from './pages/home/List';
import Jobs from './pages/singlePage/Jobs';


const App = () => {
  const [jobList, setJobList] = useState();

  const request = async ()=> {
    const response = await fetch (`https://api.json-generator.com/templates/ZM1r0eic3XEy/data`,  {headers:{Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"}} );
    const data = await response.json();
    console.log(data);
    setJobList(data);
    
    }
    useEffect(() => {
        request();
    }, []);

   return (
        <Routes>
          <Route path="/" element={<List jobList={jobList}/>} />
          <Route path='/:id'  element={<Jobs jobList={jobList}/>} />
        </Routes>
  );
}

export default App;
