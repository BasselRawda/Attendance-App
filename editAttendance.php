<?php
    require 'connect.php';
    session_start();
    $instructorID = $_SESSION['id'];
    $course = $_REQUEST["courseProvided"];
    $studentFullName = strtolower($_REQUEST["studentProvided"]);
    $studentName = preg_split('/ +/', $studentFullName);
    $date = $_REQUEST["dateProvided"];
    $attend = $_REQUEST["attendedProvided"];
    $update = "UPDATE classattendance as a SET attended = '$attend' WHERE a.student_id = (select student_ID from student WHERE first_name = '$studentName[0]' AND last_name = '$studentName[1]') AND a.Instructor_id = '$instructorID' AND a.dateAttended = '$date' AND a.course_id = (select course_id from course c where c.course_name = '$course')";
    $statement = $db->prepare($update);
    $status = $statement->execute();
    if($status){
        if ($statement->rowCount()) {
        echo "Success";
    }else{
        echo "Failed";
    }

    }else{
            echo "Failed";
        }

 ?>
