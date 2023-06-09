import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../modals/user';
import * as userService from '../service/user.service';

export async function AddJobApplication(req: Request, res: Response) {
    try {
        if (!req.body.email) {
            return res.send('Email is required!');
        }
        const data = await userService.addJobApplication(req.body);
        if (!data) {
            return res.send('Wrong email and password please try again!');
        }
        return res.send(data);
    }
    catch (err) {
        return res.send(err || 'somthing went wrong!');
    }
}

export async function login(req: Request, res: Response) {
    try {
        if (!req.body.email) {
            return res.send('Email is required!');
        }
        const data = await userService.Login(req.body);
        if (data === false) {
            return res.send('login failed!');
        }
        const registredUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        return res.send(registredUser);
    }
    catch (err) {
        return res.send(err || 'somthing went wrong!');
    }
}

export async function getJobApplications(req: Request, res: Response) {
    try {
        const search = req.query.search;
        const condition = search ? {
            [Op.or]: [
                {
                    name: { [Op.like]: `%${search}%` }
                },
                {
                    email: { [Op.like]: `%${search}%` }
                }
            ]
        } : null
        const data = await userService.getJobApplication(condition);
        return res.send(data);
    }
    catch (err) {
        return res.send(err || 'somthing went wrong!');
    }
}

export async function deleteJobApplication(req: Request, res: Response): Promise<any> {
    try {
        const jobData = await userService.deleteJobApplication(+req.params.id);
        res.send(JSON.stringify(jobData));
    }
    catch (err) {
        res.status(500).send({
            message:
                err || "Some error occurred while deleting the user."
        });
    }
}

export async function getJobById(req: Request, res: Response): Promise<any> {
    try {
        const jobData = await userService.getJobById(+req.params.id);
        res.send(JSON.stringify(jobData));
    }
    catch (err) {
        res.status(500).send({
            message:
                err || "Some error occurred while finding the user."
        });
    }
}
