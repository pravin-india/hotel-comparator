import axios from 'axios';

interface SupplierHotel {
  name: string;
  price: number;
  commissionPct: number;
}

export async function fetchSupplierA(city: string): Promise<SupplierHotel[]> {
  const { data } = await axios.get(`http://localhost:3000/supplierA/hotels?city=${city}`);
  return data;
}

export async function fetchSupplierB(city: string): Promise<SupplierHotel[]> {
  const { data } = await axios.get(`http://localhost:3000/supplierB/hotels?city=${city}`);
  return data;
}