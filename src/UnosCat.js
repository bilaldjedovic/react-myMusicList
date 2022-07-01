
import './Unos.css'
import { useNavigate } from 'react-router-dom';


const UnosCat = () => {
  const navigate = useNavigate();
 
  var novaCat = {
    categoryId: 0,
    categoryName: ""
  }



  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(novaCat);

    try {

      fetch('https://localhost:44321/api/Category/addCategory', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaCat)
      }).then(() => {
        console.log('Category added');
      })
    } catch (error) {
      console.log(error);
    } finally{navigate("/categories")}

  }


  return (
    <div className='inputFormaDiv'>
      <h3>Add category form:</h3>
      <form >
        <label>Category name:</label>
        <input
          required
          type="text"
          placeholder="Category"
          onChange={(e) => { novaCat.categoryName = e.target.value }} />
        <input type="submit" onClick={(e) => handleSubmit(e)} />
      </form>
      
      </div>
   

  )
}

export default UnosCat