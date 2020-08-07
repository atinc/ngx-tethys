import * as _provinces from 'china-division/dist/provinces.json';
import * as _cities from 'china-division/dist/cities.json';
import * as _areas from 'china-division/dist/areas.json';

const provincesAll = _provinces as any;
const citiesAll = _cities as any;
const areasAll = _areas as any;

const provinces = provincesAll.default;
const cities = citiesAll.default;
const areas = areasAll.default;

areas.forEach((area: { cityCode: any; name: any; code: any }) => {
    const matchCity = cities.filter((city: { code: any }) => city.code === area.cityCode)[0];
    if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity.children.push({
            label: area.name,
            value: area.code,
            isLeaf: true
        });
    }
});

cities.forEach((city: { provinceCode: any; name: any; code: any; children: any }) => {
    const matchProvince = provinces.filter((province: { code: any }) => province.code === city.provinceCode)[0];
    if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
            label: city.name,
            value: city.code,
            children: city.children
        });
    }
});

const options = provinces.map((province: { name: any; code: any; children: any }) => ({
    label: province.name,
    value: province.code,
    children: province.children
}));

export default options;
