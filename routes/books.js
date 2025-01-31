var express = require('express');
var router = express.Router();
const bookService = require("../services/bookService");

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
	  return next();
	}
	res.status(403).json({
	  status: "fail",
	  data: {
		statusCode: 403,
		result: "Unauthorized.",
	  },
	});
  };
  
  const ensureAdminAuthenticated = (req, res, next) => {
	if (req.isAuthenticated() && req.user.role == 'admin') {
	  return next();
	}
	res.status(403).json({
	  status: "fail",
	  data: {
		statusCode: 403,
		result: "Unauthorized",
	  },
	});
  };

router.get('/', async function (req, res, next) {
	// const animals = await animalService.getAll();
	let books = [
		{
			id: 1,
			borrowed: false,
			title: 'To Kill a Mockingbird',
			author: 'Harper Lee',
			genre: 'Fiction',
			year: 1960,
			publisher: 'HarperCollins',
			description: 'A classic novel about injustice in a small Southern town.',
			languages: ['English', 'French', 'Spanish'],
		},
		{
			id: 2,
			borrowed: true,
			title: '1984',
			author: 'George Orwell',
			genre: 'Dystopian',
			year: 1949,
			publisher: 'Signet Classics',
			description: 'A dystopian novel depicting a totalitarian society.',
			languages: ['English', 'German', 'Italian', 'Russian'],
		},
		{
			id: 3,
			borrowed: false,
			title: 'Pride and Prejudice',
			author: 'Jane Austen',
			genre: 'Romance',
			year: 1813,
			publisher: 'Penguin Classics',
			description: 'A classic novel exploring love, marriage, and social class.',
			languages: ['Chinese', 'English', 'French'],
		},
		{
			id: 4,
			borrowed: false,
			title: 'The Great Gatsby',
			author: 'F. Scott Fitzgerald',
			genre: 'Classic',
			year: 1925,
			publisher: 'Scribner',
			description: 'A story of wealth, love, and the American Dream in the Jazz Age.',
			languages: ['English', 'Japanese', 'Spanish'],
		},
		{
			id: 5,
			borrowed: false,
			title: 'One Hundred Years of Solitude',
			author: 'Gabriel Garcia Marquez',
			genre: 'Magical Realism',
			year: 1967,
			publisher: 'Harper Perennial',
			description: 'A landmark novel blending reality and fantasy in the fictional town of Macondo.',
			languages: ['English', 'Italian', 'Portuguese', 'Spanish'],
		},
		{
			id: 6,
			borrowed: true,
			title: 'The Catcher in the Rye',
			author: 'J.D. Salinger',
			genre: 'Coming-of-Age',
			year: 1951,
			publisher: 'Back Bay Books',
			description: 'A novel following the rebellious journey of a teenager in New York City.',
			languages: ['English', 'French', 'German', 'Spanish'],
		},
		{
			id: 7,
			borrowed: false,
			title: 'The Alchemist',
			author: 'Paulo Coelho',
			genre: 'Fiction',
			year: 1988,
			publisher: 'HarperOne',
			description: "A philosophical novel about a young shepherd's journey to find his personal legend.",
			languages: ['English', 'French', 'German', 'Portuguese', 'Spanish'],
		},
		{
			id: 8,
			borrowed: false,
			title: "Harry Potter and the Philosopher's Stone",
			author: 'J.K. Rowling',
			genre: 'Fantasy',
			year: 1997,
			publisher: 'Bloomsbury Publishing',
			description: 'The first book in the popular Harry Potter series about a young wizard.',
			languages: ['English', 'French', 'German', 'Italian', 'Spanish'],
		},
		{
			id: 9,
			borrowed: false,
			title: 'The Lord of the Rings',
			author: 'J.R.R. Tolkien',
			genre: 'Fantasy',
			year: 1954,
			publisher: 'Houghton Mifflin Harcourt',
			description: 'An epic high fantasy trilogy set in the world of Middle-earth.',
			languages: ['Chinese', 'English', 'French', 'German', 'Italian', 'Russian', 'Spanish'],
		},
		{
			id: 10,
			borrowed: false,
			title: 'Don Quixote',
			author: 'Miguel de Cervantes',
			genre: 'Satire',
			year: 1605,
			publisher: 'Harper Perennial',
			description: 'A comedic novel about a deluded knight and his adventures.',
			languages: ['English', 'French', 'German', 'Italian', 'Portuguese', 'Spanish'],
		},
		{
			id: 11,
			borrowed: false,
			title: 'Fantastic Beasts and Where to Find Them',
			author: 'J.K. Rowling',
			genre: 'Fantasy',
			year: 2001,
			publisher: 'Bloomsbury Publishing',
			description: 'A companion book to the Harry Potter series, catalouging magical creatures.',
			languages: ['English'],
		},
		{
			id: 12,
			borrowed: false,
			title: 'Quidditch Through the Ages',
			author: 'J.K. Rowling',
			genre: 'Fantasy',
			year: 2001,
			publisher: 'Bloomsbury Publishing',
			description: 'A companion book to the Harry Potter series, detailing the history of Quidditch.',
			languages: ['English'],
		},
		{
			id: 13,
			borrowed: false,
			title: 'The Little Prince',
			author: 'Antoine de Saint-Exupéry',
			genre: "Children's",
			year: 1943,
			publisher: 'Houghton Mifflin Harcourt',
			description: 'A poetic novella exploring the nature of friendship and love.',
			languages: ['English', 'French', 'German', 'Italian', 'Portuguese', 'Spanish'],
		},
		{
			id: 14,
			borrowed: true,
			title: 'The Tales of Beedle the Bard',
			author: 'J.K. Rowling',
			genre: 'Fantasy',
			year: 2008,
			publisher: 'Bloomsbury Publishing',
			description: 'A collection of wizarding fairy tales mentioned in the Harry Potter series.',
			languages: ['English'],
		},
	];

	res.render('books', { user: null, books: books });
});

// populate book table
router.post('/populate', bookService.populateBook);

router.post('/create', isAuthenticated, bookService.createBook);
router.put('/updateBook/:bookName', isAuthenticated, bookService.updateBook);
router.delete('/deleteBook/:bookName', bookService.deleteBook);

router.get('/fetchAll', bookService.fetchAllBook);
router.get('/borrowedBooks', bookService.borrowedBooks);
router.get('/borrowableBooks', bookService.borrowableBooks);
router.put('/borrowBook/:title', isAuthenticated, bookService.borrowBook);
router.put('/returnBook/:title', ensureAdminAuthenticated, bookService.returnBook);
router.get('/currentAge/:title', bookService.currentAge);

router.get('/allBooksByJKRowling', bookService.JKRowlingBooks);
router.get('/currentlyBorrowedBooks', bookService.currentlyBorrowedBooks);
router.get('/orderBooksByAge', bookService.orderAllBooksByAge);
// router.get('/multilingualBooks', bookService.multilingalBooks);
// router.get('/numbnerOfPortugeseBooks', authAdmin, bookService.numberOfPortugeseBooks);

module.exports = router;

