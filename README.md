# 🏛️ Smart Library Management System (SLMS)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-brightgreen?style=for-the-badge&logo=render)](https://library-management-system-1-1ep1.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/MeetTailor-Data/Library-Management-system)
[![Database](https://img.shields.io/badge/Database-MySQL%20%7C%20SQLite-orange?style=for-the-badge&logo=sqlite)](https://github.com/MeetTailor-Data/Library-Management-system)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![PHP](https://img.shields.io/badge/PHP-8.x%20PDO-777BB4?style=for-the-badge&logo=php)](https://www.php.net/)

A modern, responsive, and robust full-stack **Smart Library Management System** designed for educational institutions, colleges, and libraries. Features a dual-backend architecture supporting both **Node.js (Zero-Setup / Cloud Deploy)** and **PHP 8.x + MySQL (XAMPP / Academic Viva)** backed by relational SQL transactions, automated fine calculations, inventory tracking, and role-based access control.

---

## 🌐 Live Cloud Deployment

* **Live Web App:** [https://library-management-system-1-1ep1.onrender.com](https://library-management-system-1-1ep1.onrender.com)
* **Login & Signup Portal:** [https://library-management-system-1-1ep1.onrender.com/login.html](https://library-management-system-1-1ep1.onrender.com/login.html)
* **Admin Dashboard:** [https://library-management-system-1-1ep1.onrender.com/admin-dashboard.html](https://library-management-system-1-1ep1.onrender.com/admin-dashboard.html)
* **Student Portal:** [https://library-management-system-1-1ep1.onrender.com/student-dashboard.html](https://library-management-system-1-1ep1.onrender.com/student-dashboard.html)

---

## 🧠 Key Features

1. **⏱️ Automated Due Date & Fine Engine:**
   - Every issued book is automatically assigned a **14-day return due date**.
   - Computes overdue fines automatically (**₹5 per day overdue**) upon return or late tracking.
2. **📦 Atomic Inventory & Stock Control:**
   - Books cannot be checked out when available copies reach `0`.
   - Copies automatically decrement on checkout and increment back on return using ACID-safe relational SQL transactions.
3. **🛡️ Smart Borrow Limits & Prevention:**
   - Enforces a strict limit of **maximum 3 active borrows** per student.
   - Prevents duplicate checkouts of the same book title by the same student.
4. **👥 Role-Based Access Control (RBAC):**
   - Single unified login portal that securely routes **Librarians (Admin)** to the management dashboard and **Students** to their personal borrow history portal.
5. **🎓 Department & Academic Year Registration:**
   - Student sign-up captures student full name, email, student ID, **Department** (Computer Science, Information Technology, Mechanical Engg., Electrical, Civil, etc.), and **Academic Year** (1st Year to Final Year).
6. **📬 Contact Inquiry & Feedback Center:**
   - Public contact form sends messages to the database in real-time.
   - Librarians can view incoming inquiries, mark them as replied, and permanently delete resolved messages.
7. **🔄 Real-Time Live Sync & Cache Pruning:**
   - 3.5-second reactive state synchronization across all browser tabs and devices.
   - Authoritative database synchronization guarantees that deleted users or updated stock are reflected consistently across all connected browsers.

---

## 🛠️ Technology Stack & Architecture

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, Vanilla CSS3 (Custom Responsive Design System), JavaScript (ES6+), FontAwesome |
| **Backend Option 1 (Cloud & Local)** | **Node.js** (`server.js`) with built-in native SQLite engine (`library.db`) — zero configuration |
| **Backend Option 2 (Academic / XAMPP)** | **PHP 8.x** with **PDO** controllers (`backend/` folder) — compatible with Apache / MySQL |
| **Relational Databases** | **SQLite** (`library.db`) & **MySQL / MariaDB** ([`database.sql`](file:///c:/Users/meett/OneDrive/Desktop/Meet/All-projects/library/database.sql)) |
| **Deployment** | Render (`render.yaml`), Vercel (`vercel.json`) |

---

## 📂 Project Structure

```
Library-Management-System/
├── server.js                   # Node.js Full-Stack Server & SQLite REST API Engine
├── library.db                  # Relational SQLite Database (Zero-config local/cloud DB)
├── database.sql                # Complete MySQL Database Schema & Seed Data (for XAMPP)
├── package.json                # Project Metadata & Start Scripts
├── render.yaml                 # Render Cloud Deployment Blueprint
├── vercel.json                 # Vercel Serverless Configuration
├── index.php                   # PHP Entry Point & Auto-router
├── README.md                   # Comprehensive Project Documentation
├── workflow_spec.html          # Interactive System Workflow & Sequence Diagrams
│
├── Pages/                      # User Interface & Web Application Views
│   ├── index.html              # Landing / Home Page
│   ├── catalog.html            # Dynamic Book Catalog (OPAC) with Live Search & Filter
│   ├── login.html              # Role-Based Login & Student Registration (Signup)
│   ├── student-dashboard.html  # Student Portal (My Active Borrows, Due Dates & History)
│   ├── admin-dashboard.html    # Librarian Management Panel (Inventory, Circulation, Students, Inquiries)
│   ├── aboutus.html            # About Library & Vision
│   ├── services.html           # Services & Interactive FAQ Accordion
│   ├── contect.html            # Contact & Inquiry Form
│   ├── blog.html               # Library Blog Feed
│   └── blog-post1.html         # Blog Article View
│
├── backend/                    # PHP 8.x MVC Controllers & PDO Engine (for XAMPP)
│   ├── config.php              # Database Credentials & Driver Configuration
│   ├── db.php                  # PDO Database Connection, Auto-Init & Fine Calculator
│   ├── auth.php                # Authentication, Registration & Session Controller
│   ├── books.php               # Book Inventory CRUD & Catalog Controller
│   ├── circulation.php         # Issue/Return Engine, Limits & Stock Sync
│   └── contact.php             # Contact Inquiries Handler
│
└── assets/
    ├── css/
    │   └── style.css           # Global Responsive Stylesheet, Theme Tokens & Media Queries
    ├── js/
    │   ├── slms-store.js       # Centralized Reactive State Engine & Real-Time Sync
    │   ├── auth-session.js     # Session Management, RBAC Navbar & Hamburger Controller
    │   └── main-animations.js  # Scroll Reveal, Counter & Accordion Animations
    └── images/                 # Book Covers, Logos & Media Assets
```

---

## 🔑 Default Login Credentials

| Role | User / Student ID | Password | Department / Year | Access Permissions |
|---|---|---|---|---|
| **Librarian (Admin)** | `ADMIN01` *(or `admin`)* | `admin123` *(or `admin`)* | Library Administration | Full Inventory CRUD, Issue & Return, Student List, Inquiries |
| **Student 1 (John Doe)** | `STU101` | `student123` | Computer Science (3rd Year) | Book Checkout, Active Borrows, Due Date Tracking, History |
| **Student 2 (Emily Clark)** | `STU102` | `student123` | Information Technology (2nd Year) | Active Borrows, Overdue Fine Tracking & History |
| **Student 3 (David Miller)** | `STU103` | `student123` | Mechanical Engg. (4th Year) | Book Checkout, Active Borrows, History |
| **Student 4 (Ananya Verma)** | `STU104` | `student123` | Economics (1st Year) | Book Checkout, Active Borrows, History |
| **Student 5 (Meet Tailor)** | `STU105` | `meet2006` | Computer Science & Engg (Final Year) | Book Checkout, Active Borrows, History |
| **New Student** | *Custom Student ID* | *Custom Password* | *Selected in Signup* | Register via the **Signup** tab on `login.html` |

---

## 🚀 How to Run Locally

### Option 1: Native Node.js Server (Recommended — Zero Setup)
No database installation or Apache setup required:
1. Clone the repository:
   ```bash
   git clone https://github.com/MeetTailor-Data/Library-Management-system.git
   cd Library-Management-system
   ```
2. Start the local server:
   ```bash
   npm start
   ```
   *(or `node server.js`)*
3. Open your browser at:
   ```
   http://localhost:3000
   ```
   * **Home:** `http://localhost:3000`
   * **Login / Signup:** `http://localhost:3000/Pages/login.html`
   * **Admin Dashboard:** `http://localhost:3000/Pages/admin-dashboard.html`
   * **Student Dashboard:** `http://localhost:3000/Pages/student-dashboard.html`

---

### Option 2: Using XAMPP (Apache + MySQL for College / Viva)
If you need to demonstrate the project running via **PHP & MySQL**:
1. Copy or clone the project folder into your XAMPP web root:
   ```text
   C:\xampp\htdocs\library
   ```
2. Open **XAMPP Control Panel** and click **Start** on both **Apache** and **MySQL**.
3. Open `http://localhost/phpmyadmin` in your browser:
   - Create a new database named `library_db`.
   - Click **Import** $\rightarrow$ select [`database.sql`](file:///c:/Users/meett/OneDrive/Desktop/Meet/All-projects/library/database.sql) $\rightarrow$ click **Go**.
4. Access the application in your browser:
   ```text
   http://localhost/library/Pages/index.html
   ```

---

### Option 3: Built-in PHP CLI Server
If you have PHP installed on your machine:
```bash
php -S localhost:8000
```
Then navigate to `http://localhost:8000/Pages/index.html`.

---

## 🗃️ Database Viewing & Management

- **SQLite Database ([`library.db`](file:///c:/Users/meett/OneDrive/Desktop/Meet/All-projects/library/library.db)):**  
  Open directly in VS Code using the **SQLite Viewer** extension, or use [DB Browser for SQLite](https://sqlitebrowser.org/) or [sqliteonline.com](https://sqliteonline.com/).
- **MySQL Database ([`database.sql`](file:///c:/Users/meett/OneDrive/Desktop/Meet/All-projects/library/database.sql)):**  
  Open in **MySQL Workbench** or **phpMyAdmin** to inspect tables: `users`, `books`, `issued_books`, and `messages`.

---

## 👤 Author

**Meet Tailor**  
*GitHub Profile:* [@MeetTailor-Data](https://github.com/MeetTailor-Data)  
*Project Repository:* [Library-Management-system](https://github.com/MeetTailor-Data/Library-Management-system)
