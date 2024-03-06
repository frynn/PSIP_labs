document
    .getElementById("registration-form")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Отменяем отправку формы

        var name = document.getElementById("name").value;
        var email = document.getElementById("mail").value;
        var password = document.getElementById("pass").value;
        var repeatPassword = document.getElementById("rep_pass").value;
        var gender = document.querySelector(
            'input[name="gender"]:checked'
        ).value;
        var hobbies = Array.from(
            document.getElementById("hobbies").selectedOptions
        ).map((option) => option.value);
        var wishes = document.getElementById("wishes").value;

        var emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(email)) {
            alert("Invalid email address");
            return;
        }

        // Выводим данные из формы в alert
        var message =
            "Name: " +
            name +
            " Email: " +
            email +
            " Password: " +
            password +
            " Repeat Password: " +
            repeatPassword +
            " Gender: " +
            gender +
            " Hobbies: " +
            hobbies.join(", ") +
            " Wishes: " +
            wishes;

        alert(message);

        // Заносим значения полей формы в cookie
        document.cookie =
            "name=" +
            encodeURIComponent(name) +
            "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
        document.cookie =
            "email=" +
            encodeURIComponent(email) +
            "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";

        // Выводим значения куки файла
        var cookieValues = document.cookie.split("; ");
        var cookiesOutput = "Cookie Values:n";
        for (var i = 0; i < cookieValues.length; i++) {
            cookiesOutput += cookieValues[i] + "n";
        }
        alert(cookiesOutput);

        var userData = {
            name: name,
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            gender: gender,
            hobbies: hobbies,
            wishes: wishes,
        };
        // Преобразуем объект в JSON
        var jsonUserData = JSON.stringify(userData);
        // Сохраняем JSON-данные в localStorage
        localStorage.setItem("userData", jsonUserData);
        // Получаем сохраненные JSON-данные из localStorage
        var savedJsonUserData = localStorage.getItem("userData");
        // Преобразуем JSON-данные в объект
        var savedUserData = JSON.parse(savedJsonUserData);
        // Выводим объект с данными в консоль
        console.log(savedUserData);

        // Очищаем куки через 5 секунд
        setTimeout(function () {
            var cookies = document.cookie.split("; ");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie =
                    name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            alert("Cookies cleared");
        }, 5000);
    });
