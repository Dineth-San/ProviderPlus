import apiClient from './apiClient'


export interface Category{
    _id: string;
    name: string;
    slug: string;
    icon: string;
}


export const fetchAllCategories = async(): Promise<Category[]> => {
    try{
        const response = await apiClient.get('/category-search/categories');
        return response.data
    }
    catch(error){
        throw error;
    }
}
