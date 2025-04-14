# 🧠 Geolava Frontend Developer Challenge: Visualize Parking Lines on Mapbox

## 🚀 Objective

Extend this Next.js app (with Mapbox already set up) to fetch and display **parking lines** on a map. Then, for each parking data, draw **parking lines** within its bounding box to represent individual parking slots.

## 📦 API Endpoint

Fetch the parking data from:

```bash
curl --location 'https://geo-stage-001.geolava.com/features/parking' \
--header 'Content-Type: application/json' \
--data '{
    "bounds": [
        [-122.5056407510782, 37.61093807429111], [-122.37174487836481, 37.84012716451066]
    ],
    "date": "2025-04-07 18:00:00+00:00"
}'
```

Response from the API:

```bash
{
    "features": [
        {
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -122.434252,
                        37.804868
                    ],
                    [
                        -122.434286,
                        37.804864
                    ]
                ]
            },
            "properties": {
                "id": "63bccef66ecd560a28cbbc08"
            },
            "type": "Feature"
        },
        ...
    ]
    "type": "FeatureCollection"
}
```

✅ Requirements
1. Render each parking lines as a polygon on the Mapbox map.
2. Draw **blue** parking lines based on the data:
    - Lines should be properly on the side of the road
    - Handle rotated or non-axis-aligned bounding boxes.
3. Lines should remain aligned and visible while zooming or panning the map.

🌟 Bonus (Optional)
* Add hover or click interaction to highlight a stall and show its id.
* Toggle parking lines visibility with a button or control.
* Animate parking line rendering when zooming in.
* Add a UI control to configure the number of lines per stall.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. More points for code being modular and resusable.
The page auto-updates as you edit the file.

