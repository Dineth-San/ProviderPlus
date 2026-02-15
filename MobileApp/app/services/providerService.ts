import apiClient from './apiClient';


export interface Provider {
    _id: string;
    name: string;
    category:{
        name: string;
        slug: string;
        icon: string;
    };
    rating: number;
    description: string;
    location?: {
        type: string;
        coordinates: [number, number];
    };
}


export const fetchProvidersByCategory = async(
    slug: string,
    lat?: number,
    long?: number
): Promise<Provider[]> => {
    try{
        let queryParams = "";
        if(lat !== undefined && long !== undefined){
            queryParams = `?lat=${lat}&long=${long}`;
        }
        console.log(`fetching providers for ${slug} ${queryParams}`);
        const response = await apiClient.get(
            `/category-search/providers/category/${slug}${queryParams}`
        );
        return response.data
    }
    catch(error){
        console.error("provider service error: ", error);
        throw error;
    }
}
