function validateForm() {
    var x = document.forms["forma"]["naziv"].value;
    if (x == "") {
      alert("Naziv mora biti popunjen!");
      return false;
    }
}