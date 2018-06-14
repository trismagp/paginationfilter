const nbStudentsPerPage = 10;

function displayStudents(pageNum){
  const maxIndex = nbStudentsPerPage * pageNum;
  const minIndex = maxIndex - nbStudentsPerPage;
  $("li.student-item").hide();
  for(var i = minIndex; i < maxIndex; i ++){
    $("li.student-item.show").eq(i).show();
  }
}

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

function setActivePaginationLink(pageNum){
  $('ul.pagination a').removeClass('active');
  $('ul.pagination a').eq(pageNum - 1).addClass('active');
}

function addPaginationLinksClickListener(){
  $('ul.pagination a').on('click',function(){
    const pageNumClicked = $(this).html();
    displayStudents(pageNumClicked);
    setActivePaginationLink(pageNumClicked);
  })
}

function addSearchForm(){
  $('.page-header').append(`
    <div class="search">
      <input type="text" placeholder="Search for students"/> <button>Search</button>
    </div>
  `);
  addSearchButtonClickListener();
}

function addSearchButtonClickListener(){
  $('.search button').on('click', function(){
    $('.student-item').removeClass('hide');
    $('.student-item').removeClass('show');
    $('.student-item').each(function(){
      if($(this).find('h3').text().search($('.search input').val()) > -1){
        $(this).addClass('show');
      }else{
        $(this).addClass('hide');
      }
    });
    displayPage();
  })
}

function displayPage(pageNum = 1){
  const nbStudents = $("li.student-item.show").length;
  const nbPages = Math.ceil(nbStudents / nbStudentsPerPage);
  displayStudents(pageNum);
  addPaginationLinks(pageNum,nbPages);
}

$("li.student-item").addClass("show");
displayPage();
addSearchForm();
