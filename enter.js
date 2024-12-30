let named = document.getElementById ("name");
let rolld = document.getElementById ("roll");
let batchd = document.getElementById ("batch");
let start = document.getElementById ("start");

start.addEventListener ("click", (e) => {
    e.preventDefault ();
    let names = named.value.trim ();
    let roll = rolld.value.trim ();
    let batch = batchd.value.trim ();

    if (!names || !roll || !batch) {
        Swal.fire({
            icon: 'error',
            title: 'All Fields Required',
            text: 'Please fill in all fields to proceed!',
            heightAuto: false // Fix SweetAlert UI
        });
        return; // Do not proceed if fields are empty
    }

    localStorage.setItem("studentName", names);
    localStorage.setItem("studentRoll", roll);
    localStorage.setItem("studentBatch", batch);

    named.value = "";
    rolld.value = "";
    batchd.value = "";
    
    setTimeout (() => {
        window.location.href = "quiz.html";
    },2000);
});
