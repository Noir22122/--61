AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 2, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });
  
let comments = [];
loadComments(); 

document.getElementById('comment-add').onclick = function(){
  event.preventDefault();
  let commentName = document.getElementById('comment-name');
  let commentBody = document.getElementById('comment-body');

  let comment = {
    name : commentName.value,
    body : commentBody.value,
    time : Math.floor(Date.now()/1000)
  }
  commentName.value = ' ';
  commentBody.value = ' ';
  comments.push(comment);
  saveComments();
  showComments();
}

function saveComments(){
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  showComments();
}

function showComments(){
  let commentField = document.getElementById('comment-field');
  let out = '';
  comments.forEach(function(item){
    out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
    out += `<p class="alert alert-primari">${item.name}</p>`;
    out += `<p class="alert alert-success">${item.body}</p>`;
  });
  commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ":" + min + ':' + sec ;
  return time;
}

