const nbStudentsPerPage = 10;

/*
  displayPage is the main function that calls:
  1. the students displayer function
  2. the function that adds the pagination adds the pagination links
*/
function displayPage(pageNum = 1){
  const nbPages = displayStudents(pageNum);
  addPaginationLinks(pageNum,nbPages);
}

/*
  This function calculates first:
  1. the total number of students to be listed by counting all the li that have the classes "student-item" and "show"
  2. the number of pages needed
  3. the minIndex and maxIndex of students to be displayed in a pageNum page

  This function calls also the displayInfoMessage.
*/
function displayStudents(pageNum){
  const nbStudents = $("li.student-item.show").length;
  const nbPages = Math.ceil(nbStudents / nbStudentsPerPage);
  const maxIndex = nbStudentsPerPage * pageNum;
  const minIndex = maxIndex - nbStudentsPerPage;
  $("li.student-item").hide();                      // hides first all the students
  for(var i = minIndex; i < maxIndex; i ++){        // displays the students li that have the class "student-item" and "show"
    $("li.student-item.show").eq(i).show();
  }
  displayInfoMessage(minIndex,maxIndex,nbStudents);
  return nbPages;
}

/*
  This function displays a message in the div with the "page-header" class
  with the min and max students index displayed on a page and the total number of students listed.

  If the total number of students listed is equal to 0 then "No result" is displayed
*/
function displayInfoMessage(minIndex,maxIndex,nbStudents){
  $('.page-header p').remove();
  if(nbStudents > 0){
    $('.page-header').append(`<p>Students ${minIndex+1}-${Math.min(maxIndex,nbStudents)} out of ${nbStudents}</p>`);
  }else{
    $('.page-header').append(`<p>No result</p>`);
  }
}

/*
  This function adds the pagination links to the page
  if the number of pages is greater than 1.

  The pagination links list is a ul of class "pagination".
*/
function addPaginationLinks(pageNum,nbPages){
  $('ul.pagination').remove();
  if(nbPages > 1){
    // appending the unorder list for the pagination links
    $('.page').append('<ul class="pagination"></ul>')
    for (var i = 0; i < nbPages; i++) {
      $('ul.pagination').append(`<li><a>${i+1}</a></li>`)
    }
    setActivePaginationLink(pageNum);
    addPaginationLinksClickListener();
  }
}

/*
  This function removes first the class "active" from
  all the pagination links.
  Then adds the class "active" to the "pageNum" link.
*/
function setActivePaginationLink(pageNum){
  $('ul.pagination a').removeClass('active');
  $('ul.pagination a').eq(pageNum - 1).addClass('active');
}

/*
  Sets a click listener on all "a" tags inside unordered list with class "pagination".
  When a pagination link is clicked,
  the relevant students are displayed
  and then the class "active" is updated on the pagination links
*/
function addPaginationLinksClickListener(){
  $('ul.pagination a').on('click',function(){
    const pageNumClicked = $(this).html();
    displayStudents(pageNumClicked);
    setActivePaginationLink(pageNumClicked);
  })
}

/*
  This function adds the search form that contains an input and a button
  in the div of class "page-header".
  Calls also the function that adds the click listener to the button.
*/
function addSearchForm(){
  $('.page-header').append(`
    <div class="search">
      <input type="text" placeholder="Search for students"/> <button>Search</button>
    </div>
  `);
  addSearchButtonClickListener();
}

/*
  This function adds a click listener to the search form button.

  When the button is clicked, the class "show" is added to all
  the li with class "student-item" that has the student name or
  the email substring (left part of the email until the "@")
  that matches the string input in the search form.

  Then calls the displayPage function to update
  the students and pagination links on the page.
*/
function addSearchButtonClickListener(){
  $('.search button').on('click', function(){
    const searchString = $('.search input').val().toLowerCase();

    $('.student-item').removeClass('show');
    $('.student-item').each(function(){
      const nameStudent = $(this).find('h3').text().toLowerCase();
      const emailStudent =  $(this).find('.email').text().toLowerCase();
      const emailStudentShort = emailStudent.substring(0,emailStudent.search('@'));

      if(nameStudent.search(searchString) > -1 ||
        emailStudentShort.search(searchString) > -1){
        $(this).addClass('show');
      }

    });
    displayPage();
  })
}

// adds first the class "show" to all the students li
$("li.student-item").addClass("show");
displayPage();
addSearchForm();
