import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddBook from './AddBook';
import './BooksList.css';
const BooksList = () => {
    const [books,setBooks] = useState([]);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/api/books`);
            console.log(response.data);
            setBooks(response.data);
        }catch(error){
            console.error("Error fetching books:",error);
        }
    }

    useEffect(() => {
       fetchBooks();
    },[]);


    const deleteBook = async (id) => {
      try{
        await axios.delete(`http://localhost:8080/api/books/${id}`);
        const newBookList = books.filter (book =>book.id !==id);
        setBooks(newBookList);
      }catch(error){
        console.error("Error deleting book:",error);
      }
    }


  return (
    <div>
      <h2 style={{ color: '#FFFFFF' }}>Books List</h2>
      <div className='add-book-wrapper'>
        <AddBook onBookAdded={fetchBooks} /> {/*AddBook组件通过onBookAdded属性接收函数fetchBooks，当新书籍被成功添加后，这个函数会被调用以重新获取和显示更新后的书籍列表*/ }
      </div>
      <div className='card-table-container'> 
        <table  className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.bookTitle}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                  <td>
                  <button className="btn btn-primary" onClick={() => navigate(`/update/${book.id}`)}>Update</button>
                  </td>
                  <td>
                    <button className="btn btn-danger"onClick={()=>deleteBook(book.id)}>Delete</button>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksList
