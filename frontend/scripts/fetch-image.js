const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", e => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        console.log(reader.result);
        let imageinbase = reader.result;
        //split to remove "data:image/png;base64,"
        const pure64base = imageinbase.split(",");
        let url = '../../backend/addimage-api.php';
        let data = {'image64base': pure64base[1],
                    'profilepic': false,
                    'name': 'name'};
        sendImageRequest(url, data);
    })

    reader.readAsDataURL(file);
})


function sendImageRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse)});
}