document.addEventListener("DOMContentLoaded", function () {
    const selectedTechs = [];

    const techTagsContainer = document.getElementById("techTagsContainer");

    const techs = [
        "React",
        "Vue",
        "CSS",
        "Angular",
        "JavaScript",
        "HTML",
        "TypeScript",
        "Sass",
        "JSX",
        "Webpack",
    ];

    techs.forEach((tech) => {
        const techCheckbox = document.createElement("input");
        techCheckbox.type = "checkbox";
        techCheckbox.id = tech;
        techCheckbox.value = tech;
        techCheckbox.name = tech;
        techCheckbox.addEventListener("change", function () {
            handleTechChange(tech);
        });

        const label = document.createElement("label");
        label.htmlFor = tech;
        label.textContent = tech;

        const techTag = document.createElement("div");
        techTag.className = "tech-tag";
        techTag.appendChild(techCheckbox);
        techTag.appendChild(label);

        techTagsContainer.appendChild(techTag);
    });

    function handleTechChange(tech) {
        if (selectedTechs.includes(tech)) {
            // Remove tech if it exists in the array
            selectedTechs.splice(selectedTechs.indexOf(tech), 1);
        } else {
            // Add tech if it doesn't exist in the array
            selectedTechs.push(tech);
        }

        const formData = new FormData();
        selectedTechs.forEach((selectedTech) => {
            formData.append("task[]", selectedTech);
        });

        fetch("/result", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                // Add debugging logs
                console.log("Received data from the server:", data.Info);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
});

// 프로필 사진

function fileUpload() {
    const fileInput = document.getElementById("img_path");
    const formData = new FormData();
    formData.append("img_path", fileInput.files[0]);

    axios({
        method: "POST",
        url: "/upload",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then((res) => {
            console.log(res.data);
            const resultImage = document.getElementById("resultImage");
            resultImage.src = `/uploads/${res.data.path}`;
        })
        .catch((err) => console.error(err));
}
