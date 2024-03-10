import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBook = () => {
  const { id } = useParams(); //get id of the book from url
  const navigate = useNavigate();
  const [book, setBook] =useState({
    bookTitle:'',
    author:'',
    description:''
  });
  
  
  useEffect(() => {
    const fetchBookDetails = async () => {
        try{
            const response = await axios.get(`http:localhost:8080/api/books/${id}`);
            setBook(response.data);
        }catch(error){
            console.log(error);
        }
    };
    fetchBookDetails();
  },[id]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, book);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="bookTitle" value={book.bookTitle} onChange={handleChange} />
      <label>Author</label>
      <input type="text" name="author" value={book.author} onChange={handleChange} />
      <label>Description</label>
      <input type="text" name="description" value={book.description} onChange={handleChange} />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBook
