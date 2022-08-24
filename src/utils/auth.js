import { useRouter } from 'vue-router';
import axios from 'axios';

var auth = {
    checkToken (redirect = true) {
        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const token = localStorage.getItem('FERROMARKET_TOKEN');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            key: "value"
        };
        const router = useRouter();
        axios
            .post(api + "/auth",
                bodyParameters,
                config
            )
            .then((response) => {
                if (response.data.status !== "authorized") {
                    console.log(response.data);
                    return false;
                }
                else {
                    // No hace nada... el usuario es autenticado
                    return true;
                }
            })
            .catch((err) => {
                console.log(err);
                if (redirect === true) {
                    router.replace("/");
                }
                else {
                    return false;
                }
            });
    }
}

export default auth;
