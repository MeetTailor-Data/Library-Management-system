(function(window) {
  'use strict';

  const STORAGE_KEYS = {
    BOOKS: 'slms_db_books',
    USERS: 'slms_db_users',
    CIRCULATIONS: 'slms_db_circulations',
    MESSAGES: 'slms_db_messages'
  };

  const DEFAULT_BOOKS = [
    {
      id: 1,
      title: "The Wealth of Nations",
      author: "Adam Smith",
      category: "Economics",
      isbn: "978-0140432084",
      totalCopies: 5,
      availableCopies: 4,
      image: "../assets/images/b9.jpg",
      description: "A foundational work of classical economics exploring division of labor, productivity, and free markets."
    },
    {
      id: 2,
      title: "The World as I See It",
      author: "Albert Einstein",
      category: "Science",
      isbn: "978-0806527901",
      totalCopies: 4,
      availableCopies: 4,
      image: "../assets/images/b10.jpg",
      description: "Albert Einstein's personal reflections on physics, humanity, peace, and the universe."
    },
    {
      id: 3,
      title: "Computer Networks & Systems",
      author: "Andrew S. Tanenbaum",
      category: "Technology",
      isbn: "978-0132126953",
      totalCopies: 4,
      availableCopies: 3,
      image: "../assets/images/b1.jpg",
      description: "Complete guide to modern networking principles, architecture, and protocols."
    },
    {
      id: 4,
      title: "Clean Architecture & Code",
      author: "Robert C. Martin",
      category: "Technology",
      isbn: "978-0134494166",
      totalCopies: 3,
      availableCopies: 2,
      image: "../assets/images/b2.jpg",
      description: "A craftsman's guide to software structure, design patterns, and clean programming principles."
    },
    {
      id: 5,
      title: "Brief History of Time",
      author: "Stephen Hawking",
      category: "Science",
      isbn: "978-0553380163",
      totalCopies: 6,
      availableCopies: 6,
      image: "../assets/images/b3.jpg",
      description: "An iconic exploration of space, black holes, time, and the origins of the cosmos."
    },
    {
      id: 6,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Literature",
      isbn: "978-0061120084",
      totalCopies: 5,
      availableCopies: 5,
      image: "../assets/images/b4.jpg",
      description: "Classic literary masterpiece exploring justice, empathy, and integrity in American history."
    },
    {
      id: 7,
      title: "Sapiens: A Brief History",
      author: "Yuval Noah Harari",
      category: "History",
      isbn: "978-0062316097",
      totalCopies: 4,
      availableCopies: 4,
      image: "../assets/images/b5.jpg",
      description: "How humankind evolved from primitive foragers to masters of Planet Earth."
    },
    {
      id: 8,
      title: "Principles of Economics",
      author: "N. Gregory Mankiw",
      category: "Economics",
      isbn: "978-1305585126",
      totalCopies: 3,
      availableCopies: 2,
      image: "../assets/images/b6.jpg",
      description: "Standard textbook on micro and macroeconomic principles and fiscal policies."
    },
    {
      id: 9,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Literature",
      isbn: "978-0743273565",
      totalCopies: 4,
      availableCopies: 4,
      image: "../assets/images/b7.jpg",
      description: "A portrait of the Jazz Age, wealth, disillusionment, and the American dream."
    },
    {
      id: 10,
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell & Peter Norvig",
      category: "Technology",
      isbn: "978-0136042594",
      totalCopies: 5,
      availableCopies: 5,
      image: "../assets/images/b8.jpg",
      description: "Comprehensive standard textbook covering algorithmic foundation of AI, ML, and search."
    }
  ];

  const DEFAULT_USERS = [
    {
      id: 1,
      studentId: "ADMIN01",
      name: "System Librarian",
      email: "admin@library.com",
      password: "admin",
      role: "admin",
      department: "Administration",
      year: "Staff",
      phone: "+91 9876500000",
      status: "Active"
    },
    {
      id: 2,
      studentId: "STU101",
      name: "John Doe",
      email: "john@example.com",
      password: "student123",
      role: "student",
      department: "Computer Science",
      year: "3rd Year",
      phone: "+91 9876511111",
      status: "Active"
    },
    {
      id: 3,
      studentId: "STU102",
      name: "Emily Clark",
      email: "emily@example.com",
      password: "student123",
      role: "student",
      department: "Information Technology",
      year: "2nd Year",
      phone: "+91 9876522222",
      status: "Active"
    },
    {
      id: 4,
      studentId: "STU103",
      name: "David Miller",
      email: "david@example.com",
      password: "student123",
      role: "student",
      department: "Mechanical Engg.",
      year: "4th Year",
      phone: "+91 9876533333",
      status: "Active"
    },
    {
      id: 5,
      studentId: "STU104",
      name: "Ananya Verma",
      email: "ananya@example.com",
      password: "student123",
      role: "student",
      department: "Economics",
      year: "1st Year",
      phone: "+91 9876544444",
      status: "Active"
    },
    {
      id: 6,
      studentId: "STU105",
      name: "Meet Tailor",
      email: "meet@example.com",
      password: "meet2006",
      role: "student",
      department: "Computer Science & Engg",
      year: "Final Year",
      phone: "+91 9876555555",
      status: "Active"
    }
  ];

  const DEFAULT_CIRCULATIONS = [
    {
      id: 1,
      studentId: "STU101",
      studentName: "John Doe",
      bookTitle: "The Wealth of Nations",
      isbn: "978-0140432084",
      issueDate: "18/09/2026",
      dueDate: "02/10/2026",
      returnDate: null,
      status: "Issued",
      fine: 0
    },
    {
      id: 2,
      studentId: "STU102",
      studentName: "Emily Clark",
      bookTitle: "Clean Architecture & Code",
      isbn: "978-0134494166",
      issueDate: "10/09/2026",
      dueDate: "24/09/2026",
      returnDate: null,
      status: "Overdue",
      fine: 40
    },
    {
      id: 3,
      studentId: "STU103",
      studentName: "David Miller",
      bookTitle: "Sapiens: A Brief History",
      isbn: "978-0062316097",
      issueDate: "01/08/2026",
      dueDate: "15/08/2026",
      returnDate: "14/08/2026",
      status: "Returned",
      fine: 0
    },
    {
      id: 4,
      studentId: "STU105",
      studentName: "Meet Tailor",
      bookTitle: "The Wealth of Nations",
      isbn: "978-0140432084",
      issueDate: "10/08/2026",
      dueDate: "24/08/2026",
      returnDate: "22/08/2026",
      status: "Returned",
      fine: 0
    },
    {
      id: 5,
      studentId: "STU105",
      studentName: "Meet Tailor",
      bookTitle: "Clean Architecture & Code",
      isbn: "978-0134494166",
      issueDate: "15/08/2026",
      dueDate: "29/08/2026",
      returnDate: "28/08/2026",
      status: "Returned",
      fine: 0
    },
    {
      id: 6,
      studentId: "STU105",
      studentName: "Meet Tailor",
      bookTitle: "Brief History of Time",
      isbn: "978-0553380163",
      issueDate: "01/09/2026",
      dueDate: "15/09/2026",
      returnDate: "14/09/2026",
      status: "Returned",
      fine: 0
    },
    {
      id: 7,
      studentId: "STU105",
      studentName: "Meet Tailor",
      bookTitle: "To Kill a Mockingbird",
      isbn: "978-0061120084",
      issueDate: "05/09/2026",
      dueDate: "19/09/2026",
      returnDate: "18/09/2026",
      status: "Returned",
      fine: 0
    },
    {
      id: 8,
      studentId: "STU105",
      studentName: "Meet Tailor",
      bookTitle: "Artificial Intelligence: A Modern Approach",
      isbn: "978-0136042594",
      issueDate: "12/09/2026",
      dueDate: "26/09/2026",
      returnDate: "25/09/2026",
      status: "Returned",
      fine: 0
    }
  ];

  const DEFAULT_MESSAGES = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      subject: "Book Request: Data Structures",
      message: "Can you please add more copies of Data Structures in the library catalog?",
      date: "28/09/2026",
      status: "Unread"
    },
    {
      id: 2,
      name: "Ananya Patel",
      email: "ananya@gmail.com",
      subject: "Membership Card Inquiry",
      message: "Hi, I want to know how I can renew my semester membership card online.",
      date: "30/09/2026",
      status: "Replied"
    }
  ];

  function getBackendPath(scriptName, queryParams = '') {
    const isPages = window.location.pathname.includes('/Pages');
    const base = isPages ? '../backend/' : 'backend/';
    const q = queryParams ? (queryParams.startsWith('?') ? queryParams : '?' + queryParams) : '';
    return `${base}${scriptName}${q}`;
  }

  async function apiFetch(endpointKey, options = {}) {
    const phpMap = {
      health: getBackendPath('auth.php', 'action=health'),
      auth_login: getBackendPath('auth.php', 'action=login'),
      auth_signup: getBackendPath('auth.php', 'action=signup'),
      students_list: getBackendPath('auth.php', 'action=list_students'),
      students_add: getBackendPath('auth.php', 'action=signup'),
      students_delete: getBackendPath('auth.php', 'action=delete_student'),
      books_list: getBackendPath('books.php', 'action=list'),
      books_add: getBackendPath('books.php', 'action=add'),
      books_edit: getBackendPath('books.php', 'action=edit'),
      books_delete: getBackendPath('books.php', 'action=delete'),
      circ_list: getBackendPath('circulation.php', 'action=list_all'),
      circ_issue: getBackendPath('circulation.php', 'action=issue'),
      circ_return: getBackendPath('circulation.php', 'action=return'),
      messages_list: getBackendPath('contact.php', 'action=list'),
      messages_add: getBackendPath('contact.php', 'action=submit'),
      messages_reply: getBackendPath('contact.php', 'action=reply'),
      messages_delete: getBackendPath('contact.php', 'action=delete')
    };

    const url = phpMap[endpointKey];
    if (!url) return null;

    const mergedOptions = {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    try {
      const res = await fetch(url, mergedOptions);
      return res;
    } catch (e) {
      console.warn('[SLMS Store] PHP Backend fetch error:', url, e);
      return null;
    }
  }

  function initStore() {
    if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(DEFAULT_BOOKS));
    }

    let users = getRaw(STORAGE_KEYS.USERS, []);
    if (!users || users.length === 0) {
      users = DEFAULT_USERS;
    } else {
      DEFAULT_USERS.forEach(defUser => {
        const idx = users.findIndex(u => (u.studentId && u.studentId.toUpperCase() === defUser.studentId.toUpperCase()) || (u.id === defUser.id));
        if (idx === -1) {
          users.push(defUser);
        } else {
          if (!users[idx].name || users[idx].name.toLowerCase().startsWith('student stu') || users[idx].name.toUpperCase() === defUser.studentId.toUpperCase()) {
            users[idx].name = defUser.name;
          }
          if (!users[idx].password) {
            users[idx].password = defUser.password;
          }
        }
      });
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    let circs = getRaw(STORAGE_KEYS.CIRCULATIONS, []);
    if (!circs || circs.length === 0) {
      circs = DEFAULT_CIRCULATIONS;
    } else {
      DEFAULT_CIRCULATIONS.forEach(defCirc => {
        const exists = circs.some(c => c.id === defCirc.id || (c.studentId === defCirc.studentId && c.isbn === defCirc.isbn && c.status === defCirc.status));
        if (!exists) {
          circs.push(defCirc);
        }
      });
    }
    localStorage.setItem(STORAGE_KEYS.CIRCULATIONS, JSON.stringify(circs));

    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
    }

    syncWithBackend();
    if (!window._slms_sync_interval) {
      window._slms_sync_interval = setInterval(syncWithBackend, 3500);
    }
  }

  async function syncWithBackend() {
    try {
      const res = await apiFetch('health');
      if (!res || !res.ok) return;
      SLMS_STORE.isSqlConnected = true;

      const bRes = await apiFetch('books_list');
      if (bRes && bRes.ok) {
        const bData = await bRes.json();
        if (bData.status && Array.isArray(bData.data) && bData.data.length > 0) {
          const mappedBooks = bData.data.map(b => ({
            id: b.id,
            title: b.title,
            author: b.author,
            category: b.category,
            isbn: b.isbn,
            totalCopies: b.total_copies ?? b.totalCopies ?? 1,
            availableCopies: b.available_copies ?? b.availableCopies ?? 1,
            image: b.image ? (b.image.startsWith('../') || b.image.startsWith('http') ? b.image : '../assets/images/' + b.image) : '../assets/images/b1.jpg',
            description: b.description || ''
          }));
          localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(mappedBooks));
        }
      }

      const cRes = await apiFetch('circ_list');
      if (cRes && cRes.ok) {
        const cData = await cRes.json();
        if (cData.status && Array.isArray(cData.data)) {
          const mappedCircs = cData.data.map(c => ({
            id: c.id,
            studentId: c.studentId || c.user_id,
            studentName: c.studentName || c.student_name,
            bookTitle: c.bookTitle || c.book_title,
            isbn: c.isbn,
            issueDate: c.issueDate || (c.issue_date ? new Date(c.issue_date).toLocaleDateString('en-GB') : ''),
            dueDate: c.dueDate || (c.due_date ? new Date(c.due_date).toLocaleDateString('en-GB') : ''),
            returnDate: c.returnDate || (c.return_date ? new Date(c.return_date).toLocaleDateString('en-GB') : null),
            status: c.status,
            fine: parseFloat(c.fine || 0)
          }));
          localStorage.setItem(STORAGE_KEYS.CIRCULATIONS, JSON.stringify(mappedCircs));
        }
      }

      const uRes = await apiFetch('students_list');
      if (uRes && uRes.ok) {
        const uData = await uRes.json();
        if (uData.status && Array.isArray(uData.data)) {
          let currentUsers = getRaw(STORAGE_KEYS.USERS, DEFAULT_USERS);
          const dbStudentIds = new Set(uData.data.map(dbStu => (dbStu.studentId || dbStu.user_id || '').toUpperCase()));

          // 1. Authoritative sync: Prune students not in the database response (keeps admin)
          currentUsers = currentUsers.filter(u => {
            const sid = (u.studentId || u.user_id || '').toUpperCase();
            if (u.role === 'admin' || sid === 'ADMIN01') return true;
            return dbStudentIds.has(sid);
          });

          // 2. Insert or update students returned by the database
          uData.data.forEach(dbStu => {
            const sid = (dbStu.studentId || dbStu.user_id || '').toUpperCase();
            const idx = currentUsers.findIndex(u => (u.studentId && u.studentId.toUpperCase() === sid) || (u.user_id && u.user_id.toUpperCase() === sid));
            const dept = dbStu.department || (idx !== -1 && currentUsers[idx].department ? currentUsers[idx].department : 'Computer Science');
            const yr = dbStu.year || (idx !== -1 && currentUsers[idx].year ? currentUsers[idx].year : '1st Year');
            if (idx === -1) {
              currentUsers.push({
                id: dbStu.id,
                studentId: sid,
                user_id: sid,
                name: dbStu.name,
                email: dbStu.email,
                department: dept,
                year: yr,
                role: 'student',
                status: 'Active'
              });
            } else {
              currentUsers[idx].name = dbStu.name;
              currentUsers[idx].email = dbStu.email;
              currentUsers[idx].department = dept;
              currentUsers[idx].year = yr;
            }
          });
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(currentUsers));
        }
      }

      const mRes = await apiFetch('messages_list');
      if (mRes && mRes.ok) {
        const mData = await mRes.json();
        if (mData.status && Array.isArray(mData.data)) {
          const mappedMsgs = mData.data.map(m => ({
            id: m.id,
            name: m.name,
            email: m.email,
            subject: m.subject || 'General Inquiry',
            message: m.message,
            date: m.date || m.created_at || new Date().toLocaleDateString('en-GB'),
            created_at: m.created_at || m.date,
            status: m.status || 'Unread'
          }));
          localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mappedMsgs));
        }
      }

      notifyChange();
    } catch (e) {
      SLMS_STORE.isSqlConnected = false;
    }
  }

  function notifyChange() {
    window.dispatchEvent(new CustomEvent('slms_data_changed'));
  }

  function getRaw(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setRaw(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    notifyChange();
  }

  const SLMS_STORE = {
    isSqlConnected: false,
    syncNow: syncWithBackend,
    init: initStore,

    getBooks() {
      return getRaw(STORAGE_KEYS.BOOKS, DEFAULT_BOOKS);
    },

    getBookByIsbn(isbn) {
      const books = this.getBooks();
      return books.find(b => b.isbn === isbn);
    },

    addBook(bookData) {
      const books = this.getBooks();
      const newId = books.length > 0 ? Math.max(...books.map(b => b.id || 0)) + 1 : 1;
      const newBook = {
        id: newId,
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        category: bookData.category || 'General',
        isbn: bookData.isbn.trim(),
        totalCopies: parseInt(bookData.totalCopies || 1, 10),
        availableCopies: parseInt(bookData.availableCopies || bookData.totalCopies || 1, 10),
        image: bookData.image || '../assets/images/b1.jpg',
        description: bookData.description || 'No description provided.'
      };
      books.unshift(newBook);
      setRaw(STORAGE_KEYS.BOOKS, books);

      apiFetch('books_add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      }).then(() => syncWithBackend()).catch(() => {});

      return newBook;
    },

    updateBookQuantity(isbn, newTotalCopies) {
      const books = this.getBooks();
      const idx = books.findIndex(b => b.isbn === isbn);
      if (idx === -1) {
        return { success: false, message: 'Book not found in inventory.' };
      }

      const book = books[idx];
      const curTotal = parseInt(book.totalCopies, 10) || 0;
      const curAvail = parseInt(book.availableCopies, 10) || 0;
      const currentlyIssued = Math.max(0, curTotal - curAvail);

      const targetTotal = parseInt(newTotalCopies, 10);
      if (isNaN(targetTotal) || targetTotal < 0) {
        return { success: false, message: 'Quantity must be a valid non-negative number.' };
      }

      if (targetTotal < currentlyIssued) {
        return {
          success: false,
          message: `Cannot reduce total copies below ${currentlyIssued} because ${currentlyIssued} copy/copies are currently borrowed by students.`
        };
      }

      const newAvailable = Math.max(0, targetTotal - currentlyIssued);
      books[idx].totalCopies = targetTotal;
      books[idx].availableCopies = newAvailable;
      setRaw(STORAGE_KEYS.BOOKS, books);
      notifyChange();

      // Persist to backend server / database
      apiFetch('books_edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: book.id || 0,
          isbn: book.isbn,
          total_copies: targetTotal,
          totalCopies: targetTotal,
          available_copies: newAvailable
        })
      }).then(() => syncWithBackend()).catch(() => {});

      return {
        success: true,
        book: books[idx],
        message: `Quantity for "${book.title}" updated successfully! Total: ${targetTotal}, Available: ${newAvailable}.`
      };
    },

    updateBook(isbn, updatedFields) {
      const books = this.getBooks();
      const idx = books.findIndex(b => b.isbn === isbn);
      if (idx !== -1) {
        if (updatedFields && (updatedFields.totalCopies !== undefined || updatedFields.total_copies !== undefined)) {
          const qty = updatedFields.totalCopies !== undefined ? updatedFields.totalCopies : updatedFields.total_copies;
          const res = this.updateBookQuantity(isbn, qty);
          return res.book || books[idx];
        }
        books[idx] = { ...books[idx], ...updatedFields };
        setRaw(STORAGE_KEYS.BOOKS, books);
        notifyChange();

        apiFetch('books_edit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isbn, ...updatedFields })
        }).then(() => syncWithBackend()).catch(() => {});

        return books[idx];
      }
      return null;
    },

    deleteBook(isbn) {
      let books = this.getBooks();
      books = books.filter(b => b.isbn !== isbn);
      setRaw(STORAGE_KEYS.BOOKS, books);

      apiFetch('books_delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isbn })
      }).then(() => syncWithBackend()).catch(() => {});
    },

    getUsers() {
      return getRaw(STORAGE_KEYS.USERS, DEFAULT_USERS);
    },

    getStudents() {
      return this.getUsers().filter(u => u.role === 'student');
    },

    getStudentById(studentId) {
      if (!studentId) return null;
      const upper = studentId.trim().toUpperCase();
      return this.getUsers().find(u => (u.studentId && u.studentId.toUpperCase() === upper) || (u.user_id && u.user_id.toUpperCase() === upper));
    },

    async addStudent(stuData) {
      const users = this.getUsers();
      const sid = (stuData.studentId || stuData.user_id || '').trim().toUpperCase();
      const exists = users.find(u => (u.studentId && u.studentId.toUpperCase() === sid) || (u.user_id && u.user_id.toUpperCase() === sid));
      if (exists) {
        return { success: false, message: `Student ID "${sid}" already exists.` };
      }

      const newId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;
      const newStu = {
        id: newId,
        studentId: sid,
        user_id: sid,
        name: stuData.name.trim(),
        email: stuData.email.trim(),
        password: stuData.password || 'student123',
        confirm_password: stuData.confirm_password || stuData.password || 'student123',
        role: 'student',
        department: stuData.department || 'General',
        year: stuData.year || '1st Year',
        phone: stuData.phone || 'N/A',
        status: 'Active'
      };

      try {
        const res = await apiFetch('students_add', {
          method: 'POST',
          body: JSON.stringify(newStu)
        });
        if (res) {
          const resData = await res.json();
          if (resData && resData.status === false) {
            return { success: false, message: resData.message || 'Registration failed.' };
          }
          if (resData && resData.data && resData.data.id) {
            newStu.id = resData.data.id;
          }
        }
      } catch (err) {
        console.error('[SLMS Store] addStudent error:', err);
      }

      users.push(newStu);
      setRaw(STORAGE_KEYS.USERS, users);
      syncWithBackend();

      return { success: true, student: newStu };
    },

    async deleteStudent(studentId) {
      if (!studentId) return;
      const upper = studentId.trim().toUpperCase();
      let users = this.getUsers();
      users = users.filter(u => (u.studentId && u.studentId.toUpperCase() !== upper) && (u.user_id && u.user_id.toUpperCase() !== upper));
      setRaw(STORAGE_KEYS.USERS, users);
      notifyChange();

      try {
        await apiFetch('students_delete', {
          method: 'POST',
          body: JSON.stringify({ studentId: upper, student_id: upper, user_id: upper })
        });
        syncWithBackend();
      } catch (err) {}
    },

    async loginUser(userId, password) {
      try {
        const res = await apiFetch('auth_login', {
          method: 'POST',
          body: JSON.stringify({ user_id: userId, userId: userId, password: password })
        });
        if (res) {
          const resData = await res.json();
          if (resData && resData.status && resData.data) {
            // Also ensure user is saved in local cache
            const users = this.getUsers();
            const sid = (resData.data.studentId || resData.data.user_id || '').toUpperCase();
            const existingIdx = users.findIndex(u => (u.studentId && u.studentId.toUpperCase() === sid) || (u.user_id && u.user_id.toUpperCase() === sid));
            if (existingIdx !== -1) {
              users[existingIdx] = { ...users[existingIdx], ...resData.data, password };
            } else {
              users.push({ ...resData.data, password });
            }
            setRaw(STORAGE_KEYS.USERS, users);

            return { success: true, user: resData.data };
          } else {
            return { success: false, message: (resData && resData.message) ? resData.message : 'Invalid User ID or Password. Please try again.' };
          }
        }
      } catch (e) {
        console.error('[SLMS Store] loginUser error:', e);
      }

      // Check local cache if network/PHP offline
      const stuRecord = this.getStudentById(userId);
      if (stuRecord && stuRecord.password === password) {
        return { success: true, user: stuRecord };
      }

      return { success: false, message: 'Invalid User ID or Password. Please try again.' };
    },


    syncNow() {
      return syncWithBackend();
    },

    getCirculations() {
      return getRaw(STORAGE_KEYS.CIRCULATIONS, DEFAULT_CIRCULATIONS);
    },

    getStudentActiveBorrows(studentId) {
      if (!studentId) return [];
      const upper = studentId.trim().toUpperCase();
      return this.getCirculations().filter(c => c.studentId.toUpperCase() === upper && (c.status === 'Issued' || c.status === 'Overdue'));
    },

    getStudentHistory(studentId) {
      if (!studentId) return [];
      const upper = studentId.trim().toUpperCase();
      return this.getCirculations().filter(c => c.studentId.toUpperCase() === upper && c.status === 'Returned');
    },

    issueBook(studentId, isbn, customDueDate) {
      const stu = this.getStudentById(studentId);
      if (!stu) {
        return { success: false, message: `Student ID "${studentId}" not found in registered records.` };
      }

      const activeBorrows = this.getStudentActiveBorrows(studentId);
      if (activeBorrows.length >= 3) {
        return { success: false, message: `Borrow Limit Exceeded: Student (${studentId}) already has 3 active borrowed books.` };
      }

      const alreadyBorrowed = activeBorrows.find(b => b.isbn === isbn);
      if (alreadyBorrowed) {
        return { success: false, message: `Student already has an active issue for this book ("${alreadyBorrowed.bookTitle}").` };
      }

      const books = this.getBooks();
      const bookIdx = books.findIndex(b => b.isbn === isbn);
      if (bookIdx === -1) {
        return { success: false, message: 'Book not found in library inventory.' };
      }

      const book = books[bookIdx];
      if (book.availableCopies <= 0) {
        return { success: false, message: `No copies of "${book.title}" are currently available.` };
      }

      book.availableCopies -= 1;
      books[bookIdx] = book;
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));

      let formattedDue = customDueDate;
      if (!formattedDue) {
        const d = new Date();
        d.setDate(d.getDate() + 14);
        formattedDue = d.toLocaleDateString('en-GB');
      }

      const circulations = this.getCirculations();
      const newCircId = circulations.length > 0 ? Math.max(...circulations.map(c => c.id || 0)) + 1 : 1;
      const newCirc = {
        id: newCircId,
        studentId: stu.studentId,
        studentName: stu.name,
        bookTitle: book.title,
        isbn: book.isbn,
        issueDate: new Date().toLocaleDateString('en-GB'),
        dueDate: formattedDue,
        returnDate: null,
        status: 'Issued',
        fine: 0
      };

      circulations.unshift(newCirc);
      setRaw(STORAGE_KEYS.CIRCULATIONS, circulations);

      apiFetch('circ_issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: stu.studentId,
          student_id: stu.studentId,
          student_name: stu.name,
          isbn: book.isbn,
          dueDate: formattedDue,
          due_date: formattedDue
        })
      }).then(() => syncWithBackend()).catch(() => {});

      return {
        success: true,
        circulation: newCirc,
        message: `Book "${book.title}" successfully issued to ${stu.name} (${stu.studentId}). Due on ${formattedDue}.`
      };
    },

    returnBook(circulationId) {
      const circulations = this.getCirculations();
      const circIdx = circulations.findIndex(c => c.id === circulationId || c.id === parseInt(circulationId, 10));
      if (circIdx === -1) {
        return { success: false, message: 'Circulation record not found.' };
      }

      const circ = circulations[circIdx];
      if (circ.status === 'Returned') {
        return { success: false, message: 'Book is already returned.' };
      }

      circ.status = 'Returned';
      circ.returnDate = new Date().toLocaleDateString('en-GB');
      circulations[circIdx] = circ;
      localStorage.setItem(STORAGE_KEYS.CIRCULATIONS, JSON.stringify(circulations));

      const books = this.getBooks();
      const bookIdx = books.findIndex(b => b.isbn === circ.isbn || b.title.toLowerCase() === circ.bookTitle.toLowerCase());
      if (bookIdx !== -1) {
        books[bookIdx].availableCopies = Math.min(books[bookIdx].totalCopies, books[bookIdx].availableCopies + 1);
        localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
      }

      notifyChange();

      apiFetch('circ_return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue_id: circ.id, issueId: circ.id, id: circ.id })
      }).then(() => syncWithBackend()).catch(() => {});

      return { success: true, message: `Book "${circ.bookTitle}" marked as Returned for ${circ.studentName}.` };
    },

    getMessages() {
      return getRaw(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
    },

    addMessage(msgData) {
      const msgs = this.getMessages();
      const newId = msgs.length > 0 ? Math.max(...msgs.map(m => m.id || 0)) + 1 : 1;
      const newMsg = {
        id: newId,
        name: msgData.name.trim(),
        email: msgData.email.trim(),
        subject: (msgData.subject || 'General Inquiry').trim(),
        message: msgData.message.trim(),
        date: new Date().toLocaleDateString('en-GB'),
        created_at: new Date().toLocaleDateString('en-GB'),
        status: 'Unread'
      };
      msgs.unshift(newMsg);
      setRaw(STORAGE_KEYS.MESSAGES, msgs);

      apiFetch('messages_add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg)
      }).then(() => syncWithBackend()).catch(() => {});

      return newMsg;
    },

    async replyMessage(id) {
      const numId = parseInt(id, 10);
      const msgs = this.getMessages();
      const idx = msgs.findIndex(m => m.id === numId || m.id === id);
      if (idx !== -1) {
        msgs[idx].status = 'Replied';
        setRaw(STORAGE_KEYS.MESSAGES, msgs);
      }

      try {
        await apiFetch('messages_reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: numId })
        });
        await syncWithBackend();
      } catch (e) {
        console.error('[SLMS Store] replyMessage error:', e);
      }
      return { success: true };
    },

    async deleteMessage(id) {
      const numId = parseInt(id, 10);
      let msgs = this.getMessages();
      msgs = msgs.filter(m => m.id !== numId && m.id !== id);
      setRaw(STORAGE_KEYS.MESSAGES, msgs);

      try {
        await apiFetch('messages_delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: numId })
        });
        await syncWithBackend();
      } catch (e) {
        console.error('[SLMS Store] deleteMessage error:', e);
      }
      return { success: true };
    },

    getOverviewStats() {
      const books = this.getBooks();
      const circulations = this.getCirculations();
      const students = this.getStudents();
      const messages = this.getMessages();

      const totalBooks = books.reduce((acc, b) => acc + (b.totalCopies || 1), 0);
      const totalTitles = books.length;
      const issuedBooks = circulations.filter(c => c.status === 'Issued' || c.status === 'Overdue').length;
      const overdueBooks = circulations.filter(c => c.status === 'Overdue').length;
      const totalFines = circulations.reduce((acc, c) => acc + (c.fine || 0), 0);
      const unreadMessages = messages.filter(m => m.status === 'Unread').length;

      return {
        totalBooks,
        totalTitles,
        issuedBooks,
        registeredStudents: students.length,
        overdueBooks,
        totalFines,
        unreadMessages,
        recentCirculations: circulations.slice(0, 5)
      };
    }
  };

  SLMS_STORE.init();
  window.SLMS_STORE = SLMS_STORE;

})(window);
