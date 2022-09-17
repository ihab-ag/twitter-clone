const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", e => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    console.log(file);
})