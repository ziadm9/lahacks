const button = document.getElementById("button")
const wrapper = document.getElementById("wrapper")
const bigWrapper = document.getElementById("bigWrapper")
const page2 = document.getElementById("page2")
function load(){
    wrapper.style.transform = "translateY(0vh)";
    wrapper.style.opacity = "1"
    wrapper.style.transition = "0.75 ease"
}




button.onclick = async (event) => {
    event.preventDefault()
    bigWrapper.style.transform = "translateY(100vh)";
    setTimeout(function(){
        bigWrapper.style.display = "none";
        window.location.href="index.html"
    }, 750)
    
    
}