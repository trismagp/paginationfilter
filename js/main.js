const nbStudentsPerPage = 10;
const nbStudents = $("li.student-item").length;

// calculating the number of pages needed
// depending on the total number of students and
// and number of students we want to display per page
const nbPages = Math.ceil(nbStudents / nbStudentsPerPage);

if(nbPages > 1){
  // appending the unorder list for the pagination links
  $('.page').append('<ul class="pagination"></ul>')

  // appending the pagination links
  for (var i = 0; i < nbPages; i++) {
    $('ul.pagination').append(`<li><a>${i+1}</a></li>`)
  }

  //adding the class "active" to the first pagination link
  $('ul.pagination').find('a').eq(0).addClass('active');

  // hiding all the students
  $("li.student-item").hide();
  // ..then displaying only the first page students
  for(var i = 0; i < nbStudentsPerPage; i ++){
    $("li.student-item").eq(i).show();
  }
}


// pagination links click listener
$('a').on('click',function(){

  // calculating the students maxIndex and minIndex
  // than we want to display in one page
  const pageNum = $(this).html();
  const maxIndex = nbStudentsPerPage * pageNum;
  const minIndex = maxIndex - nbStudentsPerPage;

  // hiding all the students first
  $("li.student-item").hide();

  // displaying the students from minIndex to maxIndex
  for(var i = minIndex; i < maxIndex; i ++){
    $("li.student-item").eq(i).show();
  }

  // removing the class 'active' from all the pagination links
  $('a').removeClass('active');
  // adding the class 'active' to the pagination link that has just been clicked
  $(this).addClass('active');
})
