<?php

    require 'connect.php';
    session_start();
    $instructorID =  $_SESSION['id'];
    $course = $_REQUEST["courseName"];
    $course = trim($course);
    if(isset($_REQUEST["dateProvided"])){
            $date = $_REQUEST["dateProvided"];
    }
    $name;
    if(isset($_REQUEST["studentProvided"])){
            $fullname = strtolower($_REQUEST["studentProvided"]);
            $name = preg_split('/ +/', $fullname);
    }
    $type= $_REQUEST["type"];
    if($type == "date"){
        $query = $db->query("select c.course_name, s.first_name, s.last_name, a.dateAttended, a.attended FROM classattendance a, instructor i, course c, student s WHERE i.instructor_id = '$instructorID' and i.instructor_id = a.Instructor_id and c.course_name = '$course' and c.course_id = a.course_id and a.dateAttended = '$date' and s.student_ID = a.student_id");
        $numberXML=0;
        header("Content-type: text/xml");
        print "<?xml version='1.0' encoding='UTF-8'?>\n";
        print "<list>\n";
        foreach($query as $row){
            $numberXML++;
                if($row[4] =="1"){
                    $row[4] = "Present";
                }else{
                    $row[4] = "Absent";
                }
                print "\t<attendance number =\"$numberXML\">\n";
                print "\t\t<course> $row[0] </course>\n";
                print "\t\t<firstname> $row[1] </firstname>\n";
                print "\t\t<lastname> $row[2] </lastname>\n";
                print "\t\t<date> $row[3] </date>\n";
                print "\t\t<attended> $row[4] </attended>\n";
                print "\t</attendance>\n";
        }
        print "</list>\n";
    }else if($type="student"){
        $query = $db->query("select c.course_name, s.first_name, s.last_name, a.dateAttended, a.attended FROM classattendance a, instructor i, course c, student s WHERE i.instructor_id = '$instructorID' and i.instructor_id = a.Instructor_id and c.course_name = '$course' and c.course_id = a.course_id and s.first_name ='$name[0]' and s.last_name = '$name[1]' and s.student_ID = a.student_id");
        $order=0;
        header('Content-Type: application/json');
        print "{\n";
        print "\t\"list\":[\n";
        foreach($query as $row){
            if($row[4] =="1"){
                $row[4] = "Present";
            }else{
                $row[4] = "Absent";
            }
            if($order != 0)
                print ",\n";
            $order++;
            print "\t\t{ \"course\":\"$row[0]\", \"firstName\":\"$row[1]\",  \"lastName\":\"$row[2]\",  \"date\":\"$row[3]\",  \"attended\":\"$row[4]\", \"order\":\"$order\" }";

        }
        print "\n\t]\n";
        print "}";
    }


?>
