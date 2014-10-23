
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