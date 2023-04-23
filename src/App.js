
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Recipies from './components/allBooks/Books';
import Recipe from './components/BookCard/Book';
import CreateRecipe from './components/CeateBook/createBook';
import PrivateRoute from './components/auth/PrivateRoute';
import CardDetails from './components/cardDetails/CardDerails';
import Edit from './components/edit/Edit';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/books" element={<PrivateRoute Child={Recipies}/>}/>
          <Route path="/recipie" element={<Recipe/>}/>
          <Route path="/upload" element={<CreateRecipe/>}/>
          <Route path="/cards/:id" element={<CardDetails/>} />
          <Route path="/edit/:_id" element={<PrivateRoute Child={Edit}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
