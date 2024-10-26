# Workshops in Web Development 1

Course Code: HTTP 5114

Academic Year: 2025-2026

This course will allow students to access additional support for content delivered in the other classes each semester. Every student in the class will engage in a process of self-assessment to help them identify areas where they would benefit from help, and then the student and teaching team will set up a process for providing support for any areas where the student would benefit from some in-the-moment support. Mentors, tutors and workshops will be available.

# links
https://www.codecademy.com/catalog/subject/web-development

# Images
![Mymi pics](Workshop.jpg).


> **Information**: This course encourages active learning and peer support, so take advantage of all available resources and seek help when needed!

# Code Example:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Accordion</title>
    <link href="styles.css" rel="stylesheet" type="text/css">
    <script>
    function btn(target) {
    // console.log("Open");
    // console.log(target);

    var divToHide = document.getElementsByClassName("accordion-section");
    for (var i = 0; i < divToHide.length; i++) {
        divToHide[i].style.display = "none"; 
    }

    var content = document.getElementById(target);
    // content.style.display = "block";

    if (content.style.display == "none") {
        content.style.display = "block";
    }
    else{
        content.style.display = "none";
    }
    }
    </script>
</head>
<body>

    <h1>JavaScript Accordion</h1>

    <div class="accordion">

        <div>
            <a onclick="btn('section-1')" href="#">Section 1</a>
        </div>
        <div class="accordion-section" id="section-1">
            <h2>Section 1</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, odio?</p>
            <p>Ipsum dolor sit amet.</p>
        </div>

        <div>
            <a onclick="btn('section-2')" href="#">Section 2</a>
        </div>
        <div class="accordion-section" id="section-2">
            <h2>Section 2</h2>
            <p>Sit amet consectetur adipisicing elit. Doloremque nobis eos tempore incidunt eaque inventore?</p>
            <p>Lorem, ipsum dolor.</p>
        </div>

        <div>
            <a onclick="btn('section-3')" href="#">Section 3</a>
        </div>
        <div class="accordion-section" id="section-3">
            <h2>Section 3</h2>
            <p>Dolor sit amet consectetur, adipisicing elit lorem ipsum.</p>
        </div>

    </div>

    <script src="accordion.js"></script>
    
</body>
</html>


