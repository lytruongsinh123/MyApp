import $ from 'jquery';
import 'foundation-sites';
$(document).foundation();

$(function() {
  $('.button-like').on('click', function(event) {
    $(this).toggleClass('liked'); // Dùng $(this) thay vì $(".button-like") để chỉ áp dụng cho phần tử hiện tại
  });
});
