import {$authHost, $host} from "./index";

export const createClient = async (client: FormData) => {
    const {data} = await $authHost.post('api/client', client)
    return data
}

export const fetchClients = async (page: any, limit: number = 5) => {
    const {data} = await $host.get('api/client', {params: {page, limit}})
    return data
}

export const fetchOneClient = async (id: string | any) => {
    const {data} = await $host.get('api/client/' + id)
    return data
}
