import axios from "axios";
import React, {useState } from "react";
import "./css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Tempapp=()=>{
    // const [city,setCity]=useState(null)
    const [city,setCity]=useState("")
    const [country,setCountry]=useState("")
    const [temp,setTemp]=useState("")
    const [min,setMin]=useState(0)
    const [max,setMax]=useState(0)
    const [description,setDescription]=useState("")
    const [icon,setIcon]=useState("")
    const [showmyComponent ,setShowmycontent]=useState(false)

    const  url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=972cc58d055d3adda0155e35cd66458b`

  const getWeatherData= async(city)=>{
      await axios.get(url).then((res=>{
        const Data=res.data;
        setTemp(Data.main.temp) 
        setIcon(Data.weather[0].icon) 
        setDescription(Data.weather[0].description)  
        setMin(Data.main.temp_min)    
        setMax(Data.main.temp_max)
        setShowmycontent(true)
    })).catch(()=>{
        console.log("No such data found")
       
    })
  }

   return(
     <div className="container">
          <input type="text"
           value={city} 
           className="mx-1 p-1"
          onChange={(e)=>{setCity(e.target.value)}}
          placeholder="Enter City"
           />
           <input type="text"
           value={country} 
           className="mx-1 p-1"
          onChange={(e)=>{setCountry(e.target.value)}}
          placeholder="Enter Country"
           />

           <button 
           className="btn btn-primary"
           style={{backgroundColor:'#51456a',fontWeight:"bold" ,fontSize:20,border:0}}
           onClick={()=>getWeatherData(city)}>
            Get Weather
           </button>

           {showmyComponent ? (
               <div className="data_container p-4 my-5">
               <h1>{city},{country}</h1>
               <div className="my-2">
                <img src={` http://openweathermap.org/img/wn/${icon}@2x.png`} 
                alt="weather-icon" 
                style={{width:200,height:200}}
                />
               </div>
               {temp ?<h1>{temp}°K</h1>:null}
               <h4 className="my-4"><span>Min:{min}°K</span>
               <span className="mx-3"> | </span>
               <span>Max:{max}°K</span>
               </h4>
               <h1>{description}</h1>
               <h4 className="my-4">Date:{new Date().toLocaleDateString()}</h4>
            </div>
           ) :null }

         

          
     </div>
    )
}

export default Tempapp;