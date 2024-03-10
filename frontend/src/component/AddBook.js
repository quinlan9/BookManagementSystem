import React, { useState } from 'react'
import axios from 'axios';

const AddBook = (onBookAdded) => {
    const [newBook,setNewBook] = useState({
        bookTitle: '',
        author: '',
        description: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/books`, newBook);
            onBookAdded(); // 调用父组件的方法来重新获取书籍列表
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };






    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="bookTitle"
                placeholder="Title"
                value={newBook.bookTitle}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={newBook.description}
                onChange={handleInputChange}
            />
            <button type="submit">Add Book</button>
        </form>
    );
};
export default AddBook
