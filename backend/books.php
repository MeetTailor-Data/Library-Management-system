<?php

require_once __DIR__ . '/db.php';

$action = $_REQUEST['action'] ?? 'list';

switch ($action) {
    case 'list':
        list_books();
        break;

    case 'get':
        get_single_book();
        break;

    case 'add':
        add_book();
        break;

    case 'edit':
        edit_book();
        break;

    case 'delete':
        delete_book();
        break;

    default:
        json_response(false, 'Invalid book action specified.', null, 400);
}

function list_books() {
    $db = get_db();
    $category = trim($_GET['category'] ?? '');
    $search = trim($_GET['search'] ?? '');

    $sql = "SELECT id, title, author, category, isbn, total_copies, available_copies, image, description FROM books WHERE 1=1";
    $params = [];

    if (!empty($category) && strcasecmp($category, 'All') !== 0) {
        $sql .= " AND LOWER(category) = LOWER(?)";
        $params[] = $category;
    }

    if (!empty($search)) {
        $sql .= " AND (LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(isbn) LIKE ?)";
        $searchTerm = '%' . strtolower($search) . '%';
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    $sql .= " ORDER BY id ASC";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $books = $stmt->fetchAll();

    foreach ($books as &$b) {
        $b['id'] = (int)$b['id'];
        $b['total_copies'] = (int)$b['total_copies'];
        $b['available_copies'] = (int)$b['available_copies'];
    }

    json_response(true, 'Books retrieved successfully.', $books);
}

function get_single_book() {
    $id = (int)($_GET['id'] ?? 0);
    $db = get_db();

    $stmt = $db->prepare("SELECT * FROM books WHERE id = ? LIMIT 1");
    $stmt->execute([$id]);
    $book = $stmt->fetch();

    if ($book) {
        $book['id'] = (int)$book['id'];
        $book['total_copies'] = (int)$book['total_copies'];
        $book['available_copies'] = (int)$book['available_copies'];
        json_response(true, 'Book details found.', $book);
    }

    json_response(false, 'Book not found.', null, 404);
}

function add_book() {
    $data = get_request_data();
    $title = trim($data['title'] ?? '');
    $author = trim($data['author'] ?? '');
    $category = trim($data['category'] ?? 'General');
    $isbn = trim($data['isbn'] ?? '');
    $copies = (int)($data['copies'] ?? $data['totalCopies'] ?? $data['total_copies'] ?? 1);
    $description = trim($data['description'] ?? 'No description provided.');
    $image = trim($data['image'] ?? 'b1.jpg');

    if (empty($title) || empty($author) || empty($isbn)) {
        json_response(false, 'Title, Author, and ISBN are required.', null, 400);
    }

    $db = get_db();

    $checkStmt = $db->prepare("SELECT id FROM books WHERE isbn = ? LIMIT 1");
    $checkStmt->execute([$isbn]);
    if ($checkStmt->fetch()) {
        json_response(false, "A book with ISBN '{$isbn}' already exists.", null, 409);
    }

    $stmt = $db->prepare("INSERT INTO books (title, author, category, isbn, total_copies, available_copies, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$title, $author, $category, $isbn, $copies, $copies, $image, $description]);
    $newId = (int)$db->lastInsertId();

    $newBook = [
        'id' => $newId,
        'title' => $title,
        'author' => $author,
        'category' => $category,
        'isbn' => $isbn,
        'total_copies' => $copies,
        'available_copies' => $copies,
        'image' => $image,
        'description' => $description
    ];

    json_response(true, "Book '{$title}' added successfully to inventory.", $newBook);
}

function edit_book() {
    $data = get_request_data();
    $id = (int)($data['id'] ?? 0);
    $title = trim($data['title'] ?? '');
    $author = trim($data['author'] ?? '');
    $category = trim($data['category'] ?? '');
    $isbn = trim($data['isbn'] ?? '');
    $totalCopies = isset($data['total_copies']) ? (int)$data['total_copies'] : (isset($data['totalCopies']) ? (int)$data['totalCopies'] : null);

    $db = get_db();
    if ($id > 0) {
        $stmt = $db->prepare("SELECT * FROM books WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
    } else if (!empty($isbn)) {
        $stmt = $db->prepare("SELECT * FROM books WHERE isbn = ? LIMIT 1");
        $stmt->execute([$isbn]);
    } else {
        json_response(false, 'Book ID or ISBN is required for update.', null, 400);
    }
    $book = $stmt->fetch();

    if (!$book) {
        json_response(false, 'Book not found for update.', null, 404);
    }

    $newTitle = !empty($title) ? $title : $book['title'];
    $newAuthor = !empty($author) ? $author : $book['author'];
    $newCategory = !empty($category) ? $category : $book['category'];
    $newIsbn = !empty($isbn) ? $isbn : $book['isbn'];

    $newTotal = $book['total_copies'];
    $newAvailable = $book['available_copies'];

    if ($totalCopies !== null && $totalCopies >= 0) {
        $diff = $totalCopies - (int)$book['total_copies'];
        $newTotal = $totalCopies;
        $newAvailable = max(0, (int)$book['available_copies'] + $diff);
    }

    $updateStmt = $db->prepare("UPDATE books SET title = ?, author = ?, category = ?, isbn = ?, total_copies = ?, available_copies = ? WHERE id = ?");
    $updateStmt->execute([$newTitle, $newAuthor, $newCategory, $newIsbn, $newTotal, $newAvailable, (int)$book['id']]);

    json_response(true, 'Book updated successfully.');
}

function delete_book() {
    $data = get_request_data();
    $id = (int)($data['id'] ?? 0);
    $isbn = trim($data['isbn'] ?? '');
    $db = get_db();

    if ($id > 0) {
        $stmt = $db->prepare("DELETE FROM books WHERE id = ?");
        $stmt->execute([$id]);
    } else if (!empty($isbn)) {
        $stmt = $db->prepare("DELETE FROM books WHERE isbn = ?");
        $stmt->execute([$isbn]);
    } else {
        json_response(false, 'Book ID or ISBN is required.', null, 400);
    }

    if ($stmt->rowCount() > 0) {
        json_response(true, 'Book removed from library catalog.');
    } else {
        json_response(false, 'Book not found to delete.', null, 404);
    }
}

?>
