import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Card = () => {

const [latest,setLatest]=useState([]);

const [result,setResults]=useState([]);

const [searchcountry,setSearchCountry]=useState("");




useEffect(() => {
    axios.all([axios.get("https://corona.lmao.ninja/v2/all"),
    axios.get("https://corona.lmao.ninja/v2/countries")])
    .then(responseArr=>{
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })
}, [])


const FilterCountry=result.filter(item=>{
    return searchcountry!== ""? item.country.toLowerCase().includes(searchcountry.toLowerCase()) : item ;
})


const date=new Date(parseInt(latest.updated));
const lastupdated=date.toString();



const countries=FilterCountry.map(data=>{
    return(
        <div className="col-md-4 mx-auto">
        <div className="card desh text-white bg-dark mb-3 mt-5  text-center" >
  
        <div class="card-body">
        <img src={data.countryInfo.flag} alt="country-img" />
          <h4 class="card-title">{data.country}</h4>
          <p class="card-text1 mt-5">Active- {data.cases}</p>
          <p class="card-text1 mt-2">Deaths- {data.deaths}</p>
          <p class="card-text1 mt-2">Recovered- {data.recovered}</p>
          <p class="card-text1 mt-2">Today's deaths- {data.todayDeaths}</p>
        </div>
        <hr />
        <footer className="text-center">Last updated {lastupdated}</footer>
      </div>
      </div>

    )
})

    return (
        <div>

<div className="row">
            
            <div className="col-md-4 mx-auto">
            <div class="card text-dark bg-secondary mb-3 mt-5 text-white text-center" >
  
  <div class="card-body">
    <h4 class="card-title">Active</h4>
    <p class="card-text mt-4">{latest.cases}</p>
  </div>
  <hr />
  <footer className="text-center">Last updated {lastupdated}</footer>
</div>

</div>

<div className="col-md-4 mx-auto">
            <div class="card text-dark bg-danger mb-3 mt-5 text-white text-center" >
  
  <div class="card-body">
    <h4 class="card-title">Deaths</h4>
    <p class="card-text mt-4">{latest.deaths}</p>
  </div>
  <hr />
  <footer className="text-center">Last updated {lastupdated}</footer>
</div>

</div>

<div className="col-md-4 mx-auto">
            <div class="card text-dark bg-success mb-3 mt-5 text-white text-center" >
  
  <div class="card-body">
    <h4 class="card-title">Recovered</h4>
    <p class="card-text mt-4">{latest.recovered}</p>
  </div>
  <hr />
  <footer className="text-center">Last updated {lastupdated}</footer>
</div>
</div>
 <hr className="mt-3" />

 <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Search</label>
  <input type="text" onChange={e=>setSearchCountry(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Search for a country"/>
</div>



<div className="row mt-10">

         {countries}

</div>
</div>


</div>











        
    )
}

export default Card;
