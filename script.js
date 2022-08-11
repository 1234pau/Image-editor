const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");
const image = document.querySelector(".image");
const imageContainer = document.querySelector(".imageContainer");
const vol = Array.from(document.querySelectorAll('#vol'))
const er = document.querySelectorAll('.er')
const h4 = document.querySelector('h4')
const ranges = document.querySelectorAll('.file div input[type = "range"]')
const downloadButton = document.getElementById('downloadButton')
const resetButton = document.getElementById('resetButton')

ranges.forEach(range => {
    range.addEventListener('input', editImage)
})

function editImage() {
    image.style.filter = `blur(${ranges[0].value}px) brightness(${ranges[1].value}%) 
    contrast(${ranges[2].value}%) grayscale(${ranges[3].value}%) sepia(${ranges[4].value}%) 
    invert(${ranges[5].value}%) opacity(${ranges[6].value}%) saturate(${ranges[7].value})`
}

vol.forEach(item => {
    item.addEventListener('input', function(e) {
        e.preventDefault()
        item.nextElementSibling.textContent = e.target.value;
    })
})

fileSelect.addEventListener("click", () => {
    if (fileElem) {
        fileElem.click();
    }
}, false);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
    if (this.files.length) {
        image.src = "";
        for (let i = 0; i < this.files.length; i++) {
            image.src = URL.createObjectURL(this.files[i]);
            imageContainer.style.border = 'none'
            image.onload = () => {
                URL.revokeObjectURL(this.src);
            }
        }
        for (var i = 0; i < ranges.length; i++) {
            ranges[i].disabled = false;
        }
        downloadButton.removeAttribute("disabled")
    } else {
        image.src = "assets/placeholder-image.png";
    }
}
downloadButton.addEventListener('click', function() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.filter = `blur(${ranges[0].value}px) brightness(${ranges[1].value}%) 
    contrast(${ranges[2].value}%) grayscale(${ranges[3].value}%) sepia(${ranges[4].value}%) 
    invert(${ranges[5].value}%) opacity(${ranges[6].value}%) saturate(${ranges[7].value})`

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
})

resetButton.addEventListener('click', resetAll)

function resetAll() {
    vol.forEach(item => {
        item.nextElementSibling.textContent = 0;
    })
    for (var i = 0; i < ranges.length; i++) {
        ranges[i].disabled = true;
    }
    downloadButton.setAttribute('disabled', true)
    imageContainer.style.border = '2px dotted black'
    image.src = "assets/placeholder-image.png";
    image.style.filter = `blur(${ranges[0].value = 0}px) brightness(${ranges[1].value = 100}%) 
    contrast(${ranges[2].value = 100}%) grayscale(${ranges[3].value =0}%) sepia(${ranges[4].value =0}%) 
    invert(${ranges[5].value = 0}%) opacity(${ranges[6].value = 100}%) saturate(${ranges[7].value = 1})`
}