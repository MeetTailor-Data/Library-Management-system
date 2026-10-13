const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'library.db');

const db = new DatabaseSync(DB_FILE);

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'General',
      isbn TEXT NOT NULL UNIQUE,
      total_copies INTEGER NOT NULL DEFAULT 1,
      available_copies INTEGER NOT NULL DEFAULT 1,
      image TEXT DEFAULT '../assets/images/b1.jpg',
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS issued_books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      book_id INTEGER NOT NULL,
      book_title TEXT NOT NULL,
      isbn TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      due_date TEXT NOT NULL,
      return_date TEXT DEFAULT NULL,
      status TEXT NOT NULL DEFAULT 'Issued',
      fine REAL NOT NULL DEFAULT 0.00
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Unread',
      created_at TEXT NOT NULL
    );
  `);

  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    const insertUser = db.prepare('INSERT INTO users (user_id, name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)');
    insertUser.run('ADMIN01', 'System Librarian', 'admin@library.com', 'admin123', 'admin', '2026-01-01');
    insertUser.run('STU101', 'John Doe', 'john@example.com', 'student123', 'student', '2026-02-15');
    insertUser.run('STU102', 'Emily Clark', 'emily@example.com', 'student123', 'student', '2026-03-10');
    insertUser.run('STU103', 'David Miller', 'david@example.com', 'student123', 'student', '2026-04-05');
    insertUser.run('STU105', 'Meet Tailor', 'meet@example.com', 'meet2006', 'student', '2026-05-01');
  }

  const bookCount = db.prepare('SELECT COUNT(*) as count FROM books').get().count;
  if (bookCount === 0) {
    const insertBook = db.prepare(`
      INSERT INTO books (title, author, category, isbn, total_copies, available_copies, image, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const defaultBooks = [
      ["The Wealth of Nations", "Adam Smith", "Economics", "978-0140432084", 5, 4, "../assets/images/b9.jpg", "A foundational work of classical economics exploring division of labor, productivity, and free markets."],
      ["The World as I See It", "Albert Einstein", "Science", "978-0806527901", 4, 4, "../assets/images/b10.jpg", "Albert Einstein's personal reflections on physics, humanity, peace, and the universe."],
      ["Computer Networks & Systems", "Andrew S. Tanenbaum", "Technology", "978-0132126953", 4, 3, "../assets/images/b1.jpg", "Complete guide to modern networking principles, architecture, and protocols."],
      ["Clean Architecture & Code", "Robert C. Martin", "Technology", "978-0134494166", 3, 2, "../assets/images/b2.jpg", "A craftsman's guide to software structure, design patterns, and clean programming principles."],
      ["Brief History of Time", "Stephen Hawking", "Science", "978-0553380163", 6, 6, "../assets/images/b3.jpg", "An iconic exploration of space, black holes, time, and the origins of the cosmos."],
      ["To Kill a Mockingbird", "Harper Lee", "Literature", "978-0061120084", 5, 5, "../assets/images/b4.jpg", "Classic literary masterpiece exploring justice, empathy, and integrity in American history."],
      ["Sapiens: A Brief History", "Yuval Noah Harari", "History", "978-0062316097", 4, 4, "../assets/images/b5.jpg", "How humankind evolved from primitive foragers to masters of Planet Earth."],
      ["Principles of Economics", "N. Gregory Mankiw", "Economics", "978-1305585126", 3, 2, "../assets/images/b6.jpg", "Standard textbook on micro and macroeconomic principles and fiscal policies."],
      ["The Great Gatsby", "F. Scott Fitzgerald", "Literature", "978-0743273565", 4, 4, "../assets/images/b7.jpg", "A portrait of the Jazz Age, wealth, disillusionment, and the American dream."],
      ["Artificial Intelligence: A Modern Approach", "Stuart Russell & Peter Norvig", "Technology", "978-0136042594", 5, 5, "../assets/images/b8.jpg", "Comprehensive standard textbook covering algorithmic foundation of AI, ML, and search."]
    ];
    for (const b of defaultBooks) {
      insertBook.run(...b);
    }
  }

  const circCount = db.prepare('SELECT COUNT(*) as count FROM issued_books').get().count;
  if (circCount === 0) {
    const insertCirc = db.prepare(`
      INSERT INTO issued_books (user_id, student_name, book_id, book_title, isbn, issue_date, due_date, return_date, status, fine)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertCirc.run('STU101', 'John Doe', 1, 'The Wealth of Nations', '978-0140432084', '18/09/2026', '02/10/2026', null, 'Issued', 0);
    insertCirc.run('STU102', 'Emily Clark', 4, 'Clean Architecture & Code', '978-0134494166', '10/09/2026', '24/09/2026', null, 'Overdue', 40);
    insertCirc.run('STU103', 'David Miller', 7, 'Sapiens: A Brief History', '978-0062316097', '01/08/2026', '15/08/2026', '14/08/2026', 'Returned', 0);
  }
}

initDatabase();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {

        const params = new URLSearchParams(body);
        const obj = {};
        for (const [k, v] of params.entries()) { obj[k] = v; }
        resolve(obj);
      }
    });
  });
}

function sendJson(res, status, message, data = null, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  });
  res.end(JSON.stringify({ status, message, data }));
}

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    res.end();
    return;
  }

  if (pathname === '/api/health') {
    return sendJson(res, true, 'SQL Database is connected and active.', { driver: 'SQLite (node:sqlite)', port: PORT });
  }

  if (pathname === '/api/auth/login' || pathname === '/backend/auth.php' && urlObj.searchParams.get('action') === 'login') {
    if (method !== 'POST') return sendJson(res, false, 'Method not allowed', null, 405);
    const body = await parseBody(req);
    const userId = (body.user_id || body.userId || '').trim();
    const password = (body.password || '').trim();

    if (!userId || !password) {
      return sendJson(res, false, 'User ID and Password are required.', null, 400);
    }

    const user = db.prepare('SELECT * FROM users WHERE LOWER(user_id) = LOWER(?) OR LOWER(email) = LOWER(?)').get(userId, userId);
    if (!user || user.password !== password) {
      return sendJson(res, false, 'Invalid User ID or Password.', null, 401);
    }

    return sendJson(res, true, 'Login successful!', {
      id: user.id,
      user_id: user.user_id,
      studentId: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  }

  if (pathname === '/api/auth/signup' || pathname === '/backend/auth.php' && urlObj.searchParams.get('action') === 'signup') {
    if (method !== 'POST') return sendJson(res, false, 'Method not allowed', null, 405);
    const body = await parseBody(req);
    const name = (body.name || body.full_name || '').trim();
    const studentId = (body.studentId || body.student_id || body.user_id || '').trim().toUpperCase();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || 'student123').trim();

    if (!name || !studentId || !email) {
      return sendJson(res, false, 'Name, Student ID, and Email are required.', null, 400);
    }

    const existing = db.prepare('SELECT user_id, email FROM users WHERE LOWER(user_id) = LOWER(?) OR LOWER(email) = LOWER(?)').get(studentId, email);
    if (existing) {
      if (existing.user_id.toUpperCase() === studentId) {
        return sendJson(res, false, `Student ID '${studentId}' is already registered.`, null, 409);
      }
      return sendJson(res, false, `Email '${email}' is already registered.`, null, 409);
    }

    const now = new Date().toISOString().split('T')[0];
    const insert = db.prepare('INSERT INTO users (user_id, name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)');
    insert.run(studentId, name, email, password, 'student', now);

    return sendJson(res, true, 'Student registered successfully!', {
      studentId,
      user_id: studentId,
      name,
      email,
      role: 'student'
    });
  }

  if (pathname === '/api/books' && method === 'GET' || pathname === '/backend/books.php' && (urlObj.searchParams.get('action') === 'list' || !urlObj.searchParams.get('action'))) {
    const category = urlObj.searchParams.get('category') || '';
    const search = urlObj.searchParams.get('search') || '';

    let sql = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (category && category.toLowerCase() !== 'all') {
      sql += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }
    if (search) {
      sql += ' AND (LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(isbn) LIKE ?)';
      const s = `%${search.toLowerCase()}%`;
      params.push(s, s, s);
    }
    sql += ' ORDER BY id ASC';

    const books = db.prepare(sql).all(...params);
    return sendJson(res, true, 'Books loaded', books);
  }

  if (pathname === '/api/books' && method === 'POST' || pathname === '/backend/books.php' && urlObj.searchParams.get('action') === 'add') {
    const body = await parseBody(req);
    const title = (body.title || '').trim();
    const author = (body.author || '').trim();
    const category = (body.category || 'General').trim();
    const isbn = (body.isbn || '').trim();
    const copies = parseInt(body.totalCopies || body.copies || 1, 10);
    const description = (body.description || 'No description provided.').trim();
    const image = body.image || '../assets/images/b1.jpg';

    if (!title || !author || !isbn) {
      return sendJson(res, false, 'Title, Author, and ISBN are required.', null, 400);
    }

    const exists = db.prepare('SELECT id FROM books WHERE isbn = ?').get(isbn);
    if (exists) {
      return sendJson(res, false, `Book with ISBN '${isbn}' already exists.`, null, 409);
    }

    const insert = db.prepare(`
      INSERT INTO books (title, author, category, isbn, total_copies, available_copies, image, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insert.run(title, author, category, isbn, copies, copies, image, description);

    return sendJson(res, true, `Book '${title}' added to inventory.`, { isbn, title, author });
  }

  if (pathname === '/api/books' && method === 'DELETE' || pathname === '/backend/books.php' && urlObj.searchParams.get('action') === 'delete') {
    const body = await parseBody(req);
    const isbn = body.isbn || urlObj.searchParams.get('isbn');
    if (!isbn) return sendJson(res, false, 'ISBN is required.', null, 400);

    db.prepare('DELETE FROM books WHERE isbn = ?').run(isbn);
    return sendJson(res, true, 'Book deleted from inventory.');
  }

  if (pathname === '/api/circulation/issue' || pathname === '/backend/circulation.php' && urlObj.searchParams.get('action') === 'issue') {
    if (method !== 'POST') return sendJson(res, false, 'Method not allowed', null, 405);
    const body = await parseBody(req);
    const studentId = (body.studentId || body.student_id || '').trim().toUpperCase();
    const isbn = (body.isbn || '').trim();

    if (!studentId || !isbn) {
      return sendJson(res, false, 'Student ID and ISBN are required.', null, 400);
    }

    let student = db.prepare('SELECT * FROM users WHERE UPPER(user_id) = ?').get(studentId);
    if (!student) {

      const studentName = body.student_name || `Student ${studentId}`;
      const now = new Date().toISOString().split('T')[0];
      db.prepare('INSERT INTO users (user_id, name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)')
        .run(studentId, studentName, `${studentId.toLowerCase()}@library.edu`, 'student123', 'student', now);
      student = { user_id: studentId, name: studentName };
    }

    const activeBorrows = db.prepare('SELECT COUNT(*) as count FROM issued_books WHERE UPPER(user_id) = ? AND status != ?')
      .get(studentId, 'Returned').count;

    if (activeBorrows >= 3) {
      return sendJson(res, false, `Borrow limit reached: Student (${studentId}) already has 3 active borrowed books.`, null, 400);
    }

    const duplicate = db.prepare('SELECT id FROM issued_books WHERE UPPER(user_id) = ? AND isbn = ? AND status != ?')
      .get(studentId, isbn, 'Returned');
    if (duplicate) {
      return sendJson(res, false, `Student (${studentId}) already has an active issue of this book.`, null, 400);
    }

    const book = db.prepare('SELECT * FROM books WHERE isbn = ?').get(isbn);
    if (!book) {
      return sendJson(res, false, 'Book not found in library inventory.', null, 404);
    }
    if (book.available_copies <= 0) {
      return sendJson(res, false, `Sorry, "${book.title}" is currently out of stock (0 available).`, null, 400);
    }

    db.prepare('UPDATE books SET available_copies = available_copies - 1 WHERE id = ?').run(book.id);

    const issueDate = new Date().toLocaleDateString('en-GB');
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const dueDate = body.due_date || body.dueDate || d.toLocaleDateString('en-GB');

    const insertIssue = db.prepare(`
      INSERT INTO issued_books (user_id, student_name, book_id, book_title, isbn, issue_date, due_date, return_date, status, fine)
      VALUES (?, ?, ?, ?, ?, ?, ?, NULL, 'Issued', 0.00)
    `);
    insertIssue.run(studentId, student.name, book.id, book.title, book.isbn, issueDate, dueDate);

    return sendJson(res, true, `Book "${book.title}" successfully issued to ${student.name} (${studentId}). Due on ${dueDate}.`, {
      studentId,
      studentName: student.name,
      bookTitle: book.title,
      isbn: book.isbn,
      issueDate,
      dueDate,
      status: 'Issued'
    });
  }

  if (pathname === '/api/circulation/return' || pathname === '/backend/circulation.php' && urlObj.searchParams.get('action') === 'return') {
    if (method !== 'POST') return sendJson(res, false, 'Method not allowed', null, 405);
    const body = await parseBody(req);
    const issueId = parseInt(body.issue_id || body.issueId || body.id || 0, 10);

    const issue = db.prepare('SELECT * FROM issued_books WHERE id = ? AND status != ?').get(issueId, 'Returned');
    if (!issue) {
      return sendJson(res, false, 'Active circulation record not found.', null, 404);
    }

    const returnDate = new Date().toLocaleDateString('en-GB');
    db.prepare('UPDATE issued_books SET status = ?, return_date = ? WHERE id = ?').run('Returned', returnDate, issueId);
    db.prepare('UPDATE books SET available_copies = MIN(total_copies, available_copies + 1) WHERE id = ?').run(issue.book_id);

    return sendJson(res, true, `Book "${issue.book_title}" returned successfully. Inventory stock restored.`);
  }

  if (pathname === '/api/circulation/all' || pathname === '/backend/circulation.php' && urlObj.searchParams.get('action') === 'list_all') {
    const circs = db.prepare('SELECT * FROM issued_books ORDER BY id DESC').all();
    const formatted = circs.map(c => ({
      id: c.id,
      studentId: c.user_id,
      studentName: c.student_name,
      bookTitle: c.book_title,
      isbn: c.isbn,
      issueDate: c.issue_date,
      dueDate: c.due_date,
      returnDate: c.return_date,
      status: c.status,
      fine: c.fine
    }));
    return sendJson(res, true, 'All circulation records loaded', formatted);
  }

  if (pathname.startsWith('/api/circulation/student/') || pathname === '/backend/circulation.php' && urlObj.searchParams.get('action') === 'student_borrows') {
    const studentId = (pathname.split('/')[4] || urlObj.searchParams.get('student_id') || '').trim().toUpperCase();
    const records = db.prepare('SELECT * FROM issued_books WHERE UPPER(user_id) = ? ORDER BY id DESC').all(studentId);
    const formatted = records.map(c => ({
      id: c.id,
      studentId: c.user_id,
      studentName: c.student_name,
      bookTitle: c.book_title,
      isbn: c.isbn,
      issueDate: c.issue_date,
      dueDate: c.due_date,
      returnDate: c.return_date,
      status: c.status,
      fine: c.fine
    }));
    return sendJson(res, true, 'Student borrow history loaded', formatted);
  }

  if (pathname === '/api/admin/overview') {
    const books = db.prepare('SELECT total_copies, available_copies FROM books').all();
    const totalTitles = books.length;
    const totalCopies = books.reduce((acc, b) => acc + (b.total_copies || 0), 0);
    const issuedBooks = db.prepare("SELECT COUNT(*) as count FROM issued_books WHERE status != 'Returned'").get().count;
    const registeredStudents = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'").get().count;
    const overdueBooks = db.prepare("SELECT COUNT(*) as count FROM issued_books WHERE status = 'Overdue'").get().count;
    const recentCirculations = db.prepare('SELECT * FROM issued_books ORDER BY id DESC LIMIT 8').all().map(c => ({
      id: c.id,
      studentId: c.user_id,
      studentName: c.student_name,
      bookTitle: c.book_title,
      isbn: c.isbn,
      issueDate: c.issue_date,
      dueDate: c.due_date,
      returnDate: c.return_date,
      status: c.status,
      fine: c.fine
    }));

    return sendJson(res, true, 'Overview stats', {
      totalBooks: totalCopies,
      totalTitles,
      issuedBooks,
      registeredStudents,
      overdueBooks,
      recentCirculations
    });
  }

  if (pathname === '/api/users/students') {
    const students = db.prepare("SELECT id, user_id as studentId, name, email, role, created_at FROM users WHERE role = 'student' ORDER BY id DESC").all();
    return sendJson(res, true, 'Students loaded', students);
  }

  if (pathname === '/api/messages') {
    if (method === 'POST') {
      const body = await parseBody(req);
      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      const subject = (body.subject || '').trim();
      const message = (body.message || '').trim();
      const date = new Date().toLocaleDateString('en-GB');

      db.prepare('INSERT INTO messages (name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?)')
        .run(name, email, subject, message, 'Unread', date);
      return sendJson(res, true, 'Message received successfully.');
    } else {
      const msgs = db.prepare('SELECT * FROM messages ORDER BY id DESC').all();
      return sendJson(res, true, 'Messages loaded', msgs);
    }
  }

  let safePath = pathname === '/' ? '/Pages/index.html' : pathname;

  if (safePath.endsWith('.html') && !safePath.startsWith('/Pages/')) {
    const candidate = path.join(__dirname, 'Pages', safePath);
    if (fs.existsSync(candidate)) {
      safePath = '/Pages' + safePath;
    }
  }

  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Access Denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end(`File Not Found: ${pathname}`);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log('  🏛️  Smart Library Management System - SQL Server Running');
  console.log(`  🌐  Local URL:        http://localhost:${PORT}`);
  console.log(`  📁  Pages URL:        http://localhost:${PORT}/Pages/index.html`);
  console.log(`  🔑  Admin Dashboard:  http://localhost:${PORT}/Pages/admin-dashboard.html`);
  console.log(`  🎓  Student Portal:   http://localhost:${PORT}/Pages/student-dashboard.html`);
  console.log(`  💾  Database Engine:  Relational SQLite (library.db)`);
  console.log('================================================================');
});
