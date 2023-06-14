class Distance {
    public static distanceCalculate(
        lat1: number,
        lon1: number,
        lat2: number | null = 0,
        lon2: number | null = 0,
    ): number {
        const earthRadius = 6371; // in kilometers
        const dLat = ((lat2! - lat1) * Math.PI) / 180;
        const dLon = ((lon2! - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2! * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;

        return distance;
    }

    public static extractCoordinatesFromMapLink = (
        mapLink: string,
    ): { latitude: null | number; longitude: null | number } => {
        const regex = /@([0-9.-]+),([0-9.-]+)/;
        const match = mapLink?.match(regex);

        if (match && match.length === 3) {
            const latitude = parseFloat(match[1]);
            const longitude = parseFloat(match[2]);
            return { latitude, longitude };
        }

        return { latitude: null, longitude: null };
    };

    public static extractMapLink = (embedLink: string): string => {
        // Extract the latitude and longitude from the embed link
        if (!embedLink) return '';

        const regexLatLng = /!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/;
        const matchLatLng = embedLink.match(regexLatLng);
        const latitude = matchLatLng?.[2]!;
        const longitude = matchLatLng?.[1]!;

        // Extract place name from the embed link
        const regexPlace = /!1s([^!]+)/;
        const matchPlace = embedLink.match(regexPlace);
        const place = matchPlace?.[1];

        // Construct the shareable link
        const shareableLink = `https://www.google.com/maps/place/${place}/@${latitude},${longitude}`;

        return shareableLink;
    };
}

export default Distance;
