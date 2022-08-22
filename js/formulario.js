const d = document;

function contactForm() {
    const $form = d.querySelector(".contact-form");
    $inputs = d.querySelectorAll(".contact-form [required]");

    $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
});
    d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
        if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
    }

        if (!pattern) {
        return $input.value !== ""
        ? d.getElementById($input.name).classList.remove("is-active")
        : d.getElementById($input.name).classList.add("is-active");
    }
    }
});

d.addEventListener("submit", (e) => {
    e.preventDefault();
    const $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/TUCORREO@CORREO.CL", {
        method: "POST",
        body: new FormData(e.target)
    })
        .then((respuesta) =>
            respuesta.ok ? respuesta.json() : Promise.reject(res)
        )
        .then((json) => {
        console.log(json);
        $loader.classList.add("none");
        $response.classList.remove("none");
        $response.innerHTML = `<p>${json.message}</p>`;
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
        });

        Toast.fire({
            icon: "success",
            title: "Los datos han sido enviados"
        });
        $form.reset();
    })
    .catch((error) => {
        console.log(error);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
        });

        Toast.fire({
            icon: "error",
            title: "Hemos tenido un problema, intenta de nuevo"
        });
        $loader.classList.add("none");
        let message =
            error.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.innerHTML = `<p>Error ${error.status}:${message}</p>`;
    })
        .finally(() =>
        setTimeout(() => {
            $response.classList.add("none");
            $response.innerHTML = "";
        }, 3000)
    );
});
}

d.addEventListener("DOMContentLoaded", contactForm);
