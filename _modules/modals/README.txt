Instructions for Modals:

1. Inject "ModalService" into a controller
2. Add method to ModalService (modals.service.js)
3. In scope function, use the ModalService method
4. Add html TemplateUrl
5. Add ok and confirm methods to controller

Example in ProgressBarController:
$scope.showModal = function() {
    var data = {
        title: 'Delete',
        message: 'Are you sure?',
        buttons: ['ok', 'cancel']
    };
    ModalService.confirm(data)
        .then(function() {
            // OK Button Clicked
            alert('OK, then!');
        }, function() {
            // Cancel Button Clicked
            alert('Dismissed!');
        });
};