import { Request, Response } from 'express';

export const getHotels = (_: Request, res: Response) => {
  res.json([
    {
      hotelId: "b1",
      name: "Holtin",
      price: 5340,
      city: "delhi",
      commissionPct: 20
    },
    {
      hotelId: "b2",
      name: "Marriott",
      price: 7000,
      city: "delhi",
      commissionPct: 15
    }
  ]);
};