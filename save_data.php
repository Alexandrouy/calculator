<?php
// Простая защита паролем (измените на свой)
$ADMIN_PASSWORD = '12345'; // ← задайте свой пароль

// Проверяем пароль, переданный в POST
if ($_POST['password'] !== $ADMIN_PASSWORD) {
    http_response_code(403);
    die('Неверный пароль');
}

// Получаем новые данные (это строка с JavaScript-кодом)
$newData = $_POST['data'];
if (empty($newData)) {
    http_response_code(400);
    die('Нет данных');
}

// Формируем полное содержимое data.js
// Оборачиваем в тот же формат, что и оригинал
$fileContent = "// ============================================================\n";
$fileContent .= "// ДАННЫЕ ДЛЯ КАЛЬКУЛЯТОРА (цены, коэффициенты, материалы)\n";
$fileContent .= "// ============================================================\n\n";
$fileContent .= $newData; // Это должен быть код, объявляющий window.DATA = { ... }

// Сохраняем в файл data.js
$result = file_put_contents('data.js', $fileContent);
if ($result === false) {
    http_response_code(500);
    die('Ошибка записи файла');
}

echo 'OK';
?>