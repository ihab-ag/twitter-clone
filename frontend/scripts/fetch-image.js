const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", e => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        console.log(reader.result);
        let url = '../backend/addimage-api.php';
        let data = {'image64base': reader.result,
                    'profilepic': false,
                    'filename': 'name'};
    })

    reader.readAsDataURL(file);
})


function sendImageRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {});
}