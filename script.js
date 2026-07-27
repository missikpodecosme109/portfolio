// Animation d'apparition au défilement

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold:0.15
});


sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "0.8s ease";

    observer.observe(section);

});



// Message dans la console développeur

console.log(
    "Bienvenue sur le portfolio de MISSIKPODE Mahugnon Cosme 🚀"
);