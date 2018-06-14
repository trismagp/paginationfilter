const nbStudentsPerPage = 10;

function displayStudents(){
  const nbStudents = $("li.student-item.show").length;
  console.log(nbStudents);
  // calculating the number of pages needed
  // depending on the total number of students and
  // and number of students we want to display per page
  const nbPages = Math.ceil(nbStudents / nbStudentsPerPage);
  $('ul.pagination').remove();
  if(nbPages > 1){
    // appending the unorder list for the pagination links
    $('.page').append('<ul class="pagination"></ul>')

    // appending the pagination links
    for (var i = 0; i < nbPages; i++) {
      $('ul.pagination').append(`<li><a>${i+1}</a></li>`)
    }

    //adding the class "active" to the first pagination link
    // $('ul.pagination').find('a').eq(0).addClass('active');
    $('ul.pagination a').eq(0).addClass('active');
  }

  applyPaginationLinks();

  // hiding all the students
  $("li.student-item.hide").hide();
  // ..then displaying only the first page students
  for(var i = 0; i < nbStudentsPerPage; i ++){
    $("li.student-item.show").eq(i).show();
  }
}

function applyPaginationLinks(){
  // pagination links click listener
  $('ul.pagination a').on('click',function(){

    // calculating the students maxIndex and minIndex
    // than we want to display in one page
    const pageNum = $(this).html();
    const maxIndex = nbStudentsPerPage * pageNum;
    const minIndex = maxIndex - nbStudentsPerPage;

    // hiding all the students first
    $("li.student-item").hide();
    console.log($("li.student-item").length);

    // displaying the students from minIndex to maxIndex
    for(var i = minIndex; i < maxIndex; i ++){
      $("li.student-item.show").eq(i).show();
    }

    // removing the class 'active' from all the pagination links
    $('ul.pagination a').removeClass('active');
    // adding the class 'active' to the pagination link that has just been clicked
    $(this).addClass('active');
  })
}

function addSearch(){
  $('.page-header').append(`
    <div class="search">
      <input type="text" placeholder="Search for students"/> <button>Search</button>
    </div>
  `);
  $('.search button').on('click', function(){
    $('.student-item').each(function(){
      if($(this).find('h3').text().search($('.search input').val()) > -1){
        $(this).removeClass('hide');
        $(this).addClass('show');
      }else{
        $(this).removeClass('show');
        $(this).addClass('hide');
      }
    });
    displayStudents();
  })
}


$("li.student-item").addClass("show");
displayStudents();
addSearch();
