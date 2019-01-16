<?php

require 'connect.php';
session_start();
$instructorID = $_SESSION['id'];
$query = $db->query("SELECT c.course_name FROM course c, taught t, instructor i WHERE i.instructor_id = '$instructorID' AND t.instructor_id = i.instructor_id AND t.course_id = c.course_id");
header("Content-type: text/xml");
print "<?xml version='1.0' encoding='UTF-8'?>\n";
print "<courses>\n";
foreach($query as $row){
        print "\t<course> $row[0] </course>\n";
}
print "</courses>\n";


 ?>
