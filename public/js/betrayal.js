const text = "You where looking at other Foxes weren't you?... don't worry... I'll make sure your heart will stay with me forever...";
let index = 0;


function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 120);
    }
}

window.onload = typeWriter;