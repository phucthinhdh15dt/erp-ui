import axios from "axios";

export default async(req, res) => {
    console.log('herre 2')
    const response = await $fetch('https://jsonplaceholder.typicode.com/todos/1');

    return response;
};
