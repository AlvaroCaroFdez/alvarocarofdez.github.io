document.addEventListener("DOMContentLoaded", () => {
    const subjects = document.querySelectorAll(".subject");
    subjects.forEach((subject, index) => {
        setTimeout(() => {
            subject.classList.add("animated");
        }, index * 200);
    });
});
