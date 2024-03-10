package com.bookmanagement.service;

import java.util.List;

import com.bookmanagement.model.Book;



public interface BookService {
	//List<Book> findBooksByUsername(String username);
	List<Book> findAllBooks();
	//Book getBook(String username,long id);
	Book findBookById(long id);
	void deleteBook(long id);
	
	Book saveBook(Book book);
}
