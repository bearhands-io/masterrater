
$(document).ready(function(){//Select2
$.getScript('http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
           
  /* dropdown and filter select */
  var select = $('#select2').select2();
  
  /* Select2 plugin as tagpicker */
  $("#tagPicker").select2({
    closeOnSelect:false
  });

}); //script         
      
  
//Date picker
$.getScript('//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.min.js',function(){
  
  $('#datePicker').datepicker({
    autoclose:true,
  }).on("changeDate", function(e){
    console.log(e.date);
  });
  
  $('.input-daterange').datepicker({
    autoclose:true
  }).on("changeDate", function(e){
    console.log(e.date);
  });
  
}); //script  
   
// when user browses to page
$('#content').hide();
$('#loading').show();

// then when the #content div has loaded
$(window).bind('load', function() {
$('#loading').hide();
$('#content').fadeIn('slow');
});

//Time picker - requires moment.js
$.getScript('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min.js',function(){
  $.getScript('//cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/3.0.0/js/bootstrap-datetimepicker.min.js',function(){
    
    $('#timePicker').datetimepicker({
      pickDate: false
    });
    
  }); //script
}); //script


$(document).ready(function() {});
});

//table sorting
$(document).ready(function(){$.getScript('//cdn.datatables.net/1.10.1/js/jquery.dataTables.min.js',function(){
  $.getScript('//cdn.datatables.net/plug-ins/725b2a2115b/integration/bootstrap/3/dataTables.bootstrap.js',function(){
     $('#example').dataTable();
  });
});
});