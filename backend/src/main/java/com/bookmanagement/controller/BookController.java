package com.bookmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmanagement.model.Book;
import com.bookmanagement.service.BookService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")  //define base url
public class BookController {
	
	private final BookService bookService;
	
	@Autowired
	public BookController(BookService bookService) {
		this.bookService=bookService;
	}
	
	//get all books
	
	@GetMapping
	public ResponseEntity<List<Book>> getAllBooks(){
		List<Book> books =bookService.findAllBooks();
		return new ResponseEntity<>(books,HttpStatus.OK);
	}
	
	//get book by id
	@GetMapping("/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable long id){
		Book book = bookService.findBookById(id);
		return new ResponseEntity<>(book,HttpStatus.OK);
	}
	
	//create new book
	@PostMapping
	public ResponseEntity<Book> createBook( @RequestBody Book book){
		Book newBook = bookService.saveBook(book);
		return new ResponseEntity<>(newBook,HttpStatus.OK);
	}
	
	//update book
	@PutMapping("/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable long id, @RequestBody Book book){
		book.setId(id);
		Book updatedBook=bookService.saveBook(book);
		return new ResponseEntity<>(updatedBook,HttpStatus.CREATED);
	}
	
	//delete book
	@DeleteMapping("/{id}")
	public ResponseEntity<Book> deleteBook(@PathVariable long id){
		bookService.deleteBook(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
