const form = document.querySelector("#generate-form");
const qr = document.querySelector("#qrcode");
const warn = document.querySelector("#warning");
const parentElement = warn.parentElement;
function generateCode (e) {
    e.preventDefault();
    clearUI();
    const url = document.querySelector("#url").value;
    const size = document.querySelector("#size").value;
    if (url==='') {
        parentElement.appendChild(warn)
        warn.innerHTML="Please Enter The URL"
        warn.classList.add('error')
        setTimeout(()=>{
            warn.remove();
        },1000)
    }else{

        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQRCOde(url,size);
            setTimeout(() => {
                const saveURl = qr.querySelector('img').src;
                createSaveBtn(saveURl)
            }, 50);
        }, 1000); 
    }
}


function generateQRCOde (url,size){
    const qrcode = new QRCode("qrcode",{
        text:url,
        width:size,
        height:size
    });
   

}



function clearUI (){
    //clear input field value
    qr.innerHTML="";
    const saveBtn = document.getElementById('save-link')
    if(saveBtn) saveBtn.remove();
}

function createSaveBtn (saveURl){
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = "bg-yellow-400 hover:bg-yellow-600 py-2 my-5 rounded cursor-pointer w-1/3 m-auto"
    link.innerHTML="Save Image";
    link.download="qrcode";
    link.href=saveURl;
    document.getElementById('generated').appendChild(link)
};









function showSpinner(){
    document.getElementById("spinner").style.display='block'
};
function hideSpinner() {
    document.getElementById("spinner").style.display="none"
};
hideSpinner();




form.addEventListener('submit',generateCode)