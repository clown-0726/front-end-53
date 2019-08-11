init_arr = [48, 6, 57, 42, 60, 72, 83, 73, 88, 85];

/**
 * Bubble sort
 */

function bubble_sort(arr) {
  var len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      // swap
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

/**
 * selection_sort
 */
function select_sort(arr) {
  var len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    minInd = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[minInd] > arr[j]) {
        minInd = j;
      }
    }
    var temp = arr[i];
    arr[i] = arr[minInd];
    arr[minInd] = temp;
  }
}

/**
 * insertion_sort
 */
function insertion_sort(arr) {
  var len = arr.length;

  for (var i = 1; i < len; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (arr[i] < arr[j]) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

// Practise time
function bubble_sort_2(arr) {}
function select_sort_2(arr) {}
function insertion_sort_2(arr) {}

// bubble_sort(init_arr);
// select_sort(init_arr);
// insertion_sort(init_arr);

// Check result
console.log(init_arr);
