package com.bookmanagement.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookmanagement.model.Book;
import com.bookmanagement.repository.BookRepository;





@Service
public class BookServiceImpl implements BookService{

//Logger logger = LoggerFactory.getLogger(LessonServiceImpl.class);
	
    @Autowired 
    private BookRepository bookRepository;

   	@Override
   	@Transactional(readOnly = true)
	public List<Book> findAllBooks() {
   		//logger.trace("Entered getAlllessons method");
   		
   		List<Book> books = bookRepository.findAll();

		return books;
	}

	@Override
	@Transactional(readOnly = true)
	public Book findBookById(long id) {
		return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
	}

	@Override
	@Transactional
	public void deleteBook(long id) {
		Optional<Book> book = bookRepository.findById(id);
		if(book.isPresent()) {
			bookRepository.deleteById(id);
		} else {
			throw new RuntimeException("Book not found with id: " + id);
        }
		
	}

	@Override
	@Transactional
	public Book saveBook(Book book) {
		Book newbook = bookRepository.save(book);
		return newbook;
	}
	
}
