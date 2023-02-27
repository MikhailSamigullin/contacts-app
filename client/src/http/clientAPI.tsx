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

export const updateOneClient = async (client: any) => {
    const formDataObj = Object.fromEntries(client.entries());
    const {data} = await $host.put(`api/client/${formDataObj.id}`, client)
    return data
}

export const deleteOneClient = async (id: string | any) => {
    await $host.delete('api/client/' + id, id)
    
}
