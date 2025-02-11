


const apiUrl = import.meta.env.BACKEND_URL;

const BACKEND_URL = "http://localhost:8080/api/v1"

const ApiGateway = {
    dels: `${BACKEND_URL}/dels`,
    schools: `${BACKEND_URL}/schools`,
    levelStats : `${BACKEND_URL}/levelStats`,

    excel:{
        getStudent: `${BACKEND_URL}/students`,
    }
}

export default ApiGateway;
