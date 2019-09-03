const devices = ['a', 'b', 'c'];

devices.forEach(function(element) {
    console.log(element);
    $(document).ready(function(){
        $(.row).append('<div class="col-lg-4"></div>');

    });
});