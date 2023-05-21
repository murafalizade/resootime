import { render, screen } from '@testing-library/react';
// import RestaurantService from '../app/api/services/restaurantService';
import axios from 'axios';
import BASE_URL from '../app/constants/baseUrl';
import Card from '../app/components/card/card';

describe('index page', () => {
    test('Restaurants data should be sent with 200 by API', async () => {
        const restaurantInfo = await axios.get(BASE_URL + '/restaurants');
        expect(restaurantInfo.status).toBe(200);
    });

    test('Restaurants data should be JSON format in API', async () => {
        // Check if the data is JSON
        const response = await axios.get(BASE_URL + '/restaurants');
        const contentType = response.headers['content-type'];
        expect(contentType).toContain('application/json');

        // Verify that the response data is valid JSON
        const responseData = response.data;
        expect(responseData).toBeDefined();
        expect(typeof responseData).toBe('object');
    });

    test('Card images should be loaded', async () => {
        const restaurantInfo = await axios.get(BASE_URL + '/restaurants');
        const { getByAltText } = render(
            <Card cardInfo={restaurantInfo.data} />,
        );

        const restaurants = restaurantInfo.data;
        restaurants.forEach((rest) => {
            const imageElement = getByAltText(rest.name);
            expect(imageElement.src).toBe(
                rest.images[0]?.image || '/images/rest_imag.png',
            );
        });
    });
});
