<?php

require_once __DIR__ . '/db.php';

$action = $_REQUEST['action'] ?? 'submit';

if ($action === 'submit') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? 'General Inquiry');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        json_response(false, 'Please fill in all required fields.', null, 400);
    }

    $db = get_db();
    $stmt = $db->prepare("INSERT INTO messages (name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, 'Unread', ?)");
    $createdDate = date('Y-m-d');
    $stmt->execute([$name, $email, $subject, $message, $createdDate]);
    $newId = (int)$db->lastInsertId();

    $newMessage = [
        'id' => $newId,
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'created_at' => $createdDate,
        'status' => 'Unread'
    ];

    json_response(true, 'Your message has been sent successfully. The library team will respond soon.', $newMessage);
} elseif ($action === 'list') {
    $db = get_db();
    $stmt = $db->query("SELECT * FROM messages ORDER BY id DESC");
    $messages = $stmt->fetchAll();

    foreach ($messages as &$m) {
        $m['id'] = (int)$m['id'];
        $m['date'] = $m['created_at'];
    }

    json_response(true, 'Contact messages loaded.', $messages);
} elseif ($action === 'reply') {
    $id = (int)($_REQUEST['id'] ?? 0);
    if ($id <= 0) {
        json_response(false, 'Valid message ID required.', null, 400);
    }
    $db = get_db();
    $stmt = $db->prepare("UPDATE messages SET status = 'Replied' WHERE id = ?");
    $stmt->execute([$id]);
    json_response(true, 'Message marked as Replied.');
} elseif ($action === 'delete') {
    $id = (int)($_REQUEST['id'] ?? 0);
    if ($id <= 0) {
        json_response(false, 'Valid message ID required.', null, 400);
    }
    $db = get_db();
    $stmt = $db->prepare("DELETE FROM messages WHERE id = ?");
    $stmt->execute([$id]);
    json_response(true, 'Message deleted successfully.');
} else {
    json_response(false, 'Invalid action specified.', null, 400);
}
?>
