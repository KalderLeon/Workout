<?php

// =====================================================
$PHONE = $_POST["phone"];

    $title = "";
    if (!empty($_POST["title"]))
    {
        //Если после следует еще поле, пишем двойной перенос
        $title .= $_POST["title"];
    } else {$title = "";};

    $phone = "Телефон: ";
    if (!empty($_POST["phone"])) {
        $phone .= $_POST["phone"];
    } else {$phone = "";};

    $name = "Имя: ";
    if (!empty($_POST["name"])) {
        $name .= $_POST["name"];
    } else {$name = "";};

    $mail = "E-mail: ";
    if (!empty($_POST["mail"])) {
        $mail .= $_POST["mail"];
    } else {$mail = "";};

    $social = "Соц. сеть: ";
    if (!empty($_POST["social"])) {
        $social .= $_POST["social"];
    } else {$social = "";};

    $review = "Отзыв: ";
    if (!empty($_POST["review"])) {
        $review .= $_POST["review"];
    } else {$review = "";};

    $good = "Товар: ";
    if (!empty($_POST["good"])) {
        $good .= $_POST["good"];
    } else {$good = "";};

    $dPipe = "Диаметр трубы: ";
    if (!empty($_POST["dPipe"])) {
        $dPipe .= $_POST["dPipe"];
    } else {$dPipe = "";};


// =====================================================

if (isset ($_POST['phone'])) {
  $to = "hawkstyle.order@gmail.com";
  $from = "shvedstenka24";
  // $subject = "Заполнена контактная форма на сайте ".$_SERVER['HTTP_REFERER'];
  $subject = "$title";
  $message =  "$name <br>".
              "$mail <br>".
              "$phone <br>".
              "$good <br>".
              "$dPipe <br>".
              "$social <br>".
              "$review";

  $boundary = md5(date('r', time()));
  $filesize = '';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $from . "\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
  $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/html; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$message";
     if(is_uploaded_file($_FILES['file']['tmp_name'])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));
         $filename = $_FILES['file']['name'];
         $filetype = $_FILES['file']['type'];
         $filesize = $_FILES['file']['size'];
         $message.="

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
     }
   $message.="
--$boundary--";

  if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
    mail($to, $subject, $message, $headers);
    echo $_POST['nameFF'].', Ваше сообщение отправлено, спасибо!';
  } else {
    echo 'Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.';
  }

// =========================================================
}
?>