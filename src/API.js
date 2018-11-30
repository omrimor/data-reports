import { find } from 'lodash';
const companiesURL = 'http://localhost:4001/companies';
const companyNumURL = num => `http://localhost:4001/company_${num}`;
const countriesURL = 'http://localhost:4001/countries';

const getCompanies = async () => {
  try {
    const response = await fetch(companiesURL);
    return await response.json();
  } catch (e) {
    console.log('API [getCompanies] Error: ', e);
  }
};

const getCountries = async () => {
  try {
    const response = await fetch(countriesURL);
    return await response.json();
  } catch (e) {
    console.log('API [getCountries] Error: ', e);
  }
};

const getCountryByNumber = async num => {
  try {
    const response = await fetch(companyNumURL(num));
    return await response.json();
  } catch (e) {
    console.log('API [getCountryByNumber] Error: ', e);
  }
};

const generateTableData = async () => {
  try {
    const companies = await getCompanies();
    const countries = await getCountries();

    const tableData = companies.reduce(async (prevAcc, company) => {
      const acc = await prevAcc;
      const compData = await getCountryByNumber(company.id);
      compData.forEach(item => {
        const countryData = find(countries, { country: item.country });
        acc.push({
          companyName: company.display_name,
          countryName: item.country,
          installs: item.installs,
          ROI: Math.round((item.revenue / item.cost) * 100) / 100,
          industryROI: Math.round((countryData.revenue / countryData.cost) * 100) / 100,
        });
      });
      return acc;
    }, Promise.resolve([]));
    return tableData;
  } catch (e) {
    console.log('API [generateTableData] Error: ', e);
  }
};

export { generateTableData };
