import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export const linkService = {
    async create(originalLink: string, shortLink: string) {
        const { data } = await api.post('/upload-link', { originalLink, shortLink })
        return data
    },

    async getAll() {
        const { data } = await api.get('/links')
        return data.links
    },

    async delete(shortLink: string) {
        const { data } = await api.delete(`/links/delete/${shortLink}`)
        return data
    },

    async update(shortLink: string) {
        const { data } = await api.put('links/update', { shortLink })
        return data
    },

    async export() {
        const { data } = await api.post<{ reportUrl: string }>('/links/exports');
        return data.reportUrl;
    }
}