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

function detailSubmit() {
    const form = document.forms["detail"];

    // 체크된 체크박스들의 값들을 담을 배열
    const selectedValues = [];

    // NodeList를 배열로 변환하여 순회
    Array.from(form.stack).forEach((checkbox) => {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });

    // console.log(form);
    // console.log(form.stack);
    const fileInput = document.getElementById("img_path");
    const fileName = fileInput.value.split("\\").pop();
    const imgPath = `/uploads/${fileName}`;

    const data = {
        imgPath: imgPath,
        companyName: form.company_name.value,
        levels: form.levels.value,
        introduce: form.introduce.value,
        task: form.task.value,
        conditions: form.conditions.value,
        welfare: form.welfare.value,
        stack: selectedValues,
        // stack: form.stack,
        deadline: form.deadline.value,
        address: form.address.value,
        address_detail: form.address_detail.value,
        source: form.source.value,
        others: form.others.value,
    };

    axios({
        method: "POST",
        url: "/jobs",
        data: data,
    })
        .then((res) => {
            console.log("resdata", res.data);
        })
        .catch((err) => console.log(err));
}
