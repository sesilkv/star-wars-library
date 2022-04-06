// menggunakan State karena ini mini app, tidak perlu Context
import React, {useState} from "react";
import './main.css'
import Header from "./Components/Header/Header";
import SearchBar from "./Components/SearchBar/SearchBar";
import Result from "./Components/Result/Result";

const App = () => {

  const [movieList, setMovieList] = useState([])

  return (
    <div className="app_container">
      <Header />
      <SearchBar setMovieList={setMovieList}/>
      {/* meneruskan sebagai props */}
      <Result movieList={movieList}/> 
    </div>
  );
}

export default App;
