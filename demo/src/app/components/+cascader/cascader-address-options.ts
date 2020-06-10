import * as _provinces from 'china-division/dist/provinces.json';
import * as _cities from 'china-division/dist/cities.json';
import * as _areas from 'china-division/dist/areas.json';

const provinces = _provinces as any;
const cities = _cities as any;
const areas = _areas as any;

areas.forEach(area => {
    const matchCity = cities.filter(city => city.code === area.cityCode)[0];
    if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity.children.push({
            label: area.name,
            value: area.code,
            isLeaf: true
        });
    }
});

cities.forEach(city => {
    const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
    if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
            label: city.name,
            value: city.code,
            children: city.children
        });
    }
});

const options = provinces.map(province => ({
    label: province.name,
    value: province.code,
    children: province.children
}));

export default options;
