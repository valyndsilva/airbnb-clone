# Scripts:

npm install tailwind-scrollbar-hide

Install React Date Range:
https://hypeserver.github.io/react-date-range/
npm install react-date-range
npm install react date-fns (Peer dependency of react-date-range)
npm install date-fns
npm install @headlessui/react
npm i @badrap/bar-of-progress (https://www.npmjs.com/package/@badrap/bar-of-progress)
Mapbox: https://www.mapbox.com/
React Map GL: https://github.com/visgl/react-map-gl

npm install --save react-map-gl mapbox-gl
copy "Style URL" from Mapbox Studio into mapStyle attribute.

/// In \_app.js or search.js add css:
import 'mapbox-gl/dist/mapbox-gl.css';

Add an environment variable in NextJS into next.config.js:
We should only include public variables in this file.

https://visgl.github.io/react-map-gl/docs/get-started/get-started
https://visgl.github.io/react-map-gl/docs/get-started/state-management

Add geo-lib for Markers: https://github.com/manuelbieh/geolib
npm install geolib
https://visgl.github.io/react-map-gl/docs/api-reference/marker

npm install react-simple-image-slider --save
https://www.npmjs.com/package/react-simple-image-slider
https://github.com/kimcoder/react-simple-image-slider/blob/master/example/App.tsx

npm install --save next-auth

.env.local:
NEXTAUTH_SECRET=value you can define (go to https://generate-secret.now.sh/32)
NEXTAUTH_URL=value same as NEXT_PUBLIC_BASE_URL (this should be changed to the url after deployment)

https://next-auth.js.org/configuration/pages#sign-in-page