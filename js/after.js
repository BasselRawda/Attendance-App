/* to do: REGEX(done) - generate QR - edit attendance(done) - list courses buttons from database(done) - login error page css(done)
    if we have time: color table rows by attendance - report buggs page - create accounts.


*/

window.onload = function() {
    getCourses();
    var buttonList = document.getElementById("container").getElementsByTagName("button");
    for(var i = 0; i < buttonList.length;i++){
        buttonList[i].onclick = sldup;
    }



};
var request;
var course;
var type = "";

function getCourses(){
    try{
        request = new XMLHttpRequest();
        request.open("get", "getCourses.php",false);
        request.onreadystatechange = responseGetCourses;
        request.send(null);
    }catch( exception ){
            alert("request failed " + exception);
    }
}

function responseGetCourses(){
    if(request.readyState == 4 && request.status == 200){
        var ObjectXML = request.responseXML;
        var courses = ObjectXML.getElementsByTagName("courses")[0].getElementsByTagName("course");
        for(var i = 0; i < courses.length;i++){
            var button = document.createElement("button");
            button.innerHTML = courses[i].innerHTML;
            button.setAttribute("id",courses[i].innerHTML);
            button.id = $.trim(button.id);
            button.setAttribute("class","btn-wide");
            button.setAttribute("type","button");
            document.getElementById("container").appendChild(button);
        }
    }
}


function sldup() {
    div = document.createElement('div');
    course = this.innerHTML;
    this.setAttribute("disabled","disabled");
    $(this).siblings('button').hide(400);
    var qrbtn = document.createElement('button');
    qrbtn.appendChild(document.createTextNode('Generate QR'));
    qrbtn.setAttribute("class",'btn-wide2');
    qrbtn.onclick = function(){
        window.location = 'displayQR.php';

    }

    div.appendChild(qrbtn);
    var tendDate = document.createElement('button');
    tendDate.appendChild(document.createTextNode('Get Attendance By Date'));
    tendDate.setAttribute("class",'btn-wide2');
    tendDate.setAttribute("id",'attendanceByDate');
    tendDate.onclick = function(){
        type = "date";
        $("#resultTable").remove();
        var textField = document.createElement("input");
        textField.setAttribute("class",'input-field');
        textField.setAttribute("id",'dateProvided');
        textField.setAttribute("placeholder",'Enter Date:');
        var submitButton = document.createElement("button");
        submitButton.setAttribute("class",'btn-wide2');
        submitButton.setAttribute("id",'getDate');
        submitButton.innerHTML ="GET";
        submitButton.onclick = getAttendance;
        textField.onblur = checkRegexGET;
        if(!$("#dateProvided").length && !$("#getDate").length){
            $(textField).hide().appendTo(div);
            $(submitButton).hide().appendTo(div);
        }

        if($("#studentProvided").is(":visible") && $("#getStudent").is(":visible")){
            $("#studentProvided").hide(400);
            $("#getStudent").hide(400);
        }
        if($("#dateProvided").css("display")==='none' && $("#getDate").css("display")==='none'){

            $("#dateProvided").show(400);
            $("#getDate").show(400);
        }
    }

    div.appendChild(tendDate);
    var tendSt = document.createElement('button');
    tendSt.appendChild(document.createTextNode('Get Attendance By Student'));
    tendSt.setAttribute("class",'btn-wide2');
    div.appendChild(tendSt);
    tendSt.onclick = function(){
        type="student";
        $("#resultTable").remove();
        var textField = document.createElement("input");
        textField.setAttribute("class",'input-field');
        textField.setAttribute("id",'studentProvided');
        textField.setAttribute("placeholder",'Enter Student:')
        var submitButton = document.createElement("button");
        submitButton.setAttribute("class",'btn-wide2');
        submitButton.setAttribute("id",'getStudent');
        submitButton.innerHTML ="GET";
        submitButton.onclick = getAttendance;
        textField.onblur = checkRegexGET;
        if(!$("#studentProvided").length && !$("#getStudent").length){
            $(textField).hide().appendTo(div);
            $(submitButton).hide().appendTo(div);
        }

        if($("#dateProvided").is(":visible") && $("#getDate").is(":visible") ){
            $("#dateProvided").hide(400);
            $("#getDate").hide(400);
        }

        if($("#studentProvided").is(":hidden") && $("#getStudent").css("display")==='none'){
            $("#studentProvided").show(400);
            $("#getStudent").show(400);
        }
}
    var editTend = document.createElement('button');
    editTend.appendChild(document.createTextNode('Edit Attendance'));
    editTend.setAttribute("class",'btn-wide2');
    div.appendChild(editTend);
    editTend.onclick = function(){
        editDiv = document.createElement("div");
        var textFieldStudent = document.createElement("input");
        textFieldStudent.setAttribute("class",'input-field');
        textFieldStudent.setAttribute("id",'editStudent');
        textFieldStudent.setAttribute("placeholder",'Enter student name:');
        textFieldStudent.onblur = checkRegexEdit;
        var textFieldDate = document.createElement("input");
        textFieldDate.setAttribute("class",'input-field');
        textFieldDate.setAttribute("id",'editDate');
        textFieldDate.setAttribute("placeholder",'Enter Date:');
        textFieldDate.onblur = checkRegexEdit;
        var textFieldAttended = document.createElement("input");
        textFieldAttended.setAttribute("class",'input-field');
        textFieldAttended.setAttribute("id",'editAttended');
        textFieldAttended.setAttribute("placeholder",'Enter status: 1 for present | 0 for absent');
        textFieldAttended.onblur = checkRegexEdit;
        var submitButton = document.createElement("button");
        submitButton.setAttribute("class",'btn-wide2');
        submitButton.setAttribute("id",'makeChanges');
        submitButton.innerHTML ="Change";
        submitButton.onclick = editAttendance;
        editDiv.appendChild(textFieldStudent);
        editDiv.appendChild(textFieldDate);
        editDiv.appendChild(textFieldAttended);
        editDiv.appendChild(submitButton);
        div.appendChild(editDiv);

    }
    var bckBtn = document.createElement('button');
    bckBtn.appendChild(document.createTextNode('Go Back'));
    bckBtn.setAttribute("class",'btn-wide');
    bckBtn.onclick = function(){
        $(this).parent().parent().children('button').fadeIn(400);
        $(this).parent().parent().children().attr('disabled', false);
        $(this).parent('div').remove();

    }
    div.appendChild(bckBtn);
    $(div).hide(400);
    $('#container').append(div);
    $(div).show(800);
}
    function checkRegexGET(){
        if($("#dateProvided").length){
            var dateRegex = '(((0[1-9]|[12][0-9]|3[01])([\/])(0[13578]|10|12)([\/])([1-2][0,9][0-9][0-9]))|(([0][1-9]|[12][0-9]|30)([\/])(0[469]|11)([\/])([1-2][0,9][0-9][0-9]))|((0[1-9]|1[0-9]|2[0-8])([\/])(02)([\/])([1-2][0,9][0-9][0-9]))|((29)(\.|-|\/)(02)([\/])([02468][048]00))|((29)([\/])(02)([\/])([13579][26]00))|((29)([\/])(02)([\/])([0-9][0-9][0][48]))|((29)([\/])(02)([\/])([0-9][0-9][2468][048]))|((29)([\/])(02)([\/])([0-9][0-9][13579][26])))';
            var value = $("#dateProvided").val();
            if(value.match(dateRegex)){
                $("#dateProvided").css('background-color', 'green');
                    $("#getDate").attr("disabled", false);
            }else{
                $("#dateProvided").css('background-color', 'red');
                    $("#getDate").attr("disabled", true);
            }
        }
        if($("#studentProvided").length){
            var studentRegex = '^[a-zA-Z]+[ ]{1}[a-zA-Z]+$';
            var value = $("#studentProvided").val();
            if(value.match(studentRegex)){
                $("#studentProvided").css('background-color', 'green');
                    $("#getStudent").attr("disabled", false);
            }else{
                $("#studentProvided").css('background-color', 'red');
                    $("#getStudent").attr("disabled", true);
            }
        }

    }
    function checkRegexEdit(){
        var dateRegex = '(((0[1-9]|[12][0-9]|3[01])([\/])(0[13578]|10|12)([\/])([1-2][0,9][0-9][0-9]))|(([0][1-9]|[12][0-9]|30)([\/])(0[469]|11)([\/])([1-2][0,9][0-9][0-9]))|((0[1-9]|1[0-9]|2[0-8])([\/])(02)([\/])([1-2][0,9][0-9][0-9]))|((29)(\.|-|\/)(02)([\/])([02468][048]00))|((29)([\/])(02)([\/])([13579][26]00))|((29)([\/])(02)([\/])([0-9][0-9][0][48]))|((29)([\/])(02)([\/])([0-9][0-9][2468][048]))|((29)([\/])(02)([\/])([0-9][0-9][13579][26])))';
        var studentRegex = '^[a-zA-Z]+[ ]{1}[a-zA-Z]+$';
        var attendedRegex = '^(0|1)$';

        if($("#editStudent").length){
            var value = $("#editStudent").val();
            if(value.match(studentRegex)){
                $("#editStudent").css('background-color', 'green');
                    $("#makeChanges").attr("disabled", false);
            }else{
                $("#editStudent").css('background-color', 'red');
                    $("#makeChanges").attr("disabled", true);
            }
        }
        if($("#editDate").length){
            var value = $("#editDate").val();
            if(value.match(dateRegex)){
                $("#editDate").css('background-color', 'green');
                    $("#makeChanges").attr("disabled", false);
            }else{
                $("#editDate").css('background-color', 'red');
                    $("#makeChanges").attr("disabled", true);
            }
        }
        if($("#editAttended").length){
            var value = $("#editAttended").val();
            if(value.match(attendedRegex)){
                $("#editAttended").css('background-color', 'green');
                    $("#makeChanges").attr("disabled", false);
            }else{
                $("#editAttended").css('background-color', 'red');
                    $("#makeChanges").attr("disabled", true);
            }
        }


}

    function editAttendance(){
        try{

            var studentProvided = $("#editStudent").val();
            var dateProvided = $("#editDate").val();
            var attendedProvided = $("#editAttended").val();
            request = new XMLHttpRequest();
            request.open("get", "editAttendance.php?courseProvided="+course+"&studentProvided="+studentProvided +"&dateProvided="+dateProvided +"&attendedProvided="+attendedProvided);
            request.onreadystatechange = validateRequest;
            request.send(null);
        }catch( exception ){
                alert("request failed " + exception);
        }
    }

    function validateRequest(){
        if(request.readyState == 4 && request.status == 200){
            var objectText = this.responseText;
            var par = document.createElement("p");
            par.innerHTML = objectText;
            div.appendChild(par);

    }
}


    function getAttendance(){
        try{
            var dateProvided = $("#dateProvided").val();
            var studentProvided = $("#studentProvided").val();
            request = new XMLHttpRequest();
            if(type =="date"){
                request.open("get", "getAttendance.php?courseName="+course+"&dateProvided="+dateProvided+"&type="+type);
                request.onreadystatechange = printDateXML;
                request.send(null);
            }else if(type=="student"){
                request.open("get", "getAttendance.php?courseName="+course+"&studentProvided="+studentProvided+"&type="+type);
                request.onreadystatechange = printStudentJSON;
                request.send(null);
            }
        }catch( exception ){
            alert("request failed " + exception);
    }
}
    function printDateXML(){
        if(request.readyState == 4 && request.status == 200){
            var ObjectXML = request.responseXML;
            var table = document.createElement("table");
            table.setAttribute("id","resultTable");
            var attendanceNumh = document.createElement("th");
            var courseNameh = document.createElement("th");
            var firstNameh = document.createElement("th");
            var lastNameh = document.createElement("th");
            var dateh = document.createElement("th");
            var attendedh = document.createElement("th");
            attendanceNumh.innerHTML = "#";
            courseNameh.innerHTML = "Course Name";
            firstNameh.innerHTML = "First Name";
            lastNameh.innerHTML = "Last Name";
            dateh.innerHTML = "Date";
            attendedh.innerHTML = "Present/Absent";
            table.appendChild(attendanceNumh);
            table.appendChild(courseNameh);
            table.appendChild(firstNameh);
            table.appendChild(lastNameh);
            table.appendChild(dateh);
            table.appendChild(attendedh);
            for(var i = 0; i < ObjectXML.getElementsByTagName("attendance").length;i++){
                var attendanceRow = document.createElement("tr");
                var attendanceNum = document.createElement("td");
                var courseName = document.createElement("td");
                var firstName = document.createElement("td");
                var lastName = document.createElement("td");
                var date = document.createElement("td");
                var attended = document.createElement("td");
                attendanceNum.innerHTML = ObjectXML.getElementsByTagName("attendance")[i].getAttribute("number");
                courseName.innerHTML = ObjectXML.getElementsByTagName("attendance")[i].getElementsByTagName("course")[0].innerHTML;
                firstName.innerHTML = ObjectXML.getElementsByTagName("attendance")[i].getElementsByTagName("firstname")[0].innerHTML;
                lastName.innerHTML = ObjectXML.getElementsByTagName("attendance")[i].getElementsByTagName("lastname")[0].innerHTML;
                date.innerHTML = ObjectXML.getElementsByTagName("attendance")[i].getElementsByTagName("date")[0].innerHTML;
                attended.innerHTML = ObjectXML.getElementsByTagName("attendance")[i].getElementsByTagName("attended")[0].innerHTML;
                attendanceRow.appendChild(attendanceNum);
                attendanceRow.appendChild(courseName);
                attendanceRow.appendChild(firstName);
                attendanceRow.appendChild(lastName);
                attendanceRow.appendChild(date);
                attendanceRow.appendChild(attended);
                table.appendChild(attendanceRow);
            }
            if($("table").length > 0){
                $("table").replaceWith(table);

            }else{
                div.appendChild(table);
            }

        }
    }
    function printStudentJSON(){
        if(request.readyState == 4 && request.status == 200){
            var ObjectJSON = JSON.parse(this.response);
            var table = document.createElement("table");
            table.setAttribute("id","resultTable");
            var attendanceNumh = document.createElement("th");
            var courseNameh = document.createElement("th");
            var firstNameh = document.createElement("th");
            var lastNameh = document.createElement("th");
            var dateh = document.createElement("th");
            var attendedh = document.createElement("th");
            attendanceNumh.innerHTML = "#";
            courseNameh.innerHTML = "Course Name";
            firstNameh.innerHTML = "First Name";
            lastNameh.innerHTML = "Last Name";
            dateh.innerHTML = "Date";
            attendedh.innerHTML = "Present/Absent";
            table.appendChild(attendanceNumh);
            table.appendChild(courseNameh);
            table.appendChild(firstNameh);
            table.appendChild(lastNameh);
            table.appendChild(dateh);
            table.appendChild(attendedh);
            for(var i = 0;i < ObjectJSON.list.length;i++){
                var attendanceRow = document.createElement("tr");
                var attendanceNum = document.createElement("td");
                var courseName = document.createElement("td");
                var firstName = document.createElement("td");
                var lastName = document.createElement("td");
                var date = document.createElement("td");
                var attended = document.createElement("td");
                attendanceNum.innerHTML = ObjectJSON.list[i].order;
                courseName.innerHTML = ObjectJSON.list[i].course;
                firstName.innerHTML = ObjectJSON.list[i].firstName;
                lastName.innerHTML = ObjectJSON.list[i].lastName;
                date.innerHTML = ObjectJSON.list[i].date;
                attended.innerHTML = ObjectJSON.list[i].attended;
                attendanceRow.appendChild(attendanceNum);
                attendanceRow.appendChild(courseName);
                attendanceRow.appendChild(firstName);
                attendanceRow.appendChild(lastName);
                attendanceRow.appendChild(date);
                attendanceRow.appendChild(attended);
                table.appendChild(attendanceRow);
            }
            if($("table").length > 0){
                $("table").replaceWith(table);
            }else{
                div.appendChild(table);
            }
        }
    }
