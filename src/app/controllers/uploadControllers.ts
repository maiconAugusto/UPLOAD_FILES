import {Response, Request, response} from 'express';
import FileModel from '../models/upload';
import { where } from 'sequelize/types';

export default {
    async store(req: Request, res: Response) {
        const response = await FileModel.create(req.body);
        return res.status(201).json({data: response});
    },
    async index (req: Request, res: Response) {
        const response = await FileModel.findAll()
        return res.status(200).json({data: response});
    },
    async update(req: Request, res: Response) {
        const {id} = req.params;
        await FileModel.update(
            req.body,
            {where: {id: id}}
        );
        return res.status(200).json({data: 'Updated successfully'});
    },
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const response = await FileModel.findOne({where: {id: id}});
        if (!response) {
            return res.status(400).json({data: 'File not found'});
        }

        await FileModel.destroy({where: {id: id}});
        return res.status(200).json({data: 'Removed'});
    }
}