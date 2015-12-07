/**
* @ngdoc directive
* @name ionInput
* @parent ionic.directive:ionList
* @module ionic
* @restrict E
* Creates a text input group that can easily be focused
*
* @usage
*
* ```html
* <ion-list>
*   <ion-input>
*     <input type="text" placeholder="First Name">
*   <ion-input>
*
*   <ion-input>
*     <ion-label>Username</ion-label>
*     <input type="text">
*   </ion-input>
* </ion-list>
* ```
*/

var labelIds = -1;

IonicModule
.directive('ionInput', [function() {
  return {
    restrict: 'E',
    controller: ['$scope', '$element', function($scope, $element) {
      this.$scope = $scope;
      this.$element = $element;

      this.input = $element[0].querySelector('input,textarea');
    }]
  };
}]);

/**
* @ngdoc directive
* @name ionLabel
* @parent ionic.directive:ionList
* @module ionic
* @restrict E
*
* New in Ionic 1.2. It is strongly recommended that you use `<ion-label>` in place
* of any `<label>` elements for maximum cross-browser support and performance.
*
* Creates a label for a form input.
*
* @usage
*
* ```html
* <ion-list>
*   <ion-input>
*     <ion-label>Username</ion-label>
*     <input type="text">
*   </ion-input>
* </ion-list>
* ```
*/
IonicModule
.directive('ionLabel', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    require: '?^ionInput',
    compile: function($element, $attrs) {

      return function link($scope, $element, $attrs, ionInputCtrl) {
        var element = $element[0];

        $element.addClass('input-label');

        $element.attr('aria-label', $element.text());
        var id = element.id || '_label-' + ++labelIds;

        if (!element.id) {
          $element.attr('id', id);
        }

        if (ionInputCtrl && ionInputCtrl.input) {
          ionInputCtrl.input.setAttribute('aria-labelledby', id);

          $element.on('click', function(e) {
            console.log('CLICK');
            $timeout(function() {
              ionInputCtrl.input.focus();
            })
          })

        }
      }
    }
  };
}]);

/**
 * Input label adds accessibility to <span class="input-label">.
 */
IonicModule
.directive('inputLabel', [function() {
  return {
    restrict: 'C',
    require: '?^ionInput',
    compile: function($element) {

      return function link($scope, $element, $attrs, ionInputCtrl) {
        var element = $element[0];

        $element.attr('aria-label', $element.text());
        var id = element.id || '_label-' + ++labelIds;

        if (!element.id) {
          $element.attr('id', id);
        }

        if (ionInputCtrl && ionInputCtrl.input) {
          ionInputCtrl.input.setAttribute('aria-labelledby', id);
        }

      }
    }
  };
}]);