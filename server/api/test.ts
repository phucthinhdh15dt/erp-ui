import { useFetch } from '#app';

export default async (req, res) => {
    const response = await $fetch('http://dummy.restapiexample.com/api/v1/employees', { method: 'GET'});
    console.log(response);
    return response;
};
