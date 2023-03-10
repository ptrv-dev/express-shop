import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import BrandModel from '../models/BrandModel';

import { brandCreateBody } from '../@types/requestBody';

export async function create(
  req: Request<{}, {}, brandCreateBody>,
  res: Response
) {
  try {
    const validation = validationResult(req);
    if (!validation.isEmpty()) return res.status(400).json(validation);

    const { image, title } = req.body;

    const brand = await BrandModel.create({ image, title });

    return res.status(200).json(brand);
  } catch (error) {
    console.log(`[Error] Brand create error!\n${error}\n\n`);
    return res.sendStatus(500);
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const brands = await BrandModel.find();

    return res.status(200).json({ data: brands });
  } catch (error) {
    console.log(`[Error] Brand get all error!\n${error}\n\n`);
    return res.sendStatus(500);
  }
}

export async function removeOne(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;

    const brand = await BrandModel.findByIdAndDelete(id);

    if (!brand) return res.status(404).json({ msg: "Brand doesn't exists" });

    return res.status(200).json(brand);
  } catch (error) {
    console.log(`[Error] Brand remove one error!\n${error}\n\n`);
    return res.sendStatus(500);
  }
}

export async function edit(
  req: Request<{ id: string }, {}, brandCreateBody>,
  res: Response
) {
  try {
    const validation = validationResult(req);
    if (!validation.isEmpty()) return res.status(400).json(validation);

    const { id } = req.params;
    const { image, title } = req.body;

    const brand = await BrandModel.findByIdAndUpdate(
      id,
      { image, title },
      { returnDocument: 'after' }
    );

    if (!brand) return res.status(404).json({ msg: "Brand doesn't exists" });

    return res.status(200).json(brand);
  } catch (error) {
    console.log(`[Error] Brand edit error!\n${error}\n\n`);
    return res.sendStatus(500);
  }
}

export async function getOne(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;

    const brand = await BrandModel.findById(id);

    if (!brand) return res.status(404).json({ msg: "Brand doesn't exists" });

    return res.status(200).json(brand);
  } catch (error) {
    console.log(`[Error] Brand get one error!\n${error}\n\n`);
    return res.sendStatus(500);
  }
}
