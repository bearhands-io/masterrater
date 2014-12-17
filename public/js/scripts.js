
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

//claim form validation

$(document).ready(function() {
    $('#claimrequestForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                group: '.col-sm-8',
                validators: {
                    notEmpty: {
                        message: 'The Model Number is required'
                    },
                    stringLength: {
                        max: 200,
                        message: 'The title must be less than 200 characters long'
                    }
                }
            },
            claimtype: {
                group: '.col-sm-4',
                validators: {
                    notEmpty: {
                        message: 'The claim type is required'
                    }
                }
            },
            director: {
                group: '.col-sm-4',
                validators: {
                    notEmpty: {
                        message: 'The director name is required'
                    },
                    stringLength: {
                        max: 80,
                        message: 'The director name must be less than 80 characters long'
                    }
                }
            },
            writer: {
                group: '.col-sm-4',
                validators: {
                    notEmpty: {
                        message: 'The writer name is required'
                    },
                    stringLength: {
                        max: 80,
                        message: 'The writer name must be less than 80 characters long'
                    }
                }
            },
            producer: {
                group: '.col-sm-4',
                validators: {
                    notEmpty: {
                        message: 'The producer name is required'
                    },
                    stringLength: {
                        max: 80,
                        message: 'The producer name must be less than 80 characters long'
                    }
                }
            },
            website: {
                group: '.col-sm-6',
                validators: {
                    notEmpty: {
                        message: 'The website address is required'
                    },
                    uri: {
                        message: 'The website address is not valid'
                    }
                }
            },
            trailer: {
                group: '.col-sm-6',
                validators: {
                    notEmpty: {
                        message: 'The trailer link is required'
                    },
                    uri: {
                        message: 'The trailer link is not valid'
                    }
                }
            },
            review: {
                // The group will be set as default (.form-group)
                validators: {
                    stringLength: {
                        max: 500,
                        message: 'The review must be less than 500 characters long'
                    }
                }
            },
            rating: {
                // The group will be set as default (.form-group)
                validators: {
                    notEmpty: {
                        message: 'The rating is required'
                    }
                }
            }
        }
    });
});

